// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';


// // const Expense = ({userId}) => {
// //   const [expenses, setExpenses] = useState([]);
// //   const navigate=useNavigate()

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await axios.get('http://localhost:3001/:userId/get-expenses'); // Replace :id with actual user ID or use a dynamic way to get user expenses
        
// //         setExpenses(res.data.expenses); // Assuming the response structure is { expenses: [...] }
// //       } catch (err) {
// //         console.log(err);
// //         // Redirect to homepage or handle error as needed
// //         navigate('/dashboard');
// //       }
// //     };

// //     fetchData();
// //   }, [navigate]);

// //   return (
// //     <div className='bg-light'>
// //       <center>Expense Table</center>
// //       <table className="table table-striped table-hover">
// //         <thead>
// //           <tr>
// //             <th>Title</th>
// //             <th>Description</th>
// //             <th>Amount</th>
// //             <th>Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {expenses.map((expense, index) => (
// //             <tr key={index}>
// //               <td>{expense.title}</td>
// //               <td>{expense.description}</td>
// //               <td>{expense.amount}</td>
// //               <td>{new Date(expense.date).toLocaleDateString()}</td>
// //               <td>
// //                 <button>Edit</button>
// //                 <button>Delete</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default Expense;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaRegEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import './Expense.css'

// const Expense = ({ userId }) => {
//   const [expenses, setExpenses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3001/${userId}/get-expenses`);
        
//         setExpenses(res.data.expenses); // Assuming the response structure is { expenses: [...] }
//       } catch (err) {
//         console.log(err);
//         // Redirect to dashboard or handle error as needed
//         navigate('/dashboard');
//       }
//     };

//     fetchData();
//   }, [userId, navigate]);
//   const handleEdit=(e)=>{
//     e.preventDefault();
//     axios.put(`http://localhost:3001/${userId}/edit-response`,{index})
//   }

//   return (
//     <div className='bg-light'>
//       <center>Expense Table</center>
//       <table className="table table-striped table-hover">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Amount</th>
//             <th>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.map((expense, index) => (
//             <tr key={index}>
//               {console.log(index)}
//               <td>{expense.title}</td>
//               <td>{expense.description}</td>
//               <td>{expense.amount}</td>
//               <td>{new Date(expense.date).toLocaleDateString()}</td>
//               <td>
//               <FaRegEdit onClick={handleEdit} />
//               <MdDelete />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div id='123'>
//       <div className="row d-flex justify-content-center align-items-center rows">
// <div className="col-md-6">
//     <div className="card">
//         <div className="text-center">
//             <span className="d-block mt-3">Subscribe to our newsletter in order not to miss new arrivals <br/> promotions and discounts of our store</span>
//             <div className="mx-5">
//                <div className="input-group mb-3 mt-4">
//                   <input type="text" className="form-control" placeholder="Enter email" aria-label="Recipient's username" aria-describedby="button-addon2"/>
//                   <button className="btn btn-success border-rad" type="button" id="button-addon2">Subscribe</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// </div>
//       </div>
//     </div>
//   );
// };

// export default Expense;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FcAcceptDatabase, FcCancel } from "react-icons/fc";

const Expense = ({ userId, expenses, setExpenses }) => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', amount: '' });
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotalExpense(expenses); // Calculate total expense when expenses are updated
  }, [expenses]);

  // Function to calculate total expense
  const calculateTotalExpense = (expenses) => {
    let total = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    setTotalExpense(total);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData({
      title: expenses[index].title,
      description: expenses[index].description,
      amount: expenses[index].amount
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseId = expenses[editIndex]._id; // Assuming each expense object has a unique _id
      await axios.put(`http://localhost:3001/${userId}/edit-expense/${expenseId}`, editData);
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = { ...editData, _id: expenseId }; // Update local state
      // Update the state with the updated expenses
      setExpenses(updatedExpenses);
      setEditIndex(null);
      setEditData({ title: '', description: '', amount: '' });
    } catch (err) {
      console.log(err);
      // Handle error as needed
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditData({ title: '', description: '', amount: '' });
  };

  const handleDelete = async (index) => {
    const expenseId = expenses[index]._id; // Get the ID of the expense to delete
    try {
      await axios.delete(`http://localhost:3001/${userId}/delete-expense/${expenseId}`);
      // Update the state by filtering out the deleted expense
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);
    } catch (err) {
      console.log(err);
      // Handle error as needed
    }
  };

  return (
    <div className='bg-light'>
      <center className='h2'>Expense Table</center>
      <center className='h5'>Total Expense: {totalExpense}</center>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{editIndex === index ? (
                <input
                  type="text"
                  name="title"
                  className='form-control'
                  value={editData.title}
                  onChange={handleEditChange}
                />
              ) : (
                expense.title
              )}</td>
              <td>{editIndex === index ? (
                <input
                  type="text"
                  name="description"
                  className='form-control'
                  value={editData.description}
                  onChange={handleEditChange}
                />
              ) : (
                expense.description
              )}</td>
              <td>{editIndex === index ? (
                <input
                  type="number"
                  name="amount"
                  className='form-control'
                  value={editData.amount}
                  onChange={handleEditChange}
                />
              ) : (
                expense.amount
              )}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>
                {editIndex === index ? (
                  <>
                    <button className='btn' onClick={handleEditSubmit}><FcAcceptDatabase /></button>
                    <button className='btn' onClick={handleCancelEdit}><FcCancel /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(index)} className='btn' ><FaRegEdit /></button>
                    <button className='btn btn-danger' onClick={() => handleDelete(index)}><MdDelete /></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expense;
