import axios from 'axios'
const Backend_Url = import.meta.env.VITE_BACKEND_URL
console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

const API = axios.create({ baseURL : `${Backend_Url}/api/tasks`})

export const fetchTasks = () => API.get('/')
export const createTask = (data) => API.post('/',data)
export const updateTask = (id, data) => API.put(`${id}`, data)
export const deleteTask = (id) => API.delete(`${id}`)

export default API;

