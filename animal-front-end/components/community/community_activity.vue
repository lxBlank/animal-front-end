<template>
	<view>
		<block v-for="(item, index) in list" :key="item.id">
			<view class="bg-white border-radius-lg mb-20 overflow-hidden" @tap="jump('/pages/space/details?id='+item.id)">
				<view class="w-100"><cos-image :src="item.cover.path"></cos-image></view>
				<!-- 内容介绍 -->
				<view class="p-20">
					<view class="font-size-lg font-weight-bold mb-10">{{item.name}}</view>
					<view class="d-flex justify-content-between">
						<!-- 位置 -->
						<view class="d-flex text-color-grey">
							<view class="mr-30"><u-icon class="mr-10" name="map"></u-icon><text>{{item.city_label}}</text></view>
							<view><u-icon class="mr-10" name="pushpin"></u-icon><text>{{item.type_label}}</text></view>
						</view>
						<!-- 浏览数 -->
						<view class="text-color-assist">
							<text class="mr-10">浏览数</text>
							<text class="count">{{ item.reads }}</text>
						</view>
					</view>
				</view>
			</view>
		</block>
	
		<!-- 加载状态 -->
		<block v-if="list.length === 0 && loadStatus == 'nomore'">
			<u-empty margin-top="100" text="暂无更多" mode="favor"></u-empty>
		</block>
		<block v-else>
			<view style="margin: 30rpx 0;">
				<u-loadmore :status="loadStatus" />
			</view>
		</block>
	</view>
</template>

<script>
	import cosImage from '../../components/cos-media/cos-image.vue';
	export default {
		components: {cosImage},
		name: 'community_activity',
		props: {
			list: Array,
			loadStatus: String,
		},
		methods: {
			jump(url) {		
				uni.navigateTo({
					url: url
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.post-item {
		position: relative;
		background: #fff;
		padding: 25rpx 20rpx 20rpx 20rpx;
		margin-bottom: 20rpx;
		
		.post-item-status-label {
			position: absolute;
			right: 0;
			top: 0;
			color: #ffffff;
			padding: 0rpx 20rpx;
			border-bottom-left-radius: 20rpx;  /* 左下角 */
			border-top-right-radius: 20rpx;    /* 右上角 */
		}
		
		.post-item-status-success-label {
			background-color: $color-success;
		}
		.post-item-status-warning-label {
			background-color: $color-warning;
		}
		.post-item-status-error-label {
			background-color: $color-error;
		}

		.post-content {
			margin-top: 20rpx;
			
			.img-style-1 {
				display: block;
				width: 100%;
				max-height: 600rpx;
				border-radius: 10rpx;
				overflow: hidden;
			}

			.img-style-2 {
				display: flex;
				flex-wrap: wrap;
				
				image {
					margin: 5rpx;
					border-radius: 5px;
					width: 48.9%;
					height: 294rpx;
				}
			}

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
		}

		.address {
			display: flex;
			font-size: 20rpx;
			border-radius: 20rpx;
			display: inline-block;
			padding: 0rpx 20rpx;

			.icon {
				margin-right: 5rpx;
			}
		}
	}

	.post-item-top-user {
		display: flex;
		align-items: center;
		
		.avatar {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			margin-right: 10rpx;
			vertical-align: middle;
		}
		
		.center{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: 24rpx;
			color: #999;
			.username{
				font-size: 30rpx;
				font-weight: 600;
				color: #616161;
			}
			
			.tag-box {
				.tag{
					padding: 0rpx 10rpx;
					border-radius: 5rpx;
					font-size: 24rpx;
					background-color: #f5f5f5;
					color: #616161;
				}
				
				.tag-guaranty {
					color: #ffffff;
					background-color: #24B19A;
				}
				
				.tag-cert {
					color: #ffffff;
					background-color: #5A84FB;
				}
			}
			 
			 
			
			.official{
				display: inline-block;
				font-size: 20rpx;
				color: #000;
				background-color: $themes-color;
				padding: 5rpx 10rpx;
				border-radius: 10rpx;
				margin-right: 10rpx;
			}
		}
		.right{
			height: 85rpx;
			.arrow-down{
				color: #999;
			}	
		}
	}

	.post-text {
		display: block;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 10;
		white-space: pre-wrap;
		overflow: hidden;
		font-size: 32rpx;
	}

	.discuss-title {
		height: 30rpx;
		padding: 10rpx;
		line-height: 30rpx;
		border-radius: 20rpx;
		font-size: 12px;
		background: #f0f0f5;
		color: #68c778;
		text-align: center;
	}

	.p-footer {
		display: flex;
		margin-top: 30rpx;
	
		.p-item {
			color: #616161;
			display: flex;
			align-items: center;
			
			&:nth-child(2) {
				margin: 0 auto;
			}
	
			.count {
				margin-left: 10rpx;
				font-size: 28rpx;
			}
		}
	
		.p-item[hidden] {
			display: none !important;
		}
	}

	.comment-wrap {
		font-size: 28rpx;
		padding-top: 20rpx;
		border-top: 1px solid #F5F5F5;
		.item{
			.name{
				color: #000;
				font-weight: 600;
			}
		}
	}

	.video-wrap {
		//display: flex;
		//justify-content: center;
		//align-items: center;
		//max-height: 500rpx;
		display: inline-block;
		height: 200rpx;
		
		.video-item {
			position: relative;
			
			.icon {
				width: 80rpx;
				height: 80rpx;
				z-index: 999;
				position: absolute;
				top: 0;left: 0;right: 0;bottom: 0;
				margin: auto;
			}
			
			.image {
				width: 31%;
				margin: 1%;
				border-radius: 10rpx;
			}
		}
	}
	
	.tags {
		display: flex;
	    position: relative;
	    font-size: 0;
	    font-family: Helvetica;
		flex-flow: wrap; 
		
		.tag {
		    position: relative;
		    display: inline-block;
			padding: 10rpx 26rpx;
		    color: #666;
		    font-size: 28rpx;
		    text-align: center;
		    border-radius: 60rpx;
		    background-color: rgb(239, 210, 52);
			margin-bottom: 20rpx;
			margin-right: 10rpx;
		}
	}
</style>
