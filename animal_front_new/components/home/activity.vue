<template>
	<scroll-view @scrolltolower="lowerBottom" @refresherrefresh="getFresh" scroll-y="true" class="sv" :style="{height:scrollH+'rpx'}">
	<view id="flash_box" class="wrap">
		<view v-for="(item, index) in dataList" :key="item.auid" style="margin-bottom: 5px;">
			<hm-news-card :options="item"></hm-news-card>
		</view>
		<u-loadmore :status="status" />
		<view style="height: 50px;"></view>
	</view>
	</scroll-view>
</template>

<script>
	import HmNewsCard from '@/components/hm-news-card/index.vue'
	import {searchActivity} from '@/utils/base_url.js'
	export default {
		components: {HmNewsCard},
		data() {
			return {
				status: 'loadmore',
				list: 30,
				page: 1,
				size: 3,
				total: 0,
				pH:0, //窗口高度
				navHeight:0, //元素的所需高度
				// scrollH: '1500rpx',
				dataList: [],
				options: {
				  img: '/static/hm-news-card/images/img_22726_0_0.png',
				  title: '新闻标题',
				  author: '作者',
				  date: '16 MAY 2016',
				  summary:
					'新闻概要。新闻概要长度最好控制在50字符以内',
				  comments: "14 评论",
				  likes: "254 喜欢",
				  url: '',
				  showComments: true,
				  showLikes: true,
		
				}
			}
		},
		methods:{
			// toActivity(){
			// 	console.log('点击了活动')
			// }
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
				this.page = this.page + 1;
				this.getData()
				if(this.total == 0) this.status = 'nomore';
				else this.status = 'loading';
			},
			//下拉刷新
			getFresh(){
				console.log("下拉刷新")
				this.page = 1
				this.getData()
			},
			getData(){
				console.log('getData')
				var that = this
				uni.request({
					url:searchActivity,
					method:'GET',
					header: {
						Authorization: uni.getStorageSync('token'),
					},
					data:{
						page: that.page,
						size: that.size,
						type: -1,
						condition: '1'
					},
					success: (res) => {	
						console.log(res)
						if(res.data.total == 0){
							that.total = 0
						}
						else{
							var data = res.data.data
							var total = data.length
							that.total = total
							let card_list = []
							for(var i = 0; i < total; i++){
								var tmp = data[i]
								var summary = tmp['content']
								var strLen = summary.length
								if (strLen > 50){
									summary = summary.substring(0,50) + '......'
								}
								var cardDetail = {
									auid: tmp['auid'],
									uid: tmp['uid'],
									img: tmp['file_list'],
									title: tmp['title'],
									author: tmp['name'],
									data: tmp['mtime'],
									summary: summary,
								}
								that.dataList.push(cardDetail)
							}
						}
						
						
						
					},
					fail: (e) => {
						console.log(e)
					}
				})	
			}
		},
		
		// onReachBottom() {
		// 	console.log('触底了')

		// },
		created() {
			this.getData()
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