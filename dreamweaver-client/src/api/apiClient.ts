import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1/dream',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;