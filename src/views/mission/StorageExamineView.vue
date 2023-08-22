<template>
  <t-row style="height: 89vh">
    <t-col :span="12">
      <t-row class="row">
        <t-col :span="12">
          <h3>待审核入库申请：{{page.scheduling.current}}/{{page.scheduling.total}}</h3>
        </t-col>
        <t-col :span="12" class="col"><t-input label="入库申请单号：" size="large" v-model="page.wagatherid" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="出入库人：" size="large" v-model="page.wastorer" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="登记人：" suffix="元" v-model="page.waregister" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="复核人：" size="large" v-model="page.wachecker" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="总金额：" suffix="元" v-model="page.wacostpricesum" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="总件数：" size="large" v-model="page.waamountsum" suffix="件" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="确认出入库总件数：" v-model="page.wagatheredamountsum" suffix="件" size="large" disabled/></t-col>

        <t-col :span="12" class="col">
          <t-textarea placeholder="备注" size="large" v-model="page.manufactureid" disabled/>
        </t-col>

        <t-col :span="12">
          <t-list >
            <t-table v-model:columns="columns"  :data="records" :hover="true"/>
          </t-list>
        </t-col>

        <t-col :span="12" style="margin: 20px">
          <t-radio-group default-value="S001-1" v-model="page.wachecktag" @change="onChange" class="group">
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
              <t-button style="width: 100%" @click="examine">确认提交</t-button>
            </t-col>
            <t-col :span="3"></t-col>
            <t-col :span="2">
              <t-button style="width: 100%" @click="nextItem">下一项</t-button>
            </t-col>
          </t-row>
        </t-col>
      </t-row>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {examinePageWarehousing, updateWarehousing} from "@/http/inventopy/warehousing";
import {MessagePlugin} from "tdesign-vue-next";
import {warehousingStore} from "@/store/inventopy/warehousing";
import {userStore} from "@/store/user";

const page = ref(warehousingStore().page)
const records = ref(warehousingStore().page.records)
page.value.wachecker = userStore().account.ename

const eageWarehousing = () => {
  examinePageWarehousing().then(item => {
    if (item.data.records.length > 0){
      page.value.scheduling = item.data
      records.value = item.data.records[0].schedulings
      page.value.waid = item.data.records[0].waid
      page.value.wagatherid = item.data.records[0].wagatherid
      page.value.wastorer = item.data.records[0].wastorer
      page.value.waamountsum = item.data.records[0].waamountsum
      page.value.wacostpricesum = item.data.records[0].wacostpricesum
      page.value.wagatheredamountsum = item.data.records[0].wagatheredamountsum
      page.value.waregister = item.data.records[0].waregister

      console.log(page)
    }else{
      page.value.scheduling = []
      records.value = []
      page.value.waid = ""
      page.value.wagatherid = ""
      page.value.wastorer = ""
      page.value.waamountsum = ""
      page.value.wacostpricesum = ""
      page.value.wagatheredamountsum = ""
      page.value.waregister = ""
    }
  })
}
eageWarehousing()

const previous = () => {
  page.value.size ++
  page.value.wachecktag = ""
  if (page.value.size >= page.value.scheduling.total){
    page.value.size = page.value.scheduling.total
  }
  eageWarehousing()
}

const nextItem = () => {
  page.value.size --
  page.value.wachecktag = ""
  if (page.value.size <= 0){
    page.value.size = 1
  }
  eageWarehousing()
}

const examine = () => {
  if (page.value.wachecktag == ""){
    MessagePlugin.info({content: "审核选项未选中", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  updateWarehousing().then(item => {
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      page.value.size = 1
      eageWarehousing()
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }
  })
}

const leftFixedColumn = ref(2);
const columns = ref([
  { colKey: 'scproductid', title: '产品编号',align: 'center',width: '150px' ,fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'scproductname', title: '产品名称',align: 'center',width: '200px'},
  { colKey: 'scamount', title: '数量',align: 'center',width: '120px'},
  { colKey: 'scamountunit', title: '单位',align: 'center',width: '120px'},
  { colKey: 'sccostprice', title: '单价（元）',align: 'center',width: '120px'},
  { colKey: 'scubtotal', title: '小计（元）',align: 'center',width: '120px'},
]);

const value = ref('');
const onChange = (checkedValues: any) => {
  console.log('checkedValues:', value.value, checkedValues);
};
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
