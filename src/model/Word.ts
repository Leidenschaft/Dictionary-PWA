import { HTTPClient } from 'koajax';
import { Filter, ListModel, PersistNode, Stream } from 'mobx-restful';
import { Day } from 'web-utility';

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

export interface WordFilter extends Filter<Word> {
    keyword: string;
}

export class WordModel extends Stream<Word, WordFilter>(ListModel) {
    allWords = new PersistNode<Word[], Word[]>({
        key: 'allWords',
        expireIn: Day
    });

    client = new HTTPClient({
        baseURI:
            'https://raw.githubusercontent.com/Leidenschaft/DeutschLernenWort/master/',
        responseType: 'document'
    });

    protected async getAllWords() {
        let allWords = await this.allWords.load('Word');

        if (allWords) return allWords;

        const { body } = await this.client.get<Document>('wordlist.xml');

        allWords = [...body.querySelectorAll('Word')].map(
            ({ attributes, textContent }) =>
                ({
                    ...Object.fromEntries(
                        [...attributes].map(({ name, value }) => [name, value])
                    ),
                    text: textContent
                }) as Word
        );
        await this.allWords.save('Word', allWords);

        return allWords;
    }

    async *openStream({ keyword }: WordFilter) {
        for (const word of await this.getAllWords()) {
            const { text, chinese } = word;

            if (!keyword || text.includes(keyword) || chinese.includes(keyword))
                yield word;
        }
    }
}
