export const filterData = [
	{
		id: 'customerName',
		name: '姓名'
	},
	{
		id: 'mobile',
		name: '手机号'
	},
	{
		id: 'sex',
		enumName: 'sexEnums',
		name: '性别',
		type: 'select'
	},
	{
		id: 'registerSourceType',
		enumName: 'registerSource',
		name: '注册源',
		type: 'select'
	},
	{
		id: 'customerStatus',
		enumName: 'customerStatus',
		name: '状态',
		type: 'select'
	},
	{
		id: 'registerTime',
		name: '注册时间',
		type: 'datepicker',
		timeNames: ['registerTimeStart', 'registerTimeEnd']
	},
	{
	    type: 'cascader',
	    linkage: [
	      {
	        id: 'provinceId',
	        name: '省',
	        type: 'select',
	        enumName: 'provinces',
	        actionName: 'GET_CITY',
	        url: '/citys',
	        isAddress: 'true', //决定域名来源
	        relativeFeilds: ['cityId', 'districtId'],
	        fetchFeilds: ['provinceId']
	      },
	      {
	        id: 'cityId',
	        name: '市',
	        type: 'select',
	        enumName: 'citylist',
	        actionName: 'GET_DISTRICT',
	        url: '/districts',
	        isAddress: 'true', //决定域名来源
	        relativeFeilds: ['districtId'],
	        fetchFeilds: ['provinceId', 'cityId']
	      },
	      {
	        id: 'districtId',
	        name: '区',
	        type: 'select',
	        enumName: 'districts'
	      }
	    ]
  	}
]