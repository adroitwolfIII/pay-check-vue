<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"></el-menu>
            <el-menu-item index="1">员工工资查询中心</el-menu-item>
            <el-menu-item index="4" width="200px"><a href="https://localhost:8848/" target="_blank">订单管理</a></el-menu-item>       
     <div class="line"></div>
     <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">员工工资查询中心</el-menu-item>
        <el-menu-item index="4" style="float:right;width:100px;"><a href="http://localhost:8848/" target="_blank">退出登录</a></el-menu-item>
        <div class="demo-type" style="float:right;width:50px;">
          <div>
          <el-avatar icon="el-icon-user-solid"></el-avatar>
          </div>
        </div>
    </el-menu>
  </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router";

export default {
  data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
  },
  components: {

  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    }
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
