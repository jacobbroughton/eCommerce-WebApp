import React, { useState } from "react";
import axios from "axios";

const PhotoTest = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myFile", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://localhost:5000/api/upload", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  };


  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="Choose a file"
          type="file"
          name="myFile"
          onChange={e => setFile(e.target.files[0])}
          accept="image/png, image/jpeg, image/jpg"
        />
        <input type="submit" placeholder="Post" />
      </form>
    </div>
  );
};

export default PhotoTest;
