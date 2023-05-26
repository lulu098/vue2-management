<template>
    <div>
        <el-container>
            <el-aside width="200px" class="aside">
                <nav-left></nav-left>
            </el-aside>
                <el-container class="main">
                    <el-header class="head">
                        <top-header></top-header>
                    </el-header>
                        <el-main>
                            <keep-alive> 
                                <router-view v-if="$route.meta.keepAlive"></router-view>
                            </keep-alive>
                               <router-view v-if="!$route.meta.keepAlive"></router-view>
                        </el-main>
                    <el-footer class="box">备案号</el-footer>
                </el-container>
        </el-container>
    </div>
</template>

<script>
import NavLeft from '@/components/NavLeft.vue';
import TopHeader from '@/components/TopHeader.vue';
    export default {
        components:{
    NavLeft,
    TopHeader,
},


    }
</script>

<style lang="less" scoped>
.head{
    line-height: 60px;
    box-shadow: 0 2px 2px rgba(0,21,41,0.2);

}
.aside{
    background-color: #001529;
    height: 100vh;
}
.main{
    height: 100vh;
}
.el-footer{
    border-top: solid 2px rgba(185, 185, 185, 0.5);
    text-align: center;
    line-height: 60px;
    background-color: #d0dfec;
}
.el-main{
    background-color: #d0dfec;
}
</style>