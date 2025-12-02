<template>
  <view class="posia posi-all0 z700" v-if="visible">
    <view class="posif posi-all0 anima-punch-in3 bgblack-a3" @tap="$_close"></view>
    <view class="posif posi-blr0 bgwhite anima-slide-up3">
      <view class="plr18r ptb18r flexr-jsa flex-aic">
        <textarea class="flex-fitem comm-hmo400r f28r c111 br8r ptb8r plr8r bgf8" :placeholder="placeholder"
          placeholder-style="font-size: 14px;color:#8F8F94" auto-height v-model="content"></textarea>
        <view class="mlr18r" @tap="openExpres = !openExpres">
          <i-icon type="biaoqing" size="64" color="#8f8f94"></i-icon>
        </view>
        <view class="mr18r" @tap="$_aite">
          <i-icon type="aite" size="64" color="#8f8f94"></i-icon>
        </view>
        <view class="br8r plr18r ptb8r bgtheme" @tap="$_send">
          <i-icon type="fabu" size="48" color="#FFFFFF"></i-icon>
          <text class="f28r cwhite ml18r">发送</text>
        </view>
      </view>
      <!-- 表情内容 -->
      <view class="w100v comm-h400r f36r fcenter anima-slide-up3 cblack bts2r" v-if="openExpres">
        <text class="hl80r w128r bgtheme" @tap="$_expres('1')"> 表情1 </text>
        <text class="hl80r w128r bgblack-a3" @tap="$_expres('2')"> 表情2 </text>
      </view>
    </view>
  </view>
</template>

<script>
  /**  
   * 评论输入弹出层组件
   * 通过ref调用open打开
   * @event {Function} send 发送 点击事件  
   */
  export default {
    name: 'comm-input',

    data() {
      return {
        // 弹出层显示
        visible: false,
        // 表情区显示
        openExpres: false,
        // 输入内容
        content: '',
        // 输入占位提示字符
        placeholder: '评论',
        // 评论对象
        commObject: {}
      }
    },

    methods: {
      open(e) {
        this.content = '';
        this.openExpres = false;
        this.placeholder = '评论';
        if (e.type == 'comment') {
          if (e.content) this.content = e.content
          delete e.content
          this.commObject = e
        }
        if (e.type == 'reply') {
          this.placeholder = `回复${e.user}`
          delete e.user
          this.commObject = e
        }
        this.visible = true;
      },
      $_close() {
        this.commObject.state = false;
        this.commObject.content = this.content;
        this.$emit('send', this.commObject)
        this.visible = false;
      },
      /// 发送提交
      $_send() {
        this.commObject.state = true;
        this.commObject.content = this.content;
        this.$emit('send', this.commObject)
      },
      /// 表情内容打开关闭
      $_openExpres() {
        this.openExpres = !this.openExpres
      },
      /// 表情选择
      $_expres(type) {
        console.log(type);
      },
      /// 跳转搜索用户页 
      $_aite() {
        console.log('跳转搜索用户页');
        // uni.navigateTo({
        //   url: `/pages/report/report?id=${this.item.ObjectID}&type=${this.item.ObjectType}`
        // })
      },
    }
  }
</script>

<style>
  /* 表情区高度 */
  .comm-h400r {
    height: 400rpx;
  }

  /* 输入框最大高度 */
  .comm-hmo400r {
    max-height: 400rpx;
    overflow: hidden;
  }
</style>
