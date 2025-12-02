<template>
	<view class="view-content-comment" v-if="commentList.length > 0">
		<text class="title">{{ title }}</text>
		<view class="view-pro-comment-list" v-for="(item, index) in commentList" :key="index">
			<view class="border-line" v-if="index > 0"></view>
			<view class="view-pro-comment-list-item">
				<image :src="item.HEADIMGURL" class="view-comment-list-item-photo" mode="aspectFill"></image>

				<view class="comment-pro-title" style="flex: 1;">
					<text class="comment-name">{{ item.FIRSTNICKNAME }}</text>
					<view class="tag-view" style="display: flex; "><uni-tag :inverted="true" text="认证专家" type="success" size="small" /></view>
				</view>
				<view class="comment-pro-title" style="align-items: center;">
					<image
						v-if="item.IS_PRAISE == 1"
						class="praise-icon"
						@click="clickPraise(item)"
						src="data:image/png;base64,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"
						mode="aspectFill"
					></image>
					<image
						v-else
						class="praise-icon"
						@click="clickPraise(item)"
						src="data:image/png;base64,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"
						mode="aspectFill"
					></image>
					<text class="praise-num">{{ item.PRAISE_NUM }}</text>
				</view>
			</view>
			<text class="pro-comment-content">{{ item.COMMENT }}</text>
			<view class="pro-comment-sub">
				<text class="pro-comment-sub-time">{{ item.COMMENT_TIME }}</text>
				<text @click="clickDelete(item)" class="pro-comment-sub-time" style="padding-left: 20rpx;" v-if="item.CANDELETE == 1">删除</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CommentList',
	//属性
	props: {
		commentList: {
			type: Array,
			default: []
		},
		title: {
			type: String,
			default: '网友评论'
		}
	},
	data() {
		return {};
	},
	onLoad: function(e) {},
	onShow: function() {},
	methods: {
		/**
		 * 回复 评论
		 * @param {Object} item
		 */
		clickPraise(item) {
			this.$emit('clickPraise', item);
		},
		/**
		 * 删除评论
		 * @param {Object} item
		 */
		clickDelete(item) {
			this.$emit('clickDelete', item);
		}
	}
};
</script>
<style lang="scss">
@import '@/common/css/iconfont.css';
.view-content-comment {
	background-color: white;
	margin-top: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30rpx;
	.title {
		width: 100%;
		color: #333;
		font-weight: bold;
		font-size: 34rpx;
	}
}

.border-line {
	border-bottom: 1px solid #f6f6f6;
}
.view-pro-comment-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: white;
	padding-bottom: 20rpx;
}
.view-pro-comment-list-item {
	display: flex;
	margin-top: 20rpx;
	flex: 1;
	flex-direction: row;
}
.comment-pro-title {
	justify-content: center;
	height: 90rpx;
	margin-left: 20rpx;
	display: flex;
	flex-direction: column;
}
.pro-comment-content {
	color: #000;
	font-size: 32rpx;
	font-weight: 500;
	margin-top: 20rpx;
}
.praise-icon {
	height: 46rpx;
	width: 46rpx;
	line-height: 1;
	font-size: 46rpx;
	color: #999;
}
.praise-num {
	font-size: 26rpx;
	color: #999;
}
.pro-comment-sub {
	display: flex;
	align-items: center;
	flex-direction: row;
	.pro-comment-sub-time {
		color: #999;
		font-size: 26rpx;
	}
}
.comment-name {
	color: #48648b;
	font-size: 32rpx;
	display: flex;
	align-items: center;
}

.view-comment-list-item-photo {
	height: 85rpx;
	width: 85rpx;
	border-radius: 5rpx;
	border: 1px solid #f6f6f6;
}
</style>
