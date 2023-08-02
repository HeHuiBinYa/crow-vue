<template>
  <t-row style="height: 89vh">
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <t-list style="height: 16vh">
            <t-input-group class="group">
              <span class="title">配置单号：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">产品名称：</span>
              <t-select :options="gender" class="range"  placeholder="请选择您要查询的性别"></t-select>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">当前库存：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">最大存储：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">审核状态：</span>
              <t-select :options="job" class="range" ></t-select>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">登记人：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">复核人：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的年龄"/>
            </t-input-group>
          </t-list>
        </t-col>

        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary" @click="search">搜索</t-button>
          <t-button class="btn-but" theme="warning" @click="reset">重置</t-button>
          <div style="width: 160px">
            <t-button class="but" @click="visible = true" block>添加安全库存</t-button>
          </div>
        </t-col>
      </t-row>
    </t-col>

    <t-drawer v-model:visible="visible" size="medium" :header="header"  :close-on-overlay-click="false" :on-confirm="drawerClose" :close-btn="true">
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">产品名称：</span>
          <t-input type="text" class="ranges" placeholder="请输入产品名称"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">当前库存：</span>
          <t-select :options="gender" class="ranges"  placeholder="请输入当前库存"></t-select>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">库存最大存储：</span>
          <t-input type="text" class="ranges" placeholder="请输入库存最大存储"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">登记人：</span>
          <t-input type="text" class="ranges" placeholder="请输入登记人"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">登记时间：</span>
          <t-input type="text" class="ranges" placeholder="请输入登记时间"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">复核人：</span>
          <t-input type="text" class="ranges" placeholder="请输入复核人"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">复核时间：</span>
          <t-input type="text" class="ranges" placeholder="请输入复核时间"/>
        </t-input-group>
      </t-col>

      <template #footer>
        <t-button>修改</t-button>
        <t-button theme="warning">重新审核</t-button>
        <t-button theme="danger">删除</t-button>
        <t-button variant="outline" @click="visible = false"> 取消 </t-button>
      </template>
    </t-drawer>

    <t-col :span="12">
      <t-list>
        <t-table
            row-key="eid" :data="data" :columns="columns"
            :selected-row-keys="selectedRowKeys" select-on-row-click
            v-on:row-dblclick="dblclick"
            :column-controller="{
               placement,
               fields: ['said', 'saconf',  'amount', 'maxamount', 'register', 'registertime', 'checker',
               'checkertime', 'created', 'updated'],
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

const start = ref('0')
const job = [
  { label: '未审批', value: '0' },
  { label: '已通过', value: '1' },
  { label: '不通过', value: '2' }
]

const search = () => {
  console.log(start.value)
}

const reset = () => {
  console.log(1)
}

// const human = ref({
//   said: '',
//   saconf: '',
//   saname: '',
//   amount: '',
//   maxamount: '',
//   register: '',
//   registertime: '',
//   checker: '',
//   checkertime: '',
//   created: '',
//   updated: '',
//   checktag: ''
// })

const gender = [
  { label: '男', value: '0' },
  { label: '女', value: '1' }
]
const header = ref("修改信息")
const visible = ref(false);

const placement = ref('top-left');
const customText = ref(false);

let data = [] // 数据
for (let i = 1; i <= 11; i++) {
  data.push({
    said: i,
    saconf: 'ERP'+i,
    saname: 'XX药品'+i,
    amount: i*100,
    maxamount: i*200,
    register: '张三'+i,
    registertime: '2022-10-'+i,
    checker: '李四'+i,
    checkertime: '2022-10-'+i,
    created: '2022-10-'+i,
    updated: '2022-10-'+i,
    checktag: i % 2==0? 'KC_Z0' : 'KC_Z1'
  });
}

const leftFixedColumn = ref(2);
const columns = ref([
  { colKey: 'said', title: '序号',align: 'center',width: '80px'},
  { colKey: 'saconf', title: '安全库存配置单号',align: 'center',width: '160px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'saname', title: '产品名称',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'amount', title: '当前存储',width: '120px',align: 'center'},
  { colKey: 'maxamount', title: '库存最大存储',align: 'center',width: '120px'},
  { colKey: 'register', title: '登记人',align: 'center',width: '120px'},
  { colKey: 'registertime', title: '登记时间',width: '120px',align: 'center'},
  { colKey: 'checker', title: '复核人',align: 'center',width: '140px'},
  { colKey: 'checkertime', title: '复核时间',align: 'center',width: '120px'},
  { colKey: 'created', title: '创建时间',align: 'center',width: '120px'},
  { colKey: 'updated', title: '更新时间',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
  { colKey: 'checktag', title: '审核状态',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
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
  margin: 5px;
  .titles{
    width: 6vw;
    line-height: 30px;
    text-align: right;
  }
  .ranges{
    width: 16vw;
  }
}
.btn{
  margin-top: 5px;
  .btn-but{
    margin: 0px 0px 0px 40px;
  }
}
.but{
  margin: 10px 0px 0px 40px;
}
.page{
  padding: 10px;
}
</style>
