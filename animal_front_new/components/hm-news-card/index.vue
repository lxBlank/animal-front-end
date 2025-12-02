<template>
  <div class="hm-news-card">
    <div class="container">
      <div class="box" @click="onClick(options)">
        <img class="img" :src="options.img" />
        <span class="title">{{ options.title }}</span>
        <div class="submain">
          <span class="author">{{ options.author }}</span>
          <span class="date">{{ timestampToTime(options.date) }}</span>
        </div>
        <span class="summary">{{ options.summary }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmNewsCard',
  props: ['options'],
  data() {
    return {};
  },
  methods: {
    onClick(options) {
		console.log('dianjile')
      // uni.navigateTo({
      //   url: this.options.url
      // });
	  
	  uni.navigateTo({
	  	url: `/pages/activity/activity_detail?auid=${options.auid}&uid=${options.uid}&name=${options.author}`
	  })
    },
      // 时间戳
    timestampToTime(timestamp) {
		timestamp = parseInt(timestamp)*1000
		timestamp = timestamp ? timestamp : null;
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
     
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m;
    },	
  }
};
</script>
<style>
@import './index.response.css';
</style>
