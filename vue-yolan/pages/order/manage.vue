<template>
  <div class="delivery-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>

            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>订单管理 /</span>
          <span>订单管理</span>
        </span>
        <span slot="footer" class="com-slot-right">

        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="用户名" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.membername" @on-enter="search()"></Input>
          </Form-item>
          <Form-item label="订单号" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.orderid" @on-enter="search()"></Input>
          </Form-item>
          <Form-item label="手机号" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.customerTel" @on-enter="search()"></Input>
          </Form-item>
          <Form-item label="创建时间" :label-width="65" class="selectTime technicalDates specialCase">
            <Date-picker type="daterange" v-model="searchFrom.createDate"  :options="date0ptions"></Date-picker>
          </Form-item>
          <Form-item class="specialHandling .specialHandling">
            <Button icon="search" @click="search" @on-enter="search"></Button>
          </Form-item>
        </Form>
        <div style="clear: both"></div>
        <div id="tableBox" ref="tableBox">
          <Table border :columns="columns" :data="data"></Table>
        </div>
        <page-current ref="pages" class="pages-position" :current="searchFrom.pageIndex" :total="totals" @pageChange="pageListen"></page-current>
      </div>
    </div>
    <!--详情-->
    <div v-if="detailsModalShow">
      <Modal v-model="detailsModalShow"  width="870" class-name="delectNopad" :mask-closable=false  v-drag >
        <p slot="header">
          <span class="main-heading">订单详情</span>
        </p>
        <div class="autoDiv">
          <div class="modalContent" style="text-align:center">
            <h4>基本信息</h4>
            <Form class="basicForm searchForm" :label-width="70"  inline style="text-align: left">
              <Row class="detailRow">
                <i-col span="8">
                  <Form-item label="用户名:">
                    {{tableSeeInfo.membername}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="订单号">
                    {{tableSeeInfo.orderid}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="订单价格:">
                    {{tableSeeInfo.price}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="提交时间:">
                    {{setTime(tableSeeInfo.createtime)}}
                  </Form-item>
                </i-col>
              </Row>
            </Form>
            <h4>订单明细</h4>
            <div class="styleDetail" style="padding: 15px">
              <Table border :columns="orderInfo" :data="orderInfoData"></Table>
            </div>
            <h4>特体信息</h4>
            <div class="showWay1">
              <Row>
                <i-col span="8" v-for="(item,index) in bodyTypesVOs" :key="index" :style="{'border-top':index<3 ? '1px solid #e9eaec':'none','border-right':index==bodyTypesVOs.length-1? '1px solid #e9eaec':'none'}">
                  <span>{{item.parentname}} :</span>
                  <span>{{item.name}}</span>
                </i-col>
              </Row>
              <h3 v-if="bodyTypesVOs.length===0">无</h3>
            </div>
            <h4>尺寸信息</h4>
            <div class="showWay1">
              <Row>
                <i-col span="8" v-for="(item,index) in sizeVOs" :key="index" :style="{'border-top':index<3 ? '1px solid #e9eaec':'none','border-right':index==sizeVOs.length-1? '1px solid #e9eaec':'none'}">
                  <span>{{item.name}} :</span>
                  <span>{{item.sizevalue}}</span>
                </i-col>
              </Row>
              <h3 v-if="sizeVOs.length===0">无</h3>
            </div>
          </div>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
    <!--删除-->
    <div v-if="deleteModal">
      <Modal v-model="deleteModal" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save">确认</Button>
            <Button  class="clear">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!--详情中的详情-->
    <div v-if="orderAllShow">
      <Modal v-model="orderAllShow"  width="870" class-name="definitionHeight" :mask-closable=false  v-drag >
        <p slot="header">
          <span class="main-heading">详情</span>
        </p>
        <div class="autoDiv">
          <div class="modalContent" style="text-align:center">
            <h4>工艺信息</h4>
            <div class="showWay1">
                 <Tooltip :content="item.technology" placement="top-start" v-for="(item,index) in data3" :key="index">
                  <div :style="{'border-top':index<3 ? '1px solid #e9eaec':'none','border-right':index==data3.length-1? '1px solid #e9eaec':''}" class='showWay1-content'>
                    <span>{{item.technology}}</span>
                  </div>
                 </Tooltip>
              <h3 v-if="data3.length===0">无</h3>
            </div>
            <h4>刺绣信息</h4>
            <div class="styleDetail" style="padding: 15px">
              <Table border :columns="columns4" :data="data4"></Table>
            </div>
          </div>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
    <!--提交-->
    <div v-if="orderSubmitShow">
      <Modal v-model="orderSubmitShow" class-name="delect entrepot" :mask-closable=false  width="400" v-drag>
        <p slot="header">
          <span class="main-heading">提交</span>
        </p>
        <div style="padding: 30px 0 10px;text-align: center;">
          <i class="ivu-icon ivu-icon-information-circled" style="color: #2d8cf0;font-size: 20px"></i>
          <span style="position: relative;top:-3px"> 确认提交? </span>
        </div>
        <div slot="footer">
          <Button class="clear" @click="orderSubmitShow=false">取消</Button>
          <Button class="save" @click="orderSubmitSave('fontInsertInfo')">确认</Button>
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
      return {
        //搜索条件
        searchFrom:{
          membername:'',
          orderid:'',
          pageIndex:1,
          pageSize:10,
          createDate:[],
          beginTime:'',
          endTime:''
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
            title: '用户名',
            width:'10%',
            key: 'membername',
            align: 'center',
          },
          {
            title: '订单号',
            width:'10%',
            key: 'orderid',
            align: 'center',
          },
          {
            title: '订单价格',
            width:'10%',
            key: 'price',
            align: 'center',
          },
          {
            title: '创建时间',
            width:'10%',
            key: 'createtime',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{verticalAlign: 'middle'},
                props: {
                  content:this.setTime(params.row.createtime),
                  placement: "bottom"
                }
              }, [
                h('span',
                  {

                  }, [
                    h("span", this.setTime(params.row.createtime))
                  ])
              ]);
            }
          },
          {
            title: '操作',
            width:'10%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    class: 'greenButton ',
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
        //发货日期
        shipdate:[],
        //详情中的订单信息 table
        detailsModalShow:false,
        tableSeeInfo:{
          membername:'',
          orderid:'',
          price:'',
          createtime:''
        },
        //特体信息
        bodyTypesVOs:[],
        //尺寸信息
        sizeVOs:[],
        //订单详情的数据
        orderInfoData:[],
        //订单详情的格式
        orderInfo:[
          {
            title: '序号',
            width:'5%',
            type:'index',
            key: 'index',
          },
          {
            title: '品类',
            width:'7%',
            key: 'clothname',
          },
          {
            title: '面料号',
            width:'7%',
            key: 'fabriccode',
          },
          {
            title: '面料价格',
            width:'7%',
            key: 'price',
          },
          {
            title: '款式风格',
            width:'7%',
            key: 'clothstyle',
          },
          {
            title: 'MTM订单号',
            width:'10%',
            key: 'mtmordenid',
          },
          {
            title: '数量',
            width:'5%',
            key: 'amount',
          },
          {
            title: '状态',
            width:'10%',
            key: 'statusname',
          },
          {
            title: '操作',
            width:'15%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    class: 'blueButton ',
                    style: {
                      marginLeft: '8px',
                      background:"#fff",
                      display:params.row.mtmordenid || params.row.ordentype==5 ?'none':'inline-block'
                    },
                    on: {
                      click: () => {
                        this.orderSubmit(params.row)
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-chakan',
                    }),

                    h('span',{
                    },'提交')
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
                        this.orderAll(params.row)
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
              ]);
            }
          }
        ],
        //提交
        orderSubmitInfo:'',
        //提交对话框
        orderSubmitShow:false,
        //详情中的查看
        orderAllShow:false,
        data3:[],
        columns3:[
          {
            title: '序号',
            width:'4%',
            type:'index',
            align: 'center',
          },
          {
            title: '工艺名称',
            width:'10%',
            key: 'component',
            align: 'center',
          },
          {
            title: '工艺内容',
            width:'10%',
            key: 'content',
            align: 'center',
          },
        ],
        data4:[],
        columns4:[
          {
            title: '序号',
            width:'4%',
            type:'index',
            align: 'center',
          },
          {
            title: '部位',
            width:'10%',
            key: 'position',
            align: 'center',
          },
          {
            title: '颜色',
            width:'10%',
            key: 'color',
            align: 'center',
          },
          {
            title: '字体',
            width:'10%',
            key: 'font',
            align: 'center',
          },
          {
            title: '内容',
            width:'10%',
            key: 'content',
            align: 'center',
          },
        ],
        //删除modal
        deleteModal:false,
        isClick:true,
      }
    },
    mounted(){
      this.ready()
    },
    methods: {
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
        // console.log(this.searchFrom.createDate)
        if (this.searchFrom.createDate[0]) {
          this.searchFrom.beginTime = this.setDate(this.searchFrom.createDate[0]);
          this.searchFrom.endTime = this.setDate(this.searchFrom.createDate[1]);
        } else {
          this.searchFrom.beginTime = '';
          this.searchFrom.endTime = ''
        }
        this.$http.get('/orders',{params:this.searchFrom}).then(res=>{
          this.data=res.data.data
          this.totals=res.data.total;
        })
      },
      search(){
        this.$children[3].page.pageIndex=1;
        this.searchFrom.pageIndex = 1;
        this.ready()
      },
      pageListen(data){
        this.searchFrom.pageIndex=data.pageIndex;
        this.searchFrom.pageSize=data.pageSize;
        console.log(data);
        this.ready();
      },
      tableSee(row){
        this.$http.get('/orders/'+row.id).then(res=>{
          this.orderInfoData=res.data.detailVOs;
          this.bodyTypesVOs=res.data.bodyTypesVOs;
          this.sizeVOs=res.data.sizeVOs;
          this.tableSeeInfo.membername=row.membername;
          this.tableSeeInfo.orderid=row.orderid;
          this.tableSeeInfo.price=row.price;
          this.tableSeeInfo.createtime=row.createtime;
          this.detailsModalShow=true;
        })
      },
      orderAll(row){
        this.$http.get('/detailinfo/'+row.id).then(res=>{
          this.orderAllShow=true
          this.data3=res.data.components
          let technology;
          this.data3.map(item=>{
            if(item.content){
              technology = item.parentname + ':' + item.component + '-' + item.content;
            }else{
              technology = item.parentname + ':' + item.component;
            }
            this.$set(item,'technology',technology)
          })
          console.log(this.data3)
          this.data4=res.data.embs
        })
      },
      //提交
      orderSubmit(row){
        this.orderSubmitInfo=row
        this.orderSubmitShow=true
      },
      orderSubmitSave(){
        if(this.isClick){
          this.isClick = false;
          this.$http.post('/mtmsubmit/'+this.orderSubmitInfo.id).then(res=>{
          this.orderSubmitInfo.mtmordenid=res.data;
          this.orderSubmitShow=false;
          this.isClick = true;
        }).catch(res=>{
          this.orderSubmitShow=false;
          this.isClick = true;
        })
        }
      }

    },
  }
</script>
<style lang="scss">
  .autoDiv{
    max-height: 500px;
    overflow-y: auto;
  }
  .definitionHeight {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    z-index: 3000 !important;
    border-radius: 5px;
    i{
      //color: #f76165;
    }
    span{
      font-size:12px;
    }
    .ivu-modal{
      top:0;
      .ivu-modal-content{
        /*min-height: 200px;*/
        /*max-height: 500px;*/
        /*overflow-y: auto;*/
      }
      .ivu-modal-close{
        top:4px;
      }
      .ivu-modal-header{
        padding: 9px 20px;
      }
      .ivu-modal-body{
        padding: 0px !important;
      }
    }
  }
  .showWay1{
    padding: 15px 15px;
    text-align:left;
    .ivu-col-span-8{
      padding:10px;
    }
    .ivu-tooltip{
      width: 33.33333333%;
      .ivu-tooltip-rel {
        width:100%;
      }
      .ivu-tooltip-inner{
        white-space: normal;
      }
    }
    .showWay1-content{
      border-left: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-indent:10px;
    }
    .showWay1-content:nth-child(3n){
      border-right: 1px solid #e9eaec !important;
    }
  }
</style>
