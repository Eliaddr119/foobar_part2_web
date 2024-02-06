import "./Post.css";
import "../Comment/Comment.js";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useRef } from "react";
import Comment from "../Comment/Comment.js";

function Post(post) {
  const [commentList, setPostsList] = useState(post.comments);
  const [commentShow, setCommentShow] = useState(false);
  const [writeCommentShow, setWriteCommentShow] = useState(false);
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

  const handleCommentAdd = () => {
    setWriteCommentShow(true);
  };
  const handleClose = () => {
    setWriteCommentShow(false);
  };

  return (
    <>
      <Modal 
        id = "AddCommentModal"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={writeCommentShow}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a comment</Modal.Title>
        </Modal.Header>
        <form id="textBox"><input placeholder="Write your comment here" id="commentInput"></input></form>
        <Modal.Footer>
          <button className="btn btn-outline-secondary"  onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-outline-success" onClick={handleClose}>
            Publish
          </button>
        </Modal.Footer>
      </Modal>

      <div className="Post">
        <div className="container-fluid">
          <div className="postRectangle">
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
                  {post.commentsCount} Comments
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
                  onClick={handleCommentAdd}
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
