<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>

    <van-tabbar v-model="active" @change="changeTabbar">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" info="1">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      active: 0,
      current: ""
    };
  },
  updated() {
    this.changeTabBarActive();
  },
  methods: {
    changeTabBarActive() {
      this.current = this.$route.path;
      if (this.current === "/Cart") {
        this.active = 2;
      }
    },
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({ name: "ShoppingMall" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
          break;
        case 3:
          this.$router.push({ name: "Member" });
          break;
      }
    }
  }
};
</script>

<style scoped></style>
