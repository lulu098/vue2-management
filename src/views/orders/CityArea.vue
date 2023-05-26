<template>
    <div>
      <!-- 根据父组件的:label值切换提示内容 -->
        <el-cascader :options="options" clearable
        placeholder='请输入起始城市'
        @focus="getProvince"
        v-loading="loading"
        v-model="value1"
        v-if="label=='start'"
        ></el-cascader>
        <el-cascader :options="options" clearable
        placeholder='请输入目的城市' 
        @focus="getProvince"
        v-loading="loading"
        v-model="value2"
        v-else
        ></el-cascader>
    </div>
   
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
    export default {
        data() {
          return {
            options: [],
            loading:false,
            value1:"",
            value2:""
          }
        }, 
       created(){
        // this.getProvince()
        },
       methods:{
        //获得焦点的时候请求数据
          getProvince(){
              this.loading=true
               axios.get("https://restapi.amap.com/v3/config/district",{params:{key:"418bf3be7596df8ab07171db6264b812",keywords:"中国",subdistrict:2,page:1}}).then((res)=>{
                this.loading=false
                const list=res.data.districts[0]
                 this.options=fn(list)
               }) 
               function fn(obj){ 
                     const result = obj.districts.reduce((sum,item)=>{
                            const a={}
                            a.value=item.name
                            a.label=item.name
                            if(item.districts.length){
                              a.children= fn(item)
                            }
                            sum.push(a)
                            return sum
                        },[])
                      return result
                  }
            },
            // 将双向绑定的value发往父组件，以便正则判断和向后台发数据
          ...mapMutations(["getValue1"]),
          ...mapMutations(["getValue2"])
        },
        watch:{
          value1(){
            this.getValue1(this.value1)
          },
          value2(){
            this.getValue2(this.value2)
          },
        },
      // 接受父组件传来的label值切换提示内容
      props:['label'] 

    }
</script>

<style lang="less" scoped>

</style>