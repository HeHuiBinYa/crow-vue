<template>
  <t-row style="height: 89vh">
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <t-list style="height: 16vh">
            <t-input-group class="group">
              <span class="title">派工单号：</span>
              <t-input type="text" class="range" v-model="ManufactureVo.manufactureid" placeholder="请输入您要查询的产品编号"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">产品编号：</span>
              <t-input type="text" class="range" v-model="ManufactureVo.maproductid" placeholder="请输入您要查询的产品名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">产品名称：</span>
              <t-input type="text" class="range" v-model="ManufactureVo.maproductname" placeholder="请输入您要查询的产品名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">设计人：</span>
              <t-input type="text" class="range" v-model="ManufactureVo.madesigner" placeholder="请输入您要查询的出生地址"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">审核人：</span>
              <t-input type="text" class="range" v-model="ManufactureVo.machecker" placeholder="请输入您要查询的产品名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">投产数量：</span>
              <t-input :style="{ width: '118px' }"  v-model="ManufactureVo.startMaamount" />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  v-model="ManufactureVo.endMaamount"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">合格数量：</span>
              <t-input :style="{ width: '118px' }"  v-model="ManufactureVo.startMatesteramount"/>
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }" v-model="ManufactureVo.endMatesteramount"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">审核标志：</span>
              <t-select type="text" :options="auditMark" v-model="ManufactureVo.machecktag" class="range" placeholder="请选择您要查询的审核状态"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">生产标志：</span>
              <t-select type="text" class="range" v-model="ManufactureVo.manufacturepriceduretag" :options="constAuditMark" placeholder="请选择您要查询的审核状态"/>
            </t-input-group>
          </t-list>
        </t-col>

        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary" @click="searchManufactureVo">搜索</t-button>
          <t-button class="btn-but" theme="warning" @click="reset">重置</t-button>
        </t-col>

        <t-col :span="12">
          <t-drawer v-model:visible="visible" size="50%" :header="header" :close-on-overlay-click="false" :on-confirm="drawerClose"  :close-btn="true">
            <t-drawer v-model:visible="visibles" size="90%" :header="header"  :on-confirm="drawerCloses" :close-btn="true">
              <t-row>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">工序序号：</span>
                    <t-input type="text"  class="ranges" v-model="procedure.prdetailsnumber" disabled />
                  </t-input-group>
                </t-col>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">工序编号：</span>
                    <t-input type="text"  class="ranges" v-model="procedure.prprocedureid" disabled />
                  </t-input-group>
                </t-col>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">工序名称：</span>
                    <t-input type="text" v-model:value="procedure.procedurename" class="ranges"  />
                  </t-input-group>
                </t-col>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">设计工时数：</span>
                    <t-input type="text" v-model:value="procedure.prlabourhouramount" class="ranges"/>
                  </t-input-group>
                </t-col>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">实际工时数：</span>
                    <t-input type="text" v-model:value="procedure.prreallabourhouramount" class="ranges"  />
                  </t-input-group>
                </t-col>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">设计工时成本：</span>
                    <t-input type="text" v-model:value="procedure.prsubtotal" class="ranges"  />
                  </t-input-group>
                </t-col>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">实际工时成本：</span>
                    <t-input type="text" v-model:value="procedure.prrealsubtotal" class="ranges"  />
                  </t-input-group>
                </t-col>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">设计物料成本：</span>
                    <t-input type="text" v-model:value="procedure.prmodulesubtotal" class="ranges"  />
                  </t-input-group>
                </t-col>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">实际物料成本：</span>
                    <t-input type="text" v-model:value="procedure.prrealmodulesubtotal" class="ranges"  />
                  </t-input-group>
                </t-col>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">单位工时成本：</span>
                    <t-input type="text" v-model:value="procedure.prcostprice" class="ranges"  />
                  </t-input-group>
                </t-col>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">工序投产数量：</span>
                    <t-input type="text" v-model:value="procedure.prdemandamount" class="ranges"  />
                  </t-input-group>
                </t-col>
                <t-col :span="6">
                  <t-input-group class="groups">
                    <span class="titles">工序合格数量：</span>
                    <t-input type="text" v-model:value="procedure.prrealamount" class="ranges"  />
                  </t-input-group>
                </t-col>
              </t-row>
              <template #footer>
                <t-button theme="default" v-if="bool == false" @click="insertProcedure">添加工序</t-button>
                <t-button v-if="bool == true" @click="updProcedure">修改工序</t-button>
                <t-button theme="danger" v-if="bool == true" @click="delProcedure">删除工序</t-button>
                <t-button variant="outline" @click="visibles = false"> 取消 </t-button>
              </template>
            </t-drawer>

            <t-row>
              <t-col :span="12">
                <t-row class="row">
                  <t-col :span="6" class="col"><t-input label="派工单编号：" size="large" v-model="manufacture.manufactureid" disabled/></t-col>
                  <t-col :span="6" class="col"><t-input label="产品编号：" size="large" v-model="manufacture.maproductid" disabled/></t-col>
                  <t-col :span="6" class="col"><t-input label="产品名称：" size="large" v-model="manufacture.maproductname"/></t-col>
                  <t-col :span="6" class="col"><t-input label="投产数量：" size="large" v-model="manufacture.maamount"/></t-col>
                  <t-col :span="6" class="col"><t-input label="合格数量：" size="large" v-model="manufacture.matesteramount"/></t-col>
                  <t-col :span="6" class="col"><t-input label="工单制定人："  size="large" v-model="manufacture.madesigner"/></t-col>
                  <t-col :span="6" class="col"><t-input label="设计物料总成本："  suffix="元" v-model="manufacture.mamodulecostpricesum" size="large"/></t-col>
                  <t-col :span="6" class="col"><t-input label="实际物料总成本："   suffix="元" v-model="manufacture.marealmodulecostpricesum" size="large" /></t-col>
                  <t-col :span="6" class="col"><t-input label="设计工时总成本："  suffix="元" v-model="manufacture.malabourcostpricesum" size="large"/></t-col>
                  <t-col :span="6" class="col"><t-input label="实际工时总成本："   suffix="元"  v-model="manufacture.mareallabourcostpricesum" size="large" /></t-col>
                  <t-col :span="12" class="col">
                    <t-textarea placeholder="产品描述" size="large" v-model="manufacture.maproductdescribe"/>
                  </t-col>
                  <t-col :span="12">
                    <t-button  @click="hearc">添加生产工序</t-button>
                    <t-list>
                      <t-table v-model:columns="columnsManufacture" v-model:data="manufacture.data"  v-on:row-dblclick="dblclicks" :hover="true"/>
                    </t-list>
                  </t-col>
                </t-row>
              </t-col>
            </t-row>
            <template #footer>
              <t-button @click="upd">修改</t-button>
              <t-button theme="warning" @click="updyMachecktag">设计重新审核</t-button>
              <t-button theme="warning" @click="updyManufacturepricedureTag">完工重新审核</t-button>
              <t-button variant="outline" @click="visible = false"> 取消 </t-button>
            </template>
          </t-drawer>
        </t-col>
      </t-row>
    </t-col>

    <t-col :span="12">
      <t-list>
        <t-table
            row-key="eid" :data="data.records" :columns="columns"
             select-on-row-click
            v-on:row-dblclick="dblclick"
            :column-controller="{
               placement,
               fields: ['maid', 'manufactureid', 'maproductid', 'maproductname', 'maamount', 'matesteramount',
                'mamodulecostpricesum', 'marealmodulecostpricesum', 'malabourcostpricesum', 'mareallabourcostpricesum',
                'madesigner', 'maregistertime', 'machecker',
                'machecktime', 'machecktag', 'manufacturepriceduretag'],
               dialogProps: { preventScrollThrough: true },
               buttonProps: customText ? { content: '显示列控制', theme: 'primary', variant: 'base' } : undefined,
            }"
            hover="true"/>
      </t-list>
    </t-col>
    <t-col :span="12">
      <t-pagination class="page" v-model="ManufactureVo.size"
                    :page-size="ManufactureVo.sizePage"
                    :total="data.total"
                    @change="onChange"
                    @page-size-change="onPageSizeChange"
                    :max-page-btn="5" :folded-max-page-btn="5" :show-page-size="false"/>
    </t-col>

  </t-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {
  queryManufactureVo,
  updateManufactureById,
  updateManufactureByMachecktag,
  updateManufactureByManufacturepricedureTag
} from "@/http/product/manufacture"
import { MessagePlugin } from 'tdesign-vue-next';
import {manufactureStore} from "@/store/product/manufacture";
import {sysFileStore} from "@/store/design/file";
import {
  deleteProcedureById,
  getProcedure1,
  getProcedure2,
  insertNowProcedure,
  updateProcedure
} from "@/http/product/procedure";

const auditMark = [
  { label : "等待审核", value: "S001-0" },
  { label : "审核通过", value: "S001-1" },
  { label : "审核不通过", value: "S001-2" },
]

const constAuditMark = [
  { label : "待登记", value: "S002-0" },
  { label : "未完工", value: "S002-1" },
  { label : "已完工", value: "S002-2" },
]

const ManufactureVo = ref(manufactureStore().queryManufacture.queryManufactureVo)
const data = ref(manufactureStore().queryManufacture.data)
const manufacture = ref(manufactureStore().queryManufacture.manufacture)
const bool = ref(false)
const procedure = ref(manufactureStore().queryManufacture.procedure)

const searchManufactureVo = () => {
  data.value = []
  queryManufactureVo().then(item => {
    data.value = item.data
  })
}
searchManufactureVo()

const header = ref("修改信息")
const visible = ref(false)
const visibles = ref(false)

const leftFixedColumn = ref(2);
const placement = ref('top-left');
const customText = ref(false);
const columns = ref([
  { colKey: 'maid', title: '序号',align: 'center',width: '80px'},
  { colKey: 'manufactureid', title: '派工单编号',align: 'center',width: '250px' },
  { colKey: 'maproductid', title: '产品编号',align: 'center',width: '280px'},
  { colKey: 'maproductname', title: '产品名称',align: 'center',width: '280px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'maamount', title: '投产数量',align: 'center',width: '140px'},
  { colKey: 'matesteramount', title: '合格数量',align: 'center',width: '140px'},
  { colKey: 'mamodulecostpricesum', title: '设计物料总成本',align: 'center',width: '140px'},
  { colKey: 'marealmodulecostpricesum', title: '实际物料总成本',align: 'center',width: '140px'},
  { colKey: 'malabourcostpricesum', title: '设计工时总成本',align: 'center',width: '140px'},
  { colKey: 'mareallabourcostpricesum', title: '实际工时总成本',align: 'center',width: '140px'},
  { colKey: 'madesigner', title: '工单设计人',align: 'center',width: '120px'},
  { colKey: 'maregistertime', title: '登记时间',align: 'center',width: '120px'},
  { colKey: 'machecker', title: '审核人',align: 'center',width: '120px'},
  { colKey: 'machecktime', title: '审核时间',align: 'center',width: '120px'},
  { colKey: 'machecktag', title: '审核标志',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
  { colKey: 'manufacturepriceduretag', title: '生产过程标志',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined}
]);

const columnsManufacture = ref([
  { colKey: 'prdetailsnumber', title: '工序序号',align: 'center',width: '280px'},
  { colKey: 'prprocedureid', title: '工序编号',align: 'center',width: '250px' },
  { colKey: 'procedurename', title: '工序名称',align: 'center',width: '280px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'prlabourhouramount', title: '设计工时数',align: 'center',width: '140px'},
  { colKey: 'prreallabourhouramount', title: '实际工时数',align: 'center',width: '140px'},
  { colKey: 'prsubtotal', title: '设计工时成本',align: 'center',width: '140px'},
  { colKey: 'prrealsubtotal', title: '实际工时成本',align: 'center',width: '140px'},
  { colKey: 'prmodulesubtotal', title: '设计物料成本',align: 'center',width: '140px'},
  { colKey: 'prrealmodulesubtotal', title: '实际物料成本',align: 'center',width: '140px'},
  { colKey: 'prcostprice', title: '单位工时成本',align: 'center',width: '140px'},
  { colKey: 'prdemandamount', title: '工序投产数量',align: 'center',width: '120px'},
  { colKey: 'prrealamount', title: '工序合格数量',align: 'center',width: '120px'},
  ]);

// 双击
const dblclick = (row: any) => {
  manufacture.value.data = []

  manufacture.value.maid = data.value.records[row.index].maid
  manufacture.value.manufactureid = data.value.records[row.index].manufactureid
  manufacture.value.maproductid = data.value.records[row.index].maproductid
  manufacture.value.maproductname = data.value.records[row.index].maproductname
  manufacture.value.maamount = data.value.records[row.index].maamount
  manufacture.value.matesteramount = data.value.records[row.index].matesteramount
  manufacture.value.madesigner = data.value.records[row.index].madesigner
  manufacture.value.mamodulecostpricesum = data.value.records[row.index].mamodulecostpricesum
  manufacture.value.marealmodulecostpricesum = data.value.records[row.index].marealmodulecostpricesum
  manufacture.value.malabourcostpricesum = data.value.records[row.index].malabourcostpricesum
  manufacture.value.mareallabourcostpricesum = data.value.records[row.index].mareallabourcostpricesum
  manufacture.value.maproductdescribe = data.value.records[row.index].maproductdescribe
  manufacture.value.data = data.value.records[row.index].procedures

  visible.value = true
}
const dblclicks = (row: any) => {
  procedure.value.prdetailsnumber = manufacture.value.data[row.index].prdetailsnumber
  procedure.value.prprocedureid = manufacture.value.data[row.index].prprocedureid
  procedure.value.procedurename = manufacture.value.data[row.index].procedurename
  procedure.value.prlabourhouramount = manufacture.value.data[row.index].prlabourhouramount
  procedure.value.prreallabourhouramount = manufacture.value.data[row.index].prreallabourhouramount
  procedure.value.prsubtotal = manufacture.value.data[row.index].prsubtotal
  procedure.value.prrealsubtotal = manufacture.value.data[row.index].prrealsubtotal
  procedure.value.prmodulesubtotal = manufacture.value.data[row.index].prmodulesubtotal
  procedure.value.prrealmodulesubtotal = manufacture.value.data[row.index].prrealmodulesubtotal
  procedure.value.prcostprice = manufacture.value.data[row.index].prcostprice
  procedure.value.prdemandamount = manufacture.value.data[row.index].prdemandamount
  procedure.value.prrealamount = manufacture.value.data[row.index].prrealamount
  procedure.value.prid = manufacture.value.data[row.index].prid
  visibles.value = true
  bool.value = true
}
// 关闭
const  drawerClose = () => {
  drawerCloses()
  visible.value = false
}
const  drawerCloses = () => {
  visibles.value = false
}

const onPageSizeChange = (size: any) => {
  ManufactureVo.value.size = size.index
};

const onChange = (pageInfo: any) => {
  searchManufactureVo()
};

const hearc = () => {
  getProcedure1().then(item => {
    procedure.value.prdetailsnumber  = item.data
  })
  getProcedure2().then(item => {
    procedure.value.prprocedureid = item.data
  })
  procedure.value.procedurename = ""
  procedure.value.prlabourhouramount = ""
  procedure.value.prreallabourhouramount = ""
  procedure.value.prsubtotal = ""
  procedure.value.prrealsubtotal = ""
  procedure.value.prmodulesubtotal = ""
  procedure.value.prrealmodulesubtotal = ""
  procedure.value.prcostprice = ""
  procedure.value.prdemandamount = ""
  procedure.value.prrealamount = ""
  bool.value = false
  visibles.value = true
}

const reset = () => {
  ManufactureVo.value.manufactureid = ""
  ManufactureVo.value.maproductid = ""
  ManufactureVo.value.maproductname = ""
  ManufactureVo.value.madesigner = ""
  ManufactureVo.value.machecker = ""
  ManufactureVo.value.startMaamount = ""
  ManufactureVo.value.endMaamount = ""
  ManufactureVo.value.startMatesteramount = ""
  ManufactureVo.value.endMatesteramount = ""
  ManufactureVo.value.machecktag = ""
  ManufactureVo.value.manufacturepriceduretag = ""
  searchManufactureVo()
}

const upd = () => {
  updateManufactureById().then(item => {
    if (item.code === 200){
      visible.value = false
      searchManufactureVo()
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}

const updyMachecktag = () => {
  updateManufactureByMachecktag().then(item => {
    if (item.code === 200){
      visible.value = false
      searchManufactureVo()
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}

const updyManufacturepricedureTag = () => {
  updateManufactureByManufacturepricedureTag().then(item => {
    if (item.code === 200){
      visible.value = false
      searchManufactureVo()
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}

const insertProcedure = () => {
  insertNowProcedure().then(item => {
    if (item.code === 200){
      visibles.value = false
      visible.value = false
      searchManufactureVo()
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}

const delProcedure = () => {
  deleteProcedureById().then(item => {
    if (item.code === 200){
      visibles.value = false
      visible.value = false
      searchManufactureVo()
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}

const updProcedure = () => {
  updateProcedure().then(item => {
    if (item.code === 200){
      visibles.value = false
      visible.value = false
      searchManufactureVo()
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}
</script>

<style lang="scss" scoped>
.group{
  margin: 10px;
  .title{
    width: 80px;
    text-align: right;
    line-height: 30px;
  }
  .range{
    width: 250px;
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
  margin-top: 5px;
  .btn-but{
    margin: 0px 10px 10px 38px;
  }
  .btn-job{
    width: 133px;
    margin: 8px;
  }
}
.page{
  margin: 5px;
}
.range{
  width: 155px;
}
.row{
  margin: 10px;
  .col{
    margin: 0px 0px 10px 0px;
  }
}
</style>
