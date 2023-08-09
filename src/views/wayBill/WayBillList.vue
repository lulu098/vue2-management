<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入运单号"
                              v-model="input.waybillNo">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入客户名称"
                              v-model="input.name">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <template>
                        <div class="block">
                            <el-date-picker
                            v-model="date"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']">
                            </el-date-picker>
                        </div>
                    </template>
                </el-col>
                <el-col :span="6" class="tr">
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
                <div>
                    <el-radio-group v-model="status.status" @change="getTable">
                    <el-radio-button label="1">全部运单(300)</el-radio-button>
                    <el-radio-button label="2">装货中(120)</el-radio-button>
                    <el-radio-button label="3">运输中(70)</el-radio-button>
                    <el-radio-button label="4">运单异常(10)</el-radio-button>
                    </el-radio-group>
                </div>
            </template>
        </el-card>
        <el-card >
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
                    prop="no"
                    label="运单号"
                    width="100">
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
                    prop="price"
                    label="运费"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="needRecive"
                    label="接货"
                    width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.needRecive==1">需要</span>
                        <span v-else>不需要</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="plateNumber"
                    label="车牌号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="driver"
                    label="司机姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="tel"
                    label="手机号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="percent"
                    label="运输进度"
                    width="180">
                   <template slot-scope="scope"> 
                    <el-progress :percentage="scope.row.percent"></el-progress></template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="180"
                    fixed="right"
                    >
                   <template slot-scope="scope">
                        <el-button size="mini" class="mr" 
                            @click="detail(scope.row)"
                        >详情</el-button>
                        <el-button type="danger" size="mini"
                            @click="revise(scope.row)"
                        >修改</el-button>
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
        <way-bill-model :orderStatus="orderStatus"
                        @status="saveStatus"
        ></way-bill-model>
    </div>
</template>

<script>
import moment from 'moment'
// 引入面包屑子组件
import BreadCrumb from '@/components/BreadCrumb.vue';
import { post } from '@/utils/http';
import myDate from '@/moment/moment'
import { mapState ,mapMutations} from 'vuex';
import WayBillModel from "@/views/wayBill/WayBillModel.vue"
    export default {
        components:{
            BreadCrumb,
            WayBillModel
        },
        data(){
            return{
                input:{
                    waybillNo:"",
                    name:"",
                },
                date:"",
                pageDate:{
                    page:1,
                    pageSize:10
                },
                loading:false,
                tableData:[],
                total:0,
                status:{
                    status:1
                },
                orderStatus:false
            }
        },
        created(){
            this.getTable()
        },
        methods:{
            //查询按钮点击
            search(){
                // 第一行是自己封装的moment
                console.log(myDate(this.date[0]))
                const startDate=this.date[0]?moment(this.date[0]).format('YYYY-MM-DD hh:mm:ss'):""
                const endDate=this.date[1]?moment(this.date[1]).format('YYYY-MM-DD hh:mm:ss'):""
                 post("/waybillList",{...this.input,startDate,endDate,...this.pageDate})
            },
               //重置按钮
               reset(){
                this.input.waybillNo=""
                this.input.name=""
                this.date=''
            },
            //获取表单数据
            getTable(){
                this.loading=true
                post("/waybillList",{...this.pageDate,...this.status}).then(({data})=>{
                    this.loading=false
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
            //详情跳转
            detail(){
                this.$router.push("/waybill/detail")
            },
            // 清除页面缓存
            clear(){
                let vnode = this.$vnode;
                let parentVonde = vnode && vnode.parent;
                if (
                    parentVonde &&
                    parentVonde.componentInstance &&
                    parentVonde.componentInstance.cache
                ) {
                    var key =
                    vnode.key == null
                        ? vnode.componentOptions.Ctor.cid +
                        (vnode.componentOptions.tag
                            ? `::${vnode.componentOptions.tag}`
                            : "")
                        : vnode.key;
                    var cache = parentVonde.componentInstance.cache;
                    var keys = parentVonde.componentInstance.keys;
                    if (cache[key]) {
                    this.$destroy();
                    // remove key
                    if (keys.length) {
                        var index = keys.indexOf(key);
                        if (index > -1) {
                        keys.splice(index, 1);
                        }
                    }
                    cache[key] = null;
                    }
                }
            },
            //vue获取数据
            ...mapMutations(['getRow']),
            revise(row){
                this.getRow(row)
                this.orderStatus=true
            },
             //子组件点保存，取消，叉号后更改订单状态
             saveStatus(m){
                this.orderStatus=m
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
            console.log(from.meta.keepAlive)
            if(to.path=="/waybill/detail"){
                    from.meta.keepAlive=true
                }else{
                    from.meta.keepAlive=false
                     this.clear()
     
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