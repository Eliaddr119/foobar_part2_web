import { useState } from "react";
import Comment from "../Comment/Comment.js";

function CommentList(
  {post,
  countComments,
  setCommentCount,
  setCommentList,
  commentList,
}
) {


  

  return commentList.map((comment) => (

      <Comment key={comment.id} commentList={commentList} setCommentList={setCommentList} countComments={countComments} setCommentCount={setCommentCount} comment={comment} />
  ));
}
export default CommentList;
