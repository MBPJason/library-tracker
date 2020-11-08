import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Input from "../../components/Input/Input";
import axios from "axios";

const NewBookForm = ({handleSubmit, toggleModal, authors, setAuthors}) => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  useEffect(() => {
    getAuthorsForDropdown();
  }, []);

  const getAuthorsForDropdown = () => {
    axios
      .get("/api/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={(e) => {handleSubmit(e, title, pages, selectedAuthor)}}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={title}
        handleChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Input
        label="Pages"
        id="pages"
        name="pages"
        value={pages}
        handleChange={(e) => {
          setPages(e.target.value);
        }}
      />
      <div className="form-group">
        <select
          className="custom-select"
          id="authors"
          value={selectedAuthor}
          onChange={(e) => {
            setSelectedAuthor(e.target.value);
          }}
        >
          <option value="">Select an author...</option>
          {authors.map((author) => (
            <option value={author._id} key={author._id}>
              {author.fullName}
            </option>
          ))}
        </select>
        <button className="btn btn-link" onClick={toggleModal} type="button">
          Don't see your author? Add them here.
        </button>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Create New Book
        </button>
      </div>
    </form>
  );
};

NewBookForm.propTypes = {};

export default NewBookForm;
