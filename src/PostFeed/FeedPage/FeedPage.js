import Post from "../Post/Post";
import SideMenu from "../SideMenu/SideMenu";
import posts from "./posts.json";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Modal } from "bootstrap";
import userService, { getTodayDate } from "../..//userService"

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

  const handleSubmit = (event, postId) => {
    const storedUserObject = sessionStorage.getItem("current_usr");
    const currentUser = JSON.parse(storedUserObject);
    event.preventDefault();
    if (postInput === "") {
      return;
    }
    const todayDate = getTodayDate();
    const newPost = {
      id: toString(postsList.length + 1),
      user: {
        username: currentUser.username,
        displayName: currentUser.displayName,
        image: currentUser.image
      },
      postTime:todayDate,
      content: postInput,
      likes: 0,
      commentsCount: "0",
      comments: [],
    };
    setPostsList([newPost, ...postsList]);
    setpostInput("");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setpostInput(value);
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
    return <Post {...post} key={post.id} data-bs-theme="dark" />;
  });
  return (
    <body data-bs-theme={isDarkMode}>
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
              <form id="textBoxPost" onSubmit={handleSubmit}>
                <input
                  name="commentContent"
                  value={postInput}
                  onChange={handleChange}
                  placeholder="Write your post here...."
                  id="commentInput"
                ></input>
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
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

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
