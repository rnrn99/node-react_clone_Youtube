import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [ChildCommentNum, setChildCommentNum] = useState(0);
  const [OpenReplyComment, setOpenReplyComment] = useState(false);

  useEffect(() => {
    let commentNum = 0;

    props.commentList.map((comment) => {
      if (comment.replyTo === props.parentCommentId) {
        commentNum++;
      }
    });

    setChildCommentNum(commentNum);
  }, [props.commentList, props.parentCommentId]);

  const handleChange = () => {
    setOpenReplyComment(!OpenReplyComment);
  };

  let renderReplyComment = (parentCommentId) => {
    return props.commentList.map((comment, index) => (
      <>
        {comment.replyTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              refreshComment={props.refreshComment}
              comment={comment}
              postId={props.postId}
              key={index}
            />
            <ReplyComment
              commentList={props.commentList}
              postId={props.postId}
              parentCommentId={comment._id}
              refreshComment={props.refreshComment}
            />
          </div>
        )}
      </>
    ));
  };

  return (
    <div>
      {ChildCommentNum > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={handleChange}
        >
          {ChildCommentNum}개의 댓글 더보기
        </p>
      )}

      {OpenReplyComment && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
