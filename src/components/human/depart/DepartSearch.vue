<template>
  <t-input-group class="group">
    <span class="title">姓名：</span>
    <t-input type="text" class="range" v-model="human.ename" placeholder="请输入您要查询的年龄"/>
  </t-input-group>

  <t-input-group class="group">
    <span class="title">性别：</span>
    <t-select :options="gender" class="range" v-model="human.sex" placeholder="请选择您要查询的性别"></t-select>
  </t-input-group>

  <t-input-group class="group">
    <span class="title">年龄：</span>
    <t-input :style="{ width: '118px' }" v-model="human.qage" />
    <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
    <t-input :style="{ width: '118px' }" v-model="human.hage" />
  </t-input-group>

  <t-input-group class="group">
    <span class="title">电话：</span>
    <t-input type="text" class="range" v-model="human.tel" placeholder="请输入您要查询的年龄"/>
  </t-input-group>

  <t-input-group class="group">
    <span class="title">部门：</span>
    <t-input type="text" class="range" v-model="human.tel" placeholder="请输入您要查询的年龄"/>
  </t-input-group>

  <t-input-group class="group">
    <span class="title">职位：</span>
    <t-input type="text" class="range" v-model="human.tel" placeholder="请输入您要查询的年龄"/>
  </t-input-group>

  <t-input-group class="group">
    <span class="title">出生日期：</span>
    <t-input type="text" class="range" v-model="human.place" placeholder="请输入您要查询的出生地址"/>
  </t-input-group>
  <t-input-group class="group">
    <span class="title">出生地址：</span>
    <t-input type="text" class="range" v-model="human.place" placeholder="请输入您要查询的出生地址"/>
  </t-input-group>

  <t-input-group class="group">
    <span class="title">入职时间：</span>
    <t-date-range-picker class="range" v-model="human.entrytime" mode="month"/>
  </t-input-group>

  <t-input-group class="group">
    <span class="title">离职时间：</span>
    <t-date-range-picker class="range" v-model="human.entrytime" mode="month"/>
  </t-input-group>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const gender = [
  { label: '男', value: '1' },
  { label: '女', value: '0' }
]
const human = ref({
  ename: '',
  sex: '',
  place: '',
  birth: '',
  qage: '',
  hage: '',
  tel: '',
  entrytime: [],
  state: '在职'
})
</script>

<style lang="scss" scoped>
.group{
  margin: 10px;
  .title{
    width: 80px;
    text-align: right;
    line-height: 30px;
  }
  .range{
    width: 250px;
  }
}
.groups{
  margin: 10px;
  .titles{
    width: 6vw;
    line-height: 30px;
    text-align: right;
  }
  .ranges{
    width: 15vw;
  }
}
.btn{
  margin-top: 5px;
  .btn-but{
    margin: 8px;
  }
  .btn-job{

    width: 133px;
    margin: 8px;
  }
}
.page{
  padding: 10px;
}
</style>
