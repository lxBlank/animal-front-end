<template>
	<swiper :style="'height:'+height" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item v-for="(image, index) in images" :key="index">
			<image :src="image.path" class="w-100" mode="aspectFill" @tap.stop="previewMedia(index)"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name: 'cos-swiper',
		props: {
			// 头像路径
			images: {
				type: Array,
				default: []
			},
			height: {
				type:String,
				default:'750rpx'
			}
		},
		methods:{
			previewMedia(current) {
				
				let medias = [
					"https://renren-gophoto-1259018904.cos.ap-shanghai.myqcloud.com/test/post/5ceb202aea848baefe7dbe6b8a755807_abridge_q30.jpg"
				];
				wx.previewImage({
					urls: medias, // 需要预览的资源列表
					current: 0 ,// 当前显示的资源序号,
					success(e) {
						console.log(e);
					},
					fail(e) {
						console.log(e);
					}
				})
				
				// if(this.images.length>0) {		
				// 	uni.previewImage({
				// 		urls: medias, // 需要预览的资源列表
				// 		current: 0 ,// 当前显示的资源序号,
				// 		success(e) {
				// 			console.log(e);
				// 		},
				// 		fail(e) {
				// 			console.log(e);
				// 		}
				// 	})
				// }			
			}		
		}
	}
</script>
