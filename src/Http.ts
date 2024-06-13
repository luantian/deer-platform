import axios from "axios";
import LocalStorageExpires from "./cache/LocalStorageExpires";
// import qs from 'qs';
const baseURL = "";
const version = "";
const service = axios.create({
  baseURL: `${baseURL}${version}`,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  timeout: 60000, //请求超时时间
});
// http request 拦截器
service.interceptors.request.use(
  (config: any) => {
    // 发送请求之前
    const token = LocalStorageExpires.getItem("token");
    console.log("http: token", token);
    const headers: any = {}
    if (token) {
      headers.Authorization = token;
      headers['Tenant-Id'] = 0;
      headers['X-Sign'] = '41C11FF7B1DDF568F776415D3BEB1D2F';
      headers['X-Timestamp'] = '1718272081475';
    } else {
      // if (config.url.indexOf('/api/auth/login') === -1) {
      //   window.location.href = window.location.host + "/login";
      // }
    }
    if (config.data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data"
    }
    config.headers = headers;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器即异常处理
service.interceptors.response.use(
  (response) => response,
  (err: any) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log("错误请求");
          break;
        case 401:
          console.log("未授权，请重新登录");
          window.location.href = window.location.host + "/login";
          break;
        case 403:
          console.log("拒绝访问");
          break;
        case 404:
          console.log("请求错误,未找到该资源");
          break;
        case 405:
          console.log("请求方法未允许");
          break;
        case 408:
          console.log("请求超时");
          break;
        case 500:
          console.log("服务器端出错");
          break;
        case 501:
          console.log("网络未实现");
          break;
        case 502:
          console.log("网络错误");
          break;
        case 503:
          console.log("服务不可用");
          break;
        case 504:
          console.log("网络超时");
          break;
        case 505:
          console.log("http版本不支持该请求");
          break;
        default:
          console.log(`连接错误${err.response.status}`);
      }
    } else {
      return Promise.resolve({ data: "", error: err });
    }
    return Promise.resolve(err.response);
  }
);

class Http {
  static async get(arg: any) {
    return await service.request({
      url: arg.url,
      method: "get",
      params: arg.data,
      ...arg.config,
    });
  }

  static async delete(arg: any) {
    return await service.request({
      url: arg.url,
      method: "delete",
      params: arg.data,
      ...arg.config,
    });
  }

  static async post(arg: any) {
    return await service.request({
      url: arg.url,
      method: "post",
      data: arg.data,
      ...arg.config,
    });
  }

  static async put(arg: any) {
    return await service.request({
      url: arg.url,
      method: "put",
      data: arg.data,
      ...arg.config,
    });
  }

  static async patch(arg: any) {
    return await service.request({
      url: arg.url,
      method: "patch",
      data: arg.data,
      ...arg.config,
    });
  }
}

export default Http;