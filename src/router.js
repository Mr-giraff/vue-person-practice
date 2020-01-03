import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Child from "./views/Child";

import BasicLayout from "@/layout/BasicLayout";

Vue.use(Router);

export const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "home",
      icon: "home"
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
        component: () => import("./views/About.vue"),
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
            hidden: true,
            meta: {
              title: "child2",
              icon: "child2"
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
