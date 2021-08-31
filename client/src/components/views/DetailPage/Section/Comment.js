import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

function Comment(props) {
  const user = useSelector((state) => state.user);
  const videoId = props.postId;
  const [CommentValue, setCommentValue] = useState("");

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variable = {
      writer: user.userData._id,
      postId: videoId,
      content: CommentValue,
    };

    axios.post("/api/comment/saveComment", variable).then((response) => {
      if (response.data.success) {
        props.refreshComment(response.data.result);
        setCommentValue("");
      } else {
        alert("Failed to save comment");
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />
      {props.commentList &&
        props.commentList.map(
          (comment, index) =>
            !comment.replyTo && (
              <SingleComment
                refreshComment={props.refreshComment}
                comment={comment}
                postId={videoId}
                key={index}
              />
            ),
        )}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={CommentValue}
          placeholder="댓글 달기"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
