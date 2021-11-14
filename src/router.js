import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () =>
        import(/* webpackChunkName: "Home" */ "./views/Home.vue"),
      meta: {
        title: "Tragether",
      },
    },
    {
      path: "/detailPage/:ID",
      name: "detailPage",
      component: () =>
        import(/* webpackChunkName: "Home" */ "./views/Detail.vue"),
      meta: {
        title: "詳情資料",
      },
    },
  ],
});
