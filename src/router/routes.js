/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    hidden: true                 if set true, item will not show in the sidebar(default is false)
    hideBreadcrumb: false        if set true, the item will hidden in breadcrumb(default is false)
    hideWholeBreadcrumb: false   if set true, the whole breadcrumb will be hidden(default is false)
    dynamicBreadcrumb: 'params.id | query.id'  according to config. dynamic set the breadcrumb title
  }
 */

import Home from "../views/Home.vue";
import Child from "../views/Child";

import BasicLayout from "@/layout/BasicLayout";
import BlankLayout from "@/layout/BlankLayout";

export const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: BlankLayout
    // meta: {
    //   title: "home",
    //   icon: "home"
    // }
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      title: "home",
      icon: "home",
      hidden: true
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: BasicLayout,
    meta: {
      title: "dashboard",
      icon: "dashboard"
    },
    redirect: { name: "about" },
    children: [
      {
        path: "about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import("./views/About.vue"),
        component: BlankLayout,
        redirect: { name: "child2" },
        meta: {
          title: "about2",
          icon: "about2"
        },
        children: [
          {
            path: "child2",
            name: "child2",
            component: Child,
            meta: {
              title: "child2",
              icon: "child2",
              hidden: true,
              hideBreadcrumb: true
            }
          },
          {
            path: ":id",
            name: "child3",
            component: Child,
            meta: {
              title: "child3",
              icon: "child3",
              hidden: true,
              dynamicBreadcrumb: "params.id"
            }
          }
        ]
      }
    ]
  }
];
