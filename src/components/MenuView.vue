<template>
    <div>
       <el-submenu v-if="menu.children" :index="menu.url" class="item">
            <template slot="title">
                <i :class="menu.icon"></i>
                <span slot="title">{{ menu.name }}</span>
            </template>
            <!-- 递归 -->
            <nav-menu v-for="(item,index) in menu.children" 
                     :key="index"
                     :menu="item"
            ></nav-menu >
        </el-submenu>
       <el-menu-item v-else :index="menu.url" class="item">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.name }}</span>
       </el-menu-item>
    </div>
</template>

<script>
    export default {
        props:{
            menu:{
                type:Object,
                required:true
            }
           
        },
        name:"NavMenu"//组件自己调用自己才有用
    }
</script>

<style lang="less" scoped>
.item{width: 200px;}
</style>