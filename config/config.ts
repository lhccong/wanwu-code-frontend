// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  publicPath: '/',
  base: '/',
  hash: false,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import request from '@/plugins/globalRequest';",
      schemaPath: 'https://qingxin.store/wanwu/wanwu-usercenter/api/v2/api-docs',
      // schemaPath: 'http://localhost:8806/api/v2/api-docs',
      projectName: 'user'
    },
    // {
    //   requestLibPath: "import request from '@/plugins/globalRequestBi';",
    //   schemaPath: 'http://124.70.210.130/wanwu-code/bi/api/v2/api-docs',
    //   projectName: 'bi',
    // },
    {
      requestLibPath: "import request from '@/plugins/globalRequestApi';",
      schemaPath: 'https://qingxin.store/wanwu/wanwu-api/api/v2/api-docs',
      projectName: 'api'
    },

  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
