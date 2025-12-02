<template>
	<view style="background-color: #eeeeee;">

		<view class="page-body">		
				<map style="width: 750rpx; height: 1000rpx;" 
					:latitude="latitude" 
					:longitude="longitude" 
					:markers="covers"
					@markertap="markertap"  
					@callouttap='callouttap'>	
				</map>
		</view>
		<cover-view class="time-tabnav" >
			<cover-view class="timeBtn" @click="timeBtn(1)">最近六小时</cover-view>
			<cover-view class="timeBtn" @click="timeBtn(2)">最近一天</cover-view>
			<cover-view class="timeBtn" @click="timeBtn(3)">最近一周</cover-view>
			<cover-view class="timeBtn" @click="timeBtn(4)">最近一月</cover-view>
		</cover-view>
		
		<cover-view class="animalHeader">
			<cover-view class="animalHeaderText">宠物信息</cover-view>
			<cover-view class="animalHeaderLine"></cover-view>
		</cover-view>
		<view class="animalInfoCon">
			<view class="animalGap"></view>
			<view class="animalCard" v-for="(item, index) in animalInfo" :key="item.auid" @click="animalClick(item.auid)">
				<view class="animalImg"> <image class="animalrImg" :src="item.file_list[0]"></image> </view>
				<view class="animalName">{{item.name}}</view>
			</view>
			<view class="bottomGap"></view>
		</view>

	</view>
</template>

<script>
	import {mapUrl, animalInfoUrl} from '../../utils/base_url.js'
	import dateUtils from '@/common/utils/dateUtils.js';
	
export default {
	
	data() {
		return {
			// duid
			duid: '',
			//动物数据
			animalInfo:[],
			// 顶部导航数据
			tabIndex: 0,
	
			// 地图数据
			id:0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude: 37.528983,
			longitude: 122.056908,
			covers: [
				// {
		// 		id: 1,
		// 		latitude: 37.528983,
		// 		longitude: 122.056909,
		// 		width:20,   //宽
		//               height:60,   //高
		// 		iconPath: '../../static/alter.png',
		// 		// title:'我在wwww这里',
		// 		alpha:0.8,  //透明度
		// 		callout:{//自定义标记点上方的气泡窗口 点击有效  
		// 			content:'111',//文本
		// 		    color:'#ffffff',//文字颜色
		// 		    fontSize:14,//文本大小
		// 		    borderRadius:15,//边框圆角
		// 		    borderWidth:8,
		// 		    bgColor:'#e51860',//背景颜色
		// 		    display:'ALWAYS',//常显
		// 		}
		
		// 	}, 

			],
			


		}
	},
	methods: {
		animalClick(index){
		
			//跳转动态详情页
			uni.navigateTo({
				// url: `../../pages/home/avtivity_detail?id=${id}`
				url: `/pages/animal/animal?id=${index}`
			})
		},
		// 选择时间段
		timeBtn(type){
			this.tabIndex = type
			this.getData()
		},
		getData(){
			console.log('map获取数据')
			this.covers = []
			var that = this
			// 获取数据库数据
			uni.request({
				url: mapUrl + that.tabIndex + '/',
				method:'GET',
				header: {
					Authorization: uni.getStorageSync('token'),
				},
			
				success: (res) => {
					console.log('请求数据')
					 // that.covers = res.data.data;
					 console.log(res)
					 var datas = res.data.data
					 console.log(datas)
					 var mlen = datas.length
					 for(var i = 0; i < mlen; i++){
						 var data = datas[i]
				
						 var time = that.formateDate(data['content'])
						 var curLocation = {
							id: i,
							duid: data['duid'],			// 地图标识，只有填写了这个，触发点击事件才有效
						 	latitude: data['latitude'],
						 	longitude: data['longitude'],
						 	width:30,
						 	height:30,
						 	iconPath: '../../static/map/cat.png',
						 	alpha:0.8,  //透明度		
					
						 	callout:{//自定义标记点上方的气泡窗口 点击有效  
						 		content: time,//文本
								fontSize: 15,
								borderRadius: 30,
								bgColor: '#ffffff',
								padding: 5,  //文本边缘留白
								display: 'ALWAYS'  
						 	}
						 }
						 that.covers.push(curLocation)
					 }
					
				},
				fail() {
					console.log("失败了")
				}
			})
			// 获取当前位置
			uni.getLocation({
				type: 'gcj02',
				// 成功
				success: (res) => {
					console.log('获取当前位置')
					var mlen = that.covers.length
					let tmpLocation = {
						latitude: res.latitude,
						longitude: res.longitude
					}
					// console.log(tmpLocation)
					// 当前位置
					that.latitude = res.latitude
					that.longitude = res.longitude
					var curLocation = {
						id: mlen-1,
						duid: '',
						latitude:res.latitude,
						longitude:res.longitude,
						width:30,
						height:30,
						iconPath: '../../static/map/place.png',
						// iconPath: 'http://127.0.0.1:8000/media/community/Snipaste_2023-03-31_21-06-54.png',
						// title:'我在wwww这里',
						alpha:0.8,  //透明度
						callout:{//自定义标记点上方的气泡窗口 点击有效  
							content:'我的位置',//文本
						    color:'#ffffff',//文字颜色
						    fontSize:5,//文本大小
						    borderRadius:15,//边框圆角
						    borderWidth:'8',
						    bgColor:'#e51860',//背景颜色
						    display:'ALWAYS',//常显
						}
					}
					
					that.covers.push(curLocation)
					 // console.log(that.covers)
					// 存储到缓存
					uni.setStorage({
						key: 'location',
						data: tmpLocation
					});
				
			
				},
				// 失败
				fail: (err) => {
					console.log(err)
				}
			})
			// 获取动物信息
			uni.request({
				url:animalInfoUrl,
				method:'GET',
				header: {
					Authorization: uni.getStorageSync('token'),
				},
				data:{'type': -1},
				success: (res) => {
					that.animalInfo = res.data.data
				
				},
				fail: (e) => {
					console.log(e)
				}
			})			
		
		},
		formateDate(dateString) {
			dateString = parseInt(dateString);
			let date = new Date(dateString);
			let formatStr = dateUtils.dateFormat('mm月dd日 HH:MM:SS', date);
			return formatStr;
		},
		//地图点击事件
		markertap(e){	
		    console.log("===你点击了标记点===",e)
			// var index = e.detail['markerId']
			// this.duid = this.covers[index].duid
			// console.log(duid)
			// this.$set(this.covers[index], "iconPath", "../../static/map/cat2.png");
			// this.$forceUpdate()
			
			// if(this.duid != ''){
			// 	uni.navigateTo({
			// 		url: `/pages/home/activity_detail?id=${this.duid}`
			// 	})
			// }
		},
		//地图点击事件
		callouttap(e){
		    // console.log('地图点击事件',e)
			var index = e.detail['markerId']
			this.duid = this.covers[index].duid
			if(this.duid != ''){
				uni.navigateTo({
					url: `/pages/home/activity_detail?id=${this.duid}`
				})
			}

		}

	},

	created() {
		this.getData()
	}
}
</script>
<style>
.animalHeader{
	position: absolute;
	top: 920rpx;
	background-color: #fefefe;
	/* background-color: red; */
	height: 130rpx;
	width: 94%;
	margin-left: 3%;
	border-radius: 20px;
}
.animalHeaderText{
	font-size: 18px;
	/* height: 50%; */
	height: 50rpx;
	line-height: 50rpx;
	/* border-radius: 20px; */
	margin-top: 13px;
	margin-left: 20px;
	font-weight: bold;
	color: #8c898d;
}
.animalHeaderLine{

	height: 1px;
	margin-top: 10px;
	/* border: 2px solid red; */
	width: 96%;
	margin-left: 2%;
	font-size: 20px;
	background-color: black;
}
.animalInfoCon{
	width: 94%;
	
	margin-left: 3%;
	background-color: #fefefe;
}
.animalGap{
	height: 50rpx;
	
}
.animalCard{
	position: relative;
	/* border: 2px solid red; */
	height: 120px;
	background-color: whitesmoke;
	border-radius: 20px;
	margin-bottom: 10px;
	width: 96%;
	margin-left: 2%;
	
}
.animalImg{
	width: 100%;
	height: 100%;
	border-radius: 10px;
}
.animalrImg{
	width: 100%;
	height: 100%;
	border-radius: 10px;
	mode:"aspectFill"
}
.animalName{
	position: absolute;
	top: 15px;
	left: 30px;
	font-size: 40px;
	color: white;
	font-weight: bold;
}
.time-tabnav{
	position: absolute;
	top: 10rpx;
	height: 50rpx;
	width: 750rpx;
	display: flex;
	flex-direction: row;
	/* background-color: white; */
	/* background-color: white; */
}
.timeBtn{
	width: 200rpx;
	height: 20px;
	border-radius: 20rpx;
	font-size: 12px;
	margin: 4rpx 25rpx;
	text-align: center;
	color: white;
	background-color:#07c2b0;
}
.page-body{
	margin-top: 2rpx;
	background-color: #eeeeee;
}
.bottomGap{
	height: 50px;
}
</style>
