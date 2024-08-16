import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpenseForm = ({ userId, addExpense }) => {
  // States for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3001/${userId}/add-expense`, {
        title,
        description,
        amount
      });
      if (res.data.message === 'Expense added successfully') {
        addExpense(res.data.expenses); // Update parent component's state with the updated expenses array
        setTitle('');
        setDescription('');
        setAmount('');
        
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="bg-light p-1 p-md-2 p-xl-3">
      <div className="p-2 p-md-2 p-xl-3">
        <div className="row">
          <div className="col-sm-3 col-md-4">
            <div className="mb-5">
              <h3>Add Expense</h3>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='row g-3'>
          <div className="overflow-hidden">
            <div className="row">
              <div className="col-sm-3 col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className='form-control'
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    value={title}
                    required
                  />
                  <label className="form-label">Title</label>
                </div>
                <input type="hidden" name="userId" value={userId} />
              </div>
              <div className="col-sm-3 col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className='form-control'
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    value={description}
                    required
                  />
                  <label className="form-label">Description</label>
                </div>
              </div> 
              <div className="col-sm-3 col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className='form-control'
                    name="amount"
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    value={amount}
                    required
                  />
                  <label className="form-label">Amount</label>
                </div>
              </div>
              <div className="pt-3">
                <button className="btn bsb-btn-2xl btn-primary" type="submit">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
