import React, { useEffect,useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import axios from 'axios'
const UpdateUser = () => {
    const {id}=useParams()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [age,setAge]=useState()
    const navigate=useNavigate()

    
  useEffect(()=>{
    axios.get("http://localhost:3001/getUser/"+id)
    .then(result=>{console.log(result.data)
    setName(result.data.name)
    setEmail(result.data.email)
    setAge(result.data.age)
})
    .catch(err=>console.log(err))
  },[])

  const update=(e)=>{
    e.preventDefault();
    axios.put("http://localhost:3001/update/"+id,{name,email,age})
        .then(result=>{
            console.log(result),
            navigate('/')
  })}

  return (
    <div>
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={update}>
                <h2>Update User</h2>
                <div className='mb-2'>
                    <label htmlFor="">Name</label>  
                    <input type="text" className='form-control' placeholder='Enter Name'value={name} onChange={(e)=>setName(e.target.value)}  />
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Email</label>
                    <input type="email" className='form-control' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Age</label>
                    <input type="text" className='form-control' placeholder='Enter your age' value={age}  onChange={(e)=>setAge(e.target.value)}/>
                </div>
                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
        </div>
      
    </div>
    </div>
  )
}

export default UpdateUser;
