<template>
	<div class="ratingselect">
		<!-- 三个选项：全部，推荐，吐槽 -->
		<div class="rating-type border-1px">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<!-- 只看有内容的评价 -->
		<div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
  const POSITIVE=0;
	const NEGATIVE=1;
	const ALL=2;

	export default{
	//接受到的数据
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			//选择类型,三种类型,全部，推荐，吐槽
			selectType:{
				type:Number,
				default:ALL
			},
			//读内容或不得内容
			onlyContent:{
				type:Boolean,
				default:false		//看所有的
			},
			//描述
			desc:{
				type:Object,
				default(){
					return{
						all:'全部',
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		},
		computed:{
			positives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType===POSITIVE;
				});
			},
			negatives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType===NEGATIVE;
				});
			}
		},
		methods:{
				//改变是三个选择的显示，高亮
			select(type,event){
			//PC页面时,点击不会被 better-scroll阻止事件,初始化,给 better-scroll派发事件,使移动端拥有点击事件,因此切换到PC端时,点击事件会被执行两次,
				if(!event._constructed){
					return;
				}
				//不会改变food组件的selectType
				//this.selectType=type;
				//开发一个事件,绑定到付组件food的select方法，在调用组件那里，接收传到food组件指定的方法
				this.$emit('select', type);
			},
			toggleContent(event){
				if(!event._constructed){
					return;
				}
				//this.onlyContent=!this.onlyContent;
				this.$emit('toggle');
			}
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.ratingselect
		.rating-type
			padding:18px 0
			margin:0 18px
			border-1px(rgba(7,17,27,0.1))
			font-size:0
			.block
				display:inline-block
				padding:8px 12px
				margin-right:8px
				border-radius:1px
				font-size:12px
				line-height:16px
				color:rgb(77,85,93)
				&.active
					color:#fff
				.count
					font-size:8px	
					margin-left:2px
				&.positive 
					background:rgba(0,160,220,0.2)
					&.active
						background:rgb(0,160,220)
				&.negative
					background:rgba(77,85,93,0.2)
					&.active
						background:rgb(77,85,93)
	.switch
		padding:12px 18px
		line-height:24px
		border-bottom:1px solid rgba(7,17,27,0.1)
		color:rgb(147,153,159)
		font-size:0
		&.on
			.icon-check_circle
				color:#00c850
		.icon-check_circle
			display:inline-block
			vertical-align:top
			margin-right:4px
			font-size:24px
		.text
			display:inline-block
			vertical-align:top
			font-size:12px
</style>
