// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaRegEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { FcAcceptDatabase, FcCancel } from "react-icons/fc";

// const Expense = ({ userId, expenses, updateExpenses }) => {
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editData, setEditData] = useState({ title: '', description: '', amount: '' });
//   const navigate = useNavigate();

//   useEffect(() => {
//     calculateTotalExpense(expenses); // Calculate total expense when expenses are updated
//   }, [expenses]);

//   // Effect to update local state when expenses prop changes
//   useEffect(() => {
//     setLocalExpenses(expenses); // Assuming setLocalExpenses updates local state
//   }, [expenses]);

//   const calculateTotalExpense = (expenses) => {
//     const total = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
//     setTotalExpense(total);
//   };


//   const handleEditClick = (index) => {
//     setEditIndex(index);
//     setEditData({
//       title: expenses[index].title,
//       description: expenses[index].description,
//       amount: expenses[index].amount
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditData({ ...editData, [name]: value });
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const expenseId = expenses[editIndex]._id; // Assuming each expense object has a unique _id
//       await axios.put(`http://localhost:3001/${userId}/edit-expense/${expenseId}`, editData);
//       const updatedExpenses = [...expenses];
//       updatedExpenses[editIndex] = { ...editData, _id: expenseId }; // Update local state
//       setExpenses(updatedExpenses);
//       setEditIndex(null);
//       setEditData({ title: '', description: '', amount: '' });
//     } catch (err) {
//       console.log(err);
//       // Handle error as needed
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditIndex(null);
//     setEditData({ title: '', description: '', amount: '' });
//   };

//   const handleDelete = async (index) => {
//     const expenseId = expenses[index]._id; // Get the ID of the expense to delete
//     try {
//       await axios.delete(`http://localhost:3001/${userId}/delete-expense/${expenseId}`);
//       const updatedExpenses = expenses.filter((_, i) => i !== index); // Update state by filtering out the deleted expense
//       setExpenses(updatedExpenses);
//     } catch (err) {
//       console.log(err);
//       // Handle error as needed
//     }
//   };

//   return (
//     <div className='bg-light'>
//       <center className='h2'>Expense Table</center>
//       <center className='h5'>Total Expense: {totalExpense}</center>
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
//               <td>
//                 {editIndex === index ? (
//                   <input
//                     type="text"
//                     name="title"
//                     className='form-control'
//                     value={editData.title}
//                     onChange={handleEditChange}
//                   />
//                 ) : (
//                   expense.title
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <input
//                     type="text"
//                     name="description"
//                     className='form-control'
//                     value={editData.description}
//                     onChange={handleEditChange}
//                   />
//                 ) : (
//                   expense.description
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <input
//                     type="number"
//                     name="amount"
//                     className='form-control'
//                     value={editData.amount}
//                     onChange={handleEditChange}
//                   />
//                 ) : (
//                   expense.amount
//                 )}
//               </td>
//               <td>{new Date(expense.date).toLocaleDateString()}</td>
//               <td>
//                 {editIndex === index ? (
//                   <>
//                     <button className='btn' onClick={handleEditSubmit}><FcAcceptDatabase /></button>
//                     <button className='btn' onClick={handleCancelEdit}><FcCancel /></button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handleEditClick(index)} className='btn'><FaRegEdit /></button>
//                     <button className='btn btn-danger' onClick={() => handleDelete(index)}><MdDelete /></button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Expense;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FcAcceptDatabase, FcCancel } from "react-icons/fc";

const Expense = ({ userId, expenses, updateExpenses }) => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', amount: '' });

  useEffect(() => {
    calculateTotalExpense(expenses); // Calculate total expense when expenses are updated
  }, [expenses]);

  const calculateTotalExpense = (expenses) => {
    const total = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
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
      const res = await axios.put(`http://localhost:3001/${userId}/edit-expense/${expenseId}`, editData);
      if (res.data.message === 'Expense edited successfully') {
        const updatedExpenses = [...expenses];
        updatedExpenses[editIndex] = { ...editData, _id: expenseId }; // Update local state
        updateExpenses(updatedExpenses); // Update parent component's state
        setEditIndex(null);
        setEditData({ title: '', description: '', amount: '' });
      } else {
        console.error('Failed to edit expense');
      }
    } catch (err) {
      console.error('Error editing expense:', err);
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
      const updatedExpenses = expenses.filter((_, i) => i !== index); // Update state by filtering out the deleted expense
      updateExpenses(updatedExpenses); // Update parent component's state
    } catch (err) {
      console.error('Error deleting expense:', err);
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
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="title"
                    className='form-control'
                    value={editData.title}
                    onChange={handleEditChange}
                  />
                ) : (
                  expense.title
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="description"
                    className='form-control'
                    value={editData.description}
                    onChange={handleEditChange}
                  />
                ) : (
                  expense.description
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="number"
                    name="amount"
                    className='form-control'
                    value={editData.amount}
                    onChange={handleEditChange}
                  />
                ) : (
                  expense.amount
                )}
              </td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>
                {editIndex === index ? (
                  <>
                    <button className='btn' onClick={handleEditSubmit}><FcAcceptDatabase /></button>
                    <button className='btn' onClick={handleCancelEdit}><FcCancel /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(index)} className='btn'><FaRegEdit /></button>
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
