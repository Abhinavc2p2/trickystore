import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
// import { Button } from "antd";
import {} from "antd";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();

  const [categories, setcategories] = useState([]);
  const [photo, setphoto] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setquantity] = useState("");
  const [slug, setslug] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [shipping, setshipping] = useState("");

  //get all category
  const getallcategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categorys");
      if (data?.success) {
        setcategories(data?.category);
        // console.log(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong during getting category");
    }
  };

  useEffect(() => {
    getallcategory();
  }, []);

  const handlecreate = async (e) => {
    e.preventDefault();
    try {
      const productdata = new FormData();
      productdata.append("name", name);
      productdata.append("price", price);
      productdata.append("quantity", quantity);
      productdata.append("description", description);
      productdata.append("photo", photo);
      productdata.append("category", category);

      const { data } = await axios.post(
        "/api/v1/Product/create-product",
        productdata
      );
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <>
      <Layout title={"Admin-Create Product"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu></AdminMenu>
            </div>
            <div className="col-md-9">
              <h1>Create product</h1>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="Seletct a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setcategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setphoto(e.target.files[0])}
                      hidden
                    ></input>
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product photo"
                        height={"200px"}
                        className="img img-responsive"
                      ></img>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Write Product name"
                    className="form-control"
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Write your Description"
                    className="form-control"
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Write your price"
                    className="form-control"
                    onChange={(e) => setprice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Write your quantity"
                    className="form-control"
                    onChange={(e) => setquantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Seletct shipping"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setshipping(value);
                    }}
                  >
                    <Option value="1">Yes</Option>
                    <Option value="0">No</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className=" btn btn-primary" onClick={handlecreate}>
                    Create product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
