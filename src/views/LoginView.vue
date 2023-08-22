<template>
  <t-row class="row-1" id="message-toggle">
    <t-col class="col">
      <t-row class="row-2">
        <t-col class="col-s-0">
          <h1> E R P 企 业 资 源 管 理 系 统</h1>
          <t-space break-line>
            <span>正直</span>
            <t-divider layout="vertical" />
            <span>进取</span>
            <t-divider layout="vertical" />
            <span>协作</span>
            <t-divider layout="vertical" dashed />
            <span>创造</span>
          </t-space>
        </t-col>

        <t-col class="col-s-1">
          <t-row class="s-row">
            <t-col><p></p></t-col>
            <t-col><p></p></t-col>
            <t-col><p></p></t-col>
            <t-col><p></p></t-col>
            <t-col><p></p></t-col>

            <t-col class="col-1" :xs="0" :sm="0" :md="0" :lg="{span:4,offset:2}" :xl="{span:4,offset:2}">
              <t-swiper class="swiper" :duration="300" :interval="2000">
                <t-swiper-item class="swiper-item" v-for="(item,index) in img" :key="index">
                  <img class="img" v-bind:src="item"/>
                </t-swiper-item>
              </t-swiper>
            </t-col>

            <t-col class="col-2" :xs="12" :sm="{span:8,offset:2}" :md="{span:8,offset:2}" :lg="{span:4,offset:0}" :xl="4">
              <t-col>
                <h1>用户登录</h1>
              </t-col>
              <t-col :span="8" :offset="2">
                <t-input class="input" v-model="store.user.username" label="账号" placeholder="请输入您的账号" size="large"/>
                <t-input class="input" v-model="store.user.password" label="密码" placeholder="请输入您的密码" size="large" type="password"/>

<!--                <t-select v-model="store.user.role" class="input" size="large">-->
<!--                  <template v-for="(item,index) in auth" :key="index">-->
<!--                    <t-option :value="item.role">{{item.role}}</t-option>-->
<!--                  </template>-->
<!--                </t-select>-->

                <t-button @click="logon" class="input" block="true" variant="dashed" size="large" ghost>登录</t-button>
              </t-col>
            </t-col>


            <t-col class="col-3">
              <p>成功是努力的结晶，只有努力才会有成功</p>
            </t-col>
          </t-row>
        </t-col>
      </t-row>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import router from "@/router";
import {login,getRole} from "@/http/auth/index";
import {userStore} from "@/store/user";
import {ref} from "vue";
import {MessagePlugin} from "tdesign-vue-next";

const store = ref(userStore())
const auth = ref([])
const msg = ref()

const img = [
  'https://resources.hehuibin.cn/2250496833.jpeg',
  'https://resources.hehuibin.cn/2250496834.jpeg',
  'https://resources.hehuibin.cn/2250496835.jpeg',
  'https://resources.hehuibin.cn/2250496836.jpeg']

const logon = function (){
  login(store.value.user).then(item => {
    if (item.code == 200){
      store.value.user.tok = item.data.tok;
      store.value.user.username = item.data.username;
      store.value.user.role = item.data.role;
      store.value.user.password = "";
      router.push("/home")
    }else{
      msg.value = MessagePlugin.info({content: item.message, duration: 1000, zIndex: 1001, attach: '#message-toggle'})
    }
  })
}

// if (auth.value.length == 0){
//   getRole().then(item => {
//     auth.value=item.data
//     store.user.role=item.data[0].role
//   })
// }

</script>

<style lang="scss">
.row-1{
  text-align: center;
  .col{
    background: url("../assets/login/logo.jpg");
    background-size: cover;
    height: 100vh;
    .row-2{
      .col-s-0{
        color: aliceblue;
        h1{
          font-size: 60px;
        }
      }

      .col-s-1{
        height: 41.8vw;
        .s-row{
          .col-1{
            .swiper{
              .swiper-item{
                .img{
                  height: 50vh;
                }
              }
            }
          }
          .col-2{
            background: rgba(116, 62, 62, 0.2);
            height: 50vh;
            h1{
              font-size: 40px;
              color: aliceblue;
              margin-top: 90px;
            }
            .input{
              margin: 15px;
            }
          }
          .col-3{
            p{
              font-size: 20px;
              color: aliceblue;
              margin-top: 120px;
            }
          }
        }
      }
    }
  }
}
</style>
