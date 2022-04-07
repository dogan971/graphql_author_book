import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { getAuthorsQuery } from "../queries/queries";

export default function AddBooks() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const displayAuthors = () => {
    if (loading) return <option disabled>Loading...</option>;
    if (error) return <option disabled>Error Loading authors</option>;
    if (data) {
      const { authors } = data;
      return authors.map((author, index) => {
        return (
          <option key={index} value={author.id}>
            {" "}
            {author.name}{" "}
          </option>
        );
      });
    }
  };

  return (
    <div>
      {/* <ul id="book-list">
                {displayBooks()}
            </ul> */}
      <form id="add-book">
        <div className="field">
          <label>Book Name</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author</label>
          <select>
            <option>Select author</option>
            {displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    </div>
  );
}
