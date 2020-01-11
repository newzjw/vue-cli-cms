<template>
  <mt-header fixed title="vue-cli改造项目">
    <span slot="left" @click="goBack" v-show="flag">
      <mt-button icon="back">返回</mt-button>
    </span>
  </mt-header>
</template>

<script>
export default {
  name: 'PubHeader',
  data () {
    return {
      flag: false
    }
  },
  created () {
    // 在created这里判断是否是首页。如果没这句，刷新之后返回按钮就会消失
    this.flag = !this.$route.path === '/home'
  },
  methods: {
    goBack () {
      // 点击后退
      this.$router.go(-1)
    }
  },
  watch: {
    '$route.path': function (newVal) {
      // 如果是首页，隐藏返回按钮
      if (newVal === '/home') {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  }
}
</script>

<style>

</style>
