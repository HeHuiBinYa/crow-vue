<template>
  <t-drawer v-model:visible="visible" size="25%" :close-on-overlay-click="false" :header="header" :on-confirm="drawerClose" :close-btn="true">
    <t-row >
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">工序序号：</span>
          <t-input type="text" v-model="procedure.prdetailsnumber"  class="ranges" disabled />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">工序编号：</span>
          <t-input type="text" v-model="procedure.prprocedureid"  class="ranges" disabled />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">工序名称：</span>
          <t-input type="text" class="ranges" v-model="procedure.procedurename" />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">设计工时数：</span>
          <t-input type="text" class="ranges" v-model="procedure.prlabourhouramount"/>
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">设计工时成本：</span>
          <t-input type="text" class="ranges"  v-model="procedure.prsubtotal"/>
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">设计物料成本：</span>
          <t-input type="text" class="ranges"  v-model="procedure.prmodulesubtotal"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">单位工时成本：</span>
          <t-input type="text" class="ranges" v-model="procedure.prcostprice" />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">工序投产数量：</span>
          <t-input type="text" class="ranges" v-model="procedure.prdemandamount" />
        </t-input-group>
      </t-col>
<!--      <t-col :span="12">-->
<!--        <t-button class="but">工序物料添加</t-button>-->
<!--        <t-list>-->
<!--          <t-table v-model:columns="columns"   :hover="true"/>-->
<!--        </t-list>-->
<!--      </t-col>-->
    </t-row>
    <template #footer>
      <t-button theme="default" @click="insert" v-if="anniu">添加工序</t-button>
      <t-button @click="upds" v-if="anniu==false">修改工序</t-button>
      <t-button theme="danger" @click="remove" v-if="anniu==false">删除工序</t-button>
      <t-button variant="outline" @click="visible = false"> 取消 </t-button>
    </template>
  </t-drawer>

  <t-row style="height: 89vh">
    <t-col :span="12">
      <t-row class="row">
        <t-col :span="6" class="col"><t-input label="派工单编号：" v-model="manufacture.manufactureid" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="产品编号：" v-model="manufacture.maproductid" size="large" disabled/></t-col>
        <t-col :span="12" class="col"><t-input label="工单制定人：" v-model="manufacture.madesigner" size="large" disabled/></t-col>
        <t-col :span="6" class="col">
          <t-select label="制作产品：" v-model="manufacture.mafid" :options="file" size="large" />
        </t-col>
        <t-col :span="6" class="col"><t-input label="产品名称：" v-model="manufacture.maproductname" size="large" /></t-col>
        <t-col :span="6" class="col">
          <t-input-number class="number" @blur="compute" size="large" v-model="manufacture.maamount" theme="normal"  align="left">
            <template #label><span>投产数量：</span></template>
            <template #suffix><span>件</span></template>
          </t-input-number>
        </t-col>
        <t-col :span="6" class="col">
          <t-input-number class="number" size="large" v-model="manufacture.mamodulecostpricesum" disabled  theme="normal" align="left">
            <template #label><span>设计物料总成本：</span></template>
            <template #suffix><span>元</span></template>
          </t-input-number>
        </t-col>
        <t-col :span="6" class="col">
          <t-input-number class="number" size="large" v-model="manufacture.malabourcostpricesum"  theme="normal" align="left">
            <template #label><span>设计工时总成本：</span></template>
            <template #suffix><span>元</span></template>
          </t-input-number>
        </t-col>
        <t-col :span="12" class="col">
          <t-textarea placeholder="产品描述" v-model="manufacture.maproductdescribe" size="large"/>
        </t-col>
        <t-col :span="12">
          <t-button @click="btns">添加生产工序</t-button>
          <t-list style="height: 41vh">
            <t-table v-model:columns="columns" :data="data" :close-on-overlay-click="false" v-on:row-dblclick="dblclick" :hover="true"/>
          </t-list>
        </t-col>
        <t-col :span="6">
          <t-button block theme="primary" @click="insertManu" class="btn">发布生产计划</t-button>
        </t-col>
        <t-col :span="6" >
          <t-button block theme="warning" class="btn" @click="reset">重置</t-button>
        </t-col>
      </t-row>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {manufactureStore} from "@/store/product/manufacture/index"
import {getSerialnumber1, getSerialnumber2, insertManufacture} from "@/http/product/manufacture";
import {selectSysFileList} from "@/http/design/sysFile";
import {userStore} from "@/store/user";
import {procedureStore} from "@/store/product/procedure/index"
import {getProcedure1, getProcedure2, insertProcedure} from "@/http/product/procedure";
import {MessagePlugin} from "tdesign-vue-next";
import {selectSysMaterialsByFid} from "@/http/design/sysMaterials";

const data = ref(manufactureStore().data.data)
const manufacture = ref(manufactureStore().data.manufacture)
const file = ref(manufactureStore().data.file)

const procedure = ref(procedureStore().data.procedure)

const anniu = ref(false)

manufacture.value.madesigner = userStore().account.ename

// 添加按钮
const inser = () => {
  header.value = "添加物料"
  visible.value = true
}

getSerialnumber1().then(item => {
  manufacture.value.maproductid = item.data
})

getSerialnumber2().then(item => {
  manufacture.value.manufactureid = item.data
})

selectSysFileList().then(item => {
  file.value = []
  for (let i=0;i<item.data.length;i++){
    file.value.push({ label : item.data[i].name, value: item.data[i].fid },)
  }
})

// 发布
const insertManu = () => {
  insertManufacture().then(item => {
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      manufacture.value.maid = item.data
      for (let i=0;i<data.value.length;i++){
        insertProcedure(data.value[i]).then(items => {
          if (items.code === 200){
            return ;
          }else {
            MessagePlugin.error({content: items.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
          }
        })
      }
      reset()
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }
  })
}

const btns = () => {
  if (manufacture.value.mafid == ""){
    MessagePlugin.error({content: "产品未选中", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  getProcedure1().then(item => {
    procedure.value.prdetailsnumber = item.data
  })
  getProcedure2().then(item => {
    procedure.value.prprocedureid = item.data
  })
  header.value = "添加生产工序"
  anniu.value = true
  visible.value = true
}

const compute = () => {
  if (manufacture.value.mafid == ""){
    MessagePlugin.error({content: "产品未选中", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  selectSysMaterialsByFid().then(item => {
    console.log(item)
    let a = 0;
    for (let i=0;i<item.data.length;i++){
      a += item.data[i].price*item.data[i].amount*manufacture.value.maamount
    }
    manufacture.value.mamodulecostpricesum = a
  })
}

const reset = () => {
  data.value.length = 0
  manufacture.value.maproductname = ""
  manufacture.value.maamount = 0
  manufacture.value.mamodulecostpricesum = 0
  manufacture.value.malabourcostpricesum = 0
  manufacture.value.maproductdescribe = ""
}

// 添加物料
const insert = () => {
  data.value.push({
    prdetailsnumber: procedure.value.prdetailsnumber,
    prprocedureid: procedure.value.prprocedureid,
    procedurename: procedure.value.procedurename,
    prlabourhouramount: procedure.value.prlabourhouramount,
    prsubtotal: procedure.value.prsubtotal,
    prmodulesubtotal: procedure.value.prmodulesubtotal,
    prcostprice: procedure.value.prcostprice,
    prdemandamount: procedure.value.prdemandamount,
  })
  procedure.value.prdetailsnumber = ""
  procedure.value.prprocedureid = ""
  procedure.value.procedurename = ""
  procedure.value.prlabourhouramount = ""
  procedure.value.prsubtotal = ""
  procedure.value.prmodulesubtotal = ""
  procedure.value.prcostprice = ""
  procedure.value.prdemandamount = ""
  visible.value = false
}

// 删除物料
const remove = () => {
  data.value.splice(manufacture.value.row,1)
  visible.value = false
}

const upds = () => {
  data.value[manufacture.value.row].prdetailsnumber = procedure.value.prdetailsnumber
  data.value[manufacture.value.row].prprocedureid = procedure.value.prprocedureid
  data.value[manufacture.value.row].procedurename = procedure.value.procedurename
  data.value[manufacture.value.row].prlabourhouramount = procedure.value.prlabourhouramount
  data.value[manufacture.value.row].prsubtotal = procedure.value.prsubtotal
  data.value[manufacture.value.row].prmodulesubtotal = procedure.value.prmodulesubtotal
  data.value[manufacture.value.row].prcostprice = procedure.value.prcostprice
  data.value[manufacture.value.row].prdemandamount = procedure.value.prdemandamount
  visible.value = false
  return ""
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
  manufacture.value.row = row.index
  procedure.value.prdetailsnumber = data.value[row.index].prdetailsnumber
  procedure.value.prprocedureid = data.value[row.index].prprocedureid
  procedure.value.procedurename = data.value[row.index].procedurename
  procedure.value.prlabourhouramount = data.value[row.index].prlabourhouramount
  procedure.value.prsubtotal = data.value[row.index].prsubtotal
  procedure.value.prmodulesubtotal = data.value[row.index].prmodulesubtotal
  procedure.value.prcostprice = data.value[row.index].prcostprice
  procedure.value.prdemandamount = data.value[row.index].prdemandamount
  anniu.value = false
  header.value = "修改"+procedure.value.procedurename
  visible.value = true
}
</script>

<style lang="scss" scoped>
.row{
  .col{
    margin: 10px 0px 10px 0px;
    .number{
      width: 35.3vw;
    }
  }
}

.groups{
  margin: 0px 0px 10px 0px;
  .titles{
    width: 150px;
    text-align: right;
    line-height: 30px;
  }
  .ranges{
    width: 250px;
  }
}
.btn{
  margin-top: 10px;
}
.but{
  margin:10px;
}
</style>
