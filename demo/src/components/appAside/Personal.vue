<template>
  <div class="personal">
    <div class="me">
      <div class="photo"></div>
      <div class="info">
        <h5>叶仙</h5>
        <p>web develop</p>
      </div>
      <div class="contact">
        <a href="https://github.com/" class="iconfont icon-github"></a>
        <a href="#" class="iconfont icon-twitter"></a>
        <a href="https://weibo.com/" class="iconfont icon-tubiaozhizuo-"></a>
        <!-- 微信二维码弹出层 -->
        <el-popover
          placement="bottom"
          :width="200"
          trigger="click"
        >
          <template #reference>
            <a href="#" class="iconfont icon-weixin"></a>
          </template>
          <img src="../../assets/images/personal/weixin.png" width="200" height="200" alt="">
        </el-popover>
        <a href="http://wpa.qq.com/msgrd?v=3&uin=1257914811&site=qq&menu=yes" class="iconfont icon-QQ"></a>
      </div>
      <div class="download">
        <a href="#">Download CV</a>
    </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Personal",
};
</script>

<style lang="less">
.personal {
  width: 100%;
  height: 220px;
  margin-bottom: 15px;
  box-shadow: 0 0 4px #ddd;
  .me {
    padding-top: 20px;
    background-color: #bfe2e6;
    text-align: center;
    .photo {
      display: inline-block;//不独占一行,不换行
      width: 60px;
      height: 60px;
      border: 2px solid #fff;
      background: url("../../assets/images/personal/yibo.png") no-repeat 50% /
        cover;
      vertical-align: middle;//水平中线垂直对齐
      border-radius: 50%;
    }
    .info {
      display: inline-block;
      margin-left: 12px;
      vertical-align: middle;
      text-align-last: left;//文本换行前左对齐
      h5 {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 5px;//属性用来增加或减少字符或汉字之间的距离
      }
      p {
        font-family: "Quicksand-Light";
      }
      p:nth-child(2){
        margin-top: 5px;
        color: #555;
        letter-spacing: 2px;
      }
    }
    .contact {
      display: flex;
      margin: 15px 0;
      justify-content: space-around;
      a {
        font-size: 20px;
        color: #4d4c4c;
      }
    }
    .download{
        width: 100%;
        padding: 20px 0;
        background-color: #fff;
        a{
            display: block;
            width: 60%;
            height: 40px;
            border-radius: 30px;
            margin: 0 auto;
            background-color: rgb(191,226,230);
            line-height: 40px;
            color: #000;
            font-family: "Quicksand";
            font-size: 16px;
            font-weight: bold;
            
        }
    }
  }
}
</style>