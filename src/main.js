import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Col,
  Row,
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  Form,
  Field,
  NavBar,
  Tab,
  Tabs,
  PullRefresh,
  Stepper,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup
} from "vant";
import interceptor from "./interceptor";
Vue.use(Button)
  .use(Col)
  .use(Row)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(List)
  .use(Form)
  .use(Field)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(PullRefresh)
  .use(Stepper)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Cell)
  .use(CellGroup);

Vue.config.productionTip = false;
interceptor();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
