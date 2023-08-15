<template>
  <t-row id="message-toggle">
    <t-col :span="12">
      <t-row class="row">
        <t-col :span="6" class="col"><t-input label="登记人："   v-model="design.register" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="产品编号：" v-model="design.pid" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="产品名称：" v-model="design.name" size="large" /></t-col>
        <t-col :span="6" class="col"><t-select size="large" v-model="design.aid" v-on:change="changeB" :options="datas.heroA"  placeholder="一级分类"/></t-col>
        <t-col :span="6" class="col"><t-select size="large" v-model="design.bid" v-on:change="changeC" :options="datas.heroB" placeholder="二级分类"/></t-col>
        <t-col :span="6" class="col"><t-select size="large" v-model="design.cid" :options="datas.heroC" placeholder="三级分类"/></t-col>
        <t-col :span="6" class="col"><t-input label="用途类型：" v-model="design.type" size="large"/></t-col>
        <t-col :span="6" class="col"><t-input label="计量单位：" v-model="design.unit" suffix="m" size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="供应商集合：" v-model="design.grou" size="large"/></t-col>
        <t-col :span="6" class="col"><t-input label="审核标志" v-model="design.checktag" value="S001-0" disabled size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="成本单价：" v-model="design.costprice" suffix="元" size="large"/></t-col>
        <t-col :span="6" class="col"><t-input label="市场单价：" v-model="design.listprice" suffix="元" size="large"/></t-col>
        <t-col :span="12" class="col">
          <t-textarea placeholder="产品描述" v-model="design.descr" size="large"/>
        </t-col>
        <t-col :span="12">
          <t-button @click="inser">添加物料</t-button>
          <t-list style="height: 36vh">
            <t-table v-model:columns="columns" v-model:data="data" v-on:row-dblclick="dblclick" :hover="true"/>
          </t-list>
        </t-col>
        <t-col :span="6">
          <t-button block theme="primary" @click="addFile" class="btn">登记档案</t-button>
        </t-col>
        <t-col :span="6" >
          <t-button block theme="warning" @click="reset" class="btn">重置</t-button>
        </t-col>
      </t-row>
    </t-col>

  </t-row>

  <t-drawer v-model:visible="visible" size="medium" :header="header" :on-confirm="drawerClose" :close-btn="true">
    <t-row>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">物料单号：</span>
          <t-input type="text" v-model="mate.design" class="ranges" disabled />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">物料名称：</span>
          <t-input type="text" v-model="mate.designname" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">用途类型：</span>
          <t-input type="text" v-model="mate.type" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">单价：</span>
          <t-input type="text" @blur="mate.pricesum = mate.price*mate.amount" v-model="mate.price" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">数量：</span>
          <t-input type="text" @blur="mate.pricesum = mate.price*mate.amount" v-model="mate.amount" class="ranges"/>
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">单位：</span>
          <t-input type="text" v-model="mate.munit" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">小计：</span>
          <t-input type="text" disabled v-model="mate.pricesum" class="ranges"  />
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">描述：</span>
          <t-textarea type="text" v-model="mate.describer" class="ranges"  />
        </t-input-group>
      </t-col>
    </t-row>
    <template #footer>
      <t-button theme="default" @click="insert">添加物料</t-button>
      <t-button theme="warning" @click="upd">修改物料</t-button>
      <t-button theme="danger" @click="remove">删除物料</t-button>
      <t-button variant="outline" @click="visible = false"> 取消 </t-button>
    </template>
  </t-drawer>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {selectSysHeroAList} from "@/http/design/sysheroA";
import {selectSysHeroCByCid} from "@/http/design/sysheroC";
import {selectSysHeroBByCid} from "@/http/design/sysheroB";

import {obtainAproductNumber,addSysFile} from "@/http/design/sysFile";
import {addSysMaterials, materialCompositionDesignListNumber} from "@/http/design/sysMaterials";

import {sysFileStore} from "@/store/design/file";
import {userStore} from "@/store/user";
import {MessagePlugin} from "tdesign-vue-next";

const row = ref(-1);
const header = ref("修改信息")
const visible = ref(false)
const data = ref(sysFileStore().data)
const datas = ref({
  heroA: [{}],
  heroB: [{}],
  heroC: [{}]
})

const design = ref(sysFileStore().file)

const mate = ref(sysFileStore().mate)

design.value.register = userStore().account.ename

datas.value.heroA = []
selectSysHeroAList().then(item => {
  for (let i=0;i<item.data.length;i++){
    datas.value.heroA.push({ label: item.data[i].aname, value: item.data[i].aid })
  }
})

const changeB = (value: any, context: any) => {
  console.log(value)
  console.log(context)
  datas.value.heroB = []
  selectSysHeroBByCid(design.value.aid).then(item => {
    console.log(item)
    for (let i=0;i<item.data.length;i++){
      datas.value.heroB.push({ label: item.data[i].bname, value: item.data[i].bid })
    }
  })
}

const changeC = (value: any, context: any) => {
  console.log(value)
  console.log(context)
  datas.value.heroC = []
  selectSysHeroCByCid(design.value.bid).then(item => {
    console.log(item)
    for (let i=0;i<item.data.length;i++){
      datas.value.heroC.push({ label: item.data[i].cname, value: item.data[i].cid })
    }
  })
}

// 修改物料
const upd = () => {
  data.value[row.value].mid = mate.value.mid
  data.value[row.value].design = mate.value.design
  data.value[row.value].designname = mate.value.designname
  data.value[row.value].type = mate.value.type
  data.value[row.value].describer = mate.value.describer
  data.value[row.value].amount = mate.value.amount
  data.value[row.value].munit = mate.value.munit
  data.value[row.value].price = mate.value.price
  data.value[row.value].pricesum = mate.value.pricesum
  console.log(data.value[row.value])
}

// 添加按钮
const inser = () => {
  header.value = "添加物料"
  materialCompositionDesignListNumber().then(item => {
    mate.value.design = item.data
  })
  mate.value.mid = ""
  mate.value.designname = ""
  mate.value.type = ""
  mate.value.describer = ""
  mate.value.amount = ""
  mate.value.munit = ""
  mate.value.price = ""
  mate.value.pricesum = ""
  visible.value = true
}

// 添加物料
const insert = () => {
  data.value.push({
    mid: mate.value.mid,
    design: mate.value.design,
    designname: mate.value.designname,
    type: mate.value.type,
    describer: mate.value.describer,
    amount: mate.value.amount,
    munit: mate.value.munit,
    price: mate.value.price,
    pricesum: mate.value.pricesum
  })
  mate.value.mid = ""
  mate.value.design = ""
  mate.value.designname = ""
  mate.value.type = ""
  mate.value.describer = ""
  mate.value.amount = ""
  mate.value.munit = ""
  mate.value.price = ""
  mate.value.pricesum = ""
  visible.value = false
}

// 删除物料
const remove = () => {
  data.value.splice(row.value,1)
  visible.value = false
}
obtainAproductNumber().then(item => {
  design.value.pid = item.data
})

const leftFixedColumn = ref(2);
const columns = ref([
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

// 双击
const dblclick = (col: any) => {
  row.value = col.index
  mate.value.mid = data.value[col.index].mid
  mate.value.design = data.value[col.index].design
  mate.value.designname = data.value[col.index].designname
  mate.value.type = data.value[col.index].type
  mate.value.describer = data.value[col.index].describer
  mate.value.amount = data.value[col.index].amount
  mate.value.munit = data.value[col.index].munit
  mate.value.price = data.value[col.index].price
  mate.value.pricesum = data.value[col.index].pricesum
  visible.value = true
}

const addFile = () => {
  console.log(design)
  addSysFile().then(item => {
    console.log(item)
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      design.value.fid = item.data
      for (let i=0;i<data.value.length;i++){
        addSysMaterials(data.value[i]).then(item => {
          console.log(item)
          if (item.code === 200){
            MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
            design.value.fid = item.data
            reset()
          }else{
            console.log(item)
            MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
          }
        })
      }
    }else{
      console.log(item)
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }
  })
}

const reset = () => {
  data.value = []
  design.value.name = ""
  design.value.fid = ""
  design.value.aid = ""
  design.value.bid = ""
  design.value.cid = ""
  design.value.type = ""
  design.value.unit = ""
  design.value.grou = ""
  design.value.costprice = ""
  design.value.listprice = ""
  design.value.descr = ""
  selectSysHeroAList().then(item => {
    for (let i=0;i<item.data.length;i++){
      datas.value.heroA.push({ label: item.data[i].aname, value: item.data[i].aid })
    }
  })
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
