import React from 'react'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <div className="container mt-4">
      <div className="row g-4">
        {/* Map through posts */}
        {data?.data.map((post) => (
          <div key={post.id} className="col-md-6">
            <Link to={`/rq/${post.id}`} className="text-decoration-none">
              {/* Bootstrap Card for Post */}
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{post.title}</h5>
                  <p className="card-text text-muted">{post.body.substring(0, 100)}...</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
           </div>
           </div>
    
          )
}

export default PostQuery

//query by Id also possible