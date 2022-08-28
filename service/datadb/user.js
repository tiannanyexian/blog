/**
 * 用户表
 */
const express=require("express");
const mongoose = require("mongoose");
const Schema=mongoose.Schema;
let userInfo=new Schema({
	user:{
		type:String,
		required:true,
	},
	password:{
		type:String,
		required:true
	},
	photo:{
		type:String,
		default:"/img/photo/angle.jpg"
	},
	admin:{
		type:Boolean,
		default:false
	}
})
module.exports=mongoose.model("userinfo",userInfo)