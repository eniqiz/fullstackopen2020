import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Title = (props) => <h1>{props.text}</h1>

  const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

  const Statistic = (props) => <><td>{props.text}</td><td>{props.value}</td></>

  const Statistics = (props) => {
    let all = good + neutral + bad
    let average = (good * 1 + neutral * 0 + bad * -1) / all
    let positive = (good / all) * 100 + "%"

    if (all === 0) {
      return <div>No feedback given</div>
    }

    return (
      <div>
        <table>
          <tbody>
            <tr>
                <Statistic text="good" value={good}/>
            </tr>
            <tr>
                <Statistic text="neutral" value={neutral}/>
            </tr>
            <tr>
                <Statistic text="bad" value={bad}/>
            </tr>
            <tr>
                <Statistic text="all" value={all}/>
            </tr>
            <tr>
                <Statistic text="average" value={average}/>
            </tr>
            <tr>
                <Statistic text="positive" value={positive}/>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Title text="give feedback"/>
      <Button text="good" handleClick={handleGoodClick}/>
      <Button text="neutral" handleClick={handleNeutralClick}/>
      <Button text="bad" handleClick={handleBadClick}/>

      <Title text="statistics"/>
      <Statistics/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root')
)