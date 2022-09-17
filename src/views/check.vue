<template>
    <div>
        <el-card>
            <el-form @submit.native.prevent label-postion="left" :inline="true" :label-width="100"
                class="demo-form-inline">
                <el-form-item label="员工名称">
                    <el-input type="text" v-model="queryParams.name"></el-input>
                </el-form-item>
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
            <el-table :data="tableData" height="250" border style="width: 50%">
                <el-table-column prop="title" label="薪资名称">
                </el-table-column>
                <el-table-column prop="value" label="薪资(元)">
                </el-table-column>
            </el-table>

        </el-card>
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
            tableData: []
        }
    },
    methods: {
        search() {
            let query = this.queryParams;
            let start_date = query.date[0]
            let end_date = query.date[1]
            // start_date = getDateString(start_date)
            // end_date = getDateString(end_date)
            payApi.search(query.name, start_date,end_date).then(res => {
                this.tableData = res.data;
                Message.success("查询成功")
            })
        }
    }
}

</script>

<style  scoped>
.mt {
    margin-top: 20px;
}
</style>