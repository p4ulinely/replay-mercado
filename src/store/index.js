import { createStore } from 'vuex'
import userModule from './modules/userModule.js';

const store = createStore({
  state: {
    appInfo: {
      version: '1.0'
    },
    sesssionInfo: {
      id: '',
    }
  },
  getters: {
  },
  mutations: {
    INITIALISE_STORE(state) {
			if(localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
      else{
        console.log('APP sem dados do localStorage.')
      }
		}
  },
  actions: {
  },
  modules: {
    userModule,

  }
});

store.subscribe((mutation, state) =>
  localStorage.setItem('store', JSON.stringify(state)));

export default store;