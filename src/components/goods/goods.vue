<template>
<div>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li class="food-item border-1px" @click="selectFood(food,$event)" v-for="(food,index) in item.foods">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="cout">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol @add="addFood" :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
	</div>
	<food :food="selectedFood" ref="food"></food>
</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import shopcart from 'components/shopcart/shopcart';
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	import food from 'components/food/food';

	const ERR_OK=0;

	export default{
		//App.vue中的router-view中传来的
	 	props:{
	 		seller:{
	 			type:Object
	 		}
	 	},
	 	data(){
			return {
				goods:[],
				listHeight:[],			//各个food-item的高度
				scrollY:0,
				selectedFood:{}
	 		};
	 	},
		computed: {
			//左侧索引应该在哪
			currentIndex(){
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];			//当前
					let height2=this.listHeight[i+1];		//下一个
					if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){			//落在最后一个或落在当前区间
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
        let foods = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
	 	created() {
	 	  this.classMap=['decrease','discount','special','invoice','guarantee'];
	 		this.$http.get('/api/goods').then((response)=>{
				response =response.body;
	      if(response.errno === ERR_OK){
	        this.goods=response.data;
	        //为了在数据变化之后等待 Vue.js 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback) 
	        this.$nextTick(() => {
					 	this._initScroll();
					 	this._calculateHeight();
	        });
	      }
	 		});
	 	},
	 	methods:{
	 		selectMenu(index,event){			//传值：左侧到第几个
	 			if(!event._constructed){
					return;
	 			}
	 			let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
	 			let el=foodList[index];
	 			this.foodsScroll.scrollToElement(el,300);
				console.log(index);
	 		},
	 		
	 		//小球从添加的位置到购物车的方法函数根据版本的不同
	 		_drop(target) {
        // 体验优化,异步执行下落动画,这样第一次添加该商品时，减号与小球运动不那么卡
        this.$nextTick(() => {
          	this.$refs.shopcart.drop(target);
        });
      },
	 		//调用shopcart中的drop下落的方法
	 		addFood(target){
				this._drop(target);
	 		},

	 	//滚动,new BScroll第一个参数是一个dom对象，第二个参数是一个json对象。取到dom对象，要用ref获取
			_initScroll(){
				this.menuScroll=new BScroll(this.$refs.menuWrapper,{
					click:true
				});

				this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
					probeType:3,			//属性：滚动时可以检测到实时滚动的位置，相当于探针的作用
					click:true
				});
				//监听事件scroll，实时报出滚动的位置，回调函数的参数pos
				this.foodsScroll.on('scroll',(pos)=>{
					this.scrollY=Math.abs(Math.round(pos.y));
				})
			},
			//计算高度
			_calculateHeight(){
				let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let height=0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item=foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectFood(food,event){
				if(!event._constructed){
					return;
	 			}
				this.selectedFood=food;
				//调用food组件，然后就可以调用food组件中的show方法
				this.$refs.food.show();
			}
	 	},
	 	components:{
	 		shopcart,
	 		cartcontrol,
	 		food
	 	}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"
	.goods
		display:flex
		position:absolute
		top:174px
		bottom:46px
		width:100%
		overflow:hidden
		.menu-wrapper
			flex:0 0 80px
			width:80px
			background-color:#f3f5f7
			.menu-item
				display:table
				width:54px
				padding:0 12px
				height:54px
				line-height:14px
				&.current
					position:relative
					z-index:10
					margin-top:-1px
					background:#fff
					font-weight:700
					.text
						border-none()
				.icon
					display:inline-block
					vertical-align:top		
					width:12px
					height:12px
					background-size:12px 12px 
					background-repeat:no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
				.text
					display:table-cell
					font-size:12px
					width:56px
					vertical-align:middle
					border-1px(rgba(7,17,27,0.1))
		.foods-wrapper
			flex:1
			.title
				padding-left:14px
				height:26px
				font-size:12px
				line-height:26px
				color:rgb(147,153,159)
				border-left:2px solid #d9dde1
				background:#f3f5f7
			.food-item
				display:flex
				margin:18px
				padding-bottom:18px
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					border-none()
					margin-bottom:0
				.icon
					flex: 0 0 57px
					margin-right: 10px
				.content
					flex:1
					.name
						margin:2px 0 8px 0
						font-size:14px
						height:14px
						color:rgb(7,17,27)
						line-height:14px
					.desc,.extra
						font-size:10px
						line-height:10px
						color:rgb(147,153,159)
						margin-bottom:8px			
					.desc
						line-height:12px
					.extra
						.cout
							margin-right:12px
					.price
						font-weight:700
						line-height:24px
						.now 
							margin-right:8px
							font-size:14px
							color:rgb(240,20,20)
						.old
							text-decoration: line-through;
							font-size:10px
							color:rgb(147,153,159)
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:12px
</style>