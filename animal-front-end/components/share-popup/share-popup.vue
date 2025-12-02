<template>
  <view class="posia posi-all0 z700" v-if="visible">
    <view class="posif posi-all0 anima-punch-in3 bgblack-a3" @tap="$_close"></view>
    <view class="posif posi-blr0 bgwhite anima-slide-up3">
      <view class="flex flex-fww ptb28r plr28r">
        <view class="flexc-jsc flex-aic flex-25v" @tap="$_wechat">
          <image class="share-icon" src="/static/icon-share/icon_wechat.png" mode="aspectFit"></image>
          <view class="share-name">微信</view>
        </view>
        <view class="flexc-jsc flex-aic flex-25v" @tap="$_circle">
          <image class="share-icon" src="/static/icon-share/icon_wechat_circle.png" mode="aspectFit"></image>
          <view class="share-name">朋友圈</view>
        </view>
        <view class="flexc-jsc flex-aic flex-25v" @tap="$_qq">
          <image class="share-icon" src="/static/icon-share/icon_qq.png" mode="aspectFit"></image>
          <view class="share-name">QQ</view>
        </view>
        <view class="flexc-jsc flex-aic flex-25v" @tap="$_qzone">
          <image class="share-icon" src="/static/icon-share/icon_qzone.png" mode="aspectFit"></image>
          <view class="share-name">QQ空间</view>
        </view>
        <!-- 普通操作 -->
        <view class="flexc-jsc flex-aic flex-25v mt28r" @tap="$_copy">
          <view class="share-icon">
            <i-icon type="fuzhi" size="64" color="#999999"></i-icon>
          </view>
          <view class="share-name">复制链接</view>
        </view>
        <view class="flexc-jsc flex-aic flex-25v mt28r" @tap="$_report">
          <view class="share-icon">
            <i-icon type="jubao" size="64" color="#999999"></i-icon>
          </view>
          <view class="share-name">举报</view>
        </view>
      </view>

      <view class="hl90r w100v f36r fcenter cblack bts2r" @tap="$_close">取消</view>
    </view>
  </view>
</template>

<script>
  /**  
   * 分享弹出层组件
   * 通过ref调用open打开
   */
  export default {
    name: 'share-popup',

    data() {
      return {
        visible: false,
        item: {}
      }
    },

    methods: {
      open(e) {
        this.item = e;
        this.visible = true;
      },
      $_close() {
        this.visible = false;
      },
      /**
       * 调起微信好友分享
       */
      $_wechat() {
        uni.showToast({
          icon: 'none',
          title: '调起微信好友分享',
          success: () => {
            this.visible = false;
          }
        })
      },
      /// 调起微信朋友圈分享 
      $_circle() {
        uni.showToast({
          icon: 'none',
          title: '调起微信朋友圈分享',
          success: () => {
            this.visible = false;
          }
        })
      },
      /// 调起QQ好友分享 
      $_qq() {
        uni.showToast({
          icon: 'none',
          title: '调起QQ好友分享',
          success: () => {
            this.visible = false;
          }
        })
      },
      /// 调起QQ空间分享 
      $_qzone() {
        uni.showToast({
          icon: 'none',
          title: '调起QQ空间分享',
          success: () => {
            this.visible = false;
          }
        })
      },
      /// 创建外部链接到剪切板 
      $_copy() {
        uni.setClipboardData({
          data: `https://m.hanfugou.com/hui/details?objecttype=${this.item.ObjectType}&objectid=${this.item.ObjectID}`,
          success: () => {
            this.visible = false;
          }
        });
      },
      /// 跳转举报页 
      $_report() {
        uni.navigateTo({
          url: `/pages/report/report?id=${this.item.ObjectID}&type=${this.item.ObjectType}`,
          success: () => {
            this.visible = false;
          }
        })
      },
    }
  }
</script>

<style>
  .share-icon {
    width: 72rpx;
    height: 72rpx;
    text-align: center;
    vertical-align: middle;
    border: 2rpx #F4F4F4 solid;
    border-radius: 8rpx;
    padding: 12rpx;

  }

  .share-name {
    font-size: 24rpx;
    color: #8F8F94;
    margin-top: 12rpx;
  } 
</style>
