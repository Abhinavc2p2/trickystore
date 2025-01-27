import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const Singlecat = () => {
  const params = useParams();
  // const [product,setproduct]=useState([])
  const [category, setcategory] = useState([]);
  const [cart, setcart] = useCart();
  const [products, setproducts] = useState([]);

  const navigate = useNavigate();

  const getproduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/Product/productcat/${params.slug}`
      );
      setproducts(data?.product);
      setcategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getproduct();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category {category?.name}</h4>
        <h6 className="text-center">Count {products?.length}</h6>
      </div>
      <div className="col-md-9">
        <h1 className="text-center">All Products</h1>
        <div className="d-flex flex-wrap">
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((p) => (
              <div className="card m-2 product-card" key={p._id}>
                <img
                  src={`/api/v1/Product/photo-product/${p._id}`}
                  className="card-img-top product-img"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">₹{p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setcart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("items add to cart");
                    }}
                  >
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

export default Singlecat;
