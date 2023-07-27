<template>
  <t-drawer v-model:visible="visible" size="medium" :header="header" :on-confirm="drawerClose" :close-btn="true">
    <t-row>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">流程组成设计单号：</span>
          <t-input type="text" class="ranges" disabled />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">设计人：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">登记人：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">复核人：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">物流名称：</span>
          <t-select type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">单位：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">数量：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">可用数量：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">单价：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">物流总成本：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">描述：</span>
          <t-textarea type="text" class="ranges"  />
        </t-input-group>
      </t-col>
    </t-row>
    <template #footer>
      <t-button>修改</t-button>
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
              <span class="title">设计单号：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的产品编号"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">产品名称：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的产品名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">设计人：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的产品名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">登记人：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的出生地址"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">复核人：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的产品名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">审核状态：</span>
              <t-select type="text" class="range" placeholder="请选择您要查询的审核状态"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">物流名称：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的产物流名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">用途类型：</span>
              <t-select type="text" class="range" placeholder="请选择您要查询的用途类型"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">计量单位：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">数量：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">可用数量：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>


            <t-input-group class="group">
              <span class="title">单价：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">物流成本：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>
          </t-list>
        </t-col>

        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary" >搜索</t-button>
          <t-button class="btn-but" theme="warning" >重置</t-button>
          <t-button class="btn-but" theme="success" @click="visible = true">添加</t-button>
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

const data = []
const header = ref("修改信息")
const visible = ref(false)

for (let i = 1; i <= 11; i++) {
  data.push({
    mid: i,
    pid: 'ADAWD'+i*10,
    design: 'AD100001AD1001'+i,
    designer: '大大'+i,
    register: '登记人'+i,
    registerime: '2022-10-0'+i,
    checker: '复核人'+i,
    status: 'S001-1',
    designname: 'XXX产品'+i,
    checktag: 'S001-0',
    type: 'XX',
    munit: '200m',
    amount: i*10,
    residual: i*20,
    price: i*100,
    pricesum: '2000'+i,
    created:'2022-10-0'+i,
    updated:'2022-10-0'+i,
    file: {
      name: '产品'+i
    }
  });
}
const leftFixedColumn = ref(2);
const placement = ref('top-left');
const customText = ref(false);
const columns = ref([
  { colKey: 'mid', title: '序号',align: 'center',width: '80px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'design', title: '流程组成设计单号',align: 'center',width: '250px' ,fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'designer', title: '设计人',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'register', title: '登记人',align: 'center',width: '120px'},
  { colKey: 'registerime', title: '登记时间',align: 'center',width: '120px'},
  { colKey: 'checker', title: '复核人',align: 'center',width: '120px'},
  { colKey: 'status', title: '审核状态',align: 'center',width: '120px'},
  { colKey: 'designname', title: '物流名称',align: 'center',width: '120px'},
  { colKey: 'type', title: '用途类型',align: 'center',width: '120px'},
  { colKey: 'munit', title: '单位',align: 'center',width: '120px'},
  { colKey: 'amount', title: '数量',align: 'center',width: '120px'},
  { colKey: 'residual', title: '可用数量',align: 'center',width: '120px'},
  { colKey: 'price', title: '单价',align: 'center',width: '120px'},
  { colKey: 'pricesum', title: '物流总成本',align: 'center',width: '120px'},
  { colKey: 'created', title: '创建时间',align: 'center',width: '120px'},
  { colKey: 'updated', title: '更新时间',align: 'center',width: '120px'},
  { colKey: 'file.name', title: '产品名称',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined}
]);

// 单选
const selectedRowKeys = ref([1]);
// 双击
const dblclick = (row: any) => {
  console.log(row)
  visible.value = true
}
// 关闭
const  drawerClose = () => {
  visible.value = false
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
    margin: 8px;
  }
  .btn-job{

    width: 133px;
    margin: 8px;
  }
}
.page{
  margin: 10px;
}
.range{
  width: 155px;
}
</style>
