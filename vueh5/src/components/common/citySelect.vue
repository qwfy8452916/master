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
import { getCity } from '@/api/api'
import BMap from 'BMap'
export default {
  name: 'citySelect',
  data () {
    return {
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'right',
          defaultIndex: 0
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
          textAlign: 'center',
          defaultIndex: 0
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
          textAlign: 'left',
          defaultIndex: 0
        }
      ],
      oldPro: '',
      oldCity: '',
      oldArea: '',
      isHide: true,
      value: '',
      address: {
        province: '江苏省',
        city: '苏州'
      }
    }
  },
  mounted () {
    let that = this
    if (sessionStorage.cityData) {
      that.initCityData(JSON.parse(sessionStorage.cityData))
    } else {
      getCity().then((res) => {
        if (res.data.error_code === 0) {
          that.initCityData(res.data.data)
          sessionStorage.cityData = JSON.stringify(res.data.data)
        }
      })
    }
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
    initCityData (data) {
      let that = this
      let initAddress = null
      if (BMap) {
        let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (cityRes) {
          initAddress = cityRes.address.province ? cityRes : {address: that.address}
          that.setInitAddress(data, initAddress)
        })
      } else {
        initAddress = {address: that.address}
        that.setInitAddress(data, initAddress)
      }
    },
    setInitAddress (data, cityRes) {
      let that = this
      let province = []
      let lastInfo = []
      let proIndex = 0
      for (let i in data) {
        if (data[i].child.length === 0) {
          delete data[i]
        } else {
          province.push(data[i]) // 将对象转数组
          that.oldPro = cityRes.address.province
          that.oldCity = cityRes.address.city
          if (data[i].name === cityRes.address.province) {
            let provInfo = {
              id: data[i].id,
              name: data[i].name
            }
            proIndex = province.length - 1 // 初始化省默认序号
            lastInfo.push(provInfo)
            for (let k = 0; k < data[i].child.length; k++) {
              if (cityRes.address.city.indexOf(data[i].child[k].name) !== -1) {
                let cityInfo = {
                  name: data[i].child[k].name,
                  id: data[i].child[k].id
                }
                let areaInfo = {
                  id: data[i].child[k].child[0].id,
                  name: data[i].child[k].child[0].name
                }
                that.slots[2].values = data[i].child
                that.slots[2].defaultIndex = k
                that.slots[4].values = data[i].child[k].child
                that.slots[4].defaultIndex = 0
                that.oldArea = data[i].child[k].child[0].name
                lastInfo.push(cityInfo)
                lastInfo.push(areaInfo)
                that.$emit('getCityVlaue', lastInfo)
              }
            }
          }
        }
      }
      that.slots[0].values = province
      that.slots[0].defaultIndex = proIndex
    },
    onValuesChange (picker, value) {
      if (!value[2]) {
        return false
      }
      let that = this
      let proName = value[0].name
      let cityName = value[1].name
      let areaName = value[2].name
      if (proName !== that.oldPro) { // 省变
        picker.setSlotValues(1, value[0].child)
        that.oldPro = proName
      }
      if (cityName !== that.oldCity) { // 市变
        picker.setSlotValues(2, value[1].child)
        that.oldCity = cityName
      }
      if (areaName !== that.oldArea) { // 区变
        picker.setSlotValues(3, value[2].child)
        that.oldArea = areaName
      }
      let lastInfo = [
        {
          id: value[0].id,
          name: value[0].name
        },
        {
          id: value[1].id,
          name: value[1].name
        },
        {
          id: value[2].id,
          name: value[2].name
        }
      ]
      that.value = lastInfo
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
