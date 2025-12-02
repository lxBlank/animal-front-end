<template>
		<view class="home-container">
			<!-- 顶部导航栏 -->
			<view class="home-container-tabnav">
				<wly-tabnav ref="tabnav" :fixed="true" :tabnav="tabnav" @tabIndex="tabIndex"></wly-tabnav>
			</view>
			
			<view class="home-container-body">
				<!-- 轮播图 -->
				<view class="home-container-swiper">
					<!-- 
					loop_list: 轮播图数据
					click：点击第几张图
					change：切换到第几张图
					 -->
					<u-swiper
					        :list="loop_list"
					        previousMargin="30"
					        nextMargin="30"
					        circular
					        :autoplay="false"
					        radius="5"
					        bgColor="#ffffff"
							@click="click"
							@change="change"
					></u-swiper>
				</view>
				<!-- 线条 -->
<!-- 				<view class="home-container-line">
					<u-line color="#d0d0d0"></u-line>
				</view> -->
				<!-- 动态 -->
				<view class="home-element" >
					<info v-if="index == 0"></info>
				</view>
				<view class="home-element" >
					<activity :list="lists" :loadStatus="loadStatus" v-if="index == 1"></activity>
				</view>
<!-- 				

			
				<view class="community-element" >
					<info v-if="index == 0"></info>
				</view>

	
				<view class="community-element" >
					<help v-if="index == 2"></help>
				</view>

				<view>
					<text>11</text>
			

				
					<text>22</text>
				</view> -->

			</view>

		</view>
		

</template>

<script>
	// import info from '../../components/community/community_info.vue'
	// import activity from '../../components/community/community_activity.vue'
	// import help from '../../components/community/community_help.vue'
	// 动态组件
	import info from '../../components/home/info.vue'
	import activity from '../../components/home/activity.vue'
	
	export default {

		components:{
			info,
			activity,
			// help,
		},
		data() {
			return {
				index: 0,
				// 顶部导航数据
				tabnav: [{
                    type: '', //状态值
                    name: '社区动态',
                    list: [123], //数据
                },{
                    type: '', //状态值
                    name: '志愿活动',
                    list: [123], //数据
                }],
				// 轮播图数据
                loop_list: [
                    'http://192.168.43.103:8080/media/home/animal1.png',
                    'http://192.168.43.103:8080/media/home/animal2.png',
                    'http://192.168.43.103:8080/media/home/animal3.png',
                ],
				
				lists:[],
				loadStatus:'loading',
				
				status: 'nomore',
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了'
			}
		},
		methods: {
			// 顶部导航切换索引
			tabIndex(index){
				console.log(index)
				this.index = index
			},

		},

		created() {

		},
		onReachBottom() {
		
		}
		

	}
</script>

<style lang="scss">
	.home-container{
		width: 100%;
		margin:0px;
		padding: 0px;
		background-color: #f6f6f6;
	}

	.home-container-body{
		position: relative;
		top: 90rpx;
	}
		
	.home-container-tabnav{
	
	}
	.home-container-line{
		position: relative;
		top: 15rpx;
	}
	.home-container-swiper{

	}
	.home-element{
	
	}
</style>
