import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const PostTrad = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchpost = async () => {
    try {
      const res = await axios.get('http://localhost:4000/posts')
      setPosts(res.data)
      //console.log(res);
    } catch (err) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchpost()
  }, [])

  if (isLoading) return <div className="text-center py-5">Loading...</div>
  if (isError) return <div className="text-center text-danger py-5">Error...</div>

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {posts.map((post) => (
          <div key={post.id} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">{post.title}</h5>
                <p className="card-text text-muted">{post.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostTrad
