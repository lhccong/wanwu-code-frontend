export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      { name: '注册', path: '/user/register', component: './user/Register' },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/blog',
    name: '博客',
    icon: 'icon-a-20230816meishitubiao_jiancan-shala',
    component: './blog',
  },
  { path: '/notification', component: './Notification', hideInMenu: true },
  { name: '编辑个人信息', path: '/edit', component: './user/Message', hideInMenu: true },
  { name: '开放平台', path: '/api', component: './wanwu/Api/OpenCenter', hideInMenu: true },
  { name: '个人中心', path: '/center/:userId', component: './user/Center', hideInMenu: true },
  { name: '个人信息', path: '/userMessage/:userId', component: './user/Center', hideInMenu: true },
  {
    path: '/note',
    routes: [
      { name: '创建文章', path: '/note/create', component: './blog/Create', hideInMenu: true },
      { name: '编辑文章', path: '/note/edit/:id', component: './blog/Edit', hideInMenu: true },
      {
        name: '配置文章',
        path: '/note/settings/:id',
        component: './blog/Settings',
        hideInMenu: true,
      },
      { name: '文章详情页', path: '/note/:id', component: './blog/Detail', hideInMenu: true },
    ],
  },
  {
    name: '村落',
    path: '/village',
    icon: 'icon-a-20230816meishitubiao_xinlingshou-waimai',
    component: './blog',
  },
  {
    path: '/wanwu',
    name: '万物',
    icon: 'icon-a-20230816meishitubiao_huoguo-jiugongge',

    // access: 'canAdmin',
    routes: [

      {
        path: '/wanwu/bi',
        name: 'onLineBI',
        icon: 'crown',
        component: './wanwu/Bi',
      },
      {
        path: '/wanwu/api',
        name: 'onLineAPI',
        icon: 'crown',
        component: './wanwu/Api',
      },
      {
        path: '/wanwu/oj',
        name: 'onLineOJ',
        icon: 'smile',
        component: './wanwu/Oj',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/interface_info',
    routes: [
      { name: '接口详情', path: '/interface_info/:id', component: './wanwu/Api/InterfaceInfo', hideInMenu: true },
    ],
  },
  {
    path: '/admin',
    name: '管理中心',
    icon: 'icon-a-20230816meishitubiao_jiancan-shousi1',
    // access: 'canAdmin',
    routes: [
      {
        path: '/admin/userMange',
        name: '用户管理',
        icon: 'crown',
        component: './manages/UserManage',
      },
      {
        path: '/admin/apiMange',
        name: '接口管理',
        icon: 'crown',
        component: './manages/ApiManage',
      },
      {
        component: './404',
      },
    ],
    access: 'canAdmin',
  },
  {
    path: '/',
    redirect: '/blog',
  },
  {
    component: './404',
  },
];
