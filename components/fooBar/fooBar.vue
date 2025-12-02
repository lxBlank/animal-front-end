<template>
	<view class="bottom" style="z-index: 1000">
		<view class="nav-box">
			<view class="nav-tab" :class="{'nav-tab-active':home===0}" @click="toIndex(0)">
				<view class="nav-icon">
					<view class="circle">
						<view class="icon iconfont">&#xe600</view>
					</view>
				</view>
				<view class="nav-text">
					首页
				</view>
			</view>
			<view class="nav-tab" :class="{'nav-tab-active':home===1}" @click="toIndex(1)">
				<view class="nav-icon" >
					<view class="circle">
						<view class="icon iconfont">&#xe884</view>
					</view>
				</view>
				<view class="nav-text">
					地图
				</view>
			</view>
			<!-- 跳转独立的搜索页 -->
			<view class="nav-tab" :class="{'nav-tab-active':home===2}" @click="toIndex(2)">
				<view class="nav-icon" >
					<view class="circle">
						<view class="icon iconfont">&#xe726</view>
					</view>
				</view>
				<view class="nav-text">
					发表
				</view>
			</view>
			<view class="nav-tab" :class="{'nav-tab-active':home===3}" @click="toIndex(3)">
				<view class="nav-icon" >
					<view class="circle">
						<view class="icon iconfont">&#xe8bd</view>
					</view>
				</view>
				<view class="nav-text">
					消息
				</view>
			</view>
			<view class="nav-tab" :class="{'nav-tab-active':home===4}" @click="toIndex(4)">
				<view class="nav-icon" >
					<view class="circle">
						<view class="icon iconfont">&#xe75e</view>
					</view>
				</view>
				<view class="nav-text">
					我的
				</view>
			</view>
		</view>
		<template>
			<u-popup :show="popShow" :round="40" mode="bottom" @close="popClose" @open="popOpen">
				<view class="addBtnCon">
					<div class="addBtn" @click="addClick(1)">
						<div style="margin: 0 auto; display: flex;">
							<div><img class="addImg" src="./dynamic.png" alt=""></div>
							<div>发表动态</div>
						</div>
					</div>
		            <div class="addBtn" @click="addClick(2)">
						<div style="margin: 0 auto; display: flex;">
							<div><img class="addImg" src="./activity.png" alt=""></div>
							<div>发起活动</div>
						</div>
					</div>
					<div class="addBtn" @click="addClick(3)">
						<div style="margin: 0 auto; display: flex;">
							<div><img class="addImg" src="./back.png" alt=""></div>
							<div>返回</div>
						</div>
					</div>
				</view>
			</u-popup>
		</template>
		
	</view>
</template>

<script>
	
	export default {
		components: {},
		data() {
			return {
				popShow: false,
				home: 0,
			}
		},
		methods: {
			// 返回
			addClick(type){
				if(type == 1){
					this.popClose()
					this.$emit('toIndex', 21)
				}
					
				else if(type == 2){
					this.popClose()
					this.$emit('toIndex', 22)
				}
				else if(type == 3){
					this.popClose()
				}
			},
			popOpen() {
				this.popShow = true
			},
			popClose() {
				this.popShow = false
			},
				  
			toIndex(index) {
				// if (index === 21) {
				// 	uni.navigateTo({
				// 		url: '../../pages/search/search'
				// 	});
				// } else {
				// 	this.$emit('toIndex', index)
				// 	this.home = index
				// }
				this.home = index
				if(index == 2){
					this.popOpen()
				}
				else{
					this.$emit('toIndex', index)
				}
				
				

			}
		}
	}
</script>

<style scoped lang="scss">
	.addBtnCon{
		height: 220px;
		margin-top: 20px;
		text-align: center;
	}
	.addBtn{
		display: flex;
		margin: 10px auto;
		text-align: center;
		width: 370px;
		font-size: 20px;
		font-weight: 10px;
		height: 50px;
		line-height: 50px;
		background-color: #f9ae3d;
		color: #fff;
		border-radius: 20px;
	}
	.addImg{
		height: 50px;
		margin-right: 5px;
	}
	.bottom {
		
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: $navHeight;
		box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.06);
		background: #fff;
		z-index: 10;
	}

	.nav-tab {
		fiex: 1;
		text-align: center;
		width: 100%;
		height: $navHeight;
	}

	.nav-icon {
		height: 30px;
		color: $mediumGrey;
		box-sizing:border-box;
		padding: 4px 0 2px 0;
	}

	.nav-icon .iconfont {
		font-size: 20px;
	}

	.nav-text {
		font-size: 11px;
		height: 19px;
		color: $mediumGrey;
		font-weight: 400;
	}

	.nav-tab-active .circle {
		height: 38px;
		width: 38px;
		line-height: 38px;
		position: relative;
		top: -14px;
		left: calc(50% - 19px);
		border-radius: 50%;
		background: $dominantHue;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
	}

	.nav-tab-active .iconfont {
		color: #fff;
	}

	.nav-tab-active .nav-text{
		color: $dominantHue;
	}
	.nav-box{
		/* position: absolute; */
		display: flex;
		width: 100%;
		box-sizing:border-box;
	}

	/*苹果x适配 H5APP*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}

	/*苹果xs适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}

	/*苹果xr适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}
	
</style>