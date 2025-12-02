<template>
	<view class="container">
	
		<!-- 自定义导航位置 -->
		<!-- 页面 -->
		<!-- 首页 -->
		<home v-if="index === 0"></home>
		<!-- 地图 -->
		<mapmodel v-if="index === 1"/>
		<!-- 发布 -->
		<publish v-if="index === 21"/>
		<activity  v-if="index === 22"/>
		<!-- 消息 -->
		<message v-if="index === 3"  :newMessage='newMessage'/>
		<!-- 个人信息 -->
		<center v-if="index === 4"/> 
		<!--
		<messsage v-if="index === 3"/>
		<center v-if="index === 4"/> 
		-->
		
		<!-- 底部导航 -->
		<foo-bar @toIndex="toIndex"></foo-bar>
	</view>
</template>

<script>
	// 首页
	import home from '../home/home.vue'
	import mapmodel from  '../map/map.vue'
	import mapmodel2 from  '../map2/map2.nvue'
	import publish from '../publish/publish.vue'
	import activity from '../activity/activity.vue'
	import message from  '../message/message.vue'
	import center from  '../center/center.vue'
	// import ceshi from '../ceshi/ceshi.vue'
	import fooBar from  '@/components/fooBar/fooBar.vue'
	import {newMessageUrl} from '../../utils/base_url.js'
	export default {
		components:{
			fooBar,
			home,
			mapmodel,
			mapmodel2,
			publish,
			message,
			center,
			activity,
			// ceshi,
		},
		data() {
			return {
				index: 0,
				title: '社区',
				skeletonOff: false,
				newMessage: 'home测试数据',
				isMessage: false,
			}
		},
		watch:{
			isMessage:{
				handler(newValue, oldValue){
					if(newValue){
						this.isMessage = false
						this.longPolling()
					}
				}
			}
		},
		methods: {
		
			toIndex(index){
				// index 当前页面的索引
				this.index = index
				console.log(index)
			},
			// 发起长轮询请求
			longPolling() {
				var that = this
			  uni.request({
			    url: newMessageUrl, // 后端Django服务器的地址
				header:{
					Authorization:uni.getStorageSync('token'),
				},
			    success: function(res) {
					if(res.data['code'] == 1){
						var data = res.data.data
						that.newMessag = data
					}
					// 再次发起长轮询请求
					that.isMessage = true
			    },
			    fail: function(res) {
					// 请求失败，再次发起长轮询请求
					that.isMessage = true
			    },
			    complete: function(res) {
			      // 请求完成，再次发起长轮询请求
			      that.isMessage = true
			    }
			  });
			}

		},
		created() {
		},
		mounted() {
			this.longPolling();
		},
		// onReachBottom() {
		// 	console.log('main触底了')
		// }
	}
</script>

<style>
	.container{
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: #f6f6f6;
	}

</style>