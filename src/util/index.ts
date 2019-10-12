import moment from 'moment';
import Toast from '../components/prompt/toast';
import Dialog from '../components/dialog';
import url  from '../../config/index';
import { object, any } from 'prop-types';

const createUrl = (request: any) => {
  let url = request.url;
  let param = request.param;

  if (param) {
    url = !url.includes('?') && url + '?';
    for (let key of Object.keys(param)) {
      url = url + key + '=' + encodeURI(param[key]) + '&';
    }
    if (url.endsWith('&')) {
      url = url.substring(0, url.length - 1);
    }
  }
  return url;
};

const getUrlArg = (name: string, isSearchFromCookies: boolean) => {
  let search = window.location.search;
  //IE9(通过window.history.replaceState来判断IE9和其他浏览器，不考虑IE8及以下浏览器)时，search的值从cookie中获取
  if(isSearchFromCookies && !window.history.replaceState) {
    search = unescape(getCookie('CURRENT_SEARCH'));
  }
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let arg = search.substr(1).match(reg);
  return arg ? arg[2] : '';
};

//判断字符串/数组/对象/不为空时返回true
const isNotNull = (obj: object) => {
  if (obj instanceof Object) {
    for (var a in obj) {
      return true;
    }
    return false;
  }
  return typeof(obj) != 'undefined' && obj !== null && (Array.isArray(obj) ? (<[]>obj).length !== 0 : obj !== "");
};

//时间转换函数
const fmtDate=(obj: number) =>{
  var date = new Date(obj);
  var y = 1900 + date.getFullYear();
  var m = "0" + (date.getMonth() + 1);
  var d = "0" + date.getDate();
  return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
};

//向data里面添加初始化（initalValue）值
const setInitialValue = (items: [], values: []) => {
  items && items.forEach((item: any) => {
    if (item.type === 'cascader') {
      setInitialValue(item.linkage, values);
    }
    let value: any = values && values[item.id];
    if (value === 0 || value) {
      if (item.type === 'datepicker') {
        value = moment(fmtDate(value), 'YYYY-MM-DD');
      } else if (item.type === 'switch') {
        value === 0 ? value = false : value = true;
      }
      item.initialValue = value;
    } else {
      item.initialValue = '';
    }
  });
};

const getAuthUrl = () => {
  const ENV:any = process.env.CURRENT_ENV;
  let authUrl = (<any>url)[ENV]['authUrl'];
  let apiUrl = (<any>url)[ENV]['apiUrl'];
  return authUrl + '?originUrl=' + apiUrl;
}

//获取登录地址
const getLoginUrl = () => {
  let currentUrl = window.location.href
  const ENV:any = process.env.CURRENT_ENV
  let loginUrl = (<any>url)[ENV]['loginAddress']
  return loginUrl + '?originUrl=' + currentUrl
}

/*
 *argus: object，里面包含参数
 *status
 *code
 *message
 *params: 当前列表搜索的参数值，fetch成功之后，无刷新更改浏览器URL
 *isShowDialog: 控制当code不等于-1、0的时候，是否显示Dialog，还是Toast
 *isShowPermissionPage: 当调用接口时，如果后台返回-2(即该用户没有权限)，如果没有设置isShowPermissionPage，
 **默认会以一种弹框形式显示，一段时间后消失，当设置为true时，会跳转到该用户没有权限页面
*/
const fetchCallback = (argus: any) => {
  const { status, code, message, params, updateStatus, successCallback, isShowToastSuccess, successText, isShowDialog,isShowPermissionPage } = argus;
  if(status) {
    updateStatus();

    if(code && code !== 0) {
      if(code >= 500) {
        Toast.show('服务器异常');
      }else if(code >= 400) {
        if(code == 404) {
          Toast.show('服务器找不到请求地址');
        }else if(code == 414) {
          Toast.show('请求的 URI（通常为网址）过长，服务器无法处理');
        }else {
          Toast.show('错误请求');
        }
      }else if(code >= 300) {
        Toast.show('网络异常');
      }else if(code == -1) {
        window.location.href = getLoginUrl();
      }else if(code == -2 && isShowPermissionPage) {
        window.location.href = '/permission';
      }else {
        !isShowDialog ? Toast.show(message) : Dialog.open({
          message: message,
          dialogButton: [
            {
              text: '确定',
              type: 'primary',
              clickHandle: () => {
                Dialog.close();
              }
            }
          ]
        });
      }
    }else if(code === 0) {
      if(isShowToastSuccess){
        Toast.show(successText || message)
      }

      if(params) {
        //获取列表数据成功之后，无刷新更新URL
        let url = createUrl({
          url: window.location.origin + window.location.pathname,
          param: params        
        });
        //IE9中history对象不支持replaceState，IE9中不支持HTML5模式
        if(window.history.replaceState) {
          window.history.replaceState({}, '0', url);
        }else {
          //当IE9中使用cookie保存当前URL
          let search = createUrl({
            url: '',
            param: params        
          });
          setCookie('CURRENT_SEARCH', search);
        }  
        
      }

      successCallback && successCallback();
    }
  }
};

const getCookie = (cookieName: string) => {
  let cookieStr = decodeURI(document.cookie);  
  let arr = cookieStr.split("; ");
  let cookieValue = ''; 
  for(let i=0;i<arr.length;i++){  
    let temp = arr[i].split("=");  
    if(temp[0]==cookieName){  
      cookieValue = temp[1];  
      break;  
    }  
  }  
  return decodeURI(cookieValue);
};

const setCookie = (name: string, value: string) => {
  let days = 30;
  let exp = new Date();
  exp.setTime(exp.getTime() + days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toUTCString()
}

export {
  createUrl,
  getUrlArg,
  isNotNull,
  fmtDate,
  setInitialValue,
  fetchCallback,
  getCookie,
  getAuthUrl,
  getLoginUrl
}