<template>
    <div class="register">
      <el-form ref="forgetForm" :model="forgetForm" :rules="registerRules" class="register-form">
        <h3 class="title">密码找回</h3>
        
        <el-form-item prop="username">
        <el-input v-model="forgetForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
        
        <el-form-item prop="id_card">
          <el-input v-model="forgetForm.id_card" type="text" auto-complete="off" placeholder="身份证">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>

        <el-form-item prop="credit_card">
          <el-input v-model="forgetForm.credit_card" type="text" auto-complete="off" placeholder="工资卡号">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="forgetForm.password" type="password" auto-complete="off" placeholder="密码"
            @keyup.enter.native="handleForget">
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="forgetForm.confirmPassword" type="password" auto-complete="off" placeholder="确认密码"
            @keyup.enter.native="handleForget">
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
  
        <el-form-item style="width:100%;">
          <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
            @click.native.prevent="handleForget">
            <span v-if="!loading">找回</span>
            <span v-else>找 回 中...</span>
          </el-button>
  
        </el-form-item>
      </el-form>
    </div>
  </template>
  
<script>
import userApi from "@/api/user";
import { Message } from "element-ui"
export default {
  name: "Forget",
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.forgetForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      forgetForm: {
        id_card: "",
        password: "",
        confirmPassword: "",
        credit_card: "",
        username:""
      },
      registerRules: {
        username: [
        { required: true, trigger: "blur", message: "请输入您的账号" },
        { min: 2, max: 20, message: '用户账号长度必须介于 2 和 20 之间', trigger: 'blur' }
        ],
        id_card: [
          { required: true, trigger: "blur", message: "请输入您的身份证" },
          { min: 2, max: 20, message: '身份证长度必须介于 2 和 20 之间', trigger: 'blur' }
        ],
        credit_card: [
          { required: true, trigger: "blur", message: "请输入您的工资卡号" },
          { min: 2, max: 20, message: '工资卡号必须介于 2 和 20 之间', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
          { min: 3, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      },
      loading: false,
      captchaEnabled: true
    };
  },
  created() {

  },
  methods: {
    handleForget() {
      this.$refs.forgetForm.validate(valid => {
        if (valid) {
          this.loading = true;
          userApi.forget(this.forgetForm).then(res => {
            Message.success("密码找回成功，请登录");

            this.$router.push("/");
          }).catch(() => {
            this.loading = false;

          })
        }
      });
    }
  }
};
</script>
  
<style rel="stylesheet/scss" lang="scss">
  .register {
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
  
  .register-form {
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
  
  .register-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  
  .register-code {
    width: 33%;
    height: 38px;
    float: right;
  
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  
  .el-register-footer {
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
  
  .register-code-img {
    height: 38px;
  }
  </style>
  