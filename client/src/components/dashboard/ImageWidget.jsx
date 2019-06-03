import React from "react";
import { PropTypes } from "prop-types";

export default function ImageWidget({ imgUrl }) {
  return (
    <div id="image-widget">
      <img
        src={imgUrl}
        style={{ width: "60px", height: "60px" }}
        className="rounded-circle"
        alt="profile-pic"
      />
    </div>
  );
}

ImageWidget.propTypes = {
  imgUrl: PropTypes.string.isRequired
};
