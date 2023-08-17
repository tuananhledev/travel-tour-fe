import React, { useState, useEffect, Fragment, useContext } from 'react';
import axiosClient from "../axios/axiosClient";
import { Space, Table, Button } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import EditTourForm from './EditTourForm';

const { Column } = Table;

const CrudAdmin = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tours, setTours] = useState([]);
    const [status, setStatus] = useState({
        error: false,
        loading: false,
    });

    useEffect(() => {
        (async function () {
            try {
                setStatus({ error: false, loading: true });

                const response = await axiosClient.get("/tours");
                setTours(response.data.data);
                setStatus({ error: false, loading: false });
            } catch (error) {
                setStatus({ error: true, loading: false });
            }
        })();
    }, []);


    const handleEdit = (tours) => {
        // Xử lý logic khi bấm nút "Edit" ở mỗi dòng
        navigate(`/edit-tour/${tours._id}`);
    };

    const handleDelete = async (tours) => {
        // Xử lý logic khi bấm nút "Delete" ở mỗi dòng   
        const result = await axiosClient.delete(`/tours/${tours._id}`);
    };
    const handleCreate = (tours) => {
        // Xử lý logic khi bấm nút "Create" ở mỗi dòng
        navigate(`/create-tour`);
    };





    const renderActions = (text, tours) => (
        <Space>
            <Button className="edit-button" onClick={() => handleEdit(tours)}>Edit</Button>
            <Button className="delete-button" onClick={() => handleDelete(tours)}>Delete</Button>
        </Space>
    );

    console.log(auth, !auth);
    console.log(tours);

    if (!auth || auth.role !== 'admin') {
        return <Navigate to="/" />
    }

    return (
        <div className="container">
            <Button className="create-button" onClick={() => handleCreate()}>Create</Button>
            <Table dataSource={tours}>
                <Column title={<span className="column-title">Image</span>} dataIndex="photo" key="image" />
                <Column title={<span className="column-title">City</span>} dataIndex="city" key="city" />
                <Column title={<span className="column-title">Address</span>} dataIndex="address" key="address" />
                <Column title={<span className="column-title">Description</span>} dataIndex="desc" key="desc" />
                <Column title={<span className="column-title">Distance</span>} dataIndex="distance" key="distance" />
                <Column title={<span className="column-title">Max Group Size</span>} dataIndex="maxGroupSize" key="maxgroupsize" />
                <Column title={<span className="column-title">Price</span>} dataIndex="price" key="price" />
                <Column title={<span className="column-title">Title</span>} dataIndex="title" key="title" />
                <Column title={<span className="column-title">Actions</span>} dataIndex="lastName" key="lastName" render={renderActions} />
            </Table>
        </div >
    )
}

export default CrudAdmin