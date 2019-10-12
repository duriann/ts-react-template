export let getMemberList = (argus) => {
	return {
		type: 'GET_MEMBER_LIST',		
		payload: {
			url: '/customer/query',
			type: 'get',
			param: {
				...argus
			}
		}
	}
}

export let updateMemberListStatus = () => {
	return {
		type: 'UPDATE_GET_MEMBER_LIST_STATUS'
	}
}

//获取下拉表数据
export let getMemberSelect = () => {
	return {
		type: 'GET_MEMBER_SELECT',		
		payload: {
			url: '/customer/enums/list',
			type: 'get'
		}
	}
}

export let updateMemberSelectStatus = () => {
	return {
		type: 'UPDATE_GET_MEMBER_SELECT_STATUS'
	}
}

/*
 *获取省
 *isAddress: 决定请求域名
*/
export let getProvince = () => {
  return {
    type: 'GET_PROVINCE',
    payload: {
    	url: '/provinces',
    	type: 'get',
    	isAddress: 'true'
    }
  }
}

export let updateGetProvinceStatus = () => {
  return {
    type: 'UPDATE_GET_PROVINCE_STATUS'
  }
}

export let cascaderHandleChange = (argus, option) => {
  return {
    type: option.actionName,
    payload: {
    	url: option.url,
    	type: 'get',
    	isAddress: option.isAddress,
    	param: {
    		...argus
    	}
    }
  }
}

export let updateGetCityStatus = () => {
  return {
    type: 'UPDATE_GET_CITY_STATUS'
  }
}

export let updateGetDistrictStatus = () => {
  return {
    type: 'UPDATE_GET_DISTRICT_STATUS'
  }
}

