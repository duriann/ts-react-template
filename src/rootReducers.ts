import { combineReducers } from 'redux'
import Fetch from './middleware/fetch/index.reducer'
import Home from 'src/app/home/index.reducer'
import MemberList from 'src/app/member/member/list/index.reducer'

export default combineReducers({
  Fetch,
  Home,
  MemberList
})