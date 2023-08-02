<template>
  <t-drawer v-model:visible="visible" size="medium" :header="header" :on-confirm="drawerClose" :close-btn="true">
    <t-row>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">产品编号：</span>
          <t-input type="text" class="ranges" disabled />
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
          <span class="titles">数量：</span>
          <t-input type="text" class="ranges"  />
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
          <span class="titles">单价：</span>
          <t-input type="text" class="ranges"/>
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">小计：</span>
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
      <t-button theme="default">添加物料</t-button>
      <t-button >修改物料</t-button>
      <t-button theme="danger">删除物料</t-button>
      <t-button variant="outline" @click="visible = false"> 取消 </t-button>
    </template>
  </t-drawer>

  <t-row>
    <t-col :span="12">
      <t-row class="row">
        <t-col :span="12" class="col"><t-input label="入库申请单号：" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="登记人：" suffix="元" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="产品名称：" size="large" /></t-col>

        <t-col :span="6" class="col"><t-select label="入库状态：" size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="入库人：" size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="总件数：" size="large" suffix="件"/></t-col>
        <t-col :span="6" class="col"><t-input label="总金额：" suffix="元" size="large" /></t-col>

        <t-col :span="12" class="col">
          <t-textarea placeholder="备注" size="large"/>
        </t-col>

        <t-col :span="12">
          <t-button @click="visible=true">添加入库物料</t-button>
          <t-list >
            <t-table v-model:columns="columns" v-model:data="data" v-on:row-dblclick="dblclick" :hover="true"/>
          </t-list>
        </t-col>
        <t-col :span="6">
          <t-button block theme="primary" class="btn">登记档案</t-button>
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
    scproductid: '产品编号'+i,
    scproductname: '产品名称'+i,
    scamount: '数量'+i,
    scamountunit: '单位'+i*10,
    sccostprice: i*10,
    scubtotal: i*100,
  });
}

const leftFixedColumn = ref(2);
const columns = ref([
  { colKey: 'scproductid', title: '产品编号',align: 'center',width: '120px' ,fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'scproductname', title: '产品名称',align: 'center',width: '120px'},
  { colKey: 'scamount', title: '数量',align: 'center',width: '120px'},
  { colKey: 'scamountunit', title: '单位',align: 'center',width: '120px'},
  { colKey: 'sccostprice', title: '单价（元）',align: 'center',width: '120px'},
  { colKey: 'scubtotal', title: '小计（元）',align: 'center',width: '120px'},
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
