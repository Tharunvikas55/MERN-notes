import React from 'react'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

const PostQuery = () => {
    const {data,isError,isLoading,error,isFetching}=useQuery({queryKey:['posts'],
    queryFn:()=>{
       return axios.get("http://localhost:4000/posts")
    },
    staleTime: 30000

    })
    console.log(isLoading,isFetching);
    if(isLoading)
        return <div>Loading...</div>
    if(isError)
        return <div>{error.message}</div>
        //console.log(data);

    return (
            <div>{data?.data.map(post=>(
                <div key={post.id}>
                    <h1>{post.title}</h1>
                    <h2>{post.body}</h2>
                </div>
            ))}</div>
          )
}

export default PostQuery