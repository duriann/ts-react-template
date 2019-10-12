import React from 'react';
import PermissionImage from './images/permission.png';
import './index.less';

let Permission = () => {
	return (
		<div className="permission">
			<div className="permission-container">
				<img src={PermissionImage} alt="该用户没有权限"/>
				<div className="permission-content">
					<span>用户没有权限</span>
					<span className="permission-description">抱歉，该用户没有权限，请访问其他页面</span>
				</div>
			</div>
		</div>
	);
}

export default Permission;