import React, { useEffect, useState } from "react";
import axios from "axios";

function SideVideo() {
  const [SideVideo, setSideVideo] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getvideo").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setSideVideo(response.data.video);
      } else {
        alert("Failed to get video");
      }
    });
  }, []);

  const renderSideVideo = SideVideo.map((item, index) => {
    var minutes = Math.floor(item.duration / 60);
    var seconds = Math.floor(item.duration - minutes * 60);

    return (
      <div
        key={index}
        style={{ display: "flex", marginBottomL: "1rem", padding: "0 2rem" }}
      >
        <div style={{ width: "40%", margin: "0 1rem 1rem 0" }}>
          <a href>
            <img
              style={{ width: "100%", height: "100%" }}
              src={`http://localhost:5000/${item.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>

        <div style={{ width: "50%" }}>
          <a href style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {item.title}
            </span>
            <br />
            <span>{item.writer.name}</span>
            <br />
            <span>{item.views} views</span>
            <br />
            <span>
              {minutes}:{seconds}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return (
    <>
      <div style={{ marginTop: "3rem" }} />
      {renderSideVideo}
    </>
  );
}

export default SideVideo;
