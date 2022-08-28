<template>
	<el-button type="success" size="mini" @click="showDialog">登录 / 注册</el-button>
	<div class="dialog" @click.self="hiddenDialog" v-if="show">
		<div class="content">
			<el-tabs v-model="activeName">
				<el-tab-pane label="登录" name="first">
					<el-form ref="logform" :model="logform" label-width="80px" :rules="rules">
						<el-form-item label="用户名" prop="user">
							<el-input v-model="logform.user"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="logform.password" type="password"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="logSubmit">登录</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="注册" name="second">
					<el-form ref="form" :model="form" label-width="80px" :rules="rules">
						<el-form-item label="用户名" prop="user">
							<el-input v-model="form.user"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="form.password" type="password"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="password2">
							<el-input v-model="form.password2" type="password"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="regSubmit">注册</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>

		</div>
	</div>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	export default {
		name: "LoginDialog",
		components: {

		},
		data() {
			return {
				show: false,
				activeName: "first", //默认显示第一个
				form: { //表数据
					user: "",
					password: "",
					password2: ""
				},
				logform: {
					user: "",
					password: "",
				},
				rules: { //表规则
					user: [
						{
							required: true,
							message: "请输入用户名！"
						},
						{
							validator(rule, value, callback) { //3个参数 校验规则 表单数据 回调
								if (value.length < 2 || value.length > 8) {
									callback(new Error("请输入2~8个字符"))
								} else {
									//字符验证
									if (/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
										callback(); //验证成功
									} else {
										callback(new Error("只允许汉字、字母、下划线"));
									}
								}
							}
						}

					],
					password: [{
							required: true,
							message: "请输入密码！"
						},
						{
							validator(rule, value, callback) { //3个参数 校验规则 表单数据 回调
								if (value.length < 6 || value.length > 18) {
									callback(new Error("请输入6~18个字符"))
								} else {
									//字符验证
									if (/^[a-zA-Z]\w{5,17}$/.test(value)) {
										callback(); //验证成功
									} else {
										callback(new Error("以字母开头,只能包含字符、数字和下划线"));
									}
								}
							}
						}
					],
					password2: [{
							required: true,
							message: "请确认密码！"
						},
						{
							validator: (rule, value, callback) => {
								if (this.form.password === value) {
									callback(); //验证成功
								} else {
									callback(new Error("两次密码不一致！"));
								}
							}
						}
					]
				}


			}
		},

		methods: {
			showDialog() {
				this.show = true
			},
			hiddenDialog() {
				this.show = false
			},
			regSubmit() {
				this.$refs.form.validate(async (bool) => {
					if (bool) {
						let {
							data
						} = await this.$axios({
							method: "post",
							url: "/reg",
							data: {
								user: this.form.user,
								password: this.form.password
							}
						})
						if (data.code) {
							console.log(data);
							this.$message({
								showClose: true,
								message: data.message,
								type: 'warning'
							});
						} else {
							this.$message({
								showClose: true,
								message: data.message,
								type: 'success'
							});
						}
						this.activeName = "first"
						this.$refs.form.resetFields()
						// console.log(data);
					} else {
						return false
					}
				})
			},
			logSubmit() {
				this.$refs.logform.validate(async (bool) => {
					if (bool) {
						let {
							data
						} = await this.$axios({
							method: "post",
							url: "/log",
							data: {
								user: this.logform.user,
								password: this.logform.password
							}
						})
						if (data.code) {
							this.$message({ //弹窗
								showClose: true,
								message: data.message,
								type: 'warning'
							})
						} else {
							this.$message({
								showClose: true,
								message: data.message,
								type: 'success'
							})
							this.$refs.logform.resetFields() //清空表单数据
							this.show = false //关闭遮罩
							// console.log(data.data);
							this.updateUserInfo(data.data)//把后端传来的数据存到vuex里
						}

					} else {
						return false
					}
				})

			},
			//使用vuex里的updateUserInfo()
			...mapMutations(["updateUserInfo"])

		}

	}
</script>

<style lang="less" scoped>
	.el-button {
		margin: 11px auto;
	}

	.dialog {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		z-index: 10000;

		.content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 300px;
			padding: 10px 20px;
			background: #fff;

		}

	}
</style>
