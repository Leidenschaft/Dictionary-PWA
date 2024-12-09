import { Filter, ListModel, Stream, persistList } from 'mobx-restful';
import { HTTPClient } from 'koajax';
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

@persistList({
    storeKey: 'Word',
    expireIn: Day
})
export class WordModel extends Stream<Word, WordFilter>(ListModel) {
    client = new HTTPClient({
        baseURI:
            'https://raw.githubusercontent.com/Leidenschaft/DeutschLernenWort/master/',
        responseType: 'document'
    });

    async *openStream({ keyword }: WordFilter) {
        const { body } = await this.client.get<Document>('wordlist.xml');

        const words = body.querySelectorAll('Word');

        for (const { attributes, textContent } of words) {
            const word = {
                ...Object.fromEntries(
                    Array.from(attributes, ({ name, value }) => [name, value])
                ),
                text: textContent
            } as Word;

            if (
                !keyword ||
                word.text.includes(keyword) ||
                word.chinese.includes(keyword)
            )
                yield word;
        }
    }
}
