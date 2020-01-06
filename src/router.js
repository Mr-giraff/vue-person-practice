import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Child from "./views/Child";

import BasicLayout from "@/layout/BasicLayout";
import BlankLayout from "@/layout/BlankLayout";

Vue.use(Router);

export const routes = [
  {
    path: "/",
    redirect: "/home",
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
    path: "/test",
    name: "test",
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

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
