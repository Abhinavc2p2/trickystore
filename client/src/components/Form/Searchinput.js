import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Searchinput = () => {
    const navigate=useNavigate()
    const [values,setvaues]=useSearch()

    const handlesubmit=async(e)=>{
        e.preventDefault()
        try {
            const {data}=await axios.get(`/api/v1/Product/searchproduct/${values.keyword}`)
            setvaues({...values,results:data});
            navigate("/search")
        } catch (error) {
            console.log(error)
            
        }
    }

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handlesubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e)=>{setvaues({...values,keyword:e.target.value})}}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchinput;
