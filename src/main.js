// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';

import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
// 配置路由
var routes=[
	{path:'/',redirect: '/goods'}, 
	{path:'/goods',component:goods},
	{path:'/ratings',component:ratings},
	{path:'/seller',component:seller}
]

var router=new VueRouter({
	linkActiveClass: 'active',	//v-link时，会添加属性
  	routes
});

new Vue({
	el:'#app',
	router,
	render:h=>h(App)
})






