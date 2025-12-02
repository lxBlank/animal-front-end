<template>
	<view class="view-content-comment" style="margin-bottom: 100rpx;">
		<text class="title">{{ title }}</text>
		<view class="view-conmment-note" v-if="commentList.length == 0">
			<image
				src="data:image/png;base64,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"
				class="icon-none"
				mode="aspectFit"
			></image>
			<text class="text-conmment-note">暂无评论</text>
		</view>
		<view v-if="commentList.length > 0" class="view-comment-list" v-for="(item, index) in commentList" :key="index">
			<image :src="item.HEADIMGURL" class="view-comment-list-item-photo" mode="aspectFill"></image>
			<view class="view-comment-list-item">
				<view class="comment-title">
					<text class="comment-name">{{ item.FIRSTNICKNAME }}</text>
					<view style="flex: 1;"></view>
					<!-- 点赞 -->
					<image
						v-if="item.IS_PRAISE == 1"
						class="praise-icon"
						@click="clickPraise(item)"
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAJYUlEQVR4Xu2df4wcZRnHv8/c7c5JDDYoVrC3S9OWffeaSlowQBCsJiqCv1KRaPwBYqJIFa0/IGC0xUCiIqRaA2pUomAiKiFiDWqiRalGEiukhd4eLbT7br2ALSq2tPvu3e1jtj0iAncz7zv77s7MPvPP3d48P77v9/nc7O7dzgxBtoF2gAZ69bJ4CAADDoEAIAAMuAMDvnw5AggAA+7AgC9fjgACwIA7MODLlyOAAJBvB3aMhksKwJsYeDMRAjA/BaIDzDQ+FLQfOLXeGs+3A/OvLrdHgEdOxEuHjxu5hpmvjRjwXgD3DBcKNyx97NA/Bg2GXAKwq1Qca4PuYGClxUBrAN2gdPMOi5zMh+YOgNnh/5SB5S7TYeC7VW0+5pKbxZzcATBeCr9DwEeTDYO2Kd08I1mNbGTnCoDxUuF0QvDXblmvtMmVPy/mS64WWBsNLwfh1m4BMAhPB/kCoBR2hn95twA4WodxhWqYrkHVVW1dKJY3ALYBWNUFX/6vxEzQXrl879RD3a6bhnq5AaDzvn/oJeFBT6ZuVNqs81S7r2VzA8D4opHVFPAWT27+mwNaWd3b7PzRKFdbbgDYWQ4vDBibfU2HwddVdWuDr/r9qpsbAGql4sUA3enRyB1Km9d4rN+X0vkBYHTkwyD+gU8XuU1vqO5r3uezR69r5waAiXL4CWZs8mog4xbVMGu99uhx8dwAUCsVrwboKz79I+IHKvXWWT579Lp2bgCYKBXXM8jrizQGdle1WdbrIfnsJwBYuMvgf1Z16+UWKakPFQAsR5S3fxAJABYAyBHAwqxeh46XihsItN5nX3kN4NPdhLV7AYC8C0g4JJ/pvQAAjHtVw1zgcx29rp2b1wA9AQD8Y6VbH+j1kHz2yw0AtdHi90F0mU+zGNhU1eZKnz16XTs/AJTCrQDO8WlgHv8jmCcA9gN4hU8A2oS3jdXNr3z26HXtXABQWxxWMIOab/OGC4WFeTt7KB8AlIpXAfRVrwAQtqu6Oc1rjz4UzwUA46VwMwEX+vSPwT+s6talPnv0o3bmAdhbPu6kJs90zvB9mWcDP620+YbnHj0vn3kAevP+HyCm8yqN5v09n5DnhpkGYPa3v3Mq2MmefarNHDGvXb4fhzz36Xn5TAPQq99+EO4jRsBAAHDAjIAoCIDOz7jzDfHRi08goKM/68Qd+9p53PkeAGE2Zvbxsz8/WoNA9Nzc58fMPn4G4O0AbQf49zQdbqlMHjyQhJrMAlArF98PpoE6l3+OQf8CCG5U+sifXEDIJACeTwJx8TENOV9T2lxtKyRzAEyMFt/FRHfbLnQw4ulnSjcvtllrpgColUc+Aubv2Sxw8GLtIMgMADL8+Cjb/NMq9QDUyiNvBPNnAeTqgxjxx+kWGfcsptQCUBsN30HEaxh0iZsFg53FRD+p1pvvi3IhNQDsWorjp014dkB8FoPeDWBFlHjZP68Dh4enA7V08khjvihrAPacggWmHV4DoAJAzX6ds0fU5+hrpZAB/M3HlT0GHRAmfLJaN9/qGgC7yoWVbQ5ut7kGX0wABn1WntbPtyvd+lBXAHA9904A8DTbOGVjfIYh1lPAxOLCaTwTOF0kSQCIMyl/MVH+xwKgluADl1ECZl8D+HNggCsz8GRVm1clegp4tFxc02a6y9VHAcDVuS7kdeMpYOfoyPUB8Rdc5QgArs4lzyNgc0Wbtyc6AtRGwy0grHaVIwC4OteFPKbrVaP5xWQAHHuf7rwJAM7WJU5k4ouq9da8T9+RLwKTvkgTABLP0bnAFGPpioZ5TI4AzhZmOvE/SpvIT0rLESDTM55bPAF/rGjz+qjlCQBRDmV3/zeVNp+Kki8ARDmU1f1Ml6lG87Yo+QJAlEMZ3T9E7VXL6lMPRskXAKIcyub+mYo2Berc7yRiEwCiHMrgfgIeqmgT656JAkAGBxwl2eZMZgEgys0M7m8D68a02RhHugAQx6WMxQy1afWyfc0/xJEtAMRxKWMxhWGzYMnjeDqObAEgjkvZitmltDk1rmQBIK5TGYljxt3VhlkTV64AENepjMQReH1Ft74cV64AENeprMQx3qka5p64cgWAuE5lJG5mmsrLJ5s6rlwBIK5T2YibVNq82kaqAGDjVvpjf6O0Od9GpgBg41bKY4lxU6VhPmcjUwCwcSv1sfRBpZtWF84SAFI/1PgC28wrxhqth+NndK5dF7HJp4KjHErN/qeVNgts1QgAto6lN36r0uZcW3kCgK1j6Y3/ttLm47byBABbx1IaT4S1lbq5xVaeAGDrWErjmYJzqvUjf7aVJwDYOpbO+Knjp82Ckydx2FaeAGDrWArjCXiwos0qF2kCgItrqcuJvhjUXJIFgNQN00EQ4SpVNzc6ZMofglxMS1vODOGC5XVzr4suOQK4uJaynDAYPmnx3meecJElALi4lqYcwqOqbjpXbXXaBAAn21KVdJfS5iJXRQKAq3MpyWPQdVXd3OAqRwBwdS41efwepVs/d5UjALg6l5a8ISi1x0y4yhEAXJ1LR97flTaLkkgRAJK41+9cwq9V3bw1iQwBIIl7/c5lfF01zOeTyBAAkrjX51wCXVLRzR8lkSEAJHGvz7ltap8+Vp/q3G7HeRMAnK3re+K/Dp1oFp6xDVNJlAgASdzrb+79SpvzkkoQAJI62K98wq2qbq5I2l4ASOpgn/KJ+b2VRuvOpO0FgKQO9iGfgMeDohlbthsmafs4AOwBcIprI7lfgKtzc+cx4eZq3XTup5x4iwRgolS8jUGXunYSAFydmzuPQOdWdHNrNypHA1AO1zJj3tuPzidEAOjGmP5Xg4FNVW2u7FbVSAB2lgurAg7+AqDg0lQAcHFtzpzfKm3e0s2KkQB0mk2Uw5uY8RmXxgKAi2svzOncBLLQxuuW7jO7u1PxWJVYAByFoBQ+wcBC2+YCgK1jLxr/MAPXVrX5ZVeqPadIbABmjwQ3M2OdjQgBwMat58fyUyBsPOFwa+Mr9+NQkkpz5VoB0ClSWxSej4C/BNDZcQQJAHFcekHMBAi/K8xg45J9ZpdThZhJ1gA8W/eRRThheCg8s8185ny9qro17wcWO7elj6k112HM9CQo2EHTwxOVyYMHerVYZwB6JVD6+HVAAPDrb+qrCwCpH5FfgQKAX39TX10ASP2I/AoUAPz6m/rqAkDqR+RXoADg19/UVxcAUj8ivwIFAL/+pr76fwFEQuauwoXWxwAAAABJRU5ErkJggg=="
						mode="aspectFill"
					></image>
					<image
						v-else
						class="praise-icon"
						@click="clickPraise(item)"
						src="data:image/png;base64,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"
						mode="aspectFill"
					></image> 
					<text class="praise-num" style="margin-left: 10rpx;">{{ item.PRAISE_NUM }}</text>
				</view>
				<text class="comment-content">{{ item.COMMENT }}</text>
				<view class="comment-sub">
					<text class="comment-sub-time">{{ formateDate(item.COMMENT_TIME) }}</text>
					<view class="comment-sub-recomment" style="color: #999999;" v-if="item.CANDELETE == 1" @click="clickDelete(item)">删除</view>
					<view class="comment-sub-recomment" @click="clickRecomment(item)">回复</view>
				</view>
				<view class="comment-child" v-show="item.CHILD_ANWSER_LIST.length > 0">
					<view class="comment-child-item" v-for="(itemChild, indexChild) in item.CHILD_ANWSER_LIST" :key="indexChild">
						<text class="comment-child-item-name" @click="clickRecommentChild(itemChild)">{{ itemChild.FIRSTNICKNAME + ': ' }}</text>
						<!-- <text class="comment-child-item-content">{{ (itemChild.SECONDNICKNAME ? '回复 ' + itemChild.SECONDNICKNAME + '：' : '') + itemChild.COMMENT }}</text> -->
						<text class="comment-child-item-content" v-if="itemChild.SECONDNICKNAME">回复</text>
						<text class="comment-child-item-content">{{ itemChild.SECONDNICKNAME ? itemChild.SECONDNICKNAME : '' }}</text>
						<text class="comment-child-item-content" v-if="itemChild.SECONDNICKNAME">：</text>
						<text class="comment-child-item-content">{{ itemChild.COMMENT }}</text>
						<text v-if="itemChild.CANDELETE == 1" class="comment-child-item-delete" @click="clickDeleteChild(itemChild)">删除</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dateUtils from '@/common/utils/dateUtils.js';
export default {
	name: 'MulCommentList',
	//属性
	props: {
		commentList: {
			type: Array
		},
		title: {
			type: String,
			default: '网友评论'
		}
	},
	data() {
		return {};
	},
	onLoad: function(e) {
		// console.log('five load')
	},
	created() {
		// console.log('five created')
	},
	onShow: function() {
		// console.log('five show')
		console.log('最新评论', this.title, this.commentList);
	},
	methods: {
		//格式化日期
		formateDate(dateString) {
			dateString = parseInt(dateString) * 1000;
			let date = new Date(dateString);
			let formatStr = dateUtils.dateFormat('YYYY年mm月dd日 HH:MM:SS', date);
			return formatStr;
		},
		
		/**
		 * 点赞
		 * @param {Object} item
		 */
		clickPraise(item) {
			this.$emit('clickPraise', item);
		},
		/**
		 * 回复 评论
		 * @param {Object} item
		 */
		clickRecomment(item) {
			this.$emit('clickRecomment', item);
		},
		/**
		 * 删除评论
		 * @param {Object} item
		 */
		clickDelete(item) {
			this.$emit('clickDelete', item);
		},
		/**
		 * 删除评论
		 * @param {Object} item
		 */
		clickDeleteChild(item) {
			this.$emit('clickDeleteChild', item);
		},
		/**
		 * 回复评论的评论
		 * @param {Object} item
		 */
		clickRecommentChild(item) {
			this.$emit('clickRecommentChild', item);
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
.praise-icon {
	height: 40rpx;
	width: 40rpx;
	font-size: 36rpx;
	color: #999;
}
.praise-num {
	font-size: 26rpx;
	color: #999;
}

.view-conmment-note {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
	padding-bottom: 20rpx;
}
.icon-none {
	width: 200rpx;
	height: 200rpx;
	color: #bbbbbb;
}
.text-conmment-note {
	color: #808080;
	font-size: 32rpx;
	margin-top: 30rpx;
}

.border-line {
	border-bottom: 1px solid #f6f6f6;
}
.view-comment-list {
	width: 100%;
	display: flex;
	flex-direction: row;
	background-color: white;
	padding: 20rpx 0;
	border-bottom: 1px solid #f6f6f6;
}
.view-comment-list-item-photo {
	height: 80rpx;
	width: 80rpx;
	border-radius: 40rpx;
	border: 1px solid #f6f6f6;
}
.view-comment-list-item {
	margin-left: 16rpx;
	display: flex;
	flex: 1;
	flex-direction: column;
}
.comment-name {
	color: #666;
	font-size: 32rpx;
	display: flex;
	align-items: center;
}
.comment-title {
	align-items: center;
	display: flex;
	height: 60rpx;
	flex-direction: row;
}

.comment-content {
	color: #000000;
	font-size: 32rpx;
	font-weight: 500;
}
.comment-sub {
	display: flex;
	align-items: center;
	flex-direction: row;
	.comment-sub-time {
		color: #999;
		font-size: 26rpx;
	}
	.comment-sub-recomment {
		color: #666;
		font-size: 28rpx;
		padding: 0 0 0 20rpx;
	}
}
.comment-child {
	background-color: #f8f8f8;
	border-radius: 10rpx;
	padding: 0 20rpx;
}
.comment-child-item {
	flex-wrap: wrap;
	margin: 15rpx 0;
	display: flex;
	align-items: center;
	flex-direction: row;
	.comment-child-item-name {
		white-space: nowrap;
		font-size: 30rpx;
		color: #5074cf;
	}
	.comment-child-item-content {
		font-size: 30rpx;
		text-align: center;
	}
	.comment-child-item-delete {
		font-size: 28rpx;
		color: #999999;
		margin-left: 30rpx;
		text-align: center;
	}
}
</style>
