# wly-tabnav
### 父组件中说明
[文档地址](https://ext.dcloud.net.cn/plugin?id=8403)

``` html
<!-- 引入 -->
<wly-tabnav ref="tabnav" :fixed="true" :tabnav="tabnav" @ontype_='ontype'></wly-tabnav>
```
# API

|属性名				|类型			|默认值			                                        |说明				|
|:-:				|:-:			|:-:				                                    |:-:				|
|defaultKey			|String         | ''				                                    |默认tab key选中值	|
|lineW				|Number,String  | 0					                                    |线条宽度			|
|optStyle			|String			|'color: #333333;'	                                    |选中的文字样式		|
|optStyleElse		|String			|'color: #999999;'	                                    |其他未选中的文字样式	|
|tabStyle			|String			|''			                                            |自定义组件样式		|
|lineStyle			|String			|''			                                            |自定义进度条样式		|
|fixed 				|Boolean		|true		                                            |是否固定			|
|tabnav 			|Number			|[{ type: '', //状态值 name: '全部', list: [], //数据 }]	|菜单导航			|



# Countdown Events

|事件称名	|说明	    |返回值	            |
|:-:		|:-:	    |:-:		        |
|@ontype_   |点击后出发	|当前点击对应的菜单对象|

``` js
	this.$refs.tabnav.typefun(0);//当前需要自定义跳转的索引
	
	// 当前选中的值
	ontype(e){
		console.log(e);//
	}
	
```

### 子组件参数说明
``` js
/** props 参数说明
 * fixed 是否固定窗口
 * tabnav 导航列表
 * */
		props:{
			// 线条宽度
			lineW:{
				type: [Number,String],
				default: 0
			},
			// 线条颜色
			lineStyle:{
				type: [String],
				default: ''
			},
			// 是否固定
			fixed:{
				type: Boolean,
				default: true
			},
			// 菜单导航
			tabnav: {
				type: Array,
				default:[{
					type: '', //状态值
					name: '全部',
					list: [], //数据
				}, {
					type: '0', //状态值
					name: '待付款',
					list: [], //数据
				}, {
					type: '2', //状态值
					name: '待收货',
					list: [], //数据
				}, {
					type: '3', //状态值
					name: '已完成',
					list: [], //数据
				}, {
					type: '5', //状态值
					name: '售后',
					list: [], //数据
				}]
			},
		},
```
