import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Space, Table, Button } from 'antd';
import { AiFillDelete } from "react-icons/ai";
import { AuthContext } from "../context/AuthProvider";

const { Column } = Table;

const CartTours = () => {
    const {cart} = useContext(AuthContext)

    return (
        <div className='container'>
            <h1>Cart Tour</h1>
            <Table pagination={false} dataSource={cart}>
                <Column title={<span className="column-title">STT</span>} key="stt" render={(text, record, index) => index + 1} />
                <Column title={<span className="column-title">Tour Id</span>} dataIndex="_id" key="_id" />
                <Column title={<span className="column-title">Tour Name</span>} dataIndex="tourName" key="tourName" />
                <Column title={<span className="column-title">Phone</span>} dataIndex="phone" key="phone" />
                <Column title={<span className="column-title">Guest Size</span>} dataIndex="guestSize" key="guestSize" />
            </Table>
        </div>
    )
}

export default CartTours