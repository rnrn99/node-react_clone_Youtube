import React, { useEffect, useState } from "react";
import axios from "axios";

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };
    axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert("Failed to get information about the number of subscriptions");
      }
    });

    let subscribeVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };

    axios
      .post("/api/subscribe/subscribed", subscribeVariable)
      .then((response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert("Failed to get subscription information");
        }
      });
  }, []);

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
