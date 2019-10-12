import React, { Component } from 'react';
import { Table, Form, Button, Pagination } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Filter from '../filter/index';
import * as Util from 'src/util/';
import './index.less';

const WrappedAdvancedFilter = Form.create()(Filter);

class CommonList extends Component {
	constructor(props) {
		super(props);

		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._onChangePage = this._onChangePage.bind(this);
		this._isDatepicker = this._isDatepicker.bind(this);
		this.curPage = Util.getUrlArg('curPage', true) || 1;
		this.pageSize = Util.getUrlArg('pageSize', true) || 10;

		this.state = {
			curPage: this.curPage,
			pageSize: this.pageSize,
			searchParams: ''
		}
	}

	_onChangePage(pagination) {
		let currentPage = pagination.current;
		let searchParams = this.state.searchParams;
		if(searchParams) {
			searchParams['curPage'] = currentPage;
		}

		this.setState({
			curPage: currentPage,
			searchParams: searchParams
		});
		this.props.getCommonList(searchParams);
	}

	_handleReset() {
		this.setState({
			curPage: 1,
			searchParams: {
				curPage: 1,
				pageSize: this.state.pageSize
			}
		});
		this.props.getCommonList({
			curPage: 1,
			pageSize: this.state.pageSize
		});
	}

	_isDatepicker(item) {
		if(Array.isArray(item) && item.length === 2) {
			return item.every((i) => moment.isMoment(i))
		}
	}

	_handleSearch(items) {
		let params = {
			curPage: 1,
			pageSize: this.state.pageSize
		}
		let filterData = this.props.filterData;
		for (let i in items) {
			if ((items[i] && items[i] !== 'undefined') || items[i] === 0) {
				//判断antd的fomrs中值是否为Moment组成的数组
				if(this._isDatepicker(items[i])) {
					for(let j=0; j<filterData.length; j++) {
						if(filterData[j].id === i) {
							let start = moment(items[i][0]).format('YYYY-MM-DD HH:mm:ss');
			            	let end = moment(items[i][1]).format('YYYY-MM-DD HH:mm:ss');
			            	let timeNames = filterData[j].timeNames;
			            	params[timeNames[0]] = start;
			            	params[timeNames[1]] = end;
						}
					}
				} else {
					params[i] = items[i];
				}
			};
		}
		this.setState({
			searchParams: params
		});
		this.props.getCommonList(params);
	}

	componentWillMount() {
		//首次进入页面时，获取列表信息
		this.props.getCommonList({
			curPage: this.state.curPage,
			pageSize: this.state.pageSize
		});

		// this.props.getCommonList(this.state.searchParams);

		//首次进入页面时，初始化搜索参数
		this.setState({
			searchParams: {
				curPage: this.state.curPage,
				pageSize: this.state.pageSize
			}
		});

		this.props.getCommonSelect && this.props.getCommonSelect();
	}

	render() {
		const { pagination, tableLoading, tableDataSource, isHideFilter, isHideNewBtn, isShowXScroll } = this.props;
		
		return (
			<div>
				{!isHideFilter && <WrappedAdvancedFilter
						filterData={this.props.filterData} 
						handleSearch={this._handleSearch} 
						handleReset={this._handleReset}
						handleChange={this.props.handleChange}
					/>
				}
				<div className="listBtns">
					{!isHideNewBtn && <Link to="./new"><Button type="primary">新增</Button></Link>}
				</div>
				<Table
					columns={this.props.columns}
					dataSource={tableDataSource}
					rowKey={(item) => item.id}
					loading={tableLoading}
					onChange={this._onChangePage}
					pagination={{
						position: 'bottom',
						showQuickJumper: true,
						defaultCurrent: 1,
						current: pagination ? pagination.curPage : '',
						total: pagination ? pagination.totalNum : '',
						showTotal: total => `共 ${total} 条`
					}}
					scroll={this.props.scroll}
				/>
			</div>
		);
	}
}

CommonList.propTypes = {

}

export default CommonList;