import Post from "../Post/Post";
import SideMenu from "../SideMenu/SideMenu";
import posts from "./posts.json";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Modal } from "bootstrap";
import userService, { getTodayDate } from "../..//userService";
import WritePost from "../Post/WritePost";

function FeedPage() {
  const [postsList, setPostsList] = useState(posts);
  const [postInput, setpostInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState("light");

  const toggleDarkMode = () => {
    if (isDarkMode === "light") {
      setIsDarkMode("dark");
    } else {
      setIsDarkMode("light");
    }
  };

  

  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setIsDarkMode("dark");
    } else {
      setIsDarkMode("light");
    }
  };

  const listOfPosts = postsList.map((post, key) => {
    return <Post post={post} key={post.id} postsList={postsList} setPostsList={setPostsList} />;
  });

  const [postImage, setImage] = useState(null);
  const [error, setError] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImage(null);
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
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <body data-bs-theme={isDarkMode}>
      <Navbar />
      <div className="row mt-5"></div>
      <div className="row mt-5 mb-5"></div>
      <div className="row mt-5 mb-5 ">
        <div className="col-3" id="sideCol">
          <div className>
            <SideMenu />
          </div>
        </div>

        <div class="col-6" id="postCol">
          

          <WritePost postsList={postsList} setPostsList={setPostsList}/>
          {listOfPosts}
        </div>

        <div className="col-3" id="darkModeSwitch">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="switch"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              dark Mode
            </label>
          </div>
        </div>
      </div>
    </body>
  );
}
export default FeedPage;
