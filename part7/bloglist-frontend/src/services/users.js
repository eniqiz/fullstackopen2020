import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3001/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }