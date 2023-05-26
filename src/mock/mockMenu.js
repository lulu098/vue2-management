import Mock from "mockjs";
//模拟网络请求延时
Mock.setup({
    timeout:500
})
//登录接口
Mock.mock("http://localhost:8081/login","post",(req)=>{
    //请求对象
   const {username,password} = JSON.parse(req.body);
   //根据用户名和密码查询数据库,查询出数据返回给前端
    if(username=="admin"&&password==123456){
        return{
            code:200,
            success:true,
            message:"登陆成功",
            token:"3arc9h0vhcr0f8iprpnscmfo8s",
            nickname:"赵铁柱",
            role:"boss"
        }
    }else{
          return{
            code:100,
            success:false,
            message:"账号或者密码有误"
          }  
    }
})
//入职日期接口
Mock.mock("http://localhost:8081/in","get",()=>{
    return{
            code:200,
            success:true,
            message:"请求成功",
            time:"2020-07-01 00:00:00"
    }
})
//菜单接口
const menuList = [
    {
        name: "首页",
        icon: "el-icon-s-home",
        url: "/index",
    },
    {
        name: "订单管理",
        icon: "el-icon-s-order",
        url: "/order",
        children: [
            {
                name: "订单列表",
                icon: "el-icon-user",
                url: "/orders/list",
            }
        ]
    },
    {
        name: "运单管理",
        icon: "el-icon-menu",
        url: "/waybill",
        children: [
            {
                name: "运单录入",
                icon: "el-icon-notebook-2",
                url: "/waybill/in",
            },
            {
                name: "运单列表",
                icon: "el-icon-truck",
                url: "/waybill/list",
            }
        ]
    },
    {
        name: "发车管理",
        icon: "el-icon-s-order",
        url: "/depart",
        children: [
            {
                name: "发车数据单",
                icon: "el-icon-tickets",
                url: "/depart/data",
            }
        ]
    },
    {
        name: "承运商管理",
        icon: "el-icon-user",
        url: "/carrier",
        children: [
            {
                name: "承运商列表",
                icon: "el-icon-chat-square",
                url: "/carrier/list",
            },
            {
                name: "车辆列表",
                icon: "el-icon-bank-card",
                url: "/carrier/trucks",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/carrier/driver",
            },
        ]
    },
    {
        name: "客户管理",
        icon: "el-icon-chat-dot-square",
        url: "/customer",
    },
    {
        name: "财务管理",
        icon: "el-icon-user",
        url: "/my",
        children: [
            {
                name: "客户对账单",
                icon: "el-icon-chat-square",
                url: "/customer/info",
            },
            {
                name: "承运商对账单",
                icon: "el-icon-bank-card",
                url: "/record",
            },
            {
                name: "司机对账单",
                icon: "el-icon-bank-card",
                url: "/driver",
            },
        ]
    },
    {
        name: "个人中心",
        icon: "el-icon-chat-dot-square",
        url: "/personal",
    },
]
Mock.mock("http://localhost:8081/menu","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:menuList
    }
})
//折线图图表接口
Mock.mock("http://localhost:8081/line","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:{
            "22-01":30,
            "22-02":84,
            "22-03":56,
            "22-04":47,
            "22-05":84,
            "22-06":61,
            "22-07":90,
        } 
    }
})
//订单管理-订单列表
Mock.mock('http://localhost:8081/orderList', 'post', (req) => {
    const { page, pageSize,keyword } = JSON.parse(req.body);
    console.log("接口接收到参数:",page,pageSize,keyword)//page 是点的第几页，pageSize是每页多少条
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{  //随机生成 pageSize份数据
                'id|+1': 10000,//订单号 顺序加1
                'status|1': [1,2,3,4],//订单状态 1待审核 2已审核 3审核通过 4审核拒绝
                'date': Mock.Random.date(),//下单时间  随机生成日期
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称  从数组中随机选一个
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数 从范围中随机选一个
                'unit|1': ["方","吨"],//单位
                "price":Mock.Random.integer(5000,50000),//运费
                "from|1":["移动端","pc端"],
                "pay|1":[1,2],//是否支付 1 已支付 2未支付     
            }],
            "total": 47  //告诉前端总数据条数
        })
    }
})
//订单管理-新建订单
Mock.mock('http://localhost:8081/addOrder',"post",(req)=>{
    console.log(JSON.parse(req.body))
    console.log(req.body.cargo)
    const  {name,start,end,cargo,count,unit,price,from,pay,tel,receipt} =JSON.parse(req.body);
    console.log("新建订单接口收到参数:",name,start,end,cargo,count,unit,price,from,pay,tel,receipt)
    return{
        code:200,
        success:true,
        message:"新建成功", 
    }
})
//运单管理-运单列表
Mock.mock('http://localhost:8081/waybillList', 'post', (req) => {
     const { page, pageSize,waybillNo,name,startDate,endDate,status } = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,waybillNo,name,startDate,endDate,status)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'no|+1': 10000,//订单号
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                "price":Mock.Random.integer(5000,50000),//运费
                "needRecive|1":[1,2],//需要接货 1需要 2不需要
                'plateNumber|1': ["京A12345","苏C66666","鲁B45678"],//车牌号
                 "driver":Mock.Random.cname(),
                 "tel|1":[18888888888,15577896554,15789654785,13698745269],
                 "percent|1":[37,22,89,65,80,74,56]
   
            }],
            "total": 47
        })
    }
})

Mock.mock('http://localhost:8081/wayBillRegister','post',(req)=>{
    console.log(req)
    return {
        code: 200,
        success: true,
        message: "成功",
    }
})

// 承运商
Mock.mock('http://localhost:8081/carrier', 'post', (req) => {
     const { page, pageSize,No,licence,contacts,truckstyle,registerTime, name,creditCode,address,report,creditGrade} = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,No,licence,contacts,truckstyle,registerTime, name,creditCode,address,report,creditGrade)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'No|+1': 10000,//编号id
                'registerTime': Mock.Random.date('yyyy-MM'),//注册时间
                'name|1': ["顺丰快递运输","韵达快递运输","中通快递运输","申通快递运输","京东快递运输"],//承运商名称
                "licence|+1":"D"+1000000000,//道路许可证
                "contacts|1":['张三'+18888888888,'张三'+15577896554,'张三'+15789654785,'张三'+13698745269],//联系人和电话
                "truckstyle":['自有车'],//车辆类型
               "creditCode|1":["91440000617403416T","91440300687566624M","91331082092812259F","914403000743520254"],//信用代码
               "address": Mock.Random.city(true),//注册地址
                "report|1":[1,2],//是否上报 1需要 2不需要
                "creditGrade|1":[37,22,89,65,80,74,56]//信用分
   
            }],
            "total": 47
        })
    }
})
//车辆
Mock.mock('http://localhost:8081/truck', 'post', (req) => {
     const { page, pageSize,No,licence,contacts,truckstyle,registerTime, name,creditCode,address,report,creditGrade} = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,No,licence,contacts,truckstyle,registerTime, name,creditCode,address,report,creditGrade)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'No|+1': 10000,//编号id
                'registerTime': Mock.Random.date('yyyy-MM'),//注册时间
                'name|1': ["顺丰快递运输","韵达快递运输","中通快递运输","申通快递运输","京东快递运输","无"],//承运商名称
                "licence|+1":"D"+1000000000,//道路许可证
                "contacts|1":['张三'+18888888888,'张三'+15577896554,'张三'+15789654785,'张三'+13698745269],//联系人和电话
                "truckstyle|1":['普通货车','专用货车','牵引车','挂车'],//车辆类型
               "creditCode|1":Mock.Random.date('yyyy-MM-dd'),//信用代码
               "address": Mock.Random.city(true),//注册地址
                "report|1":[1,2],//是否上报 1需要 2不需要
                "creditGrade|1":[37,22,89,65,80,74,56]//信用分
   
            }],
            "total": 47
        })
    }
})
//客户管理
Mock.mock('http://localhost:8081/customer', 'post', (req) => {
     const { page, pageSize,No,name,work,balance,status,miles,contacts,tel,bankNumber} = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,No,name,work,balance,status,miles,contacts,tel,bankNumber)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'No|+1': 101,//编号id
                'name|1': ["顺丰快递运输","韵达快递运输","中通快递运输","申通快递运输","京东快递运输","无"],//承运商名称
                'work|1':["纺织品出口",'风机运输','汽车运输','叶轮运输'],//主营业务
                'balance|+1':37289372,
                'status|1':['未认证','已认证'],
                'miles|+1':370,
                "contacts|1":['张三','李四','王五','赵六'],//联系人
                "tel|1":['13444444444','13455555555','13466666666','13477777777'],//车辆类型
               "bankNumber|+1":4323232243545462,//银行卡号
            }],
            "total": 47
        })
    }
})
//对账单
Mock.mock('http://localhost:8081/finance', 'post', (req) => {
     const { page, pageSize,No,name,work,balance,status,miles,contacts,tel,bankNumber} = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,No,name,work,balance,status,miles,contacts,tel,bankNumber)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'No|+1': 1001,//编号id
                'time':Mock.Random.date('yyyy-MM-dd'),//账单时间
                'name|1': ['张三','李四','王五','赵六'],//付款对象
                'billStatus|1':['未对账','已对账','核对中'],//账单状态
                'ticketStatus|1':['未开票','已开票'],//开票状态
                'pay|+1':12122,//支出金额
                'errorState|1':['是','否'],//异常状态
                'creatTime':Mock.Random.date('yyyy-MM-dd'),//创建时间
                'creator|1': ['张三','李四','王五','赵六']//创建人
            }],
            "total": 47
        })
    }
})

//根据token获取权限名字
Mock.mock('http://localhost:8081/getRole','get',()=>{
    return{
        code: 200,
        success: true,
        message: "成功",
        role:"user"
    }
})