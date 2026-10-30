import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6ae3e4e1933120ae20f943e3.mockapi.io/filmesv1/filmes',
});

export default api;