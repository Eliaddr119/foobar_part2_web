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

  return (
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
              <button class="dropdown-item">Edit Comment</button>
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

      <span className="container-fluid fs-4">{comment.content}</span>
      <div className="ms-2 pt-2"></div>
    </div>
    </div>
  );
}
export default Comment;
