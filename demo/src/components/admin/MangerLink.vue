<template>
	<div>
		<el-table :data="linkInfo" style="width: 100%">
			<el-table-column label="名称" width="180">
				<template #default="scope">
					<el-input v-model="scope.row.name"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="首页" width="180">
				<template #default="scope">
					<el-input v-model="scope.row.home"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="logo" width="180">
				<template #default="scope">
					<el-input v-model="scope.row.logo"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="描述" width="180">
				<template #default="scope">
					<el-input v-model="scope.row.describe"></el-input>
				</template>
			</el-table-column>

			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="mini" type="primary" @click="handleEdit(scope.row)">
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
	import {
		mapState
	} from "vuex"
	export default {
		name: "MangerLink",
		components: {

		},
		data() {
			return {
				linkInfo: []
			}
		},
		computed: {
			...mapState(['addLink'])
		},
		watch: {
			//监听vuex中addLink值的变化，当值发生变化时，自动触发该函数
			addLink() {
				this.getLinkData(); //重新获取所有友链数据
			}
		},
		methods: {
			async getLinkData() {
				let {
					data
				} = await this.$axios({
					method: "get",
					url: "/getdata/link"
				})
				// console.log(data);
				this.linkInfo = data.data
			},
			//修改
			async handleEdit(item) {
				let {
					data
				} = await this.$axios({
					method: "post",
					url: "/administer/link/update",
					data: {
						_id: item._id,
						name: item.name,
						home: item.home,
						logo: item.logo,
						describe: item.describe
					}
				})
				if (data.code) {
					this.$message.error(data.message)
				} else {
					this.$message.success(data.message)
				}
			},
			//删除
			async handleDelete(id) {
				let {
					data
				} = await this.$axios({
					method: "post",
					url: "/administer/link/delete",
					data: {
						_id: id
					}
				})
				if (data.code) {
					this.$message.error(data.message)
				} else {
					this.$message.success(data.message)
				}
				this.getLinkData()
			}
		},
		created() {
			this.getLinkData()
		}
	}
</script>

<style lang="less" scoped>

</style>
