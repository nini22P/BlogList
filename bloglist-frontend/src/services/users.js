import axios from 'axios'
import config from '../utils/config'

const baseUrl = `${config.BACKEND_URL}/users`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const register = async (username, name, password) => {
  const bodyParameters = { username, name, password }
  const response = await axios.post(baseUrl, bodyParameters)
  return response.data
}

export default { getAll, register }