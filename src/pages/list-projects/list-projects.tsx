import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { useRootStore } from '../../stores/root-store/use-root-store';
import { useTable } from "react-table";
import { Card } from '@mui/material';
import { ListProjectForm } from '../../stores/list-projects-store';
import { Form } from 'react-final-form';
import { Button } from '../../shared/lib/button/button';
import { Table } from 'react-bootstrap';
import styles from './list-projects.module.scss';
import { BarTable } from '../top-bar-table/top-bar-table';
import { Title } from '../../shared/title/title';

export const ListProjects = observer(() => {

  const { listProjectsStore } = useRootStore();

  useEffect(() => {
    listProjectsStore.getListProjectsUser();
    // eslint-disable-next-line
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Projects",
        columns: listProjectsStore.columnsData
      },
    ],
    [listProjectsStore.columnsData]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    { columns: columns, data: listProjectsStore.listProjectsUserFilter },
  );

  return (
    <Card>
      <Form<ListProjectForm>
        onSubmit={listProjectsStore.filterByName}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Title title={"List Projects"}></Title>
            <BarTable></BarTable>
            <Table {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>{column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return <td className={cell.column.id === 'score' ? Number(cell.value) > 90 ? styles.green : Number(cell.value) < 70 ? styles.red : "" : ""} {...cell.getCellProps()}> {typeof cell.value === "boolean" ? cell.value.toString() : cell.value}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button
            >
              Filter
            </Button>
          </form>
        )}
      </Form>
    </Card>
  );
})
