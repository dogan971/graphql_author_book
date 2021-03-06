import React from "react";
import { getBookQuery } from "../queries/queries";
import { useQuery } from "@apollo/react-hooks";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    skip: !bookId,
    variables: { id: bookId },
  }); 

  let content;

  if (loading) content = <p>Loading...</p>;
  else if (error) content = <p>Error :(</p>;
  else if (!bookId) content = <p>No book selected</p>;
  else {
    const {
      book: { name, genre, authorId },
    } = data;

    const books = authorId.books.map(({ id, name }) => {
      return <li key={id}>{name}</li>;
    });
    content = (
      <>
        <h2>{name}</h2>
        <p>{genre}</p>
        <p>{authorId.name}</p>
        <p>All boooks by this author</p>
        <ul className="other-books">{books}</ul>
      </>
    );
  }

  return <div id="book-details">{content}</div>;
};

export default BookDetails;
