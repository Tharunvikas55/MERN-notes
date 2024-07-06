import './App.css';
import { useState } from 'react';
import Result from './components/Result';

const secretNum=Math.floor(Math.random()* 15)+1;

function App() {
  const[term,setTerm]=useState("")
  const handleChange=(e)=>{
    setTerm(e.target.value)
  }
  return (
    <div className='container'>
      <div className="head">
        <label htmlFor='term' >Guess the Number Between 1 to 15</label>
      </div>
      <input type="text" id='term' name='term' onChange={handleChange} />
      <Result secretNum={secretNum} term={term}/>
    </div>
  );
}

export default App;
