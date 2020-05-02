/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * 
 * hidden: true                   if set true, item and its children will not show in the sidebar(default is false)
 *                                由于 hidden 属性比较常用，所以放在 meta 外
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    blank: true                  if set true, item will show the BlankLayout(default is false)
    hideBreadcrumb: false        if set true, the item will hidden in breadcrumb(default is false)
    hideWholeBreadcrumb: false   if set true, the whole breadcrumb will be hidden(default is false)
    dynamicBreadcrumb: 'params.id | query.id'  according to config. dynamic set the breadcrumb title
  }
 */

// vue-router 配置 https://router.vuejs.org/zh/api/#router-构建选项
import { formatter, createRouteMap } from "utils/route";
import BasicLayout from "@/layout/BasicLayout";

import home from "@/modules/home/routes";
import dev from "@/modules/dev/routes";
import dashboard from "@/modules/dashboard/routes";

export const routes = [
  {
    path: "/",
    redirect: "home",
    component: BasicLayout,
    children: [dev, dashboard]
  },
  home
];

export const getRoutes = () => formatter(routes);

export const routeMapping = createRouteMap(getRoutes());
