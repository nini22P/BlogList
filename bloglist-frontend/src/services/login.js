import axios from 'axios'
import config from '../utils/config'

const baseUrl = `${config.BACKEND_URL}/login`

const login = async (username, password) => {
  const bodyParameters = { username, password }
  // console.log(bodyParameters)
  const request = axios.post(baseUrl, bodyParameters)
  const response = await request
  return response.data
}

export default { login }
