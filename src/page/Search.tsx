import { component, mixin, createCell, Fragment } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { Status } from 'boot-cell/source/utility/constant';
import { Field } from 'boot-cell/source/Form/Field';
import { Card } from 'boot-cell/source/Content/Card';
import { Badge } from 'boot-cell/source/Reminder/Badge';
import debounce from 'lodash.debounce';

import { Gender, Word, word } from '../model';

const GenderColor = {
    [Gender.der]: Status.primary,
    [Gender.die]: Status.danger,
    [Gender.das]: Status.success
};

@observer
@component({
    tagName: 'search-page',
    renderTarget: 'children'
})
export class SearchPage extends mixin() {
    handleSearch = debounce(
        ({ data }: InputEvent) => word.getList({ keyword: data }),
        500
    );

    renderWord = ({ text, gender, chinese }: Word) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 h-100">
            <Card
                className="shadow-sm"
                title={text}
                header={
                    <Badge color={GenderColor[Gender[gender]]}>{gender}</Badge>
                }
            >
                {chinese}
            </Card>
        </div>
    );

    render() {
        const { list } = word;

        return (
            <>
                <form
                    className="my-3"
                    onSubmit={(event: Event) => {
                        event.preventDefault(), event.stopPropagation();
                    }}
                >
                    <Field
                        type="search"
                        placeholder="Word Instant Search"
                        onInput={this.handleSearch}
                    />
                </form>
                <main className="row">{list.map(this.renderWord)}</main>
            </>
        );
    }
}
