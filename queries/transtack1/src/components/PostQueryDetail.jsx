import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const fetchPostDetails=(postId)=>{
    return axios.get(`http://localhost:4000/posts/${postId}`)
}

const PostQueryDetail = () => {

    const {postId}=useParams()
    //console.log(postId);

    const {data,isError,isLoading,error}=useQuery({
        queryKey:['posts',postId],
        queryFn:()=>fetchPostDetails(postId)
    })
    const {title,body}=data?.data||{};
    console.log(title);

    if(isLoading)
        return <div>Loading...</div>
    if(isError)
        return <div>{error.message}</div>

  return (
    <div>
        <h3>{title}</h3>
        <h4>{body}</h4>
    </div>
  )
}

export default PostQueryDetail