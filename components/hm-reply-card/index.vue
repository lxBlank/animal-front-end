<template> 
  <div class="hm-reply-card">
    <div class="box">
      <div class="hd">
        <text class="newComments">新消息</text>
        <div class="block">
			<div class="opcon2"><image class="opimg" src="../../static/message/mop.png"></image></div>
          <!-- <image class="dot" src="../../static/message/mop.png" /> -->
        </div>
      </div>
	  
      <div class="bd" v-for="item in oldMessage" :key="item.cuid" @click="toDynamic(item.duid)">
        <div class="shopCreditWrap">
          <image class="shopCreditLv1" :src="item.avator" />
          <text class="desc">{{item.name}}{{ item.type }}</text>
        </div>
        <text class="twoDaysAgo">{{fromCurrentTime(item.mtime)}}</text>
      </div>
	<div class="blank"></div>
	  
    </div>
	
  </div>
</template>
<script>
export default {
  name: 'HmReplyCard',
  props: ['newMessage', 'oldMessage'],
  data() {
    return {
		message: [],
	};
  },
  watch:{
	  newMessage:{
		  immediate: true,
		  handler(newValue, oldValue){
			  this.message.unshift(newValue)
		  }
	  },
	  oldMessage:{
		  immediate: true,
		  handler(newValue, oldValue){
			  this.message.push(newValue)
		  }
	  }
  },
  methods: {
	toDynamic(duid){
		console.log('dianji ')
		uni.navigateTo({
			url: `/pages/home/activity_detail?id=${duid}`
		})
	},
	fromCurrentTime(dateString) {
	  	dateString = parseInt(dateString) * 1000;
	  	let date = new Date(dateString).getTime();
	  	let currentDate = new Date().getTime();
	  	let spaceTime = Math.abs(currentDate - date) / 1000; //把相差的毫秒数转换为秒数
	  	if (spaceTime < 60) {
	  		// 间隔时间小于1小时
	  		// 返回分钟数
	  		return '刚刚';
	  	}
	  	if (spaceTime < 3600) {
	  		// 间隔时间小于1小时
	  		// 返回分钟数
	  		let time = parseInt(spaceTime / 60)
	  		return time + '分钟前';
	  
	  	} else if (spaceTime < 86400) {
	  		// 间隔时间小于1天
	  		// 返回小时数
	  		let time = parseInt(spaceTime / 60 / 60);
	  		return time + '小时前';
	  	} else if (spaceTime < 172800) {
	  		// 间隔时间小于2天
	  		// 返回天数
	  		let time = parseInt(spaceTime / 60 / 60 / 24);
	  		return '昨天';
	  	} else {
	  		// 间隔时间大于2天
	  		let time = parseInt(spaceTime / 60 / 60 / 24);
	  		return time + '天前';
	  	}
	  
	  }
  },
  created() {
  },
  mounted() {
  }
};
</script>
<style>
@import './index.response.css';
.opimg{
	width: 20px;
	height: 20px;
	margin-left: 30px;
}
.blank{
	height: 10rpx
}
</style>
