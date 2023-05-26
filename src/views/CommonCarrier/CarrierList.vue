<template>
    <div>
       <bread-crumb></bread-crumb>
       <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入编号"
                              v-model="input.No">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入承运商名称"
                              v-model="input.name">
                    </el-input>
                </el-col>
                <el-col :span="6" class="tr" :offset="6">
                    <el-button type="primary"
                        @click="search"
                    >
                        查询
                    </el-button>
                    <el-button type="primary"
                        @click="reset"
                    >
                        重置
                    </el-button>
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
                >
                <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    fixed>
                </el-table-column>
                <el-table-column
                    prop="No"
                    label="编号id"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="licence"
                    label="道路许可证"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="contacts"
                    label="联系人/电话"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="truckstyle"
                    label="类型"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="registerTime"
                    label="注册时间"
                     width="250">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="承运商名称"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="creditCode"
                    label="信用代码"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="注册地址"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="report"
                    label="是否上报"
                    width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.report==1">需要</span>
                        <span v-else>不需要</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="creditGrade"
                    label="信用分"
                    width="180">
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
                    :page-size="pageDate.pageSize"
                    :current-page="pageDate.page"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total" 
                    class="mt fr">
                </el-pagination>
                <div class="clear"></div>
            </template>
        </el-card>
        <carrier-model
        :orderStatus="orderStatus"
        @status="saveStatus"
        ></carrier-model>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import {post} from "@/utils/http"
import CarrierModel from "./CarrierModel.vue"
import { mapMutations } from 'vuex';
    export default {
        components:{
            BreadCrumb,
            CarrierModel
        },
        data(){
            return{
                input:{
                    No:"",
                    name:""
                },
                pageDate:{
                    page:1,
                    pageSize:10
                },
                loading:false,
                tableData:[],
                total:0,
                orderStatus:false
            }
        },
        created(){
            this.getTable()
        },
        methods:{
            //查询按钮点击
            search(){
                console.log(this.input)
            },
               //重置按钮
               reset(){
                this.input.No=""
                this.input.name=""
            },
            //获取表单数据
            getTable(){
                this.loading=true
                post("/carrier",{...this.pageDate}).then(({data})=>{
                    this.loading=false
                    console.log(data)
                    this.tableData=data.list
                    this.total=data.total
                }
                    
                )
            },
            //页码函数 每页多少条
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageDate.pageSize=val
                this.getTable()//重新获取页面数据
            },
           //页码函数，当前页码
            handleCurrentChange(val) {
                console.log('页码跳转了')
                this.pageDate.page=val
                this.getTable()
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
            //子组件点保存，取消，叉号后更改订单状态
            saveStatus(m){
                this.orderStatus=m
            },
        }
    }
</script>

<style lang="less" scoped>

</style>