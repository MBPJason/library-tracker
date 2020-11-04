import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const history = useHistory();
  //   const [state, setState] = useState({
  //       title: "",
  //       pages: ""
  //   })

  //   const handleInputChange = (e) => {
  //       const {name, value} = e.target;
  //       setState({
  //           ...state,
  //           [name]: value
  //       })
  //   }
  useEffect(() => {
    axios
      .get("/api/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/books", { title, pages, author: selectedAuthor })
      .then((response) => {
        console.log(response.data);
        history.push(`/books/${response.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pages">Pages</label>
              <input
                type="text"
                className="form-control"
                id="pages"
                name={pages}
                value={pages}
                onChange={(e) => {
                  setPages(e.target.value);
                }}
              />
            </div>
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
              <button className="btn btn-link">
                Don't see your author? Add them here.
              </button>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Create New Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
