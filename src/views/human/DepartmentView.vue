<template>
  <t-dialog
      :placement="placement"
      header="新部门录入"
      :top="top"
      :visible="visibleTop"
      :on-confirm="cloe"
      :on-close="cloe">
    <t-input-group class="groups">
      <span class="titles">部门名称：</span>
      <t-input type="text" class="ranges" placeholder="请输入你要录入的部门名称"/>
    </t-input-group>

    <t-input-group class="groups">
      <span class="titles">部门职务：</span>
      <t-input type="text" class="ranges" placeholder="请输入你要录入的部门职务"/>
    </t-input-group>

    <t-input-group class="groups">
      <span class="titles">部门职责：</span>
      <t-input type="text" class="ranges" placeholder="请输入你要录入的部门职责"/>
    </t-input-group>
  </t-dialog>

  <t-col :span="8">
    <t-drawer v-model:visible="visible" size="medium" :header="header" :on-confirm="drawerClose" :close-btn="true">
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">部门名称：</span>
          <t-input type="text" class="ranges" placeholder="请输入你要修改的部门名称"/>
        </t-input-group>

        <t-input-group class="groups">
          <span class="titles">部门职务：</span>
          <t-input type="text" class="ranges" placeholder="请输入你要修改的部门职务"/>
        </t-input-group>

        <t-input-group class="groups">
          <span class="titles">部门职责：</span>
          <t-input type="text" class="ranges" placeholder="请输入你要修改的部门职责"/>
        </t-input-group>
      </t-col>
    </t-drawer>
  </t-col>
  <t-row>
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <t-input-group class="group">
            <span class="title">部门名称：</span>
            <t-input type="text" class="range" v-model="position.dname" placeholder="请输入您要查询的部门名称"/>
          </t-input-group>

          <t-input-group class="group">
            <span class="title">部门职务：</span>
            <t-input type="text" class="range" v-model="position.position" placeholder="请输入您要查询的部门职务"/>
          </t-input-group>

          <t-input-group class="group">
            <span class="title">部门职责：</span>
            <t-input type="text" class="range" v-model="position.duty" placeholder="请输入您要查询的部门职责"/>
          </t-input-group>
        </t-col>

        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary" @click="search">搜索</t-button>
          <t-button class="btn-but" theme="success" @click="visibleTop = true">添加</t-button>
          <t-button class="btn-but" theme="warning" @click="reset">重置</t-button>
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

const visibleTop = ref(false)
const placement = 'top';
const top = '50px';
const position = ref({
  did: '',
  dname: '',
  position: '',
  duty: '',
})

const header = ref("修改信息")
const visible = ref(false);
const data = [] // 数据
for (let i = 1; i <= 15; i++) {
  data.push({
    did: i,
    dname: i+'号部门',
    position: i+2+'号保安',
    duty: i+2+'当然是保护公司了',
    created: '2022-10-11',
    updated: '2022-11-22'
  });
}

const columns = ref([
  { colKey: 'did', title: '部门序号'},
  { colKey: 'dname', title: '部门名称'},
  { colKey: 'position', title: '部门职务'},
  { colKey: 'duty', title: '部门职责'},
  { colKey: 'created', title: '部门创建时间'},
  { colKey: 'updated', title: '部门修改时间'},
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

const search = () => {
  console.log(position.value)
}

const reset = () => {
  console.log(position.value)
}

const cloe = () => {
  visibleTop.value = false;
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
    margin: 4px;
  }
}
.page{
  padding: 10px;
}
</style>
