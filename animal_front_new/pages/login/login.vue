<!-- 
界面：登录/注册界面
功能：
实现：
密码/验证码登录   
验证码注册
未实现：
忘记密码
 -->
<template>
	<view class="login">
		<!-- 错误提醒弹窗 -->
		<view >
			<u-modal :show="popParams.show" :title="popParams.title" :content='popParams.content' @confirm="popConfirm"></u-modal>
		</view>
		<!--顶部返回按钮-->
		<text class="back-btn iconfont iconzuo" @tap="navBack"></text>
		<!-- 顶部 -->
		<view class="login-top bg-active">
			<view class="desc">
				<view class="title">Hi~</view>
				<text>{{ appName }}欢迎您</text>
			</view>
			<image class="login-pic" src="/static/login/login-pic.png"></image>
		</view>
		<!-- 中部 -->
		<view class="login-type-content">
			<!-- 背景 -->
			<image class="login-bg" src="/static/login/login-bg.png" :style="{height: tabCurrentIndex === 1 ? '150vw' : '94vw'}"></image>
			<view class="main">
				<!-- 导航栏：登录/注册 -->
				<!-- 0：登录 1：注册 -->
				<view class="nav-bar">
					<view
							class="nav-bar-item"
							v-for="(item, index) in typeList"
							:key="index"
							:class="tabCurrentIndex === index ? 'nav-bar-item-active text-active' : ''"
							@tap="tabClick(index)"
					>
						{{ item.text }}
					</view>
				</view>
				<!-- 登录界面 -->
				<block v-if="tabCurrentIndex === 0">
					<view class="login-type-form">
						<!-- 手机号 -->
						<view class="input-item">
							<text class="iconfont iconzhanghuffffffpx"></text>
							<input
									class="login-type-input"
									type="number"
									name="mobile"
									v-model="loginParams.mobile"
									placeholder="请输入手机号码"
									maxlength="11"
							/>
						</view>
						
						<!-- 密码&验证码登录二选一 -->
						<!-- 密码 -->
						<view class="input-item" v-if="loginByPass">
							<text class="iconfont iconmimaffffffpx"></text>
							<input
									class="login-type-input"
									type="password"
									v-model="loginParams.password"
									placeholder="请输入密码"
									maxlength="20"
							/>
						</view>
						<!-- 验证码 -->
						<view class="input-item input-item-sms-code" v-if="!loginByPass">
							<text class="iconfont iconyanzhengma"></text>
							<view class="input-wrapper">
								<view class="rf-input-wrapper">
									<input
											type="number"
											class="login-type-input"
											v-model="loginParams.code"
											placeholder="请输入验证码"
											maxlength="4"
									/>
								</view>
								<!-- <text>获取验证码</text> -->
								<button class="sms-code-btn" @tap.stop="getSmsCode('login')">
									<text v-if="!smsCodeBtnDisabled">获取验证码</text>
									<text v-if="smsCodeBtnDisabled" class="sms-code-resend">重新发送{{codeSeconds}}</text>
								</button>
							</view>
						</view>
					</view>
					<!-- 登录方式选择 -->
					<view class="login-type-tips">
						<view @tap="showLoginBySmsCode" class="forget-section">
							{{ loginByPass ? '验证码登录' : '密码登录' }}
						</view>
						<!-- 忘记密码跳转页面 -->
						<text @tap="navTo('#')">忘记密码？</text>
					</view>
					
					<!-- 登录 -->
					<button
							class="confirm-btn bg-active"
							:disabled="btnLoading"
							:loading="btnLoading"
							@tap="toLogin"
					>
						登录
					</button>
				</block>
				<!-- 注册界面 -->
				<block v-if="tabCurrentIndex === 1">
					<view class="login-type-form">
						<view class="input-item">
							<text class="iconfont icondianhua"></text>
							<input
									class="login-type-input"
									type="number"
									name="mobile"
									v-model="registerParams.mobile"
									placeholder="请输入手机号码"
									maxlength="11"
							/>
						</view>
						<view class="input-item input-item-sms-code">
							<text class="iconfont iconyanzhengma"></text>
							<view class="input-wrapper">
								<view class="rf-input-wrapper">
									<input
											type="number"
											class="login-type-input"
											v-model="registerParams.code"
											placeholder="请输入验证码"
											maxlength="6"
									/>
								</view>
								<button
										class="sms-code-btn"
										:disabled="smsCodeBtnDisabled"
										@tap.stop="getSmsCode('register', registerParams.mobile)"
								>
									<text v-if="!smsCodeBtnDisabled">获取验证码</text>
									<text v-if="smsCodeBtnDisabled" class="sms-code-resend">重新发送{{codeSeconds}}</text>
								</button>
							</view>
						</view>
						<view class="input-item">
							<text class="iconfont iconmimaffffffpx"></text>
							<input
									class="login-type-input"
									type="password"
									v-model="registerParams.password"
									placeholder="请输入密码"
									maxlength="20"
									value="6666"
							/>
						</view>
						<view class="input-item">
							<text class="iconfont iconmimaffffffpx"></text>
							<input
									class="login-type-input"
									type="password"
									v-model="registerParams.password_repetition"
									placeholder="请输入确认密码"
									maxlength="20"
							/>
						</view>
						<view class="input-item">
							<text class="iconfont iconwode"></text>
							<input
									class="login-type-input"
									type="text"
									v-model="registerParams.nickname"
									placeholder="请输入昵称"
									maxlength="20"
							/>
						</view>

					</view>
					<button
							class="confirm-btn bg-active"
							:disabled="btnLoading"
							:loading="btnLoading"
							@tap="toRegister">
						注册
					</button>
				</block>
			</view>
		</view>
		<!-- 底部 -->
		<view class="login-type-bottom text-active">
		  {{ appName }} 版权所有
		</view>
	</view>
</template>
<script>
	import {base_url} from '../../utils/base_url.js'
	export default {
		data() {
			return {
				//弹窗参数
				popParams: {
					show: false,
					content: '',
					title: ''
				},
				// 登录参数
				loginParams: {
					mobile: '',
					code: '',
					password: ''
				},
				// 注册参数
				registerParams: {
					mobile: '',
					password: '',
					password_repetition: '',
					nickname: '',
					code: ''
				},
				btnLoading: false,
				reqBody: {},
				codeSeconds: 0, 			// 验证码发送时间间隔
				loginByPass: true,			// 密码登录/验证码登录
				isGetCode: false,			// 是否成功获取验证码
				smsCodeBtnDisabled: true,	// 获取验证码/重新发送
				userInfo: null,
				appName: '流浪动物APP',		
				tabCurrentIndex: 0,			//0：登录 1：注册
				typeList: [
					{
						text: '登录'
					},
					{
						text: '注册'
					}
				]
			};
		},
		//监听页面加载
		//参数为上个页面传进来的参数，为object
		onLoad(options) {
			this.tabCurrentIndex = parseInt(options.type || 0, 10);
			// 启用发送验证码按钮
			this.smsCodeBtnDisabled = false;
			console.log('加载页面');

		},
		// 每次刷新页面都会展示
		// 这里可以做保持登录
		onShow() {
			// console.log(this.smsCodeBtnDisabled);
			// console.log(uni.getStorageSync('token'))
			console.log("验证是否重复登录")
			console.log(uni.getStorageSync('token'))
			//发送请求
			uni.request({
				header:{
					Authorization:uni.getStorageSync('token'),
				},
				url: base_url + 'users/in_login/',
				success(res) {
					if(res.data.code == 1){
						console.log("已登录，无需重复登录")
						// 跳转到main
						uni.navigateTo({
							url:'../main/main'
						})
					}

				}
			})
		},
		methods: {
			//提醒框
			popConfirm(){
				this.popParams.show = false
			},

			// 发送验证码并进入倒计时
			// 异步
			async getSmsCode(usage = 'login') {
				var that = this
	
				// 发送验证码
				// 登录界面点击
				if(usage == 'login'){
					console.log('login-获取验证码');
					uni.request({
						url: base_url + 'verifications/smscode/' + this.registerParams.mobile + '/',
						success(res) {
	
							console.log(res)
							that.isGetCode = true
						},
						fail(e){
							console.log(e)
							that.popParams.show = true
							that.popParams.title = '错误'
							that.popParams.content = '验证码获取失败'
						}
					})
				}
				// 注册界面点击
				else if(usage == 'register'){
					console.log('register-获取验证码');
					uni.request({
						url: base_url + 'verifications/smscode/' + this.registerParams.mobile + '/',
						success(res) {
							console.log(res)
							that.isGetCode = true
							that.myTimer()
						},
						fail() {
							that.popParams.show = true
							that.popParams.title = '错误'
							that.popParams.content = '验证码获取失败'
						
						}
					})
				}

			},
			myTimer(){
				console.log('点击了获取验证码');
				if(this.isGetCode){
					console.log('点击了获取验证码');
						
					console.log('phone: ' + this.registerParams.mobile);
					//禁用发送验证码按钮
					this.smsCodeBtnDisabled = true;
					// 设置计时器
					var num = 60; //60s倒计时
					this.codeSeconds = num;
					console.log('开始计时');
					var t = setInterval(() => {
						console.log(num)
						if(num == 1){
							//清楚计时器对象
							clearInterval(t);
							num = num - 1;	
							// 启用发送验证码按钮
							this.smsCodeBtnDisabled = false;
						}
						else{
							num = num - 1;		
						}
						this.codeSeconds = num;
					}, 1000, 60);	
				}
				this.isGetCode = false
			},
			// 切换登录方式
			showLoginBySmsCode() {
				this.loginByPass = !this.loginByPass;
			},
			// 返回上一页
			navBack() {
				uni.navigateBack();
			},
			// 统一跳转路由
			navTo(url) {
				uni.navigateTo({ url });
			},
			// 提交表单
			async toLogin() {
				console.log('登录')
				var that = this
				// uni.navigateTo({
				// 	url:'../main/main'
				// })
				uni.request({
					url:base_url + 'users/login/',
					method:'POST',
					data:this.loginParams,
					success: (res) => {
						
						console.log(res);
						console.log(res.data)
						if(res.data.code == 1){
							console.log('login success')
							uni.setStorageSync('token', res.data.token)
							uni.setStorageSync('uid', res.data.uid)
							uni.navigateTo({
								url:'../main/main'
							})
						}
						else{
							that.popParams.show = true
							that.popParams.title = '错误'
							that.popParams.content = res.data.msg
													
							console.log('登录失败：', res.data.msg)
						}
						
					},
					fail(e) {
						console.log(e)
						that.popParams.show = true
						that.popParams.title = '错误'
						that.popParams.content ='服务器内部错误'
					}
				})
			},
			// 切换登录/注册
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			// 注册账号
			async toRegister() {
				var that = this
				this.popParams.show = false
				console.log('注册');
				console.log(base_url)
				uni.request({
					url:base_url + 'users/add_user/',
					method:'POST',
					data:this.registerParams,
					success: (res) => {
						console.log(res)
						uni.setStorageSync('token', res.data.token)
						uni.setStorageSync('uid', res.data.uid)
						that.popParams.show = true
						that.popParams.title = '提示'
						that.popParams.content = '注册成功请登录'
						this.tabCurrentIndex = 0;
						// uni.navigateTo({
						// 	url:'../main/main'
						// })
					},
					fail: () => {
						this.popParams.show = true
						this.popParams.title = '错误'
						this.popParams.content = '验证码获取失败'
					}
				})
			}
		}
	};
</script>
<style lang="scss">
	page {
		background: #fff;
	}
	.login {
		width: 100%;
		position: relative;
    .bg-active {
      background-color: $base-color;
      color: #fff;
    }
    .text-active, .iconfont {
      color: $base-color;
    }
		.back-btn {
			position: absolute;
			left: 40rpx;
			z-index: 9999;
			padding-top: var(--status-bar-height);
			top: 40rpx;
			font-size: 48rpx;
			color: #fff;
		}
		.login-top {
			height: 460rpx;
			position: relative;
			.desc {
        color: #fff;
				position: absolute;
				top: 200rpx;
				left: 40rpx;
				font-size: 48rpx;
				.title {
					font-size: 48rpx;
				}
			}
			.login-pic {
				position: absolute;
				width: 220rpx;
				height: 270rpx;
				right: 30rpx;
				top: 100rpx;
			}
		}
		.login-type-content {
			position: relative;
			top: -72rpx;
			.login-bg {
				width: 94vw;
				height: 94vw;
				margin: 0 3vw;
			}
			.main {
				width: 94vw;
				position: absolute;
				top: 0;
				left: 3vw;
				.nav-bar {
					display: flex;
					height: 100rpx;
					justify-content: center;
					align-items: center;
					position: relative;
					z-index: 10;
					.nav-bar-item {
						flex: 1;
						display: flex;
						height: 100%;
						line-height: 96rpx;
						font-size: 32rpx;
						display: flex;
						margin: 0 120rpx;
						justify-content: center;
					}
					.nav-bar-item-active {
						border-bottom: 5rpx solid;
					}
				}
				.login-type-form {
					width: 80%;
					margin: 50rpx auto;
					.input-item {
						position: relative;
						height: 90rpx;
						line-height: 90rpx;
						margin-bottom: 30rpx;
						.iconfont {
							font-size: 50rpx;
							position: absolute;
							left: 0;
						}
						.login-type-input {
							height: 90rpx;
							padding-left: 80rpx;
							border-bottom: 1rpx solid rgba(0, 0, 0, .1);
						}
						.sms-code-btn, sms-code-resend {
							width: 240rpx;
							font-size: 26rpx;
						}
					}
				}
				.login-type-tips {
					padding: 0 50rpx;
					display: flex;
					justify-content: space-between;
          font-size: 28upx;
          color: #666;
				}
				.confirm-btn {
          margin-top: 60upx;
          width: 80%;
					height: 80rpx;
					line-height: 80rpx;
				}
			}
		}
		.login-type-bottom {
			width: 100%;
			padding-bottom: 30rpx;
			text-align: center;
			font-size: 32rpx;
		}
    // 发送验证码样式
    .input-item-sms-code {
      .input-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .sms-code-btn {
        width: 200upx;
        background-color: #fff;
        display: flex;
        padding: 15upx 0;
        justify-content: center;
        align-items: center;
        border-radius: 12upx;
      }

      .sms-code-resend {
        color: #666;
      }
    }
	}
</style>
