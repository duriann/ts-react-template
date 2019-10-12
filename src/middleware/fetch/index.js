/*
 *action参数
 **type---redux，将要执行的动作
 **payload---普通对象，存在ajax请求的参数
 **payload参数
 ***url-----------ajax请求的地址
 ***type----------ajax请求类型
 ***contentType---ajax请求的"content-type"
 ***param---------ajax请求参数
*/
import Fetch from './fetch';
import * as types from './index.types';

export default ({dispatch, getState}) => (next) => async (action) => {
  //通过payload里面的URL是否存在，存在就执行fetch，否则执行下一个中间件
  if (action.payload && action.payload.url) {
    let {type, payload} = action;

    dispatch({
      type: types.SHOWLODING ,
      spinning: true
    });
    
    try {
      let result = await Fetch(payload);

      //关闭加载器
      dispatch({
        type: types.SHOWLODING,
        spinning: false
      });
      
      console.log('fetch res',result)
      // 成功之后
      if (result && result.code === 0) {
        dispatch({
          type: type,
          payload: {
            data: result.result&&result.result.data,
            message: result.msg,
            code: result.code,
            page: result.result&&result.result.page
          }
        })
      } 
      else { //失败
        dispatch({
          type: `${type}_FAIL`,
          payload: {
            message: result.msg,
            code: result.code
          }
        });
      }
    } catch (err) {
      console.log(`fetch catch:${err}`);

      //关闭加载器
      dispatch({
        type: types.SHOWLODING,
        spinning: false
      });

      //网络异常、404等
      dispatch({
        type:  `${type}_FAIL`,
        payload: {
          code: err && err.res && err.res.status
        }
      });
      //假数据
      // dispatch({
      //     type: type,
      //     payload: {
      //       data: {'fullName': '123'},
      //       message: '',
      //       code: 0
      //     }
      //   })
    }
  } else {
    return next(action)
  }
}
