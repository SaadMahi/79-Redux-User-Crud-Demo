/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../app/features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [users, setUsers] = useState({});

  const { users: userData } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getUserData = (e) => {
    setUsers((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(users));
    navigate("/users");
  };

  return (
    <div>
      <h2 className="w-50 mx-auto my-5">Fill the form</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              onChange={getUserData}
              name="name"
            />
          </div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={getUserData}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
          />
          <div id="emailHelp" className="form-text">
            We will never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={getUserData}
            name="age"
          />
        </div>
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="female"
              onChange={getUserData}
            />
            <label className="form-check-label">FEMALE</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="male"
              onChange={getUserData}
            />
            <label className="form-check-label">MALE</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary my-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
