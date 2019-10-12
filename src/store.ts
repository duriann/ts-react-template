import { createStore,applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducers from './rootReducers'
import fetchMiddleWare from './middleware/fetch/index'
const store = applyMiddleware(fetchMiddleWare,createLogger())(createStore)
export default () => {
  return store(rootReducers)
}