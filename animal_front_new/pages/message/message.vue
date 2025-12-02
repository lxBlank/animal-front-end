<template>
	<scroll-view @scrolltolower="lowerBottom" @refresherrefresh="getFresh" scroll-y="true" class="sv" :style="{height:scrollH+'rpx'}">
	<view style="background-color: #f6f6f6;">
		
		<hm-reply-card :newMessage='newMessage' :oldMessage='oldMessage'></hm-reply-card>
		<u-loadmore :status="status" />
		<view style="height: 50px;"></view>
		
	</view>
	</scroll-view>
</template>

<script>
	import HmReplyCard from '../../components/hm-reply-card/index.vue'
	import {messageUrl} from '../../utils/base_url.js'
	
	export default {
		props: ['newMessage'],
		components: { HmReplyCard },
		data() {
			return {
				page: 1,
				size: 10,
				total: 0,
				pH:0, //窗口高度
				navHeight:0, //元素的所需高度
				oldMessage: [],
				status: '',
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
				this.status = 'loading';
				if(this.page*this.size <= this.total){
					this.page = this.page + 1;
					console.log(this.page)
					this.getData()
				}
				
				if(this.page*this.size > this.total){
					this.status = 'nomore';
					console.log('没有更多了')
				} 
				else this.status = 'loading';
			},
			//下拉刷新
			getFresh(){
				console.log("下拉刷新")
				this.page = 1
				this.getData()
			},
			getData(){
				var that = this
				uni.request({
					url: messageUrl,
					method:'GET',
					header: {
						Authorization: uni.getStorageSync('token'),
					},
					data:{
						page: that.page,
						size: that.size,
					
					},
					success: (res) => {
						var len = that.oldMessage.length
					
						
						that.total = res.data.total
				
						if(len == 0){
							that.oldMessage = res.data.data
						}
						else{
							that.oldMessage =  that.oldMessage.concat(res.data.data)	
						}
					},
					fail: (e) => {
						// console.log('error')
						console.log(e)
					}
				})
			}
		},
		created() {
			this.getData()
		}
	}
</script>

<style>

</style>
