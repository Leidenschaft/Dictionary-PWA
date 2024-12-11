import { Badge, Button, ListGroup, ListGroupItem } from 'boot-cell';
import { observable } from 'mobx';
import { SpeechSynthesisModel, SpeechSynthesisState } from 'mobx-i18n';
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

    storeTTS = new SpeechSynthesisModel();

    toggleSpeaking = () => {
        const { storeTTS } = this;

        if (storeTTS.state !== SpeechSynthesisState.Clear)
            return storeTTS.toggle();

        const text = SpeechSynthesisModel.getReadableText(
            this.querySelector('h1')
        );
        storeTTS.speak(text);
    };

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
        const speaking = this.storeTTS.state === SpeechSynthesisState.Speaking;

        return (
            <article className="container px-0 py-3">
                <header className="d-flex flex-wrap align-items-center gap-2">
                    <h1>{text}</h1>
                    <Badge
                        className="fs-6"
                        bg={gender === 'die' ? 'danger' : 'primary'}
                    >
                        {gender}
                    </Badge>
                    <Button
                        variant={speaking ? 'danger' : 'primary'}
                        size="sm"
                        onClick={this.toggleSpeaking}
                    >
                        {speaking ? '🔇' : '📢'}
                    </Button>

                    {Stichwort && (
                        <span className="flex-fill text-end">
                            <img src={Stichwort.Bild} alt={Stichwort.text} />
                        </span>
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
