// const express=require("express")
// const mongoose=require("mongoose")
// const Scheam=mongoose.Schema

// const vistiorScheam=new Scheam({
// 	visitor:{
// 		type:Scheam.Types.ObjectId,
// 		required:true,
// 		ref:"userinfo"	
// 	},
// 	date:{
// 		type:Number,
// 		default:Date.now
// 	}
// })

// module.exports=mongoose.model("visitor",vistiorScheam)
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const visitorSchema = new Schema({ //友链信息表规则
    visitor:{
       type: Schema.Types.ObjectId,
       ref: "userinfo", //关联到用户信息表
       required: true
    },
    // 访问时间
    date:{
        type:Number,
        default:Date.now
    }
});
module.exports = mongoose.model("visitor", visitorSchema); 