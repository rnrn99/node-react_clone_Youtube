import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "antd";
import {
  LikeFilled,
  DislikeFilled,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";

function LikeDislike(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variable = {};

  if (props.video) {
    // 비디오의 좋아요 싫어요 버튼이 눌린 경우
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    // 댓글의 좋아요 싫어요 버튼이 눌린 경우
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    axios.post("/api/like/getLike", variable).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes.length);

        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get like infomation");
      }
    });

    axios.post("/api/like/getDislike", variable).then((response) => {
      if (response.data.success) {
        setDislikes(response.data.dislikes.length);

        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislike infomation");
      }
    });
  }, []);

  const onLike = () => {
    if (LikeAction === null) {
      axios.post("/api/like/upLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction("liked");

          if (DislikeAction !== null) {
            setDislikes(Dislikes - 1);
            setDislikeAction(null);
          }
        } else {
          alert("Failed to send like button pressed");
        }
      });
    } else {
      axios.post("/api/like/unLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("Failed to send like button unpressed");
        }
      });
    }
  };

  const onDislike = () => {
    if (DislikeAction === null) {
      axios.post("/api/like/upDislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");

          if (LikeAction !== null) {
            setLikes(Likes - 1);
            setLikeAction(null);
          }
        } else {
          alert("Failed to send dislike button pressed");
        }
      });
    } else {
      axios.post("/api/like/unDislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert("Failed to send dislike button unpressed");
        }
      });
    }
  };

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          {LikeAction === "liked" ? (
            <LikeFilled onClick={onLike} />
          ) : (
            <LikeOutlined onClick={onLike} />
          )}
        </Tooltip>
        <span style={{ padding: "8px", cursor: "auto" }}>{Likes}</span>
      </span>

      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          {DislikeAction === "disliked" ? (
            <DislikeFilled onClick={onDislike} />
          ) : (
            <DislikeOutlined onClick={onDislike} />
          )}
        </Tooltip>
        <span style={{ padding: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislike;
