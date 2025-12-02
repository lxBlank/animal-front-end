<template>
	<view>
		<u-avatar class="mr-20" :src="src" :showSex="showSex" :sexIcon="sexIcon" :imgMode="imgMode" :size="size" :mode="mode"></u-avatar>
	</view>
</template>

<script>
	export default {
		name: 'cos-avatar',
		props: {
			// 头像路径
			src: {
				type: String,
				default: ''
			},
			// 右上角性别角标，man-男，woman-女
			sexIcon: {
				type: String,
				default: 'man'
			},
			// 是否显示性别图标
			showSex: {
				type: Boolean,
				default: false
			},
			// 图片的裁剪模型
			imgMode: {
				type: String,
				default: 'widthFix'
			},
			// 尺寸，large-大，default-中等，mini-小，如果为数值，则单位为rpx
			// 宽度等于高度
			size: {
				type: [String, Number],
				default: 'default'
			},
			mode: {
				type: String,
				default: 'circle'
			},
		},
		// computed: {
		// 	cosSrc() {
		// 		if(this.src) {
		// 			let that = this;
		// 			if(this.src.indexOf("renren-gophoto")>-1) {
		// 				this.$f.getObjectUrl(this.src, this.$store.state.cos, function(path) {
		// 					that.cos_src = path;
		// 				}, true)
		// 			}else{
		// 				that.cos_src = this.src;
		// 			}
		// 		}
		// 	}
		// },
		// data() {
		// 	return {
		// 		cos_src:''
		// 	}
		// }
	}
</script>

<style>

</style>
