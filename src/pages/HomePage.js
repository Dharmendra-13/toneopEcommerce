import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productData from "../database/data";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import "../styles/Homepage.css";

const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);

    //get products
    const getAllProducts = async () => {
        try {
            const data = productData;
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout title={"All Products - Best offers "}>
            {/* banner image */}
            <img
                src="/images/banner.jpg"
                className="banner-img"
                alt="bannerimage"
                width={"100%"}
                height={"300px"}
            />
            {/* banner image */}
            <div className="container-fluid row mt-3 home-page">
                <div className="col-md-12 col-sm-12">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex justify-content-center flex-wrap">
                        {products?.map((p) => (
                            <div className="card m-2" key={p.id}>
                                <img
                                    src={`/images/${p.photo}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <div className="card-name-price">
                                        <h5 className="card-title">{p.name}</h5>
                                        <h5 className="card-title card-price">
                                            {p.price.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                        </h5>
                                    </div>
                                    <p className="card-text ">
                                        {p.description.substring(0, 60)}...
                                    </p>
                                    <div className="card-name-price">
                                        <button
                                            className="btn btn-info ms-1"
                                            onClick={() =>
                                                navigate(`/product/${p.slug}`)
                                            }
                                        >
                                            More Details
                                        </button>
                                        <button
                                            className="btn btn-dark ms-1"
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem(
                                                    "cart",
                                                    JSON.stringify([...cart, p])
                                                );
                                                toast.success(
                                                    "Item Added to cart"
                                                );
                                            }}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
