<template>
    <div class="layout content">
        <el-container>
            <el-header><Header /></el-header>
            <el-container>
                <el-aside width="200px"><Menu></Menu></el-aside>
                <el-main><router-view /></el-main>
            </el-container>
        </el-container>
    </div>
</template>



<script>
import Header from "@/components/header-manager";
import Menu from "@/components/side-menu.vue"
export default {
    name: "index",
    data() {
        return {};
    },
    components: {
        Header,
        Menu
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
    /* position: relative; */
    /* border-radius: 4px; */
    overflow: hidden;
    /* min-height: 800px; */
}



.content {
    /* min-width: 78%;
    margin: 24px 24px 0px; */
    min-height: 600px;
    height: 100%;
}

.el-main{
    padding: 0px;
}
</style>
    