<template>
	<div class="home">
		<!-- 介绍 -->
		<article class="introduce">
			<div class="describe">
				<h2>HELLO</h2>
				<p>
					你好！欢迎来到我的博客！我是一名WEB前端攻城狮，热衷于研究JavaScript、NodeJs、Vue、React、WebGL、Flutter、Electron……这是我的主页！我会在这里发表一些不成熟的技术文章，记录一些沙雕的日常。博客目前使用的是Vue
					+ Element + Node + Express +
					MongoDB搭建的，如果对源码感兴趣的话可以联系我哦~
					欢迎提出宝贵的建议哦！
				</p>
			</div>
			<div class="info">
				<div class="me">
					<h3>个人信息</h3>
					<ul>
						<li>
							<p>NICKNAME</p>
							<p>湖南省长沙市岳麓区</p>
						</li>
						<li>
							<p>NICKNAME</p>
							<p>湖南省长沙市岳麓区</p>
						</li>
						<li>
							<p>NICKNAME</p>
							<p>湖南省长沙市岳麓区</p>
						</li>
						<li>
							<p>NICKNAME</p>
							<p>湖南省长沙市岳麓区</p>
						</li>
					</ul>
				</div>
				<div class="skills">
					<h3>技能</h3>
					<ul>
						<li>
							<p class="lang">
								<span>HTML5 &amp; CSS3</span>
								<span>90%</span>
							</p>
							<p class="level"></p>
						</li>
						<li>
							<p class="lang">
								<span>HTML5 &amp; CSS3</span>
								<span>90%</span>
							</p>
							<p class="level"></p>
						</li>
						<li>
							<p class="lang">
								<span>HTML5 &amp; CSS3</span>
								<span>90%</span>
							</p>
							<p class="level"></p>
						</li>
						<li>
							<p class="lang">
								<span>HTML5 &amp; CSS3</span>
								<span>90%</span>
							</p>
							<p class="level"></p>
						</li>
						<li>
							<p class="lang">
								<span>HTML5 &amp; CSS3</span>
								<span>90%</span>
							</p>
							<p class="level"></p>
						</li>
					</ul>
				</div>
			</div>
		</article>
		<!-- 推荐 -->
		<article class="recommend">
			<div class="describe">
				<h2>推荐</h2>
				<p><a href="/article">更多热门文章</a> 请访问文章页（￣︶￣）↗　</p>
			</div>
			<div class="article-list">
				<ul>
					<li v-for="item in recommendArticle" :key="item._id">
						<img :src="baseURL+item.coverUrl" alt="图片" />
						<h3>{{item.title}}</h3>
						<div class="cover">
							<router-link :to="`/article/${item._id}`">
								<p>{{item.describe}}</p>
								<p>点击</p>
							</router-link>
						</div>
					</li>
				</ul>
			</div>
		</article>
		<!-- work -->
		<article class="work">
			<h2>经历</h2>
			<ul>
				<li>
					<p class="time">2020-2020</p>
					<div class="introduce">
						<h3>WEB开发/编程讲师</h3>
						<p class="company">中职通</p>
						<p class="describe">
							负责公司部分学科独立官网的开发。同时兼任WEB的在线教师。擅长于JavaScript、NodeJs、Vue&React、WebGL等领域，在线教学经验丰富，授课方式多样化，幽默风趣深入浅出，让学员在欢快的课堂氛围中掌握每一个知识点
						</p>
					</div>
				</li>
				<li>
					<p class="time">2020-2020</p>
					<div class="introduce">
						<h3>WEB开发/编程讲师</h3>
						<p class="company">中职通</p>
						<p class="describe">
							负责公司部分学科独立官网的开发。同时兼任WEB的在线教师。擅长于JavaScript、NodeJs、Vue&React、WebGL等领域，在线教学经验丰富，授课方式多样化，幽默风趣深入浅出，让学员在欢快的课堂氛围中掌握每一个知识点
						</p>
					</div>
				</li>
				<li>
					<p class="time">2020-2020</p>
					<div class="introduce">
						<h3>WEB开发/编程讲师</h3>
						<p class="company">中职通</p>
						<p class="describe">
							负责公司部分学科独立官网的开发。同时兼任WEB的在线教师。擅长于JavaScript、NodeJs、Vue&React、WebGL等领域，在线教学经验丰富，授课方式多样化，幽默风趣深入浅出，让学员在欢快的课堂氛围中掌握每一个知识点
						</p>
					</div>
				</li>
				<li>
					<p class="time">2020-2020</p>
					<div class="introduce">
						<h3>WEB开发/编程讲师</h3>
						<p class="company">中职通</p>
						<p class="describe">
							负责公司部分学科独立官网的开发。同时兼任WEB的在线教师。擅长于JavaScript、NodeJs、Vue&React、WebGL等领域，在线教学经验丰富，授课方式多样化，幽默风趣深入浅出，让学员在欢快的课堂氛围中掌握每一个知识点
						</p>
					</div>
				</li>
			</ul>
		</article>
		<div class="contact">
			<div class="describe">
				<h2>联系我</h2>
				<p>有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)</p>
			</div>
			<!-- 

       -->
			<el-form :model="contactForm" :rules="rules" ref="contactForm" label-position="top">
				<el-form-item label="你的名字是？" prop="name">
					<el-input v-model="contactForm.name"></el-input>
				</el-form-item>
				<el-form-item label="你的邮箱" prop="email">
					<el-input v-model="contactForm.email"></el-input>
				</el-form-item>
				<el-form-item label="你要发送的消息内容" prop="message">
					<el-input v-model="contactForm.message"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm">发送</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Home",
		data() {
			return {
				recommendArticle:[],
				contactForm: { //表单的数据对象
					name: "",
					email: "",
					message: ""
				},
				rules: { //表单的验证规则   与标签中的prop属性值对应
					name: [{
						required: true,
						message: "name值必须填写",
						trigger: "blur"
					}],
					email: [{
						required: true,
						type: "email",
						trigger: "blur"
					}],
					message: [{
						required: true,
						trigger: "blur"
					}],
				}
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
				this.recommendArticle = data.data.slice(0, 4); //所有文章数据给recommendArticle
			},
			submitForm() { //点击提交后触发的事件
				//先验证表单里的数据格式是否符合要求
				/* 
				  在html标签里写ref属性，比如ref="wanzi"
				  在js中，通过this.$refs.wanzi 得到写了ref属性的dom节点。
				*/
				// console.log(this.$refs.contactForm); //表单节点对象
				this.$refs.contactForm.validate(async result => {
					if (result) {
						//校验通过  发起请求，将数据发送给后端
						let {data}=await this.$axios({
							method:"post",
							url:"/administer/suggest/add",
							data:this.contactForm
						})
						if (data.code) {
							this.$message.error(data.message)
						} else{
							this.$message.success(data.message)
						}
						this.$refs.contactForm.resetFields()
					} else {
						//未通过校验
						return false;
					}
				});
			}
		},
		created() {
			this.getArticles()
		}
	};
</script>
<style lang="less" scoped>
	.home>* {
		width: 100%;
		padding: 20px;
		margin-bottom: 15px;
		background-color: #fff;
		box-shadow: 0 0 4px #ddd;
		font-family: Quicksand;
	}

	.home h2 {
		margin-bottom: 15px;
		font-size: 26px;
		letter-spacing: 3px;
		font-family: Quicksand;
		font-weight: bold;
	}

	.home {
		.describe {
			p {
				border-bottom: 1px solid #ddd;
				margin-bottom: 20px;
				padding-bottom: 20px;
				text-indent: 2em;
				color: #444;
				font-size: 14px;
				letter-spacing: 4px;
				line-height: 30px;
			}
		}

		.info {
			display: flex;
			width: 100%;
			font-size: 14px;

			>div {
				width: 50%;
			}

			h3 {
				margin-bottom: 30px;
				font-weight: 400;
				font-size: 22px;
				color: #666;
			}

			.me {
				overflow: hidden;

				li {
					display: flex;
					margin-bottom: 60px;

					&:nth-last-child(1) {
						margin-bottom: 0;
					}

					p {
						flex: 1;
					}

					p:nth-child(1) {
						font-weight: 700;
					}
				}
			}

			.skills {
				li {
					margin-bottom: 30px;

					.lang {
						display: flex;
						justify-content: space-between;

						span {
							font-weight: bold;
							letter-spacing: 2px;
						}

						span:nth-child(2) {
							color: #999;
						}
					}

					.level {
						width: 100%;
						height: 8px;
						background-image: linear-gradient(to right, #bfe2e6 90%, #ececec 90%);
					}
				}
			}
		}

		.recommend {
			.describe a {
				text-decoration: underline;
				color: #aaa;
			}

			.article-list ul {
				display: flex;
				overflow: hidden;
				width: 100%;
				justify-content: space-between;

				li {
					position: relative;
					width: 24%;

					img {
						width: 100%;
						height: 100%;
					}

					h3 {
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 26px;
						background-color: rgba(0, 0, 0, 0.5);
						color: #fff;
						line-height: 26px;
						text-align: center;
						font-size: 1px;
					}

					.cover {
						position: absolute;
						top: 0;
						left: 0;
						opacity: 0;
						width: 100%;
						height: 100%;
						background-color: rgba(0, 0, 0, 0.3);
						transition: 0.3s;

						a {
							display: block;
							width: 100%;
							height: 100%;
							color: #fff;
							text-align: center;

							p {
								position: absolute;
								font-weight: bold;
								transition: 0.3s;
							}

							p:nth-child(1) {
								width: 100%;
								top: 20%;
								font-size: 18px;
							}

							p:nth-child(2) {
								left: 50%;
								bottom: 20%;
								width: 50%;
								height: 30px;
								line-height: 30px;
								background-color: rgb(191, 226, 230);
								color: #000;
								font-size: 14px;
								transform: translateX(-50%);
								border-radius: 15px;
							}
						}
					}

					&:hover .cover {
						opacity: 1;

						p:nth-child(1) {
							top: 30%;
						}

						p:nth-child(2) {
							bottom: 30%;
						}
					}
				}
			}
		}

		.work {
			ul {
				margin: 40px 0;

				li {
					display: flex;

					p.time {
						position: relative;
						top: -12px;
						width: 160px;
						height: 30px;
						margin-right: 28px;
						line-height: 30px;
						text-align: center;
						font-weight: 700;
						background-color: #bfe2e6;

						&::after {
							position: absolute;
							top: 0;
							right: -30px;
							content: "";
							width: 0;
							height: 0;
							border: 15px solid transparent;
							border-left-color: #bfe2e6;
						}
					}

					.introduce {
						position: relative;
						flex: 1;
						padding: 0 40px 40px 20px;
						border-left: 2px solid #bfe2e6;

						&::after {
							position: absolute;
							top: 0;
							left: -3px;
							content: "";
							width: 4px;
							height: 4px;
							background-color: #000;
						}

						h3 {
							position: relative;
							margin-bottom: 20px;
							margin-top: -10px;
							line-height: 25px;
							font-size: 20px;
							font-weight: bold;
						}

						.company {
							color: #000;
							margin-bottom: 20px;
						}

						.describe {
							color: #777;
							letter-spacing: 1px;
							font-size: 16px;
							line-height: 26px;
						}
					}

					&:nth-last-child(1) .introduce {
						padding-bottom: 0;
					}
				}
			}
		}
	}
</style>
