import { createStore } from 'vuex';
import ModuleUser from './user';

export default createStore({
  // 存储各种数据
  state: {
  },

  // 可以基于state中的值计算出新的属性，并对外提供
  getters: {
  },

  // 可以修改state，可以接收额外的参数，不允许异步操作
  mutations: {
  },

  // 可以异步操作，类似于mutations，但是不可以修改state
  actions: {
  },

  // 把以上几个功能分割到其他单独的模块中，避免代码过长
  modules: {
    user: ModuleUser,
  }
});
