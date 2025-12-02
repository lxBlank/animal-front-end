<script>
	// 顶部导航栏
	import wlyTabnav from './uni_modules/wly-tabnav/components/wly-tabnav/wly-tabnav.vue'
	export default {
		components:{
			wlyTabnav
		},
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style  lang="scss">
	/*每个页面公共css */
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	// uview引用
	@import "@/uni_modules/uview-ui/index.scss";
	// iconfont图标
	@import '/static/icon/iconfont.css';
	/* 每个页面公共css */
	@import "/common/common.css";
	@import "/common/relation.css";
	
</style>
