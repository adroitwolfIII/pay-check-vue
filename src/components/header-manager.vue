<template>
  <div>
    header
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
