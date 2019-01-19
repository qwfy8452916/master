<template>
  <section :style='{"height":screenHeight}' class="section">
    <div class="feedback-box">
      <textarea name="feedback" id="feedback" placeholder="感谢您的建议，让我们可以做的更好~"  v-model="feedText" maxlength="1000"></textarea>
      <div class="upload-img">
        <div v-for="item in uploadImg" :key="item" class="feedback-img" v-html="item">
        </div>
        <div class="upload-button" v-if="hideButton">
          <div class="dashed-box"></div>
          <p class="add-text">添加图片</p>
          <input type="file" class="file-input" @change="getFile">
        </div>
      </div>
     </div>
    <div class="btn-submit" @click="submit">
      提交
    </div>
    <m-tips ref="tips"/>
  </section>
</template>
<script>
import mTips from '../common/mTips'
import { Indicator } from 'mint-ui'
export default {
  name: 'feedback',
  components: {
    mTips
  },
  data () {
    return {
      screenHeight: '',
      uploadImg: [],
      imgValue: '',
      feedText: '',
      hideButton: true
    }
  },
  mounted () {
    let winHeight = window.innerHeight
    this.screenHeight = winHeight - 10 + 'px'
  },
  methods: {
    getFile (e) {
      let that = this
      let imgInfo = e.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(imgInfo)
      reader.onloadstart = function () {
        Indicator.open('读取中...')
      }
      reader.onload = function (event) {
        let img = new Image()
        img.src = reader.result
        img.onload = function () {
          let width = this.width
          let height = this.height
          let imgStr = ''
          if (width <= height) {
            imgStr = '<img style="width:100%;margin:auto;left:0px;right:0px;top:0px;bottom:0px;position:absolute" src="' + reader.result + '"/>'
          } else {
            imgStr = '<img style="height:100%;margin:auto;left:0px;right:0px;top:0px;bottom:0px;position:absolute" src="' + reader.result + '"/>'
          }
          that.uploadImg.push(imgStr)
          that.hideButton = that.uploadImg.length < 5
        }
      }
      reader.onloadend = function () {
        Indicator.close()
      }
    },
    submit () {
      if (this.feedText.length === 0) {
        this.$refs.tips.tipsFadeIn({
          text: '您还没有填写建议哦~'
        })
        return false
      }
      if (this.feedText.length < 5) {
        this.$refs.tips.tipsFadeIn({
          text: '反馈内容最少5个字哦~'
        })
        return false
      }
      this.$refs.tips.tipsFadeIn({
        text: '提交成功 感谢您的宝贵意见！'
      })
    }
  }
}
</script>
<style scoped>
  .section {
    height: calc(100% - 10px);
    background:#F7F7F7;
    padding-top:10px;
    position: relative;
  }
  .feedback-box{
    background:#fff;
    padding:10px;
  }
  #feedback{
    width: 100%;
    height: 1.8rem;
    resize: none;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    font-size: 0.12rem;
  }
  textarea::-webkit-input-placeholder {
      color:#999;
  }
  textarea:-moz-placeholder {
      color:#999;
  }
  textarea::-moz-placeholder {
      color:#999;
  }
  textarea:-ms-input-placeholder {
      color:#999;
  }
  .btn-submit{
    position: absolute;
    bottom: 0px;
    padding:0.08rem 0px;
    background: #ff5353;
    color:#fff;
    text-align: center;
    width: 100%;
    font-size: 0.14rem;
  }
  .upload-button{
    border:1px dashed #ccc;
    width:0.8rem;
    height: 0.85rem;
    margin:8px;
    position: relative;
    background: url("../../assets/img/feedback/plusIcon.png") no-repeat;
    background-position: center 28%;
    background-size: 40% 40%;
    float: left;
  }
  .dashed-box {
    border:1px dashed #888888;
    width: 40%;
    height: 40%;
    left: 50%;
    margin:16% auto;
  }
  .add-text{
    color: #D8D8D8;
    text-align: center;
    font-size: 0.1rem;
    position: absolute;
    width:100%;
    bottom: 10px;
  }
  .upload-img{
    overflow: hidden;
  }
  .upload-img .feedback-img{
    width:calc(33.3333% - 10px);
    border:5px solid #fff;
    float: left;
    text-align: center;
    height: calc(1rem - 10px);
    overflow: hidden;
    position: relative;
  }
  .feedback-img img{
    position: absolute;
    left: 0px;
    right:0px;
    bottom:0px;
    top:0px;
    margin:auto
  }
  .file-input{
    width:100%;
    height: 100%;
    position: absolute;
    appearance: none;
    -webkit-appearance: none;
    display: block;
    top:0px;
    bottom:0px;
    opacity: 0;
  }
</style>
