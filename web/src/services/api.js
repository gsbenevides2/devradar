import axios from 'axios'

let baseURL = process.env.REACT_APP_BACKEND_URL


const api = axios.create({
    baseURL
})

export default api
