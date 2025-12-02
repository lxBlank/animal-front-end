<template>
	<view class="wrap">
			<view >
				<u-modal :show="popParams.show" :title="popParams.title" :content='popParams.content' @confirm='popConfirm'></u-modal>
			</view>
 		<u-form :model="model"  ref="uForm">
			<view class="section">
				<view class="content">
					<text class="input-required">*</text>
					<text class="font-style">动态内容</text>
				</view>
				<u-form-item prop="describe">
					<u-textarea v-model="infoParams.content"  placeholder="请输入内容" height="150"></u-textarea>
				</u-form-item>
			</view>
			<view class="section">
				<view class="content">上传照片或者视频</view>

				<u-form-item>
					<view class="content-img-video">
						<view class="content-img">
							<u-upload v-if="isShowImageUpload"  name="1" width="50" height="50" 
							 uploadText="上传图片"
							:fileList="fileList1" :previewImage="true" uploadIcon="../../static/upload_img.png" :maxCount="9" 
							:multiple='true' @afterRead="afterRead" @delete="deletePic">	
							</u-upload>
						</view>
		<!-- 				<view class="content-video">
							<u-upload v-if="isShowVideoUpload" width="50" height="50" 
							 uploadText="上传视频"
							uploadIcon='../../static/upload_video.png' :maxCount="1" :multiple='true' 
							:previewFullImage="true" :auto-upload='false' @on-list-change="mediaChange">
							</u-upload>
						</view> -->
					</view>
				</u-form-item>
			</view>

			<view class="section">
				
				
				<!-- 动物状态 -->
				<u-form-item label="动物状态" label-width="160rpx">
					<view>
						<u-picker :show="healthParams.show" :columns="healthParams.columns" @confirm="health_confirm"></u-picker>
						<u-button  class="custom-style"  @click="health_btn_show"  icon="../../static/alter.png" color="#f5f5f5">
							<text class="tip" v-if="healthParams.tip_health">点击选择动物状态</text>
							<text class="custom-style-font">{{healthParams.value}}</text>
						</u-button>
						
					</view>
				</u-form-item>
				<!-- 拍摄时间 -->
				<u-form-item label="拍摄时间" label-width="160rpx" >
					<view>
						<u-datetime-picker 
							:show="timeParams.time_show"  
							v-model="timeParams.value" 
							mode="datetime"  
							:minDate="1677524800000"
							:maxDate="1786778555000"
							@confirm="time_confirm">
						</u-datetime-picker>
						<u-button class="custom-style" @click="time_btn_show" icon="../../static/time.png" color="#f5f5f5">
							<text class="tip" v-if="timeParams.tip_time">点击选择拍摄时间</text>
							<text class="custom-style-font">{{timeParams.time_value}}</text>
						</u-button>
					</view>
				</u-form-item>
				<!-- 拍摄地点 -->
				<u-form-item label="拍摄地点" label-width="140rpx">
					<view @tap="setLocation">
						<u-button class="custom-style custom-style-place" icon="../../static/place.png" color="#f5f5f5">
							<text :style="model.spaceAddress?'color:#606266 ;':'color:#C0C4CC;'">
								{{model.spaceAddress?model.spaceAddress:'点击选择位置坐标'}}
							</text> 
						</u-button>
						
					</view>
				</u-form-item>
				<!-- 求助 -->
				<u-form-item label="是否求助" label-width="180rpx">
					<view class="switchLabel">
						<u-switch active-color="#EED146"  v-model="help_value" @change='isNeedHelp'></u-switch>
					</view>
				</u-form-item>
			</view>
			
		</u-form> 
		<view class="section btn">
			<u-button  @tap="submit" color="#e89f4f" shape="circle">发布</u-button>
			<!-- <button type="primary" @tap="submit">发布</button> -->
		</view>

	</view>
</template>


<script>
	import {base_url} from '../../utils/base_url.js'
	import {infoUrl2} from '../../utils/base_url.js'
	import {deleteInfoUrl} from '../../utils/base_url.js'
	
	export default {
		data() {
			return {
				popParams:{
					show: false,
					title: '提示',
					content: '发表成功'
				},
				// 图片列表
				fileList1: [],
				selectAlbumTypeShow:false,
				// 图片视频上传控制
				isShowImageUpload:true,
				isShowVideoUpload:true,
				infoParams:{
					duid:'',
					uid: '',
					content: '',
					file_url: '',
					health: 0,
					img_time:'0',
					img_place:'',
					like: 0,
					reply: 0,
					trans: 0,
					is_help: 0,
					is_deleted: 0,
					is_top:0,
					is_deleted: 1,
					type: 1,
				},			
				// 位置
				model: {
					
					device:'',
					spaceId:'',
					spaceName:'',
					spaceAddress:'',		//地址
					spaceLongitude:'',		//精度
					spaceLatitude:'',		//维度
				},	
				// 动物健康状态
				healthParams:{
					index: 0,
					value: '',
					show: false,
					tip_health: true,
					columns: [
					    ['健康', '生病', '未知']
					]
				},
				
				// 时间	
				timeParams:{
					tip_time: true,
					time_show: false,
					time_value: '',
					value: ''
				},
				
				// 是否求组
				help_value: false
			}
		},

		methods: {
			popConfirm(){
				uni.navigateTo({
					url:'../main/main'
				})
			},
			// 动物健康状态：选项框显示控制
			health_btn_show(){
				this.healthParams.show = true
			},
			health_confirm(e){
				var s = e.value
				// 索引
				this.healthParams.index = e.indexs[0]
				// 值
				this.healthParams.value = s[0]
				// 更新健康值
				this.infoParams.health = e.indexs[0]
				// 弹窗
				this.healthParams.show = false
				// 文字控制
				this.healthParams.tip_health = false
			},
			
			//拍摄时间
			time_btn_show(){
				this.timeParams.time_show = true
			},
			time_confirm(e){
				this.timeParams.time_show = false
				this.timeParams.tip_time = false
				console.log(e)
				// console.log(this.timeParams.value)
				var s = e.value
				this.infoParams.img_time = s
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
				this.timeParams.time_value = dateTime
	
			},
			
			// 位置处理函数
			setLocation(){
				this.getLocation()
				this.chooseLocation()
			},
			//获取当前位置
			getLocation(){
				let that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						console.log(res)
						that.model.spaceLatitude = res.latitude
						that.model.spaceLongitude = res.longitude
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				})
			},
			//拍摄地点	
			chooseLocation() {
				let that = this;
				uni.chooseLocation({
					latitude:Number(this.model.spaceLatitude),
					longitude:Number(this.model.spaceLongitude),
					success:(res)=>{
						console.log(res)
						that.model.spaceName = res.name;
						var address = res.address
						if(res.address.length > 12){
							address = res.address.substring(0,13) + '...'
							
						}
						
						that.model.spaceAddress = address;
						that.model.spaceLongitude = res.longitude;
						that.model.spaceLatitude = res.latitude;
						that.infoParams.img_place = res.address + ',' + that.model.spaceLongitude + ',' + this.model.spaceLatitude
					}
				})
			},
			
			// 文件上传
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				
				for (let i = 0; i < lists.length; i++) {
					// 图片url
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				var that = this
				that.infoParams.type = 1
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: base_url + 'community/add_file/', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file_url',
						formData: {
							duid : that.infoParams.duid,
							type: that.infoParams.type
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			
			// 是否需要帮助
			isNeedHelp(e) {
				if(e)
					this.infoParams.is_help = 1
				else
					this.infoParams.is_help = 0
			},
			
			// 表单提交
			submit(){
				// 根据uid找到对应数据进行更新
				var that = this
				console.log(this.infoParams)
				this.infoParams['uid'] = uni.getStorageSync('uid')
				uni.request({
					url:base_url + 'community/addinfo/',
					method:'POST',
					header: {
						Authorization: uni.getStorageSync('token'),
					},
					data:that.infoParams,
					success: (res) => {
						that.infoParams.duid = res.data.data['duid']
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
			// 进入发表动态页面，自动创建数据返回uid
			let that = this
			this.infoParams.is_deleted = 1
			this.infoParams['uid'] = uni.getStorageSync('uid')
			uni.request({
				url:base_url + 'community/addinfo/',
				method:'POST',
				data:that.infoParams,
				header: {
					Authorization: uni.getStorageSync('token'),
				},
				success: (res) => {
					if(res.data.code == -6){
						uni.redirectTo({
							url:'../login/login'
						})
					}
					that.infoParams.duid = res.data.data['duid']
				},
			})			
		},
		beforeDestroy() {
			var that = this
			that.infoParams.type = 1
			uni.request({
				url:deleteInfoUrl,
				method:'POST',
				data:that.infoParams,
				header: {
					Authorization: uni.getStorageSync('token'),
				},
				success: (res) => {
					
				},
			})	
			
		}

	}
</script>

<style scoped lang="scss">
	@import '/static/icon/iconfont.css';
	page{
		background-color: #F5F5F5;
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




