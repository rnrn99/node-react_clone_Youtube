import React from "react";
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recommended</Title>
      <br />
      <Row gutter={[32, 36]}>
        <Col lg={6} md={8} xs={24}>
          <div style={{ position: "relative" }}>
            <div className="duration"></div>
          </div>
          <br />
          <Meta description="" />
        </Col>
      </Row>
    </div>
  );
}

export default LandingPage;
