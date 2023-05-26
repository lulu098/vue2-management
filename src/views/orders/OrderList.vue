<template>
    <div>
        <!-- separator是分隔符，不是路由 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item  v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入内容"
                              v-model="input">
                        <el-button slot="append" icon="el-icon-search"
                        @click="wayNum"
                        >
                        </el-button>
                    </el-input>
                </el-col>
                <el-col :span="6" :offset="12" class="button">
                    <el-button type="primary" 
                    @click="changeStatus"
                    >新建订单</el-button>
                    <el-button :disabled="!selectList.length"
                                @click="operate(1)"
                    >审核</el-button>
                    <el-button :disabled="!selectList.length"
                                @click="operate(2)"
                    >修改</el-button>
                    <el-button :disabled="!selectList.length"
                                @click="operate(3)"
                    >作废</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <template>
                <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%"
                height="610"
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="序号"
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="订单号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="180">
                    <template slot-scope="scope">
                       <span v-if="scope.row.status==1">待审核</span>
                       <span v-else-if="scope.row.status==2">已审核</span>
                       <span v-else-if="scope.row.status==3">审核通过</span>
                       <span v-else-if="scope.row.status==4">审核拒绝</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="下单时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="客户名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="start"
                    label="起始城市"
                     width="250">
                </el-table-column>
                <el-table-column
                    prop="end"
                    label="目的城市"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="cargo"
                    label="货物名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="count"
                    label="件数"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="unit"
                    label="单位"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="运费"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="from"
                    label="订单来源"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="pay"
                    label="是否支付"
                    width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.pay==1">已支付</span>
                        <span v-else>未支付</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="180"
                    fixed="right"
                    >
                   <template slot-scope="scope">
                        <el-button size="mini" class="mr" 
                            @click="edit(scope.row)"
                        >编辑</el-button>
                        <el-button type="danger" size="mini"
                            @click="deleteRow(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
              
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="params.pageSize"
                    :current-page="params.page"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total" 
                    class="mt fr">
                </el-pagination>
                <div class="clear"></div>
            </template>
         
        </el-card>
        <order-model :orderStatus="orderStatus"
                    @status="saveStatus"
        ></order-model>
    </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb"
import { post } from "@/utils/http";
import { mapMutations } from "vuex";
import  OrderModel from "./OrderModel.vue"
    export default {
        mixins:[breadCrumb],
        data() {
            return {
            tableData:[],
            input:"",
            loading:"",
            params:{
                page:1,
                pageSize:10,
                keyWord:""
            },
            total:0,
            selectList:[],
            orderStatus:false
            }
           
        },
        created(){
            //发请求获取表格数据
            this.getTable()
        },
        methods:{
            async getTable(){
                this.loading=true
                const {data}= await post("/orderList",this.params)
                this.loading=false
                this.tableData=data.list
                this.total=data.total
            },
             //页码函数 每页多少条
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.params.pageSize=val
                this.getTable()//重新获取页面数据
            },
           //页码函数，当前页码
            handleCurrentChange(val) {
                console.log('页码跳转了')
                this.params.page=val
                this.getTable()
            },
            //选择订单条数函数
            handleSelectionChange(val) {
               this.selectList=val
            },
            //操作状态函数
            operate(type){
               console.log(type)
                let nos=this.selectList.map(item=>item.id);
                this.$notify({
                    title:'操作成功',
                    message:nos,
                    type:"success"
                })
            },
            // 新建订单，改变orderList卡片可见状态
            changeStatus(){
                this.orderStatus = true
            },
            //子组件点保存，取消，叉号后更改订单状态
            saveStatus(m){
                this.orderStatus=m
            },
            //vue获取数据
            ...mapMutations(['getRow']),
           //把表格行的数据传给vuex
            edit(row){
                this.getRow(row)
                this.orderStatus=true
            },
            //向后端发请求删除数据，同时再次调用
           deleteRow(row){
                console.log(row)
                this.getTable()
                this.$notify({
                                title:'删除成功',
                                type:"success"
                            }) 
            },
            //根据运单号搜索
            wayNum(){
                console.log(this.input)
            }
        },
        
        components:{
            OrderModel
        }
        
    }
</script>

<style lang="less" scoped>
.button{text-align: right;}

</style>