import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

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
      userFrom: props.userFrom,
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

  const onSubscribe = () => {
    let subscribeVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    if (Subscribed) {
      axios
        .post("/api/subscribe/unSubscribe", subscribeVariable)
        .then((response) => {
          if (response.data.success) {
            message.success("구독이 취소되었습니다.");
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to unsubscribe");
          }
        });
    } else {
      axios
        .post("/api/subscribe/subscribe", subscribeVariable)
        .then((response) => {
          if (response.data.success) {
            message.success("구독했습니다.");
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to subscribe");
          }
        });
    }
  };

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
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
