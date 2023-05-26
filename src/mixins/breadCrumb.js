export default {
    data(){
       return{
        breadList:[]
       } 
    },
    created(){
        this.getBread()
    },
    methods:{
        getBread(){
            this.breadList=this.$route.meta.bread || []
        }
    }
}