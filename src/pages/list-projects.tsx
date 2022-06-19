import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import { useRootStore } from '../stores/root-store/use-root-store';
import { Column, useSortBy, useTable } from "react-table";
import ReactTable from "react-table";
import { type } from 'os';
import isBoolean from 'validator/lib/isBoolean';
import { callbackify } from 'util';
import { MenuItem, Select } from '@mui/material';
import { TypeOfTag } from 'typescript';
import { Project } from '../stores/list-projects-store';
import SearchBar from 'material-ui-search-bar';


export const ListProjects = observer(() => {

  const { listProjectsStore } = useRootStore();

  // .filter(l=>{return l.id=='5fb9953bd98214b6df37174d'});
  // const[flag,setFlag]=useState(false)
  // if(!flag){
  //   listProjectsStore.getListProjectsUser();
  // setFlag(true);
  // }


  useEffect(() => {
    listProjectsStore.getListProjectsUser();
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
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable(
    { columns: columns, data: listProjectsStore.filterValue!==""?listProjectsStore.listProjectsUserFilter: listProjectsStore.listProjectsUser },
  );






  return (
    <div>
      <p></p>
      <p></p>
      <Select
        defaultValue={"id"}
        label={'score'}
        onChange={(e) => listProjectsStore.sortBy(e.target.value)}
      >
        {listProjectsStore.optionToSort.map(item => {
          return (
            <MenuItem value={[item.key, item.type]}>{item.key}</MenuItem>
          )
        })}
      </Select>
      <input type="text" value={listProjectsStore.filterValue} onChange={(e) => { listProjectsStore.filterByName(e.target.value) }}></input>


      {/* <SearchBar onChange={(e)=>{listProjectsStore.filterByName(e)}}></SearchBar> */}
      <table {...getTableProps()}>
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
                  return <td {...cell.getCellProps()}>{typeof cell.value === "boolean" ? cell.value.toString() : cell.value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
})
