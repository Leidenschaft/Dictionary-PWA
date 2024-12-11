import { Badge, ListGroup, ListGroupItem } from 'boot-cell';
import { observable } from 'mobx';
import { attribute, component, observer } from 'web-cell';
import { CustomElement, isEmpty } from 'web-utility';
import { stringify } from 'yaml';

import { Word, wordStore } from '../model';

@component({ tagName: 'word-page' })
@observer
export class WordPage extends HTMLElement implements CustomElement {
    @attribute
    @observable
    accessor word = '';

    connectedCallback() {
        wordStore.getOne(this.word);
    }

    disconnectedCallback() {
        wordStore.clearCurrent();
    }

    renderRow(key: string, value: unknown) {
        return (
            <ListGroupItem
                key={key}
                className="d-flex flex-wrap flex-lg-nowrap justify-content-between"
            >
                {key}

                {isEmpty(value) ? (
                    ''
                ) : typeof value !== 'object' ? (
                    <span>{value + ''}</span>
                ) : (
                    <pre className="m-0">{stringify(value)}</pre>
                )}
            </ListGroupItem>
        );
    }

    render() {
        const { text, chinese, gender, address, Stichwort, ...data } =
            wordStore.currentOne as Word;

        return (
            <article className="container px-0 py-3">
                <header className="d-flex flex-wrap justify-content-between align-items-center">
                    <h1 className="d-flex align-items-center">
                        {text}
                        <Badge
                            className="fs-6 ms-2"
                            bg={gender === 'die' ? 'danger' : 'primary'}
                        >
                            {gender}
                        </Badge>
                    </h1>
                    {Stichwort && (
                        <img src={Stichwort.Bild} alt={Stichwort.text} />
                    )}
                </header>

                <ListGroup>
                    {Object.entries(data).map(([key, value]) =>
                        this.renderRow(key, value)
                    )}
                </ListGroup>
            </article>
        );
    }
}
