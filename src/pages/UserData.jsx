/* eslint-disable react-hooks/exhaustive-deps */
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../app/features/userDetailSlice";
import CustomModal from "../style/CustomModal";
import { Link } from "react-router-dom";

const UserData = () => {
  const dispatch = useDispatch();
  const { users, isLoading, searchUser } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [userIdData, setUserIdData] = useState(null);
  const [radioFilter, setRadioFilter] = useState("");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h2 className="text-center">All User Data</h2>

      <div className="d-flex justify-content-center my-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            checked={radioFilter === ""}
            onChange={() => setRadioFilter("")}
          />
          <label className="form-check-label">ALL</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="male"
            checked={radioFilter === "male"}
            onChange={() => setRadioFilter("male")}
          />
          <label className="form-check-label">MALE</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="female"
            checked={radioFilter === "female"}
            onChange={() => setRadioFilter("female")}
          />
          <label className="form-check-label">FEMALE</label>
        </div>
      </div>

      <div className="flex d-flex flex-wrap justify-content-center gap-10">
        {users &&
          users
            .filter((users) => {
              if (!searchUser || searchUser.length === 0) {
                return users;
              } else {
                return users.name
                  .toLowerCase()
                  .includes(searchUser.toLowerCase());
              }
            })
            .filter((users) => {
              if (radioFilter === "male") {
                return users.gender === radioFilter;
              } else if (radioFilter === "female") {
                return users.gender === radioFilter;
              } else {
                return users;
              }
            })
            .map((user) => (
              <div key={user.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {user.gender}
                    </h6>
                    <p className="card-text">{user.email}</p>
                    <a className="card-link">
                      <FaEye
                        onClick={() => [
                          setShowModal(true),
                          setUserIdData(user.id),
                        ]}
                      />
                    </a>
                    <Link to={`/user/${user.id}`} className="card-link">
                      <FaRegEdit />
                    </Link>
                    <a className="card-link">
                      <MdAutoDelete
                        onClick={() => dispatch(deleteUser(user.id))}
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
      </div>
      {showModal && (
        <CustomModal setShowModal={setShowModal} userIdData={userIdData} />
      )}
    </div>
  );
};

export default UserData;
