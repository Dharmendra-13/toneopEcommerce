import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import productsDetails from '../database/data';

const ProductDetails = () => {
  const params = useParams();
  
  const [product, setProduct] = useState({});
  
  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const data = productsDetails.filter((p) =>{
        return p.slug === params.slug
      })
      setProduct(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/images/${product.photo}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
    </Layout>
  );
};

export default ProductDetails;
