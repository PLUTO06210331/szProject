<template>
  <div class="info-wrap spaceBetween coupon" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>收银管理 /</span>
          <span>优惠券管理</span>
        </span>
        <span slot="footer" class="com-slot-right">
           <span class="T3 main-heading" @click="tableAddShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>新增优惠券</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline>
          <Form-item label="名称" :label-width="75" class="specialCase">
            <Input v-model="searchForm.name" @on-enter="search"></Input>
          </Form-item>
          <Form-item label="类型" :label-width="75" class="specialCase">
            <Select v-model="searchForm.type">
              <Option :value="' '">全部</Option>
              <Option v-for="(item,index) in typeList" :value="item.id" :key="index">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="时间范围" :label-width="75" class="specialCase">
            <DatePicker type="daterange" v-model="searchForm.time" placement="bottom-end" style="width: 200px"></DatePicker>
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
      <!--新增-->
      <div v-if="tableAddShow">
        <Modal v-model="tableAddShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('tableAddInfo')">
          <p slot="header">
            <span class="main-heading">新增优惠券</span>
          </p>
          <Form ref="tableAddInfo" class="searchForm row-input" label-position="left" :model="tableAddInfo" :rules="tableAddRule" inline style="text-align: left;padding:15px 87px 0">
            <Form-item prop="name" label="名称:" :label-width="90" >
              <Input  v-model="tableAddInfo.name"></Input>
            </Form-item>
            <Form-item prop="tel" label="电话:" :label-width="90" >
              <Input  v-model="tableAddInfo.tel"></Input>
            </Form-item>
            <Form-item prop="type"  label="类型:" :label-width="90" >
              <Select v-model="tableAddInfo.type">
                <Option v-for="(item,index) in typeList" :value="item.id" :key="index">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item prop="remark" class="beizhu"  label="备注:" :label-width="90" >
              <Input v-model="tableAddInfo.remark"></Input>
            </Form-item>
            <Form-item prop="startDate"  label="有效日期(始):" :label-width="95" >
              <DatePicker type="date" placeholder="" v-model="tableAddInfo.startDate"></DatePicker>
            </Form-item>
            <Form-item prop="endDate"  label="有效日期(止):" :label-width="95">
              <DatePicker type="date" :options="optionEndDate" placeholder="" v-model="tableAddInfo.endDate"></DatePicker>
            </Form-item>
            <Form-item prop="status" class="beizhu"  label="状态:" :label-width="70" >
              <Radio-group v-model="tableAddInfo.status">
                <Radio label='0'>启用</Radio>
                <Radio label='1'>禁用</Radio>
              </Radio-group>
            </Form-item>
          </Form>
          <div slot="footer">
            <Button class="save" @click="tableAddSave('tableAddInfo')">保存</Button>
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
      <!--门店-->
      <div v-if="tableOpenStore">
        <Modal v-model="tableOpenStore" class-name="delectNopad" :mask-closable=false  width="900" v-drag>
          <p slot="header">
            <span class="main-heading">优惠券门店关联列表--{{message}}</span>
          </p>
          <Form class="searchForm searchStyle" label-position="left" inline >
            <Button type="primary" class="save" @click="InsertdetailsShow = true" style="float:right">新增优惠券门店关联</Button>
            <Form-item label="门店名称" :label-width="80" style="width:200px;" class="specialCase" >
              <Input v-model="storagelocations.storename" @on-enter="searchStoragelocations"></Input>
            </Form-item>
            <Form-item label="门店编码" :label-width="80" style="width:200px;" class="specialCase" >
              <Input v-model="storagelocations.storecode" @on-enter="searchStoragelocations"></Input>
            </Form-item>
            <Form-item class="specialHandling .specialHandling" style="width:32px">
              <Button icon="search" @click="searchStoragelocations" style="width:30px"></Button>
            </Form-item>
          </Form>
          <div class="styleDetail" style="padding: 15px">
            <Table border :columns="openStoreInfo" :data="openStoreData"></Table>
            <page-current ref="pages" class="pages-position" :total="totalstorage" @pageChange="storagepageListen"></page-current>
          </div>
          <div slot="footer">
            <Button  class="clear" @click="tableOpenStore=false">关闭</Button>
          </div>
        </Modal>
      </div>
      <!--新增门店-->
      <div v-if="InsertdetailsShow">
        <Modal v-model="InsertdetailsShow" v-drag class-name="delect entrepot" :mask-closable="false"  width="480" @on-cancel="cancels('tableStoreInfo')">
          <p slot="header">
            <span class="main-heading">新增</span>
          </p>
          <Form ref="tableStoreInfo" class="searchForm" label-position="left" :rules="tableStoreValidate" :model="tableStoreInfo"  inline style="text-align: left;padding:15px 87px 0">
            <Form-item prop="storeid"  label="门店:" :label-width="70" >
              <Select v-model="tableStoreInfo.storeid">
                <Option v-for="(item,index) in brandList" :value="item.id" :key="index">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Form>
          <div slot="footer">
            <Button class="save" @click="tableStoreSave('tableStoreInfo')">保存</Button>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      const startDate = (rule, value, callback ) => {
        if(value === ""){
          callback(new Error('有效日期(始)不能为空'));
        }else{
          callback();
        }
      };
      const endDate = (rule, value, callback ) => {
        if(value === ""){
          callback(new Error('有效日期(止)不能为空'));
        }else{
          callback();
        }
      };
      const type = (rule, value, callback ) => {
        if(value === ""){
          callback(new Error('类型不能为空'));
        }else{
          callback();
        }
      };
      const storeid = (rule, value, callback ) => {
        if(value === ""){
          callback(new Error('请选择门店'));
        }else{
          callback();
        }
      };
      const phone = (rule, value, callback) => {
        if (value === "" || value === null) {
          callback(new Error('请输入联系电话'));
        } else {
          if (!/^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/.test(value)) {
            callback(new Error('联系电话格式不正确'));
          } else {
            callback();
          }
        }
      };
      return {
        totals:1,
        totalstorage:0,
        typeList:[],
        brandList:[],
        searchForm:{
          type:' ',
          name:"",
          time:[],
          beginTime:"",
          endTime:"",
          pageIndex: 1,
          pageSize: 10,
        },
        message:"",
        //门店
        tableOpenStore:false,
        InsertdetailsShow:false,
        storagelocations:{
          couponid:1,
          pageIndex:1,
          pageSize:10,
        },
        tableStoreInfo:{
          storeid:"",
          couponid:1,
        },
        //新增
        tableAddShow:false,
        tableAddInfo:{
            status:"0"
        },
        tableAddRule:{
          name:[
            {required: true, message: '名称不能为空', trigger: 'blur' },
            {max:25,message: '名称不能大于25位',trigger: 'blur'}
          ],
          tel: [
            {required: true, validator:phone,trigger: 'blur'},
            { max:20,message: '电话不能超过20位', trigger: 'blur'}
          ],
          type:[
            {required: true, validator:type, trigger: 'blur' }
          ],
          remark:[
            {required: false, message: '备注不能为空', trigger: 'blur' },
            {max:100,message: '备注不能大于100位',trigger: 'blur'}
          ],
          startDate:[
            { required: true,validator:startDate, trigger: 'change' },
          ],
          endDate:[
            { required: true,validator:endDate, trigger: 'change' },
          ]
        },
        tableStoreValidate:{
          storeid:[
            {required: true, validator:storeid, trigger: 'blur' },
          ],
        },
        optionEndDate: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        /*删除*/
        tableDeleteShow:false,
        columns:[
          {
            title: '序号',
            width: '10%',
            type: 'index',
            align: 'center',
          },
          {
            title: '名称',
            width: '15%',
            key: 'name',
            align: 'center',
          },
          {
            title: '类型',
            width: '15%',
            key: 'typename',
            align: 'center',
          },
          {
            title: '备注',
            width: '15%',
            key: 'remark',
            align: 'center',
          },
          {
            title: '电话',
            width: '15%',
            key: 'tel',
            align: 'center',
          },
          {
            title: '有效日期(始)',
            width: '25%',
            key: 'startDate',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{verticalAlign: 'middle'},
                props: {
                  content:this.setDate(params.row.startDate) ,
                  placement: "bottom"
                }
              }, [
                h('span',
                  {

                  }, [
                    h("span", this.setDate(params.row.startDate))
                  ])
              ]);
            }
          },
          {
            title: '有效日期(止)',
            width: '25%',
            key: 'endDate',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{verticalAlign: 'middle'},
                props: {
                  content:this.setDate(params.row.endDate) ,
                  placement: "bottom"
                }
              }, [
                h('span',
                  {

                  }, [
                    h("span", this.setDate(params.row.endDate))
                  ])
              ]);
            }
          },
          {
            title: '状态',
            width: '20%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('i',{
                  class:params.row.status=='0'?'iconfont icon-suo1':'iconfont icon-suo',
                  style:{'color':params.row.status=='0'?'#37b3b3':'#f76165',cursor:'pointer'},
                  on: {
                    click: () => {
                      this.statusChange(params.row)
                    }
                  },
                }
              )
            }
          },
          {
            title: '操作',
            width: '20%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    class: 'greenButton ',
                    style: {
                      marginLeft: '8px',
                      background: "#fff",
                    },
                    on: {
                      click: () => {
                        this.openStore(params.row);
                        this.tableOpenStore = true;
                        this.storagelocations.couponid = params.row.id;
                        this.tableStoreInfo.couponid = params.row.id;
                      }
                    }
                  },
                  [
                    h('i', {
                      class: 'iconfont  icon-bianji',
                    }),

                    h('span', {}, '门店')
                  ]
                ),
              ]);
            }
          }
        ],
        openStoreInfo:[
          {
            title: '序号',
            width: '10%',
            type: 'index',
            align: 'center',
          },
          {
            title: '门店',
            width: '15%',
            key: 'storename',
            align: 'center',
          },
          {
            title: '门店编码',
            width: '15%',
            key: 'storecode',
            align: 'center',
          },
          {
            title: '操作',
            width: '20%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    class: 'redButton',
                    style: {
                      background: "#fff",
                    },
                    on: {
                      click: () => {
                        this.tableDeleteInfo=params.row.id
                        this.tableDeleteShow=true;
                      }
                    }
                  },
                  [
                    h('i', {
                      class: 'iconfont  icon-qingkong',
                    }),

                    h('span', {}, '删除')
                  ]
                ),
              ]);
            }
          }
        ],
        data:[],
        openStoreData:[],
      }
    },
    mounted() {
      this.ready();
      this.searchType();
      this.searchId();
    },
    methods: {
      ready () {
        this.searchForm.beginTime = this.setDate(this.searchForm.time[0]);
        this.searchForm.endTime = this.setDate(this.searchForm.time[1]);
        this.$http.get('/coupons', {params: this.searchForm}).then(res => {
            console.log(res);
          this.data = res.data.data;
          this.totals = res.data.total;
        })
      },
      pageListen (data) {
        this.searchForm.pageIndex = data.pageIndex;
        this.searchForm.pageSize = data.pageSize;
        this.ready();
      },
      search () {
        this.searchForm.pageIndex = 1;
        this.$refs.pages.pageReset(this.searchForm.pageSize, this.searchForm.pageIndex);
        this.ready()
      },
      //获取类型
      searchType () {
        this.$http.get('/coupontype').then(res => {
          this.typeList = res.data;
          this.tableAddInfo.type = res.data[0].id
        })
      },
      //门店分页
      storagepageListen(data){
        this.storagelocations.pageIndex=data.pageIndex;
        this.storagelocations.pageSize=data.pageSize;
        this.openStore();
      },
      setDate(date){
        if(date){
          let year=new Date(date).getFullYear();
          let month=new Date(date).getMonth()+1;
          month<10?month='0'+month:month;
          let day=new Date(date).getDate();
          day<10?day='0'+day:day;
          return year+'-'+month+'-'+day
        }else{
          return ''
        }
      },
      getTime(data){
        if(data!=''&&data!=null){
          console.log(data);
          return  new Date(data).getTime()
        }else{
          return 0
        }
      },
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
      //新增保存
      tableAddSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.getTime(this.tableAddInfo.endDate)<this.getTime(this.tableAddInfo.startDate)){
              this.$Message.error('日期范围有误')
              return
            }
            /*var newDate=this.setDate( new Date());

            if(this.getTime(this.tableAddInfo.endDate) < this.getTime(newDate)){
              this.$Message.error('结束时间不能小于当前时间');
              return
            }*/
            this.tableAddInfo.startDate=this.setDate(this.tableAddInfo.startDate)
            this.tableAddInfo.endDate=this.setDate(this.tableAddInfo.endDate)
            this.$http.post('/coupon', this.tableAddInfo).then(res => {
              this.tableAddShow = false;
              this.search();
              this.$refs[name].resetFields();
              this.$Message.success("新增成功!");
            })
          }
        });
      },
      statusChange(row){
        let data=JSON.parse(JSON.stringify(row))
        data.status==0?data.status=1:data.status=0
        this.$http.put('/coupon', data).then(res => {
          this.$Message.success("更改成功!");
          row.status==0?row.status=1:row.status=0
        })
      },
      //叉号删除
      cancels(name){
        this.$refs[name].resetFields();
      },
      //确认删除
      tableDeleteSave () {
        this.$http.delete('/couponStore/'+this.tableDeleteInfo).then(res=>{
          this.tableDeleteShow=false;
          this.$http.get('/couponStores',{params:this.storagelocations}).then(res=>{
            this.openStoreData = res.data.data;
            this.totalstorage = res.data.total;
          });
          this.$Message.success('删除成功');
        })
      },
      //查看门店
      openStore (row) {
        this.$http.get('/couponStores',{params:this.storagelocations}).then(res=>{
          this.openStoreData = res.data.data;
          this.totalstorage = res.data.total;
        });
        this.message = row.name;
      },
      //查询门店
      searchStoragelocations () {
       this.$http.get('/couponStores',{params:this.storagelocations}).then(res=>{
          this.openStoreData = res.data.data;
          this.totalstorage = res.data.total;
       })
      },
      //新增门店查询
      searchId () {
        this.$http.get('/store/effective',{}).then(res => {
          this.brandList = res.data;
        })
      },
      //新增保存
      tableStoreSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/couponStore',this.tableStoreInfo).then(res=>{
              this.InsertdetailsShow=false;
              this.$http.get('/couponStores',{params:this.storagelocations}).then(res=>{
                this.openStoreData = res.data.data;
                this.totalstorage = res.data.total;
              });
              this.cancels(name);
              this.$Message.success('添加成功');
            })
          }
        })
      }
    },
  }
</script>
<style scoped>

</style>
<style lang="scss">

  table .redButton::before{
    width: 0 !important;
  }
  .row-input .ivu-date-picker-rel{
    width: 100%;
    line-height: 30px;
  }
  .coupon .searchForm .ivu-form-item:nth-child(3){
    width:300px;
  }
  .searchForm .beizhu .ivu-form-item-label {
    padding-left: 14px !important;
  }

</style>




