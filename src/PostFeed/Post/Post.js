import "./Post.css";
import "../Comment/Comment.js";
import { useState } from "react";
import { useRef } from "react";
import AddComment from "../Comment/AddComment.js";
import CommentList from "../Comment/CommentList.js";

function Post({ post, postsList, setPostsList }) {
  const storedUserObject = sessionStorage.getItem("current_usr");
  const currentUser = JSON.parse(storedUserObject);
  const [commentList, setCommentList] = useState(post.comments);
  const [commentShow, setCommentShow] = useState(false);
  const [openWriteComment, setOpenWriteComment] = useState(false);

  const deletePost = () => {
    setPostsList((prevList) => prevList.filter((item) => item.id !== post.id));
  };

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
  const editEligble = () => {
    if (currentUser.username === post.user.username) {
      return true;
    }
    return false;
  };

  const [canEdit] = useState(editEligble);

  const [showEdit, setShowEdit] = useState(false);
  const [postInput, setPostInput] = useState(post.content);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (postInput === "") {
      return;
    }
    post.content = postInput;
    post.image = postImage;
    setPostsList(postsList);
    setShowEdit(false);
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setPostInput(value);
  };

  const [postImage, setImage] = useState(post.image);
  const [setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImage(null);
      return;
    }
    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      // Clear the error message after 3 seconds
      setTimeout(() => setError(""), 3_000);
      // Clear the file input
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleEditCancel = () => {
    setPostInput(post.content);
    setShowEdit(false);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="card bg-light" id="postCard">
          <div className="container">
            {canEdit && (
              <div class="btn-group" id="editOptions">
                <button
                  class="btn btn-success btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Post Options
                </button>
                <ul class="dropdown-menu text-center">
                  <li>
                    <button class="dropdown-item" onClick={deletePost}>
                      Delete Post
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setShowEdit(true)}
                    >
                      Edit Post
                    </button>
                  </li>
                </ul>
              </div>
            )}
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

              {!showEdit && (
                <span className="container-fluid fs-3 pb-5">
                  {post.content}
                </span>
              )}
              {showEdit && (
                <form id="textBoxPost" onSubmit={handleSubmit}>
                  <input
                    name="postContent"
                    value={postInput}
                    onChange={handleChange}
                    placeholder="Write your post here...."
                    id="postInput"
                  ></input>

                  <div>
                    <label htmlFor="fileInput" className="imageUpLabel">
                      <h4>Upload An Image</h4>
                    </label>
                  </div>
                  <input
                    type="file"
                    id="imageAdd"
                    name="image"
                    className="input"
                    onChange={handleImageUpload}
                  />

                  <button
                    className="btn btn-success"
                    type="submit"
                    id="postEditConfirm"
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    id="postEditCancelButton"
                    onClick={handleEditCancel}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>

            {!showEdit && (
              <>
                <div className="container" id="imageContainer">
                  <img alt="" src={post.image} id="postImage" />
                </div>
                <div className="ms-2 pt-2">
              <i className="fs-4 bi bi-hand-thumbs-up-fill"></i>

              <span className="fs-4 ms-2">{likes}</span>
              <span className="text-end fs-4" id="commentCountText">
                <button
                  onClick={() => setCommentShow(!commentShow)}
                  id="commentsButton"
                >
                  {countComments} Comments
                </button>
              </span>
            </div>

            

                <div
                  className="btn-group-lg text-center mt-3 mb-3"
                  role="group"
                >
                  <button
                    onClick={handleLikeClick}
                    ref={likeButtonRef}
                    className="btn btn-outline-success"
                  >
                    <i className="me-2 bi bi-hand-thumbs-up-fill"></i> Like
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => setOpenWriteComment(!openWriteComment)}
                  >
                    <i className=" me-2 bi bi-chat-left-fill"></i>
                    Comment
                  </button>
                  <button type="button" className="btn btn-outline-success" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="me-2 bi bi-share-fill"></i>
                    Share
                    <div className="dropdown">
      <ul className="dropdown-menu">
        <li><button className="dropdown-item"> <i class="bi bi-reply"></i> Share now (friends)</button></li>
        <li><button className="dropdown-item"> <i class="bi bi-pencil-square"></i> Share to feed</button></li>
        <li><button className="dropdown-item"> <i class="bi bi-link"></i>  Copy link</button></li>
      </ul>     
    </div>
                  </button>
                </div>
              </>
            )}
            
          </div>
        </div>
      </div>
      {!showEdit && openWriteComment && (
        <AddComment
          post={post}
          setCommentList={setCommentList}
          commentList={commentList}
          setCommentCount={setCommentCount}
          countComments={countComments}
          setCommentShow={setCommentShow}
          setOpenWriteComment={setOpenWriteComment}
        />
      )}
      {commentShow && (
        <CommentList
          key={post.id}
          post={post}
          countComments={countComments}
          setCommentCount={setCommentCount}
          setCommentList={setCommentList}
          commentList={commentList}
        />
      )}
    </>
  );
}
export default Post;
