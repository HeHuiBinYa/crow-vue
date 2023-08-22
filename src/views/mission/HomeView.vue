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
import {userStore} from "@/store/user";

const indicator = ref("入库申请提交")
const tree =  [
  {
    label: '入库申请提交',
  },
];

if (userStore().user.role.role == '生产管理员' || userStore().user.role.role == '系统管理员'){
  tree.push({
    label: '生产计划完工存档',
  },{
    label: '生产计划设计复核',
  },)
}
if (userStore().user.role.role == '产品设计管理员' || userStore().user.role.role == '系统管理员'){
  tree.push(
      {
        label: '产品设计档案复核',
      })
}
if (userStore().user.role.role == '库存管理员' || userStore().user.role.role == '系统管理员'){
  tree.push(
      {
        label: '入库申请复核',
      },)
}

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
