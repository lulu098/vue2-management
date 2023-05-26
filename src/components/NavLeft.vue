<template>
    <div>
        <h1>邦达国际物流平台</h1>
        <el-menu  
            :router="true"
            background-color="#001529"
            text-color="#fff"  
        >
            <menus-view v-for="(item,index) in menuData"
                        :menu="item"
                        :key="index"
            >
            
            </menus-view>
        </el-menu>
       
    </div>
</template>

<script>
import MenusView from "./MenuView.vue";
import {get} from "@/utils/http"
    export default {
        created(){
           this.getMenu()
        },
        methods:{
         
            // 获取菜单项
          async  getMenu(){
                    let {data}= await get("/menu");
                   this.menuData=data
            }
        },
        data(){
            return{
                menuData:[]
            }
        },
        components:{
            MenusView
        }
        
    }
</script>

<style lang="less" scoped>
    h1{color: #fff;
    line-height: 50px;
    text-align: center;
    }
</style>