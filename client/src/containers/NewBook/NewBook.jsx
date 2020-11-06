import React, { useContext, useState } from "react";
import AlertContext from "../../context/AlertContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NewBookForm from "./NewBookForm";
import NewBookModal from "./NewBookModal";
import Alert from "../../components/Alert/Alert";

const NewBook = () => {
  const [showModal, setShowModal] = useState(false);
  const [authors, setAuthors] = useState([]);
  const history = useHistory();
  const { setAlert } = useContext(AlertContext);

  const handleSubmit = (e, title, pages, author) => {
    e.preventDefault();
    axios
      .post("/api/books", { title, pages, author })
      .then((response) => {
        console.log(response.data);
        setAlert({
          message: "Successfully created your book.",
          type: "success",
        });
        history.push(`/books/${response.data._id}`);
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          message: "An error occurred creating your book.",
          type: "danger",
        });
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
          <NewBookForm
            handleSubmit={handleSubmit}
            toggleModal={toggleModal}
            authors={authors}
            setAuthors={setAuthors}
          />
        </div>
      </div>
      <NewBookModal
        showModal={showModal}
        setShowModal={setShowModal}
        toggleModal={toggleModal}
        authors={authors}
        setAuthors={setAuthors}
      />
    </div>
  );
};

export default NewBook;
