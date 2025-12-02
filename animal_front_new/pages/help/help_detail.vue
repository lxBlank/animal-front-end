<template>
	<view class="flex-col page" >
	  <view class="flex-col flex-auto group_2">
	    <view class="flex-col group_3 space-y-16">
	      <text class="self-start font_1">救助情况</text>
	      <text class="font_2 text_3">
	        {{infoData.condition}}
	      </text>
	    </view>
		<view class="flex-col group_3 space-y-16">
		  <text class="self-start font_1">救助结果</text>
		  <text class="font_2 text_3">
		    {{infoData.result}}
		  </text>
		</view>
		<view class="flex-col group_3 space-y-16">
		  <text class="self-start font_1">主要救助人员</text>
		  <text class="font_2 text_3">
		    {{infoData.people}}
		  </text>
		</view>
	    <view class="flex-col group_4 space-y-12">
	      <text class="self-start font_1">其他</text>
	      <text class="self-start text_4">时间</text>
	      <view class="flex-row justify-between">
	        <text class="font_2">救助时间</text>
	        <view class="flex-row space-x-3">
	          <text class="font_2">{{timestampToTime(infoData.mtime)}}</text>
	        </view>
	      </view>
		  <view class="flex-row justify-between">
		    <text class="font_2">救助地点</text>
		    <view class="flex-row space-x-3">
		      <text class="font_2">{{infoData.place}}</text>
		    </view>
		  </view>
		</view>
	    
	    </view>
	  <view >
	  	<u-modal :show="popParams.show" :title="popParams.title" :content='popParams.content' @confirm='popConfirm'></u-modal>
	  </view>
	  <u-divider text="活动报名者"></u-divider>
	  <view class="signCon" v-for="(item, index) in signUser" :key="item.uid">
	
		  <div class="signCard">
			  <div class="signLeft">
				  	<u-avatar :src="item.avator"></u-avatar>
			  </div>
			  <div class="signRight">
				  <div class="signRightText font_2">电话：{{item.phone}}</div>
				  <div class="signRightText font_2">邮箱：{{item.email}}</div>
				  <div class="signRightText font_2">时间：{{timestampToTime(item.mtime)}}</div>
			  </div>
		  </div>
		  	  <u-gap height="3" bgColor="#dddddd"></u-gap>
	  </view>
	
	</view>
</template>

<script>

		import {signInfoUrl} from '@/utils/base_url.js'
		import {signActivityUrl, getLogUrl} from '@/utils/base_url.js'
export default {
	data() {
		return {
			// 弹窗
			popParams:{
				show: false,
				title: '提示',
				content: '报名成功'
			},
			auid: '',
			uid: '',
			name:'默认姓名',
			// 活动数据
			infoData: {},
			// 报名信息数据
			signUser: [],

		};
	},
	onLoad: function(e) {
		console.log(e)
		this.auid = e.id
	},
	onShow: function() {
		console.log('onShow')
	},
	created() {
		var that = this
			//请求该活动信息
			uni.request({
				url:getLogUrl,
				method:'GET',
				header: {
					Authorization: uni.getStorageSync('token'),
				},
				data:{
					index: 1,
					auid: that.auid
				},
				success: (res) => {	
					that.infoData = res.data.data
				},
				fail: (e) => {
					console.log(e)
				}
			})		
			// 请求用户是否报名、是否为发起人, 报名者信息
			uni.request({
				url:signInfoUrl,
				method:'GET',
				header: {
					Authorization: uni.getStorageSync('token'),
				},
				data:{
					auid: that.auid,
					uid: that.uid
				},
				success: (res) => {	
					console.log(res)
					var data = res.data.data
					that.signUser = res.data.data.data
					if(parseInt(data['isUser']) == 1){
						that.isUser = true
						that.isShow = false
					}
					else if(parseInt(data['isSign']) == 1){
						that.isSign = true
						that.isShow = false
					}
					
				},
				fail: (e) => {
					console.log(e)
				}
			})		
		
	},
	methods:{

		popConfirm(){
			thia.popParams = false
		},

		// 时间戳
		timestampToTime(timestamp) {
			var strLen = timestamp.length
				
			if(strLen <= 10){
				timestamp = parseInt(timestamp)*1000
			}
			timestamp = parseInt(timestamp)
			timestamp = timestamp ? timestamp : null;
		    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		 
		    let Y = date.getFullYear() + '-';
		    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
		    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		    return Y + M + D + h + m;
		},	
	}
}
</script>

<style scoped>
	.signCon{
		margin: 0 auto;
	}
	.signCard{
		display: flex;
		flex-direction: row;
		margin-left: 10px;
	}
	.signLeft{
		margin-top: 13px;
	}
	.signRight{
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}
	.signRightText{
		margin-top: 5px;
	}
	.mtime{
		margin-left: 30px;
		font-size: 26rpx;
		font-family: 'PingFangSC-Regular';
		line-height: 36rpx;
		color: #c7c7cd;
	}
	
	html {
	  font-size: 16px;
	  background-color: #efefef;
	}
	
	body {
	  margin: 0;
	  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
	    'Droid Sans', 'Helvetica Neue', 'Microsoft Yahei', sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  
	}
	
	view,
	image,
	text {
	  box-sizing: border-box;
	  flex-shrink: 0;
	   
	}
	
	#app {
	  width: 100vw;
	  height: 100vh;
	}
	
	.flex-row {
	  display: flex;
	  flex-direction: row;
	}
	
	.flex-col {
	  display: flex;
	  flex-direction: column;
	}
	
	.justify-start {
	  justify-content: flex-start;
	}
	
	.justify-end {
	  justify-content: flex-end;
	}
	
	.justify-center {
	  justify-content: center;
	}
	
	.justify-between {
	  justify-content: space-between;
	}
	
	.justify-around {
	  justify-content: space-around;
	}
	
	.justify-evenly {
	  justify-content: space-evenly;
	}
	
	.items-start {
	  align-items: flex-start;
	}
	
	.items-end {
	  align-items: flex-end;
	}
	
	.items-center {
	  align-items: center;
	}
	
	.items-baseline {
	  align-items: baseline;
	}
	
	.items-stretch {
	  align-items: stretch;
	}
	
	.self-start {
	  align-self: flex-start;
	}
	
	.self-end {
	  align-self: flex-end;
	}
	
	.self-center {
	  align-self: center;
	}
	
	.self-baseline {
	  align-self: baseline;
	}
	
	.self-stretch {
	  align-self: stretch;
	}
	
	.flex-1 {
	  flex: 1 1 0%;
	}
	
	.flex-auto {
	  flex: 1 1 auto;
	}
	
	.grow {
	  flex-grow: 1;
	}
	
	.grow-0 {
	  flex-grow: 0;
	}
	
	.shrink {
	  flex-shrink: 1;
	}
	
	.shrink-0 {
	  flex-shrink: 0;
	}
	
	.relative {
	  position: relative;
	}
	.page {
	  background-color: #ffffff;
	  width: 100%;
	  overflow-y: auto;
	  overflow-x: hidden;
	  height: 100%;
	}
	.font_1 {
	  font-size: 36rpx;
	  font-family: 'PingFangSC-Semibold';
	  line-height: 50rpx;
	  font-weight: 600;
	  color: #000000;
	}
	.group_2 {
	  padding: 26rpx 40rpx 38rpx;
	  overflow-y: auto;
	}
	.space-y-4 > view:not(:first-child),
	.space-y-4 > text:not(:first-child),
	.space-y-4 > image:not(:first-child) {
	  margin-top: 8rpx;
	}
	.text_2 {
	  color: #000000;
	  font-size: 48rpx;
	  font-family: 'PingFangSC-Semibold';
	  font-weight: 600;
	  line-height: 66rpx;
	}
	.font_2 {
	  font-size: 26rpx;
	  font-family: 'PingFangSC-Regular';
	  line-height: 36rpx;
	  color: #000000;
	}
	.image_5 {
	  border-radius: 16rpx;
	  width: 670rpx;
	  height: 400rpx;
	}
	.group_3 {
	  margin-right: 14rpx;
	  margin-top: 64rpx;
	}
	.space-y-16 > view:not(:first-child),
	.space-y-16 > text:not(:first-child),
	.space-y-16 > image:not(:first-child) {
	  margin-top: 32rpx;
	}
	.text_3 {
	  line-height: 48rpx;
	  text-align: left;
	}
	.group_4 {
	  margin-top: 76rpx;
	}
	.space-y-12 > view:not(:first-child),
	.space-y-12 > text:not(:first-child),
	.space-y-12 > image:not(:first-child) {
	  margin-top: 24rpx;
	}
	.text_4 {
	  color: #000000;
	  font-size: 30rpx;
	  font-family: 'PingFangSC-Semibold';
	  font-weight: 600;
	  line-height: 42rpx;
	}
	.space-x-3 > view:not(:first-child),
	.space-x-3 > text:not(:first-child),
	.space-x-3 > image:not(:first-child) {
	  margin-left: 6rpx;
	}
	.font_3 {
	  font-size: 26rpx;
	  font-family: 'PingFangSC-Regular';
	  line-height: 36rpx;
	  color: #888888;
	}
	.button {
	  margin-top: 48rpx;
	  padding: 20rpx 0;
	  background-color: #e89f4f;
	  border-radius: 8rpx;
	  width: 334rpx;
	}
	.text_5 {
	  color: #ffffff;
	  font-size: 34rpx;
	  font-family: 'PingFangSC-Regular';
	  line-height: 48rpx;
	}
</style>