import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button, Col, Form, Input, Row } from "antd";

import axiosClient from "../axios/axiosClient";
import TourCard from "../components/Tours/TourCard";
import NewsletterSection from "../components/NewsletterSection";

const Search = () => {
   const [searchParams] = useSearchParams();
   const [tours, setTours] = useState([]);
   const [status, setStatus] = useState({
      error: false,
      loading: false,
   });

   const query = useMemo(
      () => ({
         city: searchParams.get("city"),
         distance: searchParams.get("distance"),
         maxGroupSize: searchParams.get("maxGroupSize"),
      }),
      [searchParams]
   );

   useEffect(() => {
      (async function () {
         try {
            setStatus({ error: false, loading: true });
            const response = await axiosClient.get(
               `/tours/search/getTourBySearch?city=${query.city}&distance=${query.distance}&maxGroupSize=${query.maxGroupSize}`
            );
            console.log(response.data.data);
            setTours(response.data.data);
            setStatus({ error: false, loading: false });
         } catch (error) {
            setStatus({ error: true, loading: false });
         }
      })();
   }, [query]);

   return (
      <>
         {/* ---- banner ----  */}
         <section className="banner-section">
            <h2 className="banner-title">Tour Search Result</h2>
         </section>

         {/* ---- Tours ---- */}
         <section className="tours-section">
            <div className="container">
               {status.error ? (
                  <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 500 }}>
                     Fetching data is Error...
                  </h2>
               ) : status.loading ? (
                  <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 500 }}>Loading...</h2>
               ) : tours.length > 0 ? (
                  <Row gutter={[24, 24]}>
                     {tours.length > 0 ? (
                        tours.map((tour) => (
                           <Col span={6} lg={6} md={8} sm={12} xs={24} key={tour._id}>
                              <TourCard tourData={tour} />
                           </Col>
                        ))
                     ) : (
                        <h2>Not found</h2>
                     )}
                  </Row>
               ) : (
                  <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 500 }}>
                     No Tour Found
                  </h2>
               )}
            </div>
         </section>

         {/* ---- News lLetter ---- */}
         <NewsletterSection />
      </>
   );
};

export default Search;
