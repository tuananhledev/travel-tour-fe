import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Form, notification } from 'antd';
import axiosClient from "../axios/axiosClient";
import { toast } from "react-toastify";

const CreateTourForm = () => {
    const [form] = Form.useForm();
    const [tourData, setTourData] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const handleFinish = async (values) => {
        console.log(values);
        try {
            const result = await axiosClient.post('/tours', values);
            console.log(result);
            toast.success("Thêm thành công.");
            form.resetFields();
            navigate(`/crud-admin`);
        } catch (error) {
            console.log(error)
            toast.error("Thêm thất bại.");
        }
    }

    return (
        <div className="container">
            <h1>Create Tour</h1>
            <Form
                form={form}
                initialValues={tourData}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item label="Address" name="address" rules={[{ required: true, message: "Address is required" }]}>
                    <Input placeholder="Please input address" type="text" />
                </Form.Item>
                <Form.Item label="City" name="city" rules={[{ required: true, message: "City is required" }]}>
                    <Input placeholder="Please input city" type="text" />
                </Form.Item>
                <Form.Item label="Description" name="desc" rules={[{ required: true, message: "Description is required" }]}>
                    <Input placeholder="Please input description" type="text" />
                </Form.Item>
                <Form.Item label="Distance" name="distance" rules={[{ required: true, message: "Distance is required" }]}>
                    <Input placeholder="Please input distance" type="number" />
                </Form.Item>
                <Form.Item label="Featured" name="featured" rules={[{ required: true, message: "Featured is required" }]}>
                    <Input placeholder="Please input featured" type="text" />
                </Form.Item>
                <Form.Item label="Max Group Size" name="maxGroupSize" rules={[{ required: true, message: "Max Group Size is required" }]}>
                    <Input placeholder="Please input max group size" type="number" />
                </Form.Item>
                <Form.Item label="Photo" name="photo" rules={[{ required: true, message: "Photo is required" }]}>
                    <Input placeholder="Please input photo" type="text" />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{ required: true, message: "Price is required" }]}>
                    <Input placeholder="Please input price" type="number" />
                </Form.Item>
                <Form.Item label="Title" name="title" rules={[{ required: true, message: "Title is required" }]}>
                    <Input placeholder="Please input title" type="text" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateTourForm;
