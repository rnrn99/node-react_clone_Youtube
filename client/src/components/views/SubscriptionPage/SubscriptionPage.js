import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Card, Avatar, Col, Typography, Row } from "antd";

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    let variable = {
      userFrom: localStorage.getItem("userId"),
    };

    axios.post("/api/video/getSubscriptionVideo", variable).then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        setVideo(response.data.video);
      } else {
        alert("Failed to get video from server");
      }
    });
  }, []);

  const renderCard = Video.map((item, index) => {
    var minutes = Math.floor(item.duration / 60);
    var seconds = Math.floor(item.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }} key={index}>
          <a href={`/video/${item._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${item.thumbnail}`}
              alt={item.title}
            />
            <div
              className="duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: " 4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={item.writer.image} />}
          title={item.title}
          description=""
        />
        <span>{item.writer.name}</span>
        <br />
        <span style={{ marginLeft: "3rem" }}>{item.views} views - </span>
        <span>{moment(item.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Subscribed</Title>
      <hr />
      <Row gutter={16}>{renderCard}</Row>
    </div>
  );
}

export default SubscriptionPage;
