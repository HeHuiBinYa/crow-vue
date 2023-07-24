<template>
  <t-col :span="12">
    <t-row>
      <t-col :span="2">
        <t-tree hover :data="tree" :expand-level="1" :line="true" v-on:click="che"/>
      </t-col>

      <t-col :span="10">
        <router-view></router-view>
      </t-col>
    </t-row>
  </t-col>
</template>

<script lang="ts" setup>
import router from "@/router";

const tree =  [
  {
    label: '员工信息',
    children: [
      {
        label: '员工入职登记',
      },
      {
        label: '员工信息管理',
      },
      {
        label: '离职员工查看',
      }
    ],
  },
  {
    label: '部门信息',
    children: [
      {
        label: '部门信息管理',
      }
    ],
  },
  {
    label: '职位信息',
    children: [
      {
        label: '职位信息管理',
      }
    ],
  },
];

const che = (value: any) => {
  const rou =  router.getRoutes()
  for (let i=0;i<rou.length;i++){
    if (rou[i].name === value.node.data.label){
      router.push(rou[i].path)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
