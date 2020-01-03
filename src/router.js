import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

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
    children: [
      {
        path: "about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("./views/About.vue"),
        meta: {
          title: "about2",
          icon: "about2"
        }
      }
    ]
  }
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
