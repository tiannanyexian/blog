<template>
	<div class="">
		<el-form ref="linkFrom" :model="linkFrom" :rules="rules" label-width="80px">
			<el-form-item label="名称" prop="name">
				<el-input v-model="linkFrom.name"></el-input>
			</el-form-item>
			<el-form-item label="首页地址" prop="home">
				<el-input v-model="linkFrom.home"></el-input>
			</el-form-item>
			<el-form-item label="图片地址" prop="logo">
				<el-input v-model="linkFrom.logo"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop="describe">
				<el-input v-model="linkFrom.describe"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="small" @click="submitAdd">确认添加</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	export default {
		name: "AddLink",
		components: {

		},
		data() {
			return {
				linkFrom: {
					name: "",
					home: "",
					logo: "",
					describe: ""
				},
				rules: {
					name: [{
						required: true
					}],
					home: [{
						required: true,
						type: 'url',
						message: "你输入的不是一个URL"
					}],
					logo: [{
						required: true,
						type: 'url',
						message: "你输入的不是一个URL"
					}],
					describe: [{
						required: true
					}]
				}
			}
		},

		methods: {
			...mapMutations(["noticeAddLink"]),
			submitAdd() {
				this.$refs.linkFrom.validate(async v => {
					if (v) {
						let {
							data
						} = await this.$axios({
							method: "post",
							url: "/administer/link/addData",
							data: this.linkFrom
						})
						console.log(data);
						if (data.code) {
							this.$message.error(data.message)
						} else {
							this.$message.success(data.message)
						}
						this.$refs.linkFrom.resetFields() //清空表单
						this.noticeAddLink() //修改vuex里的state数据	
					} else {
						return false
					}

				})
			}
		}
	}
</script>

<style lang="less" scoped>

</style>
