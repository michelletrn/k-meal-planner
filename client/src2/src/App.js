
import './App.css';
import React, {useState} from 'react';

import {
  NavBar, Home, Footer, Profile, Extras, Login, Logout
} from "./components";

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  return (
    <>
      <NavBar setCurrentPage={setCurrentPage} />
      {currentPage === "Home" && <Home setCurrentPage={setCurrentPage}/>}
      {currentPage === "Profile" && <Profile />}
      {currentPage === "Extras" && <Extras />}
      {currentPage === "Login" && <Login />}
      {currentPage === "Logout" && <Logout />}
      <Footer />

    </>
  );
}

export default App;
