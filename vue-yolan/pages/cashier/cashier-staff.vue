<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>收银管理 /</span>
          <span>店员维护</span>
        </span>
        <span slot="footer" class="com-slot-right">
           <span class="T3 main-heading" @click="tableInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>新增店员信息</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="姓名" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.name" @on-enter="search"></Input>
            <input type="text" style="display: none">
          </Form-item>
          <Form-item label="电话" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.tel" @on-enter="search"></Input>
            <input type="text" style="display: none">
          </Form-item>
          <Form-item label="所属门店" :label-width="65" class="specialCase" >
            <Select v-model="searchFrom.storeid">
              <Option :value="' '">全部</Option>
              <Option v-for="item in storeArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item class="specialHandling .specialHandling">
            <Button icon="search" @click="search" @on-enter="search"></Button>
          </Form-item>
        </Form>
        <div style="clear: both"></div>
        <div id="tableBox" ref="tableBox">
          <Table v-com border :columns="columns" :data="data"></Table>
        </div>
        <page-current ref="pages" class="pages-position" :total="totals" @pageChange="pageListen"></page-current>
      </div>
    </div>
    <!--编辑-->
    <div v-if="tableDoneShow">
      <Modal v-model="tableDoneShow" class-name="delect entrepot" :mask-closable=false  width="760" v-drag @on-cancel="cancels('tableDoneInfo')">
        <p slot="header">
          <span class="main-heading">编辑</span>
        </p>
        <Form ref="tableDoneInfo" class="searchForm" label-position="left" :model="tableDoneInfo" :rules="tableDoneRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="name" label=" 姓名:" :label-width="70" >
            <Input v-model="tableDoneInfo.name"></Input>
          </Form-item>
          <Form-item prop="tel"  label="电话:" :label-width="70" >
            <Input v-model="tableDoneInfo.tel"></Input>
          </Form-item>
          <Form-item prop="storeid"  label="所属门店:" :label-width="70" >
            <Select v-model="tableDoneInfo.storeid">
              <Option v-for="(item,index) in storeArrCan" :value="item.id+''" :key="index">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <div class="toNext"></div>
          <Form-item prop="remark" class="beizhu" label="备注:" :label-width="70" >
            <Input class="text-staff" v-model="tableDoneInfo.remark" type="textarea" :rows="4" placeholder="请输入..."></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="tableDoneSave('tableDoneInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--新增-->
    <div v-if="tableInsertShow">
      <Modal v-model="tableInsertShow" class-name="delect entrepot" :mask-closable=false  width="760" v-drag @on-cancel="cancels('tableInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增</span>
        </p>
        <Form ref="tableInsertInfo" class="searchForm" label-position="left" :model="tableInsertInfo" :rules="tableInsertRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="name" label=" 姓名:" :label-width="70" >
            <Input v-model="tableInsertInfo.name"></Input>
          </Form-item>
          <Form-item prop="tel"  label="电话:" :label-width="70" >
            <Input v-model="tableInsertInfo.tel"></Input>
          </Form-item>
          <Form-item prop="storeid"  label="所属门店:" :label-width="70" >
            <Select v-model="tableInsertInfo.storeid">
              <Option v-for="(item,index) in storeArrCan" :value="item.id+''" :key="index">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <div class="toNext"></div>
          <Form-item prop="remark" class="beizhu" label="备注:" :label-width="70" >
            <Input class="text-staff" v-model="tableInsertInfo.remark" type="textarea" :rows="4" placeholder="请输入..."></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="tableInsertSave('tableInsertInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--删除-->
    <div v-if="tableDeleteShow">
      <Modal v-model="tableDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="tableDeleteSave">确认</Button>
            <Button  class="clear" @click="tableDeleteShow=false">取消</Button>
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
    components: {HeaderSlot},
    data () {
      const tel = (rule, value, callback) => {
        if (value === "" || value === null) {
          callback(new Error('请输入电话'));
        } else {
          if (!/^1\d{10}/.test(value)) {
            callback(new Error('请输入手机号'));
          } else if (value.length > 20) {
            callback(new Error('最多输入20位'));
          } else {
            callback();
          }
        }
      };
      return {
        //搜索条件
        searchFrom:{
          pageIndex:1,
          pageSize:10,
          storeid:' ',
          name:'',
          tel:''
        },
        //外表数据条数
        totals:1,
        //table
        columns: [
          {
            title: '序号',
            width:'4%',
            type:'index',
            align: 'center',
          },
          {
            title: '姓名',
            width:'10%',
            key: 'name',
            align: 'center',
          },
          {
            title: '电话',
            width:'10%',
            key: 'tel',
            align: 'center',
          },
          {
            title: '所属门店',
            width:'10%',
            key: 'storename',
            align: 'center',
          },
          {
            title: '操作',
            width:'10%',
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
                        this.tableDeleteInfo=params.row.id
                        this.tableDeleteShow=true;

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
        data: [],
        //最近日期
        date0ptions: {
          shortcuts: [
            {
              text: '最近一周',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '最近一个月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '最近三个月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        },
        //门店
        storeArr:[],
        //有效门店
        storeArrCan:[],
        //编辑
        tableDoneShow:false,
        tableDoneInfo:{},
        tableDoneRule:{
          name: [
            { required: true,message:'请填写姓名', trigger: 'blur' },
            { max:20,message: '姓名不能超过20位', trigger: 'blur'}
          ],
          tel: [
            { required: true,message:'请填写电话', trigger: 'blur' },
            { max:20,message: '电话不能超过20位', trigger: 'blur'}
          ],
          storeid: [
            { required: true,message:'请选择所属门店', trigger: 'change' },
          ],
          remark: [
            { max:50,message: '备注不能超过50位', trigger: 'blur'}
          ],
        },
        //新增
        tableInsertShow:false,
        tableInsertInfo:{
           name:'',
           tel:'',
           storeid:'',
           remark:'',
        },
        tableInsertRule:{
          name: [
            { required: true,message:'请填写姓名', trigger: 'blur' },
            { max:20,message: '姓名不能超过20位', trigger: 'blur'}
          ],
          tel: [
            { required: true,message:'请填写电话', trigger: 'blur' },
            { max:20,message: '电话不能超过20位', trigger: 'blur'}
          ],
          storeid: [
            { required: true,message:'请选择所属门店', trigger: 'change' },
          ],
          remark: [
            { max:50,message: '备注不能超过50位', trigger: 'blur'}
          ],

        },
        //删除
        tableDeleteShow:false,
        tableDeleteInfo:''
      }
    },
    mounted(){
      this.ready()
      this.getStore()
      this.getStoreCan()
    },
    methods: {
      cancels(name){
        this.$refs[name].resetFields();
      },
      setDate(date){
        let year=new Date(date).getFullYear();
        let month=new Date(date).getMonth()+1;
        month<10?month='0'+month:month;
        let day=new Date(date).getDate();
        day<10?day='0'+day:day;
        return year+'-'+month+'-'+day
      },
      //日期年月日时分秒
      setTime(date){
        if(date!=''&&date!=null){
          let year=new Date(date).getFullYear();
          let month=new Date(date).getMonth()+1;
          month<10?month='0'+month:month;
          let day=new Date(date).getDate();
          day<10?day='0'+day:day;
          let hour=new Date(date).getHours();
          hour<10?hour='0'+hour:hour;
          let minute=new Date(date).getMinutes();
          minute<10?minute='0'+minute:minute;
          let second=new Date(date).getSeconds();
          second<10?second='0'+second:second;
          return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
        }else {
          return ""
        }
      },
      ready(){
        this.$http.get('/staffs',{params:this.searchFrom}).then(res=>{
          this.data=res.data.data
          this.totals=res.data.total
        })
      },
      search(){
        this.searchFrom.pageIndex=1
        this.$refs.pages.pageReset(this.searchFrom.pageSize,this.searchFrom.pageIndex);
        this.ready()
      },
      pageListen(data){
        this.searchFrom.pageIndex=data.pageIndex;
        this.searchFrom.pageSize=data.pageSize;
        console.log(this.searchFrom);
        this.ready();
      },
      //编辑
      tableDone(row){
        this.tableDoneShow=true;
        this.tableDoneInfo=JSON.parse(JSON.stringify(row))
        this.tableDoneInfo.storeid+=''
        this.fillterStore(this.tableDoneInfo.storeid)
      },
      tableDoneSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.put('/staff',this.tableDoneInfo).then(res=>{
              this.tableDoneShow=false;
              this.ready();
              this.$Message.success('修改成功');
            })
          }
        })
      },
      changeStatus(row){
        let date=JSON.parse(JSON.stringify(row));
        date.status=='1'?date.status='0':date.status='1'
        this.$http.put('/fabric',date).then(res=>{
          row.status=='1'?row.status='0':row.status='1'
        })
      },
      //新增
      tableInsertSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/staff',this.tableInsertInfo).then(res=>{
              this.tableInsertShow=false;
              this.ready();
              this.cancels(name)
              this.$Message.success('新增成功');
            })
          }
        })
      },
      //删除
      tableDeleteSave(){
        this.$http.delete('/staff/'+this.tableDeleteInfo).then(res=>{
          this.tableDeleteShow=false;
          this.search();
          this.$Message.success('删除成功');
        })
      },
      //获取门店
      getStore(){
        this.$http.get('/store/all',{}).then(res=>{
            this.storeArr=res.data
        })
      },
      getStoreCan(){
        this.$http.get('/store/effective',{}).then(res=>{
          this.storeArrCan=res.data
        })
      },
      //可用门店过滤
      fillterStore(id){
        for(let i in this.storeArrCan){
           if(this.storeArrCan[i].id==id){
              return
           }
        }
        this.tableDoneInfo.storeid=''
      }
    },
  }
</script>
<style lang="scss" scoped>
  .optionStatus{
    line-height: 24px;
  }
  .toNext~.ivu-form-item{
    width: 100%;
    .ivu-input-wrapper{
      width: 100%;
    }
  }
</style>
<style lang="scss">
  .text-staff{
    textarea{
      font-size: 12px !important;
      color: #657180 !important;
      border: none;
    }
  }
  .text-staff~.ivu-form-item-error-tip{
    left: 500px !important;
    top: 25px !important;
  }
  .searchForm .beizhu .ivu-form-item-label {
    padding-left: 14px !important;
  }
</style>


