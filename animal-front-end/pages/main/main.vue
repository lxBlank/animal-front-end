<template>
	<view class="container">
		<!-- 自定义导航位置 -->
		<!-- 页面需要的自定义导航 -->
		<!-- 页面 -->
		<community v-if="index === 0"/>
		<mapmodel v-if="index === 1"/>
		<publish v-if="index === 2"/>
		<messsage v-if="index === 3"/>
		<center v-if="index === 4"/>
		
		<!-- 底部导航 -->
		<foo-bar @toIndex="toIndex"></foo-bar>
	</view>
</template>

<script>
	import community from  '../community/community.vue'
	import mapmodel from  '../mapmodel/mapmodel.vue'
	import publish from '../publish/publish.vue'
	import messsage from  '../messsage/messsage.vue'
	import center from  '../center/center.vue'
	import ceshi from '../ceshi/ceshi.vue'
	import fooBar from  '@/components/fooBar/fooBar.vue'
	export default {
		components:{
			community,
			mapmodel,
			publish,
			messsage,
			center,
			fooBar,
			ceshi,
		},
		data() {
			return {
				index: 0,
				title: '社区',
				skeletonOff: false,
			}
		},
		methods: {
			toIndex(index){
				console.log('index', index);
				// index 当前页面的索引
				this.index = index
				// 根据index判断页面
				// 修改自定义导航标题等
			},

		}
	}
</script>

<style>
	.container{
		display: flex;
		flex-direction: column;
		width: 100%;
	}

</style>