<template>
  <t-col :span="12" style="height: 89vh">
    <t-row>
      <t-col :span="12">
        <h1 style="color: #007cf5">员工入职登记</h1>
        <t-divider />
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">编号：</span>
          <t-input type="text" class="range" placeholder="请生成编号"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">姓名：</span>
          <t-input type="text" class="range" placeholder="请输入姓名"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">性别：</span>
          <t-input type="text" class="range" placeholder="请输入性别"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">日期：</span>
          <t-input type="text" class="range" placeholder="请输入日期"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">年龄：</span>
          <t-input type="text" class="range" placeholder="请输入年龄"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">电话：</span>
          <t-input type="text" class="range" placeholder="请输入电话"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">出生日期：</span>
          <t-input type="text" class="range" placeholder="请输入出生日期"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">出生地址：</span>
          <t-input type="text" class="range" placeholder="请输入出生地址"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">分配部门：</span>
          <t-input type="text" class="range" placeholder="请选择分配部门"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">分配职位：</span>
          <t-input type="text" class="range" placeholder="请输入分配职位"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">省份证号码：</span>
          <t-input type="text" class="range" placeholder="请输入姓名"/>
        </t-input-group>
      </t-col>

      <t-col :span="2">
        <t-button class="btn" block>入职</t-button>
        <t-button class="btn" block>重置</t-button>
      </t-col>
    </t-row>
  </t-col>
</template>

<script lang="ts" setup>

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
  margin: 10px 10px 10px 200px;
}
</style>
