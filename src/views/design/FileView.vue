<template>
  <t-row style="height: 89vh">
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <t-list style="height: 16vh">
            <t-input-group class="group">
              <span class="title">产品编号：</span>
              <t-input type="text" class="range" v-model="files.pid"  placeholder="请输入您要查询的产品编号"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">产品名称：</span>
              <t-input type="text" class="range" v-model="files.name" placeholder="请输入您要查询的产品名称"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">供应商：</span>
              <t-input type="text" class="range" v-model="files.grou"  placeholder="请输入您要查询的出生地址"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">一级分类：</span>
              <t-select type="text" class="range" v-on:change="changeB" :options="datas.heroA" v-model="files.aid" placeholder="请选择您要查询的一级分类"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">二级分类：</span>
              <t-select type="text" class="range" v-on:change="changeC" :options="datas.heroB" v-model="files.bid" placeholder="请选择您要查询的二级分类"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">三级分类：</span>
              <t-select type="text" class="range" :options="datas.heroC" v-model="files.cid" placeholder="请选择您要查询的三级分类"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">用途类型：</span>
              <t-input type="text" class="range" v-model="files.type" placeholder="请选择您要查询的三级分类"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">计量单位：</span>
              <t-input type="text" class="range" v-model="files.unit" placeholder="请选择您要查询的三级分类"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">登记人：</span>
              <t-input type="text" class="range" v-model="files.register" placeholder="请选择您要查询的复核人"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">复核人：</span>
              <t-input type="text" class="range" v-model="files.checker" placeholder="请选择您要查询的复核人"/>
            </t-input-group>


            <t-input-group class="group">
              <span class="title">复核时间：</span>
              <t-date-range-picker class="range" v-model="files.startTime" mode="month"/>
            </t-input-group>

            <t-input-group class="group" >
              <span class="title">成本价格：</span>
              <t-input :style="{ width: '118px' }" v-model="files.startMoney" />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }" v-model="files.endMoney" />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">市场价格：</span>
              <t-input :style="{ width: '118px' }" v-model="files.startMoneys" />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }" v-model="files.endMoneys" />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">审核标志：</span>
              <t-select type="text" class="range" :options="check" v-model="files.checktag" placeholder="请选择您要查询的审核标志"/>
            </t-input-group>
          </t-list>
        </t-col>

        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary" @click="searchFileVo">搜索</t-button>
          <t-button class="btn-but" theme="warning" @click="reset">重置</t-button>
        </t-col>
      </t-row>
    </t-col>

    <t-col :span="12">
      <t-list>
        <t-table
            row-key="eid" :data="data.records" :columns="columns1"
            :selected-row-keys="selectedRowKeys" select-on-row-click
            v-on:row-dblclick="dblclick"
            :column-controller="{
               placement,
               fields: ['fid', 'pid', 'heroA.cname', 'heroB.cname', 'heroC.cname', 'type',
                'unit', 'grou', 'costprice', 'listprice', 'register', 'checker', 'checktime',
                 'created', 'updated'],
               dialogProps: { preventScrollThrough: true },
               buttonProps: customText ? { content: '显示列控制', theme: 'primary', variant: 'base' } : undefined,
            }"
            hover="true"/>
      </t-list>
    </t-col>
    <t-col :span="12">
      <t-pagination class="page" v-model="sysFileStore().files.size"
                    :page-size="sysFileStore().files.sizePage"
                    :total="data.total"
                    @change="onChange"
                    @page-size-change="onPageSizeChange"
                    :max-page-btn="5" :folded-max-page-btn="5"
                    @current-change="onCurrentChange" :show-page-size="false"/>
    </t-col>

    <t-col>
      <t-drawer v-model:visible="visible" size="50%" :header="header" :on-confirm="drawerClose" :close-btn="true">
        <t-row>
          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">设计人：</span>
              <t-input type="text" class="ranges" v-model="SysFile.register" />
            </t-input-group>
          </t-col>
          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">产品名称：</span>
              <t-input type="text" class="ranges" v-model="SysFile.name"  />
            </t-input-group>
          </t-col>
          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">一级分类：</span>
              <t-select type="text" class="ranges"  :options="datas.heroA" v-model="SysFile.aid"  />
            </t-input-group>
          </t-col>
          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">二级分类：</span>
              <t-select type="text" class="ranges"   :options="datas.heroB" v-model="SysFile.bid"  />
            </t-input-group>
          </t-col>
          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">三级分类：</span>
              <t-select type="text" class="ranges"   :options="datas.heroC" v-model="SysFile.cid"  />
            </t-input-group>
          </t-col>
          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">用途类型：</span>
              <t-input type="text" class="ranges" v-model="SysFile.type"  />
            </t-input-group>
          </t-col>
          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">计量单位：</span>
              <t-input type="text" class="ranges" v-model="SysFile.unit"  />
            </t-input-group>
          </t-col>
          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">供应商：</span>
              <t-input type="text" class="ranges" v-model="SysFile.grou"  />
            </t-input-group>
          </t-col>
          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">成本单价：</span>
              <t-input type="text" class="ranges" v-model="SysFile.costPrice"  />
            </t-input-group>
          </t-col>
          <t-col :span="6">
            <t-input-group class="groups">
              <span class="titles">市场单价：</span>
              <t-input type="text" class="ranges" v-model="SysFile.listPrice"  />
            </t-input-group>
          </t-col>


          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">产品描述：</span>
              <t-textarea type="text" class="tarea" v-model="SysFile.descr" />
            </t-input-group>
          </t-col>

          <t-col>
            <t-list>
              <t-button @click="inser">添加物料</t-button>
              <t-table
                  :data="SysFile.materials" :columns="columns2"
                  :selected-row-keys="RowKeys" select-on-row-click
                  v-on:row-dblclick="dblclickc"
                  hover="true"/>
            </t-list>
          </t-col>
        </t-row>
        <template #footer>
          <t-button @click="fileUpd">修改</t-button>
          <t-button theme="warning" @click="updTag">重新审核</t-button>
          <t-button variant="outline" @click="visible = false"> 取消 </t-button>
        </template>
      </t-drawer>

      <t-drawer v-model:visible="visibles" size="medium" :header="headers" :on-confirm="close" :close-btn="true">
        <t-row>
          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">物料单号：</span>
              <t-input type="text" v-model="mate.design" class="ranges" disabled />
            </t-input-group>
          </t-col>
          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">物料名称：</span>
              <t-input type="text" v-model="mate.designname" class="ranges"  />
            </t-input-group>
          </t-col>
          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">用途类型：</span>
              <t-select v-model="mate.type" :options="types" class="ranges"  />
            </t-input-group>
          </t-col>
          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">单价：</span>
              <t-input type="text" @blur="mate.pricesum = mate.price*mate.amount" v-model="mate.price" class="ranges"  />
            </t-input-group>
          </t-col>
          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">数量：</span>
              <t-input type="text" @blur="mate.pricesum = mate.price*mate.amount" v-model="mate.amount" class="ranges"/>
            </t-input-group>
          </t-col>
          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">单位：</span>
              <t-input type="text" v-model="mate.munit" class="ranges"  />
            </t-input-group>
          </t-col>
          <t-col :span="12">
            <t-input-group class="groups">
              <span class="titles">小计：</span>
              <t-input type="text" disabled v-model="mate.pricesum" class="ranges"  />
            </t-input-group>
          </t-col>

          <t-col :span="12">

            <t-input-group class="groups">
              <span class="titles">描述：</span>
              <t-textarea type="text" v-model="mate.describer" class="ranges"  />
            </t-input-group>
          </t-col>
        </t-row>
        <template #footer>
          <t-button theme="default" v-if="bool == false" @click="addMat">添加物料</t-button>
          <t-button theme="warning" v-if="bool == true" @click="updMat">修改物料</t-button>
          <t-button theme="danger" v-if="bool == true" @click="delMat">删除物料</t-button>
          <t-button variant="outline" > 取消 </t-button>
        </template>
      </t-drawer>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import { MessagePlugin } from 'tdesign-vue-next';
import {sysFileStore} from "@/store/design/file";
import {querySysFileVo, updateCheckTag, updateFile} from "@/http/design/sysFile";
import {selectSysHeroAList} from "@/http/design/sysheroA";
import {selectSysHeroBByCid} from "@/http/design/sysheroB";
import {selectSysHeroCByCid} from "@/http/design/sysheroC";
import {
  addMaterials,
  deleteSysMaterialsByMid,
  materialCompositionDesignListNumber,
  updateSysMaterials
} from "@/http/design/sysMaterials";

const data = ref(sysFileStore().files.data)
const header = ref("修改信息")
const headers =  ref("修改信息")
const visible = ref(false)
const visibles = ref(false)
const files = ref(sysFileStore().files)
const check = [
  { label: '等待审核', value: 'S001-0' },
  { label: '审核通过', value: 'S001-1' },
  { label: '审核不通过', value: 'S001-2' },
]
const types = [
  { label: "粉状合成", value: "粉状合成" },
  { label: "液体合成", value: "液体合成" },
]
const mate = ref(sysFileStore().mate)

const bool = ref(false)

const searchFileVo = () => {
  data.value.length = 0
  querySysFileVo().then(item => {
    for (let i=0;i<item.data.records.length;i++){
      if (item.data.records[i].updated != null){
        item.data.records[i].updated = item.data.records[i].updated[0]+"年"+item.data.records[i].updated[1]+"月"+item.data.records[i].updated[2]+"日"
      }
      if (item.data.records[i].created != null){
        item.data.records[i].created = item.data.records[i].created[0]+"年"+item.data.records[i].created[1]+"月"+item.data.records[i].created[2]+"日"
      }
      if (item.data.records[i].checkTime != null){
        item.data.records[i].checkTime = item.data.records[i].checkTime[0]+"年"+item.data.records[i].checkTime[1]+"月"+item.data.records[i].checkTime[2]+"日"
      }
    }
    data.value = item.data
  })
}
searchFileVo();

const leftFixedColumn = ref(2);
const placement = ref('top-left');
const customText = ref(false);
const columns1 = ref([
  { colKey: 'fid', title: '序号',align: 'center',width: '80px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'pid', title: '产品编号',align: 'center',width: '240px' ,fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'name', title: '产品名称',align: 'center',width: '260px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'heroA.aname', title: '一级分类',align: 'center',width: '240px'},
  { colKey: 'heroB.bname', title: '二级分类',align: 'center',width: '240px'},
  { colKey: 'heroC.cname', title: '三级分类',align: 'center',width: '260px'},
  { colKey: 'type', title: '用途类型',align: 'center',width: '120px'},
  { colKey: 'unit', title: '计量单位',align: 'center',width: '120px'},
  { colKey: 'grou', title: '供应商集合',align: 'center',width: '120px'},
  { colKey: 'costPrice', title: '成本单价',align: 'center',width: '120px'},
  { colKey: 'listPrice', title: '市场单价',align: 'center',width: '120px'},
  { colKey: 'register', title: '登记人',align: 'center',width: '120px'},
  { colKey: 'checker', title: '复核人',align: 'center',width: '120px'},
  { colKey: 'checkTime', title: '复核时间',align: 'center',width: '150px'},
  { colKey: 'created', title: '创建时间',align: 'center',width: '150px'},
  { colKey: 'updated', title: '更新时间',align: 'center',width: '150px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
  { colKey: 'checkTag', title: '审核标志',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined}
]);
const columns2 = ref([
  { colKey: 'design', title: '物料编号',align: 'center',width: '250px' },
  { colKey: 'designName', title: '物料名称',align: 'center',width: '120px'},
  { colKey: 'type', title: '用途类型',align: 'center',width: '120px'},
  { colKey: 'amount', title: '数量',align: 'center',width: '120px'},
  { colKey: 'munit', title: '单位',align: 'center',width: '120px'},
  { colKey: 'price', title: '单价（元）',align: 'center',width: '120px'},
  { colKey: 'priceSum', title: '小计（元）',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
]);

// 单选
const selectedRowKeys = ref([1]);
// 双击
const dblclick = (row: any) => {
  console.log(row)
  SysFile.value.materials= []
  SysFile.value.fid = data.value.records[row.index].fid
  SysFile.value.register = data.value.records[row.index].register
  SysFile.value.name = data.value.records[row.index].name
  SysFile.value.aid = data.value.records[row.index].heroA.aid
  SysFile.value.bid = data.value.records[row.index].heroB.bid
  SysFile.value.cid = data.value.records[row.index].heroC.cid
  SysFile.value.type = data.value.records[row.index].type
  SysFile.value.unit = data.value.records[row.index].unit
  SysFile.value.grou = data.value.records[row.index].grou
  SysFile.value.costPrice = data.value.records[row.index].costPrice
  SysFile.value.listPrice = data.value.records[row.index].listPrice
  SysFile.value.descr = data.value.records[row.index].descr
  SysFile.value.materials = data.value.records[row.index].materials

  datas.value.heroB = []
  selectSysHeroBByCid(SysFile.value.aid).then(item => {
    console.log(item)
    for (let i=0;i<item.data.length;i++){
      datas.value.heroB.push({ label: item.data[i].bname, value: item.data[i].bid })
    }
  })

  datas.value.heroC = []
  selectSysHeroCByCid(SysFile.value.bid).then(item => {
    console.log(item)
    for (let i=0;i<item.data.length;i++){
      datas.value.heroC.push({ label: item.data[i].cname, value: item.data[i].cid })
    }
  })

  visible.value = true
}
// 关闭
const  drawerClose = () => {
  visible.value = false
}


// 单选
const RowKeys = ref([1]);
// 双击
const dblclickc = (row: any) => {
  headers.value = "修改物料"
  console.log(SysFile.value.materials[row.index])
  mate.value.mid = SysFile.value.materials[row.index].mid
  mate.value.design = SysFile.value.materials[row.index].design
  mate.value.designname = SysFile.value.materials[row.index].designName
  mate.value.type = SysFile.value.materials[row.index].type
  mate.value.describer = SysFile.value.materials[row.index].describer
  mate.value.pricesum = SysFile.value.materials[row.index].pricesum
  mate.value.amount = SysFile.value.materials[row.index].amount
  mate.value.munit = SysFile.value.materials[row.index].munit
  mate.value.price = SysFile.value.materials[row.index].price
  mate.value.pricesum = SysFile.value.materials[row.index].priceSum
  visibles.value = true
  bool.value = true
}
// 关闭
const  close = () => {
  visibles.value = false
}

const onPageSizeChange = (size: any) => {
  sysFileStore().files.size = size.index
};

const onCurrentChange = (index: any, pageInfo: any) => {
  sysFileStore().files.size = index
};

const onChange = (pageInfo: any) => {
  searchFileVo();
};


const reset = () => {
  files.value.pid = ""
  files.value.name = ""
  files.value.grou = ""
  files.value.aid = ""
  files.value.bid = ""
  files.value.cid = ""
  files.value.type = ""
  files.value.unit = ""
  files.value.register = ""
  files.value.checker = ""
  files.value.startTime = ""
  files.value.startMoney = ""
  files.value.endMoney = ""
  files.value.startMoneys = ""
  files.value.endMoneys = ""
  files.value.checktag = ""
  searchFileVo()
}

const datas = ref({
  heroA: [{}],
  heroB: [{}],
  heroC: [{}]
})

datas.value.heroA = []
selectSysHeroAList().then(item => {
  for (let i=0;i<item.data.length;i++){
    datas.value.heroA.push({ label: item.data[i].aname, value: item.data[i].aid })
  }
})

const changeB = (value: any, context: any) => {
  console.log(value)
  console.log(context)
  datas.value.heroB = []
  selectSysHeroBByCid(files.value.aid).then(item => {
    console.log(item)
    for (let i=0;i<item.data.length;i++){
      datas.value.heroB.push({ label: item.data[i].bname, value: item.data[i].bid })
    }
  })
}

const changeC = (value: any, context: any) => {
  console.log(value)
  console.log(context)
  datas.value.heroC = []
  selectSysHeroCByCid(files.value.bid).then(item => {
    console.log(item)
    for (let i=0;i<item.data.length;i++){
      datas.value.heroC.push({ label: item.data[i].cname, value: item.data[i].cid })
    }
  })
}

const SysFile = ref(sysFileStore().files.SysFile)

const fileUpd = () => {
  console.log(SysFile)
  updateFile().then(item => {
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
      searchFileVo();
      visible.value = false
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}


// 添加按钮
const inser = () => {
  materialCompositionDesignListNumber().then(item => {
    mate.value.design = item.data
  })
  headers.value = "添加物料"
  mate.value.mid = ""
  mate.value.designname = ""
  mate.value.type = ""
  mate.value.describer = ""
  mate.value.amount = ""
  mate.value.munit = ""
  mate.value.price = ""
  mate.value.pricesum = ""
  visibles.value = true
  bool.value = false
}

const addMat = () => {
  addMaterials(mate.value).then(item => {
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
      searchFileVo();
      visible.value = false
      visibles.value = false
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}

const delMat = () => {
  deleteSysMaterialsByMid().then(item => {
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
      searchFileVo();
      visible.value = false
      visibles.value = false
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}

const updMat = () => {
  updateSysMaterials(mate.value).then(item => {
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
      searchFileVo();
      visible.value = false
      visibles.value = false
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}

const updTag = () => {
  updateCheckTag().then(item => {
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
      searchFileVo();
      visible.value = false
      visibles.value = false
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1, attach: '#message-toggle'})
    }
  })
}
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
    width: 100px;
    text-align: right;
    line-height: 30px;
  }
  .ranges{
    width: 250px;
  }
  .tarea{
    width: 700px;
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
  margin: 10px;
}
.range{
  width: 155px;
}
</style>
