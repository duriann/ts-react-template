import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loader from "../../components/loader/index";
import Loadable from 'react-loadable';
import {Spin} from 'antd';
import RouteConfig from './routerConfig';

export default class RouterGenerator {
    static genRouter() {
        const routers = RouterGenerator.getRouters(RouteConfig);
        return (
            <Switch>
                {
                    routers.map((route) => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        );
                    })
                }
                <Redirect to="/welcome" />
            </Switch>
        );
    }

    static routers = null;

    /**
     *  获取路由
     * @param routerConf
     * @returns {boolean}
     */
    static getRouters(routerConf) {
        if (!RouterGenerator.routers) {
            RouterGenerator.routers = routerConf.map((router) => {
                return {
                    path: router.path,
                    exact: router.exact,
                    main: Loadable({
                        loader: () => { return router.page() || Loader; },
                        loading: (props) => {
                            console.info(props);
                            if (props.error) {
                                window.console.error(props.error);
                            }
                            return <Spin />;
                        },
                        render(loaded, props) {
                            console.info(loaded);
                            console.info(props);
                            const Component = loaded.default;
                            return <Component {...props} />;
                        },
                    }),
                };
            });
        }
        return RouterGenerator.routers;
    }
}
