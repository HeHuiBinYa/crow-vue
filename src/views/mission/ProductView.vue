<template>
  <t-col :span="12" style="height: 89vh">
    <t-row>
      <t-col :span="12">
        <t-row class="row">
          <t-col :span="12">
            <h3>待审核产品：12/30</h3>
          </t-col>
          <t-col :span="12" class="col"><t-input label="派工单编号：" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="产品名称：" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="工单制定人：" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="登记人：" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="登记时间：" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="审核人：" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="审核时间：" size="large" disabled/></t-col>
          <t-col :span="12" class="col">
            <t-textarea placeholder="产品描述" size="large" disabled/>
          </t-col>
          <t-col :span="12">
            <t-list style="height: 30vh">
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
for (let i = 1; i <= 11; i++) {
  data.push({
    prdetailsnumber: 'AD100001AD1001'+i,
    prprocedureid: 'XXX工序'+i,
    procedurename: '物流'+i,
    prlabourhouramount: i*10,
    prreallabourhouramount: i*11,
    prsubtotal: i*12,
    prrealsubtotal: i*13,
    prmodulesubtotal:(i*14),
    prrealmodulesubtotal: (i*15),
    prcostprice:(i*14),
    prdemandamount:(i*100),
    prrealamount:(i*14),
    procedurefinishtag: 'G004-0',
    proceduretransfertag: 'G005-0',
  });
}

const leftFixedColumn = ref(2);
const columns = ref([
  { colKey: 'prdetailsnumber', title: '工序序号',align: 'center',width: '10vw',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'prprocedureid', title: '工序编号',align: 'center',width: '10vw' ,fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'procedurename', title: '工序名称',align: 'center',width: '10vw'},
  { colKey: 'prlabourhouramount', title: '设计工时数',align: 'center',width: '10vw'},
  { colKey: 'prreallabourhouramount', title: '实际工时数',align: 'center',width: '10vw'},
  { colKey: 'prsubtotal', title: '设计工时成本',align: 'center',width: '10vw'},
  { colKey: 'prrealsubtotal', title: '实际工时成本',align: 'center',width: '10vw'},
  { colKey: 'prmodulesubtotal', title: '设计物料成本',align: 'center',width: '10vw'},
  { colKey: 'prrealmodulesubtotal', title: '实际物料成本',align: 'center',width: '10vw'},
  { colKey: 'prcostprice', title: '单位工时成本',align: 'center',width: '10vw'},
  { colKey: 'prdemandamount', title: '工序投产数量',align: 'center',width: '10vw'},
  { colKey: 'prrealamount', title: '工序合格数量',align: 'center',width: '10vw'},
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

