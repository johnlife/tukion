import Vue from 'vue'
import Vuex from 'vuex'

import videos from './modules/videos'
import lists from './modules/lists'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: { videos, lists },
});

store.dispatch("retrieveBackendData");

export default store;

