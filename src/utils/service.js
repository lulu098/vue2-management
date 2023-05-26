import axios from "axios";
import { Message } from 'element-ui';
import { getToken } from "./auth"
const service=axios.create({
    baseURL:"http://localhost:8081",
    //请求超时时间
    timeout:5000 
})

//请求拦截器 修改发送请求时传输的数据
service.interceptors.request.use((config)=>{
   if(getToken()){
    config.headers.token=getToken()
   }
    return config
},()=>{
    Message({
        type:"error",
        message:"请求错误"
    })
    return Promise.reject( new Error("请求错误"))
})

// 响应拦截器 对请求完成后的结果数据进行处理

service.interceptors.response.use((res)=>{
    const result=res.data;
    if(result.success){
        return result
    }else{
        Message({
            type:"error",
            message:result.message || "请求错误"
        })
        return Promise.reject( new Error(result.message || "请求错误"))
    }
},()=>{
    Message({
        type:"error",
        message:"请求错误"
    })
    return Promise.reject( new Error("请求错误"))
}

)
export default service