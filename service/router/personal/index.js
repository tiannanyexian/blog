const express = require("express")
const router = express.Router()
const userDB = require("../../datadb/user")
const multer = require("multer")
const path = require("path")

//鉴权，判断是否登录
router.use((req, res, next) => {
	// console.log(req.session);
	if (!req.session.userInfo) {
		// console.log(11);
		return res.send({
			code: 4,
			message: "请登录后在修改信息"
		})
	}
	next()
})
//修改姓名
router.post("/user", async (req, res) => {
	let {
		user
	} = req.body
	if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user)) {
		if (user === req.session.userInfo.user) {
			return res.send({
				code: 2,
				message: "新用户名与原用户名是相同的，不可以修改"
			})
		}
		let userDoc = await userDB.findOne({
			user
		})
		if (userDoc) {
			return res.send({
				code: 3,
				message: "该用户名已经被别人用了，请更换一个"
			})
		}
		await userDB.findByIdAndUpdate(req.session.userInfo._id, {
			user
		}) //根据id值修改用户名

		//提供最新的用户信息给前端
		req.session.userInfo.user = user
		res.send({
			code: 0,
			message: "修改成功",
			data: req.session.userInfo
		})
	} else {
		res.send({
			code: 1, //你发过来的数据格式不规范
			message: "你发过来的数据格式不规范"
		})
	}

})
//修改密码
router.post("/pass", async (req, res) => {
	let {
		oldPassword,
		newPassword
	} = req.body
	if (/^[a-zA-Z]\w{5,17}$/.test(newPassword)) {
		if (oldPassword === newPassword) {
			return res.send({
				code: 5,
				message: "新密码与旧密码不能一样"
			})
		}
		let doc = await userDB.findById(req.session.userInfo._id)
		if (oldPassword === doc.password) {
			await userDB.findByIdAndUpdate(req.session.userInfo._id, {
				password: newPassword
			})
			req.session.destroy()
			res.send({
				code: 0,
				message: "密码修改成功"
			})
		} else {
			res.send({
				code: 6,
				message: "旧密码不正确"
			})
		}

	}
})
//修改头像					
router.post("/photo", async (req, res) => {
	let name = ""

	let upload = multer({
		storage: multer.diskStorage({ //配置项
			// 设置文件存储在服务端的哪个目录
			destination(req, file, callback) {
				callback(null, path.join(__dirname, "../../public/img/photo"));
			},
			// 设置文件的名字（防重名）
			filename(req, file, callback) {
				// 名称.后缀名   file.originalname
				let {
					ext
				} = path.parse(file.originalname);
				name = req.session.userInfo._id + new Date().getTime() + ext;
				callback(null, name);
			}
		})
	}).single("file")
	
	upload(req,res,async err=>{
		if(err){
			return res.send({
				code:1,
				message:"头像上传失败"
			})
		}else{
			let photo=`/img/photo/${name}`
			await userDB.findByIdAndUpdate(req.session.userInfo._id,{photo})
			req.session.userInfo.photo=photo
			res.send({
				code:0,
				message:"头像上传成功",
				data:req.session.userInfo
			})
		}
	})
})

module.exports = router
