import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Meta from 'vue-meta';
import axios from "axios"
import hostingsConfig from '../../config/hostings';
import VuePlyr from 'vue-plyr';

Vue.use(Vuetify, {
    options: {
        customProperties: true
    }
});
Vue.use(VueRouter);
Vue.use(Meta);
Vue.use(VuePlyr);

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$http = axios;


const hostingNames = Object.keys(hostingsConfig).join(', ');
const hostings = Object.values(hostingsConfig);

Vue.prototype.$rules = {
    required: value => !!value || 'Required.',
    supported: value => !!(value && hostings.find(hosting => hosting.url_pattern.test(value))) || 'We support only urls from '+hostingNames,
};

export default Vue
