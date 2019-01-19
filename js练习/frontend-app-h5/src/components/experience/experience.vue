<template>
  <section>
    <div class="bk-banner">
      <img src="../../assets/img/bkzn/bkzn.png" alt="">
      <div class="bk-table">
        <div class="bk-table-cell">
            <div class="articel-title">装修合同</div>
            <p class="articel-title-fbt"> 装修合同的正确姿正确姿势</p>
        </div>
      </div>
    </div>
    <div class="point-list">
      <template v-for="(item,index) in articleData">
        <div class="list-item" :key="index" >
          <div class="item-title" @click="openDetail(item,index)">
            <p>{{item.title}}</p>
            <i :class="item.hide?'fa fa-angle-up':'fa fa-angle-down'"></i>
          </div>
          <div class="articel-detail" v-show="item.hide">
            {{item.content}}
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
<script>
import { experience } from '@/api/api'
export default {
  name: 'experience',
  data () {
    return {
      articleData: [],
      id: ''
    }
  },
  mounted () {
    var that = this
    that.id = that.$route.query.id
    experience(that.id).then((res) => {
      if (res.error_code !== 0) {
        for (let i = 0; i < res.data.data.content.length; i++) {
          if (i === 0) {
            res.data.data.content[i].hide = true
          } else {
            res.data.data.content[i].hide = false
          }
        }
        that.articleData = res.data.data.content
      }
    })
  },
  methods: {
    openDetail (item, index) {
      item.hide = !item.hide
      for (let j = 0; j < this.articleData.length; j++) {
        if (j !== index) {
          this.articleData[j].hide = false
        }
      }
    }
  }
}
</script>
<style scoped>
  .bk-banner {
    position: relative;
  }
  .bk-banner img{
    width:100%;
  }
  .bk-table{
    display: table;
    position:absolute;
    margin:auto;
    top:0px;
    bottom:0px;
    width:100%;
    color:#fff;
    vertical-align: middle;
  }
  .bk-table-cell{
    text-align: center;
  }
  .articel-title{
    font-size: 0.16rem;
    padding-bottom: 0.07rem;
  }
  .articel-title-fbt{
    font-size: 0.13rem;
    width:70%;
    margin: 0px auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .item-title{
    overflow: hidden;
    padding:8px;
    background:#F7F7F7;
  }
  .point-list{
    margin-top: 0.1rem;
  }
  .item-title p{
    float: left;
    color:#333;
    width:90%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .item-title i{
    float: right;
    color:#999;
    font-size: 18px;
    margin-top: 3px;
  }
  .articel-detail{
    margin:0px 0.1rem;
    overflow: hidden;
    padding:0.1rem 0px;
  }
</style>
