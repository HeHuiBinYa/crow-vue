<template>
  <t-row style="height: 89vh">
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <t-list style="height: 16vh">
            <t-input-group class="group">
              <span class="title">出库单号：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">产品名称：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">出库人：</span>
              <t-select :options="gender" class="range"  placeholder="请选择您要查询的性别"></t-select>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">登记人：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">复核人：</span>
              <t-input type="text" class="range"  placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">总件数：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">总金额：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">确认件数：</span>
              <t-input :style="{ width: '118px' }"  />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }"  />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">出库状态：</span>
              <t-select :options="job" class="range" ></t-select>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">审核状态：</span>
              <t-select :options="job" class="range" ></t-select>
            </t-input-group>
          </t-list>
        </t-col>

        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary" @click="search">搜索</t-button>
          <t-button class="btn-but" theme="warning" @click="reset">重置</t-button>
        </t-col>
      </t-row>
    </t-col>

    <t-drawer v-model:visible="visible" size="50%" :header="header"  :close-on-overlay-click="false" :on-confirm="drawerClose" :close-btn="true">
      <t-drawer v-model:visible="visibles" size="90%" :header="headers" :on-confirm="drawerCloses" :close-btn="true">
        <t-row>
          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">出库申请单号：</span>
              <t-input type="text" class="range" placeholder="出库申请单号" disabled/>
            </t-input-group>
          </t-col>

          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">出库人：</span>
              <t-input type="text" class="ranges" placeholder="请输入出库人" />
            </t-input-group>
          </t-col>

          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">出库理由：</span>
              <t-select :options="gender" class="ranges"  ></t-select>
            </t-input-group>
          </t-col>

          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">总件数：</span>
              <t-input type="text" class="ranges" placeholder="请输入登记人" />
            </t-input-group>
          </t-col>

          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">总金额：</span>
              <t-input type="text" class="ranges" placeholder="请输入登记人" />
            </t-input-group>
          </t-col>

          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">出库总件数：</span>
              <t-input type="text" class="ranges" placeholder="请输入登记时间" />
            </t-input-group>
          </t-col>

          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">登记人：</span>
              <t-input type="text" class="ranges" placeholder="请输入复核人" />
            </t-input-group>
          </t-col>

          <t-col :span="12">
            <t-list >
              <t-table v-model:columns="column" v-model:data="scheduling" v-on:row-dblclick="dblclick" :hover="true"/>
            </t-list>
          </t-col>
        </t-row>

        <template #footer>
          <t-button >确认出库</t-button>
          <t-button variant="outline" @click="visibles = false"> 取消 </t-button>
        </template>
      </t-drawer>
      <t-row>
        <t-col :span="12">
          <t-input-group class="groups">
            <span class="titles">出库申请单号：</span>
            <t-input type="text" class="rang" placeholder="出库申请单号" disabled/>
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">出库人：</span>
            <t-select :options="gender" class="ranges"  placeholder="请输入当前库存" ></t-select>
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">总件数：</span>
            <t-input type="text" class="ranges" placeholder="请输入库存最大存储" />
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">总金额：</span>
            <t-input type="text" class="ranges" placeholder="请输入登记人" />
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">出库总件数：</span>
            <t-input type="text" class="ranges" placeholder="请输入登记时间" />
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">登记人：</span>
            <t-input type="text" class="ranges" placeholder="请输入复核人" />
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">登记时间：</span>
            <t-input type="text" class="ranges" placeholder="请输入复核时间" />
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">复核人：</span>
            <t-input type="text" class="ranges" placeholder="请输入复核人" />
          </t-input-group>
        </t-col>

        <t-col :span="6">
          <t-input-group class="groups">
            <span class="titles">复核时间：</span>
            <t-input type="text" class="ranges" placeholder="请输入复核时间" />
          </t-input-group>
        </t-col>

        <t-col :span="12">
          <t-input-group class="groups">
            <span class="titles">审核状态：</span>
            <t-input type="text" class="rang" placeholder="请输入复核时间" disabled/>
          </t-input-group>
        </t-col>

        <t-col :span="12">
          <t-list >
            <t-table v-model:columns="column" v-model:data="paydetails" v-on:row-dblclick="dblclick" :hover="true"/>
          </t-list>
        </t-col>
      </t-row>

      <template #footer>
        <t-button>复核</t-button>
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
               fields: ['waid', 'wagatherid',  'wastorer', 'wareason', 'waamountsum', 'wacostpricesum', 'wagatheredamountsum',
               'waremark', 'created', 'updated', 'created', 'waregister', 'waregistertime', 'wachecker', 'wacheckertime', 'wachecktag', 'wastoretag'],
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

const gender = [
  { label: '男', value: '0' },
  { label: '女', value: '1' }
]
const header = ref("修改信息")
const visible = ref(false);
const headers = ref("出库")
const visibles = ref(false);

const placement = ref('top-left');
const customText = ref(false);

let data = [] // 数据
for (let i = 1; i <= 11; i++) {
  data.push({
    pid: i,
    payid: '出库申请单号'+i,
    pstorer: '出库人'+i,
    pamountsum: '总件数'+(i*100),
    pcostpricesum: '总金额'+(i*100),
    pgatheredamountsum: '出库总件数'+i,
    premark: '备注'+i,
    pregister: '登记人'+i,
    pregistertime: '2022-11-0'+i,
    pchecker: '复核人'+i,
    pchecktime: '2022-11-0'+i,
    created: '2022-11-0'+i,
    updated: '2022-11-0'+i,
    pchecktag: 'S001-0',
    pseason: 'C002-1',
  });
}

const leftFixedColumn = ref(2);
const columns = ref([
  { colKey: 'pid', title: '序号',align: 'center',width: '80px'},
  { colKey: 'payid', title: '出库申请单号',align: 'center',width: '160px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'pstorer', title: '出库人',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'pamountsum', title: '总件数',width: '120px',align: 'center'},
  { colKey: 'pcostpricesum', title: '总金额',align: 'center',width: '120px'},
  { colKey: 'pgatheredamountsum', title: '出库总件数',align: 'center',width: '120px'},
  { colKey: 'pregister', title: '登记人',width: '120px',align: 'center'},
  { colKey: 'pregistertime', title: '登记时间',align: 'center',width: '140px'},
  { colKey: 'pchecker', title: '复核人',align: 'center',width: '120px'},
  { colKey: 'pchecktime', title: '复核时间',align: 'center',width: '120px'},
  { colKey: 'created', title: '更新时间',align: 'center',width: '120px'},
  { colKey: 'updated', title: '修改时间',align: 'center',width: '120px'},
  { colKey: 'pseason', title: '库存标志',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
  { colKey: 'pchecktag', title: '审核状态',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
]);

let paydetails = [] // 数据
for (let i = 1; i <= 5; i++) {
  paydetails.push({
    scproductid: '产品编号'+i,
    scproductname: '产品名称'+i,
    scamount: '数量'+i,
    scamountunit: '单位'+i*10,
    sccostprice: i*10,
    scubtotal: i*100,
    pdpaidamount: i*200
  });
}

const leftFixedColumns = ref(2);
const column = ref([
  { colKey: 'scproductid', title: '产品编号',align: 'center',width: '120px' ,fixed: leftFixedColumns.value >= 2 ? 'left' : undefined},
  { colKey: 'scproductname', title: '产品名称',align: 'center',width: '120px'},
  { colKey: 'scamount', title: '数量',align: 'center',width: '120px'},
  { colKey: 'scamountunit', title: '单位',align: 'center',width: '120px'},
  { colKey: 'sccostprice', title: '单价（元）',align: 'center',width: '120px'},
  { colKey: 'scubtotal', title: '小计（元）',align: 'center',width: '120px'},
  { colKey: 'pdpaidamount', title: '确认出库件数',align: 'center',width: '120px'},
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
const  drawerCloses = () => {
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
