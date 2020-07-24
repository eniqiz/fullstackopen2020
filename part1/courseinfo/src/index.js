import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = 'Half Stack application development'
  const part = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]

  return (
    <div>
      <Header course={course} />
      <Content part={part} exercises={exercises}/>
      <Total total={exercises[0] + exercises[1] + exercises[2]}/>
    </div>
  )
}

const Header = (props) => (
    <h1>{props.course}</h1>
)

const Content = (props) => {
  return (
    <>
      <Part part={props.part[0]} exercises={props.exercises[0]}/>
      <Part part={props.part[1]} exercises={props.exercises[1]}/>
      <Part part={props.part[2]} exercises={props.exercises[2]}/>
    </>
  )
}

const Total = (props) => (
  <p>Number of exercises {props.total}</p>
)

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
