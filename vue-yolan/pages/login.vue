<template>
  <div class="login">
    <h1>
      <img src="../assets/images/logo-new.png">
      <div class="subhead">企业订单管理系统</div>
    </h1>
    <Form ref="formInline" :model="formInline" >
      <FormItem prop="username" class="userName" >
        <Input v-model="formInline.username"  @on-enter="login()" placeholder="用户名">
        <Icon class="iconfont icon-ren" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="pwd" class="pwd" >
        <Input v-model="formInline.password" type="password"  @on-enter="login()" placeholder="密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem >
        <Button @click="login()">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'login',
      formInline:{
        username:'',
        password:'',
      }
    }
  },
  methods:{
    login(){
      axios.get('/login',{params:this.formInline}).then(res=>{
        sessionStorage.setItem("login", this.formInline.username);
        sessionStorage.setItem("token", res.data);
        this.$router.push('/home/index')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .login {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    background: url("../assets/images/index.jpg") no-repeat;
    background-size: 100% 100%;
    h1{
      margin-top: 112px;
      img {
        width:43%;
      }
      div::before{
        content: '';
        width: 128px;
        height: 2px;
        background: #fff;
        position: absolute;
        left: -157px;
        top:14px;
      }
      div::after{
        content: '';
        width: 128px;
        height: 2px;
        background: #fff;
        position: absolute;
        right: -157px;
        top:14px;
      }
    }
    input{
      height: 32px !important;
      line-height: 32px !important;
      border: 0;
      font-size: 14px;
      background: rgba(209,219,225,0.1);
    }
    //让密码提示语居中及兼容
    .pwd input::-webkit-input-placeholder{
      color: #657180 !important;opacity:0.5;
      padding-left: 70px;
    }
    .pwd input:-ms-input-placeholder{
      color: #657180 !important;opacity:0.5;
      padding-left: 70px;
    }
    .pwd input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #657180 !important;opacity:0.5;
      padding-left: 70px;
    }
    .pwd input::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #657180 !important;opacity:0.5;
      padding-left: 70px;
    }
    //让用户名提示语居中及兼容
    .userName input::-webkit-input-placeholder{
      color: #657180 !important;opacity:0.5;
      padding-left: 63px;
    }
    .userName input:-ms-input-placeholder{
      color: #657180 !important;opacity:0.5;
      padding-left: 63px;
    }
    .userName input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #657180 !important;opacity:0.5;
      padding-left: 63px;
    }
    .userName input::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #657180 !important;opacity:0.5;
      padding-left: 63px;
    }
    button{
      width: 304px;
      height: 50px;
      background: #005b7a;
      border: 0;
      font-size: 16px;
      margin-top: 16px;
      color: #fff;
      position: relative;
      .masking{
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.3;
        position: absolute;
        top:0;
        left: 0;
        display: none;
      }
    }
    button:hover{
      background: #005b7a;
      border: 0;
      color: #fff;
      .masking{
        display: inline-block;
      }
    }
    i{
      color: #657180;
      font-size: 18px;
      opacity: 0.5;
    }
    .ivu-form-item-error-tip{
      /*padding-left: 67px;*/
      padding: 10px;
      background: rgba(255,120,105,0.8);
      left: 305px;
      color: #fff;
      top: -2px;
      display: inline-block;
      white-space: nowrap
    }
    .ivu-form-item-error-tip::before{
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-right: 6px solid rgba(255,120,105,0.8);
      border-bottom: 6px solid transparent;
      left: -6px;
    }
    form{
      margin: 50px auto 0;
      background: rgba(209,219,225,0.92);
      border-radius: 5px;
      width: 354px;
      height: 206px;
      padding: 20px 25px;
      .ivu-input-group-prepend{
        background: rgba(209,219,225,0.1);
        border: 0;
        width: 60px;
      }
      .ivu-input:focus{
        border-color: #dddee1;
        outline: 0;
        box-shadow: none;
      }
      .ivu-form-item-error .ivu-input{
        border:0;
      }
    }
    //用户名
    .userName{
      margin: 0 auto;
      width: 300px;
      height: 50px;
      border-bottom: 1px solid rgba(102,113,128,0.2);
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }
    //密码
    .pwd{
      margin:0 auto;
      width: 300px;
      height: 50px;
      padding-top: 10px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    //小标题
    .subhead{
      letter-spacing: 9px;
      color: #fff;
      position: relative;
      line-height: 29px;
      font-size: 22px;
      font-weight: 200;
      width: 248px;
      margin: -20px auto 0 ;
    }
  }

</style>
