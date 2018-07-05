import axios from 'axios';

export const fetch = (url, params, method) => {

  return new Promise((resolve, reject) => {
    let ajx;
    if (method === 'get') {
      ajx = axios.get(url, params);
    } else if (method === 'delete') {
      ajx = axios.delete(url, params);
    } else if (method === 'put') {
      ajx = axios.put(url, params);
    } else {
      ajx = axios.post(url, params);
    }

    ajx.then(res => {
      console.log(res);

      if (String(res.data.errorInfo.code) === '401') {
        alert('没有权限访问');
      } else if (String(res.data.errorInfo.code) === '200') {
        resolve(res.data);
      } else {
        resolve(res.data);
      }
    }).catch((err) => {

      // 出现400+，500+错误
      errorHandle(err);
    });
  });
};

// 错误码处理

function errorHandle(err) {
  const _Message = msg => console.log(msg);
  switch (err.response.status) {
    case 400:
      _Message('请求错误');
      break;

    case 401:
      _Message('未授权，请登录');
      break;

    case 403:
      // 跳转到权限提示页面
      _Message('拒绝访问');
      break;

    case 404:
      _Message(`请求地址出错: ${err.config.url}`);
      break;

    case 408:
      _Message('请求超时');
      break;

    case 500:
      _Message('服务器内部错误');
      break;

    case 501:
      _Message('服务未实现');
      break;

    case 502:
      _Message('网关错误');
      break;

    case 503:
      _Message('服务不可用');
      break;

    case 504:
      _Message('网关超时');
      break;

    case 505:
      _Message('HTTP版本不受支持');
      break;

    default:
      _Message('未知错误');
  }
};
