<template>
	<view class="img-style-3">
		<block v-if="images.length>0">
			<u-lazy-load class="image" height="200" borderRadius="10" imgMode="aspectFill" v-for="(mediaItem, index) in images" v-if="index<3" :key="index" :image="mediaItem.path" @tap.stop="previewMedia(index)"></u-lazy-load>
		</block>
		<view class="nums" v-if="images.length-3>0">+{{images.length-3}}</view>
	</view>
</template>

<script>
	export default {
		name: 'cos-post-image-style',
		props: {
			images: {
				type: Array,
				default: []
			},
			video: {
				type: Array,
				default: []
			}
		},
		methods:{
			previewMedia(index) {
				let medias = [];
				
				if(this.images.length>0) {
					let that = this;
					this.images.forEach(item=>{
						medias.push({
							url:item.path,
							type:'image',
						})
					})
					uni.previewMedia({
						sources: medias, // 需要预览的资源列表
						current: index // 当前显示的资源序号
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.img-style-3 {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	
	.icon {
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		z-index: 999;
		top: 80rpx;
		left:90rpx;
	}

	.image {
		width: 31.3%;
		height: 200rpx;
		margin: 1%;
		border-radius: 10rpx;
	}
	
	.nums {
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
		background-color:rgba(0,0,0,0.4);
		color:#ffffff;
		padding:5rpx 15rpx;
		border-top-left-radius:10rpx;
	}
}
</style>
