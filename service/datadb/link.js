/**
 * 友链表
 */
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let linkSchema = new Schema({
	name: String, //友链名称
	home: String, //友链地址
	logo: String, //图标
	describe: String //描述
})
module.exports = mongoose.model("link", linkSchema)
