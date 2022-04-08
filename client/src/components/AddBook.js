import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  addBookMutation,
  getAuthorsQuery,
  getBooksQuery,
} from "../queries/queries";
const AddBooks = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, { newData }] = useMutation(addBookMutation);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const getAuthors = () => {
    if (loading) return <option>Loading Authors...</option>;
    if (error) return <option>Error Loading Authors :(</option>;

    return (
      (<option value="">Select Author</option>),
      data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {getAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBooks;
