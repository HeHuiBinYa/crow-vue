<template>
  <t-col :span="12">
    <t-row>
      <t-col :span="2">
        <h4>当前：{{indicator}}</h4>
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
import {ref} from "vue";

const indicator = ref("工序物流设计")
const tree =  [
  {
    label: '生产计划设计',
  },
  {
    label: '生产计划管理',
  }
];

const che = (value: any) => {
  indicator.value = value.node.data.label
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
