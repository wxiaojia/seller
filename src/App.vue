<template>
  <div>
  <!-- :seller即v-bind:seller传输对象 -->
   <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <!--使用指令v-link进行导航-->
      <div class="tab-item">
        <router-link to="/goods">商品</router-link> 
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link> 
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link> 
      </div>
    </div>
      <!-- 路由外链  keep-alive缓存组件，比如在商品中点击购买数后切换到商家，再切换回来时不会消失，他会保存组件的状态，不会再发送请求 -->
      <keep-alive>
        <router-view :seller="seller" ></router-view>
      </keep-alive> 
  </div>
</template>

<script type="text/ecmascript-6">
 import {urlParse} from 'common/js/util';
 import header from 'components/header/header.vue';
 const ERR_OK = 0
 export default{
  data() {
    return {
      seller:{
        id:(()=>{
          let queryParam=urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  //一个生命钩子，函数，调用ajax获取页面初始化所需的数据。
  created(){
    this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
      response =response.body;          //拿到json对象
      if(response.errno === ERR_OK){    
        //Object.assign三个参数，{}最终返回的结果...相当与extend的方式，去扩展seller属性，然后把空的Object，然后放回给this.seller（vue对象扩展属性的方法）,只有知道id才能缓存;
        this.seller=Object.assign({},this.seller,response.data);
      }
    });
  },
  components:{
    'v-header':header
  }
 }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display:flex
    width:100%
    heigth:40px
    line-height: 40px
    // border-bottom:1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex:1
      text-align:center
      &>a
        display:block
        font-size: 14px
        color: rgb(77,85,93)
        &.active
          color:rgb(240,20,20)
</style>
