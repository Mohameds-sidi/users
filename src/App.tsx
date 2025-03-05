import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUserPage from "./pages/AddUserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addUser" element={<AddUserPage />} />
        {/* <Route path="/editUser/:id" element={<EditUserPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
