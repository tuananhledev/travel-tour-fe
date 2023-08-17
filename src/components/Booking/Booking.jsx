import { Button, Col, DatePicker, Form, Input, InputNumber, List, Row, Space } from "antd";
import React, { useMemo, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthProvider";
import axiosClient from "../../axios/axiosClient";
import moment from "moment";


const Booking = ({ tourData }) => {
   const [formBooking] = Form.useForm();
   const navigate = useNavigate();
   const [guest, setGuest] = useState(0);
   const rules = {
      rules: [{ required: true, message: "This field is required." }],
   };

   console.log(tourData);

   const data = useMemo(() => {
      return [
         {
            title: `$${tourData?.price} x 1 person`,
            value: "$99",
         },
         {
            title: "Service charge",
            value: "$10",
         },
         {
            title: "Total",
            value: `$${10 + guest * tourData?.price}`,
         },
      ];
   }, [guest, tourData?.price]);


   const handleChangeGuest = (value) => {
      if (value !== null) {
         setGuest(value);
      } else {
         setGuest(0);
      }
   };




   const { auth, cart, setCart } = useContext(AuthContext);
   const handleBooking = async (values) => {
      // console.log(values);
      if (!auth || auth === undefined || auth === null) {
         return alert('Please sign in')
      }

      try {
         const dataRequest = {
            userId: auth._id,
            userEmail: auth.email,
            tourName: tourData.title,
            fullName: values.username,
            guestSize: values.maxGroupSize,
            phone: values.phone,
            bookAt: moment(values.data).toDate(),
         }

         // console.log(dataRequest);

         const result = await axiosClient.post('/booking', dataRequest)
         console.log("RES: ", result);
         handleSetLocalStorage(result.data.data);
         toast.success("Booking successful.");
         // formBooking.resetFields();
         navigate('/');
         setGuest(0);
      } catch (error) {
         toast.success("Booking error.");
      }
   };

   const handleSetLocalStorage = (item) => {
      let carts = [...cart, item];
      setCart(carts);
      localStorage.setItem('cart', JSON.stringify(carts));
   }

   return (
      <div className="booking-form">
         <h4>Information</h4>
         <Form form={formBooking} onFinish={handleBooking}>
            <Row>
               <Col span={24}>
                  <Form.Item initialValue="" name="username" {...rules}>
                     <Input placeholder="Full name" />
                  </Form.Item>
                  <Form.Item initialValue="" name="phone" {...rules}>
                     <Input placeholder="Phone" style={{ width: "100%" }} />
                  </Form.Item>
                  <Row gutter={12}>
                     <Col span={12} lg={12} md={12} sm={12} xs={24}>
                        <Form.Item name="date" {...rules} style={{ width: "100%" }}>
                           <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                     </Col>
                     <Col span={12} lg={12} md={12} sm={12} xs={24}>
                        <Form.Item name="maxGroupSize" {...rules}>
                           <InputNumber
                              placeholder="Guest"
                              style={{ width: "100%" }}
                              onChange={handleChangeGuest}
                           />
                        </Form.Item>
                     </Col>
                  </Row>
               </Col>
               <Col span={24}>
                  <List
                     className="booking-list"
                     size="small"
                     dataSource={data}
                     renderItem={({ title, value }, index) => (
                        <List.Item
                           key={index}
                           className={index === data.length - 1 && "booking-total-item"}
                        >
                           <List.Item.Meta
                              title={title}
                           // description={email}
                           />
                           <div>{value}</div>
                        </List.Item>
                     )}
                  />
                  <Form.Item style={{ margin: "20px 0 0 " }}>
                     <Button type="primary" block htmlType="submit" className="btn-primary">
                        Book Now
                     </Button>
                  </Form.Item>
               </Col>
            </Row>
         </Form>
      </div>
   );
};

export default Booking;
