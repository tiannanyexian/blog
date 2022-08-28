const express = require("express")
const router = express.Router()
const userDB = require("../../datadb/user"); //userinfo表的操作对象
const messageDB = require("../../datadb/message"); //message表的操作对象

//判断是否登录
router.use((req, res, next) => {
	// console.log(req.session);
	if (!req.session.userInfo) {
		// console.log(11);
		return res.send({
			code: 1,
			message: "请登录后再评论留言"
		})
	}
	next()
})
//发表留言路由
router.post("/publish", async (req, res) => {
	let {
		valMsg
	} = req.body
	valMsg = valMsg.trim() //去除首位空格
	//验证数据格式
	if (!valMsg || valMsg.length > 100) {
		return res.send({
			code: 2,
			message: "你的留言不规范"
		})
	}
	//将评论留言存储到数据库
	await messageDB.create({
		content: valMsg,
		author: req.session.userInfo._id
	})
	res.send({
		code: 0,
		message: "发表留言成功"
	})
})
//点赞路由
router.post("/likes/comment", async (req, res) => {
	let {
		id
	} = req.body
	if (!id) {
		res.send({
			code: 1,
			message: "留言ID为空"
		})
	}
	let commentDoc = await messageDB.findById(id) //留言数据
	if (!commentDoc) {
		res.send({
			code: 2,
			message: "留言数据查不到"
		})
	}
	let userId = req.session.userInfo._id
	if (commentDoc.likes.includes(userId)) {
		//如果likes里有用户id表示已点赞，删除id取消赞
		await messageDB.findByIdAndUpdate(id, {
			$pull: {
				likes: userId
			}
		})
	} else {
		//如果likes里没有用户id表示未点赞，添加id点赞
		await messageDB.findByIdAndUpdate(id, {
			$push: {
				likes: userId
			}
		})
	}
	res.send({
		code: 0,
		message: "操作成功！"
	})


})
//在父级评论下，提交回复内容
router.post("/reply/submit", async (req, res) => {
	//id父评论的id   content评论内容   replyUser父评论的作者id
	let {
		id,
		content,
		replyUser
	} = req.body
	//判断数据格式
	let mid = await messageDB.findById(id) //id查询评论
	let mcon = content.trim()
	// let mreq=await messageDB.findById("replyUser")//id查询评论
	if (!mid) return res.send({
		code: 1,
		message: "该评论不存在！"
	})
	if (!mcon) return res.send({
		code: 2,
		message: "评论为空！"
	})
	if (mcon.length > 100) return res.send({
		code: 3,
		message: "评论指数大于100！"
	})
	await messageDB.findByIdAndUpdate(id, {
		$push: {
			children: {
				content,
				author: req.session.userInfo._id, //写回复的用户id。这条回复是谁写的
				replyUser //回复的父级评论的用户id，被回复的那个人
			}
		}
	})
	res.send({
		code:0,
		message:"回复成功！"
	})

})

//子集回复的点赞路由
router.post("/like/replay",async (req,res)=>{
	let {parentId,childId,childIndex}=req.body
	
	let parentDoc=await messageDB.findById(parentId)
	let childDoc=await parentDoc.children.id(childId)
	
	if(!parentDoc)return res.send({
		code:1,
		message:"父评论不存在！"
	})
	if(!childDoc)return res.send({
		code:2,
		message:"子评论不存在！"
	})
	
	let userId = req.session.userInfo._id
	if (childDoc.likes.includes(userId)) {
		//如果likes里有用户id表示已点赞，删除id取消赞
		await messageDB.findByIdAndUpdate(parentId, {
			$pull: {
				[`children.${childIndex}.likes`]:userId
			}
		})
	} else {
		//如果likes里没有用户id表示未点赞，添加id点赞
		await messageDB.findByIdAndUpdate(parentId, {
			$push: {
				[`children.${childIndex}.likes`]:userId
			}
		})
	}
	res.send({
		code:0,
		message:"点赞成功！"
	})
})

module.exports = router
