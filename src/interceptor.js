import axios from "axios";
export default function() {
  // 每次请求带上token
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem("Token");
    if (token) config.headers.Token = token;
    return config;
  });
  // 连续两次AJAX请求，取消上一次请求
  axios.interceptors.request.use(config => {
    if (typeof window.cancel === "function") window.cancel("强制取消请求");
    config.cancelToken = new axios.CancelToken(c => (window.cancel = c));
    return config;
  });
  axios.interceptors.response.use(
    response => {
      window.cancel = null;
      return response;
    },
    error => {
      if (axios.isCancel(error)) return new Promise(() => {});
      window.cancel = null;
      return Promise.reject(error);
    }
  );
}
