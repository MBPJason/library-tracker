import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showModal, setShowModal] = useState(false);
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
    getAuthorsForDropdown();
  }, []);

  const createAuthor = (e) => {
    e.preventDefault();
    axios
      .post("/api/authors", { firstName, lastName })
      .then((response) => {
        console.log(response.data);
        toggleModal();
        getAuthorsForDropdown();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const toggleModal = () => {
    setShowModal(!showModal);
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
              <button
                className="btn btn-link"
                onClick={toggleModal}
                type="button"
              >
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
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="pages">First Name</label>
              <input
                type="text"
                className="form-control"
                id="pages"
                name="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pages">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="pages"
                name="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={createAuthor}>
            Create Author
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewBook;
