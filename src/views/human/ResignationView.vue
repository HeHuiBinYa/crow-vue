<template>
  <t-col :span="8">
    <t-drawer v-model:visible="visible" :header="header" :on-confirm="drawerClose" :close-btn="true">
      <p>This is a controlled drawer</p>
    </t-drawer>
  </t-col>
  <t-row>
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <t-input-group class="group">
            <span class="title">姓名：</span>
            <t-input type="text" class="range" v-model="human.ename" placeholder="请输入您要查询的年龄"/>
          </t-input-group>

          <t-input-group class="group">
            <span class="title">性别：</span>
            <t-select :options="gender" class="range" v-model="human.sex" placeholder="请选择您要查询的性别"></t-select>
          </t-input-group>

          <t-input-group class="group">
            <span class="title">年龄：</span>
            <t-input :style="{ width: '118px' }"  />
            <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
            <t-input :style="{ width: '118px' }"  />
          </t-input-group>

          <t-input-group class="group">
            <span class="title">电话：</span>
            <t-input type="text" class="range" placeholder="请输入您要查询的年龄"/>
          </t-input-group>

          <t-input-group class="group">
            <span class="title">出生地址：</span>
            <t-input type="text" class="range" placeholder="请输入您要查询的出生地址"/>
          </t-input-group>

          <t-input-group class="group">
            <span class="title">入职时间：</span>
            <t-date-range-picker class="range"  mode="month"/>
          </t-input-group>
        </t-col>
        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary">搜索</t-button>
          <t-button class="btn-but" theme="warning">重置</t-button>
        </t-col>
      </t-row>
    </t-col>

    <t-col :span="12">
      <t-list>
        <t-table
            row-key="eid" :data="data" :columns="columns"
            :selected-row-keys="selectedRowKeys" select-on-row-click
            v-on:row-dblclick="dblclick"
            hover="true"
        />
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

const gender = [
  { label: '男', value: '0' },
  { label: '女', value: '1' }
]
const human = ref({
  ename: '',
  sex: '',
  place: '',
  birth: '',
  age: [],
  tel: '',
  entrytime: [],
})

const header = ref("修改信息")
const visible = ref(false);
const data = [] // 数据
for (let i = 1; i <= 13; i++) {
  data.push({
    eid: i,
    ename: '张三'+i,
    sex: '男',
    place: '四川重庆',
    birth: '1995-10-22',
    age: '30',
    tel: '17524655820',
    entrytime: '2022-10-11',
    leavetime: '2022-12-11',
  });
}

const columns = ref([
  { colKey: 'ename', title: '姓名'},
  { colKey: 'sex', title: '性别'},
  { colKey: 'birth', title: '出生日期'},
  { colKey: 'place', title: '出生地址'},
  { colKey: 'age', title: '年龄'},
  { colKey: 'tel', title: '电话'},
  { colKey: 'leavetime', title: '离职时间'},
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
.btn{
  .btn-but{
    margin: 8px;
  }
}
.page{
  padding: 10px;
}
</style>
