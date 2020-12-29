const Weather = ({weather}) => {
  if (weather.length !== 0) {
    return <p><b>{weather.weather[0].main}</b><br/><b>temperature: </b>{weather.main.temp}<br/><b>wind speed: </b>{weather.wind.speed}</p>
  } else {
    return <></>
  }
}

export default Weather