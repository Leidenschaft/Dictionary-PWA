import { observable } from 'mobx';
import { request } from 'koajax';

export enum Gender {
    der,
    die,
    das
}

export interface Word {
    text: string;
    chinese: string;
    gender: keyof typeof Gender;
    address: string;
    third_person_present: string;
    perfekt: string;
}

const { localStorage } = self;

export class WordModel {
    @observable
    allItems: Word[] = localStorage.word_list
        ? JSON.parse(localStorage.word_list)
        : [];

    @observable
    list: Word[] = [];

    constructor() {
        if (!this.allItems[0]) this.getAll();
    }

    async getAll() {
        const { response } = request<string>({
            path:
                'https://raw.githubusercontent.com/Leidenschaft/DeutschLernenWort/master/wordlist.xml'
        });
        const words = new DOMParser()
            .parseFromString((await response).body, 'text/xml')
            .querySelectorAll('Word');

        this.allItems = Array.from(
            words,
            ({ attributes, textContent }) =>
                ({
                    ...Object.fromEntries(
                        Array.from(attributes, ({ name, value }) => [
                            name,
                            value
                        ])
                    ),
                    text: textContent
                } as Word)
        );
        localStorage.word_list = JSON.stringify(this.allItems);
        return this.allItems;
    }

    getList({ keyword }: { keyword: string }) {
        return (this.list = this.allItems.filter(
            ({ text, chinese }) =>
                text.includes(keyword) || chinese.includes(keyword)
        ));
    }
}
