import 'babel-polyfill';
import 'lifeNode/essentials';
import Vue from './initVue';
import VueRouter from 'vue-router';
import routes_json from './routes.json';
import Theme from "./Theme";
import store from './store'
import Application from './components/Application';

window.Vue = Vue;

const routes = routes_json.map(route => ({
    ...route,
    component: require(`./pages/${route.page}`),
}));

const router = new VueRouter({
    mode: "history",
    routes
});

new Vue({
    components: {
        Application
    },
    el: "#app",
    router,
    store,
    data: {
        // storage
    },
    created() {
        this.$vuetify.theme = Theme;
    }
});

