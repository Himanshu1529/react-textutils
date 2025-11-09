import "./App.css";
// import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light"); //Wheather Dark Mode Enable Or Not!
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      // setInterval(() => {
      //   document.title = "Insatll Now";
      // }, 2000);
      // setInterval(() => {
      //   document.title = "Virus Here";
      // }, 1500);
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  return (
    <>
      <Navbar
        title="TextUtils"
        aboutText="About us"
        mode={mode}
        toggleMode={toggleMode}
      />
      <div className="container my-3">
        {/* Directly render TextForm or About here based on your needs */}
        <TextForm heading="Enter your text to analyze below" mode={mode} />
        {/* If you want to display About instead, simply replace TextForm with About */}
        {/* <About />*/}
      </div>
    </>
  );
}

export default App;
