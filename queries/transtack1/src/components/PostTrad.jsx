import React, { useEffect, useState } from 'react'
import axios from 'axios';

const PostTrad = () => {

    const [posts,setPosts]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [isError,setIsError]=useState(false);

    const fetchpost=async()=>{
        try{
            const res=await axios.get("http://localhost:4000/posts");
            setPosts(res.data);
            //console.log(res);
        }catch(err){
            setIsError(true);

        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchpost();
    },[])

    if(isLoading)
        return <div>Loading...</div>
    if(isError)
        return <div>Error...</div>

  return (
    <div>{posts.map(post=>(
        <div key={post.id}>
            <h1>{post.title}</h1>
            <h2>{post.body}</h2>
        </div>
    ))}</div>
  )
}

export default PostTrad