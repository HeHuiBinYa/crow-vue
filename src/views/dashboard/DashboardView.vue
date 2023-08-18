<template>
 <t-col :span="12">
   <t-row>
     <t-col id="department" :span="6">

     </t-col>
     <t-col id="position" :span="6">

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
</script>

<style scoped>
#department,#position{
  height: 30vh;
}
#dec{
  height: 40vh;
}
</style>
