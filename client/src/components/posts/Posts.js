import React from "react";
import "./Posts.scss";
import Avatar from "../avatar/Avatar";
import backgroundImg from "../../assets/background.jpg";
import { AiOutlineHeart } from "react-icons/ai";

function Posts({ post }) {
  return (
    <div className="Post">
      <div className="heading">
        <Avatar />
        <h4>Manish Sharma</h4>
      </div>

      <div className="content">
        <img src={backgroundImg} alt="" />
      </div>

      <div className="footer">
        <div className="like">
          <AiOutlineHeart className="icon" />
          <h4>45 likes</h4>
        </div>
        <p className="caption">This is nature. Lorem ipsum dolor sit amet.</p>
        <h6 className="time-ago">4 hrs ago</h6>
      </div>
    </div>
  );
}

export default Posts;
