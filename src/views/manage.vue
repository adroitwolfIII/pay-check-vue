<template>
  <div>
    <el-card>
      <div style="margin-bottom: 20px;">
        <el-button type="primary" @click="drawer = true">新增工资</el-button>
        <el-button type="primary" @click="fileFlag = true">excel导入</el-button>
      </div>
      <el-form @submit.native.prevent label-postion="left" :inline="true" :label-width="100" class="demo-form-inline">
        <el-form-item label="员工名称:">
          <el-input type="text" v-model="queryParams.name"></el-input>
        </el-form-item>
        <el-form-item label="薪资日期">
          <el-date-picker v-model="queryParams.date" type="monthrange" range-separator="至" start-placeholder="开始月份"
            end-placeholder="结束月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>

    </el-card>

    <el-card class="mt">
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column prop="name" label="员工姓名">
        </el-table-column>
        <el-table-column prop="dateTime" label="时间">
        </el-table-column>
        <el-table-column prop="total" label="总工资(元)">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="review(scope.row)" width="100" type="primary">查看</el-button>
            <el-button @click="del(scope.row)" width="100" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="工资详细" :visible.sync="dialogFlag" width="30%">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item v-if="rowDetail.jcgz" label="基础工资">{{rowDetail.jcgz}}</el-descriptions-item>
        <el-descriptions-item v-if="rowDetail.ksf" label="课时费">{{rowDetail.ksf}}</el-descriptions-item>
        <el-descriptions-item v-if="rowDetail.jcjx" label="基础绩效">{{rowDetail.jcjx}}</el-descriptions-item>
        <el-descriptions-item v-if="rowDetail.glgz" label="工龄工资">{{rowDetail.glgz}}</el-descriptions-item>
        <el-descriptions-item v-if="rowDetail.dhbz" label="电话补助">{{rowDetail.dhbz}}</el-descriptions-item>
        <el-descriptions-item v-if="rowDetail.jtbz" label="交通补助">{{rowDetail.jtbz}}</el-descriptions-item>
        <el-descriptions-item v-if="rowDetail.jbbz" label="加班补助">{{rowDetail.jbbz}}</el-descriptions-item>
        <el-descriptions-item v-if="rowDetail.ldbx" label="劳动保险">{{rowDetail.ldbx}}</el-descriptions-item>
        <el-descriptions-item v-if="rowDetail.sybx" label="失业保险">{{rowDetail.sybx}}</el-descriptions-item>
        <el-descriptions-item v-if="rowDetail.ylbx" label="医疗保险">{{rowDetail.ylbx}}</el-descriptions-item>
        <el-descriptions-item v-if="rowDetail.grsds" label="个人所得税">{{rowDetail.grsds}}</el-descriptions-item>
        <el-descriptions-item v-if="rowDetail.gjj" label="公积金">{{rowDetail.gjj}}</el-descriptions-item>
      </el-descriptions>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFlag = false">取 消</el-button>
        <el-button type="primary" @click="dialogFlag = false">确 定</el-button>
      </span>
    </el-dialog>


    <el-drawer title="新增工资" :visible.sync="drawer" direction="rtl">
      <el-form ref="form" :model="insert" label-width="100px">
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

    <el-dialog title="文件上传" :visible.sync="fileFlag" width="30%">
      <!-- :on-exceed="handleExceed" :before-remove="beforeRemove"-->
      <el-upload class="upload-demo" ref="upload" action="" accept=".xls,.xlsx" :limit='1' 
        :file-list="fileList" :on-change="changeFile"  :auto-upload="false">
        <el-button slot="trigger"  type="primary">选取文件</el-button>
        <el-button class="sub-btn" type="primary" @click.native.prevent="submitFiles">提交</el-button>
      </el-upload>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="fileFlag = false">取 消</el-button>
        <el-button type="primary" @click="fileFlag = false">确 定</el-button>
      </span> -->
    </el-dialog>

  </div>
</template>
  
<script>
import { getDateString } from '@/util/utils'
import { Message } from "element-ui"
import payApi from '@/api/paycheck'
export default {
  name: "manage",
  data() {
    return {
      fileList: [],
      drawer: false,
      queryParams: {
        name: '',
        date: ''
      },
      tableData: [],
      rowDetail: {},
      fileFlag:false,
      dialogFlag: false,
      insert: {},
      file: ''
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
    },
    changeFile (file, fileList) {
      console.log('change', file, file.raw)
      this.file = file.raw
    },
    submitFiles () {
      
      //将需要提交的文件，和附带的数据，append FormData中 然后提交
      
      },
    // 查看用户详细工资
    review(row) {
      this.rowDetail = row;

      this.dialogFlag = true
    },
    // 查看用户详细工资
    del(row) {
      payApi.delItem(row.id).then(res => {
        Message.success("删除成功")
        // 重新请求
        this.search();
      })

    },
    // 对员工进行模糊查询
    search() {
      let query = this.queryParams;
      if (!query.date) {
        let start_date = query.date[0]
        let end_date = query.date[1]
        query.start_date = start_date
        query.end_date = end_date
      }


      payApi.search4admin(query).then(res => {
        this.tableData = [];

        // 修改数组
        let element = res.data
        // 增加总工资变量
        for (var i = 0; i < element.length; i++) {
          let total = 0
          element[i].dateTime = getDateString(element[i].dateTime)
          // 将员工的所有工资变量加起来
          total += element[i].jcgz;
          total += element[i].ksf;
          total += element[i].jcjx;
          total += element[i].glgz;
          total += element[i].dhbz;
          total += element[i].jtbz;
          total += element[i].jbbz;
          total += element[i].sybx;
          total += element[i].ldbx;
          total += element[i].ylbx;
          total += element[i].grsds;
          total += element[i].gjj;

          element[i].total = total;
          this.tableData.push(element[i])
        }
        // Message.success("查询成功")
      })
    },
    // 查看用户详细工资
    review(row) {
      this.rowDetail = row;

      this.dialogFlag = true
    }
  },
};
</script>
  
<style scoped lang="scss">
.mt {
  margin-top: 20px;
}
</style>
  
  