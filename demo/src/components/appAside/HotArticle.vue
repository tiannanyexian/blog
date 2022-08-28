<template>
	<div class="hot-article">
		<h4>热门文章</h4>
		<ul>
			<li v-for="(item,index) in hotArticle" :key="item._id">
				<i>{{index+1}}</i>
				<router-link @click="getArticles" :to="`/article/${item._id}`">{{item.title}}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "HotArticle",
		data() {
			return {
				hotArticle: []
			}
		},
		methods: {
			async getArticles() {
				let {
					data
				} = await this.$axios({
					method: "GET",
					url: "/getdata/article"
				});
				if (data.code) return this.$message.error(data.message); //没有文章时/报错，直接return
				this.hotArticle = data.data.slice(0, 3); //所有文章数据给hotArticle
			}
		},
		created() {
			this.getArticles()
		}
	}
</script>

<style lang="less" scoped>
	.hot-article {
		width: 100%;
		background-color: #fff;
		padding: 20px;
		font-family: "Quicksand";
		box-shadow: 0 0 4px #ddd; //边框阴影
		box-sizing: border-box; //盒子模型,宽高会加上padding和border的值

		h4 {
			line-height: 20px;
			padding-bottom: 10px;
			border-bottom: 1px solid #e8e9e7;
			color: #383937;
			font-size: 16px;
			font-weight: bold;
		}

		ul {
			margin-top: 15px;

			li {
				overflow: hidden; //溢出隐藏
				display: flex;
				height: 40px;
				padding: 0 3px;
				line-height: 40px;
				box-sizing: border-box;

				i {
					width: 22px;
					height: 22px;
					margin-top: 9px;
					margin-right: 15px;
					border-radius: 50%; //添加圆角边框,50%为圆
					line-height: 16px;
					font-size: 16px;
					font-style: normal; //字体样式,标椎字体
					color: #fff;
					text-align: center;
					font-weight: 100;
					font-family: Pacifico;
				}

				i:nth-child(1) {
					background-color: #71a598;
				}

				i:nth-child(2) {
					background-color: #6eb3a3;
				}

				i:nth-child(3) {
					background-color: #93bbb2;
				}

				a {
					display: block; //设置元素为块状元素，如果不指定宽高，默认会继承父元素的宽度，并且独占一行
					overflow: hidden;
					color: #787977;
					font-size: 14px;
					text-decoration: none; //去除下划线
					white-space: nowrap; //文本不换行
					text-overflow: ellipsis; //当对象内文本溢出时显示省略标记(...)
					flex: 1;
				}
			}
		}
	}
</style>
