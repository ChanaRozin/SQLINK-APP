import { observer } from "mobx-react-lite";
import { useRootStore } from "../../stores/root-store/use-root-store";
import styles from './top-bar-table.module.scss';
import { FilterTable } from '../filter-table/filter-table';
import { SortTable } from '../sort-table/sort-table';

export const BarTable = observer(() => {

    const { listProjectsStore } = useRootStore();

    return (
        <div className={styles.grid}>
            <div className={styles.statistic}>
                <p>Percentage of projects that have a deadline:
                    <span>{listProjectsStore.percentageProjectsDeadline.toFixed(2)}%</span>
                </p>
                <p>The average of score:
                    <span>{listProjectsStore.averageScore.toFixed(2)}</span>
                </p>
            </div>
            <div className={styles.sortAndFilter}>
                <FilterTable></FilterTable>
                <SortTable></SortTable>
            </div>
        </div>
    );
})
