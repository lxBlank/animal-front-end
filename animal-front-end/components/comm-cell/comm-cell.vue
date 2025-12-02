<template>
  <view class="bgwhite bbs2r">
    <!-- 头部 -->
    <view class="flexr-jsb flex-aic plr18r ptb18r">
      <!-- 显示信息含时间 -->
      <view class="flex" @tap="$emit('user',infoData.User)">
        <user-avatar :src="calUserAvater" :tag="infoData.User.AuthenticateCode" size="md"></user-avatar>
        <view class="flexc-jsa ml28r">
          <view>
            <text class="f28r fbold mr18r c111">{{infoData.User.NickName || '#'}}</text>
            <i-icon :type="infoData.User.Gender == '男' ?'nan':'nv' " size="28" :color="infoData.User.Gender == '男' ?'#479bd4':'#FF6699'"></i-icon>
          </view>
          <view class="f24r cgray">{{calDatetime}}</view>
        </view>
      </view>
      <view class="w128r hl80r fcenter" @tap="$emit('top',infoData)">
        <i-icon type="dianzan" size="48" :color="infoData.UserTop?'#FF6699':'#8f8f94'"></i-icon>
        <text class="f28r ml8r cgray">{{ infoData.TopCount || '赞'}}</text>
      </view>
    </view>
    <!-- 评论及回复 -->
    <view class="comment">
      <view class="comment-content" :class="{bbs2r: infoData.ChildCount}" @tap="$emit('comm',infoData)">{{infoData.Content || '#'}}</view>
      <block v-if="infoData.ChildCount" v-for="(item,index) in infoData.CommentChilds" :key="index">
        <view class="comment-childs">
          <text class="f28r ctheme" @tap="$emit('user',item.User)">{{item.User.NickName || '#'}}</text>
          <text class="mlr8r" @tap="$emit('comm',item)">回复</text>
          <text class="f28r ctheme" @tap="$emit('user',item.ReplyUser)">{{item.ReplyUser.NickName || '#'}}</text>
          <text @tap="$emit('comm',item)">：{{item.Content}}</text>
        </view>
      </block>
      <view class="f28r c555 mt8r mb28r" v-if="infoData.ChildCount > 3" @tap="$emit('more',infoData.ID)">
        <text class="mr8r">更多 {{infoData.ChildCount - 3}} 条评论</text>
        <i-icon type="you" size="32" color="#8f8f94"></i-icon>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    fnFormatDate
  } from "@/utils/CommonUtil.js"

  /**  
   * 评论列表单元组件
   * @event {Function} top 点赞 点击事件  
   * @event {Function} user 用户名 点击事件  
   */
  export default {
    name: 'comm-cell',

    props: {
      /// 信息数据  
      infoData: {
        type: Object,
        default: () => {
          return {
            "ID": 9085409,
            "User": {
              "ID": 912473,
              "NickName": "华衣锦鲤季官方号",
              "HeadUrl": "https://pic.hanfugou.com/android/2019/7/9/51fc474f197f4ee48f99a4e3e14375d5.png",
            },
            "TrendID": 2595909,
            "ObjectID": 2595909,
            "ObjectType": "trend",
            "Content": "好吃的",
            "ChildCount": 2,
            "UserTop": false,
            "CommentChilds": [{
              "ID": 9092290,
              "User": {
                "ID": 1159238,
                "NickName": "念竹里",
                "HeadUrl": "https://pic.hanfugou.com/android/2019/4/26/843dcd6a1b2048fdb4ce4b62050bdf75.jpg",
              },
              "TrendID": 2595909,
              "ObjectID": 2595909,
              "ObjectType": "trend",
              "Content": "捉",
              "ReplyUser": {
                "ID": 912473,
                "NickName": "华衣锦鲤季官方号",
                "HeadUrl": "https://pic.hanfugou.com/android/2019/7/9/51fc474f197f4ee48f99a4e3e14375d5.png",
              },
              "TopCount": 0,
              "ChildCount": 0,
              "UserTop": false,
              "Datetime": "2019-08-17T22:16:30"
            }, {
              "ID": 9092315,
              "User": {
                "ID": 912473,
                "NickName": "华衣锦鲤季官方号",
                "HeadUrl": "https://pic.hanfugou.com/android/2019/7/9/51fc474f197f4ee48f99a4e3e14375d5.png",
              },
              "TrendID": 2595909,
              "ObjectID": 2595909,
              "ObjectType": "trend",
              "Content": "嘻嘻，终于有人在评论区捉我了",
              "ReplyUser": {
                "ID": 1159238,
                "NickName": "念竹里",
                "HeadUrl": "https://pic.hanfugou.com/android/2019/4/26/843dcd6a1b2048fdb4ce4b62050bdf75.jpg",
              },
              "TopCount": 0,
              "ChildCount": 0,
              "UserTop": false,
              "Datetime": "2019-08-17T22:18:12"
            }],
            "Datetime": "2019-08-17T15:28:54"
          }
        }
      }
    },

    computed: {
      /// 时间友好格式 几天前
      calDatetime() {
        let timestamp = new Date(this.infoData.Datetime || '2020-01-01 01:01').getTime();
        return fnFormatDate(timestamp);
      },
      /// 计算显示用户头像
      calUserAvater() {
        let user = this.infoData.User;
        return !!user ? user.HeadUrl + '_100x100.jpg' : '/static/default_avatar.png'
      },
    },

  }
</script>

<style>
  .comment {
    margin-left: 128rpx;
    padding-left: 18rpx;
  }

  .comment-content {
    font-size: 28rpx;
    color: #333;
    line-height: 56rpx;
    font-weight: bold;
  }

  .comment-childs {
    font-size: 24rpx;
    line-height: 42rpx;
    color: #333;
    padding-right: 18rpx;
  }
</style>
