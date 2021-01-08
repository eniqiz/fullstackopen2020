import React from 'react'
import Button from './Button'

const Persons = ({personsToShow, buttonClick}) => {
  return (
    <ul>
      {personsToShow.map(p => <li key={p.name}>{p.name} {p.number} <Button name={p.name} id={p.id} buttonClick={buttonClick}/></li>)}
    </ul>
  )
}

export default Persons