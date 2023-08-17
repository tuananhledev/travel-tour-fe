import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";
import { RiMapPinTimeLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";

const SearchBar = () => {
   const [formData, setFormData] = useState({
      city: "",
      distance: "",
      maxGroupSize: "",
   });

   const navigate = useNavigate();

   const { city, distance, maxGroupSize } = formData;

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!city && !distance && !maxGroupSize) {
         toast("Please enter at least 1 field!", { type: "error" });
         return;
      }
      navigate(`/tours/search?city=${city}&distance=${distance}&maxGroupSize=${maxGroupSize}`);
   };

   return (
      <div className="search-bar">
         <form className="search-bar-form" onSubmit={handleSubmit}>
            <div className="form-group">
               <span>
                  <HiOutlineLocationMarker className="form-icon" />
               </span>
               <div className="form-input">
                  <h4>Location</h4>
                  <input
                     value={city}
                     onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                     type="text"
                     placeholder="Where are you going?"
                  />
               </div>
            </div>
            <div className="form-group">
               <span>
                  <RiMapPinTimeLine className="form-icon" />
               </span>
               <div className="form-input">
                  <h4>Distance</h4>
                  <input
                     value={distance}
                     onChange={(e) =>
                        setFormData((prev) => ({ ...prev, distance: e.target.value }))
                     }
                     type="number"
                     placeholder="Distance k/m"
                  />
               </div>
            </div>
            <div className="form-group">
               <span>
                  <GoPeople className="form-icon" />
               </span>
               <div className="form-input">
                  <h4>Max people</h4>
                  <input
                     value={maxGroupSize}
                     onChange={(e) =>
                        setFormData((prev) => ({ ...prev, maxGroupSize: e.target.value }))
                     }
                     type="number"
                     placeholder="0"
                  />
               </div>
            </div>

            <button type="submit" className="btn-search-submit">
               <BsSearch />
            </button>
         </form>
      </div>
   );
};

export default SearchBar;
