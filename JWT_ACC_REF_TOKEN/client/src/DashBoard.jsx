import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const [message,setMessage]=useState("")
  const [userName, setUserName] = useState("")
  const navigate=useNavigate()
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:3001/dashboard')
    .then((res)=>{console.log(res)
      if(res.data.valid)
        {setMessage(res.data.message);
          setUserName(res.data.user.name);
        }

      else
      navigate('/login')
    })
    .catch(err=>console.log(err))
  })

  const handleLogout = () => {
    axios.post('http://localhost:3001/logout')
      .then(res => {
        if (res.data.success) {
          navigate('/login');
        } else {
          console.log("Logout failed:", res.data.message);
        }
      })
      .catch(err => {
        console.log("Error during logout:", err);
      });
  };

  return (
    <div>
      <h2>DashBoard {message}</h2>
      <p>Welcome, {userName}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DashBoard