export let loginUser = (username, password) => {
	return {
		type: 'LOGIN_USER',		
		payload: {
			url: '/product/itemSku/queryInitInfo',
			type: 'post',
			param: {
				userName: username,
				password: password
			}
		}
	}
}

export let updateLoginStatus = () => {
	return {
		type: 'UPDATE_LOGIN_STATUS'
	}
}