<template>
  <div>
    <el-card>
      <div style="margin: 10px 0;">
        <el-button type="primary" @click="drawer = true">新增工资</el-button>
      </div>
      <el-form @submit.native.prevent label-postion="left" :inline="true" :label-width="100" class="demo-form-inline">
        <el-form-item label="员工名称:">
          <el-input type="text" v-model="queryParams.keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>

    </el-card>

    <el-card class="mt">

    </el-card>


    <el-drawer title="新增工资" :visible.sync="drawer" direction="rtl" :before-close="handleClose">
      <el-form ref="form" :model="insert" label-width="80px">
        <el-form-item label="员工名称">
          <el-input v-model="insert.name"></el-input>
        </el-form-item>
        <el-form-item label="薪资日期">
          <el-date-picker v-model="insert.date" type="month">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="薪资标题">
          <el-input v-model="insert.title"></el-input>
        </el-form-item>
        <el-form-item label="薪资">
          <el-input v-model="insert.value"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
  
<script>
import { Message } from "element-ui"
import payApi from '@/api/paycheck'
export default {
  name: "manage",
  data() {
    return {
      drawer: false,
      queryParams: {
        keyword: ''
      },
      insert: {}
    };
  },
  methods: {
    onSubmit() {
      let data = this.insert
      // let date = new Date(data.date)
      // date = date.getFullYear() + '' + (date.getMonth() + 1)
      // data.date = date
      payApi.insertItem(data).then(res => {
        Message.success("新增成功")
        this.drawer = false;
      })
      this.insert.name = ''
      this.insert.title = ''
      this.insert.value = ''
      this.insert.date = ''
    }
  },
};
</script>
  
<style scoped lang="scss">
.mt {
  margin-top: 20px;
}
</style>
  
  