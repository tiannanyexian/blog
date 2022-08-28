const express = require("express")
const router = express.Router()
const userDB = require("../../datadb/user"); //userinfo表的操作对象
const messageDB = require("../../datadb/message"); //message表的操作对象
const linkDB = require("../../datadb/link"); //link表的操作对象
const articleDB = require("../../datadb/article"); //link表的操作对象
const suggestDB = require("../../datadb/suggest"); //suggest表的操作对象
const visitorDB = require("../../datadb/visitor"); //visitor表的操作对象


/**
 * 请求获取留言数据
 */
router.get("/msg", async (req, res) => {
	let msgDoc = await messageDB.find({}, {}, {
			sort: {
				date: -1
			}
		})
		.populate("author", {
			password: 0,
			__v: 0,
			admin: 0
		})
		.populate("children.author", {
			password: 0,
			__v: 0,
			admin: 0
		}) //同时查询写子级回复的用户信息
		.populate("children.replyUser", {
			password: 0,
			__v: 0,
			admin: 0
		});
	res.send({
		code: 0,
		message: "留言请求成功",
		data: msgDoc
	})
})
/**
 * 请求获取友链数据
 */
router.get("/link", async (req, res) => {
	let linkDoc = await linkDB.find()
	res.send({
		code: 0,
		message: "请求友链数据成功！",
		data: linkDoc
	})
})
//获取全部文章数据
router.get("/article", async (req, res) => {
	let articleDoc = await articleDB.find({}, {}, {
		sort: {
			readingNum: -1 //降序
		}
	})
	res.send({
		code: 0,
		message: "请求文章数据成功！",
		data: articleDoc
	})
})
//根据id请求文章数据
router.get("/articleDetails", async (req, res) => {
	let {
		id
	} = req.query
	// console.log(id);
	let doc = await articleDB.findById(id)
	if (!doc) return res.send({
		code: 1,
		message: "错误！"
	})
	//每次请求对应的文章,阅读数+1
	await articleDB.findByIdAndUpdate(id, {
		$inc: {
			readingNum: 1
		}
	})
	res.send({
		code: 0,
		message: "请求文章数据成功！",
		data: doc
	})

})

//获取访客人员信息
// router.get("/visitor", async (req, res) => {
// 	let visitorDoc = await visitorDB.find().populate("visitor", {password:0, __v:0});
// 	res.send({
// 		code: 0,
// 		mssage: '获取成功',
// 		data: visitorDoc
// 	})
// })

//获取访客数据
router.get("/visitor", async (req, res) => {
	// console.log(1);
	let doc = await visitorDB.find({}, {}, {
		sort: {
			date: -1
		}
	}).populate("visitor", {
		password: 0,
		__v: 0
	});
	res.send({
		code: 0,
		meaasge: '查询成功!',
		data: doc
	})

});





module.exports = router
