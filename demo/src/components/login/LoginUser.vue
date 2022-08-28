<template>
	<div class="loginuser">
		<el-popover placement="bottom-end" :width="200" trigger="hover">
			<template #reference>
				<img :src="baseURL+userInfo.photo" alt="">
			</template>
			<div>
				<el-button type="primary" size="mini" @click="changInfo">修改信息</el-button>
				<el-button type="danger" size="mini" @click="loginOut">退出登录</el-button>
			</div>
		</el-popover>
	</div>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		name: "LoginUser",
		methods: {
			changInfo() {
				//跳转到/updateUser路由下  编程式导航
				this.$router.push("/updateUser")
			},
			async loginOut() {
				let {
					data
				} = await this.$axios({
					method: "post",
					url: "/log/out",
				})
				this.$message({
					showClose: true,
					message: data.message,
					type: 'success'
				})
				this.clearUserInfo()
				this.$router.push("/")
			},
			...mapMutations(["clearUserInfo"])
		},
		computed: {
			...mapState(["userInfo"])

		}
	};
</script>

<style lang="less" scoped>
	.loginuser {
		width: 34px;
		height: 34px;
		margin: 8px 0;

		img {
			width: 34px;
			height: 34px;
			// background: none center center / cover;
			border-radius: 50%;
			cursor: pointer;
		}
	}
</style>
