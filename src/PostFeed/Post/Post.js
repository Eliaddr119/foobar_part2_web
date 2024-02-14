import "./Post.css";
import "../Comment/Comment.js";
import { useState } from "react";
import { useRef } from "react";
import AddComment from "../Comment/AddComment.js";
import CommentList from "../Comment/CommentList.js";

function Post({post,postsList,setPostsList} ) {

  const storedUserObject = sessionStorage.getItem("current_usr");
    const currentUser = JSON.parse(storedUserObject);
  const [commentList, setCommentList] = useState(post.comments);
  const [commentShow, setCommentShow] = useState(false);

  const deletePost = () => {
    setPostsList(prevList => prevList.filter(item => item.id !== post.id));
  }

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
const editEligble = () => {
  if (currentUser.username === post.user.username) {
    return true;
  }
  return false;
}

  const[canEdit,setCanEdit] = useState(editEligble);

  
  
  return (
    <>
    
      <div className="container-fluid">
        <div className="card bg-light" id="postCard">
        <div className="container">
        {canEdit &&<div class="btn-group" id="editOptions">
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
            <button class="dropdown-item" onClick={deletePost} >
              Delete Post
            </button>
          </li>
          <li>
            <button class="dropdown-item">
              Edit Post
            </button>
          </li>
        </ul>
      </div>}
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
            </div>
            <div className="ms-2 pt-2">
              <i className="fs-4 bi bi-hand-thumbs-up-fill"></i>

              <span className="fs-4 ms-2">{likes}</span></div>

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
          <AddComment
            post={post}
            setCommentList={setCommentList}
            commentList={commentList}
            setCommentCount={setCommentCount}
            countComments={countComments}
            setCommentShow={setCommentShow}
          />
        </div>
        </div>

        {commentShow && <CommentList post={post} countComments={countComments} setCommentCount={setCommentCount} setCommentList={setCommentList} commentList={commentList}/>}
    </>
  );
}
export default Post;
