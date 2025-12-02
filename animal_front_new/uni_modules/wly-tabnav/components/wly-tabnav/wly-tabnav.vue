<template>
		<view class="wly-tabnav" :style="(fixed==true?'position: fixed;':'')+tabStyle">

			<!-- 导航 -->
			<view class="tabs" data-ind='0' v-for="(item,indexNav) in tabnav" :key="item.name"
				:class="type === item.type?'tabss':''" @click="typefun(indexNav,item.type)">
				<text class="text" :style="type === item.type ? optStyle:optStyleElse" >{{item.name}}</text>
			</view>

			<!-- 进度 -->
			<view class="speed" :style="'left:'+(dataInd)*(tabWid / tabnav.length)+'px;width:'+(tabWid / tabnav.length)+'px'">
				<view class="speed-box" :style="'width:'+ (lineW || (tabWid / tabnav.length * 0.5))+'px;'+lineStyle"></view>
			</view>
		</view>

</template>

<script>
	export default {
		name: 'wly-tabnav',
		props:{
			// 线条宽度 单位px
			lineW:{
				type: [Number,String],
				default: 0
			},
            // 选中的文字样式
            optStyle:{
                type: [String],
                default: 'color: #333333;'
            },// 其他未选中的文字样式
            optStyleElse:{
                type: [String],
                default: 'color: #999999;'
            },
            // 自定义样式
            tabStyle:{
            	type: [String],
            	default: ''
            },
			// 自定义进度条样式
			lineStyle:{
				type: [String],
				default: ''
			},
			// 是否固定
			fixed:{
				type: Boolean,
				default: true
			},
            // 默认选中值
            defaultKey:{
            	type: [String,Number],
            	default: ''
            },
			// 菜单导航
			tabnav: {
				type: Array,
				default:[
    //                 {
				// 	type: '', //状态值
				// 	name: '全部',
				// 	list: [], //数据
				// },
                ]
			},
		},
		data() {
			return {
                tabWid:750,//tab组件宽度
				btnbb: true,
				userId: '',
				pageSize: 10,
				pageNum: 1,
				type: '', //当前选择类型
				dataInd: 0, //当前选择的索引
				orderStatus: '',
				deliveryId: '',
				navigateLastPage: 0, //总页数
				list: [],
			};
		},
        created() {
            let that = this;
            setTimeout(()=>{
                if(that.defaultKey){
                    that.type = that.defaultKey;
                    that.dataInd = that.tabnav.findIndex(item=>item.type==this.defaultKey);
                }else{
                    that.type = that.tabnav[0].type;
                }
            },50)
            
            setTimeout(()=>{
                let info = uni.createSelectorQuery().in(that).select(".wly-tabnav");
                	info.boundingClientRect(function(data) { 
                        that.tabWid = data.width
                }).exec(function(res){
                	// 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
                })
            },50)
        },
		methods: {
			typefun(ind) {
				this.dataInd = ind;
				this.type = this.tabnav[ind].type;
				this.pageNum = 1;

				// 判断当前有没有数据
				if (this.tabnav[ind].list.length == 0) {}
				
				this.$emit('ontype_',this.tabnav[ind])
				// 返回导航签索引
				this.$emit('tabIndex', ind);
			},
		}
	}
</script>

<style lang="scss">
	.wly-tabnav {
		height: 80rpx;
		line-height: 80rpx;
		background: #FFF;
		position: relative;
		width: 750rpx;
		left: 0px;
		// top: 3%;
		// margin-top: 4px;
		z-index: 1;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-content: space-around;
		.speed {
			position: absolute;
			bottom: 0rpx;
			left: 0;
			width: 150rpx;
			transition: left 0.3s;

			align-items: center;

			.speed-box {
				margin: auto;
				height: 6rpx;
				background: #FD383F;
				border-radius: 10px;
			}
		}

		.tabs {
			width: 150rpx;
			text-align: center;

			.text {
				text-align: center;
				font-size: 28rpx;
                transition: all 0.3s;
			}
		}

		// .tabss {
		// 	.text {
		// 		font-size: 28rpx;
		// 		font-weight: 600;
		// 	}
		// }
	}
</style>
