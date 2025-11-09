import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";
import $ from "jquery"; // required for Summernote

export default function TextForm(props) {
  const [text, setText] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    if (window.$ && $(editorRef.current).summernote) {
      $(editorRef.current).summernote({
        height: 300,
        placeholder: "Start typing here...",
        callbacks: {
          onChange: function (contents) {
            setText(contents);
          },
        },
      });
    } else {
      console.error("Summernote not loaded properly");
    }

    return () => {
      if ($(editorRef.current).summernote) {
        $(editorRef.current).summernote("destroy");
      }
    };
  }, []);

  const getPlainText = () => text.replace(/<[^>]+>/g, "").trim();

  const handleUpClick = () => {
    const plain = getPlainText();
    if (!plain) return toast.error("Please enter text first");
    const upper = plain.toUpperCase();
    setText(upper);
    $(editorRef.current).summernote("code", upper);
    toast.success("Converted to Uppercase");
  };

  const handleLoClick = () => {
    const plain = getPlainText();
    if (!plain) return toast.error("Please enter text first");
    const lower = plain.toLowerCase();
    setText(lower);
    $(editorRef.current).summernote("code", lower);
    toast.success("Converted to Lowercase");
  };

  const handleClearClick = () => {
    const plain = getPlainText();
    if (!plain) return toast.error("No text to clear");
    setText("");
    $(editorRef.current).summernote("code", "");
    toast.success("Cleared text");
  };

  const speak = () => {
    const msg = new SpeechSynthesisUtterance(getPlainText());
    window.speechSynthesis.speak(msg);
  };

  const handleInverseClick = () => {
    const plain = getPlainText().split("").reverse().join("");
    setText(plain);
    $(editorRef.current).summernote("code", plain);
  };

  const handleCapitalise = () => {
    const plain = getPlainText();
    if (!plain) return toast.error("Please enter text first");
    const cap = plain.charAt(0).toUpperCase() + plain.slice(1).toLowerCase();
    setText(cap);
    $(editorRef.current).summernote("code", cap);
  };

  const copyText = () => {
    navigator.clipboard.writeText(getPlainText());
    toast.success("Copied to clipboard!");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(getPlainText(), 10, 10);
    doc.save("Text.pdf");
    toast.success("PDF downloaded!");
  };

  const wordCount = getPlainText().split(/\s+/).filter(Boolean).length;

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <div ref={editorRef} id="summernote" />
        </div>

        <button onClick={handleUpClick} className="btn btn-primary mx-1 mb-1">
          Uppercase
        </button>
        <button onClick={handleLoClick} className="btn btn-primary mx-1 mb-1">
          Lowercase
        </button>
        <button onClick={speak} className="btn btn-primary mx-1 mb-1">
          Speak
        </button>
        <button onClick={handleInverseClick} className="btn btn-primary mx-1 mb-1">
          Inverse
        </button>
        <button onClick={handleCapitalise} className="btn btn-primary mx-1 mb-1">
          Capitalise
        </button>
        <button onClick={copyText} className="btn btn-primary mx-1 mb-1">
          Copy
        </button>
        <button onClick={handleClearClick} className="btn btn-primary mx-1 mb-1">
          Clear
        </button>
        <button onClick={generatePDF} className="btn btn-primary mx-1 mb-1">
          PDF
        </button>
      </div>

      <div
        className="container my-2"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2>Your Text Summary</h2>
        <p>{wordCount} words and {getPlainText().length} characters</p>
        <p>{(0.008 * wordCount).toFixed(2)} minutes read</p>
        <h2>Preview</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: text || "<em>Enter text to preview here...</em>",
          }}
        />
      </div>
      <ToastContainer />
    </>
  );
}

