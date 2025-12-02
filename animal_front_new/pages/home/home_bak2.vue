<template>
	<scroll-view @scrolltolower="lowerBottom" @refresherrefresh="getFresh" scroll-y="true" class="sv" :style="{height:scrollH+'rpx'}">
	<view id="flash_box" class="wrap">
		<view class="item u-border-bottom" v-for="(item, index) in list" :key="index">
			{{'第' + item + '条数据'}}
		</view>
		<u-loadmore :status="status" />
	</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				list: 30,
				page: 0,
				pH:0, //窗口高度
				navHeight:0, //元素的所需高度
				// scrollH: '1500rpx',
			}
		},

		computed:{
			scrollH:function(){
				let sys = uni.getSystemInfoSync();
				console.log(sys)
				let winWidth = sys.windowWidth;
				let winrate = 750/winWidth;
				let winHeight =parseInt(sys.windowHeight*winrate)
				console.log(winHeight)
				return winHeight		
			}
		},
		methods: {
		//触底加载
		lowerBottom(){
			console.log("触底加载")
			if(this.page >= 3) return ;
			this.status = 'loading';
			this.page = ++ this.page;
			setTimeout(() => {
				this.list += 10;
				if(this.page >= 10) this.status = 'nomore';
				else this.status = 'loading';
			}, 2000)
		},
					//下拉刷新
		getFresh(){
			console.log("下拉刷新")
			this.archivesdata.page = 1
			this.noapi = true
			this.getArchives(true)
			},
		},

		// onReachBottom() {
		// 	console.log('触底了')

		// },
		created() {
			console.log('activity created')

		}
	}
</script>

<style lang="scss" scoped>
	// .scrollHeight{
	// 	// height: 1000rpx;
	// 	// height: 1000rpx;
	// }
	.wrap {
		padding: 24rpx;
	}
	
	.item {
		padding: 24rpx 0;
		color: $u-content-color;
		font-size: 28rpx;
	}
</style>