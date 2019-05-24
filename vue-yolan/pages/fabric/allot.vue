
<template>
  <div  class="delivery-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
                <span slot="header" class="com-slot-left">
                <span>当前位置：</span>
                <span>物料管理 /</span>
                <span>调拨管理</span>
                </span>
        <span slot="footer" class="com-slot-right">
                <span class="T3 main-heading" @click="leftInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline" style="margin-left:-1px"></Icon></span>新增物料信息</span></span>
                </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="编码" :label-width="80" class="specialCase" >
            <Input v-model="searchFrom.allotno" @on-enter="search()"></Input>
            <input type="text"style="display: none">
          </Form-item>
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
                  <Form-item label="调拨单号:">
                    {{tableSeeInfo.allotno}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="调出门店:">
                    {{tableSeeInfo.storeOut}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="调入门店:">
                    {{tableSeeInfo.storeIn}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="状态:">
                    {{tableSeeInfo.status}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="申请时间:">
                    {{setDate(tableSeeInfo.applyDate)}}
                  </Form-item>
                </i-col>
              </Row>
            </Form>
            <h4>订单明细</h4>
            <div class="styleDetail" style="padding: 15px">
              <Table border :columns="orderInfo" :data="orderInfoData"></Table>
            </div>
          </div>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import HeaderSlot from "../../components/public/head-slot.vue";
  import page from '../../components/public/page-current.vue';
  export default {
    data() {
     return {
      totals: 1,
      searchForm:{
        allotno:"",
        pageIndex:1,
        pageSize:10,
      },
      tableSeeInfo:{
        allotno:"",
        storeOut:"",
        storeIn:"",
        status:"",
        applyDate:""
      },
      detailsModalShow:false,
      columns:[
        {
          title: '序号',
          width: '10%',
          type: 'index',
          align: 'center',
        },
        {
          title: '调拨单号',
          width: '20%',
          key: 'allotno',
          align: 'center',
        },
        {
          title: '调出门店',
          width: '20%',
          key: 'storeOutname',
          align: 'center',
        },
        {
          title: '调入门店',
          width: '20%',
          key: 'storeInname',
          align: 'center',
        },
        {
          title: '申请时间',
          width: '20%',
          key: 'applyDate',
          align: 'center',
          render: (h, params) => {
            return h('Tooltip', {
              style:{verticalAlign: 'middle'},
              props: {
                content:this.setDate(params.row.applyDate) ,
                placement: "bottom"
              }
            }, [
              h('span',
                {

                }, [
                  h("span", this.setDate(params.row.applyDate))
                ])
            ]);
          }
        },
        {
          title: '状态',
          width: '20%',
          key: 'status',
          align: 'center',
        },
        {
          title: '操作',
          width:'50%',
          key: 'id',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                  class: 'blueButton',
                  style: {
                    marginLeft: '8px',
                    background:"transparent",
                  },
                  on: {
                    click: () => {
                      this.tableListDetails(params.row);
                      this.detailsModalShow = true;
                    }
                  }
                },
                [
                  h('i',{
                    class:'iconfont  icon-bianji',
                  }),

                  h('span',{
                  },'详情')
                ]
              ),
              h('Button', {
                  class: 'greenButton',
                  style: {
                    background:"transparent",
                    marginLeft: '8px',
                    marginRight: '8px',

                  },
                  on: {
                    click: () => {
                      this.getRightTable(params.row)
                    }
                  },
                },[
                  h('i',{
                    class:'iconfont icon-qingkong',
                  }),
                  h('span',{

                  },'驳回')
                ]
              ),
              h('Button', {
                  class: 'yellowButton ',
                  style: {
                    marginLeft: '8px',
                    marginRight: '8px',
                    background:"transparent",
                  },
                  on: {
                    click: () => {
                      this.leftDone(params.row)
                    }
                  }
                },
                [
                  h('i',{
                    class:'iconfont  icon-bianji',
                  }),

                  h('span',{
                  },'通过')
                ]
              ),
              h('Button', {
                  class: 'redButton',
                  style: {
                    background:"transparent",
                    marginLeft: '8px',
                    marginRight: '8px',
                  },
                  on: {
                    click: () => {
                      this.leftDeleteInfo=params.row.id
                      this.leftDeleteShow=true;
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
      data:[],
      orderInfo:[
        {
          title: '序号',
          width: '10%',
          type: 'index',
          align: 'center',
        },
        {
          title: '商品名称',
          width: '20%',
          key: 'goodsname',
          align: 'center',
        },
        {
          title: '数量',
          width: '20%',
          key: 'amount',
          align: 'center',
        },
        {
          title: '单位',
          width: '20%',
          key: 'unit',
          align: 'center',
        },
        {
          title: '调出仓库',
          width: '20%',
          key: 'storageOutname',
          align: 'center',
        },
        {
          title: '调入仓库',
          width: '20%',
          key: 'storageInname',
          align: 'center',
        },
        {
          title: '调出库位',
          width: '20%',
          key: 'locationOutname',
          align: 'center',
        },
        {
          title: '调入库位',
          width: '20%',
          key: 'locationInname',
          align: 'center',
        },
      ],
      orderInfoData:[],
     }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData () {
        this.$http.get('/allots',{params:this.searchFrom}).then(res=>{
          this.data=res.data.data;
          this.totals=res.data.total;
        })
      },
      search () {
        this.searchForm.pageIndex = 1;
        this.$refs.pages.pageReset(this.searchForm.pageSize, this.searchForm.pageIndex);
        this.getData()
      },
      searchFrom () {

      },
      //详情
      tableListDetails (row) {
        this.$http.get('/allot/'+row.id).then(res=>{
            console.log(res);
          this.orderInfoData = res.data.allotDetails;
          this.tableSeeInfo.allotno=row.allotno;
          this.tableSeeInfo.storeOut=row.storeOut;
          this.tableSeeInfo.storeIn=row.storeIn;
          this.tableSeeInfo.status=row.status;
          this.tableSeeInfo.applyDate=row.applyDate;
        })
      },
      pageListen(data){
        this.searchFrom.pageIndex=data.pageIndex;
        this.searchFrom.pageSize=data.pageSize;
        this.getData();
      },
      //时间戳转时间
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
    }
  };
</script>
<style scoped>
.delivery-wrap .redButton::before{
  position: absolute;
  content: '';
  width: 1px;
  height: 14px;
  background: #ccc;
  left: -8px;
  top: 2px;
  display: inline-block;
  opacity: 1;
}
</style>
