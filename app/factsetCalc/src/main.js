import './assets/main.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'

const initialState = {
  userLoggedIn: false,
};
// Creating a new store instance for saving "session" variables
const store = createStore({
    state: { ...initialState },
    mutations: {
      SET_USER_LOGGED_IN(state, loggedIn) {
        state.userLoggedIn = loggedIn;
      },
      RESET_STORE(state) {
        // Reset the store state to its initial values
        Object.assign(state, initialState);
      }
    },
    actions: {
      setUserLoggedIn({ commit }, loggedIn) {
        commit('SET_USER_LOGGED_IN', loggedIn);
      },
      resetStore({ commit }) {
        // Reset the store to its initial values when the app is closed or window is unloaded
        commit('RESET_STORE');
      }
    },
    getters: {
      userLoggedIn: (state) => state.userLoggedIn
    }
  });

const app = createApp(App)

app.use(router)
app.use(store)
app.use(bootstrap)

app.mount('#app')

window.addEventListener('beforeunload', () => {
  // Dispatch the action to reset the store to its initial values
  store.dispatch('resetStore');
});

