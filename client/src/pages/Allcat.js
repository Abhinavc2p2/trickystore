import { React, useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import axios from "axios";


const Allcat = () => {
   
    const category=useCategory();


  return (
   <Layout title={"Al category"}>
    <div className="container">
        <div className="row">
            {category.map(c=>(
   <div className="col-md-6 mt-5 gx-3 mb-3 gy-2">
   <Link to={`/category/${c.slug}`} className="btn btn-primary">{c.name}</Link>
</div>
            ))}
         

        </div>
    </div>



   </Layout>
  )
}

export default Allcat
