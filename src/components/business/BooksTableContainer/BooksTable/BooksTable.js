import React from "react";
import propTypes from "prop-types";
import { useTable, useSortBy } from "react-table";

const headerMapping = [
  "id",
  "isbn",
  "title",
  "pageCount",
  "publishedDate",
  "thumbnailUrl"
];

const genTableHeader = headerData => {
  return Object.keys(headerData)
    .filter(key => headerMapping.includes(key))
    .map(key => ({
      Header: key.toUpperCase(),
      accessor: key
    }));
};

const BooksTable = props => {
  const columns = genTableHeader(props.books[0]);
  const data = props.books;
  const tablePayload = { columns, data };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(tablePayload, useSortBy);

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {column.isSorted && (
                  <span>{column.isSortedDesc ? " 🔽" : " 🔼"}</span>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

BooksTable.propTypes = {
  books: propTypes.arrayOf(propTypes.object).isRequired
};

export default BooksTable;
