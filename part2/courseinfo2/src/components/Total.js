import React from 'react'

const Total = ({ course }) => {
  const sum = course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  return(
    <p><b>total of {sum} exercises</b></p>
  ) 
}

export default Total