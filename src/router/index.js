import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/pages/Main";
import ShoppingMall from "@/components/pages/ShoppingMall";
import GoodsDetails from "../components/pages/GoodsDetails";
import CategoryList from "../components/pages/CategoryList";
import Cart from "../components/pages/Cart";
import Member from "../components/pages/Member";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      { path: "/", name: "ShoppingMall", component: ShoppingMall },
      { path: "/category", name: "CategoryList", component: CategoryList },
      { path: "/cart", name: "Cart", component: Cart, meta: { auth: true } },
      { path: "/member", name: "Member", component: Member }
    ]
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../components/pages/Register")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/pages/Login")
  },
  { path: "/goods", name: "GoodsDetails", component: GoodsDetails }
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const token = localStorage.getItem("Token");
    if (token) next();
    else
      next({
        path: "/login",
        query: { redirect: to.path }
      });
  }
  next();
});

export default router;
