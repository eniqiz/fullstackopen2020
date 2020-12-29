const ShowButton = ({country, setResult, data}) => {
  return <button onClick={() => setResult(data.filter(c => c.name === country))}>show</button>
}

export default ShowButton