<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>收银管理 /</span>
          <span>总单列表</span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="总单编码" :label-width="70" class="specialCase" >
            <Input v-model="searchFrom.orderCode" @on-enter="search"></Input>
            <input type="text" style="display: none">
          </Form-item>
          <Form-item label="状态" :label-width="60" class="specialCase">
            <Select v-model="searchFrom.status">
              <Option :value="item.id" v-for='item in orderStatus' :key='item.id'>{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item label="关键字" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.keyword" @on-enter="search"></Input>
            <input type="text" style="display: none">
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
    <!--详情-->
    <div v-if="detailsShow">
            <Modal v-model="detailsShow" :mask-closable='false'  width="770" v-drag class='lookIntoModal-wrap'>
                <p slot="header">
                    <span class="main-heading">单号详情</span>
                </p>
                <div class="modalContent" style="text-align:center">
                    <h4>基本信息</h4>
                    <Form ref="LookIntoInfo" class="searchForm" label-position="left" :model="LookIntoInfo"  inline style="text-align: left;padding:15px 20px 0">
                        <Form-item prop="intoNumber"  label="总单单号:" :label-width="70" >
                            <div v-html="LookIntoInfo.orderCode"></div>
                        </Form-item>
                        <Form-item prop="shopName"  label="客户姓名:" :label-width="70" >
                            <div v-html="LookIntoInfo.customerName"></div>
                        </Form-item>
                        <Form-item prop="intoType"  label="客户电话:" :label-width="70" >
                            <div v-html="LookIntoInfo.customerTel"></div>
                        </Form-item>
                    </Form>
                     <h4>订单明细</h4>
                     <div class="styleDetail" style="padding: 15px">
                         <Table border :columns="LookIntocolumns" :data="LookIntodata"></Table>
                    </div>
                </div>
                <div slot="footer"></div>
            </Modal>
        </div>
  </div>
</template>
<script>
import HeaderSlot from "../../components/public/head-slot.vue";
import page from "../../components/public/page-current.vue";
export default {
  components: { HeaderSlot },
  data() {
    return {
      //搜索条件
      searchFrom: {
        pageIndex: 1,
        pageSize: 10,
        keyword: "",
        orderCode: "",
        status:''
      },
      orderStatus:[],
      //外表数据条数
      totals: 1,
      //table
      columns: [
        {
          title: "序号",
          width: "4%",
          type: "index",
          align: "center"
        },
        {
          title: "总单编码",
          width: "10%",
          key: "orderCode",
          align: "center"
        },
        {
          title: "客户姓名",
          width: "10%",
          key: "customerName",
          align: "center"
        },
        {
          title: "客户电话",
          width: "10%",
          key: "customerTel",
          align: "center"
        },
        {
          title: "门店",
          width: "10%",
          key: "storename",
          align: "center"
        },
        {
          title: "店员",
          width: "10%",
          key: "staffname",
          align: "center"
        },
        {
          title: "操作",
          width: "10%",
          key: "id",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  class: "greenButton ",
                  style: {
                    marginLeft: "8px",
                    background: "#fff"
                  },
                  on: {
                    click: () => {
                      this.details(params.row);
                    }
                  }
                },
                [
                  h("i", {
                    class: "iconfont  icon-bianji"
                  }),

                  h("span", {}, "详情")
                ]
              )
            ]);
          }
        }
      ],
      data: [],
      // 详情
      detailsShow: false,
      LookIntoInfo:{},
      LookIntocolumns:[
         {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title:'分销单号',
          key:'ordenid',
          align: "center"
        },
        {
          title:'产品',
          key:'name',
          align: "center"
        },
        {
          title:'面料编号',
          key:'fabriccode',
          align: "center"
        },
        {
          title:'零售价',
          key:'price',
          align: "center",
          render:(h,params)=>{
            return h('div',{
              domProps:{
                innerHTML:params.row.price/params.row.amount
              }
            })
          }
        },
        {
          title:'数量',
          key:'amount',
          align: "center"
        }
      ],
      LookIntodata:[]
    };
  },
  mounted() {
    this.ready();
    this.getStatus();
  },
  methods: {
    details(row){
      this.detailsShow = true;
      this.$http.get('/totalOrder/'+row.id).then(res=>{
        console.log(res.data);
        this.LookIntoInfo = res.data;
        this.LookIntodata = res.data.orders;
      })
    },
    cancels(name) {
      this.$refs[name].resetFields();
    },
    ready() {
      this.$http.get("/totalOrders", { params: this.searchFrom }).then(res => {
        this.data = res.data.data;
        this.totals = res.data.total;
      });
    },
    getStatus(){
      this.$http.get('/dictSystem/category',{params:{category:'PAYSTATE'}}).then(res=>{
        this. orderStatus = res.data;
      })
    },
    search() {
      this.searchFrom.pageIndex = 1;
      this.$refs.pages.pageReset(
        this.searchFrom.pageSize,
        this.searchFrom.pageIndex
      );
      this.ready();
    },
    pageListen(data) {
      this.searchFrom.pageIndex = data.pageIndex;
      this.searchFrom.pageSize = data.pageSize;
      console.log(this.searchFrom);
      this.ready();
    }
  }
};
</script>
<style lang="scss" scoped>
.ivu-form-inline .ivu-form-item{
  margin-right:60px;
}
</style>


