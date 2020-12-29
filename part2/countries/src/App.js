import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Result from './components/Result'

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [inputText, setInputText] = useState('')
  const [countries, setCountries] = useState([])
  const [result, setResult] = useState([])
  const [weather, setWeather] = useState([])

  const handleTextChange = (event) => {
    setInputText(event.target.value)
    setResult(countries.filter(c => c.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1))
  }

  const getWeather = (capital) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
    .then(response => {
      setWeather(response.data)
    })
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    if (result.length === 1) {
      getWeather(result[0].capital)
    }
  }, [result])

  return (
    <>
      find countries <input value={inputText} onChange={handleTextChange}/>
      <Result data={result} setResult={setResult} weather={weather}/>
    </>
  )
}

export default App