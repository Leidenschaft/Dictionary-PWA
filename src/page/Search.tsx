import { Badge, Card, FloatingLabel, FormControl, Status } from 'boot-cell';
import debounce from 'lodash.debounce';
import { component, observer } from 'web-cell';

import { Gender, Word, word } from '../model';

const GenderColor = {
    [Gender.der]: Status.primary,
    [Gender.die]: Status.danger,
    [Gender.das]: Status.success
};

@observer
@component({
    tagName: 'search-page'
})
export class SearchPage extends HTMLElement {
    handleSearch = debounce(({ data }: InputEvent) => {
        word.clearList();
        word.getList({ keyword: data });
    }, 500);

    renderWord = ({ text, gender, chinese }: Word) => (
        <li className="col-12 col-sm-6 col-md-4 col-lg-3 h-100">
            <Card
                className="shadow-sm"
                title={text}
                header={
                    <Badge bg={GenderColor[Gender[gender]]}>{gender}</Badge>
                }
            >
                {chinese}
            </Card>
        </li>
    );

    render() {
        const { allItems } = word;

        return (
            <>
                <form
                    className="my-3"
                    onSubmit={(event: Event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                >
                    <FloatingLabel label="Word Instant Search">
                        <FormControl
                            type="search"
                            placeholder="Word Instant Search"
                            onInput={this.handleSearch}
                        />
                    </FloatingLabel>
                </form>
                <ol className="list-unstyled row">
                    {allItems.map(this.renderWord)}
                </ol>
            </>
        );
    }
}
