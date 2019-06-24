export const transOption = {
  title: {
    text: '转化情况报表'
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b0} <br/> {a0}: {c0} <br/> {a1}: {c1} <br/> {a2}: {c2} <br/> {a3}: {c3}% <br/> {a4}: {c4}%'
  },
  xAxis: {
    data: null,
    splitLine: false
  },
  legend: {
    data: ['注册量', '借款量', '过件量', '借款转化率', '借款通过率']
  },
  yAxis: [{
    type: 'value',
    scale: true,
    splitLine: {
      show: false
    },
    name: '次数',
    max: function (value) {
      return Math.ceil(value.max / 10) * 10 + 10
    },
    min: 0,
    boundaryGap: [0.2, 0.2]
  },
  {
    type: 'value',
    scale: true,
    name: '转化率',
    axisLabel: {
      formatter: '{value} %'
    },
    max: function (value) {
      let maxValue = Number((value.max).toFixed(0))
      maxValue = Math.ceil(maxValue / 10) * 10
      return maxValue > 100 ? maxValue + 10 : 100;
    },
    min: 0,
    boundaryGap: [0.2, 0.2]
  }
  ],
  series: [{
    name: '注册量',
    type: 'bar',
    itemStyle: {
      normal: {
        color: '#ff6d00'
      }
    },
    data: null
  },
  {
    name: '借款量',
    type: 'bar',
    data: null
  },
  {
    name: '过件量',
    type: 'bar',
    data: null
  },
  {
    name: '借款转化率',
    type: 'line',
    smooth: true,
    yAxisIndex: 1,
    data: null
  },
  {
    name: '借款通过率',
    type: 'line',
    smooth: true,
    yAxisIndex: 1,
    data: null
  }
  ]
}
export const channelOption = {
  title: {
    text: '各渠道用户转化占比',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['侬要贷', '上海丽秀', '快手']
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: '65%',
    center: ['50%', '55%'],
    data: [{
      value: 335,
      name: '侬要贷'
    },
    {
      value: 310,
      name: '上海丽秀'
    },
    {
      value: 234,
      name: '快手'
    }
    ],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
}
export const lineOption = {
  title: {
    text: '业务情况报表'
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b0} <br/> {a0}: {c0} <br/> {a1}: {c1} <br/> {a2}: {c2}%'
  },
  legend: {
    data: ['申请笔数', '授信笔数', '通过率']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: null,
    splitLine: false
  },
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false
      },
      max: function (value) {
        return Math.ceil(value.max / 10) * 10 + 20;
      },
      min: 0,
      name: '笔数',
    },
    {
      type: 'value',
      scale: true,
      axisLabel: {
        formatter: '{value} %'
      },
      max: function (value) {
        let maxValue = Number((value.max).toFixed(0))
        maxValue = Math.ceil(maxValue / 10) * 10 + 10
        return maxValue;
      },
      min: 0,
      name: '通过率',
    }
  ],
  series: [{
    name: '申请笔数',
    type: 'bar',
    smooth: true,
    itemStyle: {
      normal: {
        color: '#ff6d00'
      }
    },
    data: [120, 132, 101, 134, 90, 230, 210]
  },
  {
    name: '授信笔数',
    type: 'bar',
    smooth: true,
    data: [220, 182, 191, 234, 290, 330, 310]
  },
  {
    name: '通过率',
    type: 'line',
    smooth: true,
    yAxisIndex: 1,
    data: [820, 932, 901, 934, 1290, 1330, 1320]
  }
  ]
}
export const barOption = {
  title: {
    text: 'Bar Chart',
    subtext: '数据来自网络'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['2011年', '2012年']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
  },
  series: [{
    name: '2011年',
    type: 'bar',
    data: [18203, 23489, 29034, 104970, 131744, 630230]
  },
  {
    name: '2012年',
    type: 'bar',
    data: [19325, 23438, 31000, 121594, 134141, 681807]
  }
  ]
}