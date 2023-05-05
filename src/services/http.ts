import axios from 'axios';
import { message } from 'antd';
import { Storage } from '@/shared';

// 基础设置
axios.defaults.timeout = 10 * 1000;
axios.defaults.baseURL =
  import.meta.env.MODE === 'development'
    ? '/api'
    : import.meta.env.VITE_APP_API;

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
  config => {
    const token = Storage.local.get('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const {
      response: {
        data: { code, ...res }
      }
    } = error;
    if (code === '10101') {
      message.error(res.message);
      window.location.href = '/login';
    } else {
      message.error(res.message);
    }
    return Promise.reject(error);
  }
);

/**
 * @description 封装get方法
 * @param url 请求url
 * @param params 请求参数
 * @return Promise
 */
export function get(url: string, params?: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * @description 封装post方法
 * @param url 请求url
 * @param params 请求参数
 * @return Promise
 */
export function post(url: string, data: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        const result = response.data;
        const { code, message: msg } = result;
        if (code === 0 && msg) {
          message.success(msg);
        } else if (msg) {
          message.warning(msg);
        }
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * @description 封装post方法
 * @param url 请求url
 * @param params 请求参数
 * @return Promise
 */
export function upload(url: string, data: any) {
  return new Promise((resolve, reject) => {
    const { file } = data;
    const formData = new FormData();
    formData.append('file', file);
    axios
      .post(url, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      .then(response => {
        const result = response.data;
        const { code, message: msg } = result;
        if (code === 0 && msg) {
          message.success(msg);
        } else {
          message.warning(msg);
        }
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// 更多方法带项目完善

export default {
  get,
  post,
  upload
};
