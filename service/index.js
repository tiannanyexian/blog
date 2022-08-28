const express = require("express");
const app = express();
app.listen(4001, ()=>{
    console.log("启动后端服务，开始监听4001端口");
});

//连接数据库
require("./middleware/mongoose");

//配置基础中间件
app.use(require("./middleware/cors")); //允许跨域
app.use(require("./middleware/session"))//session
app.use(express.json()); //对提交的数据进行格式化处理
app.use(express.urlencoded({extended:true})); //提前处理请求传过来的数据

//监听路由中间件
app.use("/", require("./router/index"));

// 静态资源服务器
app.use(express.static("./public"))

/* 
    session  服务端，默认是存在内存里
    cookie   客户端

    1. 用户登录成功后，在服务端接收到的request中设置session里的内容
    2. session配置中，要给cookie里添加一条关键数据
    3. 当每次发起请求时，cookie过来到后端时，session会去识别cookie里面有没有对应的数据
*/


