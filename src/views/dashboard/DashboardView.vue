<template>
 <t-col :span="12">
   <t-row>
     <t-col id="department" :span="6">

     </t-col>
     <t-col id="position" :span="6">

     </t-col>
     <t-col id="heroA" :span="6">

     </t-col>
     <t-col id="heroB" :span="6">

     </t-col>
   </t-row>
 </t-col>
</template>

<script lang="ts" setup>
import * as  echarts from "echarts"
import {onMounted} from "vue"
import {columnarPosition} from "@/http/staff/position";
import {columnarDepartment} from "@/http/staff/department";
import {userStore} from "@/store/user";



if (userStore().user.tok != ""){
  // eslint-disable-next-line no-undef
  onMounted(async () => {
    setTimeout(() => {department()}, 1000)
    setTimeout(() => {position()}, 1000)
    setTimeout(() => {heroA()}, 1000)
    setTimeout(() => {heroB()}, 1000)
  })
}

const department = () => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("department"));

  // 指定图表的配置项和数据
  let option_department;

  columnarDepartment().then(item => {
    option_department = {
      title: {
        text: '部门人数统计'
      },
      tooltip: {},
      legend: {
        data: ['部门人数']
      },
      xAxis: {
        data: item.data.nameList
      },
      yAxis: {},
      series: [
        {
          name: '部门人数',
          type: 'bar',
          data: item.data.countList,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.resize();
    myChart.setOption(option_department);
  })


}

const position = () => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("position"));

  // 指定图表的配置项和数据
  let option_position;

  columnarPosition().then(item => {
    option_position = {
      title: {
        text: '职位人数统计'
      },
      tooltip: {},
      legend: {
        data: ['职位人数']
      },
      xAxis: {
        data: item.data.nameList
      },
      yAxis: {},
      series: [
        {
          name: '职位人数',
          type: 'bar',
          data: item.data.countList,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.resize();
    myChart.setOption(option_position);
  })
}

const heroA = () => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("heroA"));

  // 指定图表的配置项和数据
  let option_heroA;

  option_heroA = {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 66, name: 'rose 8' }
        ]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.resize();
  myChart.setOption(option_heroA);

}

const heroB = () => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("heroB"));

  // 指定图表的配置项和数据
  let option_heroB;

  option_heroB = {
    dataset: [
      {
        dimensions: ['name', 'age', 'profession', 'score', 'date'],
        source: [
          ['Hannah Krause', 41, 'Engineer', 314, '2011-02-12'],
          ['Zhao Qian', 20, 'Teacher', 351, '2011-03-01'],
          ['Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
          ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
          ['Karle Neumann', 25, 'Engineer', 253, '2011-04-02'],
          ['Adrian Groß', 19, 'Teacher', 666, '2011-01-16'],
          ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
          ['Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
          ['Han Meimei', 67, 'Engineer', 366, '2011-03-12']
        ]
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' }
        }
      }
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1
    }
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.resize();
  myChart.setOption(option_heroB);

}
</script>

<style scoped>
#department,#position{
  height: 30vh;
}
#heroA,#heroB{
  height: 59vh;
}
</style>
