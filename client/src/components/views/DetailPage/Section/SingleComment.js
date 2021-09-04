import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Comment, Avatar, Button, Input } from "antd";

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.user);

  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const { _id, writer, content } = props.comment;

  const handleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };
  const onClickOpenReply = () => {
    setOpenReply(!OpenReply);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const variable = {
      writer: user.userData._id,
      replyTo: _id,
      postId: props.postId,
      content: CommentValue,
    };

    axios.post("/api/comment/saveComment", variable).then((response) => {
      if (response.data.success) {
        props.refreshComment(response.data.result);
        setCommentValue("");
        setOpenReply(false);
      } else {
        alert("Failed to save comment");
      }
    });
  };

  const actions = [
    <span onClick={onClickOpenReply} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={writer.name}
        avatar={<Avatar src={writer.image} alt={writer.name} />}
        content={content}
      />

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="댓글 달기"
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
