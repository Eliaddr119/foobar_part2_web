import "./Comment.css";

function Comment(comment) {
  return (
    
      <div className="card text-bg-light" id="commentCard">
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
