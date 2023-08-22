<template>
  <t-col :span="6">
    <div>
      <t-row>
        <t-col :span="2">
          <h2>轮播图管理</h2>
        </t-col>
        <t-col :span="9">
          <t-upload
              ref="uploadRef3"
              v-model="file"
              action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
              theme="image"
              :abridge-name="[6, 6]"
              multiple
              :max="4"
              class="img-t"
          ></t-upload>
          <t-button class="img-btn" type="success">修改轮播图</t-button>
        </t-col>
      </t-row>
    </div>
  </t-col>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const file = ref([])

</script>

<style lang="scss" scoped>

</style>
