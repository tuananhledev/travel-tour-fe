import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Row, Col, Space, Form, Input, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ReviewList from "../components/Review/ReviewList";
import NewsletterSection from "../components/NewsletterSection";
import axiosClient from "../axios/axiosClient";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import { AuthContext } from "../context/AuthProvider";
import Booking from "../components/Booking/Booking";

const ToursDetail = () => {
   const navigate = useNavigate();
   const [reviewForm] = Form.useForm();

   const { auth } = useContext(AuthContext);
   const { tourId } = useParams();
   const [tourData, setTourData] = useState();

   useLayoutEffect(() => {
      (async function () {
         try {
            const result = await axiosClient.get(`/tours/${tourId}`);
            setTourData(result.data.data);
         } catch (error) {
            navigate("/tours");
         }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tourId]);

   const handleFinish = async ({ review }) => {
      if (!auth) {
         navigate("/login");
         toast.warning("Pleas login to use this function.");
         return;
      }
      if (!review.trim()) {
         toast.warning("Please enter review.");
         return;
      }

      try {
         const result = await axiosClient.post(`/review/${tourId}`, {
            productId: tourId,
            username: auth.username,
            reviewText: review,
            rating: 5,
         });

         const newReview = result.data.data;

         setTourData((prev) => ({
            ...prev,
            reviews: [...prev.reviews, newReview],
         }));

         reviewForm.resetFields();

         toast.success("Review succesful.");
      } catch (error) {
         toast.error(error?.response?.data?.message);
      }
   };

   return (
      <>
         <section style={{ paddingTop: 0 }}>
            <div className="container">
               <Row gutter={[24, 24]}>
                  <Col span={16} lg={16} md={24} xs={24}>
                     {/* -- content -- */}
                     <Row gutter={[0, 16]} className="tour-content">
                        {/* -- image -- */}

                        <Col span={24} className="tour-image">
                           <img src={tourData?.photo} alt="" />
                        </Col>

                        {/* -- detail -- */}
                        <Col span={24} className="tour-info">
                           <h2>Jaflong, Sylhet</h2>
                           <Space direction="horizontal" className="tour-info-gap">
                              <div className="tour-rating">
                                 <AiFillStar size={16} />{" "}
                                 {tourData?.reviews?.length > 0
                                    ? `5.0(${tourData?.reviews?.length})`
                                    : "Not rated"}
                              </div>
                              <div className="tour-location">
                                 <HiOutlineLocationMarker size={16} /> {tourData?.address}
                              </div>
                           </Space>

                           <Space
                              direction="horizontal"
                              className="tour-info-gap"
                              style={{ margin: "16px 0 40px" }}
                           >
                              <div className="tour-rating" style={{ fontWeight: 400 }}>
                                 <HiOutlineLocationMarker size={16} /> {tourData?.city}
                              </div>
                              <div className="tour-location">
                                 <HiOutlineLocationMarker size={16} /> {tourData?.price}/ per person
                              </div>
                              <div className="tour-location">
                                 <HiOutlineLocationMarker size={16} /> {tourData?.distance} k/m
                              </div>
                              <div className="tour-location">
                                 <HiOutlineLocationMarker size={16} /> {tourData?.maxGroupSize}{" "}
                                 people
                              </div>
                           </Space>
                           <h4>Description</h4>
                           <p style={{ fontWeight: 400 }}>{tourData?.desc}</p>
                        </Col>

                        {/* -- reviews -- */}
                        <Col span={24} className="tour-info tour-review">
                           <h2>Reviews ({tourData?.reviews?.length} reviews)</h2>
                           <Space
                              direction="horizontal"
                              size="large"
                              style={{ display: "flex", flexWrap: "wrap" }}
                           >
                              <div className="tour-rating">
                                 1 <AiFillStar size={14} />
                              </div>
                              <div className="tour-rating">
                                 2 <AiFillStar size={14} />
                              </div>
                              <div className="tour-rating">
                                 3 <AiFillStar size={14} />
                              </div>
                              <div className="tour-rating">
                                 4 <AiFillStar size={14} />
                              </div>
                              <div className="tour-rating">
                                 5 <AiFillStar size={14} />
                              </div>
                           </Space>

                           <Form
                              form={reviewForm}
                              className="review-form subscribe-form"
                              layout="inline"
                              onFinish={handleFinish}
                           >
                              <Form.Item
                                 name="review"
                                 initialValue=""
                                 className="subscribe-form-input"
                              >
                                 <Input placeholder="Share your thoughts" />
                              </Form.Item>
                              <Form.Item className="review-form-button subscribe-form-button">
                                 <Button type="primary" htmlType="submit">
                                    Submit
                                 </Button>
                              </Form.Item>
                           </Form>

                           <ReviewList reviewData={tourData?.reviews} />
                        </Col>
                     </Row>
                  </Col>

                  <Col span={8} lg={8} md={24} xs={24}>
                     <div className="booking">
                        <div className="booking-top">
                           <h3>
                              $99 <span>/per person</span>
                           </h3>
                           <div className="booking-rating tour-rating">
                              <AiFillStar size={18} /> {tourData?.reviews?.length > 0 && "5.0"}(
                              {tourData?.reviews?.length})
                           </div>
                        </div>

                        <Booking tourData={tourData} />
                     </div>
                  </Col>
               </Row>
            </div>
         </section>

         {/* ---- News lLetter ---- */}
         <NewsletterSection />
      </>
   );
};

export default ToursDetail;
