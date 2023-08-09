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
                    <el-form-item label="公司名称" :label-width="formLabelWidth"
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
                    <el-form-item label="货物类型" :label-width="formLabelWidth"
                    prop="cargo"
                    >
                        <template>
                            <el-select v-model="form.cargo" 
                            placeholder="请选择">
                                <el-option
                                v-for="item in form.cargoSlect.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="件数" :label-width="formLabelWidth"
                    prop="count"
                    >
                        <template>
                            <el-input-number v-model="form.count" controls-position="right" :min="1"></el-input-number>
                        </template>
                    </el-form-item>
                    <el-form-item label="运费" :label-width="formLabelWidth"
                    prop="price"
                    >
                    <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="订单来源" :label-width="formLabelWidth"
                    prop="from"
                    >
                            <template>
                               <el-radio-group v-model="form.from">
                                    <el-radio  label="移动端">移动端</el-radio>
                                    <el-radio  label="pc端">pc端</el-radio>
                               </el-radio-group>
                            </template>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="起始城市" :label-width="formLabelWidth"
                    prop="start"
                    >
                        <city-area :label="'start'" v-model="form.start"
                        :startValue="form.start"
                        ref="city1"
                        ></city-area>
                    </el-form-item>
                    <el-form-item label="目的城市" :label-width="formLabelWidth"
                    prop="end"
                    >
                        <city-area :label="'end'" v-model="form.start"
                        :startValue="form.start"
                        :endValue="form.end"
                        ref="city2"
                        >
                        </city-area>
                    </el-form-item>
                    <el-form-item label="是否支付" :label-width="formLabelWidth"
                    prop="pay"
                    >
                        <template>
                            <el-radio v-model="form.pay" :label="1"
                            >已支付</el-radio>
                            <el-radio v-model="form.pay" :label="2">未支付</el-radio>
                        </template>
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
import CityArea from "./CityArea.vue"
// import { nextTick } from 'vue';
    export default {
        props:["orderStatus"],
        components:{
            CityArea 
        },
        data() {
            return {
                title:"新建订单",
                //表格每项的值
                form: {
                    name:"",
                    nameSlect:{
                        value:"",
                        options: [{
                            value: '选项1',
                            label: '诺来科技有限公司'
                            }, {
                            value: '选项2',
                            label: '辉华股份有限公司'
                            }, {
                            value: '选项3',
                            label: '川聚物流有限公司'
                            }, {
                            value: '选项4',
                            label: '成越材料有限公司'
                            }, {
                            value: '选项5',
                            label: '聚博纺织有限公司'
                        }],
                    },
                    cargo:"",
                    cargoSlect:{
                        value:"",
                        options: [{
                            value: '选项1',
                            label: '日用品'
                            }, {
                            value: '选项2',
                            label: '纺织品'
                            }, {
                            value: '选项3',
                            label: '生鲜'
                            }, {
                            value: '选项4',
                            label: '建材'
                            }, {
                            value: '选项5',
                            label: '电器'
                        }],
                    },
                    count:1,
                    price:"",
                    from:"",
                    start:"",
                    end:"",
                    pay:""
                },
                //正则校验
                rules:{
                    name:[ 
                        { required: true, message: '请选择公司名称'}
                    ],
                    cargo:[ 
                        { required: true, message: '请选择货物类型'}
                    ],
                    price:[ 
                        { required: true, message: '请输入运费'},
                        {pattern:/^[1-9]{1}\d*$/,message:'必须是纯数字,且不能以0开头',trigger:'blur'}
                    ],
                    from:[ 
                        { required: true, message: '请选择货物来源'}
                    ],
                    start:[ 
                        { required: true, message: '请选择起始城市'}
                    ],
                    end:[ 
                        { required: true, message: '请选择目的城市'}
                    ],
                },
                formLabelWidth: '120px',
            };
        },
    //     mounted(){
    //         nextTick(()=>{ console.log(this.$refs)})
           
    //     },
    //    updated(){
    //         console.log(this.$refs)
    //     },
        methods:{
            //保存表格每项信息内容发给后台
            save(){
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        post("/addOrder",this.form).then((res)=>
                            {console.log(res)
                           this.$emit("status",false)
                           this.$notify({
                                title:'新建成功',
                                type:"success"
                            })
                            if(this.title=="编辑订单"){
                                this.$notify({
                                title:'编辑成功',
                                type:"success"
                            }) 
                            }
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
            ...mapState(['rowList','value1','value2'])
        },
        watch:{
            orderStatus(){
                const {name,cargo, count,price,from,start,end,pay}=this.rowList
                    this.form.name=name
                    this.form.cargo=cargo
                    this.form.count=count || 1
                    this.form.price=price
                    this.form.from=from
                    this.title= name?"编辑订单":"新建订单"
                    if(name){
                        this.form.start=start.split(" ")
                        this.form.end=end.split(" ")
                        this.$nextTick(()=>{
                            this.$refs.city1.value1= this.form.start
                            this.$refs.city2.value2= this.form.end
                        })
                  
                    }else{
                        this.form.start=""
                        this.form.end=""
                    }
                    this.form.pay=pay
              
            },
            //检测Vuex数据变动对表格进行赋值重新验证
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
            } 
        }
            
    }
</script>

<style lang="less" scoped>

</style>