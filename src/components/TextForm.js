import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";

export default function TextForm(props) {
  const [text, setText] = useState("");

  const handleUpClick = () => {
    if (text.trim() === "") {
      toast.error("Please enter text first", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let newText = text.toUpperCase();
      setText(newText);
      toast.success("Success! Converted to Uppercase", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleLoClick = () => {
    if (text.trim() === "") {
      toast.error("Please enter text first", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let newText = text.toLowerCase();
      setText(newText);
      toast.success("Success! Converted to Lowercase", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleClearClick = () => {
    if (text.trim() === "") {
      toast.error("No text to clear", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let newText = "";
      setText(newText);
      toast.success("Text cleared successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  const handleInverseClick = () => {
    let newText = "";
    for (let i = text.length - 1; i >= 0; i--) {
      newText += text[i];
    }
    setText(newText);
  };

  const handleCapitalise = () => {
    const lowerCase = text.toLowerCase();
    const capitalizedText =
      lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
    setText(capitalizedText);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Message copied!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add text to PDF
    doc.text(text, 10, 10);

    // Save the generated PDF
    doc.save("Text.pdf");

    // Show success message after PDF is generated
    toast.success("PDF downloaded successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div
        className="container"
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            onChange={handleOnChange}
            value={text}
            style={{
              backgroundColor: props.mode === "light" ? "white" : "grey",
              color: props.mode === "dark" ? "white" : "black",
            }}
            id="myBox"
            rows="12"
          ></textarea>
        </div>
        <button onClick={handleUpClick} className="btn btn-primary mx-1 mb-1">
          Convert to Uppercase
        </button>
        <button onClick={handleLoClick} className="btn btn-primary mx-1 mb-1">
          Convert to Lowercase
        </button>
        <button onClick={speak} className="btn btn-primary mx-1 mb-1">
          Speak
        </button>
        <button onClick={handleInverseClick} className="btn btn-primary mx-1 mb-1">
          Text Inverse
        </button>
        <button onClick={handleCapitalise} className="btn btn-primary mx-1 mb-1">
          Capitalise
        </button>
        <button onClick={copyText} className="btn btn-primary mx-1 mb-1">
          Copy to Clipboard
        </button>
        <button onClick={handleClearClick} className="btn btn-primary mx-1 mb-1">
          Clear Text
        </button>
        <button className="btn btn-primary mx-1 mb-1" onClick={generatePDF}>
          Download PDF
        </button>
      </div>
      <div
        className="container my-2"
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <h2>Your Text Summary</h2>
        <p>
          {text.split(" ").filter((word) => word !== "").length} words and{" "}
          {text.length} characters
        </p>
        <p>
          {0.008 * text.split(" ").filter((word) => word !== "").length} minutes
          reading time
        </p>
        <h2>Preview</h2>
        <p>
          {text.length > 0
            ? text
            : "Enter something in the textbox above to preview it here."}
        </p>
      </div>
      <ToastContainer />
    </>
  );
}
