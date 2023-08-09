<template>
  <t-col :span="8">
    <t-drawer v-model:visible="visible" size="medium" :header="header" :close-btn="true">
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">职位：</span>
          <t-input type="text" class="ranges" v-model="position.position" placeholder="请输入你要修改的职位"/>
        </t-input-group>

        <t-input-group class="groups">
          <span class="titles">职位等级：</span>
          <t-input type="text" class="ranges" v-model="position.plevel" placeholder="请输入你要修改的职位等级"/>
        </t-input-group>

        <t-input-group class="groups">
          <span class="titles">职位薪资：</span>
          <t-input type="text" class="ranges" v-model="position.psalary" placeholder="请输入你要修改的职位薪资"/>
        </t-input-group>
      </t-col>
      <template #footer>
        <t-button @click="edit">修改</t-button>
        <t-button theme="danger" @click="omit">删除</t-button>
        <t-button variant="outline" @click="visible = false"> 取消 </t-button>
      </template>
    </t-drawer>
  </t-col>
  <t-row id="message-toggle">
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <t-input-group class="group">
            <span class="title">职位：</span>
            <t-input type="text" class="range" v-model="query.position" placeholder="请输入您要查询的职位"/>
          </t-input-group>

          <t-input-group class="group">
            <span class="title">职位等级：</span>
            <t-input type="text" class="range" v-model="query.plevel" placeholder="请输入您要查询的职位等级"/>
          </t-input-group>

          <t-input-group class="group">
            <span class="title">职位薪资：</span>
            <t-input type="text" class="range" v-model="query.psalary" placeholder="请输入您要查询的职位薪资"/>
          </t-input-group>
        </t-col>

        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary" @click="searchs">搜索</t-button>
          <t-button class="btn-but" theme="success" @click="vis">添加</t-button>
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
            hover="true"
        />
      </t-list>
    </t-col>
    <t-col :span="12">
      <t-pagination class="page" v-model="query.position_size" :total="query.total"
                    @page-size-change="onPageSizeChange" :max-page-btn="5" :folded-max-page-btn="5"
                    :page-size="query.pageSize" :loading="bool"
                    @current-change="onCurrentChange" :show-page-size="false"/>
    </t-col>
  </t-row>

  <t-dialog
      :placement="placement"
      header="新职位录入"
      :top="top"
      :visible="visibleTop"
      :on-confirm="cloe"
      :on-close="cloe" @confirm="incres">
    <t-input-group class="groups">
      <span class="titles">职位：</span>
      <t-input type="text" class="ranges" v-model="position.position" placeholder="请输入你要录入的职位名称"/>
    </t-input-group>

    <t-input-group class="groups">
      <span class="titles">职位等级：</span>
      <t-input type="text" class="ranges" v-model="position.plevel" placeholder="请输入你要录入的职位等级"/>
    </t-input-group>

    <t-input-group class="groups">
      <span class="titles">职位薪资：</span>
      <t-input type="text" class="ranges" v-model="position.psalary" placeholder="请输入你要录入的职位薪资"/>
    </t-input-group>
  </t-dialog>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {positionStore} from "@/store/staff/position";
import {increases,pages,edits,omits} from "@/http/staff/position";
import { MessagePlugin } from 'tdesign-vue-next';

const header = ref("修改信息")
const visible = ref(false);
const visibleTop = ref(false)
const bool = ref(false); // 加载
const position = ref(positionStore().position)   // 添加数据
const query = ref(positionStore().query) // 查询数据
const data = ref({  // 展示数据
  records: [],
})

// 添加职位
const incres = function (){
  if (position.value.plevel === ''){
    MessagePlugin.info({content: "职位等级不能为空!", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  if (position.value.psalary === ''){
    MessagePlugin.info({content: "职位薪资不能为空!", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  if (position.value.position === ''){
    MessagePlugin.info({content: "职位不能为空!", duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    return ;
  }
  increases().then(function (item) {
    if (item.code === 200){
      position.value.plevel="";
      position.value.psalary="";
      position.value.position="";
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      Querys();
      return visibleTop.value=false;
    }else{
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      return ;
    }
  })
};

const edit = function (){
  edits().then(function (item) {
    if (item.code === 200){
      position.value.plevel ="";
      position.value.psalary="";
      position.value.position="";
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      Querys();
      return visible.value = false;
    }else{
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      return ;
    }
  })
};

const omit = function (){
  omits().then(function (item) {
    console.log(item)
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      Querys();
      return visible.value = false;
    }else{
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      return ;
    }
  })
};

// 搜索
const Querys = () => {
  bool.value = true;
  data.value.records = []
  console.log(query)
  pages(query).then(function (item) {
    query.value.pages = item.data.pages
    query.value.total = item.data.total
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
Querys();
// 搜索按钮
const searchs = () => {
  data.value.records = []
  query.value.position_size = 1
  Querys();
}
// 分页获得页数
const onPageSizeChange = (size: any) => {
  query.value.position_size = size
}
// 分页
const onCurrentChange = (index: any, pageInfo: any) => {
  console.log(index)
  query.value.position_size = index// 分页获得页数
  Querys()
}
// 刷新
const reset = () => {
  query.value.plevel = "";
  query.value.position = "";
  query.value.psalary ="";
  searchs();
}

// 双击
const dblclick = (row: any) => {
  position.value.plevel = data.value.records[row.index].plevel
  position.value.psalary = data.value.records[row.index].psalary
  position.value.position = data.value.records[row.index].position
  position.value.pid = data.value.records[row.index].pid
  visible.value = true
}

const vis = () => {
  position.value.plevel = ''
  position.value.psalary = ''
  position.value.position = ''
  visibleTop.value = true
}

const placement = 'top'
const top = '50px';

const columns = ref([
  { colKey: 'pid', title: '职位序号',align: 'center'},
  { colKey: 'position', title: '职位',align: 'center'},
  { colKey: 'plevel', title: '职位等级',align: 'center'},
  { colKey: 'psalary', title: '职位薪资',align: 'center'},
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
