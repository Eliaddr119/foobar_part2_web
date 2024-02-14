import "./Comment.css";
import "../Post/Post";
import { useState } from "react";

function Comment({
  commentList,
  setCommentList,
  countComments,
  setCommentCount,
  comment,
}) {
  const storedUserObject = sessionStorage.getItem("current_usr");
  const currentUser = JSON.parse(storedUserObject);

  const deleteComment = () => {
    setCommentList((prevList) =>
      prevList.filter((item) => item.id !== comment.id)
    );
    setCommentCount(countComments - 1);
  };

  const editEligble = () => {
    if (currentUser.username === comment.user.username) {
      return true;
    }
    return false;
  };

  const [canEdit, setCanEdit] = useState(editEligble);
  const [showEdit, setShowEdit] = useState(false);
  const [commentInput, setCommentInput] = useState(comment.content);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (commentInput === "") {
      return;
    }
    comment.content = commentInput;
    setCommentList(commentList);
    setShowEdit(false);

  };
  const handleChange = (event) => {
    const value = event.target.value;
    setCommentInput(value);
  };

  return (
    <><div
      className="modal fade"
      id="commentEditModal"
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
                name="postContent"
                value={editInput}
                onChange={handleChange}
                placeholder="Write your post here...."
                id="editInput"
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
    
    
    <div className="card text-bg-light" id="commentCard">
      <div className="container">
        {canEdit && (
          <div class="btn-group" id="editOptions">
            <button
              class="btn btn-success btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Comments Options
            </button>
            <ul class="dropdown-menu text-center">
              <li>
                <button class="dropdown-item" onClick={deleteComment}>
                  Delete Comment
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setShowEdit(true)}
                >
                  Edit Comment
                </button>
              </li>
            </ul>
          </div>
        )}

        <div className="d-flex" id="commentBody">
          <img
            id="commentImage"
            className="rounded-circle"
            alt="avatar1"
            src={comment.user.image}
          />
          <div className="fs-4 ms-2">
            {comment.user.displayName}
            <p className="fs-5 ">{comment.commentTime}</p>
          </div>
        </div>

        {!showEdit && (
          <span className="container-fluid fs-4">{comment.content}</span>
        )}
        {showEdit && (
          <span className="container-fluid fs-4">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                name="commentContent"
                id="commentEditInput"
                value={commentInput}
                onChange={handleChange}
              ></input>
              <button
                className="btn btn-success"
                type="submit"
                id="commentEditConfirm"
              >
                Confirm
              </button>
              <button className="btn btn-outline-secondary" id="commentEditCancelButton" onClick={() => setShowEdit(false)}>
                  Cancel
                </button>
            </form>
          </span>
        )}

        <div className="ms-2 pt-2"></div>
      </div>
    </div>
  );
}
export default Comment;
