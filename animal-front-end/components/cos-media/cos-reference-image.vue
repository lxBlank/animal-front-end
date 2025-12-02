<template>
	<view class="d-flex flex-wrap">
		<!-- <view class="video" style="position: relative;">
			<image style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 60rpx;height: 60rpx;z-index: 999;" class="icon" src="/static/play.png"></image>
			<image style="width: 170rpx;height: 170rpx;" v-if="detail.reference_video.length>0" @tap="previewMedia(item, detail.reference_images, detail.reference_video)" class="mr-10 mb-10" :src="detail.reference_video[0].poster.path" mode="aspectFill"></image>
		</view> -->
		<view class="images d-flex">
			<image class="mr-10 border-radius-base" v-for="(item,index) in cos_images" :key="item.id" @tap="previewMedia(index)" :src="item.path" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'cos-reference-image',
		props: {
			images: {
				type: Array,
				default: []
			},
			video:{
				type: Array,
				default: []
			}
		},
		data() {
			return {
				cos_images:[],
				cos_video:[]
			}
		},
		computed: {
			cosImages() {
				if(this.images.length>0) {
					let that = this;
					for(let i=0;i<this.images.length;i++) {
						if(this.images[i].path) {
							let id = this.images[i].id
							this.$f.getObjectUrl(this.images[i].path, function(path) {
								that.$set(that.cos_images , i, {id:id,path:path})
							})
						}
					}
				}
			}
		},
		methods:{
			previewMedia(current) {
				let medias = [];
				
				if(this.cos_images.length>0) {
					this.cos_images.forEach((item,index)=>{
						medias.push({
							url:item.path,
							type:'image',
						})
					})
					
					uni.previewMedia({
						sources: medias, // 需要预览的资源列表
						current: current // 当前显示的资源序号
					})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.images {
		image {
			width: 120rpx;
			height: 120rpx;
		}
	}
</style>
