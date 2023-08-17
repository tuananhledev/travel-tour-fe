import React, { useState, useEffect, Fragment, useContext } from 'react';
import axiosClient from "../axios/axiosClient";
import { Space, Table, Button, Pagination, Form } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { toast } from "react-toastify";


const { Column } = Table;

const CrudAdmin = () => {
    const [form] = Form.useForm();
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
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

    const handleEdit = (tours) => {
        navigate(`/edit-tour/${tours._id}`);
    };

    const handleDelete = async (tours) => {
        if (confirm("Bạn có chắc muốn xóa không ?")) {
            const result = await axiosClient.delete(`/tours/${tours._id}`);
            toast.success("Xóa thành công.");
            form.resetFields();
            navigate(`/`);
        }

    };
    const handleCreate = (tours) => {
        navigate(`/create-tour`);
    };


    const handlePaginationChange = (pageNumber) => {
        setPagination(pageNumber);
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
            <Table dataSource={tours} pagination={false}>
                <Column title={<span className="column-title">STT</span>} key="stt" render={(text, record, index) => index + 1} />
                <Column title={<span className="column-title">Photo</span>} dataIndex="photo" key="image"
                    render={(photo) => (
                        <img src={photo} alt="Photo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    )} />
                <Column title={<span className="column-title">City</span>} dataIndex="city" key="city" />
                <Column title={<span className="column-title">Address</span>} dataIndex="address" key="address" />
                <Column title={<span className="column-title">Description</span>} dataIndex="desc" key="desc" />
                <Column title={<span className="column-title">Distance</span>} dataIndex="distance" key="distance" />
                <Column title={<span className="column-title">Max Group Size</span>} dataIndex="maxGroupSize" key="maxgroupsize" />
                <Column title={<span className="column-title">Price</span>} dataIndex="price" key="price" />
                <Column title={<span className="column-title">Title</span>} dataIndex="title" key="title" />
                <Column title={<span className="column-title">Actions</span>} dataIndex="lastName" key="lastName" render={renderActions} />
            </Table>
            {tours.length > 0 && (
                <Pagination
                    style={{
                        justifyContent: 'end'
                    }}
                    className="pagination-tour"
                    total={totalItem}
                    defaultCurrent={1}
                    defaultPageSize={8}
                    onChange={handlePaginationChange}
                />
            )}
        </div >
    )
}

export default CrudAdmin