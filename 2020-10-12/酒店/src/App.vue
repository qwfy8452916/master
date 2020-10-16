<template>
  <div id="app">
    <router-view />
    <audio class="success" ref="audio" loop="loop" :src="url"></audio>
  </div>
</template>

<script>
var timor = {};

import tipsVoice from "../static/tips.mp3";
export default {
  name: "App",
  data() {
    return {
      url: "static/tips.mp3",
      orderCountData: {},
      allOrderCountFlag: false,
      toDealOrderCountFlag: false,
      toLiveOrderCountFlag: false,
      todayLiveOrderCountFlag: false,
      todayOrderCountFlag: false,
      hotelId: "",
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false, //是否自动播放
        muted: false, //是否静音
        speed: 1,
        waiting: true,
        preload: "auto",
      },
    };
  },
  watch: {
    "$store.getters.getToDealOrderCount": {
      handler: function (newName, oldName) {
        // console.log("new:" + newName, "old:" + oldName);
        if (
          Number(newName) > Number(oldName) &&
          newName != "" &&
          newName != undefined &&
          oldName != undefined &&
          oldName != ""
        ) {
          this.toDealOrderCountFlag = true;
          this.init();
        } else {
          this.toDealOrderCountFlag = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    let that = this;
    setTimeout(() => {
      that.hotelId = localStorage.getItem("hotelId");
      if (that.hotelId) {
        that.bookOrderCount();
        that.timor = setInterval(() => {
          that.bookOrderCount();
        }, 60000);
      }
    }, 15000);
    // if (window.Notification) {
    //   if (Notification.permission === "granted") {
    //     console.log("消息提示已打开");
    //   } else if (Notification.permission !== "denied") {
    //     Notification.requestPermission().then(function (permission) {
    //       if (permission === "granted") {
    //         console.log("消息提示已打开");
    //       } else if (permission === "default") {
    //         console.log("用户关闭授权 未刷新页面之前 可以再次请求授权！");
    //       } else {
    //         console.log("用户拒绝授权 不能显示通知！");
    //       }
    //     });
    //   } else {
    //     console.log("不支持消息通知！");
    //   }
    // } else {
    //   console.log("你的浏览器不支持此消息提示功能，请使用chrome内核的浏览器！");
    // }
  },
  methods: {
    bookOrderCount() {
      if (localStorage.getItem("hotelId")) {
        let params = {
          hotelId: localStorage.getItem("hotelId"),
        };
        // console.log(params.hotelId, "app");

        this.$api
          .bookOrderCount(params)
          .then((response) => {
            const result = response.data;
            // this.orderCountData.toDealOrderCount
            if (result.code == "0") {
              this.orderCountData = result.data;
              this.$store.commit(
                "setAllOrderCount",
                this.orderCountData.allOrderCount
              );
              this.$store.commit(
                "setToDealOrderCount",
                this.orderCountData.toDealOrderCount
              );
              this.$store.commit(
                "setToLiveOrderCount",
                this.orderCountData.toLiveOrderCount
              );
              this.$store.commit(
                "setTodayLiveOrderCount",
                this.orderCountData.todayLiveOrderCount
              );
              this.$store.commit(
                "setTodayOrderCount",
                this.orderCountData.todayOrderCount
              );
            } else {
              this.$message.error(result.msg);
            }
          })
          .catch((error) => {
            this.$alert(error, "警告", {
              confirmButtonText: "确定",
            });
          });
      }
    },
    sendMessage() {
      let that = this;
      if (that.toDealOrderCountFlag) {
        this.notify.setURL(tipsVoice); // 设置一个
        // .setTitle("有新消息了！")
        // .setFavicon(this.orderCountData.allOrderCount);
        // notify.setURL(tipsVoice);
        // notify.player();
        // notify.setTitle("有新消息了！");
        // notify.setFavicon(this.orderCountData.allOrderCount);
        let num = this.orderCountData.toDealOrderCount;
        if (num === 0) {
          this.notify.faviconClear();
          this.notify.setTitle();
        } else if (num < 100) {
          this.notify.setFavicon(num);
          this.notify.setTitle("您有一条新的未处理订单！");
        } else if (num > 99) {
          this.notify.setFavicon("..");
          this.notify.setTitle("您有一条新的未处理订单！");
        }
        this.notify.notify({
          effect: "scroll", // flash | scroll 闪烁还是滚动
          // 标题闪烁，或者滚动速度
          interval: 1000,
          notification: {
            title: "通知！", // 设置标题
            icon: "", // 设置图标 icon 默认为 Favicon
            body: "您有一条新的未处理订单！", // 设置消息内容
          },
          onclick: () => {
            // 点击弹出的窗执行事件
            this.$router.push({ name: "HotelBookOrderList" });
            this.notify.faviconClear();
            this.notify.setTitle();
          },
          onshow: function () {
            //当通知显示的时候被触发。
            // console.log("on show");
          },
          onerror: function () {
            //每当通知遇到错误时被触发。
            // console.log("on error");
          },
          onclose: function () {
            //当用户关闭通知时被触发。
            // console.log("on close");
          },
        });
      }
      this.toDealOrderCountFlag = false;
    },
    toOrderList() {
      this.$router.push({ name: "HotelBookOrderList" });
      this.notify.faviconClear();
      this.notify.setTitle();
      this.$notify.close();
    },
    init1() {
      let that = this;
      if (window.Notification) {
        if (Notification.permission === "granted") {
          that.sendMessage();
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
              that.sendMessage();
            } else if (permission === "default") {
              console.log("用户关闭授权 未刷新页面之前 可以再次请求授权！");
            } else {
              console.log("用户拒绝授权 不能显示通知！");
            }
          });
        } else {
          if (that.toDealOrderCountFlag) {
            const h = that.$createElement;
            that.$notify.info({
              title: "系统消息",
              message: h("p", null, [
                h("p", null, "您有一条新的未处理订单！"),
                h(
                  "p",
                  {
                    style:
                      "text-align:right;dispaly:block;margin-top:8px;color:#43c39d;cursor:pointer;width:250px;",
                    on: {
                      click: that.toOrderList,
                    },
                  },
                  "请点击查看"
                ),
              ]),
            });
            that.sendMessage();
            if (that.$refs.audio !== null) {
              if (that.$refs.audio.paused) {
                that.$refs.audio.play();
              }
              if (that.$refs.audio.ended) {
                that.$refs.audio.load();
              }
              setTimeout(function () {
                if (that.$refs.audio.played) {
                  that.$refs.audio.pause();
                }
              }, 10000);
            }
            that.toDealOrderCountFlag = false;
          }
          console.log("不支持消息通知！");
        }
      } else {
        console.log(
          "你的浏览器不支持此消息提示功能，请使用chrome内核的浏览器！"
        );
      }
    },
    init() {
      let that = this;
      if (that.toDealOrderCountFlag) {
        const h = that.$createElement;
        that.$notify.info({
          title: "系统消息",
          message: h("p", null, [
            h("p", null, "您有一条新的未处理订单！"),
            h(
              "p",
              {
                style:
                  "text-align:right;dispaly:block;margin-top:8px;color:#43c39d;cursor:pointer;width:250px;",
                on: {
                  click: that.toOrderList,
                },
              },
              "请点击查看"
            ),
          ]),
        });
        that.sendMessage();
        if (that.$refs.audio.paused) {
          that.$refs.audio.play();
        }
        if (that.$refs.audio.ended) {
          that.$refs.audio.load();
        }
        setTimeout(function () {
          if (that.$refs.audio.played) {
            that.$refs.audio.pause();
          }
        }, 10000);
        that.toDealOrderCountFlag = false;
      }
    },
  },
  beforeDestroy() {
    clearInterval(timor);
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.changebox .el-dialog {
  width: 500px;
}
/* 用户管理模态框最小宽度为1000px */
.userMangeDialog .el-dialog {
  /* max-width: 1000px !important; */
  min-width: 1000px !important;
}
.userMangeDialog .el-dialog__header {
  text-align: left;
}
/* panel的宽度由260变为42% */
.userMangeDialog .el-dialog__body .el-transfer .el-transfer-panel {
  text-align: left;
  width: 380px !important;
  height: 413px !important;
}
.userMangeDialog .el-transfer-panel__body {
  height: 356px !important;
}
/* 新加弹性布局，以免里面的项出现在一行 */
.userMangeDialog .el-transfer-panel__list.is-filterable {
  height: 304px !important;
  display: flex;
  flex-direction: column;
}
.userMangeDialog .el-form--inline .el-form-item {
  margin-left: 15px;
}
</style>
