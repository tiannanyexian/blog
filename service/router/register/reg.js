/**
 * 注册路由的逻辑处理
 */
const express = require("express");
const router = express.Router();

const userDB = require("../../datadb/user");//userinfo表的操作对象
// console.log(router);
router.post("/",async (req,res)=>{
	let {user,password}=req.body;
	//字符验证
	 if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user) && /^[a-zA-Z]\w{5,17}$/.test(password)){
		if(await userDB.findOne({user})){
			//用户名已存在
			res.send({
				code:1,
				message:"用户名已存在"
			});
		}else{
			//可以注册
			await userDB.create({user,password})
			res.send({
				code:0,
				message:"注册成功"
			});
		}
	}else{
		res.send({
			code:2,
			message:"数据不合理",
			data:{
				user,
				password
			}
		});
	}
	
     
});
module.exports=router
