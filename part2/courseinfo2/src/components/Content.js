import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(c => <Part part={c} key={c.id}/>)}
    </div>
  )
}

export default Content