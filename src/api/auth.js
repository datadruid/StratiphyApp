import axios from 'axios';

export default axios.create({
  baseURL:  'https://datadruid.herokuapp.com' //'http://localhost:3000' // 
});