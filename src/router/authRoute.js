export default [
    {
        path:"/attendance",
        name:"attendance",
        component:()=>import("@/views/AuthView/AuthAttendance"),
        meta:{bread:["人事考勤"],auth:["boss","admin"]}
      },
    {
        path:"/salary",
        name:"salary",
        component:()=>import("@/views/AuthView/AuthSalary"),
        meta:{bread:["薪酬绩效"],auth:["boss","finance"]}
    },
     {
      path:"*",
      name:"NotFound",
      component:()=>import("@/views/NotFound.vue"),
      meta:{auth:["boss","admin","finance","user"]}
    }
    
  
]