import React, { useState } from 'react';
import axios from 'axios';

const IncomeForm = ({ userId, setIncomes }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const incomeData = { title, description, amount: parseFloat(amount), userId };

    try {
      const res = await axios.post(`http://localhost:3001/${userId}/add-income`, incomeData);
      if (res.data.message === 'Income added successfully') {
        setIncomes((prevIncomes) => [...prevIncomes, res.data.income]);
        setTitle('');
        setDescription('');
        setAmount('');
      } else {
        console.error('Failed to add income');
      }
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <div className="bg-light p-1 p-md-2 p-xl-3">
      <div className="p-2 p-md-2 p-xl-3">
        <div className="row">
          <div className="col-sm-3 col-md-4">
            <div className="mb-5">
              <h3>Add Income</h3>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="overflow-hidden">
            <div className="row">
              <div className="col-sm-3 col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                <button className="btn btn-primary" type="submit">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeForm;
