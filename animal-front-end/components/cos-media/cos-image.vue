<template>
	<view style="position: relative;">
		<image @tap="previewMedia" class="w-100" :style="'height:'+ height +';'" :src="src" mode="aspectFill"></image>
		<view v-if="images.length>0" style="background-color: rgba(0,0,0,0.2);color: #ffffff;position: absolute;bottom: 20rpx;right: 20rpx;border-radius: 10rpx;text-align: center;padding: 5rpx 15rpx;"><u-icon class="mr-10" name='photo' size='28'></u-icon><text>{{images.length}}</text></view>
	</view>
</template>

<script>
	export default {
		name: 'cos-image',
		props: {
			// 头像路径
			src: {
				type: String,
				default: ''
			},
			height:{
				type: String,
				default: '400rpx'
			},
			images:{
				type:Array,
				default: [],
			},
			imagesCount:{
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				cos_src:'',
				cos_images:[]
			}
		},
		methods:{
			previewMedia() {
				let medias = [];
				if(this.cos_images.length>0) {
					this.cos_images.forEach(item=>{
						medias.push({
							url:item.path,
							type:'image',
						})
					})
					
					uni.previewMedia({
						sources: medias, // 需要预览的资源列表
						current: 0 // 当前显示的资源序号
					})
				}
			}
		}
	}
</script>

<style>

</style>
