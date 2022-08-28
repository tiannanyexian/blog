<template>
	<div>
		<el-form ref="articleForm" :model="articleForm" label-width="100px">
			<el-form-item label="标题">
				<el-input v-model="articleForm.title" placeholder="可以自动获取上传的md文件名称"></el-input>
			</el-form-item>
			<el-form-item label="描述" label-width="100px">
				<el-input type="textarea" v-model="articleForm.describe"></el-input>
			</el-form-item>
			<el-form-item label="上传md文件" label-width="100px">
				<el-upload 
				class="upload-demo" 
				drag
				:action="`${baseURL}/administer/article/md`" 
				:limit="1"
				:with-credentials="true" 
				:show-file-list="true" 
				:auto-upload="false" 
				:on-change="mdChange"
				:before-remove="beforeRemove"
				:on-success="mdUploadSuccess"
				ref="mdForm"
				>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				</el-upload>
			</el-form-item>
			<el-form-item label="上传文章封面" label-width="100px">
				<el-upload 
				class="avatar-uploader" 
				:action="baseURL + '/administer/article/cover'"
				:show-file-list="false" 
				:auto-upload="false" 
				:with-credentials="true" 
				ref="coverForm"
				:on-change="coverChange"
				:on-success="coverUploadSuccess"
				>
					<!-- 缩略图 -->
					<img v-if="imageUrl" :src="imageUrl" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">发表文章</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "AddArticle",
		components: {

		},
		data() {
			return {
				articleForm: {
					title: "",
					describe: "",
					mdUrl:"",
					coverUrl:""
				},
				imageUrl:""
			}
		},

		methods: {
			mdChange(file,fileList){//文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
				console.log(file,fileList);
				if(file.status==="ready"){//文件为待上传状态
					if (/^(.+)\.md$/.test(file.name)) {//文件后缀为.md
						this.articleForm.title=RegExp.$1//获取上一次正则匹配结果中()组内匹配到的字符串内容
					} else{
						this.$message.error("只能上传.md文件！")
						fileList.pop(); //从尾部删除文件列表中的文件对象
					}
				}
			},
			//从文件列表删除时触发
			beforeRemove(file,filelist){
				this.articleForm.title=""
			},
			coverChange(file,fileList){//封面
				console.log(file);
				if(file.status==="ready"){
					const isJPG = file.raw.type === 'image/jpeg';
					const isLt2M = file.raw.size / 1024 / 1024 < 2;
					if (!isJPG) {
					    this.$message.error('上传封面图片只能是 JPG 格式!');
					}
					if (!isLt2M) {
					    this.$message.error('上传封面图片大小不能超过 2MB!');
					}
					if(isJPG && isLt2M){
						this.imageUrl=URL.createObjectURL(file.raw)
					}else{
						fileList.pop()
					}
					
					return isJPG && isLt2M;
				}
				
			},
			submitForm(){
				//先上传md文件
				this.$refs.mdForm.submit(); //调用上传控件的提交事件，发起请求提交文件到后端
				
				
			},
			//文件上传成功时的钩子
			mdUploadSuccess(res){
				//md文件
				if(res.code){
					this.$message.error(res.message)
				}else{
					// this.$message.success(res.message)
					this.articleForm.mdUrl=res.mdUrl
					//md上传成功后，接着上传的封面图
					if(this.imageUrl){
						//有封面，需要上传封面图
					    this.$refs.coverForm.submit();//调用上传控件的提交事件，发起请求提交文件到后端
					}else{
					    //没有封面，接着提交表单的其他数据
					    this.fromSubmit();//提交表单的数据到后端
					}
				}
			},
			coverUploadSuccess(res){
				//封面
				if(res.code){
					this.$message.error(res.message)
				}else{
					// this.$message.success(res.message)
					this.articleForm.coverUrl=res.coverUrl
					this.fromSubmit();
				}
			},
			//提交表单的数据到后端
			async fromSubmit(){
				let {data}=await this.$axios({
					method:"post",
					url:"/administer/article/add",
					data:this.articleForm
				})
				// console.log(data);
				if(data.code){
					this.$message.error(data.message)
				}else{
					this.$message.success(data.message)
				}
				this.$router.push(`/article/${data.data.id}`); //跳转到id对应的文章详情页
			}
			
		}
	}
</script>

<style lang="less" scoped>
/deep/.el-upload {
  position: relative;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  border-radius: 6px;
  .avatar {
    display: block;
    max-width: 178px;
    max-height: 178px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
</style>
