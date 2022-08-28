//后台管理路由入口
const express = require("express");
const router = express.Router();

/**
 * 鉴权 管理员权限
 */
router.use((req, res, next) => {
	//是否登录 是否由管理员权限
	if (!req.session.userInfo || (!req.session.userInfo.admin)) {
		return res.send({
			code: 1,
			message: "你不具备管理员权限，请登录有管理员权限的账号！"
		})
		
	}
	next();
});

router.post("/isCheck", (req, res) => {
	// console.log(11);
	res.send({
		code: 0,
		message: "欢迎管理员登录！"
	});
})
//监听对link的操作
router.use("/link", require("./link"))
//监听对article的操作
router.use("/article", require("./article"))

//监听对反馈的操作
router.use("/suggest", require("./suggest"))

module.exports = router
