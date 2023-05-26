<template>
    <div>
       <bread-crumb></bread-crumb>
       <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="用户昵称"
                              v-model="input.No">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="客户ID"
                              v-model="input.name">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="联系电话"
                              v-model="input.tel">
                    </el-input>
                </el-col>
                <el-col :span="6" class="tr" >
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
            <el-row>
                <el-col :span="12">
                    <el-button type="primary">添加客户</el-button>
                    <el-button type="primary">批量导入</el-button>
                    <el-button type="primary">导入模板下载</el-button>
                    <el-button type="primary">导出客户</el-button>
                    <el-button type="warning">分配</el-button>
                    <el-button type="warning">查看地图</el-button>
                    <el-button type="warning">+新增</el-button>
                </el-col>
                <el-col :span="12" class="tr">
                    <el-button >
                        <i class="el-icon-edit"></i>
                        <span>修改</span>
                    </el-button>
                    <el-button type="danger">
                        <i class="el-icon-delete"></i>
                        <span>删除</span>
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
                    prop="name"
                    label="所属公司"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="work"
                    label="主营业务"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="账户余额"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="认证状态"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="miles"
                    label="运输里程数"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="contacts"
                    label="联系人"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="tel"
                    label="联系电话"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="bankNumber"
                    label="银行卡号"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="100"
                    fixed="right"
                    >
                   <template >
                        <el-button size="mini" class="mr" 
                            @click="detail"
                        >详情</el-button>
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
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import {post} from "@/utils/http"
import { mapState } from 'vuex';
import {clear} from '@/utils/auth'
    export default {
        components:{
            BreadCrumb,
        },
        data(){
            return{
                input:{
                    No:"",
                    name:"",
                    tel:""
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
                this.input.tel=""
            },
            //获取表单数据
            getTable(){
                this.loading=true
                post("/customer",{...this.pageDate}).then(({data})=>{
                    this.loading=false
                    console.log(data)
                    this.tableData=data.list
                    this.tableData.map((item)=>{
                        item.miles =item.miles+'公里'}
                        )
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
           //把表格行的数据传给vuex
            detail(){
                this.$router.push("/customer/detail")
            },
        },
        activated(){
            if(this.fromDetail){
                this.getTable()
            }
        },
       beforeRouteEnter(to,from,next){
            to.meta.keepAlive=true
            next()
       },
        beforeRouteLeave(to,from,next){
            if(to.path=="/customer/detail"){
                    from.meta.keepAlive=true
                }else{
                    from.meta.keepAlive=false
                    clear(this)
                }
                next()
        },
        computed:{
            ...mapState(["fromDetail"])
        } 
    }
</script>

<style lang="less" scoped>

</style>