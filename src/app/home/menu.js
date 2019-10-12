export const menus = [
	{
		name: '会员',
		url: 'member',
		icon: 'appstore',
		children: [
			{
				name: '会员',
				icon: 'appstore',
				url: '/member/member/list'
			}
		]
	},
	{
		name: '积分',
		url: 'credit',
		icon: 'appstore',
		children: [
			{
				name: '积分记录查询',
				icon: 'appstore',
				url: '/credit/logger'
			}
		]
	},
	{
		name: 'ecard卡',
		url: 'ecard',
		icon: 'appstore',
		children: [
			{
				name: 'ecard卡类型配置',
				icon: 'appstore',
				url: '/ecard/configuration/list'
			},
			{
				name: '活动折扣',
				icon: 'appstore',
				url: '/ecard/discounts/list'
			}
		]
	}
]