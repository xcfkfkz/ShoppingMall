<template>
  <div>
    <div>
      <van-nav-bar title="会员中心" />
    </div>
    <div class="top">
      <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" class="top-img" />
    </div>
    <div class="login">
      <div>
        <van-button type="warning" @click="goLogin" v-if="!isLogin"
          >登录</van-button
        >
      </div>
      <div>
        <van-button type="primary" @click="goRegister">{{
          placeholder
        }}</van-button>
      </div>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="会员卡" is-link />
        <van-cell title="地址管理" is-link />
        <van-cell title="我的订单" is-link />
        <van-cell title="会员权益" is-link />
        <van-cell title="联系我们" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      placeholder: "注册"
    };
  },
  methods: {
    goLogin() {
      this.$router.push({
        name: "Login"
      });
    },
    goRegister() {
      if (this.isLogin) {
        localStorage.removeItem("Token");
        this.isLogin = false;
        this.placeholder = "注册";
      } else {
        this.$router.push({
          name: "Register"
        });
      }
    }
  },
  created() {
    if (localStorage.getItem("Token")) {
      this.isLogin = true;
      this.placeholder = "退出";
    }
  }
};
</script>

<style scoped>
.top-img {
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
}
.top {
  height: 5rem;
  text-align: center;
  padding-top: 2rem;
  background-color: #eea2ad;
}
.login {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
}
.login div {
  flex: 1;
  text-align: center;
}
</style>
