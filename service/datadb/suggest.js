//反馈表
const express = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

let suggestScheam = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	bool: {
		type: Boolean,
		default: false
	},
	date: {
		type: Number,
		default: Date.now
	}
})

module.exports = mongoose.model("suggest", suggestScheam)
