import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Ensure React Quill is not rendered on the server
});

const ReactQuillWrapper = ({ value, onChange }) => {
  const [text, setText] = useState(value);
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleChange = (value) => {
    console.log(value);
    setText(value);
  };

  return (
    <div>
      <ReactQuill
        style={{ height: "300px" }}
        value={text}
        onChange={handleChange}
        formats={formats}
        modules={modules}
      />
    </div>
  );
};

export default ReactQuillWrapper;
