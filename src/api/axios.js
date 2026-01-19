import axios from 'axios'

const BACKEND_URL = process.env.API_URL;

export default axios.create({
  baseURL: BACKEND_URL,
});