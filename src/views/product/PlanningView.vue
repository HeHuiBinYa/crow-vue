<template>
  <t-drawer v-model:visible="visible" size="50%" :header="header" :close-on-overlay-click="false" :on-confirm="drawerClose"  :close-btn="true">
    <t-drawer v-model:visible="visibles" size="90%" :header="header"  :on-confirm="drawerCloses" :close-btn="true">
      <t-row>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">工序序号：</span>
            <t-input type="text" class="ranges" disabled />
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">工序编号：</span>
            <t-input type="text" class="ranges" disabled />
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">物料名称：</span>
            <t-input type="text" class="ranges"  />
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">工序名称：</span>
            <t-input type="text" class="ranges"  />
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">设计工时数：</span>
            <t-input type="text" class="ranges"/>
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">实际工时数：</span>
            <t-input type="text" class="ranges"  />
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">设计工时成本：</span>
            <t-input type="text" class="ranges"  />
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">实际工时成本：</span>
            <t-input type="text" class="ranges"  />
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">设计物料成本：</span>
            <t-input type="text" class="ranges"  />
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">实际物料成本：</span>
            <t-input type="text" class="ranges"  />
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">单位工时成本：</span>
            <t-input type="text" class="ranges"  />
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">工序投产数量：</span>
            <t-input type="text" class="ranges"  />
          </t-input-group>
        </t-col>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">工序合格数量：</span>
            <t-input type="text" class="ranges"  />
          </t-input-group>
        </t-col>
        <t-col :span="12">
          <t-button class="but">工序物料添加</t-button>
          <t-list>
            <t-table v-model:columns="columns" v-model:data="data" :hover="true"/>
          </t-list>
        </t-col>
      </t-row>
      <template #footer>
        <t-button theme="default">添加工序</t-button>
        <t-button >修改工序</t-button>
        <t-button theme="danger">删除工序</t-button>
        <t-button variant="outline" @click="visibles = false"> 取消 </t-button>
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
            <t-list>
              <t-table v-model:columns="columns" v-model:data="data" v-on:row-dblclick="dblclicks" :hover="true"/>
            </t-list>
          </t-col>
        </t-row>
      </t-col>
    </t-row>
    <template #footer>
      <t-button>修改</t-button>
      <t-button theme="warning">重新审核</t-button>
      <t-button theme="danger">删除</t-button>
      <t-button variant="outline" @click="visible = false"> 取消 </t-button>
    </template>
  </t-drawer>

  <t-row style="height: 89vh">
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <t-list style="height: 16vh">
            <t-input-group class="group">
              <span class="title">派工单号：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的产品编号"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">产品编号：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的产品名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">产品名称：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的产品名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">登记人：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的出生地址"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">审核人：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的产品名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">投产数量：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">合格数量：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">审核标志：</span>
              <t-select type="text" :options="auditMark" class="range" placeholder="请选择您要查询的审核状态"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">生产标志：</span>
              <t-select type="text" class="range" :options="constAuditMark" placeholder="请选择您要查询的审核状态"/>
            </t-input-group>
          </t-list>
        </t-col>

        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary" >搜索</t-button>
          <t-button class="btn-but" theme="warning" >重置</t-button>
        </t-col>
      </t-row>
    </t-col>

    <t-col :span="12">
      <t-list>
        <t-table
            row-key="eid" :data="data" :columns="columns"
            :selected-row-keys="selectedRowKeys" select-on-row-click
            v-on:row-dblclick="dblclick"
            :column-controller="{
               placement,
               fields: ['fid', 'pid', 'heroA.cname', 'heroB.cname', 'heroC.cname', 'type',
                'unit', 'grou', 'costprice', 'listprice', 'register', 'checker', 'checktime',
                'checktag', 'created', 'updated'],
               dialogProps: { preventScrollThrough: true },
               buttonProps: customText ? { content: '显示列控制', theme: 'primary', variant: 'base' } : undefined,
            }"
            hover="true"/>
      </t-list>
    </t-col>
    <t-col :span="12">
      <t-pagination class="page" v-model="current" v-model:pageSize="pageSize" :total="100"
                    @change="onChange" @page-size-change="onPageSizeChange"
                    @current-change="onCurrentChange" :show-page-size="false"/>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const auditMark = [
  { label : "等待审核", value: "S001-0" },
  { label : "审核通过", value: "S001-1" },
  { label : "审核不通过", value: "S001-2" },
]

const constAuditMark = [
  { label : "待登记", value: "S001-0" },
  { label : "未完工", value: "S001-1" },
  { label : "已完工", value: "S001-2" },
]

const data = []
const header = ref("修改信息")
const visible = ref(false)
const visibles = ref(false)

for (let i = 1; i <= 11; i++) {
  data.push({
    maid: '序号'+i,
    manufactureid: '物料编号'+i*10,
    maproductid: '设计人'+i,
    maproductname: '登记人'+i,
    maamount: '2023-10-5-0'+i,
    matesteramount: '复核人'+i,
    maapplyidgroup: '生产计划序号组'+i,
    mamodulecostpricesum: i*200,
    marealmodulecostpricesum: i*150,
    malabourcostpricesum: i*150,
    mareallabourcostpricesum: i*150,
    madesigner: '工单制单人'+i,
    maregister: '登记人'+i,
    maregistertime: '2022-10-0'+i*2,
    machecker: '2000-10-0'+i*3,
    machecktime: '2022-10-0'+i,
    machecktag: 'S001-0',
    manufacturepriceduretag: 'S002-0',
  });
}
const leftFixedColumn = ref(2);
const placement = ref('top-left');
const customText = ref(false);
const columns = ref([
  { colKey: 'maid', title: '序号',align: 'center',width: '80px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'manufactureid', title: '派工单编号',align: 'center',width: '250px' ,fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'maproductid', title: '产品编号',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'maproductname', title: '产品名称',align: 'center',width: '120px'},
  { colKey: 'maamount', title: '投产数量',align: 'center',width: '140px'},
  { colKey: 'matesteramount', title: '合格数量',align: 'center',width: '140px'},
  { colKey: 'maapplyidgroup', title: '生产计划序号组',align: 'center',width: '150px'},
  { colKey: 'mamodulecostpricesum', title: '设计物料总成本',align: 'center',width: '140px'},
  { colKey: 'marealmodulecostpricesum', title: '实际物料总成本',align: 'center',width: '140px'},
  { colKey: 'malabourcostpricesum', title: '设计工时总成本',align: 'center',width: '140px'},
  { colKey: 'mareallabourcostpricesum', title: '实际工时总成本',align: 'center',width: '140px'},
  { colKey: 'madesigner', title: '工单制定人',align: 'center',width: '120px'},
  { colKey: 'maregister', title: '登记人',align: 'center',width: '120px'},
  { colKey: 'maregistertime', title: '登记时间',align: 'center',width: '120px'},
  { colKey: 'machecker', title: '审核人',align: 'center',width: '120px'},
  { colKey: 'machecktime', title: '审核时间',align: 'center',width: '120px'},
  { colKey: 'machecktag', title: '审核标志',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
  { colKey: 'manufacturepriceduretag', title: '生产过程标志',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined}
]);

// 单选
const selectedRowKeys = ref([1]);
// 双击
const dblclick = (row: any) => {
  console.log(row)
  visible.value = true
}
const dblclicks = (row: any) => {
  console.log(row)
  visibles.value = true
}
// 关闭
const  drawerClose = () => {
  drawerCloses()
  visible.value = false
}
const  drawerCloses = () => {
  visibles.value = false
}

// 按钮
import { MessagePlugin } from 'tdesign-vue-next';

const current = ref(1);
const pageSize = ref(5);

const onPageSizeChange = (size: any) => {
  console.log('page-size:', size);
  MessagePlugin.success(`pageSize变化为${size}`);
};

const onCurrentChange = (index: any, pageInfo: any) => {
  MessagePlugin.success(`转到第${index}页`);
  console.log(pageInfo);
};

const onChange = (pageInfo: any) => {
  console.log(pageInfo);
};
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
