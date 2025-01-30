import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/CategoryProductStyles.css";
const ProductDetails = () => {
  const params = useParams();
  const [cart,setcart]=useCart()
  const [product, setproduct] = useState({});
  const [reletedproduct, setreleatedproduct] = useState([]);

  const getsimilarproduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/Product/releated-product/${pid}/${cid}`);

      setreleatedproduct(data?.product || []);
console.log("Related Products State:", data?.products || []);

      // Assuming API returns `products`
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    if (params?.slug) getproduct();
  }, [params.slug]);

  const getproduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/Product/single-products/${params.slug}`
      );
      console.log("Product Details:", data);
      setproduct(data?.product);
   if (data?.product?._id && data?.product?.category?._id) {
      getsimilarproduct(data.product._id, data.product.category._id);
    }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <Layout title={"Product Details"}>
      {/* Product Details */}
      <div className="row container mt-2 product-detail">
        <div className="col-md-6">
          {product?._id ? (

            
            <img
            src={`https://trickystore-run.onrender.com/api/v1/Product/photo-product/${product._id}`}
              className="card-img-top product-img"
              alt={product.name}
              height={300}
              width={300}
            />
          ) : (
            <p>Loading product image...</p>
          )}
        </div>

        <div className="col-md-6 text-center product-details-info">
          <h1>Product Details</h1>
          <h4>Name: {product.name || "Loading..."}</h4>
          <h4>Price: {product.price ? `$${product.price}` : "Loading..."}</h4>
          <h4>Description: {product.description || "Loading..."}</h4>
          <h4>category: {product?.category?.name || "Loading..."}</h4>
          <button className="btn btn-secondary ms-1" onClick={()=>{setcart([...cart,product]);
                    toast.success("items add to cart");
                    }}>
                      Add to Cart
                    </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="row mt-4">
        <h2 className="text-center">Similar Products</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {reletedproduct.length === 0 ? (
            <p>No related products found</p>
          ) : (
            reletedproduct.map((p) => (
              <div className="card m-2 product-card" key={p._id}>
                <img
                  src={`/api/v1/Product/photo-product/${p._id}`}
                  className="card-img-top product-img"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">₹{p.price}</p>
                  <button className="btn btn-secondary ms-1" onClick={()=>{setcart([...cart,p]);
                    toast.success("items add to cart");
                    }}>
                      Add to Cart
                    </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
