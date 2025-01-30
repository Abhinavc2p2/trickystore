import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Button, Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/Homepage.css";

const HomePage = () => {
  const [products, setproducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [checked, setchecked] = useState([]);
  const [radio, setradio] = useState([]);
  const [total, settotal] = useState(0);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [cart, setcart] = useCart();
  const navigate = useNavigate();

  const getallcategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categorys");
      if (data?.success) {
        setcategory(data.category);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const getAllProducts = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(`/api/v1/Product/product-list/${page}`);
      setloading(false);
      if (data?.success) {
        setproducts(data.product);
      }
    } catch (error) {
      setloading(false);
      console.log("Error fetching products:", error);
    }
  };

  const gettotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/Product/productcount");
      settotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);
  const loadmore = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(`/api/v1/Product/product-list/${page}`);
      setloading(false);
      setproducts([...products, ...data?.product]);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const handlefilter = (val, id) => {
    let all = [...checked];
    if (val) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setchecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setproducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallcategory();
    gettotal();
  }, []);

  return (
    <Layout title={"All Products"}>

<img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column p-4">
            {category?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handlefilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column p-4">
            <Radio.Group onChange={(e) => setradio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger btn-sm  w-50"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
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
                src={`https://trickystore-run.onrender.com/api/v1/Product/photo-product/${p._id}`}
                    className="card-img-top product-img"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}
                    </p>
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
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setpage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
