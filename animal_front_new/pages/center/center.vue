<template>
	<view class="page">
		<!-- 提示框 -->
		<u-modal 
			:show="popParams.show" 
			:title="popParams.title" 
			:content='popParams.content' 
			@confirm="popConfirm" 
			@cancel='popCancel'
			:showCancelButton='true'></u-modal>
		<!-- 顶部背景 -->
		<view class="top">
			<view class="background"></view>
		</view>
		<!-- 卡片上方部分 -->
		<view class="user-card">
			<view class="card">
				<!-- 头像 -->
				<view class="top">
					<image class="userImage" :src="user_img_url" mode="aspectFit"></image>
				</view>
				<!-- 姓名 手机号 箭头 -->
				<view class="bottom"  @click="toIndex(1)">
					<!-- 左侧姓名 手机号 -->
					<view class="left">
						<view class="user-text">
							<text>{{user_info['username']}}</text>
						</view>
						<view class="user-phone"> {{user_info['phone']}} </view>
					</view>
					<!-- 右侧 箭头 -->
					<view class="right2 flex-center">
						<uni-icons class="icon" type="right" size="20"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<!-- 卡片下方部分 -->
		<view class="list-card">
			<!-- 列表1 -->
			<view class="card">
				<view class="item item-bottom-solid" @click="toIndex(1)">	
					<view class="left flex-center">
						<image src="../../static/centerImg/info.png" mode="aspectFit"></image>
					</view>
					<view class="center">
						<text>个人信息</text>
					</view>
					<view class="right2 flex-center">
						<uni-icons class="icon" type="right" size="20"></uni-icons>
					</view>
				</view>
			</view>
			<!-- 列表2 -->
			<view class="card">
				<view class="item item-bottom-solid" @click="toIndex(2)">
					<view class="left flex-center">
						<image src="../../static/centerImg/achievement.png" mode="aspectFit"></image>
					</view>
					<view class="center">
						<text>点滴成就</text>
					</view>
					<view class="right2 flex-center">
						<uni-icons class="icon" type="right" size="20"></uni-icons>
					</view>
				</view>
			</view>
			<!-- 列表3 -->
			<view class="card">
				<view class="item item-bottom-solid" @click="toIndex(3)">
					<view class="left flex-center">
						<image src="../../static/centerImg/dongtai.png" mode="aspectFit" style="width: 100rpx; height: 100rpx;"></image>
					</view>
					<view class="center">
						<text>历史动态</text>
					</view>
					<view class="right2 flex-center">
						<uni-icons class="icon" type="right" size="20"></uni-icons>
					</view>
				</view>
			</view>
			<!-- 列表4 -->
			<view class="card">
				<view class="item " @click="toIndex(4)">
					<view class="left flex-center">
						<image src="../../static/centerImg/activity.png" mode="aspectFit" style="width: 100rpx; height: 100rpx;"></image>
					</view>
					<view class="center">
						<text>活动管理</text>
					</view>
			 	    <view class="right2 flex-center">
						<uni-icons class="icon" type="right" size="20"></uni-icons>
				    </view>
				</view>
		    </view>
		</view>
		<view class="quit flex-center">
			<view class="btn flex-center" @click="quitBtn">退出登录</view>
		</view>
		<view class="end"></view>
		<template>
			<u-popup :show="popShow" :round="40" mode="bottom" @close="popClose" @open="popOpen">
				<view class="addBtnCon">
					<div class="addBtn" @click="addClick(1)">
						<div style="margin: 0 auto; display: flex;">
							<div><image class="addImg" src="/static/activity/dynamic.png"></div>
							<div>我发起的活动</div>
						</div>
					</div>
		            <div class="addBtn" @click="addClick(2)">
						<div style="margin: 0 auto; display: flex;">
							<div><image class="addImg" src="/static/activity/activity.png"></div>
							<div>我参加的活动</div>
						</div>
					</div>
					<div class="addBtn" @click="addClick(3)">
						<div style="margin: 0 auto; display: flex;">
							<div><image class="addImg" src="/static/activity/back.png" alt=""></div>
							<div>返回</div>
						</div>
					</div>
				</view>
			</u-popup>
		</template>
	  </view>

</template>


<script>
	import {base_url} from '../../utils/base_url.js'
	import {base_url2} from '../../utils/base_url.js'
	import {centerUrl} from '../../utils/base_url.js'
	
	export default {
		data() {
			return {
				//活动管理弹窗参数
				popShow: false,
				activityIndex: 0,
				//退出弹窗参数
				popParams: {
					show: false,
					content: '',
					title: '',
					cancel: false,
					confirm: false,
					type: 0
				},
				// 保存用户信息
				user_info: {},
				user_img_url: '',
			}
		},
		methods: {
			//活动管理弹窗
			addClick(type){
				if(type == 1){
					this.popClose()
					this.activityIndex = 1
					uni.navigateTo({
						url:'../center_sub/center_activity1'
					})
				}
					
				else if(type == 2){
					this.popClose()
					this.activityIndex = 2
					uni.navigateTo({
						url:'../center_sub/center_activity2'
					})
				}
				else if(type == 3){
					this.popClose()
				}
			},
			popOpen() {
				this.popShow = true
			},
			popClose() {
				this.popShow = false
			},
			// 退出弹框
			popConfirm(){
				this.popParams.confirm = true
				this.popParams.show = false
				if(this.popParams.type == 1){
					this.quitBtnEx()
				}
			},
				
			popCancel(){
				this.popParams.cancel = true
				this.popParams.show = false
			},
			// 定位
			toIndex(index){
			
				if(index == 1){
					uni.navigateTo({
						url:'../center_sub/center_info'
					})
					
				}
				else if(index == 2){
					uni.navigateTo({
						url:'../center_sub/center_achievement'
					})
					
				}
				else if(index == 3){
					uni.navigateTo({
						url:'../center_sub/center_dynamic'
					})
				}
				else if(index == 4){
					this.popOpen()
				}
			},
			// 退出登录
			quitBtn(){
				// 提醒是否退出登录，防止误点	
				
				this.popParams.title = '提醒'
				this.popParams.content = '是否确定退出登录'
				this.popParams.type = 1
				this.popParams.show = true
			},
			quitBtnEx(){
				try {
					// 清除token、uid
					uni.removeStorageSync('token');
					uni.removeStorageSync('uid');
				} catch (e) {
					console.log("token清除失败")
				}
				uni.redirectTo({
					url:'../login/login'
				})
			}
		},
		created() {
			console.log('center load')
			// 获取用户信息
			var that = this
			uni.request({
				url: base_url + 'users/get_user_info/',	
				header:{
					Authorization:uni.getStorageSync('token'),
				},
				success(res) {
					if(res.data.code == 1){
						uni.setStorageSync('user', res.data.data)
						that.user_info = res.data.data
						that.user_img_url = that.user_info['avator']
						console.log(that.user_img_url)
						console.log(that.user_img_url)
					}
					else{
						if(res.data.code == -6){
							uni.redirectTo({
								url:'../login/login'
							})
						}
						console.log(res.data.msg)
					}
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.addBtnCon{
		height: 220px;
		margin-top: 20px;
		text-align: center;
	}
	.addBtn{
		display: flex;
		margin: 10px auto;
		text-align: center;
		width: 330px;
		font-size: 20px;
		font-weight: 10px;
		height: 50px;
		line-height: 50px;
		background-color: #f9ae3d;
		color: #fff;
		border-radius: 20px;
	}
	.addImg{
		width: 50px;
		height: 50px;
		margin-right: 5px;
	}
	.top{
		height: 250rpx;
		position: relative;
		.background {
			background-color: $base-color;
			border-bottom-left-radius: 22px;
			border-bottom-right-radius: 22px;
			position: absolute;
			height: 180rpx;
			width: 100%;
		}
	}

	.user-card {
		height: 170rpx;
		padding: 0 15px;
		.card {
			position: relative;
			bottom: 62px;
			height: 250rpx;
			background-color: white;
			border-radius: 5px;
			.top {
				height: 30%;
				position: relative;
				.userImage {
					position: absolute;
					bottom: 24%;
					left: 10%;
					width: 150rpx;
					height: 150rpx;
					// overflow: hidden;
					border-radius: 50%;
					border: 2px solid white;
					
				}
			}
			.bottom{
				display: flex;
				height: 70%;
				.left{
					width: 80%;
					height: 100%;
					position: relative;
					.user-text{
						width: 100%;
						font-size: 1.6em;
						padding-left: 80rpx;
						height: 50%;
					}
					.user-phone{
						color: #96a1ae;
						padding-left: 80rpx;
						height: 50%;
						width: 100%;
						font-size: 0.9em;
					}
				}
				.right2{
					width: 20%;
					height: 50%;
				}
			}
		}
	}
	.list-card {
	  padding: 0 15px;
	  .card {
		border-radius: 5px;
		position: relative;
		background-color: white;
		border-radius: 5px;
		padding: 5px 30px;
		.item {
		  display: flex;
		  height: 120rpx;
		  .left {
			width: 15%;
			image{
				width: 80rpx;
				height: 70rpx;
			}
		  }
		  .center {
			width: 65%;
			display: flex;
			justify-content: start;
			align-items: center;
			font-size: 1.1em;
		  }
		  .right2{
			width: 20%;
			justify-content: flex-end;
		  }
		}
	  }
	}
	.item-bottom-solid {
		border-bottom: 1px solid #d4d6da;
	}
	.quit{
		height: 100rpx;
		margin-top: 30px;
		.btn{
			background-color: $base-color;
			border-radius: 30px;
			width: 80%;
			color: white;
			font-size: 1.2em;
			height: 100%;
	  }
	}
	.flex-center{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.end{
		height: 100px;
		// border: solid 2px red;
		bottom: 100px;
	}
</style>




