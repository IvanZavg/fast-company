import axios from 'axios';
import { toast } from 'react-toastify';
import configFile from '../config.json';

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
  function (config) {
    if (configFile.isFirebase) {
      const hasEndSlash = /\/$/gm.test(config.url);
      config.url = hasEndSlash
        ? config.url.slice(0, -1) + '.json'
        : config.url + '.json';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function tranformData(data) {
  // console.log('data beafore transform:', data);
  return data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
}

http.interceptors.response.use(
  (res) => {
    // console.log('response', res);
    if (configFile.isFirebase) {
      res.data = { content: tranformData(res.data) };
    }
    return res;
  },
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
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};

export default httpService;
