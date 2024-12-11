import { HTTPClient } from 'koajax';
import { observable } from 'mobx';
import {
    Filter,
    ListModel,
    persist,
    restore,
    Stream,
    toggle
} from 'mobx-restful';
import { Day } from 'web-utility';

import { XML2JSON } from '../utility';

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
    third_person_present?: string;
    perfekt?: string;
    Stichwort?: {
        text: string;
        Audio: boolean;
        Bild: string;
    };
}

export interface WordFilter extends Filter<Word> {
    keyword: string;
}

export class WordModel extends Stream<Word, WordFilter>(ListModel) {
    @persist({ expireIn: Day })
    @observable
    accessor allWords: Word[] = [];

    restored = restore(this, 'Word').then(() => this.getAllWords());

    client = new HTTPClient({
        baseURI:
            'https://raw.githubusercontent.com/Leidenschaft/DeutschLernenWort/master/',
        responseType: 'text'
    });

    protected async getAllWords() {
        const { allWords } = this;

        if (allWords[0]) return allWords;

        const { body } = await this.client.get<string>('wordlist.xml');

        const { Wordlist } = XML2JSON<{ Wordlist: { Word: Word[] } }>(body);

        return (this.allWords = Wordlist.Word);
    }

    async *openStream({ keyword }: WordFilter) {
        await this.restored;

        for (const word of this.allWords) {
            const { text, chinese } = word;

            if (!keyword || text.includes(keyword) || chinese.includes(keyword))
                yield word;
        }
    }

    @toggle('downloading')
    async getOne(word: string) {
        await this.restored;

        const meta = this.allWords.find(({ text }) => text === word);

        const { body } = await this.client.get<string>(meta?.address);

        const { Entry } = XML2JSON<{ Entry: Word }>(body);

        if (Entry.Stichwort)
            Entry.Stichwort.Bild = this.client.baseURI + Entry.Stichwort.Bild;

        return (this.currentOne = { ...meta, ...Entry });
    }
}
