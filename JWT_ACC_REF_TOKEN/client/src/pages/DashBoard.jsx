// import React,{useEffect, useState} from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const DashBoard = () => {
//   const [message,setMessage]=useState("")
//   const [userName, setUserName] = useState("")
//   const navigate=useNavigate()
//   axios.defaults.withCredentials=true;
//   useEffect(()=>{
//     axios.get('http://localhost:3001/dashboard')
//     .then((res)=>{
//       //console.log(res)
//       if(res.data.valid)
//         {setMessage(res.data.message);
//           setUserName(res.data.user.name);
//         }

//       else
//       {
//         if(!res.data.valid)
//           navigate('/login')
//       }
//     })
//     .catch(err=>console.log(err))
//   })

//   const handleLogout = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:3001/logout')
//       .then(res => {
//         if (res.data.success) {
//           navigate('/login');
//         } else {
//           console.log("Logout failed:", res.data.message);
//         }
//       })
//       .catch(err => {
//         console.log("Error during logout:", err);
//       });
//   };

//   return (
//     <div>
//       <h2>DashBoard {message}</h2>
//       <p>Welcome, {userName}</p>
//       <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
//     </div>
//   )
// }

// export default DashBoard





import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

const DashBoard = () => {
  const [message,setMessage]=useState("")
  const [userName, setUserName] = useState("")
  const navigate=useNavigate()
  axios.defaults.withCredentials=true;
  // useEffect(()=>{
  //   axios.get('http://localhost:3001/dashboard')
  //   .then((res)=>{console.log(res)
  //     if(res.data.valid)
  //       {setMessage(res.data.message);
  //         setUserName(res.data.user.name);
  //       }

  //     else
  //     navigate('/login')
  //   })
  //   .catch(err=>console.log(err))
  // })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/dashboard');
        if (res.data.valid) {
          setMessage(res.data.message);
          setUserName(res.data.user.name);
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);




  return (
    <div>
      <h2 className='center'>DashBoard </h2>
      <div>
        <NavBar  userName={userName}/>
      </div>     
    </div>
  )
}

export default DashBoard