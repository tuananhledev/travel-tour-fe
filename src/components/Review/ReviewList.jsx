import React from "react";
import { Avatar, List } from "antd";
import moment from "moment";

import "./style.css";
import { AiFillStar } from "react-icons/ai";

moment().format("MM/DD/YYYY");

const ReviewList = ({ reviewData = [] }) => {
   return (
      <List
         className="review-list"
         itemLayout="horizontal"
         dataSource={reviewData}
         renderItem={(item, index) => (
            <List.Item>
               <List.Item.Meta
                  avatar={
                     <div className="review-item-image">
                        <img
                           src={
                              item.photo ||
                              `https://doan-eta.vercel.app/static/media/avatar.4b1822e13f639c746633.jpg`
                           }
                           alt=""
                        />
                     </div>
                  }
                  title={item.username}
                  description={
                     <>
                        <span>{moment(item.createdAt).format("MMMM D, YYYY")}</span>
                        <p>{item.reviewText}</p>
                     </>
                  }
               />
               <div className="review-rating">
                  {item.rating} <AiFillStar size={14} />
               </div>
            </List.Item>
         )}
      />
   );
};

export default ReviewList;
