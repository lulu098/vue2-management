<template>
    <div>
        <el-dialog :title="title"
         :visible="orderStatus"
         @close="cancel"
         :destroy-on-close="true"
        
         >
         <el-row :gutter="20">
            <el-form :model="form" ref="form" :rules="rules" >
                <el-col :span="12">
                    <el-form-item label="联系人/电话" :label-width="formLabelWidth"
                    prop="contacts"
                    >
                        <el-input v-model="form.contacts"></el-input>
                    </el-form-item>
                    <el-form-item label="注册时间" :label-width="formLabelWidth"
                    prop="registerTime"
                    >
                    <el-date-picker
                        v-model="form.registerTime"
                        type="month"
                        placeholder="选择注册时间">
                    </el-date-picker>
                    </el-form-item>
                    <el-form-item label="承运商名称" :label-width="formLabelWidth"
                    prop="name"
                    >
                        <template>
                            <el-select v-model="form.name" 
                            placeholder="请选择">
                                <el-option
                                v-for="item in form.nameSlect.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="注册地址" :label-width="formLabelWidth"
                    prop="address"
                    >
                        <city-area :label="'start'" v-model="form.address"
                        :startValue="form.address"
                        ref="city1"
                        ></city-area>
                    </el-form-item>
                    <el-form-item label="是否上报" :label-width="formLabelWidth"
                    prop="report"
                    >
                        <template>
                            <el-radio v-model="form.report" :label="1"
                            >是</el-radio>
                            <el-radio v-model="form.report" :label="2">否</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="信用分" :label-width="formLabelWidth"
                    prop="creditGrade"
                    >
                        <el-input v-model="form.creditGrade"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
         </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
 import { post } from "@/utils/http";
import {  mapMutations, mapState } from "vuex";
import CityArea from "@/views/orders/CityArea.vue"
    export default {
        props:["orderStatus"],
        components:{
            CityArea 
        },
        data() {
            return {
                title:"编辑发车数据单",
                //表格每项的值
                form: {
                    name:"",
                    nameSlect:{
                        value:"",
                        options: [{
                            value: '选项1',
                            label: '顺丰快递运输'
                            }, {
                            value: '选项2',
                            label: '韵达快递运输'
                            }, {
                            value: '选项3',
                            label: '中通快递运输'
                            }, {
                            value: '选项4',
                            label: '申通快递运输'
                            }, {
                            value: '选项5',
                            label: '京东快递运输'
                        }],
                    },
                    address:"",
                    contacts:"",
                    report:"",
                    registerTime:"",
                    creditGrade:""
                },
                //正则校验
                rules:{
                    name:[ 
                        { required: true, message: '请选择公司名称'}
                    ],
                    address:[ 
                        { required: true, message: '请选择注册地址'}
                    ],
                    contacts:[ 
                        { required: true, message: '请输入联系人及电话'}
                    ],
                    report:[ 
                        { required: true, message: '请选择是否上报'}
                    ],
                    registerTime:[ 
                        { required: true, message: '请选择注册时间'}
                    ],
                    creditGrade:[ 
                        { required: true, message: '请输入信用分'},
                        {pattern:/^[1-9]{1}\d*$/,message:'必须是纯数字,且不能以0开头',trigger:'blur'}
                    ]
                },
                formLabelWidth: '120px',
            };
        },
        methods:{
            //保存表格每项信息内容发给后台
            save(){
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        post("/addOrder",this.form).then((res)=>
                            {console.log(res)
                           this.$emit("status",false)
                           this.$notify({
                                title:'编辑成功',
                                type:"success"
                            })
                        })
                    }

                })
            },
            //取消新建订单，发false给父组件，通过statu函数改变父组件orderStatus的值
            ...mapMutations(["clearRow",]),
            cancel(){
                this.$emit("status",false)
                this.$refs.form.resetFields()
                this.clearRow()
            },
        },
        computed:{
            ...mapState(['rowList','value1'])
        },
        watch:{
            orderStatus(){
                const {name,registerTime, contacts,address,report,creditGrade}=this.rowList
                    this.form.name=name
                    this.form.registerTime=registerTime
                    this.form.contacts=contacts
                    this.form.report=report
                    this.form.creditGrade=creditGrade
                    if(name){
                        this.form.address=address.split(" ")
                        console.log( this.form.address)
                        this.$nextTick(()=>{
                            this.$refs.city1.value1= this.form.address
                            this.$refs.city1.$el.children[0].children[0].children[0].placeholder="请输入注册地址"
                        })
                       
                    }else{
                        this.form.address=""
                    }
              
            },
            //检测Vuex数据变动对表格进行赋值重新验证
            value1(){
                console.log(this.value1)
                this.form.address=this.value1
                if(this.value1){
                    this.$refs.form.validateField("address")
                }
            }
        }
            
    }
</script>

<style lang="less" scoped>

</style>