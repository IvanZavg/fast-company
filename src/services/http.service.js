import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config.json';

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    const isExpectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!isExpectedError) {
      console.log(`Unexpected Error: ${error}`);
      toast.error('Somthing wrong... Try later!');
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;
