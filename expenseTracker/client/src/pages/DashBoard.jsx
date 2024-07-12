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




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Expense from './Expense';
import ExpenseForm from './ExpenseForm';

const DashBoard = () => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState();
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/dashboard');
        if (res.data.valid) {
          setMessage(res.data.message);
          setUserName(res.data.user.name);
          setUserId(res.data.user.id);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.log(err);
        navigate('/');
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/${userId}/get-expenses`);
        setExpenses(res.data.expenses);
      } catch (err) {
        console.log(err);
        navigate('/dashboard');
      }
    };

    if (userId) {
      fetchExpenses();
    }
  }, [userId, navigate]);

  

  const addExpense = async (newExpense) => {
    try {
      const res = await axios.post(`http://localhost:3001/${userId}/add-expense`, newExpense);
      if (res.data.success) {
        setExpenses([...expenses, res.data.expense]);
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="container-fluid">
      <NavBar userName={userName} />
      <div className="row">
        <div className="col"><ExpenseForm userId={userId} addExpense={addExpense} /></div>
        <div className="col"><Expense expenses={expenses} userId={userId} /></div>
      </div>
    </div>
  );
};

export default DashBoard;
