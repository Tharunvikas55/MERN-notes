import React from 'react'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

const PostQuery = () => {
    const {data,isError,isLoading,error,isFetching,refetch}=useQuery({queryKey:['posts'],
    queryFn:()=>{
       return axios.get("http://localhost:4000/posts")
    },
    //stale time is for reduction of api call while we reload the page
    //staleTime: 30000

    //poling helps to fetch data regular intervel i.e for below it fetch data for every 1 second
    // refetchInterval:1000,
    //to run refetchInterval while on other tap also
    // refetchIntervalInBackground:true
    //if we want to call api by onclick we can do below
    // enabled:false

    })
    //console.log(isLoading,isFetching);
    if(isLoading)
        return <div>Loading...</div>
    if(isError)
        return <div>{error.message}</div>
        //console.log(data);

    return (
            <div>
                {/* <button onClick={refetch}>fetch by refetch method </button> */}
                {data?.data.map(post=>(
                <Link to={`/rq/${post.id}`} ><div key={post.id}>
                <h1>{post.title}</h1>
                <h2>{post.body}</h2>
            </div></Link>
            ))}</div>
          )
}

export default PostQuery

//query by Id also possible