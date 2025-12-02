<template>
	<u-form>
		<u-form-item label="姓名">
			<u-input></u-input>
		</u-form-item>
		<u-form-item label="性别">
			<u-picker :show="show" :columns="columns" @confirm="confirm"></u-picker>
			<u-button @click="show = true">选择</u-button>
		</u-form-item>
		<u-form-item label="爱好">

		</u-form-item>
	</u-form>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
                columns: [
                    ['健康', '不健康', '其它']
                ],
			}
		},
		methods: {
			confirm(e){
				console.log(e)
				this.show=false
			}
		}
	}
</script>

<style>

</style>
