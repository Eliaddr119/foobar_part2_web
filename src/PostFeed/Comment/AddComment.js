import "./AddComment.css"
import  { getTodayDate } from "../..//userService";
import { useState } from "react";


function AddComment({
  commentList,
  setCommentList,
  countComments,
  setCommentCount,
  post,
  setCommentShow,
  setOpenWriteComment
}) {
  
  const [commentInput, setCommentInput] = useState("");
  const storedUserObject = sessionStorage.getItem("current_usr");
  const currentUser = JSON.parse(storedUserObject);
  const handleSubmit = (event) => {
    
    event.preventDefault();
    if (commentInput === "") {
      return;
    }
    const todayDate = getTodayDate();
    const newComment = {
      id: post.id + "c" + (Number(post.commentsCount) + 1),
      user: {
        username: currentUser.username,
        displayName: currentUser.displayName,
        image: currentUser.image,
      },
      commentTime: todayDate,
      content: commentInput,
    };

    const updatedComments = [...commentList,newComment];

    setCommentList(updatedComments);
    setCommentCount(countComments + 1);
    setCommentInput("");
    setCommentShow(true);
    setOpenWriteComment(false);
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setCommentInput(value);
  };

  return (
    <div className="card bg-light" id="addCommentCard">
      <span><img
      className="rounded-circle"
      alt=""
      src={currentUser.image}
      id="roundImg" /><form id="textBox" onSubmit={(e) => handleSubmit(e)}>
        <input
          name="commentContent"
          value={commentInput}
          onChange={handleChange}
          placeholder="Comment on post..."
          id="commentInput"
        ></input>
        <button id="commentPublishButton"className="btn btn-outline-success" type="submit">publish</button>
      </form>
      </span>
    </div>

    
    
    
  );
}
export default AddComment;
