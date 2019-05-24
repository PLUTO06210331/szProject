<template>
  <div  class="delivery-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
          <span>系统设置 /</span>
          <span>用户管理</span>
        </span>
        <span slot="footer" class="com-slot-right">
           <span class="T3 main-heading" @click="leftInsertShow=true;staffOption=[]"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline" style="margin-left:-1px"></Icon></span>新增用户</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="用户名" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.username" @on-enter="search()"></Input>
            <Input style="display:none"></Input>
          </Form-item>
          <!-- <Form-item label="订单号" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.orderid" @on-enter="search()"></Input>
          </Form-item>
          <Form-item label="创建时间" :label-width="65" class="selectTime technicalDates specialCase">
            <Date-picker type="daterange" v-model="searchFrom.createDate"  :options="date0ptions"></Date-picker>
          </Form-item> -->
          <Form-item class="specialHandling .specialHandling">
            <Button icon="search" @click="search" @on-enter="search"></Button>
          </Form-item>
        </Form>
        <div style="clear: both"></div>
        <div id="tableBox" ref="tableBox">
          <Table border :columns="columns" :data="data"></Table>
        </div>
        <page-current ref="pages" class="pages-position" :total="totals" @pageChange="pageListen"></page-current>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <div v-if="leftInsertShow">
      <Modal v-model="leftInsertShow" class-name="delect big-sized" :mask-closable=false  width="700" v-drag @on-cancel="cancels('leftInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增用户信息</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="leftInsertInfo" class="searchForm" label-position="left" :model="leftInsertInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
            <Form-item prop="username"  label="用户名:" :label-width="70" >
              <Input v-model="leftInsertInfo.username"></Input>
            </Form-item>
            <Form-item prop="password"  label="密码:" :label-width="90" >
              <Input v-model="leftInsertInfo.password" type="password"></Input>
            </Form-item>
            <Form-item prop="name" label="姓名:" :label-width="70" >
              <Input v-model="leftInsertInfo.name" ></Input>
            </Form-item>
            <Form-item prop="gender"  label="性别:" :label-width="70">
              <Select v-model="leftInsertInfo.gender">
                <Option :value="'1'">男</Option>
                <Option :value="'0'">女</Option>
              </Select>
            </Form-item>
            <Form-item prop="tel"  label="电话" :label-width="70" >
              <Input v-model="leftInsertInfo.tel"></Input>
            </Form-item>
              <Form-item prop="measurecode"  label="量体师编码:" :label-width="95" >
              <Input v-model="leftInsertInfo.measurecode"></Input>
            </Form-item>
            <Form-item prop="mtmaccount"  label="下单系统账号:" :label-width="95" >
              <Input v-model="leftInsertInfo.mtmaccount"></Input>
            </Form-item>
            <Form-item prop="mtmpassword"  label="下单系统密码:" :label-width="95" >
              <Input v-model="leftInsertInfo.mtmpassword" type="password"></Input>
            </Form-item>
            <Form-item prop="storeid"  label="门店:" :label-width="70" >
              <Select v-model="leftInsertInfo.storeid" @on-change="getStaff(leftInsertInfo.storeid)">
                <Option v-for="(store,index) in storeOption" :value="store.id" :key="index">{{store.name}}</Option>
              </Select>
            </Form-item>
            <Form-item prop="staffid"  label="店员:" :label-width="70" >
              <Select v-model="leftInsertInfo.staffid">
                <Option v-for="(staff,index) in staffOption" :value="staff.id" :key="index">{{staff.name}}</Option>
              </Select>
            </Form-item>
            <Form-item prop="status"  label="状态:" :label-width="70" >
              <Select v-model="leftInsertInfo.status">
                <Option :value="'1'">启用</Option>
                <Option :value="'0'">禁用</Option>
              </Select>
            </Form-item>
            <Form-item prop="isuserno"  label="客户单号下单:" :label-width="100" >
              <Select v-model="leftInsertInfo.isuserno">
                <Option :value="'0'">否</Option>
                <Option :value="'1'">是</Option>
              </Select>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="leftInsertSave('leftInsertInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!-- 编辑弹窗 -->
    <div v-if="leftEditShow">
      <Modal v-model="leftEditShow" class-name="delect big-sized" :mask-closable=false  width="700" v-drag @on-cancel="cancels('leftEditInfo')">
        <p slot="header">
          <span class="main-heading">编辑用户信息</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="leftEditInfo" class="searchForm" label-position="left" :model="leftEditInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
            <!-- <Form-item prop="username"  label="用户名:" :label-width="70" >
              <Input v-model="leftEditInfo.username"></Input>
            </Form-item> -->
            <Form-item prop="password"  label="密码:" :label-width="90" >
              <Input v-model="leftEditInfo.password" type="password"></Input>
            </Form-item>
            <Form-item prop="name" label="姓名:" :label-width="70" >
              <Input v-model="leftEditInfo.name" ></Input>
            </Form-item>
            <Form-item prop="gender"  label="性别:" :label-width="70">
              <Select v-model="leftEditInfo.gender">
                <Option :value="'1'">男</Option>
                <Option :value="'0'">女</Option>
              </Select>
            </Form-item>
            <Form-item prop="tel"  label="电话" :label-width="70" >
              <Input v-model="leftEditInfo.tel"></Input>
            </Form-item>
             <Form-item prop="measurecode"  label="量体师编码:" :label-width="95" >
              <Input v-model="leftEditInfo.measurecode"></Input>
            </Form-item>
            <Form-item prop="mtmaccount"  label="下单系统账号:" :label-width="95" >
              <Input v-model="leftEditInfo.mtmaccount"></Input>
            </Form-item>
            <Form-item prop="mtmpassword"  label="下单系统密码:" :label-width="95" >
              <Input v-model="leftEditInfo.mtmpassword" type="password"></Input>
            </Form-item>
            <Form-item prop="storeid"  label="门店:" :label-width="70" >
              <Select v-model="leftEditInfo.storeid" @on-change="getStaff(leftEditInfo.storeid)">
                <Option v-for="(store,index) in storeOption" :value="store.id" :key="index">{{store.name}}</Option>
              </Select>
            </Form-item>
            <Form-item prop="staffid"  label="店员:" :label-width="70" >
              <Select v-model="leftEditInfo.staffid">
                <Option v-for="(staff,index) in staffOption" :value="staff.id" :key="index">{{staff.name}}</Option>
              </Select>
            </Form-item>
            <Form-item prop="status"  label="状态:" :label-width="70" >
              <Select v-model="leftEditInfo.status">
                <Option :value="1">启用</Option>
                <Option :value="0">禁用</Option>
              </Select>
            </Form-item>
            <Form-item prop="isuserno"  label="客户单号下单:" :label-width="100" >
              <Select v-model="leftEditInfo.isuserno">
                <Option :value="0">否</Option>
                <Option :value="1">是</Option>
              </Select>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="leftEditSave('leftEditInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!-- 详情弹窗 -->
     <div v-if="detailsModalShow">
      <Modal v-model="detailsModalShow"  width="870" class-name="delectNopad" :mask-closable=false  v-drag >
        <p slot="header">
          <span class="main-heading">用户详情</span>
        </p>
        <div class="autoDiv">
          <div class="modalContent" style="text-align:center">
            <h4>基本信息</h4>
            <Form class="basicForm searchForm" :label-width="80"  inline style="text-align: left">
              <Row class="detailRow">
                <i-col span="8">
                  <Form-item label="用户名:">
                    {{tableSeeInfo.username}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="姓名:">
                    {{tableSeeInfo.name}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="性别:">
                    {{tableSeeInfo.gender==='1'?'男':'女'}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="电话:">
                    {{tableSeeInfo.tel}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="下单系统账号:">
                    {{tableSeeInfo.mtmaccount}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="量体师编码:">
                    {{tableSeeInfo.measurecode}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="门店:">
                    {{storeName(tableSeeInfo.storeid)}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="店员:">
                    {{tableSeeInfo.staffid}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="状态:">
                    {{tableSeeInfo.status==='1'?'启用':'禁用'}}
                  </Form-item>
                </i-col>
              </Row>
            </Form>
          </div>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
    <!-- 删除弹窗 -->
    <div v-if="DeleteShow">
        <Modal v-model="DeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
          <p slot="header" class="main-heading">
            提示框
          </p>
          <div>
            <Icon type="information-circled"></Icon>确认删除此条信息吗？
          </div>
          <div slot="footer">
            <div class="footer">
              <Button  class="save" @click="DeleteSave">确认</Button>
              <Button  class="clear" @click="DeleteShow=false">取消</Button>
            </div>
          </div>
        </Modal>
      </div>
  </div>
</template>
<script>
  import HeaderSlot from "../../components/public/head-slot.vue";
  import page from '../../components/public/page-current.vue';
export default {
  data(){
    const tel = (rule, value, callback) => {
          if (value === "" || value === null||value === undefined) {
          callback(new Error('请输入电话'));
          } else {
          if (value.length > 20){
            callback(new Error('电话长度不能多于20位'));
          }else if(!/^[\d\-]+$/.test(value)) {
              callback(new Error('电话格式错误'));
          } else {
            callback();
          }
          }
      };
    return{
      //搜索条件
        searchFrom:{
          username:'',
          // orderid:'',
          pageIndex:1,
          pageSize:10,
          createDate:'',
          beginTime:'',
          endTime:'',
        },
        storeOption:'',
        staffOption:'',
        leftInsertInfo:{
          username:'',
          name:'',
          tel:'',
          gender:'1',
          status:'1',
          mtmaccount:'',
          measurecode:'',
          mtmpassword:'',
          password:'',
          storeid:'',
          staffid:'',
          isuserno:0
        },
        leftEditInfo:{
          username:'',
          name:'',
          tel:'',
          id:0,
          gender:'1',
          status:'1',
          mtmaccount:'',
          measurecode:'',
          password:'',
          mtmpassword:'',
          isuserno:null
        },
        tableInsertShow:false,
        detailsModalShow:false,
        leftInsertShow:false,
        leftEditShow:false,
        DeleteInfo:'',
        DeleteShow:false,
        totals:1,
        tableSeeInfo:'',
        data:[],
         columns: [   //table
          {
            title: '序号',
            width:'4%',
            type:'index',
            align: 'center',
          },
          {
            title: '用户名',
            width:'10%',
            key: 'username',
            align: 'center',
          },
          {
            title: '姓名',
            width:'10%',
            key: 'name',
            align: 'center',
          },
          {
            title: '性别',
            width:'10%',
            key: 'gender',
            align: 'center',
            render:(h,params)=>{
              return h('span',{},params.row.gender==='1'?'男':'女')
            }
          },
          {
            title: '电话',
            width:'10%',
            key: 'tel',
            align: 'center',
          },
          {
            title: '下单系统账号',
            width:'10%',
            key: 'mtmaccount',
            align: 'center',
          },
          {
            title: '量体师编码',
            width:'10%',
            key: 'measurecode',
            align: 'center',
          },
          {
            title: '状态',
            width:'10%',
            key: 'status',
            align: 'center',
            render:(h,params)=>{
              return h('span',params.row.status==='1'?'启用':'禁用')
            }
          },

          {
            title: '操作',
            width:'20%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    class: 'blueButton ',
                    style: {
                      marginLeft: '8px',
                      background:"#fff",
                    },
                    on: {
                      click: () => {
                        this.tableSee(params.row)
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-chakan',
                    }),

                    h('span',{
                    },'查看')
                  ]
                ),
                h('Button', {
                    class: 'greenButton ',
                    style: {
                      marginLeft: '8px',
                      background:"#fff",
                    },
                    on: {
                      click: () => {
                          this.leftEditShow = true
                          this.leftEditInfo.id = params.row.id
                          this.tableDone(params.row)
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-bianji',
                    }),

                    h('span',{
                    },'编辑')
                  ]
                ),
                h('Button', {
                    class: 'yellowButton',
                    style: {
                      background:"#fff",
                      marginLeft: '8px',
                      marginRight: '8px',
                    },
                    on: {
                      click: () => {
                        this.DeleteShow = true
                        this.DeleteInfo = params.row.id;
                      }
                    },
                  },[
                    h('i',{
                      class:'iconfont icon-qingkong',
                    }),
                    h('span',{

                    },'删除')
                  ]
                ),
              ]);
            }
          }
        ],
        //验证
        leftInsertRule:{
          username: [
            { required: true,message:'请填写用户名', trigger: 'blur' },
            { max:10,message: '用户名不能超过10位', trigger: 'blur'}
          ],
          name: [
            { required: true,message:'请填写姓名', trigger: 'blur' },
            { max:10,message: '姓名不能超过10位', trigger: 'blur'}
          ],
          tel: [
            { required: true,validator:tel, trigger: 'blur' },
            // { max:13,message: '电话不能超过13位', trigger: 'blur'}
          ],
          measurecode:[
            { required: true,message:'请填写量体师编码', trigger: 'blur' },
            { max:10,message: '量体师编码不能超过10位', trigger: 'blur'}
          ],
          password: [
            { required: true,message:'请填写密码', trigger: 'blur' },
            {min:5,message:'密码长度为5到32位',max:32}
          ],
          mtmpassword: [
            { required: true,message:'请填写密码', trigger: 'blur' },
            {message:'最长密码长度为到32位',max:32}
          ],
          mtmaccount: [
            { required: true,message:'请填写下单系统账号', trigger: 'blur' },
            { max:15,message: '账号不能超过15位', trigger: 'blur'}
          ],
          storeid:[
            { required: true,type:'number',message:'请选择门店', trigger: 'change' },
          ],
          staffid:[
            { required: true,type:'number',message:'请选择店员', trigger: 'change' },
          ]
        },
        // date0ptions: {
        //   shortcuts: [
        //     {
        //       text: '最近一周',
        //       value () {
        //         const end = new Date();
        //         const start = new Date();
        //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        //         return [start, end];
        //       }
        //     },
        //     {
        //       text: '最近一个月',
        //       value () {
        //         const end = new Date();
        //         const start = new Date();
        //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        //         return [start, end];
        //       }
        //     },
        //     {
        //       text: '最近三个月',
        //       value () {
        //         const end = new Date();
        //         const start = new Date();
        //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        //         return [start, end];
        //       }
        //     }
        //   ]
        // },
    }
  },
  mounted(){
    this.getData()
    this.getStore()
  },
  methods:{
    getStore(){
      this.$http.get('/store/effective',{}).then(res=>{
        this.storeOption=res.data
      })
    },
    getStaff(id){
      this.leftEditInfo.staffid=''
      this.leftInsertInfo.staffid=''
      this.$http.get('/staff/all',{params:{storeid:id}}).then(res=>{
        this.staffOption=res.data
      })
    },
    getData(){
      this.$http.get('/member',{params:this.searchFrom}).then(res=>{
          this.data=res.data.data
          this.totals=res.data.total
        })
    },
    search(){
      this.$http.get('/member',{params:this.searchFrom}).then(res=>{
          // console.log(res.data)
          this.data=res.data.data
          this.totals=res.data.total
        })
    },
    pageListen(data){
        this.searchFrom.pageIndex=data.pageIndex;
        this.searchFrom.pageSize=data.pageSize;
        // console.log(this.searchFrom);
        this.getData();
      },
      //查看详情
      tableSee(row){
        this.$http.get('/member/'+row.id).then(res=>{
          this.tableSeeInfo = res.data
          this.$http.get('/staff/all',{params:{storeid:res.data.storeid}}).then(staff=>{
            for(let i in staff.data){
              if(staff.data[i].id==this.tableSeeInfo.staffid){
                this.tableSeeInfo.staffid=staff.data[i].name
                break
              }
            }
            this.detailsModalShow = true;
          })
        })
      },
      //删除整条
      DeleteSave(){
        // console.log(this.DeleteInfo)
        this.$http.delete('/member/'+this.DeleteInfo).then(res=>{
          // console.log(res.data)
        this.DeleteShow = false;
        this.getData()
        this.$Message.success('删除成功');
        })
      },
      //清空
      cancels(name){
        this.$refs[name].resetFields();
      },
      leftInsertSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            // console.log(this.leftInsertInfo)
            this.$http.post('/member',this.leftInsertInfo).then(res=>{
              this.leftInsertShow=false;
              this.getData();
              this.cancels(name)
              this.$Message.success('添加成功');
            })
          }
        })
      },
      tableDone(row){
        this.getStaff(row.storeid)
        this.leftEditInfo=JSON.parse(JSON.stringify(row));
      },
      leftEditSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            // console.log(this.leftEditInfo)
            this.$http.put('/member',this.leftEditInfo).then(res=>{
              this.leftEditShow=false;
              this.getData();
              this.cancels(name)
              this.$Message.success('修改成功');
            })
          }
        })
      },
      //店员id转name
      storeName(id){
        for(var i in this.storeOption){
          if(this.storeOption[i].id==id){
            return this.storeOption[i].name
          }
        }
      },
  }

}
</script>
<style lang='scss' scoped>

</style>

