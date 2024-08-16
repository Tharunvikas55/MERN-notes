import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Expense from './Expense';
import ExpenseForm from './ExpenseForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Income from './Income';
import IncomeForm from './IncomeForm';

const DashBoard = () => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      // toast("Welcome");
      try {
        const res = await axios.get('http://localhost:3001/dashboard');
        if (res.data.valid) {
          // setMessage(res.data.message);
          setUserName(res.data.user.name);
          setUserId(res.data.user.id);
          
        } else {
          navigate('/');
          return;
        }
        if (res.data.user.id) {
          const expensesRes = await axios.get(`http://localhost:3001/${res.data.user.id}/get-expenses`);
          setExpenses(expensesRes.data.expenses);
          // const incomeRes = await axios.get(`http://localhost:3001/${res.data.user.id}/get-income`);
          // setIncomes(incomeRes.data.incomes);
          
        }
      } catch (err) {
        console.log(err);
        navigate('/');
      }
    };

    fetchData();
  }, [navigate]);
  

const addExpense = async (newExpense) => {
  try {
    const res = await axios.post(`http://localhost:3001/${userId}/add-expense`, newExpense);
    if (res.data.message === 'Expense added successfully') {
      const updatedExpenses = [...expenses, res.data.expense]; // Assuming `expense` returned by backend includes ID
      setExpenses(updatedExpenses); // Update state with the new expense
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses)); // Save expenses to localStorage
    } else {
      console.error('Failed to add expense');
    }
  } catch (error) {
    console.error('Error adding expense:', error);
  }
};


   // Function to update expenses state
   const updateExpenses = (newExpenses) => {
    setExpenses(newExpenses);}

  return (
    <div className="container-fluid">
      <NavBar userName={userName} />
      <div className="row">
        <div className="col">
          <ExpenseForm userId={userId} addExpense={addExpense} />
        </div>
        <div className="col">
          <Expense expenses={expenses}  updateExpenses={updateExpenses} userId={userId} />
        </div>
      </div>
      <div className='row'>
      <div className="col"><IncomeForm userId={userId} setIncomes={setIncomes} /></div>
        <div className="col"><Income incomes={incomes} /></div>
      </div>
    </div>
  );
};

export default DashBoard;
