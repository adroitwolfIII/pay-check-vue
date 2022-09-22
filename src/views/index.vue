<template>
    <div class="layout">
        <router-view></router-view>
        <!-- <Header></Header> -->
        <!-- <div class="body content" :style="{padding: '0 50px'}">
            <router-view></router-view>
        </div> -->
    </div>
</template>



<script>
// import Header from "@/components/header-manager";

export default {
    name: "index",
    data() {
        return {};
    },
    components: {
        // Header
    },
    methods: {
       
    },
    computed: {
       
    },
    created() {
    }
};
</script>
    
    
<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    min-height: 800px;
}



.content {
    /* min-width: 78%;
      min-height: 600px; */
    margin: 24px 24px 0px;
    height: 80%;
}
</style>
    