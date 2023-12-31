import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const getOrders = async () => {
        try {
            const data = localStorage.getItem("order");
            setOrders(JSON.parse(data));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getOrders();
    }, []);
    return (
        <Layout title={"Your Order"}>
            <div className="container-fluid dashboard">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-9">
                        <h1 className="text-center">Orders</h1>
                        {orders?.map((o, i) => {
                            return (
                                <div className="border shadow mb-3" key={i}>
                                    <table className="table-sm table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                               
                                                <th scope="col">Payment</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{"processing"}</td>
                                                <td>{o.name}</td>
                                               
                                                <td>"Success"</td>
                                                
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        <div
                                            className="row mb-2 p-3 card flex-row"
                                            key={o._id}
                                        >
                                            <div className="col-md-4">
                                                <img
                                                    src={`/images/${o.photo}`}
                                                    className="card-img-top"
                                                    alt={o.name}
                                                    width="100px"
                                                    height={"200px"}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <p>{o.name}</p>
                                                <p>
                                                    {o.description.substring(
                                                        0,
                                                        30
                                                    )}
                                                </p>
                                                <p>Price : {o.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
