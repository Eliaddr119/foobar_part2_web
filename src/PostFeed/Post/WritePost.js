import "./WritePost.css";

import { Modal } from "bootstrap";
import { getTodayDate, serverURL } from "../..//userService";
import { useState } from "react";
import { json } from "react-router-dom";

function WritePost({currentUser}) {
  const [postInput, setpostInput] = useState("");
  const [postImage, setImage] = useState("");
  const [setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImage("");
      return;
    }
    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      // Clear the error message after 3 seconds
      setTimeout(() => setError(""), 3_000);
      // Clear the file input
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage("data:image/jpeg;base64," + reader.result.split(",")[1]);
    };

    reader.readAsDataURL(file);
  };

  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36
    const randomNumber = Math.random().toString(36).substr(2, 5); // Generate random number

    return `${timestamp}-${randomNumber}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (postInput === "" && postImage === "") {
      return;
    }
    const token = sessionStorage.getItem("jwt");
    const username = sessionStorage.getItem("username");
    
    const postId = generateUniqueId();
    const newPost = {
      id: postId,
      username: currentUser.username,
      displayName: currentUser.displayName,
      profilePic: currentUser.profilePic,
      content: postInput,
      image: postImage,
    };
    const res = await fetch(serverURL + `/api/users/${username}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    setpostInput("");
    setImage("");
    window.location.reload();
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setpostInput(value);
  };

  return (
    <>
      <div
        className="modal fade"
        id="postModal"
        tabindex="-1"
        aria-labelledby="postModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="postModalLabel">
                Upload a post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="textBoxPost">
                <input
                  name="postContent"
                  value={postInput}
                  onChange={handleChange}
                  placeholder="Write your post here...."
                  id="postInput"
                ></input>

                <div>
                  <label htmlFor="fileInput" className="imageUpLabel">
                    <h4>Upload An Image</h4>
                  </label>
                </div>
                <input
                  type="file"
                  id="imageAdd"
                  name="image"
                  className="input"
                  required
                  onChange={handleImageUpload}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
                label="publishButton"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="container-fluid" id="writePostRectangle">
          <form>
            <div className="postUpFont">Upload A Post</div>
            <input
              className="form-control"
              id="uploadInput"
              type="text"
              placeholder="Write about something !"
              aria-label="Write about something !"
              data-bs-toggle="modal"
              data-bs-target="#postModal"
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}
export default WritePost;
