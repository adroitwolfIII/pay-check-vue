<template>
  <div>
     <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">胜 利  队 工 资 系 统 </el-menu-item>
        <el-menu-item index="4" style="float:right;width:100px;"><a target="_blank" @click="hand_logout">退出登录</a></el-menu-item>
        <div class="demo-type" style="float:right;width:50px; height: 61px;">
          <el-avatar icon="el-icon-user-solid" ></el-avatar>
        </div>
    </el-menu>
  </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router";
import { Message } from "element-ui"
export default {
  data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
  },
  components: {
    Message
  },
  methods: {
    ...mapActions(["logout"]),
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    },
    hand_logout(){
      this.logout().then(response => {
          Message.success("退出成功！");
          this.$router.push({ name: "Login" });
        });
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
