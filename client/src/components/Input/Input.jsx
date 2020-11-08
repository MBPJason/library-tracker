import React from "react";
import PropTypes from "prop-types";

const Input = ({label, id, name, value, handleChange}) => {
  return (
    <div className="form-group">
      <label htmlFor="pages">{label}</label>
      <input
        type="text"
        className="form-control"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
