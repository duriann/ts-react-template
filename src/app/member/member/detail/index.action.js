// 获取会员详情接口
export let getMemberDetail = (argus) => {
    return {
        type: 'GET_MEMBER_DETAIL',
        payload: {
            url: '/customer/detail',
            type: 'get',
            param: {
                ...argus
            }
        }
    }
}

export let updateMemberDetailStatus = () => {
    return {
        type: 'UPDATE_MEMBER_DETAIL_STATUS'
    }
}
