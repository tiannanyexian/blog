const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const articleDB = require("../../datadb/article")

//md文件
router.post("/md", (req, res) => {
	let name = ""
	let upload = multer({
		storage: multer.diskStorage({ //配置项
			// 设置文件存储在服务端的哪个目录
			destination(req, file, callback) {
				callback(null, path.join(__dirname, "../../public/file/md"));
			},
			// 设置文件的名字（防重名）
			filename(req, file, callback) {
				// 名称.后缀名   file.originalname
				let {
					ext
				} = path.parse(file.originalname);
				name = "md" + req.session.userInfo._id + new Date().getTime() + ext;
				callback(null, name);
			}
		})
	}).single("file")
	upload(req, res, async err => {
		if (err) {
			res.send({
				code: 9,
				message: "文件提交失败！"
			})
		} else {
			res.send({
				code: 0,
				message: "文件提交成功！",
				mdUrl: `/file/md/${name}`
			})
		}
	})
})
//封面
router.post("/cover", (req, res) => {
	let name = ""
	let upload = multer({
		storage: multer.diskStorage({ //配置项
			// 设置文件存储在服务端的哪个目录
			destination(req, file, callback) {
				callback(null, path.join(__dirname, "../../public/file/cover"));
			},
			// 设置文件的名字（防重名）
			filename(req, file, callback) {
				// 名称.后缀名   file.originalname
				let {
					ext
				} = path.parse(file.originalname);
				name = "cover" + req.session.userInfo._id + new Date().getTime() + ext;
				callback(null, name);
			}
		})
	}).single("file")
	upload(req, res, async err => {
		if (err) {
			res.send({
				code: 9,
				message: "封面提交失败！"
			})
		} else {
			res.send({
				code: 0,
				message: "封面提交成功！",
				coverUrl: `/file/cover/${name}`
			})
		}
	})
})
//表单数据
router.post("/add", async (req, res) => {
	let {
		title,
		describe,
		mdUrl,
		coverUrl
	} = req.body
	try {
		let doc = await articleDB.create({
			title: title || undefined,
			describe: describe || undefined,
			mdUrl,
			coverUrl: coverUrl || undefined,
			author: req.session.userInfo._id
		});

		res.send({
			code: 0,
			message: "文章上传成功！",
			data: {
				id: doc._id
			}
		})
	} catch (e) {
		//TODO handle the exception
		console.log(e);
		res.send({
			code: 9,
			message: "文章上传失败！"
		})
	}


})

//修改文章数据
router.post("/update", async (req, res) => {
	let {
		id,
		doc
	} = req.body
	//判断id是否存在
	let idDoc = await articleDB.findById(id)
	if (!idDoc) {
		res.send({
			code: 3,
			message: "要修改的文章id错误!"
		})
	} else {
		try {
			await articleDB.findByIdAndUpdate(id, doc)
			res.send({
				code: 0,
				message: "修改成功!"
			})
		} catch (e) {
			//TODO handle the exception
			res.send({
				code: 4,
				message: "修改错误!"
			})
		}

	}

})
//删除文章
router.delete("/delete", async (req, res) => {
	let {
		id
	} = req.body
	let articleDoc = await articleDB.findById(id)
	if (!articleDoc) {
		res.send({
			code: 4,
			message: "要删除的文章id错误!"
		})
	} else {
		try {
			//删除数据库中文章数据
			await articleDB.findByIdAndDelete(id)

			//删除服务器上的文章数据
			fs.unlink(path.join(__dirname, "../../public" + `${articleDoc.mdUrl}`), err => {
				if (err) throw err
				console.log("删除文章成功");
			})
			if (articleDoc.coverUrl !== "/file/cover/default.jpg") {
				fs.unlink(path.join(__dirname, "../../public" + `${articleDoc.coverUrl}`), err => {
					if (err) throw err
					console.log("删除文章封面成功");
				})
			}

			res.send({
				code: 0,
				message: "删除成功!"
			})
		} catch (e) {
			//TODO handle the exception
			res.send({
				code: 4,
				message: "删除失败!"
			})
		}
	}

})






module.exports = router
