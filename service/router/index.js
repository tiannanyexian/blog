const express = require("express");
const router = express.Router();
// console.log(router);
// router.post("/reg",(req,res)=>{
// 	console.log(1);
//     res.send("注册的数据收到了"); 
// });
//注册路由
router.use("/reg",require("./register/reg"))
//登录路由
router.use("/log",require("./login/log"))
//修改信息
router.use("/personal",require("./personal/index"))
//留言评论
router.use("/msg",require("./msg/index"))
//监听获取评论/文章数据的路由
router.use("/getdata",require("./getData/index"))
//监听后台管理的路由
router.use("/administer",require("./admin/index"))


module.exports = router;