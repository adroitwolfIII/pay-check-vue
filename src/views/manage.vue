<template>
  <div>
    <el-card>
      <div style="margin-bottom: 20px;">
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
        <el-form-item label="基础工资">
          <el-input v-model="insert.jcgz"></el-input>
        </el-form-item>
        <el-form-item label="课时费">
          <el-input v-model="insert.ksf"></el-input>
        </el-form-item>
        <el-form-item label="基础绩效">
          <el-input v-model="insert.jcjx"></el-input>
        </el-form-item>
        <el-form-item label="工资工龄">
          <el-input v-model="insert.glgz"></el-input>
        </el-form-item>
        <el-form-item label="电话补助">
          <el-input v-model="insert.dhbz"></el-input>
        </el-form-item>
        <el-form-item label="交通补助">
          <el-input v-model="insert.jtbz"></el-input>
        </el-form-item>
        <el-form-item label="加班补助">
          <el-input v-model="insert.jbbz"></el-input>
        </el-form-item>
        <el-form-item label="劳动保险">
          <el-input v-model="insert.ldbx"></el-input>
        </el-form-item>
        <el-form-item label="失业保险">
          <el-input v-model="insert.sybx"></el-input>
        </el-form-item>
        <el-form-item label="医疗保险">
          <el-input v-model="insert.ylbx"></el-input>
        </el-form-item>
        <el-form-item label="个人所得税">
          <el-input v-model="insert.grsds"></el-input>
        </el-form-item>
        <el-form-item label="公积金">
          <el-input v-model="insert.gjj"></el-input>
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
      this.insert.jcgz = ''
      this.insert.ksf = ''
      this.insert.jcjx = ''
      this.insert.glgz = ''
      this.insert.dhbz = ''
      this.insert.jtbz = ''
      this.insert.jbbz = ''
      this.insert.ldbx = ''
      this.insert.sybx = ''
      this.insert.ylbx = ''
      this.insert.grsds = ''
      this.insert.gjj = ''
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
  
  