import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [clientToken, setclienttoken] = useState("");
  const navigate = useNavigate();
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
 

  // Calculate total price


  const total = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.error("Error calculating total:", error);
      return "₹0.00";
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  const gettoken = async () => {
    try {
      const { data } = await axios.get("/api/v1/Product/braintree/token");
      console.log("Client Token:", data?.clientToken); // Debugging
      setclienttoken(data?.clientToken);
    } catch (error) {
      console.error("Error fetching client token:", error);
    }
  };
  
  useEffect(() => {
    gettoken();
  }, [auth?.token]);

  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await axios.post("/api/v1/Product/braintree/payment", {
  //       nonce,
  //       cart,
  //     });
  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/user/order");
  //     toast.success("Payment Completed Successfully ");
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
  // const handlePayment = async () => {
  //   try {
  //     // Temporary testing logic
  //     navigate("/dashboard/user/orders"); // Navigate to orders page
  //     toast.success("Payment simulation completed successfully!");
  //   } catch (error) {
  //     console.error("Error in handlePayment:", error);
  //   }
  // };

  // const handlePayment = async () => {
  //   try {
  //     // Simulating order creation in the database
  //     setLoading(true);
  //     const { data } = await axios.post("/api/v1/Product/braintree/payment", {
  //       cart, // Pass the cart details to create the order
  //     });
  //     setLoading(false);
  
  //     // Clear the cart and navigate to the orders page
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/user/orders");
  //     toast.success("Order created successfully! (Payment bypassed)");
  //   } catch (error) {
  //     console.error("Error in handlePayment (Order creation):", error);
  //     setLoading(false);
  //     toast.error("Failed to create the order. Please try again.");
  //   }
  // };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/Product/braintree/payment", {
        cart, // Send the cart details to create the order
      });
      setLoading(false);
  
      // Clear the cart and navigate to the orders page
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success(data?.message || "Order created successfully! (Payment bypassed)");
    } catch (error) {
      console.error("Error in handlePayment (Order creation):", error);
      setLoading(false);
      toast.error("Failed to create the order. Please try again.");
    }
  };
  
  
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} item(s) in Your Cart ${
                    auth?.token ? " " : "please login to checkout"
                  }`
                : "Your cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div key={p._id} className="row m-2 card flex-row">
                <div className="col-md-4">
                <img
                src={`https://trickystore-run.onrender.com/api/v1/Product/photo-product/${p._id}`}
                    className="card-img-top product-img"
                    alt={p.name}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">₹{p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4  text-center">
            <h2>Cart Summary</h2>
            <h6>Total | Checkout | Payment</h6>
            <h6>Total: {total()}</h6>

            {auth?.user?.address ? (
              <div className="mb-3">
                <h5>Current Address</h5>
                <p>{auth?.user?.address || "123, Debug Street, Test City"}</p>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate(`/dashboard/user/profile`)}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate(`/dashboard/user/profile`)}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate(`/login`)}
                  >
                    Please login to Checkout
                  </button>
                )}
              </div>
            )}

<div className="mt-2">
  {cart.length > 0 && (
    <div>
      {/* DropIn component temporarily disabled */}
      {/* <DropIn
        options={{
          authorization: clientToken,
          paypal: { flow: "vault" },
        }}
        onInstance={setInstance}
      /> */}
      <button
        className="btn btn-primary"
        onClick={handlePayment}
      >
        Place Order
      </button>
    </div>
  )}
</div>


          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
