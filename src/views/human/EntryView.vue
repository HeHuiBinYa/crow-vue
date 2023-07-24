<template>
  <t-col :span="12" style="height: 89vh">
    <t-row>
      <t-col :span="12">
        <h1>员工入职登记</h1>
        <t-divider />
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">姓名：</span>
          <t-input type="text" class="range" placeholder="请输入您要查询的年龄"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">性别：</span>
          <t-input type="text" class="range" placeholder="请输入您要查询的年龄"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">日期：</span>
          <t-input type="text" class="range" placeholder="请输入您要查询的年龄"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">年龄：</span>
          <t-input type="text" class="range" placeholder="请输入您要查询的年龄"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">电话：</span>
          <t-input type="text" class="range" placeholder="请输入您要查询的年龄"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">出生地址：</span>
          <t-input type="text" class="range" placeholder="请输入您要查询的年龄"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">分配部门：</span>
          <t-input type="text" class="range" placeholder="请输入您要查询的年龄"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">分配职位：</span>
          <t-input type="text" class="range" placeholder="请输入您要查询的年龄"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">省份证号码：</span>
          <t-input type="text" class="range" placeholder="请输入您要查询的年龄"/>
        </t-input-group>
      </t-col>

      <t-col :span="2">
        <t-button class="btn" block>录入</t-button>
        <t-button class="btn" block>重置</t-button>
      </t-col>
    </t-row>
  </t-col>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const file = ref()
</script>

<style lang="scss" scoped>
.group{
  margin: 10px;
  .title{
    width: 6vw;
    line-height: 30px;
    text-align: right;
  }
  .range{
    width: 20vw;
  }
}
.btn{
  margin: 10px 10px 10px 180px;
}
</style>
