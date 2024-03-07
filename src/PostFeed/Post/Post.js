import "./Post.css";
import "../Comment/Comment.js";
import { useState, useEffect, useRef } from "react";
import AddComment from "../Comment/AddComment.js";
import CommentList from "../Comment/CommentList.js";
import { serverURL } from "../../userService.js";
import { useNavigate } from "react-router-dom";


function Post({ post }) {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("jwt");
  const [commentList, setCommentList] = useState(post.comments);
  const [commentShow, setCommentShow] = useState(false);
  const [openWriteComment, setOpenWriteComment] = useState(false);
  const jsDate = new Date(post.date);
  const formattedDate =
    jsDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) +
    " " +
    jsDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    checkIfCurrentUserLiked();
  }, []);

  const [numlikes, setNumlikes] = useState(post.numlikes);
  const [isLiked, setIsLiked] = useState(false);
  const likeButtonRef = useRef(null);
  const checkIfCurrentUserLiked = async () => {
    const res = await fetch(
      serverURL + `/api/users/${username}/posts/${post.id}/like`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const likedByList = await res.json();
    const found = likedByList.includes(username);
    if (found) {
      likeButtonRef.current.classList.add("active");
      setIsLiked(true);
    } else {
      setIsLiked(false);
      likeButtonRef.current.classList.remove("active");
    }
  };

  const handleLikeClick = async () => {
    var serverCommand;
    if (isLiked === false) {
      serverCommand = "PATCH";
      likeButtonRef.current.classList.toggle("active");
      setNumlikes(numlikes + 1);
      setIsLiked(true);
    } else {
      serverCommand = "DELETE";
      likeButtonRef.current.classList.remove("active");
      setNumlikes(numlikes - 1);
      setIsLiked(false);
    }
    const res = await fetch(
      serverURL + `/api/users/${username}/posts/${post.id}/like`,
      {
        method: `${serverCommand}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const deletePost = async () => {
    const res = await fetch(
      serverURL + `/api/users/${username}/posts/${post.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
  };

  const [countComments, setCommentCount] = useState(Number(post.commentsCount));

  const editEligble = () => {
    if (username === post.username) {
      return true;
    }
    return false;
  };

  const [canEdit] = useState(editEligble);
  const [showEdit, setShowEdit] = useState(false);
  const [postInput, setPostInput] = useState(post.content);

  const handleEdit = async (event) => {
    event.preventDefault();
    if (postInput === "") {
      return;
    }
    const postEditedDetails = {
      content: postInput,
      image: postImage,
    };
    const res = await fetch(
      serverURL + `/api/users/${username}/posts/${post.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postEditedDetails),
      }
    );
    setShowEdit(false);
    window.location.reload();
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
      setImage("");
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
      setImage("data:image/jpeg;base64," + reader.result.split(",")[1]);
    };

    reader.readAsDataURL(file);
  };

  const handleEditCancel = () => {
    setPostInput(post.content);
    setShowEdit(false);
  };

  const handleProfileNavigate = () => {
    const currentUsr = {username:post.username,profilePic:post.profilePic,displayName:post.displayName};
    navigate(`/UserProfile/${currentUsr.username}`, {
      state: { userString: JSON.stringify(currentUsr) },
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="card bg-light" id="postCard">
          <div className="container">
            {canEdit && (
              <div class="btn-group" id="editOptions">
                <button
                  className="btn btn-success btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Post Options
                </button>
                <ul className="dropdown-menu text-center">
                  <li>
                    <button className="dropdown-item" onClick={deletePost}>
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
              <div className="d-flex" onClick={handleProfileNavigate}>
                <img
                  className="rounded-circle"
                  alt="avatar1"
                  src={post.profilePic}
                />
                <h5 className="fs-2 ms-2 pb-4">
                  {post.displayName}
                  <p className="fs-5 ">{formattedDate}</p>
                </h5>
              </div>

              {!showEdit && (
                <span className="container-fluid fs-3 pb-5">
                  {post.content}
                </span>
              )}
              {showEdit && (
                <form id="textBoxPost" onSubmit={handleEdit}>
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
                  <img alt="" src={postImage} id="postImage" />
                </div>
                <div className="ms-2 pt-2">
                  <i className="fs-4 bi bi-hand-thumbs-up-fill"></i>

                  <span className="fs-4 ms-2">{numlikes}</span>
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
                    id="btnGroupButton"
                  >
                    <i className="me-2 bi bi-hand-thumbs-up-fill"></i> Like
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    id="btnGroupButton"
                    onClick={() => setOpenWriteComment(!openWriteComment)}
                  >
                    <i className=" me-2 bi bi-chat-left-fill"></i>
                    Comment
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    id="btnGroupButton"
                  >
                    <i className="me-2 bi bi-share-fill"></i>
                    Share
                    <div className="dropdown">
                      <ul className="dropdown-menu">
                        <li>
                          <button className="dropdown-item">
                            {" "}
                            <i class="bi bi-reply"></i> Share now (friends)
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item">
                            {" "}
                            <i class="bi bi-pencil-square"></i> Share to feed
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item">
                            {" "}
                            <i class="bi bi-link"></i> Copy link
                          </button>
                        </li>
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
