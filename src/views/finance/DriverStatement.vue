<template>
    <div>
       <bread-crumb></bread-crumb>
       <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="对账单号"
                              v-model="input.No">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="公司名称"
                              v-model="input.name">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="创建人"
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
                    label="对账单号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="账单时间"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="付款对象"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="billStatus"
                    label="账单状态"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="ticketStatus"
                    label="开票状态"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="pay"
                    label="支出金额"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="errorState"
                    label="异常状态"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="creatTime"
                    label="创建时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="creator"
                    label="创建人"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="100"
                    fixed="right"
                    >
                   <template slot-scope="scope">
                        <el-button  size="mini" 
                                    class="mr" 
                                    v-if="scope.row.billStatus=='未对账'||scope.row.billStatus=='核对中'"
                                    type="danger"
                                    >取消对账
                        </el-button>
                        <el-button  size="mini" 
                                    class="mr" 
                                    v-else-if="scope.row.billStatus=='已对账'&&scope.row.ticketStatus=='未开票'"
                                    type="primary"
                                    >开票
                        </el-button>
                        <el-button  size="mini" 
                                    class="mr" 
                                    v-else-if="scope.row.billStatus=='已对账'&&scope.row.ticketStatus=='已开票'"
                                    type="success"
                                    >已确认
                        </el-button>
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
                post("/finance",{...this.pageDate}).then(({data})=>{
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
        },
    }
</script>

<style lang="less" scoped>

</style>