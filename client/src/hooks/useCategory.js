import {useState,useEffect} from 'react'
import axios from 'axios'


export  default function useCategory(){
    const[categories,setcategories]=useState([])

    const getcategories=async()=>{
        try {
            const {data}=await axios.get(`/api/v1/category/categorys`)
            setcategories(data?.category)
        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(()=>{
        getcategories();
    },[])
    return categories
}
