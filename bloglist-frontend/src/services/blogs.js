import axios from 'axios'
import config from '../utils/config'

const baseUrl = `${config.BACKEND_URL}/blogs`

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (title, author, url, token) => {
  const bodyParameters = { title, author, url }
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const request = axios.post(baseUrl, bodyParameters, config)
  const response = await request
  return response.data
}

const update = async (id, title, author, likes, url, user) => {
  const bodyParameters = { title, author, likes, url, user }
  await axios.put(baseUrl.concat('/', id), bodyParameters)
}

const remove = async (id) => {
  await axios.delete(baseUrl.concat('/', id))
}

export default { getAll, getById, create, update, remove }
