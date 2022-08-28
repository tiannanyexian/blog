<template>
	<div class="">
		 <el-input
		    placeholder="请输入内容"
		    prefix-icon="el-icon-search"
		    v-model="searchText"
			@input="searchArticle">
		  </el-input>
		<el-table :data="resultArticleData" style="width: 100%">
			<el-table-column label="标题" width="180">
				<template #default="scope">
					<el-input v-model="scope.row.title"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="描述" width="180">
				<template #default="scope">
					<el-input v-model="scope.row.describe"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="重新上传md" width="180">
				<template #default="scope">
					<el-upload 
					class="upload-demo" 
					:action="baseURL+'/administer/article/md'" 
					:limit="1"
					:with-credentials="true" 
					:on-success="function(res){
					    //这里接收res数据，并调用mdUploadSuccess，传入res/id
					    mdUploadSuccess(res, scope.row._id)
					}" 
					:before-upload="mdBeforeUpload" 
					:show-file-list="false"
					>
						<el-button size="mini" type="success">点击上传</el-button>
					</el-upload>
				</template>
			</el-table-column>
			<el-table-column label="重新上传封面" width="180">
				<template #default="scope">
					<div style="display:flex;justify-content:space-between;align-items:center">
						<el-image
						   style="width: 50px; height: 50px"
						   :src="baseURL+scope.row.coverUrl" 
						   :preview-src-list="[baseURL+scope.row.coverUrl]">
						</el-image>
						<el-upload
						class="upload-demo"
						:action="`${baseURL}/administer/article/cover`"
						:limit="1"
						:with-credentials="true"
						:on-success="function(res){
							coverUploadSuccess(res,scope.row._id)
						}"
						:before-upload="coverBeforeUpload"
						:show-file-list="false"
						>
						    <el-button size="mini" type="warning">重传封面</el-button>
						</el-upload>
					</div>
					 
				</template>
			</el-table-column>

			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="mini" type="primary" 
					@click="handleEdit(scope.row._id,{
						title:scope.row.title,
						describe:scope.row.describe})"
					>
						修改
					</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: "MangerArticle",
		components: {

		},
		data() {
			return {
				allArticleData: [],
				searchText:'',
				resultArticleData:[]
			}
		},

		methods: {
			//搜索
			searchArticle(){
				let arr=[]
				if(!this.searchText){
					this.resultArticleData=this.allArticleData
				}else{
					this.allArticleData.forEach((item)=>{
						if(item.title.includes(this.searchText)){
							arr.push(item)
						}
					})
					this.resultArticleData=arr
				}
			},
			//请求获取所有的文章数据
			async getArticles() {
				let {
					data
				} = await this.$axios({
					method: "GET",
					url: "/getdata/article"
			 });
				if (data.code) return this.$message.error(data.message); //没有文章时/报错，直接return
				this.allArticleData = data.data; //所有文章数据给allArticleData
				this.searchArticle()
			},
			//md上传之前
			mdBeforeUpload(file){
				if (/^(.+)\.md$/.test(file.name)) {//文件后缀为.md
					return true
				} else{
					this.$message.error("只能上传.md文件！")
				}
				
			},
			//md上传成功后
			mdUploadSuccess(res,id){
				if(res.code){
					this.$message.error(res.message)
				}else{
					this.updateArticle(id,{mdUrl:res.mdUrl})
				}
			},
			//封面上传前
			coverBeforeUpload(file){
				console.log(file);
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传封面图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传封面图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			
			},
			//封面上传成功后
			coverUploadSuccess(res,id){
				
				if(res.code){
					this.$message.error(res.message)
				}else{
					this.updateArticle(id,{coverUrl:res.coverUrl})
				}
			},
			//点击修改按钮
			handleEdit(id,doc){
				this.updateArticle(id,doc)
			},
			//点击删除按钮
			handleDelete(id,doc){
				this.deleteArticle(id)
			},
			//修改文章数据
			async updateArticle(id,doc){
				let {data}=await this.$axios({
					method:"post",
					url:"/administer/article/update",
					data:{id,doc}
				})
				console.log(data);
				if (data.code) {
					this.$message.error(data.message)
				} else{
					this.$message.success(data.message)
				}
				this.getArticles()
			},
			//删除文章数据
			async deleteArticle(id){
				let {data}=await this.$axios({
					method:"delete",
					url:"/administer/article/delete",
					data:{id}
				})
				if(data.code){
					this.$message.error(data.message)
				}else{
					this.$message.success(data.message)
				}
				this.getArticles()
			}
		},
		created() {
			this.getArticles()
		}
	}
</script>

<style lang="less" scoped>

</style>
