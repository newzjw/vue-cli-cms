import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from '@/pages/tabbar/HomeContainer.vue'
import MemberContainer from '@/pages/tabbar/MemberContainer.vue'
import ShopcarContainer from '@/pages/tabbar/ShopcarContainer.vue'
import SearchContainer from '@/pages/tabbar/SearchContainer.vue'
import NewsList from '@/pages/news/NewsList.vue'
import NewsInfo from '@/pages/news/NewsInfo.vue'
import PhotoList from '@/pages/photos/PhotoList.vue'
import PhotoInfo from '@/pages/photos/PhotoInfo.vue'
import GoodsList from '@/pages/goods/GoodsList.vue'
import GoodsInfo from '@/pages/goods/GoodsInfo.vue'
import GoodsDesc from '@/pages/goods/GoodsDesc.vue'
import GoodsComment from '@/pages/goods/GoodsComment.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeContainer
    },
    {
      path: '/home',
      name: 'HomeContainer',
      component: HomeContainer
    },
    {
      path: '/member',
      name: 'MemberContainer',
      component: MemberContainer
    },
    {
      path: '/shopcar',
      name: 'ShopcarContainer',
      component: ShopcarContainer
    },
    {
      path: '/search',
      name: 'SearchContainer',
      component: SearchContainer
    },
    {
      path: '/home/newslist',
      name: 'newslist',
      component: NewsList
    },
    {
      path: '/home/newsinfo/:id',
      name: 'newsinfo',
      component: NewsInfo
    },
    {
      path: '/home/photolist',
      name: 'photolist',
      component: PhotoList
    },
    {
      path: '/home/photoinfo/:id',
      name: 'photoinfo',
      component: PhotoInfo
    },
    {
      path: '/home/goodslist',
      name: 'goodslist',
      component: GoodsList
    },
    {
      path: '/home/goodsinfo/:id',
      name: 'goodsinfo',
      component: GoodsInfo
    },
    {
      path: '/home/goodsdesc/:id',
      name: 'goodsdesc',
      component: GoodsDesc
    },
    {
      path: '/home/goodscomment/:id',
      name: 'goodscomment',
      component: GoodsComment
    }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})
