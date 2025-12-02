<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import url('https://at.alicdn.com/t/font_1681579_yaiyfblc2xt.css');
	@import url("static/icon/iconfont.css");
	/* 每个页面公共css */
	@import "/common/common.css";
	@import "/common/relation.css";
</style>
