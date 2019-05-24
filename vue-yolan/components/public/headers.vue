<template>
  <div class="header-wrap">
    <div>
      <div class="logo-words">
        <img src="../../assets/images/logo-w.png"/>
        <img src="../../assets/images/logo-n.gif" style="position: absolute;z-index: 11;top:0;left:0;"/>
      </div>
      <div class="fl noopsyche">酷特智能台</div>
      <!--<div class="fl library">-->
        <!--<Dropdown @on-click="aaa">-->
          <!--<a href="javascript:void(0)">-->
            <!--图灵智库-->
            <!--<Icon type="arrow-down-b"></Icon>-->
          <!--</a>-->
          <!--<DropdownMenu slot="list" >-->
            <!--<DropdownItem name="cashier">收银台</DropdownItem>-->
          <!--</DropdownMenu>-->
        <!--</Dropdown>-->
      <!--</div>-->
    </div>
    <div class="fr rightPart">
      <div class="fl seek"><Icon type="android-search"></Icon></div>
      <div class="fl uniform" @click="aaa">收银台</div>
      <div class="fl uniform">功能1</div>
      <div class="fl uniform theUser" style="position: relative">
        <!--<span class="surname">{{username.substring(0,1)}}</span>-->
        <span class="surname" ref="randomColor">鞥</span>
        鞥阳海
        <!--{{ username }}-->
        <div class="controlPanel">
          <div class="consoleTop">
            <div class="details" >
              <div>
                <i class="iconfont icon-wenjian"></i>
              </div>
              <div>
                基本资料
              </div>
            </div>
            <div class="details">
              <div>
                <i class="iconfont icon-ren"></i>
              </div>
              <div>
                个人中心
              </div>
            </div>
            <div class="details">
              <div>
                <i class="iconfont icon-portal-icon-jiaose"></i>
              </div>
              <div>
                角色管理
              </div>
            </div>
          </div>
          <div class="white-bottom secede" @click='exit()'>
            <button class="white-bottom" >退出控制台</button>
          </div>
        </div>
      </div>
      <!--<div class="fl system-manage uniform">-->
      <!--<Dropdown style="margin-right: 10px">-->
      <!--<a href="javascript:void(0)">-->
      <!--{{ username }}-->
      <!--<Icon type="arrow-down-b"></Icon>-->
      <!--</a>-->
      <!--<DropdownMenu slot="list">-->
      <!--<DropdownItem @click.native='personUser()'>-->
      <!--<i class="iconfont icon-ren"></i>-->
      <!--<span>个人中心</span>-->
      <!--</DropdownItem>-->
      <!--<DropdownItem @click.native='exit()'>-->
      <!--<i class="iconfont icon-zhuxiao"></i>-->
      <!--<span>退出登录</span>-->
      <!--</DropdownItem>-->
      <!--</DropdownMenu>-->
      <!--</Dropdown>-->
      <!--</div>-->
      <div class="fr uniform">中文</div>
    </div>
    <Modal class="personage" v-model="personalCenterModal" width="500">
      <p slot="header" style="color:#eeebeb;">
        <span>个人中心</span>
      </p>
      <div class="tabper">
        <Tabs>
          <Tab-pane  class="permess" label="个人信息" style="padding: 20px 0 120px;">
            <Form label-position="left" :label-width="80">
              <Form-item label="登录账号：">
                <span>{{personInfo.username}}</span>
              </Form-item>
              <Form-item label="真实姓名：">
                <span>{{personInfo.name}}</span>
              </Form-item>
              <Form-item label="注册时间：">
                <span>{{dateChange(personInfo.createTime)}}</span>
              </Form-item>
              <Form-item label="所属部门：">
                <span>{{personInfo.department}}</span>
              </Form-item>
              <Form-item label="登录IP：">
                <span>{{personInfo.clientIp}}</span>
              </Form-item>
            </Form>
          </Tab-pane>
          <Tab-pane  class="passmess" label="密码修改" style="padding-top: 20px;">
            <Form ref='changePwd' :model="changePwd" :rules="ruleUserCustom"  label-position="left" :label-width="80">
              <Form-item label="原始密码：" prop="password">
                <Input type="password" @on-enter="submit('changePwd')" v-model="changePwd.password" style="width: 220px"></Input>
              </Form-item>
              <Form-item label="新密码：" prop="newpassword">
                <Input type="password" @on-enter="submit('changePwd')" v-model="changePwd.newpassword" style="width: 220px"></Input>
              </Form-item>
              <Form-item label="确认密码：" prop="confirmPassword">
                <Input type="password" @on-enter="submit('changePwd')" v-model="changePwd.confirmPassword" style="width: 220px"></Input>
              </Form-item>
              <Form-item  class="lastbutton">
                <Button class="logsearch" style="padding: 8px 26px;text-align: center" @click="submit('changePwd')">保存</Button>
              </Form-item>
            </Form>
          </Tab-pane>
        </Tabs>
      </div>
      <div slot="footer">

      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'hello',
    data () {
      const checkPwd = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入密码'))
        }else{
          this.personInfo.pwd = this.changePwd.password;

          this.$store.dispatch("actions_memberInfo",{"username":sessionStorage.getItem("user"),pwd:this.personInfo.pwd}).then(res=>{
            this.$Message.destroy()
            callback()
          }).catch(error=>{
            callback(new Error('密码错误，请重新输入！'))
          })
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.changePwd.confirmPassword !== '') {
            this.$refs.changePwd.validateField('confirmPassword');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        //console.log(value);
        //console.log(this.changePwd.newpassword);
        //console.log(this.changePwd.newpassword === value);
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.changePwd.newpassword != value) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        username:'',
        //个人中心对话框
        personalCenterModal:false,
        personInfo:{},
        //更改密码
        changePwd:{
          password:'',
          newpassword:'',
          confirmPassword:'',
        },
        msg: 'header',
        ruleUserCustom:{
          password: [
            {validator: checkPwd, trigger: 'blur',required:true}
          ],
          newpassword: [
            {validator: validatePass, trigger: 'blur',required:true},
            {min:5,message:'密码长度为5到32位',max:32}
          ],
          confirmPassword: [
            {validator: validatePassCheck, trigger: 'blur',required:true},
            {min:5,message:'密码长度为5到32位',max:32}
          ]
        },
      }
    },
    mounted(){
      this.username = sessionStorage.getItem('user');
      this.Color();
    },
    methods:{
      aaa(){
         this.$router.push('/home/money')
      },
      Color(){
    this.r = Math.floor(Math.random()*255);
    this.g = Math.floor(Math.random()*255);
    this.b = Math.floor(Math.random()*255);
    this.$refs.randomColor.style.background = 'rgba('+ this.r +','+ this.g +','+ this.b +',0.8)';
      },
      //时间转化
      dateChange(date){
        if (date) {
          let year = new Date(date).getFullYear();
          let month = new Date(date).getMonth() + 1;
          month < 10 ? month = '0' + month : month;
          let day = new Date(date).getDate();
          day < 10 ? day = '0' + day : day;
          let hour = new Date(date).getHours();
          hour < 10 ? hour = '0' + hour : hour;
          let minute = new Date(date).getMinutes();
          minute < 10 ? minute = '0' + minute : minute;
          let second = new Date(date).getSeconds();
          second < 10 ? second = '0' + second : second;
          return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
        } else {
          return ''
        }
      },
      // 个人中心
      personUser(){

        this.$refs['changePwd'].resetFields();
        this.$store.dispatch("actions_memberInfo",{"username":sessionStorage.getItem("user"),pwd:''}).then(res=>{
          this.personInfo = res.data
          this.personalCenterModal = true;
        })
      },
      // 保存修改密码
      submit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.personInfo.newPs = this.changePwd.newpassword;
            this.$store.dispatch("actions_change_pwd",this.personInfo).then(res=>{
              this.$Message.success('修改密码成功！')
              this.personalCenterModal = false
            })
          }
        })
      },
      // 退出登录
      exit(){
        sessionStorage.removeItem("menulist");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        this.$router.push({path:'/'});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .header-wrap{
    /*.ivu-select-dropdown{*/
    /*max-width: 150px;*/
    /*text-align: center;*/
    /*}*/
    .system-manage{
      min-width: 150px;
      text-align: right;
      padding-right: 20px;
      .ivu-dropdown{
        line-height:30px;
        a{
          font-size:14px;
          color:#fff;
        }
        .ivu-select-dropdown{
          max-width: 150px;
          text-align: center;
          right: 14px !important;
        }
      }
    }
    /*background-image:url(../assets/images/bg.png);*/
    height:50px;
    line-height: 50px;
    background: #373d41;
    color: #fff;
    //机器人logo
    .logo-words{
      float:left;
      width:49px;
      height:50px;
      border-right: 1px solid #2a2f32;
      img{
        width:49px;
        height:50px;
      }
    }
    .logo-words:hover{
      background: #2a2f32;
    }
    //酷特智能台
    .noopsyche{
      padding: 0 30px;
      border-right: 1px solid #2a2f32;
      cursor: pointer;
    }
    .noopsyche:hover{
      background: #2a2f32;
    }
    //图灵智库
    .library{
      padding:0 20px;
      .ivu-dropdown{
        a{
          color: #fff;
        }
      }
    }
    .library:hover{
      background: #2a2f32;
    }
    //右侧导航
    .rightPart{
      //搜索
      .seek{
        padding:0 20px;
        font-size: 20px;
        cursor: pointer;
      }
      .seek:hover{
        background: #2a2f32;
      }
      .uniform{
        padding: 0 20px;
        border-left: 1px solid #2a2f32;
        cursor: pointer;
        .surname{
          display:inline-block;
          width: 28px;
          height: 28px;
          /*background: #9e5eff;*/
          border-radius: 14px;
          vertical-align: middle;
          line-height: 28px;
          margin-right: 5px;
          text-align: center;
        }
        //退出控制台
        .controlPanel{
          position: absolute;
          width: 270px;
          background: #fff;
          z-index: 12;
          right: 0;
          box-shadow: 0 0 4px 7px rgba(0,0,0,0.10);
          display: none;
          .consoleTop{
            color: #657180;
            display: flex;
            padding: 0 15px;
            border-bottom: 1px solid #ddd;
            .details{
              flex: 1;
              margin: 8px 0;
              text-align: center;
              div{
                height: 40px;
              }
            }
            .details:hover{
              background: #f5f5f5;
            }
          }
          button{
            border: none;
            width: 100%;
            height: 100%;
            cursor: pointer;
            outline: 0;
          }
          button:hover{
            background: #f5f5f5!important;
          }
        }
      }
      .uniform:hover{
        background: #2a2f32;
      }
      .theUser{
        width: 150px;
      }
      .theUser:hover>.controlPanel{
        display: block;
      }
      .theUser:hover{
        background: #2a2f32;
      }
    }
  }
  .personage{
    .ivu-modal-wrap{
      .ivu-modal{
        .ivu-modal-content{
          height: 500px;
          .ivu-modal-header{
            padding:0;
            p{
              height: 38px;
              span{
                padding: 0px 15px;
                line-height: 40px;
              }
            }
          }
          .ivu-modal-body{
            .tabper{
              .ivu-form{
                padding: 0;
                .ivu-form-item{
                  padding-left: 100px;
                  margin-bottom: 15px;
                }
                .lastbutton{
                  padding-left: 0px;
                  margin: 143px 0 0;
                  .ivu-form-item-content{
                    text-align: center;
                    margin-left: 0 !important;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
