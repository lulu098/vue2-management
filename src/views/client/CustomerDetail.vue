<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row>
                <el-col :span="12">
                    <p>
                        <span class="mr">运单编号:YG222138982310</span>
                        <span class="mr">创建日期:2022-1-1</span>
                        <span>审核员:张三</span>
                    </p>
                </el-col>
                <el-col :span="12" class="tr">
                    <el-button type="primary" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-steps :space="400" :active="2" align-center>
                <el-step title="未发货"></el-step>
                <el-step title="运输中"></el-step>
                <el-step title="已收货"></el-step>
                <el-step title="未完成"></el-step>
            </el-steps>
        </el-card>
        <el-card class="mt">
          <template>
                <el-row>
                    <el-col :span="24">
                        <h3>基础信息</h3>
                    </el-col>  
                </el-row>
                <el-row class="mt">
                    <el-col :span="6">
                        <span>客户名称:诺莱科技有限公司</span>
                    </el-col>
                    <el-col :span="6">
                        <span>是否是易燃易爆物品:不是</span>
                    </el-col>
                    <el-col :span="6">
                        <span>发货单据:暂未上传</span>
                    </el-col>
                    <el-col :span="6">
                        <span>客户下单时间:2000-08-20</span>
                    </el-col>  
                </el-row>
                <el-row class="mt">
                    <el-col :span="6">
                        <span>货物名称:口罩</span>
                    </el-col>
                    <el-col :span="6">
                        <span>结算方式:现付</span>
                    </el-col>
                    <el-col :span="6">
                        <span>接货单据:暂未上传</span>
                    </el-col>
                    <el-col :span="6">
                        <span>是否需要接货:不需要</span>
                    </el-col>  
                </el-row>
                <el-row class="mt">
                    <el-col :span="6">
                        <span>数量:8(吨)</span>
                    </el-col>
                    <el-col :span="6">
                        <span>运费:12000元</span>
                    </el-col>
                    <el-col :span="6">
                        <span>所属业务员:李四</span>
                    </el-col>
                </el-row>
          </template>
            <el-divider></el-divider>
            <template>
                <el-row>
                    <el-col :span="24">
                        <h3>运输信息</h3>
                    </el-col>  
                </el-row>
                <el-row class="mt">
                    <el-col :span="6">
                        <span>车牌号:京32332</span>
                    </el-col>
                    <el-col :span="6">
                        <span>司机电话:38428701883290</span>
                    </el-col>
                    <el-col :span="6">
                        <span>司机身份证号:4732879208390218430</span>
                    </el-col>
                    <el-col :span="6">
                        <span>预计运输时间:8天</span>
                    </el-col>  
                </el-row>
                <el-row class="mt">
                    <el-col :span="6">
                        <span>司机姓名:王五</span>
                    </el-col>
                    <el-col :span="6">
                        <span>司机地址:北京市朝阳区</span>
                    </el-col>
                    <el-col :span="6">
                        <span>所属公司:顺丰运输公司</span>
                    </el-col>
                    <el-col :span="6">
                        <span>违约金:47384元</span>
                    </el-col>  
                </el-row>
          </template>
          <el-divider></el-divider>
            <template>
                <el-row>
                    <el-col :span="24">
                        <h3>经办人信息</h3>
                    </el-col>  
                </el-row>
                <el-row class="mt">
                    <el-col :span="6">
                        <span>业务员:李留</span>
                    </el-col>
                    <el-col :span="6">
                        <span>审核员:张三</span>
                    </el-col>
                    <el-col :span="6">
                        <span>制单员:赵六</span>
                    </el-col>
                    <el-col :span="6">
                        <span>备注:无备注</span>
                    </el-col>  
                </el-row>
          </template>
        </el-card>
    </div>
</template>
<script>
// 引入面包屑子组件
import BreadCrumb from '@/components/BreadCrumb.vue';
import { mapMutations} from "vuex";
    export default {
        components:{
            BreadCrumb
        },
       
        methods:{
            back(){
                this.$router.push('/customer')
            },
            ...mapMutations(['getDetail']),
          
        },
        beforeRouteLeave(to,from,next){
            if(to.path=="/customer"){
                from.meta.isFromDetail=false
                this.getDetail(from.meta.isFromDetail)
            }else{
                from.meta.isFromDetail=true
                this.getDetail(from.meta.isFromDetail)
            }
            next()
        }
    }
</script>

<style lang="less" scoped>

</style>