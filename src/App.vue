<template>
  <div id="app">
    <pub-header></pub-header>
    <!-- 中间的 路由 router-view 区域 -->
    <transition>
      <router-view></router-view>
    </transition>
    <pub-footer></pub-footer>
  </div>
</template>

<script>
import PubHeader from '@/pages/PubHeader'
import PubFooter from '@/pages/PubFooter'
export default {
  name: 'App',
  components: {
    PubHeader,
    PubFooter
  }
}
</script>

<style lang="scss" scoped>
#app {
  padding-top: 40px;
  padding-bottom: 50px;
  // 解决tabbar左右切换时候出现滚动条的问题
  overflow-x: hidden;
  width: 100%;
}

// 切换动画效果
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
