<template>
  <t-col :span="12">
    <t-row style="height: 89vh">
      <t-col :span="12">
        <t-row class="row">
          <t-col :span="12">
            <h3>待复核生产计划：{{data.current}}/{{data.total}}</h3>
          </t-col>
          <t-col :span="12" class="col"><t-input label="派工单编号：" size="large" v-model="page.manufactureid" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="产品名称：" size="large" v-model="page.maproductname" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="工单制定人：" size="large" v-model="page.madesigner" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="登记时间：" size="large" v-model="page.maregistertime" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="审核人：" v-model="page.machecker" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="投产数量：" v-model="page.maamount" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="物料总成本：" v-model="page.mamodulecostpricesum" size="large" disabled/></t-col>
          <t-col :span="12" class="col">
            <t-textarea placeholder="产品描述" status="success" v-model="page.maproductdescribe" size="large" disabled/>
          </t-col>
          <t-col :span="12">
            <t-list style="height: 35vh">
              <t-table v-model:columns="columns" :data="procedures" v-on:row-dblclick="dblclick" :hover="true"/>
            </t-list>
          </t-col>
        </t-row>
      </t-col>

      <t-col :span="12">
        <t-radio-group default-value="S001-1" v-model="page.machecktag"  @change="onChange" class="group">
          <t-radio value="S001-1">审核通过</t-radio>
          <t-radio value="S001-2">审核不通过</t-radio>
        </t-radio-group>
      </t-col>

      <t-col :span="12">
        <t-row style="margin: 15px">
          <t-col :span="2">
            <t-button style="width: 100%" @click="previous">上一项</t-button>
          </t-col>
          <t-col :span="3"></t-col>
          <t-col :span="2">
            <t-button style="width: 100%" @click="btns">确认提交</t-button>
          </t-col>
          <t-col :span="3"></t-col>
          <t-col :span="2">
            <t-button style="width: 100%" @click="nextItem">下一项</t-button>
          </t-col>
        </t-row>
      </t-col>
    </t-row>
  </t-col>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {manufactureExamine, queryPageManufacture} from "@/http/product/manufacture";
import {manufactureStore} from "@/store/product/manufacture";
import {userStore} from "@/store/user";
import {MessagePlugin} from "tdesign-vue-next";

const data = ref(manufactureStore().page.data)
const procedures = ref(manufactureStore().page.procedures)
const page = ref(manufactureStore().page)

page.value.machecker = userStore().account.ename

const queryManufacture = () =>{
  data.value.length = 0
  procedures.value.length = 0
  queryPageManufacture().then(item => {
    if (item.data.records.length > 0){
      page.value.manufactureid = item.data.records[0].manufactureid
      page.value.maproductname = item.data.records[0].maproductname
      page.value.madesigner = item.data.records[0].madesigner
      page.value.maregistertime = item.data.records[0].maregistertime
      page.value.maproductdescribe = item.data.records[0].maproductdescribe
      page.value.maamount = item.data.records[0].maamount
      page.value.maid = item.data.records[0].maid
      page.value.mamodulecostpricesum = item.data.records[0].mamodulecostpricesum
      data.value = item.data
      procedures.value = item.data.records[0].procedures
    }else{
      page.value.manufactureid = ""
      page.value.maproductname = ""
      page.value.madesigner = ""
      page.value.maregistertime = ""
      page.value.maproductdescribe = ""
      page.value.maamount = 0
      page.value.maid = 0
      page.value.mamodulecostpricesum = ""
    }
  })
}
queryManufacture()

const btns = () => {
  if (page.value.machecktag == ""){
    MessagePlugin.error({content: "审核未选择", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
  }
  console.log(page.value)
  manufactureExamine().then(item => {
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      queryManufacture()
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }
  })
}

const previous = () => {
  page.value.size ++
  if (page.value.size >= data.value.total){
    page.value.size = data.value.total
  }
  queryManufacture()
}

const nextItem = () => {
  page.value.size --
  if (page.value.size <= 0){
    page.value.size = 1
  }
  queryManufacture()
}

const header = ref("修改信息")
const visible = ref(false)

const leftFixedColumn = ref(2);
const columns = ref([
  { colKey: 'prdetailsnumber', title: '工序序号',align: 'center',width: '15vw',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'prprocedureid', title: '工序编号',align: 'center',width: '15vw' ,fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'procedurename', title: '工序名称',align: 'center',width: '10vw'},
  { colKey: 'prlabourhouramount', title: '设计工时数',align: 'center',width: '10vw'},
  { colKey: 'prsubtotal', title: '设计工时成本',align: 'center',width: '10vw'},
  { colKey: 'prmodulesubtotal', title: '设计物料成本',align: 'center',width: '10vw'},
  { colKey: 'prcostprice', title: '单位工时成本',align: 'center',width: '10vw'},
  { colKey: 'prdemandamount', title: '工序投产数量',align: 'center',width: '10vw'},
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

