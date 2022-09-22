<template>
  <div>
    <el-menu mode="horizontal" class="header">
      <!-- 用户操作的菜单模块 -->
      <div class="menu">
        <template v-for="(menu,index) in menus" >
          <el-menu-item  v-if="!menu.children" :key="index" :name="index" :to="menu.path">
            {{menu.name}}
          </el-menu-item>
        </template>
      </div>
      <div>
      </div>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router";

export default {
  name: "Header",
  data() {
    return {
      // avatarUrl: require("@/assets/img/avatar.png")
    };
  },
  components: {
    
  },
  methods: {
    
  },
  mounted(){
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
.ivu-dropdown-item {
  font-size: 16px !important;
}

.accessory {
  color: #fff;
  display: inline-block;
}
</style>
