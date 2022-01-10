import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () =>
        import(/* webpackChunkName: "Home" */ "./views/Home.vue"),
      meta: {
        title: "Tragether"
      }
    },
    {
      path: "/detailPage/:ID",
      name: "detailPage",
      component: () =>
        import(/* webpackChunkName: "Home" */ "./views/Detail.vue"),
      meta: {
        title: "詳情資料"
      }
    },
    {
      path: "/searchPage/:mode/:city/:district/:keyword",
      name: "searchPage",
      component: () =>
        import(/* webpackChunkName: "Home" */ "./views/Search.vue"),
      meta: {
        title: "搜索結果",
        keepAlive: true // 需要被缓存
      }
    }
  ]
});

export default router;
