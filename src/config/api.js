import axios from 'axios';

export const customAxios = axios.create({
  baseURL: 'https://test2-d9c33-default-rtdb.firebaseio.com',
  timeout: 10000,
  // headers: {'X-Custom-Header': 'foobar'}
});
