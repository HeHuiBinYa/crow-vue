<template>
  <t-row id="message-toggle">
    <t-col :span="12" class="rol">
      <t-list class="st">
        <t-row>
          <t-col :span="12">
            <t-row>
              <t-col :span="3">
                <t-input-group class="groups">
                  <span class="titles">一级分类：</span>
                  <t-input type="text" v-model="sysHeroA.aname"  class="ranges"  placeholder="请输入你要查询的一级分类"/>
                </t-input-group>
              </t-col>

              <t-col :span="3">
                <t-input-group class="groups">
                  <span class="titles">二级分类：</span>
                  <t-input type="text" v-model="sysHeroB.bname"  class="ranges"  placeholder="请输入你要查询的二级分类"/>
                </t-input-group>
              </t-col>

              <t-col :span="3">
                <t-input-group class="groups">
                  <span class="titles">三级分类：</span>
                  <t-input type="text" v-model="sysHeroC.cname"  class="ranges"  placeholder="请输入你要查询的三级分类"/>
                </t-input-group>
              </t-col>
              <t-col :span="1">
                <t-button theme="success" @click="search" class="groups cl">搜索</t-button>
              </t-col>
              <t-col :span="1">
                <t-button theme="warning" class="groups cl" @click="visible = true">添加分类</t-button>
              </t-col>
            </t-row>
          </t-col>

          <t-col :span="11" class="hero" >
            <t-table
                row-key="index" :data="heroA.records" :columns="columnsA" :hover="true"
                @row-click="handleRowClick"  @row-dblclick="rowA"
            ></t-table>
          </t-col>
          <t-col :span="11" class="hero">
            <t-pagination class="page" v-model="sysHeroA.size" :total="heroA.total"
                          @page-size-change="onPageSizeChangeA" :max-page-btn="5" :folded-max-page-btn="5"
                          :page-size="sysHeroA.sizePage"
                          @current-change="onCurrentChangeA" :show-page-size="false"/>
          </t-col>

          <t-col :span="11" class="hero">
            <t-table
                row-key="index" :data="heroB.records" :columns="columnsB" :hover="true"
                @row-click="handleRowClick" @row-dblclick="rowB"
            ></t-table>
          </t-col>
          <t-col :span="11" class="hero">
            <t-pagination class="page" v-model="sysHeroB.size" :total="heroB.total"
                          @page-size-change="onPageSizeChangeB" :max-page-btn="5" :folded-max-page-btn="5"
                          :page-size="sysHeroB.sizePage"
                          @current-change="onCurrentChangeB" :show-page-size="false"/>
          </t-col>

          <t-col :span="11" class="hero">
            <t-table
                row-key="index" :data="heroC.records" :columns="columnsC" :hover="true" @row-dblclick="rowC"
            ></t-table>
          </t-col>
          <t-col :span="11" class="hero">
            <t-pagination class="page" v-model="sysHeroC.size" :total="heroC.total"
                          @page-size-change="onPageSizeChangeC" :max-page-btn="5" :folded-max-page-btn="5"
                          :page-size="sysHeroC.sizePage"
                          @current-change="onCurrentChangeC" :show-page-size="false"/>
          </t-col>

        </t-row>
      </t-list>
    </t-col>

    <t-col>
      <t-drawer
          v-model:visible="visible"
          header="添加分类"
          :on-overlay-click="() => (visible = false)"
          :placement="placement"
          @cancel="visible = false"
      >
        <t-row>
          <t-col :span="3" class="inp col">
            <t-button @click="addA" block theme="danger">添加一级分类</t-button>
            <t-input v-model="sysHeroA.sys_heroA.aName" />
          </t-col>

          <t-col :span="3" class="inp col">
            <t-button @click="addB" block theme="warning">添加二级分类</t-button>
            <t-select :options="data.heroA" v-model="sysHeroB.sys_heroB.aid"/>
            <t-input v-model="sysHeroB.sys_heroB.bName"/>
          </t-col>

          <t-col :span="3" class="inp col">
            <t-button @click="addC" block theme="success">添加三级分类</t-button>
            <t-select :options="data.heroB" v-model="sysHeroC.sys_heroC.bid"/>
            <t-input v-model="sysHeroC.sys_heroC.cName"/>
          </t-col>
        </t-row>
      </t-drawer>
    </t-col>

    <t-col>
      <t-drawer
          v-model:visible="visibles"
          :header="upd.title"
          :on-overlay-click="() => (visibles = false)"
          :placement="placements"
          @cancel="visibles = false" size="25%" @confirm="update"
      >
        <t-col :span="12" v-if="upd.title == '修改二级分类'">
          <span>{{upd.body}}</span>
          <t-select :options="data.heroA" v-model="upd.id"/>
        </t-col>

        <t-col :span="12" v-if="upd.title == '修改三级分类'">
          <span>{{upd.body}}</span>
          <t-select :options="data.heroB" v-model="upd.id"/>
        </t-col>

        <t-row>
          <t-col :span="12">
            <span>{{upd.body}}</span>
            <t-input v-model="upd.name" placeholder="请输入内容" />
          </t-col>
        </t-row>

      </t-drawer>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {sysHeroAStore} from "@/store/design/sysheroA/index"
import {addSysHeroA, pageSysHeroA, selectSysHeroAList,updateA} from "@/http/design/sysheroA";

import {sysHeroBStore} from "@/store/design/sysheroB/index"
import {addSysHeroB,selectSysHeroBList,pageSysHeroB,updateB} from "@/http/design/sysheroB";

import {sysHeroCStore} from "@/store/design/sysheroC/index"
import {addSysHeroC,pageSysHeroC,updateC} from "@/http/design/sysheroC";
import {MessagePlugin} from "tdesign-vue-next";

const visibles = ref(false)
const sysHeroA = ref(sysHeroAStore().data)
const data = ref({
  heroA: [{}],
  heroB: [{}],
})
const heroA = ref([{}])
const heroB = ref([{}])
const heroC =  ref([{}])

const upd = ref({
  title: "",
  body: "",
  name: "",
  id: "",
  did: ""
})


// 添加一级分类
const addA = () => {
  addSysHeroA().then(item => {
    if (item.code === 200){
      sysHeroA.value.sys_heroA.aName = ""
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      heroA.value = []
      pageSysHeroA().then(item => {
        heroA.value = item.data
      })
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }
  })
}

data.value.heroA = []
// 查询一级分类
selectSysHeroAList().then(item => {
  for (let i=0;i<item.data.length;i++){
    data.value.heroA.push({ label: item.data[i].aname, value: item.data[i].aid })
  }
})

const sysHeroB = ref(sysHeroBStore().data)
// 添加二级分类
const addB = () => {
  addSysHeroB().then(item => {
    if (item.code === 200){
      sysHeroB.value.sys_heroB.bName = ""
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      heroB.value = []
      pageSysHeroB().then(item => {
        heroB.value = item.data
      })
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }

  })
}

data.value.heroB = []
// 查询二级分类
selectSysHeroBList().then(item => {
  for (let i=0;i<item.data.length;i++){
    data.value.heroB.push({ label: item.data[i].bname, value: item.data[i].bid })
  }
})

const sysHeroC = ref(sysHeroCStore().data)
// 添加三级分类
const addC = () => {
  addSysHeroC().then(item => {
    if (item.code === 200){
      sysHeroC.value.sys_heroC.cName = ""
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      heroC.value = []
      pageSysHeroC().then(item => {
        heroC.value = item.data
      })
    }else{
      MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }
  })
}
const placement = ref('top');
const placements = ref('right');


const search = () => {
  heroA.value = []
  pageSysHeroA().then(item => {
    heroA.value = item.data
  })

  heroB.value = []
  pageSysHeroB().then(item => {
    heroB.value = item.data
  })

  heroC.value = []
  pageSysHeroC().then(item => {
    heroC.value = item.data
  })
}
search()

// 分页获得页数A
const onPageSizeChangeA = (size: any) => {
  sysHeroA.value.size = size
}
// 分页A
const onCurrentChangeA = (index: any, pageInfo: any) => {
  sysHeroA.value.size = index
  heroA.value = []
  pageSysHeroA().then(item => {
    heroA.value = item.data
  })
}

// 分页获得页数B
const onPageSizeChangeB = (size: any) => {
  sysHeroB.value.size = size
}
// 分页B
const onCurrentChangeB = (index: any, pageInfo: any) => {
  sysHeroB.value.size = index
  heroB.value = []
  pageSysHeroB().then(item => {
    heroB.value = item.data
  })
}

// 分页获得页数C
const onPageSizeChangeC = (size: any) => {
  sysHeroA.value.size = size
}
// 分页C
const onCurrentChangeC = (index: any, pageInfo: any) => {
  sysHeroC.value.size = index
  heroC.value = []
  pageSysHeroC().then(item => {
    heroC.value = item.data
  })
}

const visible = ref(false)

const rowA = (row: any) => {
  upd.value.did = heroA.value.records[row.index].aid
  upd.value.title = "修改一级分类"
  upd.value.body = "一级分类名称"
  visibles.value = true
  console.log(upd.value)
}


const rowB = (row: any) => {
  upd.value.did = heroB.value.records[row.index].bid
  upd.value.title = "修改二级分类"
  upd.value.body = "二级分类名称"
  visibles.value = true
  console.log(upd.value)
}

const rowC = (row: any) => {
  upd.value.did = heroC.value.records[row.index].cid
  upd.value.title = "修改三级分类"
  upd.value.body = "三级分类名称"
  visibles.value = true
  console.log(upd.value)
}

const columnsA = ref([
  { colKey: 'aname', title: '一级分类', align: 'center'},
  { colKey: 'created', title: '创建时间', align: 'center'},
  { colKey: 'updated', title: '更新时间', align: 'center'},
])

const columnsB = ref([
  { colKey: 'bname', title: '二级分类', align: 'center'},
  { colKey: 'created', title: '创建时间', align: 'center'},
  { colKey: 'updated', title: '更新时间', align: 'center'},
])

const columnsC = ref([
  { colKey: 'cname', title: '三级分类', align: 'center'},
  { colKey: 'created', title: '创建时间', align: 'center'},
  { colKey: 'updated', title: '更新时间', align: 'center'},
])

const handleRowClick= (value:any) => {
  // console.log(value)
}

const update = () => {
  if (upd.value.title == "修改二级分类"){
    updateB(upd.value).then(item => {
      if (item.code === 200){
        MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
        search()
        visibles.value = false
      }else{
        MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      }
    })
    return ""
  }else if(upd.value.title == "修改三级分类"){
    updateC(upd.value).then(item => {
      if (item.code === 200){
        MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
        search()
        visibles.value = false
      }else{
        MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      }
    })
    return ""
  }else{
    updateA(upd.value).then(item => {
      if (item.code === 200){
        MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
        search()
        visibles.value = false
      }else{
        MessagePlugin.error({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      }
    })
    return ""
  }
}
</script>

<style lang="scss" scoped>
.rol{
}
.st{
  height: 89vh;
  .hero{
    //border: 1px solid #e6aeae;
    margin: 10px 10px 10px 80px;
    p{
      font-size: 20px;
      text-align: center;
      padding: 10px;
    }
  }
  .inp{
    margin-top: 20px;
  }

}
.btn{
  margin: 10px 10px 10px 60px;
}
.col{
  margin: 10px 10px 10px 120px;
}
.groups{
  margin: 10px;
  .titles{
    width: 6vw;
    line-height: 30px;
    text-align: right;
  }
  .ranges{
    width: 10vw;
  }
}
</style>
