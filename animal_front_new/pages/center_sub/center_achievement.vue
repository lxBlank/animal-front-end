<template>
<view class="main">
	<view class="con">
		<view class="left">
			<image class="img" src="/static/centerImg/cat1.png">
		</view>
		<view class="right">
			<view class="title">动态数据</view>
			<view class="data">{{pageData.dynamic}}条</view>
			<view class="detail">
				点赞:{{pageData.like}} 回复:{{pageData.reply}} 浏览:{{pageData.look}}
			</view>
		</view>
	</view>
	<view class="con" style="background-color: #c5aedd;">
		<view class="left">
			<image class="img" src="/static/centerImg/cat4.png">
		</view>
		<view class="right" style="background-color: #c5aedd;">
			<view class="title">发起的活动</view>
			<view class="data">{{pageData.activity1}}次</view>
		</view>		
	</view>
	<view class="con" style="background-color: #f6bf94;">
		<view class="left">
			<image class="img" src="/static/centerImg/cat3.png">
		</view>
		<view class="right" style="background-color: #f6bf94;">
			<view class="title">参加的活动</view>
			<view class="data">{{pageData.activity2}}次</view>
		</view>		
	</view>

</view>
</template>
<script>
	import {getachieviementUrl} from '../../utils/base_url.js'
	export default {
		data() {
			return {
				pageData:{
					dynamic: 12,
					activity1: 6,
					activity2: 2,
					like: 20,
					look: 100,
					reply: 45
				},
			}
		},
		methods: {
			getData(){
				var that = this
				uni.request({
					url: getachieviementUrl,	
					header:{
						Authorization:uni.getStorageSync('token'),
					},
					data:{
						index: 0,
					},
					success(res) {
						that.pageData = res.data.data
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
.main{
	margin: 0;
	padding: 0;
	width: 100%;
	background-color: #f6f6f6;
}
.con{
	height: 180px;
	border-radius: 6px;
	width: 94%;
	margin: 10px auto;
	display: flex;
	flex-direction: row;
	box-shadow: 1px 1px 1px gray;
	background-color: white;
	background-color: #d5edff;
}
.left{
	width: 40%;
	border: 2px solid black;
	border-radius: 6px;
}
.right{
	width: 60%;
	background-color: #d5edff;
}
.img{
	width: 100%;
	height: 100%;
	border-radius: 6px;
}
.title{
	margin-top: 14px;
	margin-left: 10px;
	font-size: 30px;
	font-weight: bolder;
	font-family: Arial, Helvetica, sans-serif;
	
}
	
.data{
	margin-top: 20px;
	margin-left: 10px;
	font-size: 25px;
	font-weight: bolder;
}
.detail{
	margin-top: 20px;
	margin-left: 10px;
	font-weight: bolder;
}
</style>
