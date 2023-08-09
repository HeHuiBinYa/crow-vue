<template>
  <t-col :span="12" style="height: 89vh">
    <t-row id="message-toggle">
      <t-col :span="12">
        <h1 style="color: #007cf5">员工入职登记</h1>
        <t-divider />
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">编号：</span>
          <t-input type="text" v-model="employee.staffid" class="range" disabled placeholder="请生成编号"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">姓名：</span>
          <t-input type="text" v-model="employee.ename" class="range" placeholder="请输入姓名"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">性别：</span>
          <t-select type="text"  v-model:value="employee.sex" :options="sex"  class="range" placeholder="请选择分配部门"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">年龄：</span>
          <t-input type="text" v-model="employee.age" class="range" placeholder="请输入年龄"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">电话：</span>
          <t-input type="text" v-model="employee.tel" class="range" placeholder="请输入电话"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">分配部门：</span>
          <t-select type="text"  v-model:value="employee.position.pid" :options="position"  class="range" placeholder="请选择分配部门"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">分配职位：</span>
          <t-select type="text"  v-model:value="employee.department.did" :options="department"  class="range" placeholder="请选择分配职位"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">出生日期：</span>
          <t-date-picker class="range" v-model="employee.birth" placeholder="请选择出生日期"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">出生地址：</span>
          <t-input type="text" v-model="employee.place"  class="range" placeholder="请输入出生地址"/>
        </t-input-group>
      </t-col>

      <t-col :span="12">
        <t-input-group class="group">
          <span class="title">省份证号码：</span>
          <t-input type="text" v-model="employee.card" class="range" placeholder="请输入省份证号码"/>
        </t-input-group>
      </t-col>

      <t-col :span="2">
        <t-button class="btn" block @click="entry">入职</t-button>
        <t-button class="btn" block @click="reset">重置</t-button>
      </t-col>
    </t-row>
  </t-col>
</template>

<script lang="ts" setup>
import {employeeStore} from "@/store/staff/employee";
import {getStaffId,increase_association} from "@/http/staff/employee"
import {list_position} from "@/http/staff/position"
import {list_department} from "@/http/staff/department"
import {ref} from "vue";
import {MessagePlugin} from "tdesign-vue-next";

const  employee = ref(employeeStore().$state.data.employee)
const department = ref(employeeStore().$state.data.department)
const position = ref(employeeStore().$state.data.position)
const sex = [
  {label: "男", value: "男"},
  {label: "女", value: "女"}
]

// 获取员工编号
if (employee.value.staffid === ""){
  getStaffId().then(item => {
    employee.value.staffid = item.data
  })
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

// 入职
const entry = () => {
  increase_association().then(item => {
    if (item.code === 200){
      reset()
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }else{
      console.log(item)
      MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }
  })
}

// 重置
const reset = () => {
  employee.value.ename = ""
  employee.value.sex = ""
  employee.value.birth = ""
  employee.value.place = ""
  employee.value.age = ""
  employee.value.tel = ""
  employee.value.card = ""
  employee.value.department.did = ""
  employee.value.position.pid = ""
  getStaffId().then(item => {
    employee.value.staffid = item.data
  })
}

</script>

<style lang="scss" scoped>
.group{
  margin: 10px;
  .title{
    width: 6vw;
    line-height: 30px;
    text-align: right;
  }
  .range{
    width: 20vw;
  }
}
.btn{
  margin: 10px 10px 10px 200px;
}
</style>
