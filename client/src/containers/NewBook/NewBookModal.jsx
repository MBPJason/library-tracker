import React, { useContext, useState } from "react";
import AlertContext from "../../context/AlertContext";
import PropTypes from "prop-types";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Input from "../../components/Input/Input";

const NewBookModal = ({ showModal, toggleModal, setAuthors }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { setAlert } = useContext(AlertContext);

  const createAuthor = (e) => {
    e.preventDefault();
    axios
      .post("/api/authors", { firstName, lastName })
      .then((response) => {
        console.log(response.data);
        toggleModal();
        getAuthorsForDropdown();
        setAlert({
          message: "Successfully created new author",
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setAlert({
            message: "Failed to create new author",
            type: "danger",
          });
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
  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Input
            label="First Name"
            id="firstName"
            name="firstName"
            value={firstName}
            handleChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Input
            label="Last Name"
            id="lastName"
            name="lastName"
            value={lastName}
            handleChange={(e) => {
              setLastName(e.target.value);
            }}
          />
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
  );
};

NewBookModal.propTypes = {};

export default NewBookModal;
