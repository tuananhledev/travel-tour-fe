import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Form, notification } from 'antd';
import axiosClient from "../axios/axiosClient";


const EditTourForm = () => {
    const navigate = useNavigate();
    const { tourId } = useParams();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();


    useLayoutEffect(() => {
        const fetchTourData = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/tours/${tourId}`);
                const { address, city, desc, distance, featured, maxGroupSize, photo, price, title } = response.data.data;
                form.setFieldValue('address', address);
                form.setFieldValue('city', city);
                form.setFieldValue('desc', desc);
                form.setFieldValue('distance', distance);
                form.setFieldValue('featured', featured);
                form.setFieldValue('maxGroupSize', maxGroupSize);
                form.setFieldValue('photo', photo);
                form.setFieldValue('price', price);
                form.setFieldValue('title', title);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tour data:", error);
                setLoading(false);
            }
        };

        fetchTourData();
    }, [form, tourId]);

    const handleUpdate = async (values) => {
        try {
            setLoading(true);
            const response = await axiosClient.put(`/tours/${tourId}`, values);
            setLoading(false);
            notification.success({ message: "Updated thành công" });
            navigate(`/crud-admin`);
        } catch (error) {
            console.error("Error updating tour:", error);
            setLoading(false);
            notification.error({ message: "Error updating tour" });
        }
    };


    const onFinish = (values) => {
        handleUpdate(values);
    };

    const handleBack = () => {
        navigate(`/crud-admin`);
    }

    return (
        <div className="container">
            <h1>Edit Tour</h1>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >

                <Form.Item label="Address" name="address" rules={[{ required: true, message: "Address is required" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="City" name="city" rules={[{ required: true, message: "City is required" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Description" name="desc" rules={[{ required: true, message: "Description is required" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Distance" name="distance" rules={[{ required: true, message: "Distance is required" }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Featured" name="featured" rules={[{ required: true, message: "Featured is required" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Max Group Size" name="maxGroupSize" rules={[{ required: true, message: "Max Group Size is required" }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Photo" name="photo" rules={[{ required: true, message: "Photo is required" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{ required: true, message: "Price is required" }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Title" name="title" rules={[{ required: true, message: "Title is required" }]}>
                    <Input type="text" />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Update
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleBack} style={{ marginLeft: "10px" }}>
                        Back
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditTourForm