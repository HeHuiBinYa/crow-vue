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
          <span class="titles">物料编号：</span>
          <t-input type="text" class="ranges" disabled />
        </t-input-group>
      </t-col>
      <t-col :span="12">
        <t-input-group class="groups">
          <span class="titles">物料名称：</span>
          <t-input type="text" class="ranges"  />
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
          <span class="titles">数量：</span>
          <t-input type="text" class="ranges"/>
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
          <t-input type="text" class="ranges"  />
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
        <t-col :span="6" class="col"><t-input label="登记人：" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="产品编号：" size="large" disabled/></t-col>
        <t-col :span="6" class="col"><t-input label="产品名称：" size="large" /></t-col>
        <t-col :span="6" class="col"><t-select size="large"  placeholder="一级分类"/></t-col>
        <t-col :span="6" class="col"><t-select size="large"  placeholder="二级分类"/></t-col>
        <t-col :span="6" class="col"><t-select size="large"  placeholder="三级分类"/></t-col>
        <t-col :span="6" class="col"><t-input label="用途类型：" size="large"/></t-col>
        <t-col :span="6" class="col"><t-input label="计量单位：" suffix="m" size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="供应商集合：" size="large"/></t-col>
        <t-col :span="6" class="col"><t-input label="审核标志" value="S001-0" disabled size="large" /></t-col>
        <t-col :span="6" class="col"><t-input label="成本单价：" suffix="元" size="large"/></t-col>
        <t-col :span="6" class="col"><t-input label="市场单价：" suffix="元" size="large"/></t-col>
        <t-col :span="12" class="col">
          <t-textarea placeholder="产品描述" size="large"/>
        </t-col>
        <t-col :span="12">
          <t-button @click="visible=true">添加物料</t-button>
          <t-list style="height: 36vh">
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
    mid: i,
    design: 'AD100001AD1001'+i,
    designname: 'XXX产品'+i,
    type: 'XX',
    describer: 'ADAWD'+i*10,
    amount: i*10,
    munit: i*100,
    price: i*200,
    total:(i*200)*(i*10)
  });
}

const leftFixedColumn = ref(2);
const columns = ref([
  { colKey: 'mid', title: '序号',align: 'center',width: '80px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'design', title: '物料编号',align: 'center',width: '250px' ,fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'designname', title: '物料名称',align: 'center',width: '120px'},
  { colKey: 'type', title: '用途类型',align: 'center',width: '120px'},
  { colKey: 'type', title: '描述',align: 'center',width: '120px'},
  { colKey: 'amount', title: '数量',align: 'center',width: '120px'},
  { colKey: 'munit', title: '单位',align: 'center',width: '120px'},
  { colKey: 'price', title: '单价（元）',align: 'center',width: '120px'},
  { colKey: 'total', title: '小计（元）',align: 'center',width: '120px'},
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
