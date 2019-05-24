
<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>收银管理 /</span>
          <span>推销活动</span>
        </span>
        <span slot="footer" class="com-slot-right">
           <span class="T3 main-heading" @click="tableAddShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>新增促销管理</span></span>
        </span>
      </header-slot>
    </div>
    <div class="tableDistance">
      <Form class="searchForm searchStyle" label-position="left" inline>
        <Form-item label="名称" :label-width="60" class="specialCase">
          <Input v-model="searchForm.name" @on-enter="search"></Input>
          <input type="text"style="display: none">
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
          <span class="main-heading">新增促销管理</span>
        </p>
        <Form ref="tableAddInfo" class="searchForm row-input" label-position="left" :model="tableAddInfo" :rules="tableAddRule" inline style="text-align: left;padding:15px 87px 0">
          <Form-item prop="name" label="名称:" :label-width="90" >
            <Input  v-model="tableAddInfo.name"></Input>
          </Form-item>
          <Form-item prop="remark" class="remark"  label="备注:" :label-width="90">
            <Input v-model="tableAddInfo.remark"></Input>
          </Form-item>
          <Form-item prop="startDate"  label="开始日期:" :label-width="95" >
            <DatePicker type="date" placeholder="" v-model="tableAddInfo.startDate"></DatePicker>
          </Form-item>
          <Form-item prop="endDate"  label="结束日期:" :label-width="95">
            <DatePicker type="date" placeholder="" v-model="tableAddInfo.endDate"></DatePicker>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="tableAddSave('tableAddInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--编辑-->
    <div v-if="tableEditShow">
      <Modal v-model="tableEditShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('tableEditInfo')">
        <p slot="header">
          <span class="main-heading">编辑促销管理</span>
        </p>
        <Form ref="tableEditInfo" class="searchForm key-input" label-position="left" :model="tableEditInfo" :rules="tableAddRule" inline style="text-align: left;padding:15px 87px 0">
          <Form-item prop="name" label="名称:" :label-width="90" >
            <Input  v-model="tableEditInfo.name" style="padding-left: 12px;"></Input>
          </Form-item>
          <Form-item prop="remark" class="remark"  label="备注:" :label-width="90" >
            <Input v-model="tableEditInfo.remark"></Input>
          </Form-item>
          <Form-item prop="startDate"  label="开始日期:" :label-width="95" >
            <DatePicker type="date" placeholder="" v-model="tableEditInfo.startDate"></DatePicker>
          </Form-item>
          <Form-item prop="endDate"  label="结束日期:" :label-width="95">
            <DatePicker type="date" placeholder="" v-model="tableEditInfo.endDate"></DatePicker>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="tableEditSave('tableEditInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--新增活动策略-->
    <div v-if="tableActiShow">
      <Modal v-model="tableActiShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('tableActiInfo')">
        <p slot="header">
          <span class="main-heading">活动策略</span>
        </p>
        <Form ref="tableActiInfo" class="searchForm key-input" label-position="left" :model="tableActiInfo" :rules="tableActiRule" inline style="text-align: left;padding:15px 87px 0">
          <Row>
            <Form-item prop="type" label="活动类型:" :label-width="75" >
              <Select v-model="tableActiInfo.type">
                <Option v-for="(item,index) in typeList" :value="item.id" :key="index">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item prop="name"  label="名称:" :label-width="75" >
              <Input v-model="tableActiInfo.name"></Input>
            </Form-item>
            <Form-item prop="full"  label="满额:" :label-width="75" >
              <Input v-model="tableActiInfo.full"></Input>
            </Form-item>
            <Form-item prop="discount"  label="优惠值:" :label-width="75" >
              <Input v-model="tableActiInfo.discount"></Input>
            </Form-item>
            <Form-item prop="cdkey"  label="cdkey编码:" :label-width="80" >
              <Input v-model="tableActiInfo.cdkey"></Input>
            </Form-item>
            <Form-item prop="remark"  label="备注:" :label-width="75" >
              <Input v-model="tableActiInfo.remark"></Input>
            </Form-item>
          </Row>
        </Form>
        <div slot="footer">
          <Button class="save" @click="tableActiSave('tableActiInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--编辑活动策略-->
    <div v-if="tableAcAddShow">
      <Modal v-model="tableAcAddShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('tableAcAddInfo')">
        <p slot="header">
          <span class="main-heading">活动策略</span>
        </p>
        <Form ref="tableAcAddInfo" class="searchForm key-input" label-position="left" :model="tableAcAddInfo" :rules="tableAcAddRule" inline style="text-align: left;padding:15px 87px 0">
          <Row>
            <Form-item prop="type" label="活动类型:" :label-width="75" >
              <Select v-model="tableAcAddInfo.type">
                <Option v-for="(item,index) in typeList" :value="item.id" :key="index">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item prop="name"  label="名称:" :label-width="75" >
              <Input v-model="tableAcAddInfo.name"></Input>
            </Form-item>
            <Form-item prop="full"  label="满额:" :label-width="75" >
              <Input v-model="tableAcAddInfo.full"></Input>
            </Form-item>
            <Form-item prop="discount"  label="优惠值:" :label-width="75" >
              <Input v-model="tableAcAddInfo.discount"></Input>
            </Form-item>
            <Form-item prop="cdkey"  label="cdkey编码:" :label-width="80" >
              <Input v-model="tableAcAddInfo.cdkey"></Input>
            </Form-item>
            <Form-item prop="remark"  label="备注:" :label-width="75" >
              <Input v-model="tableAcAddInfo.remark"></Input>
            </Form-item>
          </Row>
        </Form>
        <div slot="footer">
          <Button class="save" @click="tableAcAddSave('tableAcAddInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--活动策略列表-->
    <div v-if="tableListShow">
      <Modal v-model="tableListShow"  width="870" class-name="delectNopad" :mask-closable=false  v-drag >
        <p slot="header">
          <span class="main-heading">活动策略</span>
        </p>
        <div style="padding:15px 0 0 15px;">
          <Button type="primary" class="save" @click="tableActiShow = true">新增优惠类型</Button>
        </div>
        <div class="styleDetail" style="padding: 15px">
          <Table border :columns="orderInfo" :data="orders"></Table>
        </div>
        <div slot="footer">
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
    <!--列表删除-->
    <div v-if="tableAcListShow">
      <Modal v-model="tableAcListShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="tableStoreDelete">确认</Button>
            <Button  class="clear" @click="tableAcListShow=false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!--活动策略删除-->
    <div v-if="tableAcListActive">
      <Modal v-model="tableAcListActive" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="tableStoreDeleteActive">确认</Button>
            <Button  class="clear" @click="tableAcListActive=false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!--门店-->
    <div v-if="tableOpenStore">
      <Modal v-model="tableOpenStore" class-name="delectNopad1" :mask-closable=false @on-cancel="cancels('storagelocations')"  width="900" v-drag>
        <p slot="header">
          <span class="main-heading">促销活动门店关联列表--{{message}}</span>
        </p>
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Button type="primary" class="save" @click="InsertdetailsShow = true" style="float:right">促销活动门店关联</Button>
          <Form-item label="门店名称" :label-width="80" style="width:200px;" class="specialCase" >
            <Input v-model="storagelocations.storename"></Input>
            <Input style="display:none"></Input>
          </Form-item>
          <Form-item label="门店编码" :label-width="80" style="width:200px;" class="specialCase" >
            <Input v-model="storagelocations.storecode"></Input>
          </Form-item>
          <Form-item class="specialHandling .specialHandling" style="width:32px">
            <Button icon="search" @click="searchStoragelocations" @on-enter="searchStoragelocations" style="width:30px"></Button>
          </Form-item>
        </Form>
        <div class="styleDetail" style="padding: 15px">
          <Table class="table" border :columns="openStoreInfo" :data="openStoreData"></Table>
          <page-current ref="pages" class="pages-position" :total="totalstorage" @pageChange="storagepageListen"></page-current>
        </div>
        <div slot="footer">
          <Button  class="clear closeAll" @click="storeClose">关闭</Button>
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
</template>

<script>
  export default {
    data () {
      const startDate = (rule, value, callback ) => {
        if(value === ""){
          callback(new Error('开始日期不能为空'));
        }else{
          callback();
        }
      };
      const endDate = (rule, value, callback ) => {
        if(value === ""){
          callback(new Error('结束日期不能为空'));
        }else{
          callback();
        }
      };
      const discount = (rule, value, callback ) => {
        if(value === ""){
          callback(new Error('优惠值不能为空'));
        }else{
          if(!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value)){
            callback(new Error("优惠值为数字"))
          }else{
              if(!/^\d*\.{0,2}\d{0,2}$/.test(value)){
                callback(new Error("小数点后只能输入2位"))
              }else{
                callback();
              }
          }
        }
      };
      const full = (rule, value, callback ) => {
        if(value === ""){
          callback(new Error('满额不能为空'));
        }else{
          if(!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value)){
            callback(new Error("满额为数字"));
          }else{
            if(!/^\d*\.{0,2}\d{0,2}$/.test(value)){
              callback(new Error("小数点后只能输入2位"))
            }else{
              callback();
            }
          }
        }
      };
      const storeid = (rule, value, callback ) => {
        if(value === ""){
          callback(new Error('请选择门店'));
        }else{
          callback();
        }
      };
      return {
        message:"",
        totals:1,
        totalstorage:0,
        brandList:[],
        typeList:[],
        searchForm:{
          name:"",
          pageIndex: 1,
          pageSize: 10,
        },
        //门店
        tableOpenStore:false,
        InsertdetailsShow:false,
        storagelocations:{
          salespromotionid:1,
          pageIndex:1,
          pageSize:10,
        },
        tableStoreInfo:{
          storeid:"",
          salespromotionid:1,
        },
        /*新增*/
        tableAddShow:false,
        tableAddInfo:{
          name:"",
          remark:"",
          startDate:"",
          endDate:""
        },
        tableAddRule:{
          name:[
            {required: true, message: '名称不能为空', trigger: 'blur' },
            {max:25,message: '名称不能大于25位',trigger: 'blur'}
          ],
          remark:[
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
        /*编辑*/
        tableEditShow:false,
        tableEditInfo:{
          name:"",
          remark:"",
          startDate:"",
          endDate:""
        },
        tableEditRule:{
          name:[
            {required: true, message: '名称不能为空', trigger: 'blur' },
            {max:25,message: '名称不能大于25位',trigger: 'blur'}
          ],
          startDate:[
            { required: true,validator:startDate, trigger: 'change' },
          ],
          endDate:[
            { required: true,validator:endDate, trigger: 'change' },
          ]
        },
        /*活动策略*/
        tableActiShow:false,
        tableActiInfo:{
          type:1,
          full:"",
          discount:"",
          remark:"",
          cdkey:"",
          salespromotionid:"",
        },
        tableActiRule:{
          name:[
            {required: true, message: '名称不能为空', trigger: 'blur' },
            {max:20,message: '名称不能大于20位',trigger: 'blur'}
          ],
          full:[
            {required: true, validator:full, trigger: 'blur' }
          ],
          discount:[
            {required: true,validator:discount, trigger: 'blur' }
          ],
        },
        tableAcListShow:false,
        tableAcListActive:false,
        tableAcAddShow:false,
        tableAcAddInfo:{
          type:"",
          full:"",
          discount:"",
          remark:"",
          cdkey:"",
          salespromotionid:"",
        },
        tableAcAddRule:{
          name:[
            {required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          full:[
            {required: true, validator:full, trigger: 'blur' }
          ],
          discount:[
            {required: true,validator:discount, trigger: 'blur' }
          ],
        },

        /*活动策略列表*/
        tableListShow:false,
        //活动策略
        orderInfo:[
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
            title: 'cdkey编码',
            width: '15%',
            key: 'cdkey',
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
                    class: 'blueButton ',
                    style: {
                      marginLeft: '8px',
                      background: "#fff",
                    },
                    on: {
                      click: () => {
                        this.tableListDone(params.row);
                      }
                    }
                  },
                  [
                    h('i', {
                      class: 'iconfont  icon-bianji',
                    }),

                    h('span', {}, '编辑')
                  ]
                ),
                h('Button', {
                    class: 'redButton',
                    style: {
                      background: "transparent",
                      marginLeft: '8px',
                    },
                    on: {
                      click: () => {
                        this.tableDeleteList = params.row.id;
                        this.tableAcListActive = true;
                      }
                    }
                  },
                  [
                    h('i', {
                      class: 'iconfont icon-qingkong',
                    }),

                    h('span', {}, '删除')
                  ]
                )
              ]);
            }
          }
        ],
        //门店列表
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
                        this.tableStoreDeleteInfo=params.row.id;
                        this.tableAcListShow=true;
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
        orders:[],
        /*删除*/
        tableDeleteShow:false,
        /*表格数据*/
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
            title: '开始时间',
            width: '12%',
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
            title: '结束时间',
            width: '12%',
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
            title: '备注',
            width: '10%',
            key: 'remark',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{verticalAlign: 'middle'},
                props: {
                  content:params.row.remark,
                  placement: "bottom-start"
                }
              }, [
                h('span',
                  {

                  }, [
                    h("span",params.row.remark)
                  ])
              ]);
            }
          },
          {
            title: '操作',
            width: '25%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    class: 'blueButton ',
                    style: {
                      marginLeft: '8px',
                      background: "#fff",
                    },
                    on: {
                      click: () => {
                        this.tableDone(params.row);
                      }
                    }
                  },
                  [
                    h('i', {
                      class: 'iconfont  icon-bianji',
                    }),

                    h('span', {}, '编辑')
                  ]
                ),
                h('Button', {
                    class: 'greenButton ',
                    style: {
                      marginLeft: '8px',
                      background: "#fff",
                    },
                    on: {
                      click: () => {
                        this.tableactivity(params.row);
                        this.tableListShow = true;
                      }
                    }
                  },
                  [
                    h('i', {
                      class: 'iconfont  icon-qingkong',
                    }),

                    h('span', {}, '活动策略')
                  ]
                ),
                h('Button', {
                    class: 'redButton',
                    style: {
                      background: "transparent",
                      marginLeft: '8px',
                      marginRight: '8px',
                    },
                    on: {
                      click: () => {
                        this.tableDeleteInfo = params.row.id
                        this.tableDeleteShow = true;
                      }
                    }
                  },
                  [
                    h('i', {
                      class: 'iconfont icon-qingkong',
                    }),

                    h('span', {}, '删除')
                  ]
                ),
                h('Button', {
                    class: 'yellowButton',
                    style: {
                      background: "transparent",
                      marginLeft: '8px',
                    },
                    on: {
                      click: () => {
                        this.openStore(params.row);
                        this.message = params.row.name;
                        this.tableOpenStore = true;
                        this.storagelocations.salespromotionid = params.row.id;
                        this.tableStoreInfo.salespromotionid = params.row.id;
                      }
                    }
                  },
                  [
                    h('i', {
                      class: 'iconfont icon-qingkong',
                    }),

                    h('span', {}, '门店')
                  ]
                )
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
        this.$http.get('/salesPromotions', {params: this.searchForm}).then(res => {
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
      //门店分页
      storagepageListen(data){
        this.storagelocations.pageIndex=data.pageIndex;
        this.storagelocations.pageSize=data.pageSize;
        this.openStore(name);
      },
      getTime(data){
        if(data!=''&&data!=null){
          return new Date(data).getTime()
        }else{
          return 0
        }
      },
      //新增
      tableAddSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.getTime(this.tableAddInfo.endDate)<this.getTime(this.tableAddInfo.startDate)){
              this.$Message.error('日期范围有误')
              return
            }
            this.tableAddInfo.startDate=this.setDate(this.tableAddInfo.startDate)
            this.tableAddInfo.endDate=this.setDate(this.tableAddInfo.endDate)
            this.$http.post('/salesPromotion', this.tableAddInfo).then(res => {
              this.tableAddShow = false;
              this.search();
              this.$refs[name].resetFields();
              this.$Message.success("新增成功!");
            })
          }
        });
      },
      //编辑
      tableDone (row) {
        this.tableEditInfo=JSON.parse(JSON.stringify(row));
        this.tableEditShow = true;
      },
      tableEditSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {

            if(this.getTime(this.tableEditInfo.endDate)<this.getTime(this.tableEditInfo.startDate)){
              this.$Message.error('日期范围有误')
              return
            }
            console.log('##################');
            this.tableEditInfo.startDate=this.setDate(this.tableEditInfo.startDate)
            this.tableEditInfo.endDate=this.setDate(this.tableEditInfo.endDate)
            this.$http.put('/salesPromotion',this.tableEditInfo).then(res=>{
              this.tableEditShow=false;
              this.$refs[name].resetFields();
              this.search();
              this.$Message.success('修改成功');
            })
          }
        })
      },

      //右上角叉号删除
      cancels(name){
        this.$refs[name].resetFields();
      },
      /*确认删除*/
      tableDeleteSave () {
        this.$http.delete('/salesPromotion/' + this.tableDeleteInfo).then(res => {
          this.tableDeleteShow = false;
          this.search();
          this.$Message.success('删除成功');
        })
      },
      /*************************************************************/

      //活动策略
      tableactivity (row) {
        this.tableActiInfo.salespromotionid = row.id;
        this.$http.get('/strategyes/' + row.id).then(res => {
          this.orders = res.data;
        });
      },
      //类型搜索
      searchType () {
        this.$http.get('/strategy/category').then(res => {
          this.typeList = res.data;
          this.tableActiInfo.type = res.data[0].id;

        })
      },
      //活动策略新增保存
      tableActiSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/strategy',this.tableActiInfo).then(res=>{
              this.tableActiShow=false;
              this.$refs[name].resetFields();
              this.$http.get('/strategyes/' + this.tableActiInfo.salespromotionid).then(res => {
                this.orders = res.data;
              });
              this.$Message.success('添加成功');
            })
          }
        })
      },
      //列表编辑
      tableListDone (row){
        this.tableAcAddShow = true;
        this.tableAcAddInfo=JSON.parse(JSON.stringify(row));
        this.tableAcAddInfo.type = parseInt(row.type);
      },
      //编辑保存
      tableAcAddSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.put('/strategy',this.tableAcAddInfo).then(res=>{
              this.tableAcAddShow=false;
              this.$refs[name].resetFields();
              this.$http.get('/strategyes/' + this.tableActiInfo.salespromotionid).then(res => {
                this.orders = res.data;
              });
              this.$Message.success('修改成功');
            })
          }
        })
      },
      //活动策略删除
      tableStoreDeleteActive () {
        this.$http.delete('/strategy/' + this.tableDeleteList).then(res => {
          this.tableAcListActive = false;
          this.$http.get('/strategyes/' + this.tableActiInfo.salespromotionid).then(res => {
            this.orders = res.data;
          });
          this.$Message.success('删除成功');
        })
      },
      //转时间
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

      /*******  门店 **********/

      //查看门店
      openStore () {
        this.$http.get('/salesPromotionStores',{params:this.storagelocations}).then(res=>{
          this.openStoreData = res.data.data;
          this.totalstorage = res.data.total;
          this.storagelocations.pageIndex = res.data.data.pageIndex;
        });
      },
      //查询门店
      searchStoragelocations () {
        this.$http.get('/salesPromotionStores',{params:this.storagelocations}).then(res=>{
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
      storeClose () {
        this.tableOpenStore=false;
        this.storagelocations.storename = "";
        this.storagelocations.storecode = "";
      },
      //新增保存
      tableStoreSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/salesPromotionStore',this.tableStoreInfo).then(res=>{
              this.InsertdetailsShow=false;
              this.$http.get('/salesPromotionStores',{params:this.storagelocations}).then(res=>{
                this.openStoreData = res.data.data;
                this.totalstorage = res.data.total;
                this.brandList = [];
              })
              this.cancels(name);
              this.$Message.success('添加成功');
            })
          }
        })
      },
      cancels(){
        this.storagelocations.storename = "";
        this.storagelocations.storecode = "";
      },
      //门店删除
      tableStoreDelete () {
        this.$http.delete('/salesPromotionStore/'+this.tableStoreDeleteInfo).then(res=>{
          this.tableAcListShow=false;
          this.$http.get('/salesPromotionStores',{params:this.storagelocations}).then(res=>{
            this.openStoreData = res.data.data;
            this.totalstorage = res.data.total;
          })
          this.$Message.success('删除成功');
        })
      },
    },
  }
</script>
<style scoped>
  .remark {
    padding-left: 4px !important;
  }
</style>
<style lang="scss">
  .table .redButton::before{
    width: 0 !important;
  }
  .info-wrap table .ivu-tooltip-inner{
    max-width: 100%;
    white-space: normal;
  }
  .info-wrap table .ivu-tooltip-rel{
    width: 100%;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
   .delectNopad1{
     .ivu-modal .ivu-modal-content{
       height: 655px !important;
       position: relative;
      }
     .page-curent{
       position: absolute;
       bottom: 60px;
     }
     .pages{
       width:729px !important;
     }
     .closeAll{
       position: absolute;
       bottom:5px;
     }
     .ivu-table-body{
       max-height: 370px;
       overflow: auto;
     }
  }
</style>





