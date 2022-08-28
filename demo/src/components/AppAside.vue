<template>
  <Personal></Personal>
  <div :class="{'fixedbox':fixedbox}"><!-- 动态绑定fixedbox的值为true显示 -->
	  <HotArticle></HotArticle>
	  <Visitor></Visitor>
  </div>
  
</template>

<script>
import Personal from "@/components/appAside/Personal"
import HotArticle from "@/components/appAside/HotArticle"
import Visitor from "@/components/appAside/Visitor"
export default {
    name:"AppAside",
    components:{Personal, HotArticle, Visitor},
	data() {
		return {
			fixedbox: false
		}
	},
	methods:{
		scroll(){
			let top=document.documentElement.scrollTop//获取滚动条的top值
			this.fixedbox=(top>=235)
		}
	},
	mounted(){
		this.scroll()//挂载时调用
		window.addEventListener("scroll",()=>{//滚动时调用
			this.scroll()
		})
	}
}
</script>

<style lang="less" scopet>
	.fixedbox{
		position: fixed;
		top: 65px;
		width: 270px;
	}
</style>