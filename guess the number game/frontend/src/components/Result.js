import React from 'react'

const Result = ({secretNum,term}) => {

  let res;
  if(term){
    if(term<secretNum)
      res="Lower";
    else if(term>secretNum)
      res="Higher";
    else if(term ==secretNum)
      res="Amazing! Correct"
    else
    res="Enter a valid input";
  }
  return (
    <div>
      <h3>You Guessed :{res}</h3>
    </div>
  )
}

export default Result
