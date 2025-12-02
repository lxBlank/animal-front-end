<template>
	<view class="content-ques">
		<view class="view-content-content">
			<!-- 用户信息 -->
			<view class="view-header">
				<!-- 头像 -->
				<image :src="detailInfo.avator" class="image-photo"></image>
				<view class="header-txt">
					<text class="name">{{ detailInfo.username }}</text>
					<view style="flex-direction: row; display: flex; align-items: center;">
						<text class="sub">{{formateDate(detailInfo.createTime)}}</text>
					</view>
				</view>
			</view>
			
			<!-- 详情描述 -->
			<view class="item-desc">{{ detailInfo.content}}</view>
			<view class="tagCon">
				<u-tag class="contentTag2" text="健康状态" type="warning" size="mini"></u-tag>
				<text class="tagText">{{detailInfo.health}}</text>
			</view>
			<view class="tagCon">
				<u-tag class="contentTag2" text="动物位置" type="warning" size="mini"></u-tag>
				<text class="tagText">{{detailInfo.place == '' ? '未知':detailInfo.place}}</text>
			</view>
			<view class="tagCon">
				<u-tag class="contentTag2" text="拍摄时间" type="warning" size="mini"></u-tag>
				<text class="tagText">{{formateDate(detailInfo.imgTime/1000) }}</text>
			</view>
			
			<!-- 图片 -->
			<view class="item-imgs">
				<image
					:src="itemImg"
					class="image-imgs"
					v-for="(itemImg, indexImg) in detailInfo.imgList"
					:index="indexImg"
					:key="indexImg"
					mode="aspectFill"
					@click="cliclImage(detailInfo.imgList, indexImg)" 
				></image>
			</view>
			

			
			<!-- 按钮 -->
			<view class="view-delete-detail">
				<view class="bottom-item">
					<view class="iconfont view bottom-item-image"></view>
					<text class="bottom-item-text">{{ detailInfo.trans }}</text>
				</view>
				<view class="bottom-item" style="	justify-content: center;">
					<view class="iconfont msg bottom-item-image"></view>
					<text class="bottom-item-text">{{ detailInfo.reply }}</text>
				</view>
				<view class="bottom-item" style="	justify-content: flex-end;" @click="clickPraise(detailInfo.IS_PRAISE)">
					<view class="iconfont praised bottom-item-image" style="color:#d81e07" v-if="detailInfo.isLike == '1'"></view>
					<view class="iconfont praise bottom-item-image" v-else></view>
					<text class="bottom-item-text">{{ detailInfo.like }}</text>
				</view>
			</view>
		</view>
		<!-- <five-commentlist :commentList="commentList" @clickPraise="clickPraiseSig" @clickDelete="clickDeleteSig"></five-commentlist> -->
		<!-- 
		@param: commentList展示的评论列表数据
		@method: clickPraise 点赞评论
		@method: clickDelete 删除父级评论
		@method: clickRecommentChild 点赞子评论
		@method: clickDeleteChild 删除子评论
		 -->
		 <!-- 评论列表 -->
		<five-mul-commentlist
			:commentList="commentList"
			@clickPraise="clickPraiseComment"
			@clickDelete="clickDeleteComment"
			@clickDeleteChild="clickDeleteCommentChild"
			@clickRecomment="clickRecomment"
			@clickRecommentChild="clickRecommentChild"
		></five-mul-commentlist>

		<!-- 评论 -->
		<view class="view-conmment-send-bottom">
			<view class=" view-comment-textarea" @click="clickComment()"><view class="textarea-comment">写评论…</view></view>
		</view>
		<five-comment ref="detailComment" @sendComment="sendComment" :placeholder="placeholder"></five-comment>
	</view>
</template>

<script>
/**
 * @author: 小五
 * @time：	2020-07-07
 * 注：
 * 1. 评论详情 、回复评论及回复子评论功能实际是调用接口实现，在这里只为实现效果，逻辑无参考价值
 */
import data from '@/data';
import dateUtils from '@/common/utils/dateUtils.js';
import {base_url} from '../../utils/base_url.js'
import {base_url2} from '../../utils/base_url.js'
import {infoUrl1} from '../../utils/base_url.js'
import {infoUrl2} from '../../utils/base_url.js'
import {commentUrl} from '../../utils/base_url.js'
import {deleteCommentUrl} from '../../utils/base_url.js'
export default {
	data() {
		return {
			duid: '',
			index: 0,
			// 用户&动态数据
			detailInfo: {},
			// 评论数据列表
			// commentParam压入列表
			commentList: [],

			//评论组件相关
			placeholder: '请输入评论内容…',
			commentParam: {},
			// 评论参数
			comment:{},
		};
	},
	onLoad: function(e) {
		console.log(e)
		this.duid = e.id
	},
	onShow: function() {
		// console.log('onShow')
		this.getData(); //获取数据
		this.getComment(); //获取评论列表
	},
	methods: {
		// 获取数据
		getData() {
			var that = this
			uni.request({
				url: infoUrl2,
				method:'GET',
				header: {
					Authorization: uni.getStorageSync('token'),
				},
				data:{
					duid:that.duid
				},
				success: (res) => {
					that.detailInfo = res.data.data[0];
					console.log(that.detailInfo)
				},
			})
			
		},
		// 预览图片
		previewImg() {
			uni.previewImage({
				urls: this.imgList,
				longPressActions: {
					itemList: ['保存图片'],
		
				}
			})
		},
		/**
		 * 获取评论详情
		 */
		getComment() {
			var that = this
			that.comment['index'] = 3
			that.comment['duid'] = that.duid
			uni.request({
				url: commentUrl,
				method:'POST',
				data: that.comment,
				header: {
					Authorization: uni.getStorageSync('token'),
				},
				success: (res) => {
					// console.log('获取评论成功')
					that.commentList = res.data.data
					console.log(res)
					// console.log(that.commentList)
				},
				fail: (e) => {
					console.log('获取评论失败')
					console.log(e)
				}
			})	
			
		},
		
	
		

		/**
		 * 
		 * 格式化发布日期
		 * @param {Object} dateString
		 */
		formateDate(dateString) {
			dateString = parseInt(dateString) * 1000;
			let date = new Date(dateString);
			let formatStr = dateUtils.dateFormat('YYYY年mm月dd日 HH:MM:SS', date);
			return formatStr;
		},

		/**
		 * 回复动态
		 */
		clickComment() {
			console.log('回复动态')
			var that = this
			this.index = 1
			console.log(this.detailInfo)
			this.comment = {}
			this.comment['index'] = this.index
			this.comment['duid'] = this.duid
			this.comment['fuid'] = this.detailInfo['uid']
			// this.commentParam = {
			// 	COMMENT_TIME: '2020-07-07 14:30:01',	//时间
			// 	FIRSTNICKNAME: '网友45454545',			//姓名
			// 	CHILD_ANWSER_LIST: [],
			// 	IS_PRAISE: null,
			// 	PRAISE_NUM: 0,
			// 	CANDELETE: 1,
			// 	HEADIMGURL: 'http://img4.imgtn.bdimg.com/it/u=2858424520,3197172862&fm=11&gp=0.jpg',
			// 	SECONDNICKNAME: null
			// };
			this.$refs.detailComment.open();
		},
		/**
		 * 详情点赞
		 * @param {Object} isPraise
		 */
		clickPraise(isPraise) {
			let praiseParam = '1';
			let praiseNum = parseInt(this.detailInfo.PRAISE_NUM);
			switch (isPraise) {
				case '0':
					praiseParam = '1';
					praiseNum++;
					break;
				case '1':
					praiseParam = '0';
					praiseNum--;
					break;
			}
			this.detailInfo.IS_PRAISE = praiseParam;
			this.detailInfo.PRAISE_NUM = praiseNum--;
		},

		/**
		 *  查看图片大图
		 * @param {Object} images
		 * @param {Object} index
		 */
		cliclImage(images, index) {
			uni.previewImage({
				urls: images,
				current: index,
				longPressActions: {
					itemColor: '#12B368',
					success: function(data) {},
					fail: function(err) {}
				}
			});
		},
		/**
		 * 删除详情
		 */
		clickDeleteDetail() {
			uni.showModal({
				title: '提示',
				content: '确定要删除吗？',
				confirmColor: '#12B368',
				success: function(res) {
					/* 调用接口删除 */
				}
			});
		},
		/**
		 * 点赞多级评论
		 * @param {Object} item
		 */
		clickPraiseComment(item) {
			//只能点赞不能取消
			if (item.IS_PRAISE == '1') {
				return;
			}
			item.IS_PRAISE = '1';
			item.PRAISE_NUM++;
		},
		/**
		 * 删除多级评论
		 */
		clickDeleteComment(item) {
			console.log("删除多级评论")
			var that = this
			uni.showModal({
				title: '提示',
				content: '确定要删除评论吗？',
				confirmColor: '#12B368',
				success: function(res) {
					/* 调用接口删除 */
					uni.request({
						url: deleteCommentUrl,
						method:'POST',
						data: {
							'type': 2,
							'cuid': item.cuid,
							'fcuid': item.fcuid
						},
						header: {
							Authorization: uni.getStorageSync('token'),
						},
						success: (res) => {
							that.getComment()
							uni.showToast({
								title: '删除成功',
								duration: 2000
							});
							
						},
						fail: (e) => {
							console.log(e)
						}
					})
				}
			});
		},
		/**
		 * 删除多级子评论
		 */
		clickDeleteCommentChild(item) {
			console.log("删除子级评论")
			var that = this
			uni.showModal({
				title: '提示',
				content: '确定要删除评论吗？',
				confirmColor: '#12B368',
				success: function(res) {
					uni.request({
						url: deleteCommentUrl,
						method:'POST',
						data: {
							'type': 1,
							'cuid': item.cuid,
							'fcuid': item.fcuid
						},
						header: {
							Authorization: uni.getStorageSync('token'),
						},
						success: (res) => {
							that.getComment()
							uni.showToast({
								title: '删除成功',
								duration: 2000
							});
							
						},
						fail: (e) => {
							console.log(e)
						}
					})
				}
			});
		},

		/**
		 * 回复 评论
		 * @param {Object} item
		 */
		clickRecomment(item) {
			console.log('回复评论')
			this.index = 2
			this.comment = {}
			this.comment['index'] = this.index
			this.comment['duid'] = this.duid
			this.comment['fcuid'] = item.cuid
			this.comment['fuid'] = item.uid
			this.$refs.detailComment.open();
			this.placeholder = '回复' + item.FIRSTNICKNAME + ':';
		},
		/**
		 * 回复评论的评论
		 * @param {Object} item
		 */
		clickRecommentChild(item) {
			console.log('回复评论的评论')
			console.log(item)
			this.index = 2
			this.comment = {}
			this.comment['index'] = this.index
			this.comment['duid'] = this.duid
			this.comment['fcuid'] = item.fcuid
			this.comment['fuid'] = item.uid
			this.$refs.detailComment.open();
			this.placeholder = '回复' + item.FIRSTNICKNAME + ':';
		},
		/**
		 * 删除单级评论
		 */
		clickDeleteSig(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除评论吗？',
				confirmColor: '#12B368',
				success: function(res) {
					/* 调用接口删除 */
				}
			});
		},
		/**
		 * 点赞单级评论
		 */
		clickPraiseSig(item) {
			//只能点赞不能取消
			if (item.IS_PRAISE == '1') {
				return;
			}
			item.IS_PRAISE = '1';
			item.PRAISE_NUM++;
		},
		/**
		 * 发送评论
		 * @param {Object} result  评论内容
		 */
		// 子向父传数据
		sendComment(result) {
			var that = this
			console.log('发送评论')
			console.log(result)
			this.comment['content'] = result
			uni.request({
				url: commentUrl,
				method:'POST',
				data: that.comment,
				header: {
					Authorization: uni.getStorageSync('token'),
				},
				success: (res) => {
					console.log(res)
					that.commentList = res.data.data
				},
				fail: (e) => {
					console.log(e)
				}
			})	
			// this.commentParam.COMMENT = result;
			// this.commentList.push(this.commentParam);
		}
	}
};
</script>

<style lang="scss">
@import '../../common/css/iconfont.css';
page,
	.tagCon{
		display: flex;
		margin-top: 10rpx;
	}
	.helpTag{
		width: 78.25rpx;
	}
	.contentTag{
		width: 8%;
	}
	.contentTag2{
		width: 125rpx;
		
	}
	.tagText{
		margin-left: 6rpx;
		color: #999;
		font-size: 26rpx;
		line-height: 22px;
	}
	.content-ques {
		// background-color: $view-bg-color;
		width: 100%;
	}

	.view-delete-detail {
		flex: 1;
		display: flex;
		font-size: 26rpx;
	}
	.bottom-item {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 80rpx;
		.bottom-item-image {
			font-size: 40rpx;
			color: $uni-text-color;
		}
		.bottom-item-text {
			font-size: $uni-font-size-sm;
			margin-left: 20rpx;
			color: $uni-text-color;
		}
	}
	.view-content-content {
		background-color: white;
		flex-direction: column;
		padding: 30rpx 30rpx 0 30rpx;
	}
	.view-header {
		display: flex;
		align-items: center;
		flex-direction: row;

		.image-photo {
			height: 90rpx;
			width: 90rpx;
			background-color: $view-bg-color;
			border: 1px solid $line-color;
			border-radius: 45rpx;
			margin-right: 30rpx;
		}

		.header-txt {
			display: flex;
			flex-direction: column;
			color: $uni-text-color-grey;
			line-height: 1.5;
			justify-content: center;
			font-size: $uni-font-size-sm;
			.name {
				color: #004261;
				font-weight: bold;
				font-size: $uni-font-size-base;
			}
		}
	}
	.sub {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-sm;
	}
	.item-desc {
		color: $uni-text-color;
		line-height: 1.6;
		font-size: $uni-font-size-base;
		margin-top: 20rpx;
	}

	.item-imgs {
		margin: 20rpx 0;
		display: flex;
		flex-direction: row;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;

		.image-imgs {
			border-radius: 10rpx;
			background-color: $view-bg-color;
			height: 220rpx;
			width: 220rpx;
			margin: 1px 4rpx;
		}
	}

	.view-conmment-send-bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: row;
		background-color: white;
		border-top: 1px solid $view-bg-color;
	}

	.view-comment-textarea {
		background-color: $uni-bg-color-grey;
		border-radius: 40rpx;
		padding: 15rpx 20rpx;
		margin: 25rpx 20rpx;
		width: 80%;
		flex: 1;
		align-items: center;
	}
	.textarea-comment {
		padding: 0;
		// width: 100%;
		height: 100%;
		font-size: $uni-font-size-base;
		// color: $uni-text-color;
		color: $uni-text-sub-color;
	}
	.icon-comment {
		font-size: 46rpx;
		color: $uni-text-color;
		margin: 0 30rpx 0 5rpx;
	}
	.view-btn-comment {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: $uni-font-size-base;
		color: white;
		height: 70rpx;
		width: 120rpx;
		border-radius: 10rpx;
		background-color: $theme-color;
		font-weight: 500;
	}
	.textarea-bottom {
		background-color: white;
		padding: 20rpx;
	}
</style>
