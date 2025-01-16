import React from "react";
import Layout from "./Layout";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
  <>

        <div className="text-center">

        <div className="list-group">
       <h4>Admin Panel</h4>
        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
         Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-poroduct" className="list-group-item list-group-item-action">
         Create Product
        </NavLink>
      
        <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
        All products
        </NavLink>
       
        <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
         users
        </NavLink>
    
      </div>
        </div>
        </>
   
  );
};

export default AdminMenu;
