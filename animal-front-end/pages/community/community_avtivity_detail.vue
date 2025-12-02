<template>
	<view>
		<view class="detail">
			<Dynamic2
				v-for="(item,index) in card_list" key="id"
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
				@clickDynamic="clickDynamic(index)"
				@clickUser="clickUser(item.id)"
				@clickFocus="clickFocus(index)"
			>
			</Dynamic2>
		</view>
		
		
		<view class="comment" >
			<view class="plr18r ptb28r f32r fbold c111 bbs2r bgwhite">评论</view>
			<Dynamic3
				v-for="(item,index) in card_list" key="id"
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
				@clickUser="clickUser(item.id)"
				@clickFocus="clickFocus(index)"
			>
			</Dynamic3>
		</view>
		<view @click="myClick()">123</view>
		<!-- 固定底部评论点赞收藏分享 -->
		<view class="posif posi-blr0 flexr-jsa plr18r ptb18r bts2r z5 bgwhite">
<!-- 			<view class="br8r bgf8 plr18r mr8r flex-fitem" @tap="fnCommOpen">
			  <i-icon type="bianji" size="36" color="#999999"></i-icon>
			  <text class="f28r cgray ml8r">想说点什么？</text>
			</view> -->
			<view class="br8r bgf8 plr18r mr8r flex-fitem"  @tap="fnCommOpen()">
				<!-- <i-icon type="bianji" size="36" color="#999999"></i-icon> -->
				<text class="f28r cgray ml8r">想说点什么？</text>
			</view>
			<view class="plr28r bls2r brs2r"  @tap="myClick">
				<uni-icons type="hand-up" size="28" color="#8F8F94"></uni-icons>
				<!-- <uni-icons type="hand-up" size="18" :style="'margin-right: 2px;color:'+thumbsupColor"></uni-icons> -->
				<!-- <i-icon type="dianzan" size="48" :color="albumInfoData.UserTop?'#FF6699':'#8F8F94'"></i-icon> -->
				<!-- <text class="f28r cgray ml8r">{{albumInfoData.TopCount || 0}}</text> -->
				<text class="f28r cgray ml8r">0</text>
			</view>
<!--      <view class="plr28r" @tap="fnSave">
        <i-icon type="shoucang" size="48" :color="albumInfoData.UserSave?'#FF6699':'#8F8F94'"></i-icon>
        <text class="f28r cgray ml8r">{{albumInfoData.SaveCount || 0}}</text>
      </view> -->
 			<view class="pl28r pr8r bls2r"  @tap="myClick">
				<uni-icons type="redo" size="28" color="#8F8F94"></uni-icons>
			</view>
		</view>
		<!-- 分享弹出层 -->
		<share-popup ref="share"></share-popup>
		<!-- 评论输入弹出层 -->
		<comm-input ref="comm" @send="fnCommSend"></comm-input>
	</view>
</template>

<script>
	//动态详情
	import Dynamic2 from '../../components/qizai-dynamic/Dynamic2.vue'
	//评论列表组件
	import Dynamic3 from '../../components/qizai-dynamic/Dynamic3.vue'
	import {base_url} from '../../utils/base_url.js'
	import {base_url2} from '../../utils/base_url.js'
	// 分享弹出层组件
	import SharePopup from '../../components/share-popup/share-popup'
	// 评论输入弹出层组件
	import CommInput from '../../components/comm-input/comm-input'
	export default {
		components: {
		    Dynamic2,
			Dynamic3,
			SharePopup,
			CommInput
		},
		data() {
			return {
				card_list:[        
				],
				id: '',
				uid: '',
				phone: '',
			}
		},
		methods: {
			myClick(){
				console.log('my click');
			},
			/// 显示评论输入框
			fnCommOpen() {
				console.log('open comment');
			  this.$refs.comm.open({
			    type: 'comment',
			    content: this.$store.getters['getCommContentData'],
			    objectid: this.albumID,
			    objecttype: 'album',
			  });
			},
		},
		onLoad(option) {
			console.log('onLoad detail')
			console.log(option)
			let that = this
			uni.request({
				url:base_url + 'community/info/2/?id='+option.id,
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
						that.id = tmp[0]
						that.uid = tmp[8]
						that.phone = tmp[9]
					}
					that.card_list = card_list
				},
			})
			
		}
	}
</script>

<style>

</style>
