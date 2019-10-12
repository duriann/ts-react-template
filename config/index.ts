export default {
	development: {
		targetUrl: 'http://customer-dev.xxx.com.cn',
		apiUrl: 'http://web.futureshop.dev-zt.xxx.com.cn:8088',
		apiUrlFilter: '/customerAdmin',
		authUrl: 'http://auth-dev.xxx.com.cn',
		loginAddress: 'http://auth-dev.xxx.com.cn/login/login.html',
		authUrlFilter: '/auth',
		port: 8088,
		autoOpenBrowser: true, 
		proxyFilter: '/customerAdmin',
    addressUrl:'http://web.futureshop.dev-zt.xxx.com.cn:8088/areas/district',
	},
	prodDev: {
		apiUrl: 'http://192.168.200.54:8080/',
		apiUrlFilter: '/productAdmin',
		addressUrl:'http://customer-dev.xxx.com.cn/areas/district',
		authUrl: 'http://auth-dev.xxx.com.cn',
		loginAddress: 'http://auth-dev.xxx.com.cn/login/login.html',
		authUrlFilter: '/auth'
	},
	test: {
		apiUrl: 'http://customer-test.xxx.com.cn',
		apiUrlFilter: '/customerAdmin',
		addressUrl:'http://customer-test.xxx.com.cn/areas/district',
		authUrl: 'http://auth-test.xxx.com.cn',
		loginAddress: 'http://auth-test.xxx.com.cn/login/login.html',
		authUrlFilter: '/auth'
	},
	production: {
		apiUrl: 'http://customer.xxx.com.cn',
		apiUrlFilter: '/customerAdmin',
		addressUrl:'http://customer.xxx.com.cn/areas/district',
		authUrl: 'http://auth.xxx.com.cn',
		loginAddress: 'http://auth.xxx.com.cn/login/login.html',
		authUrlFilter: '/auth'
  }
}

