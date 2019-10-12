import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Switch, Layout, Icon} from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Contents from './content';
import {menus} from './menu';
import WrappedUpdatePassword from '../password';
import * as actions from './index.action';
import * as Util from '../../util';
import logoImage from './images/logo.png';
import Router from './router'
import RouterConfig from './routerConfig'
import './index.less';

const {Sider, Header,Content} = Layout;
const {SubMenu} = Menu;

class Home extends Component {
	constructor(props) {
		super(props);

		this._trigger = this._trigger.bind(this);
		this._getMenus = this._getMenus.bind(this);
		this._getOpenKes = this._getOpenKes.bind(this);
		this._onOpenChange = this._onOpenChange.bind(this);
		this._onSelect = this._onSelect.bind(this);
		this._getRootSubmenKeys = this._getRootSubmenKeys.bind(this);
		this._logout = this._logout.bind(this);
		this._resetPassword = this._resetPassword.bind(this);
		this._updatePassword = this._updatePassword.bind(this);

		this.state = {
			collapsed: false, //当前侧边栏收起状态
			openKeys: this._getOpenKes() || ['welcome'], //当前展开的SubMenu菜单项key数组
			rootSubmenuKeys: this._getRootSubmenKeys(menus) || [],
			isShowUserOption: false,
			isShowResetPasswrod: false
		}
	}

	_trigger() {
		this.setState({
			collapsed: !this.state.collapsed
		})
	}

	_getRootSubmenKeys(menus) {
		let rootSubmen = [];
		for(let i=0; i<menus.length; i++) {
			if(menus[i]['url']){
				rootSubmen.push(menus[i]['url'])
			}
		}
		return rootSubmen;
	}

	// 递归生成菜单
	_getMenus(menus) {
	    return menus.map((item) => {
	      	if (item.children) {
		        return (
		          	<SubMenu
			            key={item.url}
			            title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
			        >
		           		{this._getMenus(item.children)}
		          	</SubMenu>
		        )
	      	}
	      	return (
		        <Menu.Item key={item.url}>
		          	<Link to={item.url}>
		            	<Icon type={item.icon} /><span>{item.name}</span>
		          	</Link>
		        </Menu.Item>
	      	)
	    })
	}

	_getOpenKes() {
		let pathname = window.location.pathname;
		if(pathname.substring(1, pathname.length)) {
			let pathArr = pathname.split('/');
			pathArr.shift();
			pathArr.pop();
			return pathArr;
		}
	}

	_onSelect({ key }) {
		//通过key来判断当前菜单是否被subMenu包裹
		let arr = key.split('/');
		if(arr.length === 2) {
			this.setState({
				openKeys: []
			})
		}
	}

	_onOpenChange(openKeys) {
		const that = this;
	    const latestOpenKey = openKeys.find(function(key) {
	    	return that.state.openKeys && that.state.openKeys.indexOf(key) === -1
	    });
	    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
	      	that.setState({ openKeys });
	    } else {
		    that.setState({
		        openKeys: latestOpenKey ? [latestOpenKey] : [],
		    });
	    }
	}

	_logout() {
		this.setState({isShowUserOption:false});
		this.props.userLogout();
	}

	_resetPassword() {
		this.setState({
			isShowResetPasswrod: true,
			isShowUserOption: false
		});
	}

	_updatePassword(values) {
		this.props.updatePassword(values);
	}

	componentWillUpdate(nextProps, nextState) {
		// Util.fetchCallback({
		// 	status: nextProps.Home.logoutStatus,
		// 	code: nextProps.Home.logoutCode,
		// 	message: nextProps.Home.logoutMessage,
		// 	updateStatus: nextProps.userLogoutStatus,
		// 	isShowToastSuccess: true,
		//     successText: '退出成功',
		//     successCallback: () => {
		//         window.location.href = Util.getLoginUrl();
		//     }
		// });

		// Util.fetchCallback({
		// 	status: nextProps.Home.updatePasswordStatus,
		// 	code: nextProps.Home.updatePasswordCode,
		// 	message: nextProps.Home.updatePasswordMessage,
		// 	updateStatus: nextProps.updatePasswordStatus
		// });
	}

	render() {
		//默认被选中的菜单
		let defaultSelectedKeys = [];
		let pathname = window.location.pathname;
		if(pathname.substring(1, pathname.length)) {
			let pathArr = pathname.split('/');
			let path = pathname.split('/');
			pathArr.shift();
			pathArr.pop();
			pathArr.push(pathname.replace(/\/((new)|(edit)|(detail))$/, '/list'));
			defaultSelectedKeys = pathArr;
		}

		//防止当菜单收起时，子菜单会停留在页面上，不消失
		let menuProps = !this.state.collapsed ? {
			openKeys: this.state.openKeys,
        	onOpenChange: this._onOpenChange
		} : {}

		let contentPadding = 15, contentMargin = 12;
		if(window.location.pathname && ['/welcome', '/permission'].indexOf(window.location.pathname) > -1) {
			contentPadding = 0;
			contentMargin = 0;
		}

		//获取用户名
		let username = Util.getCookie('fullName');
		return (
			<Layout className="container">
				<Sider
					trigger= {null}
					collapsible
					collapsed= {this.state.collapsed}
					className="ant-layout-sider-ie9"
				>
					<div className="logoContainer" style={{overflow:'hidden'}}>
						<Link to="/"><img src={logoImage} alt="商品中心" className="logo" /></Link>
          				{this.state.collapsed ? '' : <span className="title" ref="memberTitle">后台管理</span>}
					</div>
					<Menu
						theme= "dark"
						mode= {this.state.collapsed ? 'vertical' : 'inline'}
						selectedKeys= {defaultSelectedKeys}
						onSelect= {this._onSelect}
						{...menuProps}
					>
						{this._getMenus(menus)}
					</Menu>
				</Sider>
				<Layout className="ant-layout-ie9">
					<Header className="header">
						<Icon
			              	className="trigger"
			              	type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
			              	onClick={this._trigger}
			            />
			            <div className="userContainer" onMouseLeave={() => this.setState({isShowUserOption: false})}>
			            	<div className="userInfo" onMouseEnter={() => this.setState({isShowUserOption: true})}>
			            		<Icon type='user' className="usernameIcon" />
			            		<span>{username}</span>
			            	</div>
			            	{this.state.isShowUserOption &&
			            		<div className="userOption">
									<button className="logout" onClick={this._resetPassword}>重置密码</button>
			            			<button className="logout" onClick={this._logout}>退出</button>
			            		</div>
			            	}
			            	{this.state.isShowResetPasswrod &&
			            		<WrappedUpdatePassword
			            			visible={this.state.isShowResetPasswrod}
			            			handleCancel={() => this.setState({isShowResetPasswrod:false})}
			            			updatePassword={this._updatePassword}
			            		/>
			            	}
			            </div>
					</Header>
					<Layout style={{background:'#eee'}}>
						<Content style={{background:'#fff',padding:contentPadding,margin:contentMargin, minHeight:"auto", position:"relative"}}>
                           {Router.genRouter()}
                        </Content>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}

export default connect(
	(state) => {
		return {Home: state.Home}
	},
	(dispatch) => bindActionCreators({...actions}, dispatch)
)(Home);
