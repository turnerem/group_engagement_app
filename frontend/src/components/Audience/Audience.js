import React from "react";
import "./Audience.css";

const Audience = ({ room_code }) => {
  return (
    <div className="audience-view-container">
      <p>Audienceview: {room_code}</p>
    </div>
  );
};

export default Audience;
