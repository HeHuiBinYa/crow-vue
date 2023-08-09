<template>
  <t-row id="message-toggle">
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <t-list style="height: 16vh">
            <t-input-group class="group">
              <span class="title">姓名：</span>
              <t-input type="text" class="range" v-model="employeeVo.ename" placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">性别：</span>
              <t-select :options="gender" class="range" v-model="employeeVo.sex" placeholder="请选择您要查询的性别"></t-select>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">年龄：</span>
              <t-input :style="{ width: '118px' }" v-model="employeeVo.tartingAge" />
              <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
              <t-input :style="{ width: '118px' }" v-model="employeeVo.endAge" />
            </t-input-group>

            <t-input-group class="group">
              <span class="title">电话：</span>
              <t-input type="text" class="range" v-model="employeeVo.tel" placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">部门：</span>
              <t-select :options="position" class="range" v-model="employeeVo.did" placeholder="请选择您要查询的部门"></t-select>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">职位：</span>
              <t-select :options="department" class="range" v-model="employeeVo.pid" placeholder="请选择您要查询的职位"></t-select>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">出生地址：</span>
              <t-input type="text" class="range" v-model="employeeVo.place" placeholder="请输入您要查询的年龄"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">出生日期：</span>
              <t-date-range-picker class="range" v-model="employeeVo.birth" mode="date" placeholder="请输入您要查询的出生地址"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">入职时间：</span>
              <t-date-range-picker class="range" v-model="employeeVo.entrytime" mode="date"/>
            </t-input-group>

            <t-input-group class="group">
              <span class="title">离职时间：</span>
              <t-date-range-picker class="range" v-model="employeeVo.leavetim" mode="date"/>
            </t-input-group>
          </t-list>
        </t-col>

        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary" @click="search">搜索</t-button>
          <t-button class="btn-but" theme="warning" @click="reset">重置</t-button>

          <t-input-group>
            <t-select :options="job" class="btn-job" v-model="employeeVo.state"></t-select>
          </t-input-group>
        </t-col>
      </t-row>
    </t-col>

    <t-col :span="12">
      <t-list>

        <t-table
            row-key="eid" :data="data.records" :columns="columns"
            :selected-row-keys="selectedRowKeys" select-on-row-click
            v-on:row-dblclick="dblclick" :loading="bool"
            :column-controller="{
               placement,
               fields: ['employee.staffid', 'employee.ename', 'employee.sex', 'employee.birth', 'employee.place', 'employee.age',
               'employee.tel', 'employee.entrytime', 'employee.leavetime', 'department.dname', 'position.position'],
               dialogProps: { preventScrollThrough: true },
               buttonProps: customText ? { content: '显示列控制', theme: 'primary', variant: 'base' } : undefined,
            }"

            hover="true"/>
      </t-list>
    </t-col>
    <t-col :span="12">
      <t-pagination class="page" v-model="employeeVo.size" :total="data.total"
                    :page-size="employeeVo.sizePage" @page-size-change="onPageSizeChange"
                    @current-change="onCurrentChange" :show-page-size="false"/>
    </t-col>
  </t-row>

  <t-drawer v-model:visible="visible" size="medium" :header="header"  :close-on-overlay-click="true" :on-confirm="drawerClose" :close-btn="true">
    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">姓名：</span>
        <t-input type="text" class="ranges" v-model="edit_employee.ename" placeholder="请输入姓名"/>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">性别：</span>
        <t-select :options="gender" class="ranges" v-model="edit_employee.sex" placeholder="请输入性别"></t-select>
      </t-input-group>
    </t-col>

    <!--        <t-col :span="12">-->
    <!--          <t-input-group class="groups">-->
    <!--            <span class="titles">出生日期：</span>-->
    <!--            <t-date-picker class="ranges"  v-model="edit_employee.birth" placeholder="请选择出生日期"/>-->
    <!--          </t-input-group>-->
    <!--        </t-col>-->

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">年龄：</span>
        <t-input type="text" class="ranges" v-model="edit_employee.age" placeholder="请输入年龄"/>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">电话：</span>
        <t-input type="text" class="ranges" v-model="edit_employee.tel" placeholder="请输入电话"/>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">出生地址：</span>
        <t-input type="text" class="ranges" v-model="edit_employee.place" placeholder="请输入出生地址"/>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">分配部门：</span>
        <t-select :options="position" class="ranges"  v-model:value="edit_employee.pid" placeholder="请选择您要查询的部门"></t-select>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">分配职位：</span>
        <t-select :options="department" class="ranges"  v-model:value="edit_employee.did" placeholder="请选择您要查询的职位"></t-select>
      </t-input-group>
    </t-col>

    <t-col :span="12">
      <t-input-group class="groups">
        <span class="titles">省份证号码：</span>
        <t-input type="text" class="ranges" v-model="edit_employee.card" placeholder="请输入姓名"/>
      </t-input-group>
    </t-col>

    <template #footer>
      <t-button @click="edit_associations">修改</t-button>
      <t-button variant="outline" @click="visible = false"> 取消 </t-button>
    </template>
  </t-drawer>
</template>

<script lang="ts" setup>
import {employeeStore} from "@/store/staff/employee"
import {ref} from "vue";
import {page_association,edit_association} from "@/http/staff/employee"

const employeeVo = ref(employeeStore().data.association.employeeVo)
const data = ref(employeeStore().data.association.data)
const edit_employee = ref(employeeStore().data.association.edit_employee)

const bool = ref(false); // 加载
const department = ref(employeeStore().$state.data.department)
const position = ref(employeeStore().$state.data.position)

const start = ref('1')
const job = [
  { label: '在职', value: 'ZZ-01' },
  { label: '离职', value: 'ZZ-02' }
]

const edit_associations = () => {
  edit_association().then(item => {
    if (item.code === 200){
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      QueryEmployee();
      return visible.value = false;
    }else{
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
      return ;
    }
  })
}

const QueryEmployee = () => {
  data.value = []
  bool.value = true
  page_association().then(item => {
    if (item.data.records.length > 0){
      for (let i=0;i<item.data.records.length;i++){
        if (item.data.records[i].department.updated != null){
          item.data.records[i].department.updateds =
              item.data.records[i].department.updated[0]+"年"+
              item.data.records[i].department.updated[1]+"月"+
              item.data.records[i].department.updated[2]+"日 "+
              item.data.records[i].department.updated[3]+":"+
              item.data.records[i].department.updated[4]+":"+
              item.data.records[i].department.updated[5]
        }else{
          item.data.records[i].department.updateds = "未修改"
        }
        if (item.data.records[i].department.created != null){
          item.data.records[i].department.createds =
              item.data.records[i].department.created[0]+"年"+
              item.data.records[i].department.created[1]+"月"+
              item.data.records[i].department.created[2]+"日 "+
              item.data.records[i].department.created[3]+":"+
              item.data.records[i].department.created[4]+":"+
              item.data.records[i].department.created[5]
        }else{
          item.data.records[i].department.createds = "未修改"
        }

        item.data.records[i].employee.state = item.data.records[i].employee.state === "ZZ-01" ? "在职" : item.data.records[i].employee.state === "ZZ-02" ? "离职" : "";
        if (item.data.records[i].employee.birth != null){
          item.data.records[i].employee.births =
              item.data.records[i].employee.birth[0]+"年"+
              item.data.records[i].employee.birth[1]+"月"+
              item.data.records[i].employee.birth[2]+"日 "
        }else{
          item.data.records[i].employee.births = "未修改"
        }
        if (item.data.records[i].employee.updated != null){
          item.data.records[i].employee.updateds =
              item.data.records[i].employee.updated[0]+"年"+
              item.data.records[i].employee.updated[1]+"月"+
              item.data.records[i].employee.updated[2]+"日 "+
              item.data.records[i].employee.updated[3]+":"+
              item.data.records[i].employee.updated[4]+":"+
              item.data.records[i].employee.updated[5]
        }else{
          item.data.records[i].employee.updateds = "未修改"
        }
        if (item.data.records[i].employee.created != null){
          item.data.records[i].employee.createds =
              item.data.records[i].employee.created[0]+"年"+
              item.data.records[i].employee.created[1]+"月"+
              item.data.records[i].employee.created[2]+"日 "+
              item.data.records[i].employee.created[3]+":"+
              item.data.records[i].employee.created[4]+":"+
              item.data.records[i].employee.created[5]
        }else{
          item.data.records[i].employee.createds = "未修改"
        }
        if (item.data.records[i].employee.entrytime != null){
          item.data.records[i].employee.entrytimes =
              item.data.records[i].employee.entrytime[0]+"年"+
              item.data.records[i].employee.entrytime[1]+"月"+
              item.data.records[i].employee.entrytime[2]+"日 "+
              item.data.records[i].employee.entrytime[3]+":"+
              item.data.records[i].employee.entrytime[4]+":"+
              item.data.records[i].employee.entrytime[5]
        }else{
          item.data.records[i].employee.entrytimes = "未修改"
        }
        if (item.data.records[i].employee.leavetime != null){
          item.data.records[i].employee.leavetimes =
              item.data.records[i].employee.leavetime[0]+"年"+
              item.data.records[i].employee.leavetime[1]+"月"+
              item.data.records[i].employee.leavetime[2]+"日 "+
              item.data.records[i].employee.leavetime[3]+":"+
              item.data.records[i].employee.leavetime[4]+":"+
              item.data.records[i].employee.leavetime[5]
        }else{
          item.data.records[i].employee.leavetimes = "未修改"
        }

        if (item.data.records[i].position.updated != null){
          item.data.records[i].position.updateds =
              item.data.records[i].position.updated[0]+"年"+
              item.data.records[i].position.updated[1]+"月"+
              item.data.records[i].position.updated[2]+"日 "+
              item.data.records[i].position.updated[3]+":"+
              item.data.records[i].position.updated[4]+":"+
              item.data.records[i].position.updated[5]
        }else{
          item.data.records[i].position.updateds = "未修改"
        }
        if (item.data.records[i].position.created != null){
          item.data.records[i].position.createds =
              item.data.records[i].position.created[0]+"年"+
              item.data.records[i].position.created[1]+"月"+
              item.data.records[i].position.created[2]+"日 "+
              item.data.records[i].position.created[3]+":"+
              item.data.records[i].position.created[4]+":"+
              item.data.records[i].position.created[5]
        }else{
          item.data.records[i].position.createds = "未修改"
        }
      }
    }
    data.value = item.data
    console.log(data.value)
    bool.value = false
  })
}
QueryEmployee()

const search = () => {
  employeeVo.value.size = 1
  console.log(employeeVo.value)
  QueryEmployee()
}

const reset = () => {
  employeeVo.value.ename = ""
  employeeVo.value.sex = ""
  employeeVo.value.birth = []
  employeeVo.value.place = ""
  employeeVo.value.tartingAge = ""
  employeeVo.value.endAge = ""
  employeeVo.value.tel = ""
  employeeVo.value.pid = ""
  employeeVo.value.did = ""
  employeeVo.value.state = "ZZ-01"
  employeeVo.value.entrytime = []
  employeeVo.value.leavetim = []
  QueryEmployee()
}

// 获取部门
list_position().then(item => {
  department.value = []
  for (let i=0;i<item.data.length;i++){
    department.value.push({label: item.data[i].position, value: item.data[i].pid})
  }
})
// 获取职位
list_department().then(item => {
  position.value = []
  for (let i=0;i<item.data.length;i++){
    position.value.push({label: item.data[i].dname, value: item.data[i].did})
  }
})

// 双击
const dblclick = (row: any) => {
  console.log(row)
  console.log(data.value.records[row.index])
  edit_employee.value.eid = data.value.records[row.index].employee.eid
  edit_employee.value.ename = data.value.records[row.index].employee.ename
  edit_employee.value.sex = data.value.records[row.index].employee.sex
  edit_employee.value.birth = data.value.records[row.index].employee.birth
  edit_employee.value.age = data.value.records[row.index].employee.age
  edit_employee.value.tel = data.value.records[row.index].employee.tel
  edit_employee.value.place = data.value.records[row.index].employee.place
  edit_employee.value.pid = data.value.records[row.index].position.pid
  edit_employee.value.did = data.value.records[row.index].department.did
  edit_employee.value.card = data.value.records[row.index].employee.card
  console.log(edit_employee)
  visible.value = true
}

const defaultGender = "请选择"
const gender = [
  { label: '男', value: '男' },
  { label: '女', value: '女' }
]
const header = ref("修改信息")
const visible = ref(false);

const placement = ref('top-left');
const customText = ref(false);

const leftFixedColumn = ref(2);
const columns = ref([
  { colKey: 'employee.eid', title: '序号',align: 'center',width: '80px'},
  { colKey: 'employee.staffid', title: '编号',align: 'center',width: '240px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'employee.ename', title: '姓名',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'left' : undefined},
  { colKey: 'employee.sex', title: '性别',width: '60px',align: 'center'},
  { colKey: 'employee.births', title: '出生日期',align: 'center',width: '150px'},
  { colKey: 'employee.place', title: '出生地址',align: 'center',width: '250px'},
  { colKey: 'employee.age', title: '年龄',width: '60px',align: 'center'},
  { colKey: 'employee.tel', title: '电话',align: 'center',width: '140px'},
  { colKey: 'department.dname', title: '部门',align: 'center',width: '120px'},
  { colKey: 'position.position', title: '职位',align: 'center',width: '120px'},
  { colKey: 'employee.entrytimes', title: '入职时间',align: 'center',width: '200px'},
  { colKey: 'employee.leavetimes', title: '离职时间',align: 'center',width: '150px'},
  { colKey: 'employee.createds', title: '创建时间',align: 'center',width: '200px'},
  { colKey: 'employee.updateds', title: '修改时间',align: 'center',width: '200px'},
  { colKey: 'employee.state', title: '在职状态',align: 'center',width: '120px',fixed: leftFixedColumn.value >= 2 ? 'right' : undefined},
]);

// 单选
const selectedRowKeys = ref([1]);

// 关闭
const  drawerClose = () => {
  visible.value = false
}

// 按钮
import { MessagePlugin } from 'tdesign-vue-next';
import {list_position} from "@/http/staff/position";
import {list_department} from "@/http/staff/department";

const current = ref(1);
const pageSize = ref(5);

const onPageSizeChange = (size: any) => {
  employeeVo.value.size = size
};

const onCurrentChange = (index: any, pageInfo: any) => {
  employeeVo.value.size = index
  QueryEmployee()
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
  margin: 10px;
  .titles{
    width: 6vw;
    line-height: 30px;
    text-align: right;
  }
  .ranges{
    width: 16vw;
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
  padding: 10px;
}
</style>
