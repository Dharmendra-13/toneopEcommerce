import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [click, setClick] = useState(false);
    const [checkout, setCheckout] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();
    const [cardholder, setCardholder] = useState("");
    const [card, setCard] = useState("");
    const [cvc, setCvc] = useState("");
    const [expiry, setExpiry] = useState("");
    const navigate = useNavigate();

    const handleNext = (e) => {
      e.preventDefault();
      setClick(true)
    }
  
    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };

  
    const handleBuyNow = (e) => {
        e.preventDefault();
        localStorage.setItem(
            "order",
            JSON.stringify([...cart])
          );
          toast.success("product is ordered");
          setCart([])
          navigate('/order')
    }

    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className=" cart-page">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            "Hello Guest"
                            <p className="text-center">
                                {cart?.length
                                    ? `You Have ${cart.length} items in your cart`
                                    :
                                      " Your Cart Is Empty"}
                            </p>
                        </h1>
                    </div>
                </div>
                <div className="container ">
                    <div className="row ">
                        <div className="col-md-7  p-0 m-0">
                            {cart?.map((p) => (
                                <div className="row card flex-row" key={p._id}>
                                    <div className="col-md-4">
                                        <img
                                            src={`/images/${p.photo}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            width="100%"
                                            height={"130px"}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price : {p.price}</p>
                                    </div>
                                    <div className="col-md-4 cart-remove-btn">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                removeCartItem(p._id)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                       {cart.length !== 0 ? ( <div className="col-md-5 cart-summary">
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total : {totalPrice()} </h4>
                            {click? (  <div 
                                className="container"                                   
                                >
                                    <form className=" row align-items-center">
                                        <h4 className="title">Card Details</h4>

                                        <div className="mb-3 col">
                                            <input
                                                type="text"
                                                autoFocus
                                                value={cardholder}
                                                onChange={ (e) => setCardholder(e.target.value)}
                                                className="form-control"
                                                id="exampleInpsddddddutEmail1"
                                                placeholder="Cardholder Name "
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col">
                                            <input
                                                type="text"
                                                value={card}
                                                onChange={(e) =>setCard(e.target.value)}
                                                className="form-control"
                                                id="exampleInputPsdddsdassword1"
                                                placeholder="Card Number"
                                                required
                                            />
                                        </div>
                                        <br />
                                        <div className="mb-3 ">
                                            <input
                                                type="text"
                                                value={expiry}
                                                onChange={(e) => setExpiry(e.target.value)}
                                                className="form-control"
                                                id="exampleInputPdfassword1"
                                                placeholder="MM/YY"
                                                required
                                            />
                                        </div>
                                        <br />
                                        <div className="mb-3 ">
                                            <input
                                                type="text"
                                                value={cvc}
                                                onChange={(e) => setCvc(e.target.value)}
                                                className="form-control"
                                                id="exampleInputPasdsword1"
                                                placeholder="CVC"
                                                required
                                            />
                                        </div>
                                        
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={handleBuyNow}
                                        >
                                            Buy Now
                                        </button>
                                    </form>
                                </div>) :  checkout ? (
                                <div 
                                className="container"                                   
                                >
                                    <form className=" row align-items-center">
                                        <h4 className="title">Checkout</h4>

                                        <div className="mb-3 col">
                                            <input
                                                type="text"
                                                autoFocus
                                                value={name}
                                                onChange={ (e) => setName(e.target.value)}
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                placeholder="Enter Your Name "
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) =>setEmail(e.target.value)}
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Enter Your Email"
                                                required
                                            />
                                        </div>
                                        <br />
                                        <div className="mb-3 ">
                                            <input
                                                type="text"
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Enter Your Mobile Numbers"
                                                required
                                            />
                                        </div>
                                        <br />
                                        <div className="mb-3 ">
                                            <input
                                                type="text"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Enter Your Address"
                                                required
                                            />
                                        </div>
                                        
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setCheckout(true)}
                                >
                                    checkout
                                </button>
                            )}
                        </div>) : '' } 
                      
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
