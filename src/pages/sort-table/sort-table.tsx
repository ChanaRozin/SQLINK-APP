import Select from 'react-select';
import { Observer, observer } from "mobx-react-lite";
import { Field } from "react-final-form";
import { useRootStore } from '../../stores/root-store/use-root-store';
import styles from './sort-table.module.scss';

export const SortTable = observer(() => {

    const { listProjectsStore } = useRootStore();

    return (
        <Observer>{() => {
            return (
                <Field
                    name={'sortValue'}>
                    {() => (
                        <Select
                            placeholder={'Sort by:'}
                            className={styles.input}
                            options={listProjectsStore.optionToSort}
                            onChange={(e) => {
                                listProjectsStore.sortBy(e ? e.label : undefined, e ? e.value : undefined)
                            }}
                            maxMenuHeight={424}
                        />
                    )}
                </Field>
            )
        }}
        </Observer>
    );
})
