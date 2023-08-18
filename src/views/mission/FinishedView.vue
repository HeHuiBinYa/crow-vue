<template>
  <t-col :span="12">
    <t-row style="height: 89vh">
      <t-col :span="12">
        <t-row class="row">
          <t-col :span="12">
            <h3>生产计划完工存档：{{data.current}}/{{data.total}}</h3>
          </t-col>
          <t-col :span="12" class="col"><t-input label="派工单编号：" size="large" v-model="finished.manufactureid" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="产品名称：" size="large" v-model="finished.maproductname" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="工单制定人：" size="large" v-model="finished.madesigner" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="投产数量：" v-model="finished.maamount" size="large"  disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="合格数量：" size="large" v-model="finished.matesteramount" /></t-col>
          <t-col :span="6" class="col"><t-input label="实际物料总成本：" v-model="finished.marealmodulecostpricesum" size="large" /></t-col>
          <t-col :span="6" class="col"><t-input label="实际工时总成本：" v-model="finished.mareallabourcostpricesum"  size="large" /></t-col>
          <t-col :span="12" class="col">
            <t-textarea  placeholder="备注" status="success" v-model="finished.maremapk" size="large" />
          </t-col>
        </t-row>
      </t-col>

      <t-col :span="12">
        <t-row style="margin: 15px">
          <t-col :span="2">
            <t-button style="width: 100%" @click="previous">上一项</t-button>
          </t-col>
          <t-col :span="3"></t-col>
          <t-col :span="2">
            <t-button theme="success" style="width: 100%" @click="btns">确定完工存档</t-button>
          </t-col>
          <t-col :span="3"></t-col>
          <t-col :span="2">
            <t-button style="width: 100%" @click="nextItem">下一项</t-button>
          </t-col>
        </t-row>
      </t-col>
      <t-col :span="12">

        <t-dialog :visible="visible" :close-btn="true"  cancel-btn="取消" :on-close="drawerClose">
          <template #header>发货入库</template>
          <template #body>{{finished.maproductname}}......发货？ 入库？</template>
          <template #footer>
            <t-button theme="success" @click="goods">发货</t-button>
            <t-button theme="success" @click="storage">入库</t-button>
            <t-button @click="drawerClose">取消</t-button>
          </template>
        </t-dialog>

        <t-drawer v-model:visible="visible2" :close-on-overlay-click="false" :header="head" size="50%" :placement="placement"
                  @cancel="visible = false" :on-confirm="publish" z-index="100">
          <t-row class="item-row">
            <t-col :span="12">
              <t-col :span="12" class="col"><t-input :label="head+'申请单号：'" v-model="warehousing.wagatherid" size="medium"  disabled/></t-col>
            </t-col>
            <t-col :span="12" class="item-col">
              <t-col :span="12" class="col"><t-input :label="head+'登记人：'" v-model="warehousing.waregister" size="medium" disabled/></t-col>
            </t-col>
            <t-col :span="12" class="item-col">
              <t-col :span="12" class="col"><t-input :label="head+'人：'" size="medium" v-model="warehousing.wastorer"  /></t-col>
            </t-col>
            <t-col :span="12" class="item-col">
              <t-col :span="12" class="col"><t-input :label="head+'总件数：'" size="medium" v-model="warehousing.waamountsum" disabled/></t-col>
            </t-col>
            <t-col :span="12" class="item-col">
              <t-col :span="12" class="col"><t-input :label="head+'价值总金额：'"  size="medium" v-model="warehousing.wacostpricesum" disabled/></t-col>
            </t-col>
            <t-col :span="12" class="item-col">
              <t-col :span="12" class="col"><t-input :label="'确认'+head+'总件数：'" size="medium" v-model="warehousing.wagatheredamountsum" disabled/></t-col>
            </t-col>
            <t-col :span="12">
              <h3>{{head}}明细</h3>
              <t-table :columns="columns" :data="scheduling"/>
            </t-col>
          </t-row>
        </t-drawer>
      </t-col>
    </t-row>
  </t-col>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {
  manufactureComplete,
  queryPageManufactureFinished
} from "@/http/product/manufacture";
import {manufactureStore} from "@/store/product/manufacture";
import {userStore} from "@/store/user";
import {MessagePlugin} from "tdesign-vue-next";
import {getWagatherid, wagatheridComplete} from "@/http/inventopy/warehousing";
import {warehousingStore} from "@/store/inventopy/warehousing/index"
import {getScproductid, schedulingComplete} from "@/http/inventopy/scheduling";

const columns = ref();
const  warehousing = ref(warehousingStore().warehousing)
warehousing.value.waregister = userStore().account.ename

const goods = () => {
  warehousing.value.waamountsum = finished.value.matesteramount
  warehousing.value.wagatheredamountsum = finished.value.matesteramount
  warehousing.value.wareason = "R001-2"
  visible.value = false
  visible2.value = true
  head.value = "发货"
  columns.value = [
    { colKey: 'scproductid', title: '产品编号',align: 'center',width: '15vw'},
    { colKey: 'scproductname', title: '产品名称',align: 'center',width: '15vw' },
    { colKey: 'scamount', title: '数量',align: 'center',width: '10vw'},
    { colKey: 'scubtotal', title: '小计',align: 'center',width: '10vw'},
    { colKey: 'scgatheredamount', title: '确认'+head.value+'件数',align: 'center',width: '10vw'},
  ]
  scheduling.value = []

  let scpid;
  getScproductid().then(item => {
    scpid = item.data
    scheduling.value.push({
      scproductid: scpid,
      scproductname: finished.value.maproductname,
      scamount: finished.value.matesteramount,
      scubtotal: warehousing.value.wacostpricesum,
      scgatheredamount: finished.value.matesteramount,
    })
  })
}

const storage = () => {
  warehousing.value.waamountsum = finished.value.matesteramount
  warehousing.value.wagatheredamountsum = finished.value.matesteramount
  warehousing.value.wareason = "R001-1"
  visible.value = false
  visible2.value = true
  head.value = "入库"
  columns.value = [
    { colKey: 'scproductid', title: '产品编号',align: 'center',width: '15vw'},
    { colKey: 'scproductname', title: '产品名称',align: 'center',width: '15vw' },
    { colKey: 'scamount', title: '数量',align: 'center',width: '10vw'},
    { colKey: 'scubtotal', title: '小计',align: 'center',width: '10vw'},
    { colKey: 'scgatheredamount', title: '确认'+head.value+'件数',align: 'center',width: '10vw'},
  ]
  scheduling.value = []
  let scpid;
  getScproductid().then(item => {
    scpid = item.data
    scheduling.value.push({
      scproductid: scpid,
      scproductname: finished.value.maproductname,
      scamount: finished.value.matesteramount,
      scubtotal: warehousing.value.wacostpricesum,
      scgatheredamount: finished.value.matesteramount,
    })
  })
}

const head = ref("")
const placement = ref("right")
const data = ref(manufactureStore().finished.data)
const finished = ref(manufactureStore().finished)
const scheduling= ref(manufactureStore().finished.scheduling)


const queryManufactureFinished = () =>{
  data.value.length = 0
  queryPageManufactureFinished().then(item => {
    console.log(item)
    if (item.data.records.length > 0){
      finished.value.manufactureid = item.data.records[0].manufactureid
      finished.value.maproductname = item.data.records[0].maproductname
      finished.value.madesigner = item.data.records[0].madesigner
      finished.value.maamount = item.data.records[0].maamount
      finished.value.maid = item.data.records[0].maid
      data.value = item.data
    }else{
      finished.value.manufactureid = ""
      finished.value.maproductname = ""
      finished.value.madesigner = ""
      finished.value.maamount = ""
      finished.value.matesteramount = ""
      finished.value.marealmodulecostpricesum = ""
      finished.value.mareallabourcostpricesum = ""
      finished.value.maremapk = ""
      finished.value.maid = 0
    }
  })
}
queryManufactureFinished()

const btns = () => {
  if (finished.value.matesteramount == ""){
    MessagePlugin.error({content: "合格数量未输入", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  if (finished.value.mareallabourcostpricesum == ""){
    MessagePlugin.error({content: "实际物料总成本未输入", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  if (finished.value.marealmodulecostpricesum == ""){
    MessagePlugin.error({content: "实际工时总成本未输入", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  getWagatherid().then(item => {
    warehousing.value.wagatherid = item.data
  })
  warehousing.value.wacostpricesum = (parseInt(finished.value.marealmodulecostpricesum)+parseInt(finished.value.mareallabourcostpricesum))
  console.log(finished.value)
  visible.value = true
}

const previous = () => {
  finished.value.size ++
  if (finished.value.size >= data.value.total){
    finished.value.size = data.value.total
  }
  queryManufactureFinished()
}

const nextItem = () => {
  finished.value.size --
  if (finished.value.size <= 0){
    finished.value.size = 1
  }
  queryManufactureFinished()
}

const header = ref("修改信息")
const visible = ref(false)
const visible2 = ref(false)

const leftFixedColumn = ref(2);

// 关闭
const  drawerClose = () => {
  visible.value = false
}

const publish = () => {
  if (warehousing.value.wastorer == ""){
    MessagePlugin.error({content: "发货入库人未填写", duration: 1000, zIndex: 1, attach: '#message-toggle'})
    return ;
  }
  manufactureComplete().then(manu => {
    if (manu.code === 200){
      wagatheridComplete().then(waga => {
        warehousing.value.waid = waga.data
        if (waga.data != ""){
          for (let i=0;i<scheduling.value.length;i++){
            schedulingComplete(scheduling.value[i]).then(sche => {
              if (sche.code === 200){
                queryManufactureFinished()
                finished.value.matesteramount = ""
                finished.value.marealmodulecostpricesum = ""
                finished.value.mareallabourcostpricesum = ""
                visible2.value = false
                MessagePlugin.info({content: waga.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
              }else{
                MessagePlugin.error({content: waga.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
              }
            })
          }
        }else{
          MessagePlugin.error({content: waga.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
        }
      })
    }else{
      MessagePlugin.error({content: manu.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }


  })
}
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
.item-row{
  .item-col{
    margin-top: 20px;
  }
}
</style>

