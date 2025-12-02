<template>
	<view class="wrap">
		<view >
			<u-modal :show="popParams.show" :title="popParams.title" :content='popParams.content' @confirm='popConfirm'></u-modal>
		</view>
		<view>
			<u-form :model="infoParams">
				<view class="section">
					<view class="content">
						<text class="input-required">*</text>
						<text class="font-style">救助情况</text>
					</view>
					<u-form-item prop="condition">
						<u-textarea v-model="infoParams.condition"  placeholder="请输入救助情况" height="100"></u-textarea>
					</u-form-item>
				</view>
				<view class="section">
					<view class="content">
						<text class="font-style">救助地点</text>
					</view>
					<u-form-item prop="place">
						<u-textarea v-model="infoParams.place"  placeholder="请输入救助地点" height="20"></u-textarea>
					</u-form-item>
				</view>
				<view class="section">
					<view class="content">
						<text class="input-required">*</text>
						<text class="font-style">救助结果</text>
					</view>
					<u-form-item prop="result">
						<u-textarea v-model="infoParams.result"  placeholder="请输入救助结果" height="50"></u-textarea>
					</u-form-item>
				</view>	
				<view class="section">
					<view class="content">
						<text class="font-style">主要救助人员</text>
					</view>
					<u-form-item prop="people">
						<u-textarea v-model="infoParams.people"  placeholder="请输入主要救助人员" height="100"></u-textarea>
					</u-form-item>
				</view>
	
				<!-- 开始时间 -->
				<view class="section">
					<u-form-item label-width="160rpx" >
						<view class="content">
							<text class="font-style">救助时间</text>
						</view>
						<view>
							<u-datetime-picker 
								:show="timeParamsBegin.time_show"  
								v-model="timeParamsBegin.value" 
								mode="datetime"  
								:minDate="1677524800000"
								:maxDate="1786778555000"
								@confirm="time_confirm1">
							</u-datetime-picker>
							<u-button class="custom-style" @click="time_btn_show(1)" icon="../../static/time.png" color="#f5f5f5">
								<text class="tip" v-if="timeParamsBegin.tip_time">点击选择开始时间</text>
								<text class="custom-style-font">{{timeParamsBegin.time_value}}</text>
							</u-button>
						</view>
					</u-form-item>		
				</view>
					
				
						
				
				
			</u-form>
		</view>

		<view class="section btn">
			<u-button  @tap="submit" color="#e89f4f" shape="circle">发布</u-button>
			<!-- <button type="primary" @tap="submit">发布</button> -->
		</view>

	</view>
</template>


<script>
	import {base_url} from '../../utils/base_url.js'
	import {activityUrl} from '../../utils/base_url.js'
	import {deleteInfoUrl, helpLogUrl, getLogUrl} from '@/utils/base_url.js'
	export default {
		data() {
			return {
				auid: '',
				popParams:{
					show: false,
					title: '提示',
					content: '创建成功'
				},
				// 提交参数
				infoParams:{
					auid:'',
					condition: '',
					place: '',
					result: '',
					people: '',
					mtime: '',
				},		
				// 时间
				timeParamsBegin:{
					tip_time: true,
					time_show: false,
					time_value: '',
					value: ''
				},	
			}
		},

		methods: {
			popConfirm(){
				uni.navigateBack({delta:2})
			},	
			//拍摄时间
			time_btn_show(type){
				if(type == 1){
					this.timeParamsBegin.time_show = true
				}
				else{
					this.timeParamsEnd.time_show = true
				}
				
			},
			time_confirm1(e){
				this.timeParamsBegin.time_show = false
				this.timeParamsBegin.tip_time = false
				console.log(e)
				// console.log(this.timeParams.value)
				var s = e.value
				this.infoParams.mtime = s
				var d = new Date(s)
				var year = d.getFullYear()
				var month = d.getMonth() + 1;
				if (month < 10) {
					month = "0" + month
				}
				var date = d.getDate()
				if (date < 10) 
					date = "0" + date
				var hour = d.getHours()
				if (hour < 10)
					hour = "0" + hour
				var minuntes = d.getMinutes()
				if (minuntes < 10)
					minuntes = "0" + minuntes
				var dateTime = year + "-" + month + "-" + date + " " + hour + ":" + minuntes
				this.timeParamsBegin.time_value = dateTime
	
			},

			
			// 表单提交
			submit(){
				var that = this
				that.infoParams['auid'] = this.auid
				uni.request({
					url:helpLogUrl,
					method:'POST',
					header: {
						Authorization: uni.getStorageSync('token'),
					},
					data:that.infoParams,
					success: (res) => {
						console.log(res)
						that.popParams.show = true
					},
					fail: (e) => {
						console.log(e)
					}
				})
			},
		},
		
		// 初始化
		created() {
			
		},
		onLoad(e) {
			this.auid = e.id
		},
		beforeDestroy() {
		}
	}
</script>

<style scoped lang="scss">
	@import '/static/icon/iconfont.css';
	page{
		background-color: #F5F5F5;
	}
	.peoSlider{
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.wrap {
		padding-bottom: 240rpx;
		background-color: #F5F5F5;
	}
	.section {
		background-color: #F5F5F5;
		padding: 0 30rpx;
		margin-top: 20rpx;
	}
	.content{
		font-size: 40rpx;
		font-weight: bold;
	}
	.input-required {
		vertical-align: middle;
		color: #fa3534;
	}
	.content-img-video{
		position: relative;
		padding: 5rpx;
		margin: 6rpx;
		background-color: F5F5F5;
		// background-color: wheat;
	}
	.content-img{
		float: left;
		margin-left: 5px;
		margin-top: 5px;
		// border: 1rpx solid black;
		// margin: 3rpx;
		// margin-right: 6rpx;
	}
	.content-video{
		float: left;
		margin-top: 5px;
		margin-left: 5px;
		// border: 1rpx solid black;
	}
	.custom-style-place{
		margin-left: 12rpx;
	}
	.custom-style-font{
		// font-weight: bolder;
		margin: 10rpx;
		color: black;
		// font-style: $base-color;
	}
	.tip{
		// font-weight: bold;
		color: #C0C4CC;
	}
	.btn{
		margin: 0 auto;
		text-align: center;
		width: 400rpx;
	}


</style>




