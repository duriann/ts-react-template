import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes/";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store()}>
      <Routes />
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);


