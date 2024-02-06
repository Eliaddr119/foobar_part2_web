import "./Comment.css";

function Comment(comment) {
  return (
    <div className="container-fluid">
      <div id="commentRectangle">
        <div className="d-flex">
          <img
          id="commentImage"
            className="rounded-circle" 
            alt="avatar1"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
          />
          <div className="fs-2 ms-2">
            {comment.user.displayName}
            <p className="fs-5 ">{comment.commentTime}</p>
          </div>
        </div>

        <span className="container-fluid fs-3">{comment.content}</span>
        <div className="ms-2 pt-2"></div>
      </div>
    </div>
  );
}
export default Comment;
