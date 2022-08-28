<template>
	<div class="">
		<article>
			<el-tabs v-model="activeName">
				<el-tab-pane label="发表文章" name="first">
					<AddArticle></AddArticle>
				</el-tab-pane>
				<el-tab-pane label="文章管理" name="second">
					<MangerArticle></MangerArticle>
				</el-tab-pane>
				<el-tab-pane label="添加友链" name="third">
					<AddLink></AddLink>
				</el-tab-pane>
				<el-tab-pane label="友链管理" name="fourth">
					<MangerLink></MangerLink>
				</el-tab-pane>
				<el-tab-pane label="反馈收集" name="fifth">
					<MangerSuggest></MangerSuggest>
				</el-tab-pane>
			</el-tabs>
		</article>
	</div>
</template>

<script>
	import AddLink from "../components/admin/AddLink.vue"
	import MangerLink from "../components/admin/MangerLink.vue"
	import AddArticle from "../components/admin/AddArticle.vue"
	import MangerArticle from "../components/admin/MangerArticle.vue"
	import MangerSuggest from "../components/admin/MangerSuggest.vue"
	
	export default {
		name: "Admin",
		components: {
			AddLink,MangerLink,AddArticle,MangerArticle,MangerSuggest
		},
		data() {
			return {
				activeName: "first"
			}
		},

		methods: {
			 // 验证是否具有管理员权限
			    async isCheck(){
			      let {data} = await this.$axios({
			          method: "POST",
			          url:"/administer/isCheck"
			      });
			      if(data.code){ //不是管理员
			        this.$router.replace("/"); //重定向首页路由
			        this.$message.error(data.message)
			      }else{
			        this.$message.success(data.message);
			      }
			    }
		},
		created() {
			this.isCheck()
		}
	}
</script>

<style lang="less" scoped>
	article {
		width: 100%;
		min-height: 720px;
		padding: 25px 20px;
		margin-bottom: 15px;
		background-color: #fff;
		font-family: Quicksand, Microsoft YaHei, sans-serif;
		box-sizing: border-box;
		box-shadow: 0 0 4px #ddd;
	}
</style>
