import Post from "../Post/Post";
import SideMenu from "../SideMenu/SideMenu";
import posts from "./posts.json";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Modal } from "bootstrap";

function FeedPage() {
  const [postsList, setPostsList] = useState(posts);
  const [postInput, setpostInput] = useState("");

  const handleSubmit = (event, postId) => {
    const storedUserObject = sessionStorage.getItem("current_usr");
    const currentUser = JSON.parse(storedUserObject);
    event.preventDefault();
    if (postInput === "") {
      return;
    }
    const newPost = {
      id: toString(postsList.length + 1),
      user: {
        username: currentUser.username,
        displayName: currentUser.displayName,
      },
      commentTime: "Just Now",
      content: postInput,
      likes: 0,
      commentsCount: "0",
      comments: [],
    };
    setPostsList([...postsList, newPost]);
    setpostInput("");
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

      <body>
      <div className="container-fluid" id="feedContainer">
        <Navbar/>

        <div className="row mt-5">
          <div className="col-3" id="sideCol">
            <div className>
              <SideMenu />
            </div>
          </div>
          <div class="col-6  ">
            <div className="row">
              <div className="container-fluid">
                <div className="writePostRectangle">
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
                </div>
              </div>
            </div>
            {postsList.map((post, key) => (
              <Post {...post} key={post.id} />
            ))}
          </div>
        </div>
        
      </div>
      </body>
    </>
  );
}
export default FeedPage;
