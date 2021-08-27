import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, List, Avatar } from "antd";
import SideVideo from "./SideVideo";
import Subscribe from "./Subscribe";

function DetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = {
    videoId: videoId,
  };
  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    axios.post("/api/video/getvideodetail", variable).then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("Failed to get video detail");
      }
    });
  }, []);
  if (VideoDetail.writer) {
    const subscribeButton = VideoDetail.writer._id !==
      localStorage.getItem("userId") && (
      <Subscribe
        userTo={VideoDetail.writer._id}
        userFrom={localStorage.getItem("userId")}
      />
    );

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            />
            <List.Item actions={[subscribeButton]}>
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.writer.image} />}
                title={VideoDetail.writer.name}
                description={VideoDetail.description}
              />
            </List.Item>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "85vh",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }
}

export default DetailPage;
