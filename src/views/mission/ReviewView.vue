<template>
  <t-col :span="12">
    <t-row id="message-toggle" style="height: 89vh">
<!--      <t-col>-->
<!--        <t-drawer-->
<!--            v-model:visible="visible"-->
<!--            header="物料审核"-->
<!--            :on-overlay-click="() => (visible = false)"-->
<!--            :placement="placements"-->
<!--            @cancel="visible = false" size="25%" @confirm="examine"-->
<!--        >-->
<!--          <t-col :span="12">-->
<!--            <t-input  placeholder="请输入内容" />-->
<!--          </t-col>-->

<!--          <t-col :span="12">-->
<!--            <t-input  placeholder="请输入内容" />-->
<!--          </t-col>-->

<!--          <t-row>-->
<!--            <t-col :span="12">-->
<!--              <t-input   placeholder="请输入内容" />-->
<!--            </t-col>-->
<!--          </t-row>-->

<!--        </t-drawer>-->
<!--      </t-col>-->
      <t-col :span="12">
        <t-row class="row">
          <t-col :span="12">
            <h3>待复核产品档案：{{data.current}}/{{data.total}}</h3>
          </t-col>
          <t-col :span="12" class="col"><t-input label="设计单编号：" v-model="page.pid" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="产品名称：" v-model="page.name" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="设计人：" v-model="page.register" size="large" disabled/></t-col>
          <t-col :span="6" class="col"><t-input label="审核人：" v-model="page.checker" size="large" disabled/></t-col>
          <t-col :span="6" class="col">
            <t-input label="物料总成本：" v-model="page.total" size="large" disabled/>
          </t-col>
          <t-col :span="12" class="col">
            <t-textarea placeholder="产品描述" status="success" v-model="page.descr" size="large" disabled/>
          </t-col>

          <t-col :span="12">
            <t-list style="height: 30vh">
              <t-table v-model:columns="columns" :data="materials" v-on:row-dblclick="dblclick" :hover="true"/>
            </t-list>
          </t-col>
        </t-row>
      </t-col>

      <t-col :span="12">
        <t-radio-group :value="page.checktag" v-model="page.checktag" @change="onChange" class="group">
          <t-radio value="S001-1">通过</t-radio>
          <t-radio value="S001-2">未通过</t-radio>
        </t-radio-group>
      </t-col>

      <t-col :span="12">
        <t-row style="margin: 20px">
          <t-col :span="2">
            <t-button style="width: 100%" @click="previous">上一项</t-button>
          </t-col>
          <t-col :span="3"></t-col>
          <t-col :span="2">
            <t-button style="width: 100%" @click="examines">确认提交</t-button>
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
import {examineSysFile, queryPageSysFile} from "@/http/design/sysFile"
import {sysFileStore} from "@/store/design/file/index"
import {userStore} from "@/store/user";
import {MessagePlugin} from "tdesign-vue-next";
import {pageSysHeroA} from "@/http/design/sysheroA";

const data = ref(sysFileStore().page.data)
const page = ref(sysFileStore().page)
const materials = ref(sysFileStore().page.materials)
const visible = ref(false)
const placements = "right"

page.value.checker = userStore().account.ename

const queryPage = () => {
  data.value = []
  materials.value = []
  queryPageSysFile().then(item => {
    if (item.data.records.length > 0){
      data.value = item.data
      materials.value = item.data.records[0].materials
      page.value.fid = item.data.records[0].fid
      page.value.name = item.data.records[0].name
      page.value.pid = item.data.records[0].pid
      page.value.register = item.data.records[0].register
      page.value.descr = item.data.records[0].descr
      console.log(materials.value)

      for (let i=0;i<item.data.records[0].materials.length;i++){
        page.value.total += item.data.records[0].materials[i].priceSum
      }
    }else{
      page.value.fid = ""
      page.value.name = ""
      page.value.pid = ""
      page.value.register = ""
      page.value.descr = ""
    }
  })
}
queryPage()

const previous = () => {
  page.value.size ++
  if (page.value.size >= data.value.total){
    page.value.size = data.value.total
  }
  queryPage()
}

const nextItem = () => {
  page.value.size --
  if (page.value.size <= 0){
    page.value.size = 1
  }
  queryPage()
}

const examine = () => {
  visible.value = false
}

/*
 审核提交
 */
const examines = () => {
  if (page.value.checktag == ""){
    MessagePlugin.error({content: "审核未选择", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  examineSysFile().then(item => {
    if (item.code === 200){
      queryPage()
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }
  })
}

const leftFixedColumn = ref(2);
const columns = ref([
  { colKey: 'design', title: '物料编号',align: 'center',width: '250px' ,fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'designName', title: '物料名称',align: 'center',width: '120px'},
  { colKey: 'type', title: '用途类型',align: 'center',width: '120px'},
  { colKey: 'type', title: '描述',align: 'center',width: '120px'},
  { colKey: 'amount', title: '数量',align: 'center',width: '120px'},
  { colKey: 'munit', title: '单位',align: 'center',width: '120px'},
  { colKey: 'price', title: '单价（元）',align: 'center',width: '120px'},
  { colKey: 'priceSum', title: '小计（元）',align: 'center',width: '120px'},
]);

// 关闭
const  drawerClose = () => {
  visible.value = false
}

const dblclick = (row: any) => {
  console.log(row)
  // visible.value = true
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
