import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入 网站，肯定会 调用 main.js, 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var localcar = JSON.parse(localStorage.getItem('car') || '[]')
// new Vuex.Store() 实例，得到一个 数据仓储对象
export default new Vuex.Store({
  state: {
    // 大家可以把 state 想象成 组件中的 data ,专门用来存储数据的
    // 如果在 组件中，想要访问，store 中的数据，只能通过 this.$store.state.*** 来访问
    car: localcar // 将 购物车中的商品的数据，用一个数组存储起来，在 car 数组中存储一些商品的对象，咱们可以暂时将这个商品对象，设计成这个样子
    // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
  },
  mutations: {
    // 注意： 如果要操作 store 中的 state 值，只能通过 调用 mutations 提供的方法，才能操作对应的数据，不推荐直接操作 state 中的数据，因为 万一导致了数据的紊乱，不能快速定位到错误的原因，因为，每个组件都可能有操作数据的方法；
    // 注意： 如果组件想要调用 mutations 中的方法，只能使用 this.$store.commit('方法名')
    // 这种 调用 mutations 方法的格式，和 this.$emit('父组件中方法名')
    // 注意： mutations 的 函数参数列表中，最多支持两个参数，其中，参数1： 是 state 状态； 参数2： 通过 commit 提交过来的参数；
    addToCar (state, goodsinfo) {
      // 点击加入购物车，把商品信息，保存到 store 中的 car 上
      // 分析：
      // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
      // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

      // 假设 在购物车中，没有找到对应的商品
      var flag = false
      console.log(goodsinfo.count)
      state.car.some(item => {
        // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
        if (item.id === goodsinfo.id) {
          console.log(item.count, goodsinfo.count)
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo (state, goodsinfo) {
      // 购物车内修改购物车中商品的数量值
      // 分析：
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar (state, id) {
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1)
          return true
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected (state, info) {
      state.car.some(item => {
        if (item.id === info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的 所有购物车商品的状态保存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { // this.$store.getters.***
    // 注意：这里的 getters， 只负责 对外提供数据，不负责 修改数据，如果想要修改 state 中的数据，请 去找 mutations
    // 经过咱们回顾对比，发现 getters 中的方法， 和组件中的过滤器比较类似，因为 过滤器和 getters 都没有修改原数据， 都是把原数据做了一层包装，提供给了 调用者；
    // 其次， getters 也和 computed 比较像， 只要 state 中的数据发生变化了，那么，如果 getters 正好也引用了这个数据，那么 就会立即触发 getters 的重新求值；
    // 计算购物车内所有商品的数量之和
    getAllCount (state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    // 获取购物车内各个商品的数量，返回一个对象： { 88: 2, 89: 1, 90: 4 }
    getGoodsCount (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    // 获取购物车内各个商品的被选中状态，返回一个对象： { 88: true, 89: false, 90: true }
    getGoodsSelected (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    // 获取购物车内商品总数量和总价
    getGoodsCountAndAmount (state) {
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})
// 总结：
// 1. state中的数据，不能直接修改，如果想要修改，必须通过 mutations
// 2. 如果组件想要直接 从 state 上获取数据： 需要 this.$store.state.***
// 3. 如果 组件，想要修改数据，必须使用 mutations 提供的方法，需要通过 this.$store.commit('方法的名称'， 唯一的一个参数)
// 4. 如果 store 中 state 上的数据， 在对外提供的时候，需要做一层包装，那么 ，推荐使用 getters, 如果需要使用 getters ,则用 this.$store.getters.***
