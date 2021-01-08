import React from 'react'

const Button = ({name, id, buttonClick}) => {
  return (
    <button onClick={() => buttonClick(id, name)}>delete</button>
  )
}

export default Button