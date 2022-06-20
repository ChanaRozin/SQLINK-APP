import Select from 'react-select';
import { Observer, observer } from "mobx-react-lite";
import { Field } from "react-final-form";
import { useRootStore } from '../../stores/root-store/use-root-store';
import { FinalFormInput } from '../../shared/lib/form/input/input';
import styles from './filter-table.module.scss';

export const FilterTable = observer(() => {

    const { listProjectsStore } = useRootStore();

    return (
        <Observer>{() => {
            return (
                <div>
                    <Field
                        name={'filterBy'}>
                        {() => (
                            <Select
                                placeholder={'Select colum to filter'}
                                className={styles.input}
                                options={listProjectsStore.optionToSort}
                                onChange={(e) => {
                                    listProjectsStore.setColumFilter(e ? e.label : undefined)
                                }}
                                maxMenuHeight={424}
                            />
                        )}
                    </Field>
                    <Field
                        placeholder={'Value to filter:'}
                        type={'text'}
                        component={FinalFormInput}
                        name={'filterValue'} />
                </div>
            )
        }}
        </Observer>
    );
})
