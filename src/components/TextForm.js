import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";

// Import jQuery and Summernote
import $ from "jquery";
import "summernote/dist/summernote-bs4.css";
import "summernote/dist/summernote-bs4.js";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const editorRef = useRef(null);

  // Initialize Summernote once
  useEffect(() => {
    $(editorRef.current).summernote({
      height: 300,
      placeholder: "Start typing here...",
      callbacks: {
        onChange: function (contents) {
          setText(contents);
        },
      },
    });

    // Cleanup on unmount
    return () => {
      $(editorRef.current).summernote("destroy");
    };
  }, []);

  const showError = (msg) =>
    toast.error(msg, { position: "top-right", autoClose: 2000 });

  const showSuccess = (msg) =>
    toast.success(msg, { position: "top-right", autoClose: 2000 });

  const handleUpClick = () => {
    const plainText = $(editorRef.current).summernote("code").replace(/<[^>]+>/g, "");
    if (!plainText.trim()) return showError("Please enter text first");

    const newText = plainText.toUpperCase();
    setText(newText);
    $(editorRef.current).summernote("code", newText);
    showSuccess("Converted to Uppercase");
  };

  const handleLoClick = () => {
    const plainText = $(editorRef.current).summernote("code").replace(/<[^>]+>/g, "");
    if (!plainText.trim()) return showError("Please enter text first");

    const newText = plainText.toLowerCase();
    setText(newText);
    $(editorRef.current).summernote("code", newText);
    showSuccess("Converted to Lowercase");
  };

  const handleClearClick = () => {
    const plainText = $(editorRef.current).summernote("code").replace(/<[^>]+>/g, "");
    if (!plainText.trim()) return showError("No text to clear");

    $(editorRef.current).summernote("code", "");
    setText("");
    showSuccess("Text cleared successfully");
  };

  const speak = () => {
    const plainText = $(editorRef.current).summernote("code").replace(/<[^>]+>/g, "");
    const msg = new SpeechSynthesisUtterance(plainText);
    window.speechSynthesis.speak(msg);
  };

  const handleInverseClick = () => {
    const plainText = $(editorRef.current).summernote("code").replace(/<[^>]+>/g, "");
    const newText = plainText.split("").reverse().join("");
    setText(newText);
    $(editorRef.current).summernote("code", newText);
  };

  const handleCapitalise = () => {
    const plainText = $(editorRef.current).summernote("code").replace(/<[^>]+>/g, "");
    if (!plainText.trim()) return showError("Please enter text first");

    const capitalizedText =
      plainText.charAt(0).toUpperCase() + plainText.slice(1).toLowerCase();
    setText(capitalizedText);
    $(editorRef.current).summernote("code", capitalizedText);
    showSuccess("Capitalized first letter");
  };

  const copyText = () => {
    const plainText = $(editorRef.current).summernote("code").replace(/<[^>]+>/g, "");
    navigator.clipboard.writeText(plainText);
    showSuccess("Message copied!");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const plainText = $(editorRef.current).summernote("code").replace(/<[^>]+>/g, "");
    doc.text(plainText, 10, 10);
    doc.save("Text.pdf");
    showSuccess("PDF downloaded successfully!");
  };

  const wordCount = text.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;

  return (
    <>
      <div
        className="container"
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <h1>{props.heading}</h1>

        {/* Summernote Editor */}
        <div className="mb-3">
          <div
            ref={editorRef}
            id="summernote"
            style={{
              backgroundColor: props.mode === "light" ? "white" : "grey",
              color: props.mode === "dark" ? "white" : "black",
            }}
          />
        </div>

        {/* Buttons */}
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

      {/* Summary */}
      <div
        className="container my-2"
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <h2>Your Text Summary</h2>
        <p>
          {wordCount} words and {text.replace(/<[^>]+>/g, "").length} characters
        </p>
        <p>{0.008 * wordCount} minutes reading time</p>
        <h2>Preview</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: text.length > 0 ? text : "<em>Enter text to preview</em>",
          }}
        />
      </div>

      <ToastContainer />
    </>
  );
}
