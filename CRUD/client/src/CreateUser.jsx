import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [age,setAge]=useState()
    const navigate=useNavigate()

    const Submit=(e)=>{
        e.preventDefault();
        axios.post("https://mern-notes-nojq.onrender.com/createUser",{name,email,age})
        .then(result=>{
            console.log(result),
            navigate('/')
        })
        .catch(error=>console.log(error))
    
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={Submit}>
                <h2>Add User</h2>
                <div className='mb-2'>
                    <label htmlFor="">Name</label>
                    <input type="text" className='form-control' name="" id="" placeholder='Enter Name' onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Email</label>
                    <input  type="email" className='form-control' name="" id="" placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Age</label>
                    <input  type="text" className='form-control' name="" id="" placeholder='Enter your age' onChange={(e)=>setAge(e.target.value)}/>
                </div>
                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
        </div>
      
    </div>
  )
}

export default CreateUser;
