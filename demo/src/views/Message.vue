<template>
	<div class="about">
		<article>
			<h2>留言板</h2>
			<p>请文明发言，禁止广告。不然拉黑了嗷😂\(^o^)/~</p>
			<!-- type="textarea" 输入框类型
				  :rows="3" 输入框行数，只对 type="textarea" 有效
				  placeholder="请输入内容" 提示语
				  v-model="textarea" 输入框里的内容
				  maxlength="100" 最大长度
				  show-word-limit  展示字数统计-->

			<!-- 留言输入框-->
			<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea" 
				maxlength="100" show-word-limit>
			</el-input>
			<div class="publish">
				<div class="emoji-box">
					<!--表情按钮-->
					<i class="iconfont icon-biaoqing" @click.stop="showEmoji"></i>
					<!--表情展示的div-->
					<div class="emoji" v-show="isShow">
						<ul>
							<li v-for="(item,index) in arrEmoji" :key="index" 
								@click="printEmoji(item)">{{item}}</li>
						</ul>
					</div>
				</div>
				<el-button type="primary" size="mini" @click="submit">发表留言</el-button>
			</div>
		</article>
		<!-- 评论展示区 -->
		<article class="comment-area">
			<ul>
				<li v-for="item in arrMessage" :key="item._id">
					<!-- 评论(父级/一级) -->
					<div class="comment-wrap">
						<img :src="baseURL+item.author.photo">
						<!--用户头像-->
						<div class="message-box">
							<!-- 右侧的盒子 -->
							<div class="name-time">
								<span>{{item.author.user}}</span>
								<span>{{formatDate(item.date)}}</span>
							</div>
							<p class="text">{{item.content}}</p>
							<div class="like-reply">
								<i class="iconfont icon-xinaixin" 
									@click="commentLikes(item._id)"
									:class="{red:userInfo._id && item.likes.includes(userInfo._id)}">

								</i>
								<span>{{item.likes.length}}</span>
								<i class="iconfont icon-huifu" @click="commentReply(item)"></i>
							</div>
						</div>
					</div>
					<!-- 回复(子级/二级) -->
					<div class="reply-wrap" v-for="(childItem,index) in item.children" 
						:key="childItem._id">
						<img :src="baseURL+childItem.author.photo">
						<div class="message-box">
							<div class="name-time">
								<span>{{childItem.author.user}}</span>
								<span>{{formatDate(childItem.date)}}</span>
							</div>
							<p class="text"><span id="">@{{childItem.replyUser.user}}&nbsp;</span>{{childItem.content}}</p>
							<div class="like-reply">
								<i class="iconfont icon-xinaixin" 
									@click="replayLike(item._id,childItem._id,index)"
									:class="{red:userInfo._id && childItem.likes.includes(userInfo._id)}"></i>
								<span>{{childItem.likes.length}}</span>
								<i class="iconfont icon-huifu" 
									@click="childReply(item,childItem)"></i>
							</div>
						</div>
					</div>
					<!-- 回复框 -->
					<div class="print-reply" :class="{show: item.isShowReply}">
						<el-input size="mini" v-model="item.replyContent" 
							:placeholder="`@${item.replyUser.user}`"></el-input>
						<el-button type="primary" size="mini" @click="submitReply(item)">提交回复</el-button>
					</div>
				</li>
			</ul>
		</article>
	</div>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		name: "Message",
		data() {
			return {
				textarea: "", //留言框绑定
				isShow: false, //表情显示隐藏
				arrEmoji: [ //表情
					"😃", "😁", "😂", "😊", "🙃", "🥰", "😘", "🤭", "🤔", "😏",
					"😵", "😟", "🙁", "😳", "😰", "😭", "😖", "😡", "😠", "😈",
					"🤡", "☠️", "👻", "🙈", "🙉", "❤️", "💖", "💢", "💣", "💤",
					"👋", "👍", "👌", "🤞", "🤟", "🤙", "👊", "🖕", "🤝", "🙏",
					"🙅", "🙅‍♂️", "👨‍✈️", "👩‍✈️", "👷", "👷‍♀️", "🤦", "🤦‍♂️", "👴", "🧓",
					"🐴", "🐮", "🐖", "🐑", "🐓", "🦚", "🐲", "🐳", "🐟", "🐌"
				],
				//评论数据的数组
				arrMessage: []
			}
		},
		computed: {
			...mapState(["userInfo"]),
		},
		methods: {
			//时间格式转换
			formatDate(date) {
				let d = new Date(date),
					YY = d.getFullYear(),
					MM = d.getMonth() + 1,
					DD = d.getDate(),
					hh = d.getHours(),
					mm = d.getMinutes(),
					ss = d.getSeconds();
				return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
			},
			//显示/关闭表情框
			showEmoji() {
				this.isShow = !this.isShow;
			},
			//点击输入表情到文本域
			printEmoji(item) {
				if (this.textarea.length >= 99) return;
				this.textarea += item;
			},
			//发起请求，将评论/留言的数据提交给后端
			async submit() {
				//判断用户是否登录
				if (!this.userInfo.user) return this.$message.error("请登录，登录后才能发表留言哦！");
				let valMsg = this.textarea.trim();
				if (!valMsg) return this.$message.error("留言内容不能为空");

				// 提交数据到后端
				let {
					data
				} = await this.$axios({
					method: "POST",
					url: "/msg/publish",
					data: {
						valMsg
					}
				});
				// console.log(data);
				if (data.code) return this.$message({
					showClose: true,
					message: data.message,
					type: 'warning'
				}); //提交失败
				//发表成功
				this.$message({
					showClose: true,
					message: data.message,
					type: 'success'
				})
				this.textarea = ""; //清空文本域内容
				this.getMessage()
			},
			//发起请求，获取所有留言数据
			async getMessage() {
				let {
					data
				} = await this.$axios({
					method: "GET",
					url: "/getdata/msg"
				});
				data.data.forEach(item => {
					item.isShowReply = false; //控制当前这条评论下的回复框显示 / 隐藏
					item.replyContent = ""; //控制当前评论下的回复input框里的内容
					item.replyUser = item.author; //子级的父级作者id
				})
				this.arrMessage = data.data; //将数据赋值给数组
				// this.$message({
				// 	showClose: true,
				// 	message: data.message,
				// 	type: 'success'
				// }) 
			},
			//父级点赞
			async commentLikes(comentId) {
				//登录验证
				if (!this.userInfo.user) return this.$message.error("请先登录！")
				let {
					data
				} = await this.$axios({
					method: "post",
					url: "/msg/likes/comment",
					data: {
						id: comentId
					}
				})
				this.getMessage()
			},
			//点击父级评论的回复按钮：显示 / 隐藏   回复框
			async commentReply(item) { //item父级评论数据对象
				//判断用户是否登录
				if (!this.userInfo.user) return this.$message.error("请登录，登录后才能发表留言哦！");
				if(item.replyUser._id!==item.author._id){
					item.isShowReply = true
				}else{
					item.isShowReply = !item.isShowReply; //显示/隐藏 回复框
				}
				item.replyUser=item.author
			},
			//点击父级评论下的回复提交按钮，提交子回复数据到后端
			async submitReply(item) {
				//判断用户是否登录
				if (!this.userInfo.user) return this.$message("请先登录！")
				//判断回复框是否有值,和长度
				let content = item.replyContent.trim()
				if (!content) return this.$message.error("请输入回复内容！")
				if (content.length > 100) return this.$message.error("回复字数超过100！")
				/* 
				    提交回复内容：
				        子回复的内容
				        子回复的作者id  
				*/
				let {
					data
				} = await this.$axios({
					method: "post",
					url: "/msg/reply/submit",
					data: {
						id: item._id, //被评论的评论id
						content, //子回复的内容
						replyUser: item.replyUser._id //父级评论的作者id
					}
				})
				if (data.code) return this.$message.error(data.message); //回复失败
				this.$message.success(data.message); //回复成功
				this.getMessage(); //重新获取所有的留言数据
				// console.log(data);
			},
			//点击子集回复下的点赞按钮
			async replayLike(parentId,childId,childIndex){
				//判断用户是否登录
				if(!this.userInfo.user)return this.$message.error("请先登录！")
				/**
				 * 提交数据到后端
				 * 父级评论id,子集评论id,子集评论下标
				 */
				let {data}=await this.$axios({
					method:"post",
					url:"/msg/like/replay",
					data:{
						parentId,childId,childIndex
					}
				})
				// console.log(data);
				// if(data.code){
				// 	this.$message.error(data.message)
				// }else{
				// 	this.$message.success(data.message)
				// }
				this.getMessage()
			},
			//点击子集回复按钮 显示隐藏input
			childReply(item,childrenItem){
				//判断用户是否登录
				if(!this.userInfo.user)return this.$message.error("请先登录！")
				
				if(item.replyUser._id!==childrenItem.author._id){
					item.isShowReply = true
				}else{
					item.isShowReply = !item.isShowReply; //显示/隐藏 回复框
				}
				item.replyUser=childrenItem.author
			}
		},
		created() {
			this.getMessage();
		},
		mounted() {
			document.addEventListener("click", () => {
				this.isShow = false; //关闭表情
			});
		}
	};
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
		}

		/deep/ textarea {
			margin-top: 10px;
		}

		.publish {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 10px;

			.emoji-box {
				position: relative;

				.emoji {
					position: absolute;
					top: 30px;
					padding: 8px;
					background-color: #fff;
					box-shadow: 0 0 3px #ccc;

					&::before {
						content: "";
						position: absolute;
						top: -12px;
						left: -1px;
						z-index: 10;
						width: 0;
						height: 0;
						border: 6px solid transparent;
						border-bottom-color: #d8d6d6;
					}

					ul {
						display: flex;
						flex-wrap: wrap;
						width: 250px;
						border-left: 1px solid #d8d6d6;
						border-bottom: 1px solid #d8d6d6;

						li {
							overflow: hidden;
							width: 25px;
							height: 25px;
							border-right: 1px solid #d8d6d6;
							border-top: 1px solid #d8d6d6;
							line-height: 25px;
							font-size: 18px;
							box-sizing: border-box;
						}
					}
				}
			}
		}
	}

	article.comment-area {
		ul li {
			padding-bottom: 5px;
			margin-bottom: 10px;
			border-bottom: 1px dashed #ddd;
			font-size: 12px;
			font-family: Microsoft YaHei, "sans-serif";

			.reply-wrap {
				margin: 10px 8px 8px 55px;
			}

			.comment-wrap,
			.reply-wrap {
				//评论
				display: flex;

				img {
					width: 40px;
					height: 40px;
					margin-right: 15px;
					border-radius: 50%;
				}

				.message-box {
					.name-time {
						font-size: 12px;
						margin-bottom: 3px;

						span:nth-child(1) {
							color: #73b899;
						}

						span:nth-child(2) {
							color: #aaa;
							margin-left: 10px;
						}
					}

					p.text {
						text-indent: 0;
						color: #666;
						letter-spacing: 2px;
						margin-bottom: 3px;
						word-break: break-word;
						span{
							color: #0ab8b8;
						}
					}

					.like-reply {
						.red {
							color: red;
						}

						i {
							cursor: pointer;
							font-size: 14px;
							color: #aaa;
						}

						span {
							margin-right: 40px;
							font-size: 12px;
							color: #aaa;
						}
					}
				}
			}

			// 回复框
			.print-reply {
				overflow: hidden;
				width: 100%;
				height: 0;
				padding-left: 55px;
				box-sizing: border-box;
				transition: height .2s;

				&.show {
					height: 60px;
				}

				.el-button {
					float: right;
				}
			}
		}
	}
</style>
