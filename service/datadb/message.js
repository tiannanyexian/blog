/**
 * 评论表
 */
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let messageSchema = new Schema({
	content: { //留言
		type: String,
		required: true
	},
	date: { //留言时间
		type: Number,
		default: Date.now //默认生成时间戳
	},
	likes: [ //点赞数, 存所有点赞了这条评论的用户的_id
		{
			type: Schema.Types.ObjectId
		}
	],
	author: { //当前发表这条评论的用户
		type: Schema.Types.ObjectId,
		ref: "userinfo", //关联到用户信息表
		required: true
	},
	children: [ //回复留言（二级评论/子评论）
		{
			content: String,
			author: {
				type: Schema.Types.ObjectId,
				ref: "userinfo"
			}, //这条回复是谁写的/写回复的用户id
			date: {
				type: Number,
				default: Date.now
			},
			likes: [{
				type: Schema.Types.ObjectId
			}],
			replyUser: {
				type: Schema.Types.ObjectId,
				ref: "userinfo"
			} //这条子回复是回复的谁？ / 它的父级评论的作者id
		}
	]
})
module.exports = mongoose.model("message", messageSchema)
