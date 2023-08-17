import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";

import calculateAvgRating from '../../utils/avgRating'

import "./style.css";

const TourCard = ({
   tourData: { _id, title, photo, city, address, distance, featured, price, reviews },
}) => {

   const { totalRating, avgRating } = calculateAvgRating(reviews);
   return (
      <Card
         className="tour-card"
         cover={
            <>
               <img alt="example" src={photo} />
               {featured && <span>Featured</span>}
            </>
         }
      >
         <div className="tour-card-top">
            <div className="tour-location">
               <HiOutlineLocationMarker /> {city}
            </div>
            <div className="tour-rating">
               <AiFillStar /> {avgRating === 0 ? null : avgRating}
               {totalRating === 0 ? ('Not rated') : (<span>({reviews.length})</span>)}
            </div>
         </div>
         <Link className="tour-title" to={`/tours/${_id}`}>
            {title}
         </Link>
         <div className="tour-card-bottom">
            <h4>
               ${price} <span> /per person</span>
            </h4>
            <Link to={`/tours/${_id}`} className="btn-booking">
               Book Now
            </Link>
         </div>
      </Card>
   );
};

export default TourCard;
