import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/region",
    name: "region",
    component: () => import(/* webpackChunkName: "region" */ "@/views/TripByRegionView.vue"),
    children: [
      {
        path: "regionSearch",
        name: "regionSearch",
        component: () =>
          import(/* webpackChunkName: "board" */ "@/components/region/RegionSearch.vue"),
      },
    ],
  },
  {
    path: "/board",
    name: "board",
    component: () => import(/* webpackChunkName: "board" */ "@/views/BoardView.vue"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardList",
        component: () => import(/* webpackChunkName: "board" */ "@/components/board/BoardList.vue"),
      },
      {
        path: "write",
        name: "boardRegister",
        component: () =>
          import(/* webpackChunkName: "board" */ "@/components/board/BoardRegister.vue"),
      },
      {
        path: "detail/:id",
        props: true,
        name: "boardDetail",
        component: () =>
          import(/* webpackChunkName: "board" */ "@/components/board/BoardDetail.vue"),
      },
      {
        path: "modify/:id",
        name: "boardModify",
        props: true,
        component: () =>
          import(/* webpackChunkName: "board" */ "@/components/board/BoardModify.vue"),
      },
      {
        path: "delete/:id",
        name: "boardDelete",
        component: () =>
          import(/* webpackChunkName: "board" */ "@/components/board/BoardDelete.vue"),
      },
    ],
  },
  {
    path: "/plan",
    name: "plan",
    component: () => import(/* webpackChunkName: "region" */ "@/views/PlanView.vue"),
    beforeEnter: (to, from, next) => {
      console.log(store.getters.isLogin);
      if (!store.getters.isLogin) {
        alert("로그인을 해야 합니다.");
        next({
          path: "/login",
          query: {
            redirect: to.fullPath,
            data: "example data", // 전달하려는 데이터 추가
          },
        });
      }
      next();
    },
    children: [
      {
        path: "searchPlan",
        name: "searchPlan",
        component: () =>
          import(/* webpackChunkName: "region" */ "@/components/plan/PlanSearch.vue"),
      },
      {
        path: "savePlan",
        name: "savePlan",
        component: () => import(/* webpackChunkName: "region" */ "@/views/SavePlanView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "region" */ "@/views/LoginView.vue"),
  },
  {
    path: "/regForm",
    name: "regForm",
    component: () => import("@/components/user/RegForm.vue"),
  },
  {
    path: "/hotplace",
    name: "hotplace",
    component: () => import(/* webpackChunkName: "board" */ "@/views/HotPlaceView.vue"),
    redirect: "/hotplace/list",
    children: [
      {
        path: "list",
        name: "hotPlaceList",
        component: () =>
          import(/* webpackChunkName: "board" */ "@/components/hotplace/BoardList.vue"),
      },
      {
        path: "write",
        name: "hotPlaceRegister",
        component: () =>
          import(/* webpackChunkName: "board" */ "@/components/hotplace/BoardRegister.vue"),
      },
      {
        path: "detail/:id",
        props: true,
        name: "hotPlaceDetail",
        component: () =>
          import(/* webpackChunkName: "board" */ "@/components/hotplace/BoardDetail.vue"),
      },
      {
        path: "modify/:id",
        name: "hotPlaceModify",
        props: true,
        component: () =>
          import(/* webpackChunkName: "board" */ "@/components/hotplace/BoardModify.vue"),
      },
      {
        path: "delete/:id",
        name: "hotPlaceDelete",
        component: () =>
          import(/* webpackChunkName: "board" */ "@/components/hotplace/BoardDelete.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  to;
  from;
  store
    .dispatch("getCert")
    .then(() => {
      // 액션이 완료된 후 다음으로 이동
      next();
    })
    .catch((error) => {
      // 액션 처리 중 에러가 발생한 경우
      console.error(error);
      next(false); // 라우터 이동 취소
    });
  next();
});

export default router;
