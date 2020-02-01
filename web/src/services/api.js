import axios from 'axios'

let baseURL
if(window.location.hostname === "omnistack-10-gsb.netlify.com"){
 baseURL = "https://omnistack-10-gsb.herokuapp.com"
}
else{
 baseURL = 'http://localhost:3333/'
}


const api = axios.create({
 baseURL
})

export default api
