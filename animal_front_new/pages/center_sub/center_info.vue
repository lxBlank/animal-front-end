<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="info">
		<form @submit="formSubmit" @reset="formReset">
			<view class="avator" style="height: 100px; text-align: center; background-color: #e89f4f;">
				<view  v-if="isBtn" style="width: 100px; height: 100px; margin-left: 35%; border: 2px white solid; border-radius: 100%;">
					<u-avatar :src="userParams.avator" size="100"></u-avatar>
				</view>
				<view  v-if="!isBtn" style="width: 100px; height: 100px; margin: 0px auto;">
					<u-upload
						:fileList="fileList1"
						@afterRead="afterRead"
						@delete="deletePic"
						:useBeforeRead="true"
						
						uploadIcon="../../static/upload_img.png" 
						name="1"
						multiple
						:maxCount="1"
					></u-upload>
				</view>
			</view>

			<u-line></u-line>
			<view class="uid mdisply">
				<text class="tuid">UID：</text>
				<div class="minput-con"><input type="text" class="minput iuid" disabled placeholder="用户标识" v-model="userParams.uid"></div>
				
			</view>
			<u-line></u-line>
			<view class="name mdisply" :class="(mupdate == 1)?'wc':'uc'">
				<text class="tname">昵称：</text>
				<div class="minput-con"><input type="text" class="minput iname" :disabled="isBtn" placeholder="用户昵称" v-model="userParams.username"></div>
				
			</view>
			<u-line></u-line>
			<view class="gender mdisply" :class="(mupdate == 1)?'wc':'uc'">
				
				<text class="tgender">性别：</text>
				<div class="minput-con" @click='genderBtn'><input type="text" class="minput igender" :disabled="isBtn" placeholder="用户性别" v-model="userParams.genderText">	</div>
				
			</view>
			<u-line></u-line>
			<view class="phone mdisply">
				<text class="tphone">电话：</text>
				<div class="minput-con"><input type="text" class="minput iphone" disabled placeholder="用户电话" v-model="userParams.phone"></div>
				
			</view>
			<u-line></u-line>
			<view class="email mdisply" :class="(mupdate == 1)?'wc':'uc'">
				<text class="temail">邮箱：</text>
				<div class="minput-con"><input type="text" class="minput iemail"  :disabled="isBtn" placeholder="用户邮箱" v-model="userParams.email"></div>	
			</view>
			<u-line></u-line>
			<view class="role mdisply">
				<text class="trole">类型：</text>
				<div class="minput-con"><input type="text" class="minput irole" :disabled="isBtn" placeholder="用户类型" v-model="userParams.roleText">	</div>
					
			</view>
			<u-line></u-line>
			<view class="quit flex-center">
				<view class="btn flex-center" @click="updateBtn" v-if="isBtn">修改</view>
				<view class="btn flex-center" @click="saveBtn" v-if="!isBtn">保存</view>
			</view>
			
			
		</form>
		<u-picker :show="genderParams.show" :columns="genderParams.columns" @confirm="genderConfirm" @cancel="genderCancel"></u-picker>
	</view>
</template>

<script>
	import {base_url, getUserUrl} from '../../utils/base_url.js'
	export default{
		data(){
			return{
				fileList1: [],
				userParams:{
					avator:'',
					text:'点击修改头像',
					uid:'',
					name:'',
					phone:'',
					genderText:'男',
					roleText: "普通用户",
					pwd:'',
					email:''
				},
				genderParams:{
					show:false,
					columns: [
					    ['男', '女']
					],
				},
				isBtn: true,
				mupdate: 0
			}
		},
		methods:{
			getData(){
				var that = this
				uni.request({
					url:getUserUrl,
					method:'GET',
					// data:this.userParams,
					header: {
						Authorization: uni.getStorageSync('token'),
					},
					success: (res) => {
						that.userParams = res.data.data
						that.userParams.role == 0 ? (that.userParams['roleText']='普通用户') : (that.userParams['roleText']='管理员用户')
						that.userParams.gender == 0 ? (that.userParams['genderText'] = '男') : (that.userParams['genderText'] = '女')
					},
				})			
			},
			// 性别选择
			genderBtn(){
				this.genderParams.show = true
			},
			// 性别确认
			genderConfirm(e){
				this.userParams.gender = e.value[0]
				this.userParams.genderText = e.value[0]
				this.genderParams.show = false
			},
			// 性别取消
			genderCancel(e){
				
				this.genderParams.show = false
			},
			// 修改
			updateBtn(){
				this.mupdate = 1
				this.isBtn = false
			},
			// 保存
			saveBtn(){
				this.mupdate = 0
				this.isBtn = true
				var that = this
				uni.request({
					url:base_url + 'users/update/info/',
					method:'POST',
					data:this.userParams,
					header: {
						Authorization: uni.getStorageSync('token'),
					},
					success: (res) => {
						that.getData()
					},
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
						url: base_url + 'users/update/avator/', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'avator',
						header:{
							Authorization:uni.getStorageSync('token'),
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		},
		onShow(){
			this.getData()
			// 缓存中获取用户信息
			var user = uni.getStorageSync('user')
			console.log(user)
			this.userParams.uid = user.uid
			this.userParams.name = user.username
			this.userParams.avator = base_url + 'media/' + user.avator
			this.userParams.email = user.email
			this.userParams.phone = user.phone
			// 用户信息处理
			if(user.gender == 0){
				this.userParams.gender = '男'
			}
			else{
				this.userParams.gender = '女'
			}
			if(user.role == 0){
				this.userParams.role = '普通用户'
			}
			else{
				this.userParams.role = '管理员用户'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mdisply{
		display: flex;
		height: 50px;
		// margin-left: 10px;
		padding-left: 10px;
		line-height: 50px;
		position: relative;
		// border: 2px red solid;
		
		// margin-top: 10px;
		// margin-bottom: 10px;
	}
	.minput-con{
		position: absolute;
		// border: 2px red solid;
		// position: relative;
		top: calc(50% - 11px);
		margin-left: calc(10%);
	}
	.minput{
		 
	}
	.quit{
		height: 100rpx;
		margin-top: 30px;
		.btn{
			background-color: $base-color;
			border-radius: 30px;
			width: 80%;
			color: white;
			font-size: 1.2em;
			height: 100%;
	  }
	}
	.flex-center{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	 
	.wc{
		background-color: #f5f5f5;
		font-weight: bold;
	}
	.uc{
		
	}
</style>