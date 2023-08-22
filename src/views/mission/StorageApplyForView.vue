<template>
  <t-drawer v-model:visible="visible" size="medium" :header="header" :on-confirm="drawerClose" :close-btn="true">
    <t-row>
      <t-col :span="12" >
        <t-input-group class="groups">
          <span class="titles">产品编号：</span>
          <t-input type="text" class="ranges" v-model="scheduling.scproductid" disabled />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">产品名称：</span>
          <t-input type="text" class="ranges" v-model="scheduling.scproductname"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">单位：</span>
          <t-input type="text" class="ranges" v-model="scheduling.scamountunit" />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">单价：</span>
          <t-input type="text" class="ranges" @blur="scheduling.scubtotal = scheduling.sccostprice*scheduling.scamount" v-model="scheduling.sccostprice"/>
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">数量：</span>
          <t-input type="text" class="ranges" @blur="scheduling.scubtotal = scheduling.sccostprice*scheduling.scamount" v-model="scheduling.scamount"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">小计：</span>
          <t-input type="text" class="ranges" v-model="scheduling.scubtotal" disabled/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">描述：</span>
          <t-textarea type="text" status="success" class="ranges" v-model="scheduling.scproductdescribe" />
        </t-input-group>
      </t-col>
    </t-row>

    <template #footer>
      <t-button theme="default" @click="insert" v-if="bool == true">添加物料</t-button>
      <t-button @click="upd" v-if="bool == false">修改物料</t-button>
      <t-button theme="danger" @click="del" v-if="bool == false">删除物料</t-button>
      <t-button variant="outline" @click="visible = false"> 取消 </t-button>
    </template>
  </t-drawer>

  <t-row  style="height: 89vh">
    <t-col :span="12">
      <t-row class="row">
        <t-col :span="12" class="col"><t-input label="入库申请单号：" v-model="warehousing.wagatherid" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="登记人：" v-model="warehousing.waregister" suffix="元" size="large" disabled/></t-col>
        <t-col :span="6" class="col">
          <t-select label="入库选择：" :options="shoice" size="large" v-model="warehousing.wareason"/>
        </t-col>
        <t-col :span="6" class="col"><t-input label="出入库人：" v-model="warehousing.wastorer"  size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="总金额：" v-model="warehousing.waamountsum" suffix="元" size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="总件数：" v-model="warehousing.wacostpricesum" size="large" suffix="件"/></t-col>
        <t-col :span="6" class="col"><t-input label="确认出入库总件数：" v-model="warehousing.wagatheredamountsum" suffix="件" size="large" /></t-col>

        <t-col :span="12" class="col">
          <t-textarea placeholder="备注" v-model="warehousing.waremark" size="large"/>
        </t-col>

        <t-col :span="12">
          <t-button @click="btns">添加入库物料</t-button>
          <t-list >
            <t-list style="height: 45vh">
              <t-table v-model:columns="columns" :data="data" v-on:row-dblclick="dblclick" :hover="true"/>
            </t-list>
          </t-list>
        </t-col>
        <t-col :span="6">
          <t-button block theme="primary" class="btn" @click="inser">登记档案</t-button>
        </t-col>
        <t-col :span="6" >
          <t-button block theme="warning" @click="reset" class="btn">重置</t-button>
        </t-col>
      </t-row>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {warehousingStore} from "@/store/inventopy/warehousing";
import {userStore} from "@/store/user";
import {getWagatherid, insertWarehousing} from "@/http/inventopy/warehousing";
import {getScproductid, insertScheduling} from "@/http/inventopy/scheduling";
import {MessagePlugin} from "tdesign-vue-next";

const warehousing = ref(warehousingStore().warehousingInsert)
const data = ref(warehousingStore().warehousingInsert.data)
const scheduling = ref(warehousingStore().warehousingInsert.scheduling)

warehousing.value.waregister = userStore().account.ename

getWagatherid().then(item => {
  warehousing.value.wagatherid = item.data
})

const header = ref("修改信息")
const visible = ref(false)
const bool = ref(false)

const shoice = [
  { label: "赠送",    value: "R001-3" },
  { label: "生产入库", value: "R001-1" },
  { label: "生产发货", value: "R001-2" },
  { label: "内部归还", value: "R001-4" },
  { label: "生产领料", value: "R001-5" },
  { label: "库存初始", value: "R001-6" },
  { label: "内部借领", value: "R001-7" },
  { label: "其他归还", value: "R001-8" },
  { label: "其他借领", value: "R001-9" },
]

// 添加入库物料按钮
const btns = () => {
  getScproductid().then(item => {
    scheduling.value.scproductid = item.data
  })
  scheduling.value.scproductid = ""
  scheduling.value.scproductname = ""
  scheduling.value.scamount = ""
  scheduling.value.scamountunit = ""
  scheduling.value.sccostprice = ""
  scheduling.value.scubtotal = ""
  scheduling.value.scproductdescribe = ""
  visible.value = true
  bool.value = true
}
// 添加
const insert = () => {
  data.value.push({
    scproductid: scheduling.value.scproductid,
    scproductname: scheduling.value.scproductname,
    scamount: scheduling.value.scamount,
    scamountunit: scheduling.value.scamountunit,
    sccostprice: scheduling.value.sccostprice,
    scubtotal: scheduling.value.scubtotal,
    scproductdescribe: scheduling.value.scproductdescribe
  })
  visible.value = false
}
// 删除
const del = () => {
  data.value.splice(warehousing.value.row,1)
  visible.value = false;
}
// 修改
const upd = () => {
  data.value[warehousing.value.row].scproductid = scheduling.value.scproductid
  data.value[warehousing.value.row].scproductname = scheduling.value.scproductname
  data.value[warehousing.value.row].scamount = scheduling.value.scamount
  data.value[warehousing.value.row].scamountunit = scheduling.value.scamountunit
  data.value[warehousing.value.row].sccostprice = scheduling.value.sccostprice
  data.value[warehousing.value.row].scubtotal = scheduling.value.scubtotal
  data.value[warehousing.value.row].scproductdescribe = scheduling.value.scproductdescribe
  visible.value = false
}

const leftFixedColumn = ref(2);
const columns = ref([
  { colKey: 'scproductid', title: '产品编号',align: 'center',width: '120px'},
  { colKey: 'scproductname', title: '产品名称',align: 'center',width: '120px'},
  { colKey: 'scamount', title: '数量',align: 'center',width: '120px'},
  { colKey: 'scamountunit', title: '单位',align: 'center',width: '120px'},
  { colKey: 'sccostprice', title: '单价（元）',align: 'center',width: '120px'},
  { colKey: 'scubtotal', title: '小计（元）',align: 'center',width: '120px'},
]);

// 关闭
const  drawerClose = () => {
  visible.value = false
}

const dblclick = (row: any) => {
  console.log(row)
  warehousing.value.row = row.index
  scheduling.value.scproductid = data.value[warehousing.value.row].scproductid
  scheduling.value.scproductname = data.value[warehousing.value.row].scproductname
  scheduling.value.scamount = data.value[warehousing.value.row].scamount
  scheduling.value.scamountunit = data.value[warehousing.value.row].scamountunit
  scheduling.value.sccostprice = data.value[warehousing.value.row].sccostprice
  scheduling.value.scubtotal = data.value[warehousing.value.row].scubtotal
  scheduling.value.scproductdescribe = data.value[warehousing.value.row].scproductdescribe
  visible.value = true
  bool.value = false
}

const inser = () => {
  insertWarehousing().then(item => {
    if (item.code === 200){
      warehousing.value.waid = item.data
      for (let i=0;i<data.value.length;i++){
        insertScheduling(data.value[i]).then(items => {
          if (items.code === 200){
            return ;
          }else{
            MessagePlugin.error({content: items.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
          }
        })
      }
      reset()
      getWagatherid().then(item => {
        warehousing.value.wagatherid = item.data
      })
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }else {
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }
  })
}

const reset = () => {
  warehousing.value.wastorer = ""
  warehousing.value.wareason = ""
  warehousing.value.waamountsum = ""
  warehousing.value.wacostpricesum = ""
  warehousing.value.wagatheredamountsum = ""
  warehousing.value.waremark = ""
  warehousing.value.waid = ""
  data.value.length = 0
}
</script>

<style lang="scss" scoped>
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
.btn{
  margin-top: 10px;
}
</style>
