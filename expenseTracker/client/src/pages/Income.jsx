import React, { useState } from 'react';
import { FcAcceptDatabase, FcCancel } from 'react-icons/fc';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const Income = ({ incomes, totalIncome, updateIncome, deleteIncome }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editData, setEditData] = useState({ title: '', description: '', amount: '' });

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData({ ...incomes[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/${incomes[editIndex].userId}/update-income/${incomes[editIndex]._id}`, editData);
      if (res.data.message === 'Income updated successfully') {
        updateIncome(editIndex, editData);
        setEditIndex(-1);
      } else {
        console.error('Failed to update income');
      }
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
  };

  const handleDelete = async (index) => {
    try {
      const res = await axios.delete(`http://localhost:3001/${incomes[index].userId}/delete-income/${incomes[index]._id}`);
      if (res.data.message === 'Income deleted successfully') {
        deleteIncome(index);
      } else {
        console.error('Failed to delete income');
      }
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  return (
    <div className="bg-light">
      <center className="h2">Income Table</center>
      <center className="h5">Total Income: {totalIncome}</center>
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
          {incomes.map((income, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={editData.title}
                    onChange={handleEditChange}
                  />
                ) : (
                  income.title
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={editData.description}
                    onChange={handleEditChange}
                  />
                ) : (
                  income.description
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={editData.amount}
                    onChange={handleEditChange}
                  />
                ) : (
                  income.amount
                )}
              </td>
              <td>{new Date(income.date).toLocaleDateString()}</td>
              <td>
                {editIndex === index ? (
                  <>
                    <FcAcceptDatabase onClick={handleEditSubmit} />
                    <FcCancel onClick={handleCancelEdit} />
                  </>
                ) : (
                  <>
                    <FaRegEdit onClick={() => handleEditClick(index)} />
                    <MdDelete onClick={() => handleDelete(index)} />
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

export default Income;
