/**
 * 登录路由的逻辑处理
 */
const express = require("express");
const router = express.Router();

const userDB = require("../../datadb/user"); //userinfo表的操作对象
const visitorDB = require("../../datadb/visitor"); //visitor表的操作对象
// console.log(router);

//添加或修改访客信息
// async function visitor(id){
// 	//判断ID是否存在,存在就更改时间,不存在就添加访客信息
// 	let doc=await visitorDB.findOne({visitor:id})
// 	// console.log(doc);
// 	if (doc) {
// 		await visitorDB.findByIdAndUpdate({visitor:id},{date:Date.now()})
// 	} else{
// 		await visitorDB.create({
// 			visitor:id
// 		})
// 	}
// }

//添加访客
async function addVisitor(userID){
    //通过id查找访客数据
    let doc = await visitorDB.findOne({visitor:userID});
	// console.log(doc,"==============");
    if(doc){
        //如果表中存在该id对应的访客数据，更新你的访问时间为当前时间
        await visitorDB.findOneAndUpdate({visitor:userID}, {date:Date.now()});
		// await visitorDB.update({_id:doc._id},{date:Date.now()})
		// console.log(222);
    }else{
        //如果表中不存在该访客数据，添加访客到表中
		
        await visitorDB.create({visitor:userID});
		
    }
}


router.post("/", async (req, res) => {
	let {
		user,
		password
	} = req.body;
	//字符验证
	if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user) && /^[a-zA-Z]\w{5,17}$/.test(password)) {
		let userDoc = await userDB.findOne({
			user
		})

		if (!userDoc) {
			return res.send({
				code: 1,
				message: "用户名不存在，请先注册！"
			});
		} else {
			if (userDoc.password === password) {
				let userInfo={//存储登录账号信息
					_id:userDoc._id,
					user:userDoc.user,
					photo:userDoc.photo,
					admin:userDoc.admin
				}
				req.session.userInfo=userInfo//信息存到session
				addVisitor(userInfo._id)
				res.send({
					code: 0,
					message: "登录成功！",
					data:userInfo
				});
			} else {
				res.send({
					code: 2,
					message: "密码错误！"
				});
			}

		}
	} else {
		res.send({
			code: 3,
			message: "你发过来的数据格式不规范"
		});
	}


});
//检测是否登录
router.post("/isCheck",(req,res)=>{
	// console.log("----isCheck----", req.session, "----isCheck----");
	   let data = req.session.userInfo; 
	//    console.log(data);
	   if(data){
		   addVisitor(req.session.userInfo._id)
	       //已登录
	        res.send({
	            code:0,
	            msg: "已经登录",
	            data
	        })
	   }else{
	       //未登录
	        res.send({
	            code:1,
	            msg:"未登录",
	            data:{}
	        })
	   }
	
	
})

//退出登录
router.post("/out",(req,res)=>{
	req.session.destroy()//销毁session
	res.send({
		code:0,
		message:"退出登录成功"
	})
})
module.exports = router
