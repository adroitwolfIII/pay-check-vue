<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
          @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
          @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: left;">
          <router-link class="link-type" :to="'/forget'">忘记密码</router-link>
        </div>
        <div style="float: right;">
          <router-link class="link-type" :to="'/register'">注册用户</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import { mapActions } from "vuex";
import router from "@/router";
import {Message} from "element-ui"
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        uuid: ""
      },
      loading: false,
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ]
      },
      // 验证码开关
      // 注册开关
      redirect: undefined
    };
  },
  methods: {
    ...mapActions(["login"]),
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        
        if (valid) {
          this.loading = true;
          this.login({ username: this.loginForm.username, password: this.loginForm.password }).then(
            response => {
              Message.info("登陆成功");
              router.push({ name: "后台主页" });
            }
          ).catch(() => {
            this.loading = false;
          });

        }
      });
    }
  }
};
</script>
  
<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}
</style>
  