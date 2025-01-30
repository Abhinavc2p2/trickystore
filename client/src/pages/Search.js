import Layout from "../components/Layout/Layout";
import React from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setvalues] = useSearch();
  const navigate=useNavigate();

  return (
    <Layout title="search results">
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.lenght < 1
              ? "no product found "
              : `Found${values?.results.length}`}
          </h6>

          <div className="d-flex flex-wrap">
            {values.length === 0 ? (
              <p>No products found</p>
            ) : (
              values?.results.map((p) => (
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
                    <p className="card-text">${p.price}</p>
                    <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
