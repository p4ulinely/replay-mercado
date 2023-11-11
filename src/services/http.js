import axios from "axios";

const httpInstance = axios.create({
  baseURL: 'https://654d3d4577200d6ba85a2d44.mockapi.io/',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});

export default httpInstance;