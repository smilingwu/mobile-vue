import Vue from 'vue';
import axios from 'axios';
import { VueAxios } from '@U/axios';
import qs from 'qs';
import config from '@/config';
// console.log('config', config);
const baseURL = config.apiUrl;

// 创建 axios 实例
const service = axios.create({
    baseURL, // api base_url
    timeout: 6000, // 请求超时时间
    withCredentials: true,
});
console.log(baseURL);
['get', 'delete'].forEach(method => {
    service[method] = (...options) => {
        const [url, params, config] = options;
        return service({
            method,
            url,
            params,
            ...config,
        });
    };
});

const err = error => {
    console.log(error);
    return Promise.reject(error);
};

const businessErr = data => {
    const { code, msg } = data;
    if (code === 298) {
        return Promise.reject(data);
    }
    return Promise.reject(data);
};

// request interceptor
service.interceptors.request.use(config => {
    if (config.method === 'post') {
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...config.headers,
        };
        config.data = qs.stringify(config.data);
    }
    return config;
}, err);

// response interceptor
service.interceptors.response.use(response => {
    const { data, config } = response;
    // console.log(response);
    // return data;
    if (response.status === 200) return data;
    return businessErr(data);
}, err);

const installer = {
    vm: {},
    install(Vue, router = {}) {
        Vue.use(VueAxios, router, service);
    },
};

const CancelToken = axios.CancelToken;

export { installer as VueAxios, service as axios, CancelToken };
