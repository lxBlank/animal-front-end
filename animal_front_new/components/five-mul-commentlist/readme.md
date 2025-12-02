#### **1. 使用方法：**

```javascript
        <!-- 
		@param: commentList展示的评论列表数据
		@method: clickPraise 点赞评论
		@method: clickDelete 删除父级评论
		@method: clickRecommentChild 点赞子评论
		@method: clickDeleteChild 删除子评论
		 -->
		<five-mul-commentlist
			:commentList="commentList"
			@clickPraise="clickPraiseComment"
			@clickDelete="clickDeleteComment"
			@clickDeleteChild="clickDeleteCommentChild"
			@clickRecomment="clickRecomment"
			@clickRecommentChild="clickRecommentChild"
		></five-mul-commentlist>

```
#### **2. commentList数据格式参照如下：**

```json
[{
	{
		"COMMENT_TIME": "",
		"FIRSTNICKNAME": "",
		"IS_PRAISE": null,
		"COMMENT": "",
		"PRAISE_NUM": 0,
		"CANDELETE": 0,
		"HEADIMGURL": "",
		"PARENTID": "",
		"SECONDNICKNAME": null,
		"CHILD_ANWSER_LIST": [{
			"COMMENT_TIME": "",
			"FIRSTNICKNAME": "",
			"IS_PRAISE": null,
			"COMMENT": "",
			"PRAISE_NUM": 0,
			"CANDELETE": 1,
			"HEADIMGURL": ",
			"SECONDNICKNAME": ""
		}]

	}
]
```


 
 