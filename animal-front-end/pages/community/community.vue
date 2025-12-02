<template>
		<view class="community-container">
			<!-- 顶部导航栏 -->
			<view class="community-container-tabnav">
				<wly-tabnav ref="tabnav" :fixed="true" :tabnav="tabnav" @ontype_="ontype" @communityIndex="communityIndex"></wly-tabnav>
			</view>
			<view class="community-container-body">
				<!-- 轮播图 -->
				<view class="community-container-swiper">
					<u-swiper
					        :list="swiper_list"
					        previousMargin="30"
					        nextMargin="30"
					        circular
					        :autoplay="false"
					        radius="5"
					        bgColor="#ffffff"
							@click="click"
					></u-swiper>
				</view>
				<view class="community-container-line">
					<u-line color="#efefef"></u-line>
				</view>
			
				<view class="community-element" >
					<info v-if="index == 0"></info>
				</view>

				<view class="community-element" >
					<activity :list="lists" :loadStatus="loadStatus" v-if="index == 1"></activity>
				</view>
				<view class="community-element" >
					<help v-if="index == 2"></help>
				</view>

				<view>
					<text>11</text>
			

				
					<text>22</text>
				</view>

			</view>

		</view>
		

</template>

<script>
	import info from '../../components/community/community_info.vue'
	import activity from '../../components/community/community_activity.vue'
	import help from '../../components/community/community_help.vue'
	

	
	export default {
		components:{
			info,
			activity,
			help,
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
                },
				{
				    type: '', //状态值
				    name: '救助日志',
				    list: [123], //数据
				}],
				// 轮播图数据
				swiper_list: [
				    'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				    'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
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
			communityIndex(index){
				this.index = index
				console.log('community:', index)
			},
			ontype(e){
				
			}
		},

		created() {
			console.log('community load')
		},
		onReachBottom() {
			console.log('触底了')
		}
		

	}
</script>

<style lang="scss">
	.community-container{
		width: 100%;
	}
	.community-container-body{
		position: relative;
		top: 90rpx;
	}
	.community-container-line{
		position: relative;
		top: 15rpx;
	}
	.community-container-swiper{

	}
	.community-element{
	
	}
</style>
