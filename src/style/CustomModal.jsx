/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import "../style/CustomModal.css";
import { IoIosClose } from "react-icons/io";
const CustomModal = ({ setShowModal, userIdData }) => {
  const { users } = useSelector((state) => state.app);

  const [selectedUser] = users.filter((user) => user.id === userIdData);

  return (
    <div className="modalBackground">
      <div className="modalContainer position-relative">
        <div className="card" style={{ width: "18rem" }}>
          <IoIosClose
            onClick={() => setShowModal(false)}
            className="bg-primary text-light position-absolute end-0 fs-2 cursor-pointer"
            style={{ cursor: "pointer" }}
          />
          <div className="card-body">
            <h5 className="card-title">User Name: {selectedUser.name}</h5>
            <p className="card-text">
              Email id: {selectedUser.email}
              <br />
              Age: {selectedUser.age}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
