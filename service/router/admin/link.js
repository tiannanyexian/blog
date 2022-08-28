/**
 * link操作路由 用来处理 对友链的增删改的路由请求
 */
const express = require("express")
const router = express.Router()
const linkDb = require("../../datadb/link")
const {
	URL
} = require("url")

//添加友链数据到数据库
router.post("/addData", async (req, res) => {
	//数据格式的校验： 鉴定各字段是否为空;  鉴定2个url是否为url的格式

	//友链重复判断
	let {
		origin
	} = new URL(req.body.home)
	//根据正则匹配查询home字段值里有没有同一个网站的友链
	let linkDoc = await linkDb.findOne({
		home: new RegExp(origin)
	})
	if (linkDoc) return res.send({
		code: 2,
		message: "请不要重复添加相同网站下的友链！"
	})
	//友链数据添加到数据库
	await linkDb.create(req.body)

	res.send({
		code: 0,
		message: "添加友链成功"
	})
})

//修改友链数据
router.post("/update", async (req, res) => {
	let {
		_id,
		name,
		home,
		logo,
		describe
	} = req.body
	try {
		await linkDb.findByIdAndUpdate(_id, {
			name,
			home,
			logo,
			describe
		})
		res.send({
			code: 0,
			message: "修改成功！"
		})
	} catch (e) {
		//TODO handle the exception
		res.send({
			code: 1,
			message: "修改失败，出现错误！"
		})
	}

})

//删除友链数据
router.post("/delete", async (req, res) => {
	let _id= req.body
	try {
		await linkDb.findByIdAndDelete(_id)
		res.send({
			code: 0,
			message: "删除成功！"
		})
	} catch (e) {
		//TODO handle the exception
		res.send({
			code: 1,
			message: "删除失败！"
		})
	}


})

module.exports = router
