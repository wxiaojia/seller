// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';

import 'common/stylus/index.styl';

Vue.use(VueRouter);

var routes=[
	{path:'/',redirect: '/goods'}, 
	{path:'/goods',component:goods},
	{path:'/ratings',component:ratings},
	{path:'/seller',component:seller}
]

var router=new VueRouter({
	linkActiveClass: 'active',
  	routes
});

new Vue({
	el:'#app',
	router,
	render:h=>h(App)
})




// Vue.use(VueRouter);
// let app=Vue.extend(App);
// let router=new VueRouter();
// router.map({
// 	'/goods':{
// 		component:goods
// 	}
// })
// router.start(app,"#app")





