const express = require("express")
const router = express.Router();
const suggestDB = require("../../datadb/suggest")



//添加反馈数据
router.post("/add", async (req, res) => {
	let {
		name,
		email,
		message
	} = req.body
	name = name.trim()
	email = email.trim()
	message = message.trim()
	if (name && email && message) {
		try {
			await suggestDB.create({
				name,
				email,
				message
			})
			res.send({
				code: 0,
				message: "已收到反馈!"
			})
		} catch (e) {
			//TODO handle the exception
			res.send({
				code: 1,
				message: "反馈失败!"
			})
		}

	}

})

//获取反馈数据
router.get("/get", async (req, res) => {
	let suggestDoc = await suggestDB.find()
	if (suggestDoc.length !== 0) {
		res.send({
			code: 0,
			message: "获取数据成功",
			data: suggestDoc
		})
	} else {
		res.send({
			code: 1,
			message: "获取反馈失败!"
		})
	}

})

//修改反馈数据
router.post("/update", async (req, res) => {
	let {
		id,
		bool
	} = req.body
	try {
		await suggestDB.findByIdAndUpdate(id, {
			bool
		})
		res.send({
			code: 0,
			message: "修改成功",
		})
	} catch (e) {
		//TODO handle the exception
		res.send({
			code: 1,
			message: "修改失败",
		})
	}





})



module.exports = router
