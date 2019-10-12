export default function(state={}, action) {
	switch(action.type) {
		case 'GET_MEMBER_LIST':
			console.log(action)
			return {
				...state,
				memberListStatus: true,
				memberListCode: action.payload.code,
				memberListData: action.payload.data,
				memberListPage: action.payload.page
			}
			break;
		case 'GET_MEMBER_LIST_FAIL':
			return {
				...state,
				memberListStatus: true,
				memberListCode: action.payload.code,
				memberListMessage: action.payload.message
			}	
			break;
		case 'UPDATE_GET_MEMBER_LIST_STATUS':
			return {
				...state,
				memberListStatus: false
			}
			break;
		case 'GET_MEMBER_SELECT':
			return {
				...state,
				memberSelectStatus: true,
				memberSelectCode: action.payload.code,
				memberSelectData: action.payload.data
			}
			break;
		case 'GET_MEMBER_SELECT_FAIL':
			return {
				...state,
				memberSelectStatus: true,
				memberSelectCode: action.payload.code,
				memberSelectMessage: action.payload.message
			}	
			break;
		case 'UPDATE_GET_MEMBER_SELECT_STATUS':
			return {
				...state,
				memberSelectStatus: false
			}
			break;
		case 'GET_PROVINCE':
			return {
				...state,
				getProvinceStatus: true,
				getProvinceCode: action.payload.code,
				getProvinceMessage: action.payload.message,
				getProvinceData: action.payload.data
			}
			break;
		case 'GET_PROVINCE_FAIL':
			return {
				...state,
				getProvinceStatus: true,
				getProvinceCode: action.payload.code,
				getProvinceMessage: action.payload.message
			}
			break;
		case 'UPDATE_GET_PROVINCE_STATUS':
			return {
				...state,
				getProvinceStatus: false
			}
			break;
		case 'GET_CITY':
			return {
				...state,
				getCityStatus: true,
				getCityCode: action.payload.code,
				getCityMessage: action.payload.message,
				getCityData: action.payload.data
			}
			break;
		case 'GET_CITY_FAIL':
			return {
				...state,
				getCityStatus: true,
				getCityCode: action.payload.code,
				getCityMessage: action.payload.message
			}
			break;
		case 'UPDATE_GET_CITY_STATUS':
			return {
				...state,
				getCityStatus: false
			}
			break;
		case 'GET_DISTRICT':
			return {
				...state,
				getDistrictStatus: true,
				getDistrictCode: action.payload.code,
				getDistrictMessage: action.payload.message,
				getDistrictData: action.payload.data
			}
			break;
		case 'GET_DISTRICT_FAIL':
			return {
				...state,
				getDistrictStatus: true,
				getDistrictCode: action.payload.code,
				getDistrictMessage: action.payload.message
			}
			break;
		case 'UPDATE_GET_DISTRICT_STATUS':
			return {
				...state,
				getDistrictStatus: false
			}
			break;
		default:
			return state;
	}
}