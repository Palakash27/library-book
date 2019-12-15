import React from "react";
import { useTable } from "react-table";

const headerMapping = [
  "id",
  "isbn",
  "title",
  "pageCount",
  "publishedDate",
  "thumbnailUrl"
];

const genTableHeader = headerData => {
  //   const { isbn, title, pageCount, publishedDate } = headerData;
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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BooksTable;
