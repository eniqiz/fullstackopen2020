import ShowButton from './ShowButton'
import Weather from './Weather'

const Result = ({data, setResult, weather}) => {
  if (data.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (data.length > 1) {
    const names = data.map(c => c.name)
    return (
      <div>{names.map((c, i) => <div key={i}>{c}<ShowButton country={c} setResult={setResult} data={data}/><br/></div>)}</div>
    )
  } else if (data.length === 1) {
    return (
      <div>
        <h2>{data[0].name}</h2>
        <p>capital {data[0].capital}<br/>population {data[0].population}</p>
        <h3>Spoken languages</h3>
        <ul>
          {data[0].languages.map((c,i) => <li key={i}>{c.name}</li>)}
        </ul>
        <img src={data[0].flag} alt={`${data[0].name}'s flag`} height="100px"/>
        <h3>Weather in {data[0].name}</h3>
        <Weather weather={weather}/>
      </div>
    )
  } else {
    return <p></p>
  }
}

export default Result