<template>
    <div>
        <el-card>
            <el-form @submit.native.prevent label-postion="left" :inline="true" :label-width="100"
                class="demo-form-inline">
                <el-form-item label="薪资日期">
                    <el-date-picker v-model="queryParams.date" type="monthrange" range-separator="至"
                        start-placeholder="开始月份" end-placeholder="结束月份">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" height="250" border style="width: 100%">
                <el-table-column prop="dateTime" label="时间">
                </el-table-column>
                <el-table-column prop="total" label="总工资(元)">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="review(scope.row)" width="100" type="primary">查看</el-button>
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
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
import { getDateString } from '@/util/utils'
import { Message } from "element-ui"
import payApi from '@/api/paycheck'


export default {
    name: 'check',
    data() {
        return {
            queryParams: {},
            tableData: [],
            dialogFlag: false,
            rowDetail: {}
        }
    },
    methods: {
        search() {
            let query = this.queryParams;
            let start_date = query.date[0]
            let end_date = query.date[1]
            // start_date = getDateString(start_date)
            // end_date = getDateString(end_date)
            payApi.search(start_date, end_date).then(res => {
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
                Message.success("查询成功")
            })
        },
        // 查看用户详细工资
        review(row) {
            this.rowDetail = row;

            this.dialogFlag = true
        }
    }

}

</script>

<style  scoped>
.mt {
    margin-top: 20px;
}
</style>