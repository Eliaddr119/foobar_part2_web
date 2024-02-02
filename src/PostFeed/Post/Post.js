import "./Post.css";
function Post(post) {
  return (
    <div className="postRectangle">
      <div className="d-flex">
        <img
          class="rounded-circle"
          alt="avatar1"
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
        />
        <div className="fs-2 ms-2 pb-4">
          {post.username}
          <p className="fs-5 ">{post.postTime}</p>
        </div>
      </div>

      <span className="fs-3 ms-2 pb-5">{post.content}</span>
      <div className="ms-2 pt-2">
        <i className="fs-4 bi bi-hand-thumbs-up-fill"></i>
        <span className="fs-4 ms-2">{post.likes}</span>
        <div className="text-end fs-4">{post.commentsCount} Comments</div>
        <div
          class="btn-group-lg text-center mt-3"
          role="group"
        >
          <button type="button" class="btn btn-outline-primary">
            <i class="me-2 bi bi-hand-thumbs-up-fill"></i> Like
          </button>
          <button type="button" class="btn btn-outline-primary">
          <i class="me-2 bi bi-chat-left-fill"></i>
            Comment
          </button>
          <button type="button" class="btn btn-outline-primary">
          <i class="me-2 bi bi-share-fill"></i>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
export default Post;
