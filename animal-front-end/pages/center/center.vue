<template>
	<view class="page">
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
				<view class="bottom">
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
						<image src="../../static/myIcon/info.png" mode="aspectFit"></image>
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
						<image src="../../static/myIcon/achievement.png" mode="aspectFit"></image>
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
						<image src="../../static/myIcon/dongtai.png" mode="aspectFit" style="width: 100rpx; height: 100rpx;"></image>
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
				<view class="item item-bottom-solid" @click="toIndex(4)">
					<view class="left flex-center">
						<image src="../../static/myIcon/activity.png" mode="aspectFit" style="width: 100rpx; height: 100rpx;"></image>
					</view>
					<view class="center">
						<text>参加活动</text>
					</view>
			 	    <view class="right2 flex-center">
						<uni-icons class="icon" type="right" size="20"></uni-icons>
				    </view>
				</view>
		    </view>
		</view>
		<view class="quit flex-center">
			<view class="btn flex-center">退出登录</view>
		</view>
		
	  </view>
</template>


<script>
	import {base_url} from '../../utils/base_url.js'
	import {base_url2} from '../../utils/base_url.js'
	export default {
		data() {
			return {
				// 保存用户信息
				user_info: {},
				user_img_url: '',
			}
		},
		methods: {
			// 定位
			toIndex(index){
				console.log(index)
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
						console.log(res.data.data)
						uni.setStorageSync('user_info', res.data.data)
						that.user_info = res.data.data
						that.user_img_url = base_url + that.user_info['avator']
						console.log(that.user_img_url)
						console.log(that.user_info)
					}
					else{
						console.log(res.data.msg)
					}
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
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
		margin-top: 50px;
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

</style>




