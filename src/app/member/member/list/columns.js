import React from 'react';
import { Divider } from 'antd';

export const columns = [
	{
		title: 'id',
		dataIndex: 'id'
	},
	{
		title: '姓名',
		dataIndex: 'customerName'
	},
	{
		title: '手机号',
		dataIndex: 'mobile'
	},
	{
		title: '会员详细地址',
		dataIndex: 'address',
		render(text, record) {
			let value = text;
			if(text && text.length > 20) {
				value = text.substring(0, 20) + '...';
			}
			let isShowTitle = text ? (text.length > 20 ? true : false) : false;
		    return (<span title={isShowTitle ? text : ''}>{value}</span>);
		}
	},
	{
		title: '注册时间',
		dataIndex: 'registerTime'
	},
	{
		title: '城市',
		dataIndex: 'cityName'
	},
	{
		title: '状态',
		dataIndex: 'statusName'
	},
	{
	  	title: '操作',
	  	key: 'action',
	  	render: (text, record) => {
	  		let eidt = './edit?id=' + text.id;
	  		let detail= './detail?id=' + text.id;
            return (
	  			<span>
		      		<a href={eidt}>编辑</a>
		      		<Divider type="vertical" />
		      		<a href={detail}>详情</a>
		    	</span>
	  		);
	  	}
	}
]
