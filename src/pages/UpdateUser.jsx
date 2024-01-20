/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../app/features/userDetailSlice";
import { useEffect, useState } from "react";

const UpdateUser = () => {
  const { id } = useParams();

  //   all datas
  const { users: userData, isLoading } = useSelector((state) => state.app);

  //  updated data from existing data
  const [userInputData, setUserInputData] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const [editUser] = userData.filter((user) => user.id === id);
      setUserInputData(editUser);
    }
    //   filtered data from all data
  }, []);

  const newData = (e) => {
    setUserInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userInputData));
    navigate("/users");
  };

  if (isLoading) return <h1>Loading...</h1>;

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
              name="name"
              defaultValue={userInputData && userInputData.name}
              onChange={newData}
            />
          </div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={newData}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            defaultValue={userInputData && userInputData.email}
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
            name="age"
            defaultValue={userInputData && userInputData.age}
            onChange={newData}
          />
        </div>
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              defaultChecked={
                userInputData && userInputData.gender === "female"
              }
              onChange={newData}
            />
            <label className="form-check-label">FEMALE</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              defaultChecked={userInputData && userInputData.gender === "male"}
              onChange={newData}
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

export default UpdateUser;
