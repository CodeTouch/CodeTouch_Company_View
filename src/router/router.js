import { createWebHistory, createRouter } from "vue-router";
import main from "@/components/content/mainContents.vue";
import singup from "@/components/content/singUp.vue";
import introduce from "@/components/content/introduce.vue";
import payment from "@/components/content/payment.vue";
import login from "@/components/content/login.vue";
import pay from "@/components/content/pay.vue";
import findInfo from "@/components/content/findInfo.vue";
import mySite from "@/components/content/mySite.vue";
import myPage from "@/components/content/myPage.vue";
import template from "@/components/content/templatePage.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: main,
    //meta: { requiresAuth: true, showSidebar: true },
  },
  {
    path: "/singup",
    name: "singup",
    component: singup,
    //meta: { requiresAuth: true, showSidebar: true },
  },
  {
    path: "/introduce",
    name: "introduce",
    component: introduce,
    //meta: { requiresAuth: true, showSidebar: true },
  },
  {
    path: "/payment",
    name: "payment",
    component: payment,
    //meta: { requiresAuth: true, showSidebar: true },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    //meta: { requiresAuth: true, showSidebar: true },
  },
  {
    path: "/pay",
    name: "pay",
    component: pay,
    props: true,
    //meta: { requiresAuth: true, showSidebar: true },
  },
  {
    path: "/findInfo",
    name: "findInfo",
    component: findInfo,
    //meta: { requiresAuth: true, showSidebar: true },
  },
  {
    path: "/mySite",
    name: "mySite",
    component: mySite,
    //meta: { requiresAuth: true, showSidebar: true },
  },
  {
    path: "/myPage",
    name: "myPage",
    component: myPage,
    //meta: { requiresAuth: true, showSidebar: true },
  },
  {
    path: "/template",
    name: "template",
    component: template,
    //meta: { requiresAuth: true, showSidebar: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) =>{

})

export default router;
