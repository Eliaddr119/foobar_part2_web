import "./Post.css";
import "../Comment/Comment.js";
import { useState } from "react";
import { useRef } from "react";
import Comment from "../Comment/Comment.js";

function Post(post) {
  const [commentList, setCommentList] = useState(post.comments);
  const [commentShow, setCommentShow] = useState(false);
  const [writeCommentShow, setWriteCommentShow] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [countComments, setCommentCount] = useState(Number(post.commentsCount));

  var likeinit = Number(post.likes);
  const [likes, setLikes] = useState(likeinit);
  const likeButtonRef = useRef(null);
  const handleLikeClick = () => {
    if (likes === post.likes) {
      setLikes(likes + 1);
      likeButtonRef.current.classList.toggle("active");
    } else {
      setLikes(likes - 1);
      likeButtonRef.current.classList.remove("active");
    }
  };


  const handleSubmit = (event) => {
    const storedUserObject = sessionStorage.getItem("current_usr");
    const currentUser = JSON.parse(storedUserObject);
    event.preventDefault();
    const newComment = {
      id: "c" + Number(post.commentsCount) + 1,
      user: {
        username: currentUser.username,
        displayName: currentUser.displayName,
      },
      commentTime: "Just Now",
      content: commentInput,
    };
    setCommentList([...commentList, newComment]);
    setCommentCount(countComments + 1);
    setCommentInput("");
    setCommentShow(true);
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setCommentInput(value);
  };

  return (
    <>
      <div
        className="modal fade"
        id="addCommentModal"
        tabindex="-1"
        aria-labelledby="commentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="commentModalLabel">
                Add a comment
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="textBox" onSubmit={handleSubmit}>
                <input
                  name="commentContent"
                  value={commentInput}
                  onChange={handleChange}
                  placeholder="Write your comment here"
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

      <div className="Post">
        <div className="container-fluid">
          <div id="postRectangle">
            <div className="d-flex">
              <img
                className="rounded-circle"
                alt="avatar1"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
              />
              <div className="fs-2 ms-2 pb-4">
                {post.user.displayName}
                <p className="fs-5 ">{post.postTime}</p>
              </div>
            </div>

            <span className="container-fluid fs-3 pb-5">{post.content}</span>
            <div className="ms-2 pt-2">
              <i className="fs-4 bi bi-hand-thumbs-up-fill"></i>
              <span className="fs-4 ms-2">{likes}</span>
              <div className="text-end fs-4">
                <button
                  onClick={() => setCommentShow(!commentShow)}
                  id="commentsButton"
                >
                  {countComments} Comments
                </button>
              </div>
              <div className="btn-group-lg text-center mt-3" role="group">
                <button
                  onClick={handleLikeClick}
                  type="button"
                  role="button"
                  ref={likeButtonRef}
                  data-bs-toggle="button"
                  aria-pressed="true"
                  className="btn btn-outline-success"
                >
                  <i className="me-2 bi bi-hand-thumbs-up-fill"></i> Like
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  data-bs-toggle="modal"
                  data-bs-target="#addCommentModal"
                >
                  <i className="me-2 bi bi-chat-left-fill"></i>
                  Comment
                </button>
                <button type="button" className="btn btn-outline-success">
                  <i className="me-2 bi bi-share-fill"></i>
                  Share
                </button>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            {commentShow &&
              commentList.map((comment) => <Comment {...comment} />)}
          </div>
        </div>
      </div>
    </>
  );
}
export default Post;
