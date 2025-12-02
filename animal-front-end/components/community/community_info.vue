<template>
	
	<view class="info_container">
		
		<Dynamic v-for="(item,index) in card_list" key="id"
		    :imgList="item.imgList" 
		    :avatar="item.avatar"
		    :name="item.name"
		    :publishTime="item.publishTime"
		    :content="item.content"
		    :isLike="item.isLike"
		    :isGiveReward="item.isGiveReward"
		    :likeNumber="item.likeNumber"
		    :giveRewardNumber="item.giveRewardNumber"
		    :chatNumber="item.chatNumber"
		    @clickDynamic="clickDynamic(item.id, index)"
		    @clickUser="clickUser(item.id)"
		    @clickFocus="clickFocus(index)"
		    @clickThumbsup="clickThumbsup(item.id, index)"
		    @clickGiveReward="clickGiveReward(item.id)"
		    @clickChat="clickChat(item.id, index)">
		</Dynamic>
		

				
	</view>
</template>

<script>
	import Dynamic from '../qizai-dynamic/Dynamic.vue'
	import {base_url} from '../../utils/base_url.js'
	import {base_url2} from '../../utils/base_url.js'
	export default {
		components: {
		    Dynamic
		},
		data() {

			return {

				card_list:[
                {
                    id:1,
                    avatar:'../../static/user_boy.png',
                    name:'小新',
                    publishTime:1617086756,
                    content:'中国外交官这样讽加拿大总理，算不算骂？该不该骂？',
                    imgList:[
                        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
                        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
                    ],
                    isLike:false,
                    isGiveReward:true,
                    likeNumber:2,
                    giveRewardNumber:2,
                    chatNumber:2,
                    isFocusOn:true,
                },

                {
                    id:2,
                    avatar:'../../static/user_boy.png',
                    name:'小白',
                    publishTime:1617036656,
                    content:'  足不出户享国内核医学领域顶级专家云诊断，“中山-联影”分子影像远程互联融合创新中心揭牌 ',
                    imgList:[
                        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
                    ],
                    isLike:false,
                    isGiveReward:false,
                    likeNumber:0,
                    giveRewardNumber:0,
                    chatNumber:2,
                    isFocusOn:true,
                },
        

				]				
			}
		},
		methods: {
			// 点击空白处
			clickDynamic(id, index){
				this.myclickTo(id)
			},
			// 点击用户信息
			clickUser(e){
				
				console.log('childUser');
			},
			myclickTo(id){
				uni.navigateTo({
					url: `../../pages/community/community_avtivity_detail?id=${id}`
				})
			},
			// 点击关注
			clickFocus(e){
				this.list[e].isFocusOn = this.list[e].isFocusOn ? false : true;
				console.log(e);
				console.log('childUser');
			},
			// 点赞
			clickThumbsup(e){
				console.log(e);
				console.log('childThumbsup');
			},
			// 点击打赏
			clickGiveReward(e){
				console.log(e);
				console.log('clickGiveReward');
			},
			// 点击聊天
			clickChat(id, index){
				this.myclickTo(id)
				console.log('clickChat');
			}
		},

		created() {
			console.log('community_info load')
			let that = this
			uni.request({
				url:base_url + 'community/info/1/',
				header: {
					Authorization: uni.getStorageSync('token'),
				},
				success: (res) => {
					var data = res.data.data
					var total = data.length
					
					let card_list = []
					console.log(res)
					for(var i = 0; i < total; i++){
						var tmp = data[i]
						// 时间戳
						var timestamp = new Date(tmp[3]).getTime() / 1000
						// 头像地址
						var avator = base_url + tmp[1]
						console.log(avator)
						// 处理图片列表
						var arr = tmp[5].split(',')
						var imgList = []
						for(var i = 1; i < arr.length; i++){
							imgList.push(base_url2+arr[i])
						}
						console.log(imgList)
						var card_detail = {
							id: tmp[0],
							avatar: avator,
							name: tmp[2],
							publishTime: timestamp,
							content:tmp[4],
							imgList:imgList,
							// isLike:false,
							// isGiveReward:true,
							likeNumber: tmp[6],
							// giveRewardNumber: data[7],
							chatNumber:tmp[7],
							// isFocusOn:true,
						}
						card_list.push(card_detail)
					}
					that.card_list = card_list
				},
			})
			
		}
		
	}
</script>

<style>
	.info_container{
		margin-top: 10rpx;
		margin-bottom: 200rpx;
		/* border: 2px red solid; */
		/* height: 100rpx; */
	}
</style>