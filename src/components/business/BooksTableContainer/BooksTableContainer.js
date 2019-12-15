import React, { useEffect, useState } from "react";
import BooksTable from "./BooksTable/BooksTable";

function BooksTableContainer() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const loadBooks = async () => {
      const pro = await fetch(
        "https://library-book.azurewebsites.net/api/books"
      );
      const booksJson = await pro.json();
      setBooks(booksJson);
    };
    loadBooks();
  }, []);
  //   console.log(books);

  return (
    <>
      {books.length === 0 && <div> Loading</div>}
      {books.length !== 0 && <BooksTable books={books} />}
    </>
  );
}

// export default BooksTableContainer;\
export { BooksTableContainer };
