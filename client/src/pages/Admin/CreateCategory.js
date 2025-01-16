import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd"

const CreateCategory = () => {
  const [category, setcategory] = useState([]);
  const [name, setname] = useState("");
  const[visible,setvisible]=useState(false)
  const [selected,setselected]=useState(null)
  const [updatedname,setupdatedname]=useState("")

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
      setname("")
        getallcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong input form");
    }
  };

  const getallcategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categorys");
      if (data?.success) {
        setcategory(data.category);
        console.log(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong during getting category");
    }
  };

  useEffect(() => {
    getallcategory();
  }, []);

  const handleupdate=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedname});
      if(data){
        toast.success(`${updatedname} is updated`)
        setselected("")
        setupdatedname("")
        setvisible(false)
        getallcategory()
      }else{
        toast.error(data.error)
      }
      getallcategory()
    } catch (error) {
      toast.error("something went wrong while updating category")
      
    }

  }

  const handledelete=async(id)=>{
 
    try {
      const {data}=await axios.delete(`/api/v1/category/delete-category/${id}`);
      if(data){
        toast.success(`${name} is Deleted`)
        getallcategory()
      }else{
        toast.error(data.error)
      }
      getallcategory()
    } catch (error) {
      toast.error("something went wrong while updating category")
      
    }

  }

 

  return (
    <>
      <Layout title={"Admin-Create category"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu></AdminMenu>
            </div>
            <div className="col-md-9">

              <h1>Manage Category</h1>

              <div className="p-3 w-50">
                <CategoryForm
                  handlesubmit={handlesubmit}
                  value={name}
                  setvalue={setname}
                ></CategoryForm>
              </div>

              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.map((c) => (
                      <>
                        <tr>
                          <td key={c.id}>{c.name}</td>
                          <td>
                            <button className="btn btn-primary ms-2" onClick={()=>{setvisible(true); setupdatedname(c.name) ;setselected(c)}} >Edit </button>
                            <button className="btn btn-danger ms-2" onClick={()=>{handledelete(c._id)}}>Delete </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
           <Modal onCancel={()=>setvisible(false)} footer={null} visible={visible}> <CategoryForm value={updatedname}setvalue={setupdatedname} handlesubmit={handleupdate} /></Modal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
