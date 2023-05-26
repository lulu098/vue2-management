<template>
    <div>
        <el-row type="flex" justify="center" align="middle">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>邦达物流后台管理系统</h2>
                </div>
                <el-form 
                    :model="ruleForm" 
                    :rules="rules"
                     ref="ruleForm" 
                     label-width="80px" 
                     class="demo-ruleForm"
                     @keyup.enter.native="login"
                     >
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model.trim="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model.trim="ruleForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%;" 
                        @click="login"
                        :loading="loading"
                        >登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-row >
       
    </div>
</template>

<script>
   // import axios from "axios"
   import {post} from "@/utils/http"
   import {setToken} from "@/utils/auth"
   import { mapMutations } from "vuex"
    export default {
        data() {
            return {
                loading:false,
                ruleForm: {
                    username:'',
                    password:''
                },
                rules: {
                    username: [
                        {   
                            pattern:/^\w{4,8}$/,
                            message: '用户名要求4-8位数字字母组合', 
                            trigger: 'blur' 
                        },
                        {   
                            required:true,
                            message: '用户名不能为空', 
                            trigger: 'blur' 
                        }
                    ],
                    password: [
                        {   
                            required:true,
                            message: '密码不能为空', 
                            trigger: 'blur' 
                        },
                        {
                            pattern:/^\d{6}$/,
                            message: '密码必须是6位数字', 
                            trigger: 'blur' 
                        }
                    ]
                }
            }
        },
        methods:{
            login(){
               
                this.$refs.ruleForm.validate((valid)=>{
                    if(valid){
                        this.loading=true;
                        // axios({
                        //     url:"http://localhost:8080/login",
                        //     method:"post",
                        //    data:this.ruleForm
                        // }).then(res=>console.log(res))
                        //校验通过，执行登录逻辑
                        post("/login",this.ruleForm).then(res=>{
                            this.loading=false
                            setToken(res.token);
                            console.log(res)
                            sessionStorage.setItem("nickname",res.nickname)
                            this.setRole(res.role)
                            console.log(this.$store.state.role)
                            this.$router.push("/")
                        }).catch((error)=>{
                            this.loading=false
                            console.log(error)
                        })
                    }
                })
            },
            ...mapMutations(['setRole']),
            
        }
    }
</script>

<style lang="less" scoped>
    .el-row{height: 100vh}
    .box-card{
        width: 600px;
        h2{
            text-align: center;
        }
    }
</style>