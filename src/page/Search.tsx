import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    FloatingLabel,
    FormControl
} from 'boot-cell';
import debounce from 'lodash.debounce';
import { component, observer } from 'web-cell';

import { Gender, Word, wordStore } from '../model';

const GenderColor = {
    [Gender.der]: 'primary',
    [Gender.die]: 'danger',
    [Gender.das]: 'success'
} as const;

@observer
@component({
    tagName: 'search-page'
})
export class SearchPage extends HTMLElement {
    handleSearch = debounce(({ data }: InputEvent) => {
        wordStore.clearList();

        if (data) wordStore.getList({ keyword: data });
    }, 500);

    renderWord = ({ text, gender, chinese }: Word) => (
        <li className="col-12 col-sm-6 col-md-4 col-lg-3 h-100">
            <Card className="shadow-sm">
                <CardHeader>
                    <Badge bg={GenderColor[Gender[gender]]}>{gender}</Badge>
                </CardHeader>
                <CardBody>
                    <CardTitle>{text}</CardTitle>
                    <a
                        className="text-decoration-none stretched-link"
                        href={`#word/${text}`}
                    >
                        {chinese}
                    </a>
                </CardBody>
            </Card>
        </li>
    );

    render() {
        const { allItems } = wordStore;

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
                            name="keyword"
                            placeholder="Word Instant Search"
                            onInput={this.handleSearch}
                        />
                    </FloatingLabel>
                </form>
                <ol className="list-unstyled row g-3">
                    {allItems.map(this.renderWord)}
                </ol>
            </>
        );
    }
}
