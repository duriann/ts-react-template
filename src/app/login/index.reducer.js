let initState = {
	
}

export default function(state=initState, action) {
	switch(action.type) {
		case 'LOGIN_USER':
			//登录成功之后，存储用户名
			let username = action.payload.data.fullName;
			window.localStorage.setItem('username', username);

			return {
				...state,
				loginStatus: true,
				code: action.payload.code,
				message: action.payload.message
			}
			break;
		case 'LOGIN_USER_FAIL':
			return {
				...state,
				loginStatus: true,
				code: action.payload.code,
				message: action.payload.message
			}	
			break;
		case 'UPDATE_LOGIN_STATUS':
			return {
				...state,
				loginStatus: false
			}
		default:
			return state;
	}
}