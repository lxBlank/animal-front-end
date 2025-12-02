<template>
  <view class="login-type">
    <view class="logo">
      <image src="/static/logo.png"></image>
    </view>
    <button
        class="confirm-btn"
        :disabled="btnLoading"
        @tap="navTo('/pages/login/login')">
      登录
    </button>
    <button
        class="confirm-btn"
        :disabled="btnLoading"
        @tap="navTo(`/pages/login/login?type=1`)">
      立即注册
    </button>
    <!--协议popup-->
    <rf-protocol-popup
        ref="mapState"
        @popupState="popupState"
        protocolPath="/pages/set/about/detail?field=protocol_register&title=注册协议"
        policyPath="/pages/set/about/detail?field=protocol_privacy&title=隐私协议"
        v-if="isRfProtocolPopupShow">
	</rf-protocol-popup>
    <!-- 底部协议 -->
    <view class="footer-protocol">
		<text class="cuIcon" @tap="handleRfProtocolPopupShow"></text>
		<text class="content">登录表示同意</text>
		<!-- 协议地址 -->
		<text @tap="handleRfProtocolPopupShow">《{{appName}}APP协议》</text>
    </view>
    <!-- 底部协议 -->
    <view class="footer">
		<view class="d-header">
			<text>其他登录方式</text>
		</view>
		<view class="login-type-list">
			<block v-for="item in loginTypeList" :key="item.text">
				<button
					:disabled="btnLoading"
					:loading="btnLoading"
					@tap="handleAuthLogin(item.text)"
					class="login-type-btn">
					<image class="image" :src="item.icon"></image>
				</button>
			</block>
      </view>
    </view>
  </view>
</template>
<script>

	import rfProtocolPopup from '@/components/rf-protocol-popup';
	export default {
		components: { rfProtocolPopup },
		data() {
			return {
				btnLoading: false,
				isRfProtocolPopupShow: false, // 控制协议popup显示
				appAgreementDefaultSelect: true,
				appName: '流浪动物',
				loginTypeList: [
					{ text: 'QQ', icon: '/static/QQ.png' },
					{ text: '微信', icon: '/static/wechat.png' },
					{ text: '微博', icon: '/static/weibo.png' },
				]
			};
		},
		onShow() {
			if (uni.getStorageSync('accessToken')) {
				this.$mRouter.reLaunch({ route: '/pages/index/index' });
			}
		},
		onLoad(options) {
			// 如果不是第一次进来 就不需要强制阅读协议
			if (!uni.getStorageSync('notFirstTimeLogin')) {
        this.appAgreementDefaultSelect = false;
			} else {
				this.appAgreementDefaultSelect = true;
			}
		},
		methods: {
			handleAuthLogin(text) {
				uni.showToast({ title: `点击了${text}授权登录` })
			},
			// 通用跳转
			navTo(url) {
		    if (!this.appAgreementDefaultSelect) {
					uni.showToast({ title: '请先勾选并阅读协议' });
					return;
				}
				uni.navigateTo({ url });
			},
			// 显示协议popup
			handleRfProtocolPopupShow() {
				this.isRfProtocolPopupShow = true;
			},
			// 监听是否同意协议
			popupState(e) {
				if (e) {
					this.appAgreementDefaultSelect = true;
					uni.setStorageSync('notFirstTimeLogin', true);
					this.isRfProtocolPopupShow = false;
				} else {
					this.appAgreementDefaultSelect = false;
					this.isRfProtocolPopupShow = false;
				}
			}
		}
	};
</script>
<style lang="scss">
  page {
    background: #fff;
  }
  .login-type {
    padding-top: 80rpx;
    .logo {
      text-align: center;
      margin-bottom: 10rpx;

      image {
        width: 300rpx;
        height: 340rpx;
        border-radius: 28rpx;
      }
    }
    .confirm-btn {
      width: 84%;
      margin: 0 7% 50rpx;
      height: 84rpx;
      line-height: 84rpx;
      font-size: 32rpx;
      border: 1rpx solid;
      color: $base-color;
      background: none;
    }
    .footer {
      width: 100%;
      text-align: center;
      position: fixed;
      bottom: 40rpx;
      font-size:  24rpx + 2rpx;
      .protocol {
        margin: 0 10rpx;
      }
      .d-header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80rpx;
        margin-bottom: 20rpx;
        font-size: 28rpx + 2rpx;
        position: relative;
        text {
          padding: 0 32rpx;
          background: #fff;
          position: relative;
          z-index: 1;
        }
        &:after {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%);
          width: 300rpx;
          height: 0;
          content: '';
          border-bottom: 1px solid #ccc;
        }
      }
      .login-type-list {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .login-type-btn {
          border: none;
          background: none;
          padding: 12 30rpx 0 0;
          margin: 0;
          .image {
            width: 64rpx;
            height: 64rpx;
          }
          &:after {
            border: none;
          }
        }
        .iconfont {
          font-size: 50rpx;
        }
      }
    }
    .footer-protocol {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28upx;
      margin-bottom: 30upx;
      padding-bottom: 30upx;
      .cuIcon {
        padding: 6upx;
      }
      .content {
        margin: 0 4upx 0 10upx;
      }
    }
  }
</style>
