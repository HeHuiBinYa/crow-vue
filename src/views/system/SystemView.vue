<template>
  <t-col :span="6" class="t-img">
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
        </t-col>
        <t-col :span="1">
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
.t-img{
  border: 1px solid red;
  border-radius: 10px;
  background-color: #b7c6d8;
  justify-content: center;
  h2{
    margin: 50px 5px 5px 20px;
  }
  .img-t{
    padding: 10px;
  }
  .img-btn{
    margin: 50px 50px 0px 0px;
    border: 1px solid red;
  }
}
</style>
