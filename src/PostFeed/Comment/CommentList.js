import { useState } from "react";
import Comment from "../Comment/Comment.js";

function CommentList(
  {post,
  countComments,
  setCommentCount,
}
) {
  const [commentList, setCommentList] = useState(post.comments);

  

  return commentList.map((comment) => (
    <Comment  setCommentList={setCommentList} commentList={commentList} countComments={countComments} setCommentCoung={setCommentCount} comment={comment}/>
  ));
}
export default CommentList;
