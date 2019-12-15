import React from "react";
import propTypes from "prop-types";
import { useTable, useSortBy, usePagination } from "react-table";

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
  const tablePayload = {
    columns,
    data,
    initialState: { pageIndex: 0, pageSize: 20 }
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(tablePayload, useSortBy, usePagination);

  // Render the UI for your table
  return (
    <>
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
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          type="button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          type="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNo = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNo);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pgSize => (
            <option key={pgSize} value={pgSize}>
              Show {pgSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

BooksTable.propTypes = {
  books: propTypes.arrayOf(propTypes.object).isRequired
};

export default BooksTable;
