import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import UserData from "./pages/UserData";
import Form from "./pages/Form";
import UpdateUser from "./pages/UpdateUser";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/users" element={<UserData />} />
        <Route path="/user/:id" element={<UpdateUser />} />
      </Routes>
    </>
  );
}

export default App;
