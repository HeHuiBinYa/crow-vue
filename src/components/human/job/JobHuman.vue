<template>
  <t-drawer v-model:visible="visible" size="medium" :header="header" :on-confirm="drawerClose" :close-btn="true">
    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">姓名：</span>
        <t-input type="text" class="ranges" placeholder="请输入姓名"/>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">性别：</span>
        <t-select :options="gender" class="ranges" v-model="human.sex" placeholder="请输入性别"></t-select>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">日期：</span>
        <t-input type="text" class="ranges" placeholder="请输入日期"/>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">年龄：</span>
        <t-input type="text" class="ranges" placeholder="请输入年龄"/>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">电话：</span>
        <t-input type="text" class="ranges" placeholder="请输入电话"/>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">出生地址：</span>
        <t-input type="text" class="ranges" placeholder="请输入出生地址"/>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">分配部门：</span>
        <t-select :options="gender" class="ranges" v-model="human.sex" placeholder="请选择您的分配部门"></t-select>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">分配职位：</span>
        <t-input type="text" class="ranges" placeholder="请输入分配职位"/>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">省份证号码：</span>
        <t-input type="text" class="ranges" placeholder="请输入姓名"/>
      </t-input-group>
    </t-col>
  </t-drawer>

  <t-col :span="12">
    <t-list>
      <t-table
          row-key="eid" :data="data" :columns="columns"
          :selected-row-keys="selectedRowKeys" select-on-row-click
          v-on:row-dblclick="dblclick"
          hover="true"/>
    </t-list>
  </t-col>
  <t-col :span="12">
    <t-pagination class="page" v-model="current" v-model:pageSize="pageSize" :total="100"
                  @change="onChange" @page-size-change="onPageSizeChange"
                  @current-change="onCurrentChange" :show-page-size="false"/>
  </t-col>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const human = ref({
  ename: '',
  sex: '',
  place: '',
  birth: '',
  qage: '',
  hage: '',
  tel: '',
  entrytime: [],
  state: '在职'
})

const gender = [
  { label: '男', value: '0' },
  { label: '女', value: '1' }
]
const header = ref("修改信息")
const visible = ref(false);

const data = [] // 数据
for (let i = 1; i <= 14; i++) {
  data.push({
    eid: i,
    staffid: 'ERP'+i,
    ename: '张三阿达'+i,
    sex: '男',
    place: '四川重庆',
    birth: '1995-10-22',
    age: '30',
    tel: '17524655820',
    entrytime: '2022-10-'+i,
    leavetime: '2022-10-'+i*2,
    department: {
      dname: '保安'+i+'部'
    },
    position: {
      position: '保安'+i+'部组长'
    }
  });
}

const columns = ref([
  { colKey: 'staffid', title: '编号',align: 'center'},
  { colKey: 'ename', title: '姓名',align: 'center'},
  { colKey: 'sex', title: '性别',width: '60px',align: 'center'},
  { colKey: 'birth', title: '出生日期',align: 'center'},
  { colKey: 'place', title: '出生地址',align: 'center'},
  { colKey: 'age', title: '年龄',width: '60px',align: 'center'},
  { colKey: 'tel', title: '电话',align: 'center'},
  { colKey: 'department.dname', title: '部门',align: 'center'},
  { colKey: 'position.position', title: '职位',align: 'center'},
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
    width: 6vw;
    line-height: 30px;
    text-align: right;
  }
  .ranges{
    width: 15vw;
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
  padding: 10px;
}
</style>
