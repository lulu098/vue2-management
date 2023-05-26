<template>
    <div >
        <!-- 最上方的四个卡片 -->
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card class="box-card1">
                   <div class="fl">
                        <div class="item">本月进件</div>
                        <div class="item">6588</div>
                        <div class="item">+20.12% 
                            <span>与上个月同比</span>
                        </div>
                   </div>
                   <div class="fr">
                        <i class="el-icon-tickets"></i>
                   </div>
                   <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card2">
                   <div class="fl">
                        <div class="item">本月放款(元)</div>
                        <div class="item">12897</div>
                        <div class="item">+1.25% 
                            <span>与上个月同比</span>
                        </div>
                   </div>
                   <div class="fr">
                        <i class="el-icon-date"></i>
                   </div>
                   <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card3">
                   <div class="fl">
                        <div class="item">累计进件</div>
                        <div class="item">12800</div>
                        <div class="item">+11.48% 
                            <span>与去年同比</span>
                        </div>
                   </div>
                   <div class="fr">
                        <i class="el-icon-finished"></i>
                   </div>
                   <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card4">
                   <div class="fl">
                        <div class="item">累计放款</div>
                        <div class="item">32423221</div>
                        <div class="item">-2.48% 
                            <span>与去年同比</span>
                        </div>
                   </div>
                   <div class="fr">
                        <i class="el-icon-document-remove"></i>
                   </div>
                   <div class="clear"></div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 中间的数据分析图 -->
        <el-row :gutter="10" class="mt">
            <el-col :span="18">
                <el-card>
                    <div slot="header" class="title">进件统计分析</div>
                    <div  ref="line" class="chart"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header" class="title">进件产品占比</div>
                    <div  ref="pie" class="chart"></div>
                </el-card>
            </el-col>
        </el-row>
        <!--  下面的两个卡片-->
        <el-row :gutter="10" class="mt" >
            <el-col :span="12" class="workList">
                <el-card>
                    <div class="block">
                        <el-timeline>
                            <el-timeline-item 
                            v-for="(item,index) in workList"
                            :key="index"
                            :timestamp="item.time.substr(0,10)" 
                            placement="top">
                                <el-card>
                                    <h4>{{ item.work }}</h4>
                                    <p>{{ item.name }} 提交于 {{ item.time }}</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                    <div class="more">
                        <span v-if="info" :style="{color:'#333'}">没有更多了~~~</span>
                        <span @click="moreWork" v-else>查看更多</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <el-calendar v-model="value">
                    </el-calendar>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import {get,post} from '@/utils/http';

//1.准备一个容器
//2.写图标配置项
//3.调用方法
    export default {
        data(){
            return{
                value: new Date(),
                workList:[],
                info:""
            }
        },
       mounted(){
        //折线图函数调用
            this.lineChart()
        //饼图函数调用
            this.pieChart()
        //获取业务员操作数据 
            this.workData()
        },
     
        
        methods:{
           async lineChart(){
               let myChart=echarts.init(this.$refs.line);
                const {data}= await get("/line")
                //图表配置
                myChart.setOption({
                tooltip: {
                    trigger:"axis"
                 },//坐标轴触发提示框
                xAxis: {
                    data: Object.keys(data),
                    boundaryGap: false,
                }, 
                yAxis: {
                    axisLine: { //轴线
                        show: true
                    },
                    axisTick: {
                        show: true  //坐标轴刻度线
                    },
                    splitLine:{ //网格线
                        show:true,
                        lineStyle:{
                            color:"#333",
                        }
                       
                    },
                },
                series: [
                    {
                    smooth:true,
                    name: '销量',
                    type: 'line',
                    data: Object.values(data),
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: " #4f88ff"
                        },
                        {
                            offset: 1,
                            color: 'white'
                        }
                        ])
                    }
                    }
                ]
                });
            },
            async pieChart(){
               let myChart=echarts.init(this.$refs.pie);
                let {data}= await get("/pie")
                data=Object.entries(data).reduce((sum,now)=>{
                    let a={}
                    a.name=now[0]
                    a.value=now[1]
                    sum.push(a)
                    return sum
                },[])
                //图表配置
                myChart.setOption ({
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center'
                    },
                    series: [
                        {
                        name: 'Fruit Species',
                        type: 'pie',
                        radius: ['50%', '80%'],
                        center:['50%','60%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: 30,
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data:data
                        }
                    ]
                    });
            },
            workData(){
                sessionStorage.removeItem("num")
                post("/make",{num:0}).then(({data})=>{
                    this.workList=data.reverse()
                    sessionStorage.setItem("num",this.workList.length)
                })
            },
            //点击查看更多
            moreWork(){
                const num=sessionStorage.getItem("num")
                post("/make",{num}).then((res)=>{
                    this.workList=res.data.reverse()
                    this.info=res.info
                    sessionStorage.setItem("num",this.workList.length)
                })
                
            }
        }
    }
</script>

<style lang="less" scoped>
    .box-card1{
        background-color: #569ff5;
    }
    .box-card2{
        background-color: #56eaf5;
    }
    .box-card3{
        background-color: #9356f5;
    }
    .box-card4{
        background-color: #f556bd;
    }
    .item{
            color: #fff;
            padding: 5px 0;
            span{font-size: 12px;}
        }
    i{
        font-size: 93px;
        color:rgba(255, 255, 255, 0.4);
    }
    
    .title{
        text-align: center;  
    }
    .chart{
        height: 400px;
    }
    .workList{
        height: 700px;
        overflow: auto;
        .more{
        text-align: center;
        span{
            background-color: #fff;
            color: #569ff5;
        }
    }
    }
    
</style>