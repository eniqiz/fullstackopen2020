import React from 'react'
import Header from './Header'
import Total from './Total'
import Content from './Content'

const Course = ({course}) => {
    return (
      <>
        <h1>Web development curriculum</h1>
        {course.map( c =>
          <div key={c.id}>
            <Header course={c} />
            <Content course={c}/>
            <Total course={c}/>
          </div>
        )}
      </>
    )
}

export default Course