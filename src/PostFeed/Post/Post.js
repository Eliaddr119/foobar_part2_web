import "./Post.css";
import "../Comment/Comment.js";
import { useState } from "react";
import { useRef } from "react";
import Comment from "../Comment/Comment.js";
import { Modal } from "bootstrap";

import AddComment from "../Comment/AddComment.js";

function Post(post) {
  const [commentList, setCommentList] = useState(post.comments);
  const [commentShow, setCommentShow] = useState(false);

  const [countComments, setCommentCount] = useState(Number(post.commentsCount));

  var likeinit = Number(post.likes);
  const [likes, setLikes] = useState(likeinit);
  const likeButtonRef = useRef(null);
  const handleLikeClick = () => {
    {
    }
    if (likes === post.likes) {
      setLikes(likes + 1);
      likeButtonRef.current.classList.toggle("active");
    } else {
      setLikes(likes - 1);
      likeButtonRef.current.classList.remove("active");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="card text-bg-light" id="postCard">
          <div className="container-fluid">
            <div className="d-flex">
              <img
                className="rounded-circle"
                alt="avatar1"
                src={post.user.image}
              />
              <h5 className="fs-2 ms-2 pb-4">
                {post.user.displayName}
                <p className="fs-5 ">{post.postTime}</p>
              </h5>
            </div>

            <span className="container-fluid fs-3 pb-5">{post.content}</span>

            <div className="ms-2 pt-2">
              <i className="fs-4 bi bi-hand-thumbs-up-fill"></i>

              <span className="fs-4 ms-2">{likes}</span>

              <div className="text-end fs-4" id="commentCountText">
                <button
                  onClick={() => setCommentShow(!commentShow)}
                  id="commentsButton"
                >
                  {countComments} Comments
                </button>
              </div>
              <div className="container" id="imageContainer">
                <img alt="" src={post.image} id="postImage" />
              </div>
              <div className="btn-group-lg text-center mt-3" role="group">
                <button
                  onClick={handleLikeClick}
                  ref={likeButtonRef}
                  className="btn btn-outline-success"
                >
                  <i className="me-2 bi bi-hand-thumbs-up-fill"></i> Like
                </button>

                <button type="button" className="btn btn-outline-success">
                  <i className="me-2 bi bi-share-fill"></i>
                  Share
                </button>
              </div>
            </div>
          </div>
          <AddComment
            post={post}
            setCommentList={setCommentList}
            commentList={commentList}
            setCommentCount={setCommentCount}
            countComments={countComments}
            setCommentShow={setCommentShow}
          />
        </div>

        {commentShow && commentList.map((comment) => <Comment {...comment} />)}
      </div>
    </>
  );
}
export default Post;
