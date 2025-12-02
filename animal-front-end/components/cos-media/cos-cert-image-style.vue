<template>
	<view class="post-content mb-20">
		<view class="mb-20">
			<view class="img-style-2">
				<image class="image" @tap.stop="previewMedia(0)" mode="aspectFill"
					:src="albumPhotos.path"></image>
				<image class="image" @tap.stop="previewMedia(1)" mode="aspectFill"
					:src="bustPhotos.path"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'cos-cert-image-style',
		props: {
			identityCard: {
				type: Object,
				default: {}
			},
			albumPhotos: {
				type: Object,
				default: {}
			},
			bustPhotos: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {
				cos_identity_card:'',
				cos_album_photos:'',
				cos_bust_photos:''
			}
		},
		computed: {
			cosAlbumPhotos() {
				let that = this;
				this.$f.getObjectUrl(this.albumPhotos.path, function(path) {
					that.cos_album_photos = path;
				})
			},
			cosBustPhotos() {
				let that = this;
				this.$f.getObjectUrl(this.bustPhotos.path, function(path) {
					that.cos_bust_photos = path;
				})
			}
		},
		methods:{
			previewMedia(current) {
				let medias = [];
				
				medias.push({
					url:this.cos_album_photos,
					type:'image',
				})
				
				medias.push({
					url:this.cos_bust_photos,
					type:'image',
				})
				
				uni.previewMedia({
					sources: medias, // 需要预览的资源列表
					current: current // 当前显示的资源序号
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.post-content {
	margin-top: 20rpx;

	.img-style-2 {
		display: flex;
		flex-wrap: nowrap;
		
		image {
			margin: 5rpx;
			border-radius: 10rpx;
			width: 48.9%;
			height: 294rpx;
		}
	}
}
</style>
