<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import axios from 'axios'

export default {
  data () {
    return {
      newslist: [] // 保存新闻列表数据
    }
  },
  created () {
    this.getNewsList()
  },
  methods: {
    getNewsList () {
      // 获取新闻列表
      axios.get('http://www.liulongbin.top:3005/api/getnewslist').then(result => {
        if (result.data.status === 0) {
          // 如果没有失败，应该把数据保存到 data 上
          this.newslist = result.data.message
        } else {
          Toast('获取新闻列表失败！')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      // 两端对齐
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
