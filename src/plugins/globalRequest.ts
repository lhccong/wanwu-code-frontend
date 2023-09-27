/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { history } from '@@/core/history';
import { message } from 'antd';
import { stringify } from 'querystring';
import { extend } from 'umi-request';

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // credentials: 'include', // 默认请求是否带上cookie
  // prefix:
  //   process.env.NODE_ENV === 'production'
  //     ? 'http://user-backend.code-nav.cn'
  //     : 'http://localhost:8806',
  // requestType: 'form',
  prefix: "https://qingxin.store/wanwu-code"
  // prefix: 'http://localhost:8806',
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`);
  const headers = {};
  const tokenName = localStorage.getItem('tokenName');
  const tokenValue = localStorage.getItem('tokenValue');
  if (tokenName && tokenValue) {
    headers[tokenName] = tokenValue;
  }
  return {
    url,
    options: {
      ...options,
      headers: headers,
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();
  if (res.code === 0) {
    return res;
  }else if (res.code === 40100){
    message.error('请先登录');
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      }),
    });
  }else {
    message.error(res.message);
    history.push("/")
  }
  return res
});

export default request;
