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
    <el-dialog
      :title="branchName"
      :visible.sync="chartVisible"
      width="50%"
      @open="open"
      class="dialog align-left"
    >
      <div id="myChart2" :style="{width: '100%', height: '600px'}"></div>
      <div class="dataBox dataBox1" style="width:100%">
        <div class="dataLeft">
          <p>已确认结算单金额</p>
          <p class="money">{{payTotal}}</p>
        </div>
        <div class="dataRight">
          <p>已开票总金额</p>
          <p class="money">{{deliveTotal}}</p>
        </div>
      </div>
    </el-dialog>
    <div class="dataBox">
      <div class="dataLeft">
        <p>已确认结算单金额</p>
        <p class="money">{{totalconfirmPayMoney}}万元</p>
      </div>
      <div class="dataRight">
        <p>已开票总金额</p>
        <p class="money">{{totalconfirmDelivMoney}}万元</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      chartVisible: false,
      list: [],
      totalconfirmDelivMoney: "",
      totalconfirmPayMoney: "",
      company: "",
      confirmDelivMoney: [],
      confirmPayMoney: [],
      userDeliveTotal: [],
      userPayTotal: [],
      userName:'',
      dialogList:[],
      payTotal:0,
      deliveTotal:0,
      branchName:''
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.index) {
        case "1":
          this.$router.push({ name: "purchasedata" });
          break;
        case "2":
          this.$router.push({ name: "supplydata" });
          break;
      }
    },
    // 弹框出现调用open事件
    open() {
      this.$nextTick(() => {
        this.dialogLine();
      });
    },
    drawLine() {
      var company;
      let that = this;
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      this.$api
        .dataStatistics()
        .then(res => {
          const result = res.data;
          if (result.code == "0") {
            this.list = result.data;
            company = this.list.map(item => {
              return item.userName;
            });
            let delivesum = 0;
            let paysum = 0;
            let deliveArr = [];
            let payArr = [];
            this.list.map((item, index) => {
              let userDelivesum = 0;
              let userPaysum = 0;
              item.userOrders.map(delivitem => {
                delivesum += delivitem.confirmDelivMoney;
                paysum += delivitem.confirmPayMoney;
                userDelivesum += delivitem.confirmDelivMoney;
                userPaysum += delivitem.confirmPayMoney;
              });
              deliveArr[index] = userDelivesum;
              payArr[index] = userPaysum;
            });
            //返回
            this.totalconfirmDelivMoney = delivesum;
            this.totalconfirmPayMoney = paysum;
            this.userDeliveTotal = deliveArr;
            this.userPayTotal = payArr;
            myChart.setOption(option);
            myChart.setOption({
              xAxis: {
                data: company
              },
              series: [
                {
                  name: "已确认结算单金额",
                  data: this.userPayTotal,
                },
                 {
                  name: "已开票金额",
                  data: this.userDeliveTotal,
                },

              ]
            });
          }
        })
        .catch(err => {});
      myChart.on("click", function(param) {
        that.chartVisible = true;
        that.userName = param.name;
        that.branchName = that.userName + '分公司';
        that.open();       
      });
      // 基于准备好的dom，初始化echarts实例
      var posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight"
      ];

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right"
          }
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom"
          }
        },
        position: {
          options: this.$echarts.util.reduce(
            posList,
            function(map, pos) {
              map[pos] = pos;
              return map;
            },
            {}
          )
        },
        distance: {
          min: 0,
          max: 100
        }
      };

      app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 10,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          };
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          });
        }
      };

      var labelOption = {
        normal: {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          formatter: "{c}  {name|{a}}",
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: "#fff"
            }
          }
        }
      };

      var option = {
        color: ["#0066CC", "#BBDBF8"],
        grid: {
          left: "6%",
          top: "60",
          right: "110",
          bottom: "40"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          }
        },
        legend: {
          data: ["已确认结算单金额", "已开票金额"],
          orient: "horizontal",
          x: "right",
          y: "top"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
              inside: true
            },
            data: company,
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
            name: "(万元)",
            min: 0,
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
            name: "已确认结算单金额",
            type: "bar",
            barGap: 0,
            label: labelOption,
            barWidth: 20,
            data: [100, 200]
          },
          {
            name: "已开票金额",
            type: "bar",
            label: labelOption,
            barWidth: 20,
            data: [300,400]
          }
        ]
      };
    },
    dialogLine() {
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
        this.$api
        .dataStatistics()
        .then(res => {
          const result = res.data;
          if (result.code == "0") {
          this.dialogList = result.data;
          let projectName = []; 
          let payArr = [];
          let deliveArr = [];
          let paysum = 0;
          let delivesum = 0;
           this.dialogList.map((item,index)=>{              
                if(item.userName == this.userName){
                  item.userOrders.map(orderItem=>{
                    projectName.push(orderItem.projectName);
                    payArr.push(orderItem.confirmPayMoney);
                    deliveArr.push(orderItem.confirmDelivMoney); 
                    paysum += orderItem.confirmPayMoney;
                    delivesum += orderItem.confirmDelivMoney;                  
                  })
                }                   
            }) 
            this.payTotal = paysum;
            this.deliveTotal = delivesum;  
            myChart2.setOption(option);
            myChart2.setOption({
              xAxis: {
                data: projectName
              },
              series: [
                {
                  name: "已确认结算单金额",
                  data: payArr
                },
                 {
                  name: "已开票金额",
                  data: deliveArr
                },

              ]
            });
          }
        })
        .catch(err => {});
      // 基于准备好的dom，初始化echarts实例
      var posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight"
      ];

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right"
          }
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom"
          }
        },
        position: {
          options: this.$echarts.util.reduce(
            posList,
            function(map, pos) {
              map[pos] = pos;
              return map;
            },
            {}
          )
        },
        distance: {
          min: 0,
          max: 100
        }
      };

      app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 10,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          };
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          });
        }
      };

      var labelOption = {
        normal: {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          formatter: "{c}  {name|{a}}",
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: "#fff"
            }
          }
        }
      };

      var option = {
        color: ["#0066CC", "#BBDBF8"],
        grid: {
          left: "10%",
          top: "60",
          right: "110",
          bottom: "40"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          }
        },
        legend: {
          data: ["已确认结算单金额", "已开票金额"],
          orient: "horizontal",
          x: "right",
          y: "top"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
              inside: true
            },
            data: ["2012", "2013", "2014", "2015", "2016"],
            name: "(项目)",
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
            name: "(万元)",
            min: 0,
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
            name: "已确认结算单金额",
            type: "bar",
            barGap: 0,
            label: labelOption,
            barWidth: 20,
            data: [6, 8, 12, 10, 16]
          },
          {
            name: "已开票金额",
            type: "bar",
            label: labelOption,
            barWidth: 20,
            data: [8, 10, 6, 16, 18]
          }
        ]
      };
     
    }
  }
};
</script>
<style lang="less">
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
  .dataBox1 {
    padding: 15px 0;
    box-sizing: border-box;
    text-align: center;
  }
  .dialog {
    padding: 20px;
    box-sizing: border-box;
  }
  .el-dialog__title {
    color: #0066cc;
    font-weight: bold;
    font-size: 20px;
  }
}
</style>