<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="register-panel">
      <van-form @submit="login">
        <van-field
          v-model="username"
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          required
          @click-icon="username = ''"
          :error-message="usernameErr"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :error-message="passwordErr"
        />
        <div class="register-button">
          <van-button
            type="info"
            size="large"
            native-type="submit"
            :loading="loading"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      usernameErr: "",
      passwordErr: "",
      loading: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      this.loading = true;
      axios({
        url: "/login",
        method: "post",
        data: {
          userName: this.username,
          passWord: this.password
        }
      })
        .then(res => {
          if (res.status === 200 && res.data) {
            localStorage.setItem("Token", res.data);
            Toast.success("登录成功");
            this.$router.push("/cart");
          } else {
            Toast.fail("登录失败");
            this.loading = false;
          }
        })
        .catch(() => {
          Toast.fail("登录失败");
          this.loading = false;
        });
    },
    login() {
      this.check() && this.submit();
    },
    // 表单验证
    check() {
      let flag = true;
      if (this.username.length < 5) {
        this.usernameErr = "用户名不少于5位";
        flag = false;
      } else {
        this.usernameErr = "";
      }
      if (this.password.length < 6) {
        this.passwordErr = "密码不少于6位";
        flag = false;
      } else {
        this.passwordErr = "";
      }
      return flag;
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 0.3rem;
  margin: 1.25rem auto;
  padding-bottom: 3rem;
}
.register-button {
  padding-top: 0.6rem;
}
</style>
