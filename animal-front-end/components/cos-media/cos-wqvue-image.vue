<template>
	<view class="short_article">
		<view class="wqvue-image short_article_img">
			<u-lazy-load borderRadius="10" imgMode="aspectFill" :image="item.cover.path"></u-lazy-load>
			<!-- <image class="ll_fadeIn w-100 cover" :src="item.cover.path" mode="aspectFill"></image> -->
			<!-- <image v-if="item.video_count>0" class="play-icon" src="/static/images/play.png"></image> -->
			<!-- <view>
				<view class="short_article_topictag"></view>
				<view class="short_article_topictext">{{item.created_at}}<u-icon class="ml-40 mr-10" name='photo' size='28'></u-icon>{{item.item.image_count}} </view>
			</view> -->
		</view>
		<view class="d-flex justify-content-between align-items-center">
			<view class="short_article_title text-over2" v-if="item.describe">{{item.describe}}</view>
		</view>
		<!-- <view class="short_article_tag">{{item.category}}</view> -->
		<view class="feed_foot" @tap.stop="jumpUser(item.user.uuid)">
			<view class="feed_foot_userinfo"> 
				<view class="">
					<cos-avatar :src="item.user.avatar" :showSex="true" :sexIcon="item.user.gender_label" size='mini'></cos-avatar>
				</view> 
				<view class="w-100 d-flex align-items-center justify-content-between">
					<view class="font-size-sm mr-10 text-over">{{item.user.nickname}}</view>
					<view class="font-size-sm flex-shrink-0" v-if="item.reads>0">阅读 {{item.reads}}</view>
				</view>
				<!-- <view class="feed_foot_userinfo_tag tag_yellowV"></view> -->
			</view> 
		</view>
	</view>
</template>

<script>
	export default {
		name: 'cos-wqvue-image',
		props: {
			// 头像路径
			item: {
				type: Object,
				default: {}
			},
		},
		// computed: {
		// 	cosAvatar() {
		// 		if(this.item.user.avatar) {
		// 			let that = this;
		// 			if(this.item.user.avatar.indexOf("renren-gophoto")>-1) {
		// 				this.$f.getObjectUrl(this.item.user.avatar, this.$store.state.cos, function(path) {
		// 					that.cos_avatar = path;
		// 				},true)
		// 			}else{
		// 				that.cos_avatar = this.item.user.avatar;
		// 			}
		// 		}
		// 	},
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
		// 		cos_avatar:'',
		// 		cos_cover:''
		// 	}
		// }
	}
</script>

<style>
.short_article {
    position: relative;
}
.short_article_img {
	position: relative;
    width: 100%;
	
}
.short_article_img .cover {
    border-radius: 8rpx 8rpx 0 0;
	max-height: 500rpx;
}
.short_article_img .play-icon {
	position: absolute;
	width: 100rpx;
	height: 100rpx;
	margin:auto;
	left:0;
	right:0;
	top:0;
	bottom:0;
}
.short_article_topictag, .short_article_topictext {
    position: absolute;
	left:20rpx;
    bottom: 25rpx;
	background-color: rgba(0,0,0,0.2);
	padding: 10rpx 20rpx;
	border-radius: 100rpx;
}
.short_article_topictag {
    width: 100%;
    left: 0;
    box-sizing: border-box;
    opacity: .7;
    background-image: -webkit-gradient(linear,right top,left top,color-stop(0,#e93b3d),to(#f36535));
    background-image: -webkit-linear-gradient(right,#e93b3d,#f36535);
    background-image: linear-gradient(-90deg,#e93b3d,#f36535);
    border-bottom-left-radius: 8rpx;
    border-bottom-right-radius: 8rpx;
}
.short_article_topictext {
    left: 20rpx;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 24rpx;
}
.short_article_title {
    font-size: 28rpx;
    color: #333;
    line-height: 42rpx;
    font-weight: 700;
    margin: 12rpx 20rpx;
}
.short_article_tag {
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    font-size: 24rpx;
    height: 32rpx;
    line-height: 32rpx;
    background: rgba(0,0,0,.6);
    border-top-left-radius: 8rpx;
    border-bottom-right-radius: 8rpx;
    padding: 0 10rpx;
}

.feed_foot {
    margin: 0 20rpx 10rpx;
    color: #999;
}
.feed_foot, .feed_foot_userinfo {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
	align-items: center;
}
.feed_foot_userinfo {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
    position: relative;
}
.feed_foot_userinfo_imgview {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    margin-right: 10rpx;
    overflow: hidden;
}
.feed_foot_userinfo_imgview_img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.feed_foot_userinfo_imgview_img image {
    border-radius: 50%;
}
</style>
