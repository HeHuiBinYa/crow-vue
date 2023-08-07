<template>
  <t-col :span="8">
    <t-drawer v-model:visible="visible" size="medium" :header="header" :close-btn="true">
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">部门名称：</span>
          <t-input type="text"  class="ranges" v-model="department.dname" placeholder="请输入你要修改的部门名称"/>
        </t-input-group>

        <t-input-group class="groups">
          <span class="titles">部门职务：</span>
          <t-input type="text"  class="ranges" v-model="department.position" placeholder="请输入你要修改的部门职务"/>
        </t-input-group>

        <t-input-group class="groups">
          <span class="titles">部门职责：</span>
          <t-input type="text"  class="ranges" v-model="department.duty" placeholder="请输入你要修改的部门职责"/>
        </t-input-group>
      </t-col>
      <template #footer>
        <t-button @click="edits">修改</t-button>
        <t-button theme="danger" @click="omits">删除</t-button>
        <t-button variant="outline" @click="visible = false"> 取消 </t-button>
      </template>
    </t-drawer>
  </t-col>

  <t-row id="message-toggle">
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <t-input-group class="group">
            <span class="title">部门名称：</span>
            <t-input type="text" class="range" v-model="query.dname" placeholder="请输入您要查询的部门名称"/>
          </t-input-group>

          <t-input-group class="group">
            <span class="title">部门职务：</span>
            <t-input type="text" class="range" v-model="query.position" placeholder="请输入您要查询的部门职务"/>
          </t-input-group>

          <t-input-group class="group">
            <span class="title">部门职责：</span>
            <t-input type="text" class="range" v-model="query.duty" placeholder="请输入您要查询的部门职责"/>
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
            row-key="eid" :data="data.records" :columns="columns"
            :selected-row-keys="selectedRowKeys" select-on-row-click
            v-on:row-dblclick="dblclick" :loading="bool"
            hover="true" class="loading-container"
        />
      </t-list>
    </t-col>
    <t-col :span="12">
      <t-pagination class="page" v-model="query.size" :total="query.total"
                    @page-size-change="onPageSizeChange" :max-page-btn="5" :folded-max-page-btn="5"
                    :page-size="query.pageSize"
                    @current-change="onCurrentChange" :show-page-size="false"/>
    </t-col>
  </t-row>

  <t-dialog
            :placement="placement"
            header="新部门录入"
            :top="top"
            :visible="visibleTop"
            :on-confirm="cloe"
            :on-close="cloe" @confirm="incre">
    <t-input-group class="groups">
      <span class="titles">部门名称：</span>
      <t-input type="text" v-model="department.dname" class="ranges" placeholder="请输入你要录入的部门名称"/>
    </t-input-group>

    <t-input-group class="groups">
      <span class="titles">部门职务：</span>
      <t-input type="text" v-model="department.position" class="ranges" placeholder="请输入你要录入的部门职务"/>
    </t-input-group>

    <t-input-group class="groups">
      <span class="titles">部门职责：</span>
      <t-input type="text" v-model="department.duty" class="ranges" placeholder="请输入你要录入的部门职责"/>
    </t-input-group>
  </t-dialog>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {staffStore} from "@/store/staff";
import {increase,page,edit,omit} from "@/http/staff/index";
import { MessagePlugin } from 'tdesign-vue-next';


const bool = ref(false); // 加载
const department = ref(staffStore().department)   // 添加数据
const query = ref(staffStore().query.depar_query) // 查询数据
const data = ref({  // 展示数据
  records: [],
})

// 添加部门
const incre = function (){
  if (department.value.dname === ''){
    MessagePlugin.info({content: "部门名称不能为空!", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  if (department.value.position === ''){
    MessagePlugin.info({content: "部门职务不能为空!", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  if (department.value.duty === ''){
    MessagePlugin.info({content: "部门职责不能为空!", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  increase().then(item => {
    if (item.code === 200){
      department.value.dname ="";
      department.value.position="";
      department.value.duty="";
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      Query();
      return visibleTop.value=false;
    }else{
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      return ;
    }
  })
};

const edits = function (){
  edit().then(item => {
    if (item.code === 200){
      department.value.dname ="";
      department.value.position="";
      department.value.duty="";
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      Query();
      return visible.value = false;
    }else{
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      return ;
    }
  })
};

const omits = function (){
  omit().then(item => {
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      Query();
      return visible.value = false;
    }else{
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      return ;
    }
  })
};

// 搜索
const Query = () => {
  bool.value = true;
  data.value.records = []
  page(query).then(item => {
    query.value.pages = item.data.pages
    query.value.total = item.data.total
    console.log(item.data.records.length)
    for (let i=0;i<item.data.records.length;i++){
      item.data.records[i].created =
          item.data.records[i].created[0]+"年"+
          item.data.records[i].created[1]+"月"+
          item.data.records[i].created[2]+"日 "+
          item.data.records[i].created[3]+":"+
          item.data.records[i].created[4]+":"+
          item.data.records[i].created[5]
      if (item.data.records[i].updated != null){
        item.data.records[i].updated =
            item.data.records[i].updated[0]+"年"+
            item.data.records[i].updated[1]+"月"+
            item.data.records[i].updated[2]+"日 "+
            item.data.records[i].updated[3]+":"+
            item.data.records[i].updated[4]+":"+
            item.data.records[i].updated[5]
      }else{
        item.data.records[i].updated = "未修改"
      }
    }
    data.value.records = item.data.records
    bool.value = false
  })
}
Query();
// 搜索按钮
const search = () => {
  data.value.records = []
  query.value.size = 1
  Query();
}
// 分页获得页数
const onPageSizeChange = (size: any) => {
  query.value.size = size
}
// 分页
const onCurrentChange = (index: any, pageInfo: any) => {
  query.value.size = index// 分页获得页数
  Query()
}
// 刷新
const reset = () => {
  query.value.dname = "";
  query.value.position = "";
  query.value.duty ="";
  search();
}

// 双击
const dblclick = (row: any) => {
  department.value.dname = data.value.records[row.index].dname
  department.value.position = data.value.records[row.index].position
  department.value.duty = data.value.records[row.index].duty
  department.value.did = data.value.records[row.index].did
  visible.value = true
}

const visibleTop = ref(false)
const placement = 'top'
const top = '50px';


const header = ref("修改信息")
const visible = ref(false);

const columns = ref([
  { colKey: 'did', title: '部门序号',align: 'center'},
  { colKey: 'dname', title: '部门名称',align: 'center'},
  { colKey: 'position', title: '部门职务',align: 'center'},
  { colKey: 'duty', title: '部门职责',align: 'center'},
  { colKey: 'created', title: '部门创建时间',align: 'center'},
  { colKey: 'updated', title: '部门修改时间',align: 'center'},
]);

// 单选
const selectedRowKeys = ref([1]);

// 关闭
const  drawerClose = () => {
  visible.value = false
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
