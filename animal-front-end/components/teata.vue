<template>
	<view>
		这是测试模板
		父组件向子组件传值：{{title}}
		子组件向父组件传值：{{num}}
		<button @click="sendNum">子向父</button>
	</view>
</template>

<script>
	export default {
		name:"teata",
		data() {
			return {
				num: 3
			};
		},
		props: ['title'],
		beforeCreate: () => {
			console.log('实例开始初始化');

		},
		created() {
			console.log(this.num2)
		},
		methods:{
				
			sendNum(){
				console.log('senNUm')
				this.$emit('mySend', this.num)
			}
		}

	}
</script>

<style>

</style>