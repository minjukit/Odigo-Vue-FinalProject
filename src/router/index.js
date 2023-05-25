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
    transitionName: "fade",
  },
  {
    path: "/index",
    name: "home",
    component: HomeView,
  },
  {
    path: "/region",
    name: "region",
    component: () => import(/* webpackChunkName: "region" */ "@/views/TripByRegionView.vue"),
    transitionName: "fade",
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
    transitionName: "fade",
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
    transitionName: "fade",
    component: () => import(/* webpackChunkName: "region" */ "@/views/PlanView.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters.isLogin) {
        alert("로그인을 해야 합니다.");
        next({
          path: "/login",
          query: {
            redirect: to.fullPath,
          },
        });
      } else {
        next();
      }
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
      {
        path: "DatePlan",
        name: "DatePlan",
        component: () => import(/* webpackChunkName: "region" */ "@/views/DatePlanView.vue"),
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
    transitionName: "fade",
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
  {
    path: "/userDetail",
    name: "userDetail",
    component: () => import("@/components/user/UserDetail.vue"),
  },
  {
    path: "/userModify",
    name: "userModify",
    component: () => import("@/components/user/UserModify.vue"),
  },
  {
    path: "/userPlan",
    name: "userPlan",
    component: () => import("@/components/user/UserModify.vue"),
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
      console.log("before router");
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
