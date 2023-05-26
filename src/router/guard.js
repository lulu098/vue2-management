import router from ".";
import { getToken } from "@/utils/auth";
import authRoute from "./authRoute";
import store from "@/store/index"
router.beforeEach(async (
    to,from,next
)=>{
    const hasToken=getToken();
    if(hasToken){
       await store.dispatch('getRole')
        if(to.path=="/Login"){
            next("/")
        }else{
           
            if(to.name==null){
               let f= authRoute.filter((item)=>{
                console.log(item)
              return  item.meta.auth.includes(store.state.role)})
              console.log(f)
                for(let i=0;i<f.length;i++){
                    router.addRoute(
                        f[i]
                    )
                }
                // 因为跳转会发生在添加成功之前，需要用to来反复执行
                next({...to,replace:true})
               
            }else{
                next()
            }
           
        }
    }else{
        if(to.path=="/Login"){
            next()
        }else{
            next("/Login")
        }
    }
   
})