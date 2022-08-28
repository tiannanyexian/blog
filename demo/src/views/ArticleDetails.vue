<template>
    <div>
        <article>
            <main id="mdHtml"></main>
        </article>
    </div>
</template>

<script>
	export default {
		name: "ArticleDetails",
		components: {

		},
		data() {
			return {

			}
		},

		methods: {

		},
		async mounted() {
			const id = this.$route.params.id; //得到动态路由的id值
			// console.log(this.$router.params.id);
			// console.log(id);
			
			let {
				data
			} = await this.$axios({
				method: "get",
				url: "/getdata/articleDetails",
				params: {id}
			})
			// console.log(data);
			if(data.code){
				this.$message.error("文章不存在！")
				//重定向到文章
				this.$route.replace("/article")
			}else{
				let mdData = await this.$axios({
					method: "get",
					url: data.data.mdUrl
				})
				// console.log(mdData);
				editormd.markdownToHTML("mdHtml", {
				     markdown: mdData.data //md文件数据
				});
			}
			


		}
	}
</script>

<style lang="less" scoped>

</style>
