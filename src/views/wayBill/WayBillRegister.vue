<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">       
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    <el-form-item label="客户单号" prop="No">
                            <el-input v-model="form.No"></el-input>
                        </el-form-item>
                        <el-form-item label="件数"
                        prop="count"
                        >
                            <template>
                                <el-input-number v-model="form.count" controls-position="right" :min="1"></el-input-number>
                            </template>
                        </el-form-item>  
                        <el-form-item label="起始城市"
                        prop="start"
                        >
                            <city-area :label="'start'" v-model="form.start"
                            ref="city1"
                            ></city-area>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="货物名称" prop="cargo">
                            <el-input v-model="form.cargo"></el-input>
                        </el-form-item>
                        <el-form-item label="运费" prop="price">
                            <el-input v-model="form.price"></el-input>
                        </el-form-item>
                        <el-form-item label="订单来源"
                        prop="from"
                        >
                            <template>
                               <el-radio-group v-model="form.from">
                                    <el-radio  label="1">移动端</el-radio>
                                    <el-radio  label="2">pc端</el-radio>
                               </el-radio-group>
                            </template>
                    </el-form-item>
                    <el-form-item label="目的城市"
                        prop="end"
                        >
                            <city-area :label="'end'" v-model="form.end"
                            ref="city2"
                            ></city-area>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="tc">
                    <el-button type="primary" @click="save" :disabled="disabled">立即创建</el-button>
                    <el-button @click="clear">{{'\u00a0 重置 \u00a0'}}  </el-button>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { post } from '@/utils/http';
import CityArea from '@/views/orders/CityArea.vue'
import {mapState } from 'vuex';
    export default {
        components:{
            BreadCrumb,
            CityArea,
        },
        data(){
            return {
                form:{
                    name:"",
                    cargo:"",
                    No:"",
                    count:1,
                    start:"",
                    end:"",
                    from:"",
                    price:""
                },
                rules:{
                    name:[
                        {required:true,message:"请输入公司名称"}
                    ],
                    cargo:[
                        {required:true,message:"请输入货物名称"}
                    ],
                    No:[
                        {required:true,message:"请输入客户单号"}    
                    ],
                    from:[ 
                        { required: true, message: '请选择货物来源',trigger: 'change'}
                    ],
                    start:[ 
                        { required: true, message: '请选择起始城市',trigger: 'change'}
                    ],
                    end:[ 
                        { required: true, message: '请选择目的城市',
                        trigger: 'change'}
                    ],
                    price:[ 
                        { required: true, message: '请输入运费'},
                        {pattern:/^[1-9]{1}\d*$/,message:'必须是纯数字,且不能以0开头',trigger:'blur'}
                    ]
                },
                disabled:false
            }
        },
        methods:{
            save(){
                this.disabled=true
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        post("/wayBillRegister",this.form).then((res)=>{
                            console.log(res)
                            this.disabled=false
                            this.$message({
                                message:"创建成功",
                                type:'success'
                            })
                        this.$refs.form.resetFields()
                        this.$refs.city1.value1="" ;
                        this.$refs.city2.value2="" ;  
                        }
                        )
                    }else{
                        this.disabled=false
                    }
                })
            },
            clear(){
              
                this.$refs.form.resetFields()
                this.$refs.city1.value1="" ;
                this.$refs.city2.value2="" ;
                console.log(this.$refs.city)
            },
        },
        computed:{
            ...mapState(['value1','value2']),
        },
        watch:{
            value1(){
                this.form.start=this.value1
                if(this.value1){
                    this.$refs.form.validateField("start")
                }
            },
            value2(){

                this.form.end=this.value2
                if(this.value2){
                    this.$refs.form.validateField("end")
                }
                console.log(this.$refs.form.model)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>