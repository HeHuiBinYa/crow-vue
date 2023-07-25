<template>
  <t-row>
    <t-col :span="12">
      <t-row>
        <t-col :span="10">
          <!--  job：在职，depart：离职 -->
          <job-search v-if="start=='1'"/>
          <depart-search v-if="start=='0'"/>
        </t-col>

        <t-col :span="2" class="btn">
          <t-button class="btn-but" theme="primary" @click="search">搜索</t-button>
          <t-button class="btn-but" theme="warning" @click="reset">重置</t-button>

          <t-input-group>
            <t-select :options="job" class="btn-job" v-model="start"></t-select>
          </t-input-group>
        </t-col>
      </t-row>
    </t-col>

    <job-human v-if="start=='1'"/>
    <depart-human  v-if="start=='0'"/>
  </t-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import JobHuman from '@/components/human/job/JobHuman.vue'
import JobSearch from '@/components/human/job/JobSearch.vue'
import DepartHuman from '@/components/human/depart/DepartHuman.vue'
import DepartSearch from '@/components/human/depart/DepartSearch.vue'

const start = ref('1')
const job = [
  { label: '在职', value: '1' },
  { label: '离职', value: '0' }
]

const search = () => {
  console.log(start.value)
}

const reset = () => {
  console.log(1)
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

</style>
