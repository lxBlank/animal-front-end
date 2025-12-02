<template>
	<scroll-view @scrolltolower="lowerBottom" @refresherrefresh="getFresh" scroll-y="true" class="sv" :style="{height:scrollH+'rpx'}">
	<view class="info_container">
		<!-- 
		 publishTime：发表时间
		 
		 -->
		<Dynamic v-for="(item, index) in card_list" :key="item.duid"
		    :imgList="item.imgList" 
		    :avatar="item.avatar"
		    :name="item.name"
		    :publishTime="item.publishTime"			
		    :content="item.content"
		    :isLike="item.isLike"
		    :isGiveReward="item.isShare"
		    :likeNumber="item.likeNumber"
		    :giveRewardNumber="item.giveShareNumber"
		    :chatNumber="item.chatNumber"
			:place="item.place"
			:help="item.help"
			:health="item.health"
			:createTime="item.createTime"
			:isFocusOn="item.isFocusOn"
		    @clickDynamic="clickDynamic(item.id, item.duid)"
		    @clickUser="clickUser(item.id)"
		    @clickFocus="clickFocus(index)"
		    @clickThumbsup="clickThumbsup(item, index)"
		    @clickGiveReward="clickShare(item.id)"
		    @clickChat="clickChat(item.id, index)">
		</Dynamic>
		<u-loadmore :status="status" />
		<view style="height: 50px;"></view>
	</view>
	</scroll-view>
</template>

<script>
	import Dynamic from '@/components/qizai-dynamic/Dynamic.vue'
	import {base_url, base_url2, interactUrl1, interactUrl2} from '@/utils/base_url.js'
	export default {
		name:"info",
		components:{
			Dynamic
		},
		data() {
			return {
				status: 'loadmore',
				list: 30,
				page: 1,
				size: 3,
				total: 0,
				pH:0, //窗口高度
				navHeight:0, //元素的所需高度
				// 数据
				card_list:[]				
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
			// 点击空白处
			// 跳转详情页
			clickDynamic(id, index){
				//此处index为动态duid
				
				// 增加浏览量
				uni.request({
					url:interactUrl2,
					method:'POST',
					data:{
						'duid': index
					},
					header: {
						Authorization: uni.getStorageSync('token'),
					},
					success: (res) => {
						console.log(uni.getStorageSync('token'))
						// console.log(res)
					},
					fail: (e) => {
						// console.log('error')
						console.log(e)
					}
				})	
				
				//跳转动态详情页
				uni.navigateTo({
					// url: `../../pages/home/avtivity_detail?id=${id}`
					url: `/pages/home/activity_detail?id=${index}`
				})
				console.log("跳转动态详情页")
			},
			// 点击用户信息
			clickUser(e){e
				console.log("用户信息：" + e)
			
			},

			// 点击关注
			clickFocus(id, index){
				console.log("关注：" + e)
				// this.list[e].isFocusOn = this.list[e].isFocusOn ? false : true;
				// console.log(e);
				// console.log('childUser');
			
			},
			// 点赞
			clickThumbsup(item, index){	
				var that = this
				uni.request({
					url:interactUrl1,
					method:'POST',
					data:{
						'duid': item.duid
					},
					header: {
						Authorization: uni.getStorageSync('token'),
					},
					success: (res) => {
						
					},
					fail: (e) => {
						console.log(e)
					}
				})	
			},
			// 分享
			clickShare(e){
				console.log("分享：" + e)
				// console.log(e);
				// console.log('clickGiveReward');
			},
			// 点击评论
			clickChat(id, index){
				console.log("评论：" + e)
				// this.myclickTo(id)
				// console.log('clickChat');
			},
			//获取数据
			getData(){
				let that = this
				
				uni.request({
					url:base_url + 'community/info/3/',
					method:'GET',
					header: {
						Authorization: uni.getStorageSync('token'),
					},
					data:{
						page: that.page,
						size: that.size,
						// type: -1,
						// condition: '1'
					},
					success: (res) => {
				
						var data = res.data.data
						
						var total = 0
			
						if(!data){
							total = 0
						}				
						else{
							total = data.length
						}
						
						let card_list = []
						for(var i = 0; i < total; i++){
							var tmp = data[i]
							var cardDetail = {
								id: tmp['id'],
								duid: tmp['duid'],
								name: tmp['username'],
								// phone: tmp['phone'],
								// email: tmp['email'],
								// gender: tmp['gender'],
								avatar: tmp['avator'],
								content: tmp['content'],
								imgList: tmp['imgList'],
								likeNumber: tmp['like'],
								chatNumber: tmp['reply'],
								giveShareNumber: tmp['trans'],
								health: tmp['health'],
								help: tmp['help'],
								publishTime: tmp['imgTime'],
								// publishTime: new Date(tmp['imgTime']).getTime() / 1000,
								createTime: tmp['createTime'],
								place: tmp['place'],
								isLike: tmp['isLike'],
								isReply: tmp['isReply'],
								isShare: tmp['isShare']
							}
				
							that.card_list.unshift(cardDetail)
							
						}
						// console.log(that.card_list)
					},
					fail: (e) => {
						console.log(e)
					}
				})	
			}
		},
		
		created(){
			this.getData()
		}
	}
</script>

<style>
	.info_container{
		margin-top: 10rpx;
		margin-bottom: 300rpx;
		background-color: #f6f6f6;
		/* border: 2px red solid; */
		/* height: 100rpx; */
	}
</style>