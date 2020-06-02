<template>
  <div class="mainBox">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick" style="width:50%">
        <el-tab-pane label="票据及确认票据" name="first"></el-tab-pane>
        <el-tab-pane label="项目采购数据" name="second"></el-tab-pane>
        <el-tab-pane label="供货情况数据" name="third"></el-tab-pane>
      </el-tabs>
    </template>
    <div id="myChart" :style="{width: '1500px', height: '600px'}"></div>
    <div class="dataBox">
      <div class="dataLeft">
        <p>分公司个数</p>
        <p class="money">{{length}}个</p>
      </div>
      <div class="dataRight">
        <p>提交项目总数</p>
        <p class="money">{{projectLength}}个</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      company: "",
      length: "",
      projectLength: 0,
      payArrLength: "",
      deliveArrLength: "",
      orderlength: "",
      projectNum: []
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.index) {
        case "0":
          this.$router.push({ name: "billdata" });
          break;
        case "1":
          this.$router.push({ name: "purchasedata" });
          break;
        case "2":
          this.$router.push({ name: "supplydata" });
          break;
      }
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.showLoading({
        text: "loading",
        color: "#4cbbff",
        textColor: "#4cbbff",
        maskColor: "rgba(0, 0, 0, 0.9"
      });
      // 基于准备好的dom，初始化echarts实例
      var option = {
        color: ["#0066CC"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "1%",
          right: "100",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          data: ["提交项目个数"],
          orient: "horizontal",
          x: "right",
          y: "top"
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
              inside: true
            },
            data: "苏州",
            name: "(分公司)",
            axisLine: {
              lineStyle: {
                color: "#0066CC"
              }
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                //改变刻度字体样式
                color: "#0066CC",
                fontSize: 20
              }
            },
            nameTextStyle: {
              color: "#999",
              fontSize: 18
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              alignWithLabel: true,
              inside: true
            },
            min: 0,
            name: "(项目个数)",
            axisLine: {
              lineStyle: {
                color: "#0066CC"
              }
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                //改变刻度字体样式
                color: "#333",
                fontSize: 20
              }
            },
            nameTextStyle: {
              color: "#999",
              fontSize: 18
            }
          }
        ],
        series: [
          {
            name: "提交项目个数",
            type: "bar",
            barWidth: "3%",
            data: [10, 16, 18, 14, 10, 12, 16]
          }
        ]
      };
      this.$api
        .dataStatistics()
        .then(res => {
          const result = res.data;
          if (result.code == "0") {
            myChart.hideLoading();
            this.list = result.data;
            this.length = result.data.length;
            this.company = this.list.map(item => {
              return item.userName;
            });
            let projectArr = [];
            this.list.map((item, index) => {
              projectArr[index] = item.userOrders.length;
            });
            this.projectNum = projectArr;
            for (let i = 0; i < this.list.length; i++) {
              this.projectLength += this.list[i].userOrders.length;
            }
            myChart.setOption(option);
            myChart.setOption({
              xAxis: {
                data: this.company
              },
              series: [
                {
                  name: "项目提交个数",
                  data: this.projectNum
                }
              ]
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
.mainBox {
  .dataBox {
    width: 89%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 40px 0;
    box-sizing: border-box;
    margin-top: 20px;
    .dataLeft {
      width: 50%;
      float: left;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      p {
        font-size: 14px;
        color: #333;
      }
      .money {
        font-size: 18px;
        color: #0066cc;
        font-weight: bold;
      }
    }
    .dataRight {
      p {
        font-size: 14px;
        color: #333;
      }
      .money {
        font-size: 18px;
        color: #0066cc;
        font-weight: bold;
      }
    }
  }
}
</style>