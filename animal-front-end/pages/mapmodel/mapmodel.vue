<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="community-container-tabnav">
			<wly-tabnav ref="tabnav" :fixed="true" :tabnav="tabnav" @ontype_="ontype" @communityIndex="communityIndex"></wly-tabnav>
		</view>
		
		<view class="page-body" v-if="index == 0">
			<view class="page-section page-section-gap">
				<map style="width: 750rpx; height: 1400rpx;" :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 顶部导航数据
			index: 0,	//索引，哪一页
			tabnav: [{
			    type: '', //状态值
			    name: '动物位置',
			    list: [123], //数据
			},{
			    type: '', //状态值
			    name: '动物信息',
			    list: [123], //数据
			}
			],
			// 地图数据
			id:0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude: 39.909,
			longitude: 116.39742,
			covers: [{
				latitude: 39.909,
				longitude: 116.39742,
				iconPath: '../../static/alter.png'
			}, {
				latitude: 39.90,
				longitude: 116.39,
				iconPath: '../../static/alter.png'
			}],
			


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
	}
}
</script>
<style>

</style>
