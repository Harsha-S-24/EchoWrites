import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
export interface Blog{
    "content": string,
            "title": string,
            "id": number,
            "publishedAt":Date,
            "phrase":string,
            "author": {
                "name": string
            }
}
export const useMyBlogs = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [myBlogs, setMyBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchMyBlogs = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/blog/myBlogs`, {
            headers: {
              Authorization: localStorage.getItem("token") || "",
            },
          });
          setMyBlogs(response.data.blogs || []);
        } catch (e) {
          setError("Failed to fetch blogs");
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMyBlogs();
    }, []);
  
    return {
      loading,
      myBlogs,
      error,
    };
  };
export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true);
    const [blog,setBlog]=useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(response=>{
            setBlog(response.data.blog);
            setLoading(false);
        })
    },[]);

    return {
        loading,
        blog
    }
}
export const useBlogs=()=>{
    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/get/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(response=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[]);

    return {
        loading,
        blogs
    }
}