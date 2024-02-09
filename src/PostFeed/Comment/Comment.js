import "./Comment.css";
import "../Post/Post"


function Comment({commentList,setCommentList,comment}) {

    const deleteComment = () => {
      setCommentList(prevList => prevList.filter(item => item.id !== comment.id));
      
    }
  return (
    <div className="card text-bg-light" id="commentCard">
      <div class="btn-group" id="editOptions">
        <button
          class="btn btn-success btn-sm dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Small button
        </button>
        <ul class="dropdown-menu text-center">
          <li>
            <button class="dropdown-item" onClick={deleteComment} >
              Delete Comment
            </button>
          </li>
          <li>
            <button class="dropdown-item"  onClick={console.log("clack" + comment.id)}>
              Edit Comment
            </button>
          </li>
        </ul>
      </div>

      <div className="d-flex">
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
  );
}
export default Comment;
