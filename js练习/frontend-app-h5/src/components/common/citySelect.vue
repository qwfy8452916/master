<template>
  <section >
    <div :class="isHide?'m-picker-box':'m-picker-box open-picker'">
      <div class="m-picker-tool">
        <span class="m-picker-cancel" @click="cancel">取消</span>
        <span class="m-picker-ok" @click="okBtn">确定</span>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange" value-key="name"></mt-picker>
    </div>
  </section>
</template>
<script>
export default {
  name: 'citySelect',
  data () {
    return {
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'right'
        },
        {
          divider: true,
          content: '-',
          className: 'slot2'
        },
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'left'
        }
      ],
      isHide: true,
      value: ''
    }
  },
  mounted () {
  },
  methods: {
    okBtn () {
      this.isHide = true
      this.$emit('getCityVlaue', this.value)
    },
    cancel () {
      this.isHide = true
    },
    openPicker () {
      this.isHide = false
    },
    onValuesChange (picker, value) {
      this.value = value
    }
  }
}
</script>
<style scoped>
  .m-picker-box{
    position: fixed;
    left:0px;
    bottom:-250px;
    width:100%;
    background:rgba(255,255,255,0.9);
    transition:all 0.5s;
    -webkit-transition:all 0.5s; /* Safari */
  }
  .m-picker-tool{
    padding:10px 18px;
    border-bottom:1px solid #dedede;
    overflow:hidden;
    color:#FF5353;
  }
  .m-picker-cancel{
    float:left;
  }
  .m-picker-ok{
    float:right;
  }
  .open-picker{
    bottom:0px;
  }
</style>
