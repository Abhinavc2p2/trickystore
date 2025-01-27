import Layout from "../../components/Layout/Layout";
import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Product = () => {
  const [products, setproduct] = useState([]);

  const getallproducts = async () => {
    try {
      
      const { data } = await axios.get("/api/v1/Product/getproducts");

      if (data?.success) {
        setproduct(data.product);
        console.log("Fetched Products:", products);
        toast.success("product get succesfully");
      }
    } catch (error) {
      toast.error("Erroin Getting Products");
    }
  };
  useEffect(() => {
    getallproducts();
    console.log(products);
  }, []);
  return (
    <>
      <Layout title={"All products"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu></AdminMenu>
            </div>
            <div className="col-md-9">
              <h1 className="text-center"> All Products List</h1>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/Products/${p.slug}`}
                    className="product_link"
                  >
                    <div className="card m-2 product-card" style={{ width: "18rem" }}>
                      <img
                        src={`/api/v1/Product/photo-product/${p._id}`}
                        className="card-img-top product-img"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Product;
