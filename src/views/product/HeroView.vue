<template>
  <t-dialog
      v-model:visible="visible"
      header="对话框标题"
      body="对话框内容">

  </t-dialog>

  <t-row>
    <t-col :span="12" class="rol">
      <t-list class="st" @scroll="scrollHandler">
        <t-row>
          <t-col :span="2" class="hero" >
            <t-table
                row-key="index" :data="heroA" :columns="columnsA" :hover="true"
                @row-click="handleRowClick"  @row-dblclick="rowA"
            ></t-table>
          </t-col>
          <t-col :span="2" class="hero">
            <t-table
                row-key="index" :data="heroB" :columns="columnsB" :hover="true"
                @row-click="handleRowClick" @row-dblclick="rowB"
            ></t-table>
          </t-col>
          <t-col :span="2" class="hero">
            <t-table
                row-key="index" :data="heroC" :columns="columnsC" :hover="true" @row-dblclick="rowC"
            ></t-table>
          </t-col>
          <t-col :span="6">
            <t-row>
              <t-col :span="3" class="col">
                一级分类
                <t-input placeholder="请输入一级分类"/>
              </t-col>
              <t-col :span="3" class="col">
                二级分类
                <t-input placeholder="请输入二级分类"/>
              </t-col>

              <t-col :span="3" class="col">
                三级分类
                <t-input placeholder="请输入三级分类"/>
              </t-col>

              <t-col :span="10" class="btn">
                <t-button block>搜索</t-button>
              </t-col>

              <t-col :span="3" class="inp col">
                <t-button block theme="danger">添加一级分类</t-button>
                <t-input />
              </t-col>

              <t-col :span="3" class="inp col">
                <t-button block theme="warning">添加二级分类</t-button>
                <t-select />
                <t-input />
              </t-col>

              <t-col :span="3" class="inp col">
                <t-button block theme="success">添加三级分类</t-button>
                <t-select />
                <t-input />
              </t-col>

            </t-row>
          </t-col>
        </t-row>
      </t-list>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";


const visible = ref(false)

const scrollHandler = (e: any) => console.log(e);

const heroA = ref([
  {
    aid: 0,
    aname: '药品',
    created: '2022-10-1',
    updated: '2022-10-1',
  },
  {
    aid: 0,
    aname: '药品',
    created: '2022-10-1',
    updated: '2022-10-1',
  }
])

const columnsA = ref([
  { colKey: 'aname', title: '一级分类', align: 'center'},])

const rowA = (row: any) => {
  console.log(row)
  visible.value = true
}

const heroB = ref([
  {
    bid: 1,
    bname: '保健药品',
    created: '2022-10-1',
    updated: '2022-10-1',
  }
])

const columnsB = ref([
  { colKey: 'bname', title: '二级分类', align: 'center'},])

const rowB = (row: any) => {
  console.log(row)
  visible.value = true
}

const heroC =  ref([
  {
    bid: 1,
    bname: '维C',
    created: '2022-10-1',
    updated: '2022-10-1',
  },
  {
    bid: 1,
    bname: '维C',
    created: '2022-10-1',
    updated: '2022-10-1',
  },
  {
    bid: 1,
    bname: '维C',
    created: '2022-10-1',
    updated: '2022-10-1',
  },
  {
    bid: 1,
    bname: '维C',
    created: '2022-10-1',
    updated: '2022-10-1',
  },
  {
    bid: 1,
    bname: '维C',
    created: '2022-10-1',
    updated: '2022-10-1',
  },
  {
    bid: 1,
    bname: '维C',
    created: '2022-10-1',
    updated: '2022-10-1',
  },
  {
    bid: 1,
    bname: '维C',
    created: '2022-10-1',
    updated: '2022-10-1',
  },
  {
    bid: 1,
    bname: '维C',
    created: '2022-10-1',
    updated: '2022-10-1',
  },
  {
    bid: 1,
    bname: '维C',
    created: '2022-10-1',
    updated: '2022-10-1',
  },
  {
    bid: 1,
    bname: '维C',
    created: '2022-10-1',
    updated: '2022-10-1',
  },
  {
    bid: 1,
    bname: '维C',
    created: '2022-10-1',
    updated: '2022-10-1',
  }
])

const columnsC = ref([
  { colKey: 'bname', title: '三级分类', align: 'center'},])

const rowC = (row: any) => {
  console.log(row)
  visible.value = true
}

const handleRowClick= (value:any) => {
  console.log(value)
}
</script>

<style lang="scss" scoped>
.rol{
  border: 1px solid #dbb9b9;
}
.st{
  height: 89vh;
  background: #dfe6f0;
  .hero{
    p{
      font-size: 20px;
      text-align: center;
      border: 1px solid red;
      padding: 10px;
    }
    border-radius: 10px;
  }
  .inp{
    margin-top: 20px;
  }
  .btn{
    margin: 10px 10px 10px 60px;
  }
  .col{
    margin: 10px 10px 10px 40px;
  }
}

</style>
