<template>
	<div id="link">
		<article class="link-template">
			<h2>友链</h2>
			<p>请在<router-link to="/message">留言区</router-link>按照以下格式申请友链</p>
			<p>名称：一个辣鸡小白</p>
			<p>主页：https://github.com/</p>
			<p>图标：https://github.com/</p>
			<p>描述：懂得都懂</p>
		</article>
		<article class="link-content">
			<ul>
				<li v-for="item in linkInfo" :key="item._id">
					<a :href="item.home" target="_blank" :title="item.describe">
						<img class="logo" :src="item.logo" >
						<p class="name">{{item.name}}</p>
					</a>
				</li>
			</ul>
		</article>
	</div>
</template>

<script>
	export default {
		name: 'Link',
		data(){
			return{
				linkInfo:[]
			}
		},
		methods:{
			async getLinkData(){
				let {data}=await this.$axios({
					method:"get",
					url:"/getdata/link"
				})
				console.log(data);
				this.linkInfo=data.data
			}
		},
		created() {
			this.getLinkData()
		}
	}
</script>

<style lang="less" scoped>
	article {
		width: 100%;
		margin-bottom: 15px;
		padding: 25px 20px;
		background-color: #fff;
		font-family: Quicksand, Microsoft YaHei, sans-serif;
		box-sizing: border-box;
		box-shadow: 0 0 4px #ddd;
	}

	.link-template {
		h2 {
			margin-bottom: 15px;
			font-size: 20px;
			letter-spacing: 3px;
			line-height: 24px;
			border-left: 5px solid #73b899;
			text-indent: 10px;
		}

		p {
			text-indent: 2em;
			color: #444;
			font-size: 14px;
			letter-spacing: 4px;
			line-height: 30px;
			// margin-top: 15px;
			a{
				color: red;
			}
		}
	}

	.link-content {
		  ul {
		    display: flex;
		    flex-wrap: wrap;
		    li {
		      position: relative;
		      padding: 15px;
		      text-align: center;
		      box-sizing: border-box;
		      a {
		        display: block;
		        width: 100%;
		        height: 100%;
		
		        img.logo {
		          width: 40px;
		          height: 40px;
		          border-radius: 8px;
		        }
		        p{
		          overflow: hidden;
		          height: 30px;
		          line-height: 30px;
		          white-space: nowrap;
		          text-overflow: ellipsis;
		          font-size: 14px;
		          color: #409eff;
		        }
		      }
		    }
		  }
	}
</style>
