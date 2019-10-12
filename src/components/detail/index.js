/*
 *DetailComponent组件中props
 * value: PropTypes.object 详情页面显示的标题对应的值
 * data: PropTypes.arrayOf(PropTypes.object) 详情页面显示的标题数据
 *  例如： [{id: '', name: '', type: ''}]
 *  id: 根据id，去查找value中对应的标题的值
 *  name: 标题名称
*/ 
import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import * as Util from '../../../util/index';
import './index.less';

export default class DetailComponent extends Component {
	constructor(props) {
		super(props);

		this.getDetailField = this.getDetailField.bind(this);
	}

	getDetailField(data, value) {
		return data && data.length>0 && data.map((item, key) => {
			return (
				<div key={key} className="detailItem">
					<span className="detailItemTitle">{item.name}：</span>						
					<span className="detailItemVal">{value && item.id ? value[item.id] : ''}</span>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="detailComponent">				
				{this.getDetailField(this.props.data, this.props.value)}				
				<div className="detailButton">
          			<Button onClick={() => this.props.history.goBack()}>返回</Button>
        		</div>
			</div>
		);
	}
}

DetailComponent.propTypes = {
	history: PropTypes.object.isRequired,
	data: PropTypes.arrayOf(PropTypes.object),
	value: PropTypes.object
}