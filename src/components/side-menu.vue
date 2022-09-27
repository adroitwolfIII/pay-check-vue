<template>
    <div>
      <el-menu mode="horizontal" :default-active="$router.path" :router="true" class="el-menu-demo" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b">
        <!-- 用户操作的菜单模块 -->
        <el-menu-item v-for="(menu,index) in menus" :name="index" :to="menu.path">
          {{menu.name}}
        </el-menu-item>
      </el-menu>
    </div>
  </template>
  <script>
  import { mapGetters, mapActions } from "vuex";
  import router from "@/router";
  
  export default {
    name: "Menu",
    data() {
      return {
        // avatarUrl: require("@/assets/img/avatar.png")
      };
    },
    components: {
  
    },
    methods: {
  
    },
    mounted() {
      console.log(this.menus);
    },
    computed: {
      ...mapGetters(["menus"])
    }
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
  }
  
  .menu {
    padding: 0 60px;
  }
  
  .profile {
    padding: 0 60px;
    line-height: 60px;
  }
  
  .accessory {
    color: #fff;
    display: inline-block;
  }
  </style>
  