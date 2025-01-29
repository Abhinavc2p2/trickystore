import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment"

const Orders = () => {
  const [order, setorder] = useState([]);
  const [auth, setauth] = useAuth();

  const getorders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setorder(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getorders();
  }, [auth?.token]);
  return (
    <>
      <Layout title={"User-Order"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu></UserMenu>
            </div>
            <div className="col-md-9">
              <h1 className="text-center">All Orders</h1>
              {order?.map((o, i) => {
                return (
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <th scope="col">#</th>
                        <th scope="col">status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Orders</th>
                        <th scope="col">payment</th>
                        <th scope="col">quantity</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i+1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.payment.success?"success":"falied"}</td>
                          <td>{o?.products?.length}</td>

                        </tr>
                      </tbody>
                    </table>
                    <div className="container">

                    <div className="col-md-8">
            {o?.products?.map((p) => (
              <div key={p._id} className="row m-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/Product/photo-product/${p._id}`}
                    className="card-img-top product-img"
                    alt={p.name}
                    height={200}
                    width={200}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Orders;
