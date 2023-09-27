import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#FFA768',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: false,
  pwa: false,
  headerHeight: 68,
  splitMenus: false,
  // 拂晓蓝
  colorWeak: false,
  title: 'Wanwu Code 🌈',
  logo: 'https://markdown-piggo.oss-cn-guangzhou.aliyuncs.com/img/image-20230904132030462.png',
  iconfontUrl: '',
};

export default Settings;
