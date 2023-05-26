<template>
    <div>
        <bread-crumb></bread-crumb>
       <el-card>
            <el-row :gutter="20">
                <el-col :span="12">
                    <template>
                        <div class="demo-fit">
                            <div class="block">
                                <span class="title"></span>
                                <el-avatar shape="square" :size="100" :fit="fit" :src="url"></el-avatar>
                            </div>
                        </div>
                    </template>
                </el-col>
               <el-col :span="12">
                    <el-form ref="form" status-icon :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="新密码"
                                    prop="password1"
                        >
                            <el-input v-model="form.password1" show-password  ></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码"   prop="password2">
                            <el-input v-model="form.password2" show-password  ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit">确认修改</el-button>
                            <el-button @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
               </el-col>
            </el-row>
       </el-card>
       
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
    export default {
        components:{
            BreadCrumb,
        },
        data() {
            var checkPassword=(rule, value, callback) => {
                   if (value !== this.form.password1) {
                    callback(new Error('两次输入密码不一致!'));
                    } else {
                    callback();
                    }
                }
                return {
                fit:'fill',
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                form:{
                    password1:"",
                    password2:""
                },
                rules:{
                    password1:[
                        {required: true, message: '请输入密码名称', trigger: 'blur'},
                        {pattern:/^\d{6}$/,message: '密码必须是6位数字', trigger: 'blur'}
                    ],
                    password2:[
                        {required: true, message: '请输入密码名称', trigger: 'blur'},
                        { validator: checkPassword, trigger: 'blur' }
                    ],
                }
            }
            },
        methods:{
            submit(){
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    }
                })
            },
            reset(){
                this.$refs.form.resetFields()
            }
        }
  
    }
</script>

<style lang="less" scoped>

</style>