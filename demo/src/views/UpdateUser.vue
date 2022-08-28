<template>
  <div class="update-info">
      <article>
        <h2>修改用户名</h2>
        <UpdateName></UpdateName>
      </article>
      <article>
        <h2>修改密码</h2>
        <UpdatePass></UpdatePass>
      </article>
      <article>
        <h2>头像上传</h2>
        <UpdatePhoto></UpdatePhoto>
      </article>
  </div>
</template>

<script>
import UpdateName from "@/components/user/UpdateName";
import UpdatePhoto from "@/components/user/UpdatePhoto";
import UpdatePass from "@/components/user/UpdatePass";
export default {
    name:"UpdateUser",
    components:{UpdateName,UpdatePhoto,UpdatePass}
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
  }
</style>