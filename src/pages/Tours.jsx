import React, { useEffect, useState } from "react";

import axiosClient from "../axios/axiosClient";
import Subtitle from "../components/Subtitle/Subtitle";
import { Button, Col, Form, Input, Pagination, Row, Space } from "antd";
import TourCard from "../components/Tours/TourCard";
import SearchBar from "../components/SearchBar";
import NewsletterSection from "../components/NewsletterSection";

const Tours = () => {
   const [tours, setTours] = useState([]);
   const [pagination, setPagination] = useState(1);
   const [totalItem, setTotalItem] = useState(0);

   const [status, setStatus] = useState({
      error: false,
      loading: false,
   });

   useEffect(() => {
      (async function () {
         try {
            setStatus({ error: false, loading: true });

            const tours = await axiosClient.get(`/tours?page=${pagination - 1}`);

            setTours(tours.data.data);
            setStatus({ error: false, loading: false });
         } catch (error) {
            setStatus({ error: true, loading: false });
         }
      })();
   }, [pagination]);

   useEffect(() => {
      (async function () {
         const result = await axiosClient.get("/tours/search/getTourCount");
         let count = result.data.data;
         setTotalItem(count);
      })();
   }, []);

   const handlePaginationChange = (pageNumber) => {
      setPagination(pageNumber);
   };

   console.log(tours.length);

   return (
      <>
         {/* ---- banner ----  */}
         <section className="banner-section">
            <h2 className="banner-title">All Tours</h2>
         </section>

         {/* ---- search bar ----  */}
         <section>
            <div className="container">
               <SearchBar />
            </div>
         </section>

         {/* ---- Tours ---- */}
         <section className="tours-section" style={{ paddingTop: 0 }}>
            <div className="container">
               <Row gutter={[24, 24]}>
                  {status.error ? (
                     <h2
                        style={{
                           textAlign: "center",
                           fontSize: 26,
                           fontWeight: 500,
                           padding: "0 12px",
                        }}
                     >
                        Fetching data is Error...
                     </h2>
                  ) : status.loading ? (
                     <h2
                        style={{
                           textAlign: "center",
                           fontSize: 26,
                           fontWeight: 500,
                           padding: "0 12px",
                        }}
                     >
                        Loading...
                     </h2>
                  ) : (
                     tours.map((tour) => (
                        <Col span={6} lg={6} md={8} sm={12} xs={24} key={tour._id}>
                           <TourCard tourData={tour} />
                        </Col>
                     ))
                  )}
               </Row>
               {tours.length > 0 && (
                  <Pagination
                     className="pagination-tour"
                     total={totalItem}
                     defaultCurrent={1}
                     defaultPageSize={8}
                     onChange={handlePaginationChange}
                  />
               )}
            </div>
         </section>

         {/* ---- News lLetter ---- */}
         <NewsletterSection />
      </>
   );
};

export default Tours;
