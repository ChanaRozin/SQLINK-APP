import Select from 'react-select';
import { Observer, observer } from "mobx-react-lite";
import { Field } from "react-final-form";
import { FinalFormInput } from "../../shared/lib/form/input/input";
import { useRootStore } from "../../stores/root-store/use-root-store";
import styles from './top-bar-table.module.scss';

export const BarTable = observer((props: any) => {

    const { listProjectsStore } = useRootStore();

    return (
        <div className={styles.grid}>
            <div className={styles.statistic}>
            <p>Percentage of projects that have a deadline: <span>{listProjectsStore.percentageProjectsDeadline.toFixed(3)}%</span></p>
            <p>The average of score: <span>{listProjectsStore.averageScore.toFixed(3)}</span></p>
            </div>
            <Field
                placeholder={'Filter by name:'}
                type={'text'}
                component={FinalFormInput}
                name={'filterValue'} />
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
                    </Field>)
            }}
            </Observer>
        </div>
    );
})
