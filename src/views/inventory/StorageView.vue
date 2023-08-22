<template>
  <t-row style="height: 89vh" >
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <t-list style="height: 16vh">
            <t-input-group class="group">
              <span class="title">入库单号：</span>
              <t-input type="text" class="range" v-model="page.wagatherid"  placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">出入库人：</span>
              <t-input class="range" v-model="page.wastorer"  placeholder="请选择您要查询的入库人"></t-input>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">登记人：</span>
              <t-input type="text" class="range" v-model="page.waregister" placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">复核人：</span>
              <t-input type="text" class="range" v-model="page.wachecker" placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">总件数：</span>
              <t-input :style="{ width: '118px' }" v-model="page.startWaamountsum" />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }" v-model="page.endWaamountsum" />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">总金额：</span>
              <t-input :style="{ width: '118px' }" v-model="page.startWacostpricesum" />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }" v-model="page.endWacostpricesum" />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">确认件数：</span>
              <t-input :style="{ width: '118px' }" v-model="page.startWagatheredamountSum" />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }" v-model="page.endWagatheredamountSum" />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">入库状态：</span>
              <t-select :options="job1" class="range" v-model="page.wareason"></t-select>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">审核状态：</span>
              <t-select :options="job2" class="range" v-model="page.wachecktag"></t-select>
            </t-input-group>
          </t-list>
        </t-col>

        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary" @click="query">搜索</t-button>
          <t-button class="btn-but" theme="warning" @click="reset">重置</t-button>
        </t-col>
      </t-row>
    </t-col>

    <t-drawer v-model:visible="visible" size="50%" :header="header" z-index="100" :close-on-overlay-click="false" :on-confirm="drawerClose" :close-btn="true">
      <t-drawer v-model:visible="visibles" size="50%" :header="headers" z-index="100" :on-confirm="drawerCloses" :close-btn="true">
        <t-row>
          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">产品名称：</span>
              <t-input type="text" class="ranges" v-model="dispatch.dname" disabled placeholder="请输入产品名称"/>
            </t-input-group>
          </t-col>

          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">操作人：</span>
              <t-input  class="ranges" v-model="dispatch.operator" disabled placeholder="请输入操作人"></t-input>
            </t-input-group>
          </t-col>

          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">数量：</span>
              <t-input type="text" class="ranges" v-model="dispatch.number" placeholder="请输入数量" />
            </t-input-group>
          </t-col>

          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">出入库标志：</span>
              <t-select :options="gender" class="ranges" v-model="dispatch.tag" placeholder="请输入单位"></t-select>
            </t-input-group>
          </t-col>

          <t-col :span="12">
            <t-table v-model:columns="columnDispatch" v-model:data="dispatch.dispatchData" :hover="true"/>
          </t-col>
        </t-row>

        <template #footer>
          <t-button @click="storage" v-if="bool">出库</t-button>
          <t-button variant="outline" @click="visibles = false"> 取消 </t-button>
        </template>
      </t-drawer>

      <t-row>
        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">出入库人：</span>
            <t-input class="ranges"  placeholder="请输入出入库人" v-model="warehousing.wastorer"></t-input>
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">总件数：</span>
            <t-input type="text" class="ranges" placeholder="请输入总件数" v-model="warehousing.waamountsum"/>
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">总金额：</span>
            <t-input type="text" class="ranges" placeholder="请输入总金额" v-model="warehousing.wacostpricesum"/>
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">入库总件数：</span>
            <t-input type="text" class="ranges" placeholder="请输入入库总件数" v-model="warehousing.wagatheredamountsum"/>
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">登记人：</span>
            <t-input type="text" class="ranges" placeholder="请输入登记人" v-model="warehousing.waregister"/>
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">复核人：</span>
            <t-input type="text" class="ranges" placeholder="请输入复核人" v-model="warehousing.wachecker"/>
          </t-input-group>
        </t-col>

        <t-col :span="12">
          <t-list >
            <t-table v-model:columns="column" v-model:data="warehousing.data" v-on:row-dblclick="dblclickc" :hover="true"/>
            <t-dialog
                v-model:visible="dialog"
                header="审核未通过"
                body="审核未通过"
                attach="body"
                :confirm-btn="null"
                :cancel-btn="null"
            />
          </t-list>
        </t-col>
      </t-row>

      <template #footer>
        <t-button @click="updWarehousingVo">修改</t-button>
        <t-button @click="updWachecktag">复核</t-button>
        <t-button variant="outline" @click="visible = false"> 取消 </t-button>
      </template>
    </t-drawer>

    <t-col :span="12">
      <t-list>
        <t-table
            row-key="eid" :data="data.records" :columns="columns"
            :selected-row-keys="selectedRowKeys" select-on-row-click
            v-on:row-dblclick="dblclick"
            :column-controller="{
               placement,
               fields: ['waid', 'wagatherid',  'wastorer', 'wareason', 'waamountsum', 'wacostpricesum', 'wagatheredamountsum',
               'waremark', 'created', 'updated', 'created', 'waregister', 'waregistertime', 'wachecker', 'wacheckertime', 'wachecktag', 'wastoretag'],
               dialogProps: { preventScrollThrough: true },
               buttonProps: customText ? { content: '显示列控制', theme: 'primary', variant: 'base' } : undefined,
            }"
            hover="true"/>
      </t-list>
    </t-col>
    <t-col :span="12">
      <t-pagination class="page" v-model="page.size" v-model:pageSize="page.sizePage" :total="data.total"
                    @change="onChange" @page-size-change="onPageSizeChange" :show-page-size="false"/>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import { MessagePlugin } from 'tdesign-vue-next';
import {warehousingStore} from "@/store/inventopy/warehousing";
import {queryWarehousingVo, updateWachecktag, updateWarehousingVo} from "@/http/inventopy/warehousing";
import {insertDispatch} from "@/http/inventopy/dispatch";
import {updateSchedulingByScamount} from "@/http/inventopy/scheduling";
import {userStore} from "@/store/user";

const data = ref(warehousingStore().WarehousingVo.data)
const page = ref(warehousingStore().WarehousingVo.page)
const warehousing = ref(warehousingStore().WarehousingVo.warehousing)
const dispatch = ref(warehousingStore().WarehousingVo.dispatch)
const bool = ref(false)

dispatch.value.operator = userStore().account.ename

const job1 = [
  { label: '赠送', value: 'R001-3' },
  { label: '生产入库', value: 'R001-1' },
  { label: '生产发货', value: 'R001-2' },
  { label: '内部归还', value: 'R001-4' },
  { label: '生产领料', value: 'R001-5' },
  { label: '库存初始', value: 'R001-6' },
  { label: '内部借领', value: 'R001-7' },
  { label: '其他归还', value: 'R001-8' },
  { label: '其他借领', value: 'R001-9' },
]
const job2 = [
  { label: '等待审核', value: 'S001-0' },
  { label: '审核通过', value: 'S001-1' },
  { label: '审核不通过', value: 'S001-2' }
]

const search = () => {
  data.value = []
  queryWarehousingVo().then(item => {
    data.value = item.data
  })
}
search();

const query = () => {
  page.value.size = 1
  search();
}

const gender = [
  { label: '出库发货', value: 'T001-0' },
  { label: '生产领料', value: 'T001-1' }
]
const header = ref("修改信息")
const visible = ref(false);
const headers = ref("出库")
const visibles = ref(false);
const dialog = ref(false);

const placement = ref('top-left');
const customText = ref(false);

const leftFixedColumn = ref(2);
const columns = ref([
  // { colKey: 'waid', title: '序号',align: 'center',width: '80px'},
  { colKey: 'wagatherid', title: '入库申请单号',align: 'center',width: '280px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'wastorer', title: '入库人',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'waamountsum', title: '总件数',width: '120px',align: 'center'},
  { colKey: 'wacostpricesum', title: '总金额',align: 'center',width: '120px'},
  { colKey: 'wagatheredamountsum', title: '入库总件数',align: 'center',width: '120px'},
  { colKey: 'waregister', title: '登记人',width: '120px',align: 'center'},
  { colKey: 'waregistertime', title: '登记时间',align: 'center',width: '140px'},
  { colKey: 'wachecker', title: '复核人',align: 'center',width: '120px'},
  { colKey: 'wacheckertime', title: '复核时间',align: 'center',width: '130px'},
  { colKey: 'created', title: '更新时间',align: 'center',width: '140px'},
  { colKey: 'updated', title: '修改时间',align: 'center',width: '140px'},
  { colKey: 'wareason', title: '入库状态',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
  { colKey: 'wachecktag', title: '审核状态',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
  { colKey: 'wastoretag', title: '库存标志',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
]);

const leftFixedColumns = ref(2)
const column = ref([
  { colKey: 'scproductid', title: '产品编号',align: 'center',width: '240px' ,fixed: leftFixedColumns.value >= 2 ? 'left' : undefined},
  { colKey: 'scproductname', title: '产品名称',align: 'center',width: '120px'},
  { colKey: 'scamount', title: '数量',align: 'center',width: '120px'},
  { colKey: 'scamountunit', title: '单位',align: 'center',width: '120px'},
  { colKey: 'sccostprice', title: '单价（元）',align: 'center',width: '120px'},
  { colKey: 'scubtotal', title: '小计（元）',align: 'center',width: '120px'},
]);

const columnDispatch = ref([
  { colKey: 'dname', title: '产品名称',align: 'center',width: '120px' ,fixed: leftFixedColumns.value >= 2 ? 'left' : undefined},
  { colKey: 'operator', title: '操作人',align: 'center',width: '120px'},
  { colKey: 'number', title: '数量',align: 'center',width: '120px'},
  { colKey: 'tag', title: '出入库标志',align: 'center',width: '120px'},
]);

// 单选
const selectedRowKeys = ref([1]);
// 双击
const dblclick = (row: any) => {
  warehousing.value.wastorer = data.value.records[row.index].wastorer
  warehousing.value.waamountsum = data.value.records[row.index].waamountsum
  warehousing.value.wacostpricesum = data.value.records[row.index].wacostpricesum
  warehousing.value.wagatheredamountsum = data.value.records[row.index].wagatheredamountsum
  warehousing.value.waregister = data.value.records[row.index].waregister
  warehousing.value.wachecker = data.value.records[row.index].wachecker
  warehousing.value.waid = data.value.records[row.index].waid
  warehousing.value.data = data.value.records[row.index].schedulings
  dispatch.value.fTag = data.value.records[row.index].wachecktag
  visible.value = true
}
// 关闭
const  drawerClose = () => {
  visible.value = false
}
const  drawerCloses = () => {
  visible.value = false
}

const dblclickc =(row: any) =>{
  if (dispatch.value.fTag === 'S001-0'){
    dialog.value = true
    return ;
  }
  dispatch.value.dname = warehousing.value.data[row.index].scproductname
  dispatch.value.total = warehousing.value.data[row.index].scamount
  dispatch.value.scid = warehousing.value.data[row.index].scid
  dispatch.value.waid = warehousing.value.data[row.index].waid
  dispatch.value.dispatchData = warehousing.value.data[row.index].dispatchs
  visibles.value =true

  if (dispatch.value.total <= 0){
    bool.value = false
  }else{
    bool.value = true
  }

  console.log(dispatch)
}

const onPageSizeChange = (size: any) => {
  page.value.size = size.index
};

const onChange = (pageInfo: any) => {
  search()
};

const reset = () => {
  page.value.size = 1
  page.value.wagatherid = ""
  page.value.wastorer = ""
  page.value.waregister = ""
  page.value.wachecker = ""
  page.value.startWaamountsum = ""
  page.value.endWaamountsum = ""
  page.value.startWacostpricesum = ""
  page.value.endWacostpricesum = ""
  page.value.startWagatheredamountSum = ""
  page.value.endWagatheredamountSum = ""
  page.value.wareason = ""
  page.value.wachecktag = ""

  search()
}

const updWarehousingVo = () => {
  updateWarehousingVo().then(item => {
    if (item.code === 200){
      search()
      visible.value = false
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}

const updWachecktag = () => {
  updateWachecktag().then(item => {
    if (item.code === 200){
      search()
      visible.value = false
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}

const storage = () => {
  insertDispatch().then(item => {
    if (item.code === 200){
      dispatch.value.total = dispatch.value.number
      updateSchedulingByScamount().then(items => {
        if (items.code === 200){
          search()
          visible.value = false
          visibles.value = false
          MessagePlugin.info({content: items.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
        }else{
          MessagePlugin.error({content: items.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
        }
      })
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}
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
  margin: 5px 0px 10px 0px;
  .titles{
    width: 6vw;
    line-height: 30px;
    text-align: right;
  }
  .ranges{
    width: 16vw;
  }
  .range{
    width: 37.7vw;
  }
  .rang{
    width: 40.1vw;
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
