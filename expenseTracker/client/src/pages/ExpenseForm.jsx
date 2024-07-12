// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const ExpenseForm = ({userId}) => {
//   const navigate = useNavigate();
  
//   // Assuming these states are defined and updated elsewhere in your component
//   const [userid, setUserId] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
  
 
//     const handleSubmit =  (e) => {
//       e.preventDefault();
//       try {
//          axios.post('http://localhost:3001/add-expense', {
//           userid,
//           title,
//           description,
//           amount,
//           date
//         });
  
//         // After successful submission, navigate to dashboard page
//         navigate('/dashboard');
//       } catch (error) {
//         console.error('Error adding expense:', error);
//       }
//     };

//   return (
//     <div>
//       <div className=" bg-light p-1 p-md-2 p-xl-3">
//       {/* <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5"> */}
//           <div className=" p-2 p-md-2 p-xl-3">
//           <div className="row">
//               <div className="col">
//                 <div className="mb-5">
//                   <h3>Add Expense</h3>
//                 </div>
//               </div>
//             </div>
//             <form onSubmit={handleSubmit} className='row g-3'>
//               <div className="overflow-hidden">
//                 <div className="row">  
//                 <div className="col-sm-5">
//                   <div className="form-floating mb-3">
//                     <input type="text" className='form-control ' name="title" onChange={(e)=>setTitle(e.target.value)}  placeholder="title"   />
//                     <label  className="form-label">Title</label>
//                  </div>
//                  <input type="hidden" name="userid" value={(e)=>setUserId(userId)} />
//                 </div>
//                   <div className="col-sm-3 col-md-4">
//                     <div className="form-floating mb-3">
//                     <input type="text"   className='form-control'  name="description" onChange={(e)=>setDescription(e.target.value)} placeholder="Description"   />
//                     <label  className="form-label">Description</label>
//                   </div>
//                   </div>
//                   <div className="col-sm-4">
//                     <div className="form-floating mb-3">
//                     <input type="text"   className='form-control'  name="amount" onChange={(e)=>setAmount(e.target.value)} placeholder="Amount"   />
//                     <label  className="form-label">Amount</label>
//                   </div></div>
//                   <div className="col-sm-3 col-md-4"><div className="form-floating mb-3">
//                     <input type="date"   className='form-control '  name="date" onChange={(e)=>setDate(e.target.value)}  placeholder=""   />
//                     <label  className="form-label"></label>
//                   </div>
//                   </div>
//                   <div className=" pt-3">
//                     <button className="btn bsb-btn-2xl btn-primary"  type="submit">Save</button>
//                   </div></div>
                  
                
//                 </div>
//             </form>
//         </div>
//         {/* </div> */}
//       </div>  
// </div>
    
//   )
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpenseForm = ({ userId }) => {
  const navigate = useNavigate();

  // States for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/${userId}/add-expense`, {
        title,
        description,
        amount,
        date
      });

      // After successful submission, reset form fields
      setTitle('');
      setDescription('');
      setAmount('');
      setDate('');

      // Navigate to dashboard page
      navigate('/dashboard');
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
              <div className="col-sm-3 col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className='form-control'
                    name="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required
                  />
                  <label className="form-label">Date</label>
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
