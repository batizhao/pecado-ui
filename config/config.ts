// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },
            {
              path: '/dashboard',
              name: '工作台',
              component: './Welcome',
            },
            {
              path: '/ims',
              name: '权限管理',
              // authority: ['admin'],
              routes: [
                {
                  path: '/ims/user',
                  name: '用户管理',
                  component: './ims/user',
                },
                {
                  path: '/ims/role',
                  name: '角色管理',
                  component: './ims/role',
                },
                {
                  path: '/ims/menu',
                  name: '菜单管理',
                  component: './ims/menu',
                },
              ],
            },
            {
              name: '系统管理',
              path: '/system',
              routes: [
                {
                  path: '/system/log',
                  name: '日志管理',
                  component: './system/log',
                },
              ],
            },
            {
              name: '开发平台',
              path: '/dp',
              routes: [
                {
                  path: '/dp/ds',
                  name: '数据源',
                  component: './dp/ds',
                },
                {
                  path: '/dp/code',
                  name: '代码生成',
                  component: './dp/code',
                },
              ],
            },
            {
              name: '个人管理',
              path: '/account',
              routes: [
                {
                  name: '个人中心',
                  path: '/account/center',
                  component: './account/center',
                },
                {
                  name: '个人设置',
                  path: '/account/settings',
                  component: './account/settings',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
