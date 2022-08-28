<template>
	<div class="">
		<el-table :data="suggestData" style="width: 100%">
			<el-table-column prop="date" label="日期" width="180">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="email" label="email">
			</el-table-column>
			<el-table-column prop="message" label="描述">
			</el-table-column>
			<el-table-column label="是否处理">
				<template #default="scope">
					<el-switch 
					v-model="scope.row.bool" 
					class="mb-2"
					style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" 
					active-text="已处理"
					inactive-text="未处理" 
					@change="switchState(scope.row)" />
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: "MangerSuggest",
		components: {

		},
		data() {
			return {
				suggestData: []
			}
		},

		methods: {
			//修改处理状态
			async switchState(item) {
				let {data}=await this.$axios({
					method:"post",
					url:"/administer/suggest/update",
					data:{
						id:item._id,
						bool:item.bool
					}
				})
				// console.log(data);
			},
			//获取反馈数据
			async getSuggest() {
				let {
					data
				} = await this.$axios({
					method: "get",
					url: "/administer/suggest/get"
				})
				if(data.code)return
				
				this.suggestData=data.data
			}
		},
		created() {
			this.getSuggest()
		}
	}
</script>

<style lang="less" scoped>

</style>
