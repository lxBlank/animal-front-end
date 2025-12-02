<template>
	<view class="wrap">
 		<u-form :model="model" :rules="rules" ref="uForm">
			<view class="section">
				<view class="content">
					<text class="input-required">*</text>
					<text class="font-style">动态内容</text>
				</view>
				<u-form-item prop="describe">
					<u-textarea v-model="model.describe"  placeholder="请输入内容" height="150"></u-textarea>
				</u-form-item>
			</view>
			<view class="section">
				<view class="content">上传照片或者视频</view>

				<u-form-item>
					<view class="content-img-video">
						<view class="content-img">
							<u-upload v-if="isShowImageUpload"  name="1" width="100" height="100" uploadText="上传图片"
							:fileList="fileList1" :previewImage="true" uploadIcon="../../static/upload_img.png" :maxCount="9" 
							:multiple='true' @afterRead="afterRead" @delete="deletePic">	
							</u-upload>
						</view>
						<view class="content-video">
							<u-upload v-if="isShowVideoUpload" width="100" height="100" uploadText="上传视频"
							uploadIcon='../../static/upload_video.png' :maxCount="1" :multiple='true' 
							:previewFullImage="true" :auto-upload='false' @on-list-change="mediaChange">
							</u-upload>
						</view>
					</view>
				</u-form-item>
			</view>
<!-- 			<view class="section">
				<view class="content">动物状态</view>
				<u-form-item>

				</u-form-item>
			</view>
 -->
			<view class="section">
				
				
				<!-- 动物状态 -->
				<u-form-item label="动物状态" label-width="160rpx">
					<view>
						<u-picker :show="health_show" :columns="health_columns" @confirm="health_confirm"></u-picker>
						<u-button  class="custom-style"  @click="health_btn_show"  icon="../../static/alter.png" color="#f5f5f5">
							<text class="tip" v-if="tip_health">点击选择动物状态</text>
							<text class="custom-style-font">{{health_value}}</text>
						</u-button>
						
					</view>
				</u-form-item>
				<!-- 拍摄时间 -->
				<u-form-item label="拍摄时间" label-width="160rpx" >
					<view>
						<u-datetime-picker :show="time_show"  mode="datetime"  @confirm="time_confirm"></u-datetime-picker>
						<u-button class="custom-style" @click="time_btn_show" icon="../../static/time.png" color="#f5f5f5">
							<text class="tip" v-if="tip_time">点击选择拍摄时间</text>
							<text class="custom-style-font">{{time_value}}</text>
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
				<u-form-item label="是否求助" label-width="160">
					<!-- <u-input placeholder="是否求助" disabled="disabled" /> -->
					<view>
						<u-switch active-color="#EED146" v-model="model.isHelp"  @change='isNeedHelp'></u-switch>
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
	export default {
		data() {
			return {
				uid: '',
				// 图片列表
				fileList1: [],
				selectAlbumTypeShow:false,
				// 图片视频上传控制
				isShowImageUpload:true,
				isShowVideoUpload:true,
				model: {
					// 动态内容
					describe:'',			//动态内容
					// 是否求助		
					isHelp: false,		//是否求助
					// 位置
					device:'',
					spaceId:'',
					spaceName:'',
					spaceAddress:'',		//地址
					spaceLongitude:'',		//精度
					spaceLatitude:'',		//维度
				},
				// 动物健康状态
				tip_health: true,
				health_show: false,
				health_value: '',   	
				health_index: 0, 	//健康值
                health_columns: [
                    ['健康', '生病', '未知']
                ],
				// 时间
				tip_time: true,
				time_show: false,
				time_value: '', 		
				time_index: '0',		//时间值
				rules: {
					describe: [
						{
							required: true,
							message: '请输入动态内容',
							trigger: 'blur' ,
						}
					]
				}
			}
		},
		methods: {
			
			// let that = this
			// 动物健康状态：选项框显示控制
			health_btn_show(){
				this.health_show = true
			},
			health_confirm(e){
				var s = e.value
				this.health_index = e.index
				this.health_show = false
				this.tip_health = false
				this.health_value = s[0]
			},
			//拍摄时间
			time_btn_show(){
				this.time_show = true
			},
			time_confirm(e){
				this.time_show = false
				this.tip_time = false
				var s = e.value
				this.time_index = s
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
				this.time_value = dateTime
	
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
				console.log('12312312')
				let that = this;
				uni.chooseLocation({
					latitude:Number(this.model.spaceLatitude),
					longitude:Number(this.model.spaceLongitude),
					success:(res)=>{
						console.log(res)
						that.model.spaceName = res.name;
						that.model.spaceAddress = res.address;
						that.model.spaceLongitude = res.longitude;
						that.model.spaceLatitude = res.latitude;
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
					// console.log(lists[i].url)
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
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: base_url + 'community/add_file/', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'img_url',
						formData: {
							uid : this.uid
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
				console.log(e)
				this.model.isHelp = e
			},
			// 表单提交
			submit(){
				// 根据uid找到对应数据进行更新
				let is_help = 0
				if(this.model.isHelp){
					is_help = 1
				}
					
				let img_place = this.model.spaceAddress + ',' + this.model.spaceLongitude + ',' + this.model.spaceLatitude
				let res_data = {
					uid: this.uid,
					content: this.model.describe,     //内容
					is_help: is_help, 				//是否需要帮助
					img_place: img_place,             //位置
					health_status: this.health_index, //健康
					img_time: this.time_index,        //时间
				}
				console.log(res_data)
				uni.request({
					url:base_url + 'community/addinfo/',
					method:'POST',
					header: {
						Authorization: uni.getStorageSync('token'),
					},
					data:res_data,
					success: (res) => {
						console.log(res);
					},
				})
			},
		},

		created() {
			// 进入发表动态页面，自动创建数据返回uid
			console.log('发表动态')
			let that = this
			let is_help = 0
			if(this.model.isHelp){
				is_help = 1
			}
				
			let img_place = this.model.spaceAddress + ',' + this.model.spaceLongitude + ',' + this.model.spaceLatitude
			let res_data = {
				content: this.model.describe,     //内容
				is_help: is_help, 				//是否需要帮助
				img_place: img_place,             //位置
				health_status: this.health_index, //健康
				img_time: this.time_index,        //时间
				is_deleted: 1,					//默认设置为1
			}
			uni.request({
				url:base_url + 'community/addinfo/',
				method:'POST',
				data:res_data,
				header: {
					Authorization: uni.getStorageSync('token'),
				},
				success: (res) => {
					console.log(res);
					that.uid = res.data.data['uid']
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
		margin-top: 6rpx;
		background-color: F5F5F5;
	}
	.content-img{
		float: left;
		border: 1rpx solid black;
		margin: 3rpx;
		margin-right: 6rpx;
	}
	.content-video{
		float: left;
		border: 1rpx solid black;
		margin: 3rpx;
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




