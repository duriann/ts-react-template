import * as __URL__ from '../../../config/index';
import * as Util from '../../util/index';

export default (args) => {
  //判断当前环境
  const ENV = process.env.CURRENT_ENV;
  let params = args.type.toUpperCase() === 'GET' ? null : args.param;
  let url = args.type.toUpperCase() === 'GET' ? Util.createUrl(args) : args.url;
  let requestUrl = __URL__[ENV]['apiUrl'] + __URL__[ENV]['apiUrlFilter'] + url;
  if(args.isAddress) {
    requestUrl = __URL__[ENV]['addressUrl'] + url;
  }
  if(args.isAuth) {
    requestUrl = __URL__[ENV]['authUrl'] + __URL__[ENV]['authUrlFilter'] + url;
  }

  let headers = {
    'Accept': 'application/json'
  }
  if(!args.isAddress && !args.isAuth) {
    headers['Cache-Control'] = 'no-cache';
    headers['Content-Type'] = args.contentType || 'application/json';
  }
  if(params&&params.data){
     params =  JSON.stringify(params.data);
  }
  if(params && args.isArrayParam){
    params = JSON.stringify(params)
  }
  else if(params){
    params = JSON.stringify({...params})
  }

  //添加window.location.protocol
  if(requestUrl.indexOf('http') === -1) {
    requestUrl = window.location.protocol + '//' + requestUrl;
  }else if(requestUrl.indexOf('http') > -1) {
    requestUrl = requestUrl.replace(/^http(s?):/, window.location.protocol);
  }
  
  return fetch(requestUrl, {
    credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
    method: args.type.toUpperCase(),
    follow: 1,
    timeout: 10000,
    headers: headers,
    body: params ? params: null
  }).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
    const error = new Error(res.statusText);
    error.res = res;
    throw error;
  })
  .then((response) => {
    return response.json();
  });
}
