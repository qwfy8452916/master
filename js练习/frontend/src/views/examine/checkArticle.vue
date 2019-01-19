<template>
  <div style="padding:30px;">
    <div class="module-header">
      <div class="top">
        <span class="caption">文章审核</span>
      </div>
      <div class=" article-detail">
        <el-form ref="form" :model="itemData" label-width="100px">
          <el-form-item label="标题:">
            <span>{{ itemData.name }}</span>
          </el-form-item>
          <el-form-item label="文章分类:">
            <el-checkbox checked>{{ itemData.region }}</el-checkbox>
          </el-form-item>
          <el-form-item label="摘要:">
            <span>{{ itemData.abstract }}</span>
          </el-form-item>
          <el-form-item label="图片:">
            <ul class="imgList">
              <!--<li
                v-for="(item,index) in itemData.images"
                ><img :src="item.img" alt=""></li>-->
              <li><img src="@/assets/404_images/404.png" alt=""></li>
            </ul>
          </el-form-item>
          <el-form-item label="正文:">
            <span>{{ itemData.article }}</span>
          </el-form-item>
          <el-form-item label="标签:">
            <el-tag>简约</el-tag>
            <el-tag>现代</el-tag>
            <el-tag>时尚</el-tag>
          </el-form-item>
          <el-form-item label="账号(手机号):">
            <span>{{ itemData.tel }}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">审核通过</el-button>
            <el-button>审核不通过</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemData: {
        name: '国庆优惠购',
        region: '装修心得',
        abstract: '中心思想',
        article: '测试测试测试测试测试测试测试测试测试',
        images: [{ img: '/assets/404_images/404.png' }, { img: '/assets/404_images/404.png' }, { img: '/assets/404_images/404.png' }, { img: '/assets/404_images/404.png' }],
        tel: '13562358596'
      }
    }
  },
  created() {
    console.log(this.$route.query.articleId)
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .article-detail {
    padding: 30px;
    border-bottom: 1px solid #ccc;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  .imgList{
    list-style:none;
    width: 650px;
    margin-left: -40px;
    li{
      width: 180px;
      height: 180px;
      border: 1px solid #333;
      margin: 0 10px 10px 0;
      float: left;
      padding: 10px ;
      img{
        width: 100%;
        height:100%;
      }
    }
  }

</style>
