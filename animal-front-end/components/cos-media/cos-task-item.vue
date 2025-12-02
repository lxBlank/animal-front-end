<template>
	<navigator class="product" open-type="navigate" hover-class="none" :url="'/pages/notice/detail?id='+item.id">
		<view class="cover">
			<image :src="item.cover.path" mode="aspectFill"></image>
		</view>
		<view class="info">
			<view class="desc">
				<view class="title">{{ item.title }}</view>
				<view class="tags">
					<view class="type-tag" :class="item.need_color">{{item.need_label}}</view>
					<view class="type-tag" :class="item.reward_color">{{item.reward_label}}</view>
				</view>
				<view class="sub d-flex justify-content-between">
					<view>已报名:{{item.signs}}人</view>
					<view>{{$f.timeAgo(item.time_diff)}}</view>
				</view>
				<!-- <view class="price">￥{{ product.salePrice / 100 }}</view> -->
			</view>
		</view>
	</view>
	</navigator>
</template>

<script>
	export default {
		name: 'cos-task-item',
		props: {
			// 头像路径
			item: {
				type: Object,
				default: {}
			},
		},
		// computed: {
		// 	cosCover() {
		// 		if(this.item.cover) {
		// 			let that = this;
		// 			this.$f.getObjectUrl(this.item.cover.path, this.$store.state.cos, function(path) {
		// 				that.cos_cover = path;
		// 			})
		// 		}
		// 	}
		// },
		// data() {
		// 	return {
		// 		cos_cover:''
		// 	}
		// }
	}
</script>
<style lang="scss" scoped>
.product {
	background-color: #FFFFFF;
	width: 350rpx;
	display: flex;
	flex-direction: column;
	border-radius: 12rpx;;
	margin-bottom: 20rpx;
	
	.cover {
		overflow: hidden;
		
		image {
			width: 335rpx;
			height: 335rpx;
			width: 100%;
			border-radius: 12rpx 12rpx 0 0;
		}
	}
	
	.info {
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		
		.desc {
			display: flex;
			flex-direction: column;
			
			.title {
				font-size: 32rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			
			.tags {
				display: flex;
				
				.type-tag {
					border-radius: 5rpx;
					display: inline-block;
					font-size: 22rpx;
					padding: 0rpx 10rpx;
					margin-right: 10rpx;
				}
				
				.blue {
					border: 2rpx solid rgb(29, 167, 255);
					color: rgb(29, 167, 255);
				}
				
				.red {
					border: 2rpx solid rgb(249, 53, 81);
					color: rgb(249, 53, 81);
				}
				
				.yellow {
					border: 2rpx solid #EED146;
					color: #EED146;
				}
				
				
				.fill-red {
					background-color: rgb(249, 53, 81);
					border: 2rpx solid rgb(249, 53, 81);
					color: #FFFFFF;
				}
				
				.fill-yellow {
					background-color: rgb(255, 211, 36);
					border: 2rpx solid rgb(255, 211, 36);
					color: #000000;
				}
			}
		
			.sub {
				margin-top: 20rpx;
				font-size: 24rpx;;
				color: #999;
			}
		}
		
		.extra {
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.price {
				color: #DBA871;
				font-size: 32rpx;
				font-weight: 500 !important;
			}
		}
	}
}
</style>