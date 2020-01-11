<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>

    <!-- 3. 评论子组件区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
// 1. 导入 评论子组件
import comment from '@/common/comment.vue'
import { Toast } from 'mint-ui'
import axios from 'axios'

export default {
  data () {
    return {
      id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值挂载到 data上，方便以后调用
      newsinfo: {} // 新闻对象
    }
  },
  created () {
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo () {
      // 获取新闻详情
      axios.get('http://www.liulongbin.top:3005/api/getnew/' + this.id).then(result => {
        if (result.data.status === 0) {
          this.newsinfo = result.data.message[0]
        } else {
          Toast('获取新闻失败！')
        }
      })
    }
  },
  components: {
    // 用来注册子组件的节点
    'comment-box': comment
  }
}
</script>

<style lang="scss">
// 这里如果内容区域有图片，图片样式有问题
// 解决办法是设置图片样式，同时把scoped去掉
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
