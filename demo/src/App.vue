<template>
	<!-- 导航栏 -->
	<AppNav></AppNav>
	<div id="main">
		<div class="aside">
			<!-- 左侧 -->
			<AppAside></AppAside>
		</div>
		<div class="content">
			<!-- 中间加载 -->
			<router-view />
		</div>
	</div>
</template>

<script>
	import AppNav from "@/components/AppNav"
	import AppAside from "@/components/AppAside"
	import {
		mapMutations
	} from "vuex"
	export default {
		name: 'App',
		components: {
			AppNav,
			AppAside
		},
		methods: {
			...mapMutations(["updateUserInfo"])
		},
		async created() {
			let {
				data
			} = await this.$axios({
				method: "post",
				url: "/log/isCheck"
			})
			// console.log(data);
			if (data.code) return //未登录
			this.updateUserInfo(data.data)
		}
	}
</script>

<style lang="less">
	@import "assets/css/reset.css";
	@import "assets/css/font.css";
	@import "assets/css/font/iconfont.css";

	body {
		background:
			url("./assets/images/background/bg-left.png") no-repeat 0 50px fixed,
			url("./assets/images/background/bg-right.png") no-repeat right 50px fixed;
		background-color: #F2F2F2;
	}

	#main {
		display: flex;
		max-width: 1200px;
		margin: 65px auto;

		.aside {
			width: 270px;
			margin-right: 15px;
		}

		.content {
			max-width: 915px;
			min-height: 700px;
			flex: 1;
		}
	}
</style>
