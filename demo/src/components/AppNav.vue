<template>
	<div id="appnav">
		<div class="content">
			<div class="logo">
				<a href="/" title="个人网站">
					<!-- <h1></h1> -->
				</a>
			</div>
			<ul class="nav">
				<li>
					<router-link to="/">首页</router-link>
				</li>
				<li>
					<router-link to="/article">文章</router-link>
				</li>
				<li>
					<router-link to="/message">留言</router-link>
				</li>
				<li>
					<router-link to="/link">友链</router-link>
				</li>
				<li>
					<router-link to="/about">关于</router-link>
				</li>
			</ul>
			<div class="login">
				<LoginUser v-if="userInfo.user"></LoginUser>
				<LoginDialog v-else></LoginDialog>
				
			</div>
		</div>
	</div>
</template>

<script>
	import LoginDialog from '@/components/login/LoginDialog.vue';
	import LoginUser from '@/components/login/LoginUser.vue';
	import {mapState} from "vuex"
	export default {
		name: "AppNav",
		components: {
			LoginDialog,
			LoginUser
		},
		computed:{
			...mapState(["userInfo"])
		}
	}
</script>

<style lang="less" scoped>
	#appnav {
		position: fixed; //固定定位
		z-index: 999; //层级
		top: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: #fff;
		box-shadow: 0 0 2px #ccc; // 边框模糊2px

		.content {
			display: flex; //弹性盒模型
			max-width: 1200px;
			height: 100%;
			margin: 0 auto; //上下为0,左右自适应
			justify-content: space-between; //两端对齐,项目之间的间隔都相等

			.logo {
				width: 50px;
				height: 50px;

				a {
					display: block; //独占一行
					width: 100%;
					height: 100%;
					background: url("../assets/images/logo/logo.png") no-repeat 50%;
				}
			}

			.nav {
				display: flex;
				height: 100%;
				justify-content: space-between;

				a {
					display: block;
					height: 48px;
					padding: 0 25px;
					line-height: 48px;
					border-bottom: 2px solid transparent;
					font-weight: bold;
					font-size: 14px;
					color: #777;

					&:hover {
						//& 指向当前所在的选择器  a:hover
						color: #00b7ff;
					}
				}

				a.router-link-active {
					color: #00b7ff;
					border-bottom-color: #00b7ff;
				}
			}

			.login {
				height: 100%;

				.el-button {
					margin: 11px 0;
				}
			}
		}
	}
</style>
