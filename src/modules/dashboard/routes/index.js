// import BasicLayout from "@/layout/BasicLayout";
import BlankLayout from "@/layout/BlankLayout";
import Instance from "../views/index";

export default {
  path: "dashboard",
  component: BlankLayout,
  meta: {
    title: "dashboard",
    namespaced: true
  },
  children: [
    {
      path: "",
      redirect: "about",
      hidden: true
    },
    {
      path: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("./views/About.vue"),
      component: BlankLayout,
      meta: {
        title: "about"
      },
      children: [
        {
          path: "",
          redirect: "child2",
          hidden: true
        },
        {
          path: "child2",
          component: Instance,
          hidden: true,
          meta: {
            title: "child2"
            // hideBreadcrumb: true
          }
        },
        {
          path: ":id",
          component: Instance,
          hidden: true,
          meta: {
            title: "child3",
            dynamicBreadcrumb: "params.id"
          }
        }
      ]
    },
    {
      path: "about2",
      component: Instance,
      meta: {
        title: "about2"
      }
    }
  ]
};
