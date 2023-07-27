<template>
  <t-row style="height: 89vh">
    <t-col>
      <h1 >产品档案登记</h1>
      <t-row class="row">
        <t-col :span="10" class="col"><t-input label="登记人：" size="large" disabled/></t-col>
        <t-col :span="5" class="col"><t-input label="产品编号：" size="large" disabled/></t-col>
        <t-col :span="5" class="col"><t-input label="产品名称：" size="large" class="inp"/></t-col>
        <t-col :span="3">
          <t-select size="large" class="sel" placeholder="一级分类"/>
        </t-col>
        <t-col :span="3">
          <t-select size="large" class="sel" placeholder="二级分类"/>
        </t-col>
        <t-col :span="3">
          <t-select size="large" class="sel" placeholder="三级分类"/>
        </t-col>
        <t-col :span="5" class="col"><t-input label="用途类型：" size="large"/></t-col>
        <t-col :span="5" class="col"><t-input label="计量单位：" suffix="m" size="large" class="inp"/></t-col>
        <t-col :span="5" class="col"><t-input label="供应商集合：" size="large"/></t-col>
        <t-col :span="5" class="col"><t-input label="审核标志" value="S001-0" disabled size="large" class="inp"/></t-col>
        <t-col :span="5" class="col"><t-input label="成本单价：" suffix="元" size="large"/></t-col>
        <t-col :span="5" class="col"><t-input label="市场单价：" suffix="元" size="large" class="inp"/></t-col>
        <t-col :span="10" class="col">
          <t-textarea placeholder="产品描述" size="large"/>
        </t-col>
        <t-col :span="4" :offset="1">
          <t-button block theme="primary">登记档案</t-button>
        </t-col>
        <t-col :span="4">
          <t-button block theme="warning">重置</t-button>
        </t-col>
      </t-row>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
h1{
  font-size: 40px;
  color: #007CF5;
  margin: 20px 20px 20px 8px;
}
.row{
  .col{
    margin: 10px;
    .inp{
      width: 545px;
    }
  }
  .sel{
    margin: 10px;
    width: 450px;
  }
}
</style>
