 import Mock from "mockjs"
// //Mock.mock("地址","请求方式","回调函数")

// // function parseQueryString(url) {
// //     const queryString = url.split('?')[1]
// //     if (!queryString) {
// //       return {}
// //     }
// //     return queryString.split('&').reduce((params, param) => {
// //       const [key, value] = param.split('=')
// //       params[key] = decodeURIComponent(value)
// //       return params
// //     }, {})
// //   }

// // Mock.mock("http://localhost:8080/login?username=.+&password=.+","get",(req)=>{
// //     const {username,password}=parseQueryString(req.url)
// //     // const {username,password} = JSON.parse(req.body);
// //     if(username=="admin"&&password==123456){
// //         return {
// //             code:200,
// //             success:true,
// //             message:"登录成功",
// //             token:"ncjsdncjsdncjksdvbnjksd",
// //             nikename:"赵铁柱"

// //         }
// //     }else{
// //         return{
// //             code:100,
// //             success:false,
// //             message:"账号或者密码有误"
// //         }
// //     }
// // //  console.log(req)

// // })
// //模拟延时
// Mock.setup({
//     timeout:500
// })
// //登录接口
// Mock.mock("http://localhost:8080/login","post",(req)=>{
   

//      const {username,password} = JSON.parse(req.body);
//     if(username=="admin"&&password==123456){
//         return {
//             code:200,
//             success:true,
//             message:"登录成功",
//             token:"ncjsdncjsdncjksdvbnjksd",
//             nikename:"赵铁柱"

//         }
//     }else{
//         return{
//             code:100,
//             success:false,
//             message:"账号或者密码有误"
//         }
//     }

  
// })
// //  console.log(req)
// //入职日期接口
// Mock.mock("http://localhost:8080/in","get",()=>{
//     return {
//         code:200,
//         success:true,
//         message:"请求成功",
//         time:"2020-07-01 00:00:00"
//     }
// })

Mock.mock("http://localhost:8081/pie","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:{
            "苹果":243,
            "橘子":433,
            "香蕉":312,
            "橙子":73,
            "火龙果":876,
            "荔枝":342,
            "山竹":334,
        } 
    }
})

const workTime=[
    {
        name:"小王",
        time:"2020-03-01 08:10:36",
        work:"审核订单"
    },
    {
        name:"小李",
        time:"2020-03-01 09:32:37",
        work:"删除订单"
    },
    {
        name:"小刘",
        time:"2020-03-01 09:41:37",
        work:"新增订单"
    },
    {
        name:"小宋",
        time:"2020-03-01 09:43:47",
        work:"修改订单"
    },
    {
        name:"小钱",
        time:"2020-03-01 09:46:12",
        work:"修改订单"
    },
    {
        name:"小红",
        time:"2020-03-01 09:47:12",
        work:"新增订单"
    },
    {
        name:"小宋",
        time:"2020-03-01 09:47:52",
        work:"删除订单"
    },
    {
        name:"小周",
        time:"2020-03-01 09:57:41",
        work:"审核订单"
    },

]

Mock.mock("http://localhost:8081/make","post",(req)=>{
let {num} = JSON.parse(req.body);
    num=Number(num)+5
const arr=workTime.slice(0,num)
if(num>=workTime.length){
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:arr,
        info:"没有更多数据了"
    }
}    
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:arr
    }
})

