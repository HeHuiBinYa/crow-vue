<template>
  <t-col :span="12">
    <t-row>
      <t-col :span="12">
        <t-row class="row">
          <t-col :span="12">
            <h3>待审核产品档案：12/30</h3>
          </t-col>
          <t-col :span="12" class="col"><t-input label="设计单编号：" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="产品名称：" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="设计人：" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="审核人：" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="审核时间：" size="large" disabled/></t-col>
          <t-col :span="12" class="col">
            <t-textarea placeholder="产品描述" size="large" disabled/>
          </t-col>
          <t-col :span="12">
            <t-input label="物料总成本：" size="large" disabled/>
          </t-col>
          <t-col :span="12">
            <t-list >
              <t-table v-model:columns="columns" v-model:data="data" v-on:row-dblclick="dblclick" :hover="true"/>
            </t-list>
          </t-col>
        </t-row>
      </t-col>

      <t-col :span="12">
        <t-radio-group default-value="1" @change="onChange" class="group">
          <p><t-radio value="S001-1">审核通过</t-radio></p>
          <p><t-radio value="S001-2">审核不通过</t-radio></p>
        </t-radio-group>
        <t-textarea placeholder="建议" size="large"/>
      </t-col>

      <t-col :span="12">
        <t-row style="margin: 20px">
          <t-col :span="2">
            <t-button style="width: 100%">上一项</t-button>
          </t-col>
          <t-col :span="3"></t-col>
          <t-col :span="2">
            <t-button style="width: 100%">确认提交</t-button>
          </t-col>
          <t-col :span="3"></t-col>
          <t-col :span="2">
            <t-button style="width: 100%">下一项</t-button>
          </t-col>
        </t-row>
      </t-col>
    </t-row>
  </t-col>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const header = ref("修改信息")
const visible = ref(false)
const data = []
for (let i = 1; i <= 6; i++) {
  data.push({
    mid: i,
    design: 'AD100001AD1001'+i,
    designname: 'XXX产品'+i,
    type: 'XX',
    describer: 'ADAWD'+i*10,
    amount: i*10,
    munit: i*100,
    price: i*200,
    pricesum:(i*200)*(i*10)
  });
}

const leftFixedColumn = ref(2);
const columns = ref([
  { colKey: 'mid', title: '序号',align: 'center',width: '80px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'design', title: '物料编号',align: 'center',width: '250px' ,fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'designname', title: '物料名称',align: 'center',width: '120px'},
  { colKey: 'type', title: '用途类型',align: 'center',width: '120px'},
  { colKey: 'type', title: '描述',align: 'center',width: '120px'},
  { colKey: 'amount', title: '数量',align: 'center',width: '120px'},
  { colKey: 'munit', title: '单位',align: 'center',width: '120px'},
  { colKey: 'price', title: '单价（元）',align: 'center',width: '120px'},
  { colKey: 'pricesum', title: '小计（元）',align: 'center',width: '120px'},
]);

// 关闭
const  drawerClose = () => {
  visible.value = false
}

const dblclick = (row: any) => {
  console.log(row)
  visible.value = true
}

const value = ref('');
const onChange = (checkedValues: any) => {
  console.log('checkedValues:', value.value, checkedValues);
};
</script>

<style lang="scss" scoped>
h1{
  font-size: 40px;
  color: #007CF5;
  margin: 20px 20px 20px 8px;
}
.row{
  .col{
    margin: 10px 0px 10px 0px;
  }
}

.groups{
  margin: 10px;
  .titles{
    width: 150px;
    text-align: right;
    line-height: 30px;
  }
  .ranges{
    width: 250px;
  }
}
.group{
  margin: 10px;
}
</style>
