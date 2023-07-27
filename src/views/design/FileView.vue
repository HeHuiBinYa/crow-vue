<template>
  <t-drawer v-model:visible="visible" size="medium" :header="header" :on-confirm="drawerClose" :close-btn="true">
    <t-row>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">序号：</span>
          <t-input type="text" class="ranges" disabled />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">产品编号：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">产品名称：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">一级分类：</span>
          <t-select type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">二级分类：</span>
          <t-select type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">三级分类：</span>
          <t-select type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">用途类型：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">计量单位：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">供应商集合：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">成本单价：</span>
          <t-input type="text" class="ranges"  />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">市场单价：</span>
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
          <span class="titles">产品描述：</span>
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
              <span class="title">产品编号：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的产品编号"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">产品名称：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的产品名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">供应商：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的出生地址"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">一级分类：</span>
              <t-select type="text" class="range" placeholder="请选择您要查询的一级分类"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">二级分类：</span>
              <t-select type="text" class="range" placeholder="请选择您要查询的二级分类"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">三级分类：</span>
              <t-select type="text" class="range" placeholder="请选择您要查询的三级分类"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">用途类型：</span>
              <t-select type="text" class="range" placeholder="请选择您要查询的三级分类"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">计量单位：</span>
              <t-select type="text" class="range" placeholder="请选择您要查询的三级分类"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">登记人：</span>
              <t-select type="text" class="range" placeholder="请选择您要查询的复核人"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">复核人：</span>
              <t-select type="text" class="range" placeholder="请选择您要查询的复核人"/>
            </t-input-group>


            <t-input-group class="group">
              <span class="title">复核时间：</span>
              <t-date-range-picker class="range"  mode="month"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">成本价格：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">市场价格：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">审核标志：</span>
              <t-date-range-picker class="range"  mode="month"/>
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

const data = []
const header = ref("修改信息")
const visible = ref(false)

for (let i = 1; i <= 11; i++) {
  data.push({
    fid: i,
    pid: 'ADAWD'+i*10,
    name: '产品'+i,
    descr: '啊大大',
    heroA: {
      cname: '药品'
    },
    heroB: {
      cname: '保健药品'
    },
    heroC: {
      cname: '维C'
    },
    type: 'XXX',
    unit: '100m',
    grou: '供应商',
    costprice: (i*100)+'元',
    listprice: (i*100)+'元',
    register: '登记人'+i,
    checker: '复核人'+i,
    checktime: '2022-08-10',
    checktag: 'S001-0',
    created: '2022-08-10',
    updated: '2022-08-10',
  });
}
const leftFixedColumn = ref(2);
const placement = ref('top-left');
const customText = ref(false);
const columns = ref([
  { colKey: 'fid', title: '序号',align: 'center',width: '80px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'pid', title: '产品编号',align: 'center',width: '120px' ,fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'name', title: '产品名称',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'heroA.cname', title: '一级分类',align: 'center',width: '120px'},
  { colKey: 'heroB.cname', title: '二级分类',align: 'center',width: '120px'},
  { colKey: 'heroC.cname', title: '三级分类',align: 'center',width: '120px'},
  { colKey: 'type', title: '用途类型',align: 'center',width: '120px'},
  { colKey: 'unit', title: '计量单位',align: 'center',width: '120px'},
  { colKey: 'grou', title: '供应商集合',align: 'center',width: '120px'},
  { colKey: 'costprice', title: '成本单价',align: 'center',width: '120px'},
  { colKey: 'listprice', title: '市场单价',align: 'center',width: '120px'},
  { colKey: 'register', title: '登记人',align: 'center',width: '120px'},
  { colKey: 'checker', title: '复核人',align: 'center',width: '120px'},
  { colKey: 'checktime', title: '复核时间',align: 'center',width: '120px'},
  { colKey: 'checktag', title: '审核标志',align: 'center',width: '120px'},
  { colKey: 'created', title: '创建时间',align: 'center',width: '120px'},
  { colKey: 'updated', title: '更新时间',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined}
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
    width: 100px;
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
