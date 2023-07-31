<template>
  <t-drawer v-model:visible="visible" size="medium" :header="header" :on-confirm="drawerClose" :close-btn="true">
    <t-row>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">工序序号：</span>
          <t-input type="text" class="ranges" disabled />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">工序编号：</span>
          <t-input type="text" class="ranges" disabled />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">物料名称：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">工序名称：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">设计工时数：</span>
          <t-input type="text" class="ranges"/>
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">实际工时数：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">设计工时成本：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">实际工时成本：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">设计物料成本：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">实际物料成本：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">单位工时成本：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">工序投产数量：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">工序合格数量：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
    </t-row>
    <template #footer>
      <t-button theme="default">添加工序</t-button>
      <t-button >修改工序</t-button>
      <t-button theme="danger">删除工序</t-button>
      <t-button variant="outline" @click="visible = false"> 取消 </t-button>
    </template>
  </t-drawer>

  <t-row>
    <t-col :span="12">
      <t-row class="row">
        <t-col :span="6" class="col"><t-input label="派工单编号：" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="产品编号：" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="产品名称：" size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="投产数量：" size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="合格数量：" size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="生产计划序号组：" size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="工单制定人："  size="large"/></t-col>
        <t-col :span="6" class="col"><t-input label="登记人："  size="large"/></t-col>
        <t-col :span="6" class="col"><t-input label="登记时间：" disabled size="large"/></t-col>
        <t-col :span="6" class="col"><t-input label="设计物料总成本："  suffix="元" size="large"/></t-col>
        <t-col :span="6" class="col"><t-input label="实际物料总成本："   suffix="元" size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="设计工时总成本："  suffix="元" size="large"/></t-col>
        <t-col :span="6" class="col"><t-input label="实际工时总成本："   suffix="元" size="large" /></t-col>
        <t-col :span="12" class="col">
          <t-textarea placeholder="产品描述" size="large"/>
        </t-col>
        <t-col :span="12">
          <t-button @click="visible=true">添加生产工序</t-button>
          <t-list style="height: 30vh">
            <t-table v-model:columns="columns" :close-on-overlay-click="false" v-model:data="data" v-on:row-dblclick="dblclick" :hover="true"/>
          </t-list>
        </t-col>
        <t-col :span="6">
          <t-button block theme="primary" class="btn">发布生产计划</t-button>
        </t-col>
        <t-col :span="6" >
          <t-button block theme="warning" class="btn">重置</t-button>
        </t-col>
      </t-row>
    </t-col>
  </t-row>
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
