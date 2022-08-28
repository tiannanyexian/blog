<template>
    <div class="about">
      <article>
        <h2>关于我</h2>
        <p>帅气这个形容词,大概就是为我而创造的吧😏</p>
        <p>谢谢你这么好看还这么关注我鸭！</p>
        <p>有必要强调一下,我很懒能不动就不动!</p>
      </article>
      <article>
        <h2>关于网站</h2>
        <p class="it"><span>前  端</span>：<span>Vue + Element</span></p>
        <p class="it"><span>后  端</span>：<span>Node + Express + Mongodb</span></p>
        <p><span>服务器</span>：<a href="/">阿里云ECS</a> | <a href="/"> 腾讯云</a></p>
        <p>这个博客终于能够在2022年上线了！</p>
        <p>第一个前后端项目,太难了</p>
      </article>
      <article>
        <h2>关于版权</h2>
        <p>在注明出处的前提下,本站文章允许非商业用途的转载</p>
      </article>
      <article>
        <h2>其他</h2>
        <p>我是一名前端开发初学者,网站有问题可以在👈左侧边栏找到我的联系方式哦。</p>
      </article>
    </div>
</template>

<script>
export default {
  name: 'About',
}
</script>
<style lang="less" scoped>
  article{
    width: 100%;
    margin-bottom: 15px;
    padding: 25px 20px;
    background-color: #fff;
    font-family: Quicksand, Microsoft YaHei, sans-serif;
    box-sizing: border-box;
    box-shadow: 0 0 4px #ddd;
    h2{
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }
    p{
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
      a{
        color: #409eff;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    p.it{
      span:nth-child(2){
        color: #bd4147;
        background-color: rgba(27, 31, 35, 0.05);
        font-weight: 700;
      }
    }
  }
</style>