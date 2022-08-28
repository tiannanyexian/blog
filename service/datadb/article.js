/**
 * 文章表
 */
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let articleSchema = new Schema({
	title: {
		type: String,
		required: "true",
		default: "暂无描述"
	}, //标题
	describe: {
		type: String,
		default: "暂无描述"
	}, //描述
	mdUrl: {
		type: String,
		required: "true"
	}, //md文件地址
	coverUrl: {
		type: String,
		default: "/file/cover/default.jpg"
	}, //封面图片地址
	date: {
		type: Number,
		default: Date.now()
	}, //发表时间
	readingNum: {
		type: Number,
		default: 0
	}, //阅读数
	author: {
		type: Schema.Types.ObjectId,
		ref: "userinfo",
		required: true
	} //发表人（作者）

})
module.exports = mongoose.model("article", articleSchema)
