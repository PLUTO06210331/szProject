<template>
   <div class="cashier-form spaceBetween" v-com>
     <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
          <span>收银管理 /</span>
          <span>收银列表</span>
        </span>
     </header-slot>
     <div class="tableDistance">
     <Form class="searchForm searchStyle" label-position="left" inline>
       <Form-item label="客户姓名" :label-width="75" class="specialCase">
         <Input v-model="searchForm.customerName" @on-enter="search"></Input>
       </Form-item>
       <Form-item label="客户电话" :label-width="75" class="specialCase">
         <Input v-model="searchForm.customerTel" @on-enter="search"></Input>
       </Form-item>
       <Form-item label="总单单号" :label-width="75" class="specialCase">
         <Input v-model="searchForm.orderCode" @on-enter="search"></Input>
       </Form-item>
       <Form-item label="交易状态" :label-width="75" class="specialCase">
         <Select v-model="searchForm.status">
           <Option :value="' '">全部</Option>
           <Option v-for="(item,index) in statusList" :value="item.id" :key="index">{{ item.name }}</Option>
         </Select>
       </Form-item>
       <Form-item label="收款类型" :label-width="75" class="specialCase">
         <Select v-model="searchForm.type">
           <Option :value="' '">全部</Option>
           <Option v-for="(item,index) in typeList" :value="item.id" :key="index">{{ item.name }}</Option>
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
     <!--详情-->
     <div v-if="tableDetailsShow">
       <Modal v-model="tableDetailsShow"  width="870" class-name="delectNopad" :mask-closable='false'  v-drag >
         <p slot="header">
           <span class="main-heading">订单详情</span>
         </p>
         <div class="formDiv cashier-form">
           <div class="modalContent" style="text-align:center">
             <h4>基本信息</h4>
             <Form class="basicForm searchForm" :label-width="70"  inline style="text-align: left">
               <Row class="detailRow">
                 <i-col span="8">
                   <Form-item label="收银单编码:">
                     {{tableDetailsInfo.cashierOrderCode}}
                  </Form-item>
                 </i-col>
                 <i-col span="8">
                   <Form-item label="客户姓名:">
                     {{tableDetailsInfo.customerName}}
                  </Form-item>
                 </i-col>
                 <i-col span="8">
                   <Form-item label="客户电话:">
                     {{tableDetailsInfo.customerTel}}
                  </Form-item>
                 </i-col>
                 <i-col span="8">
                   <Form-item label="总单编码:">
                     {{tableDetailsInfo.orderCode}}
                  </Form-item>
                 </i-col>
                 <i-col span="8">
                   <Form-item label="收银类型:">
                     {{tableDetailsInfo.typename}}
                  </Form-item>
                 </i-col>
                 <i-col span="8">
                   <Form-item label="收款金额:">
                     {{tableDetailsInfo.amount}}
                  </Form-item>
                 </i-col>
               </Row>
             </Form>
             <h4>订单明细</h4>
             <div class="styleDetail" style="padding: 15px">
               <Table border :columns="orderInfo" :data="tableDetailsInfo.orders"></Table>
             </div>
           </div>
           <p slot="header">
             <span class="main-heading"></span>
           </p>
           <div class="cashier-form">
             <div class="modalContent" style="text-align:center">
               <h4>付款明细</h4>
               <div class="styleDetail" style="padding: 15px">
                 <Table border :columns="paymentInfo" :data="tableDetailsInfo.paylist"></Table>
               </div>
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

    export default {
        data() {
            return {
              totals:1,              /*列表数据条数*/
              statusList:[],
              typeList:[],
              searchForm:{           /*搜索条件*/
                customerName:"",
                customerTel:"",
                orderCode:'',
                type:' ',
                status:'',
                pageIndex:1,
                pageSize:10,
              },
              tableDetailsShow:false,
              tableDetailsValidate:{},
              tableDetailsInfo:{
                cashierOrderCode:"",
                orderCode:"",
                tel:"",
                name:"",
                paytypename:"",
                price:"",
              },
              /*表格数据*/
              columns: [
                {
                  title: '序号',
                  width:'10%',
                  type:'index',
                  align: 'center',
                },
                {
                  title: '收银单编码',
                  width:'25%',
                  key:'cashierOrderCode',
                  align: 'center',
                },
                {
                  title: '收款类型',
                  width:'15%',
                  key:'typename',
                  align: 'center',
                },
                {
                  title: '总单ID',
                  width:'25%',
                  key: 'orderCode',
                  align: 'center',
                },
                {
                  title: '客户姓名',
                  width:'20%',
                  key: 'customerName',
                  align: 'center',
                },
                {
                  title: '客户电话',
                  width:'20%',
                  key: 'customerTel',
                  align: 'center',
                },
                {
                  title: '审核状态',
                  width:'20%',
                  key: 'auditStatusName',
                  align: 'center',
                },
                {
                title:'备注',
                width:'20%',
                key:'remark',
                align:'center',
                renderHeader:(h,params) => {
                  return h('div',{
                    style:{
                      textIndent:'-50px'
                    }
                  },'备注')
                },
                render:(h,params) => {
                  let self = this;
                  let remarkArr = this.subCut(params.row.remark,11);
                  return h('div',{
                    style:{
                      display:'flex',
                      flexFlow:'row noWrap',
                    },
                    'class':'remarkInput',
                  },[
                    h('Tooltip',{
                        props:{
                          content:params.row.remark?params.row.remark:'',
                          maxlength:500
                        },
                        style:{
                          border:params.row.remarkInputShow?'none':'1px solid #dddee1'
                        }
                      },[
                        h('div',{
                          slot:'content',
                        },[
                          h('ul',remarkArr.map(function(item){
                            return h('li',{
                              domProps:{
                                innerHTML:item
                              }
                            })
                          }))
                        ]),
                        h('Input',{
                          props:{
                            value:params.row.remarkInput,
                            readonly:params.row.remarkInputShow,
                            autofocus:true
                          },
                          'on':{
                            'on-change':(e) => {
                              params.row.remarkInputChange = true;
                              params.row.remarkInput = e.target.value;
                              self.$emit('on-change',e.target.value)
                            }
                          }
                        }),
                      ]),
                  h('div',{
                    'class':'remarkIconWrap',
                    style:{
                      width:'40px',
                      display:'flex',
                      flexFlow:'row noWrap',
                      justifyContent:'center',
                      alignItems:'center',
                    }
                  },[
                    h('Icon',{
                      props:{
                        type:'compose',
                        color:'#4A90E2',
                        size:18
                      },
                      style:{
                        display:params.row.remarkInputShow?'block':'none',
                      },
                      nativeOn:{
                        click:() => {
                          params.row.remarkInputShow = false;
                        }
                      }
                    }),
                        h('Icon',{
                          props:{
                            type:'close'
                          },
                          style:{
                            display:params.row.remarkInputShow?'none':'block'
                          },
                          nativeOn:{
                            click:() => {
                              this.remarkInputClose(params);
                            }
                          }
                        }),
                        h('Icon',{
                          props:{
                            type:'checkmark'
                          },
                          style:{
                            display:params.row.remarkInputShow?'none':'block'
                          },
                          nativeOn:{
                            click:() => {
                              this.remarkInputSure(params);
                            }
                          }
                        }),
                      ])
                  ])
                }
                },
                {
                  title: '操作',
                  width:'40%',
                  key: 'id',
                  align: 'center',
                  render: (h, params) => {
                    return h('div', {
                      style:{
                        display:'flex',
                        flexFlow:'row nowrap',
                        justifyContent:'center'
                      }
                    },[
                      h('Button', {
                        class:'button',
                          style: {
                            color:'#2d8cf0',
                            padding:0,
                            border:0,
                            marginLeft: '8px',
                            background:"#fff",
                            display: params.row.status == "8"?"block":"none"
                          },
                          on: {
                            click: () => {
                              this.tableDone(params.row);
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
                        class:'button',
                          style: {
                            color:'#495060',
                            padding:0,
                            border:0,
                            marginLeft: '8px',
                            background:"transparent",
                          },
                          on: {
                            click: () => {
                              this.tableDetails(params.row);
                            }
                          }
                        },
                        [
                          h('i',{
                            class:'iconfont  icon-xiangqing',
                          }),

                          h('span',{
                          },'详情')
                        ]
                      ),
                      h('Button', {
                        class:'button',
                          style: {
                            color:'#2d8cf0',
                            padding:0,
                            border:0,
                            marginLeft: '8px',
                            background:"transparent",
                            display: params.row.status !== "8"?"block":"none"
                          },
                          on: {
                            click: () => {
                              this.printing(params.row.id);
                            }
                          }
                        },
                        [
                          h('i',{
                            class:'iconfont  icon-bianji',
                          }),

                          h('span',{
                          },'打印凭据')
                        ]
                      ),
                      h('Button', {
                        class:'button',
                          style: {
                            color:'#49c34b',
                            padding:0,
                            border:0,
                            marginLeft: '8px',
                            background:"transparent",
                          },
                          on: {
                            click: () => {
                              this.getAuditstatus(params.row,status=1);
                            }
                          }
                        },
                        [
                          h('i',{
                            class:'iconfont  icon-xiangqing',
                          }),

                          h('span',{
                          },'审核')
                        ]
                      ),
                      h('Button', {
                        class:'button',
                          style: {
                            color:'#ff6833',
                            padding:0,
                            border:0,
                            marginLeft: '8px',
                            background:"transparent",
                          },
                          on: {
                            click: () => {
                              this.getAuditstatus(params.row,status=0);
                            }
                          }
                        },
                        [
                          h('i',{
                            class:'iconfont  icon-xiangqing',
                          }),

                          h('span',{
                          },'反审核')
                        ]
                      ),

                     ]);
                  }
                }
             ],
              orderInfo:[
                {
                  title: '序号',
                  width:'5%',
                  type:'index',
                  align: 'center',
                },
                {
                  title: '分销单号',
                  width:'20%',
                  key:'ordenid',
                  align: 'center',
                },
                {
                  title: '产品',
                  width:'10%',
                  key:'name',
                  align: 'center',
                },
                {
                  title: '面料编号',
                  width:'10%',
                  key:'fabriccode',
                  align: 'center',
                },
                // {
                //   title: '衬类型',
                //   width:'10%',
                //   key:'liningtype',
                //   align: 'center',
                // },
                {
                  title: '零售价',
                  width:'10%',
                  key:'price',
                  align: 'center',
                  render:(h,params)=>{
                    return h('div',{
                      domProps:{
                        innerHTML:params.row.price/params.row.amount
                      }
                    })
                  }
                },
                // {
                //   title: '折扣',
                //   width:'10%',
                //   key:'',
                //   align: 'center',
                // },
                // {
                //   title: '优惠金额',
                //   width:'10%',
                //   key:'',
                //   align: 'center',
                // },
                {
                  title: '数量',
                  width:'10%',
                  key:'amount',
                  align: 'center',
                },
                {
                  title: '惠前金额',
                  width:'10%',
                  key:'',
                  align: 'center',
                  render:(h,params)=>{
                    return h('div',{

                    },params.row.price)
                  }
                },
                  {
                  title: '惠后金额',
                  width:'10%',
                  key:'actualAmount',
                  align: 'center',
                  render:(h,params)=>{
                    return h('div',{
                      domProps:{
                        innerHTML:params.row.actualAmount!==null?params.row.actualAmount:' ',
                      }
                    })
                  }
                },
              ],
              paymentInfo: [
                {
                  title: '序号',
                  width:'10%',
                  type:'index',
                  align: 'center',
                },
                {
                  title: '支付方式',
                  width:'25%',
                  key:'paytypename',
                  align: 'center',
                },
                {
                  title: '支付金额',
                  width:'15%',
                  key:'price',
                  align: 'center',
                },
              ],
              data:[],
            };
        },
        mounted() {
          this.searchStatus();
          this.searchType();
          this.ready();
        },
        methods: {
          ready () {
            this.$http.get('/cashier/orders',{params:this.searchForm}).then(res=>{
              let data = res.data.data;
              data.map((item)=>{
                if(item.auditStatus==1){
                  this.$set(item,'auditStatusName','已审核');
                }else{
                  this.$set(item,'auditStatusName','未审核')
                }
                this.$set(item,'remarkInputShow',true);
                this.$set(item,'remarkInput',item.remark);
                this.$set(item,'remarkInputChange','false')
              })
              this.data = res.data.data;
              this.totals = res.data.total;
            })
          },
          // 获取下拉数据
          searchStatus () {
            this.$http.get('/cashier/paystate').then(res=>{
              this.statusList = res.data;
              //this.searchForm.status = res.data[0].id;
            })
          },

          searchType(){
            this.$http.get('/cashier/receiveType').then(res=>{
              this.typeList = res.data;
            })
          },

          pageListen (data) {
            this.searchForm.pageIndex=data.pageIndex;
            this.searchForm.pageSize=data.pageSize;
            this.ready();
          },
          search () {
            this.searchForm.pageIndex = 1;
            this.$refs.pages.pageReset(this.searchForm.pageSize,this.searchForm.pageIndex);
            this.ready()
          },
          // 编辑
          tableDone (row) {
            this.$http.get('/cashier/edit/'+row.id).then(res=>{
              sessionStorage.setItem("tableID",JSON.stringify(res.data));
              this.$router.push('/home/examples');
            });

          },
          // 详情
          tableDetails (row) {
            this.$http.get('/cashier/detailinfo/'+row.id).then(res=>{
              this.tableDetailsInfo=res.data;
              this.tableDetailsShow = true;
            });
          },
          // 审核状态
          getAuditstatus(row,status){
            console.log(row);
            let params = {};
            params.id = row.id;
            params.auditStatus = status;
            this.$http.put('/cashier/auditstatus',params).then((res)=>{
              if(res.status==200){
                this.$Message.success({
                  content:'操作成功'
                })
                this.ready();
              }
            })
          },
          printing(id){
            this.$http.get('/cashier/invoice/'+id).then(res=>{
              let data = res.data;
              this.$set(data,'router',2);
              sessionStorage.setItem('data',JSON.stringify(data))
              this.$router.push('/print')
            })
          },

          remarkInputClose(params){
            params.row.remarkInputShow = true;
            let editRemarkForm = {};
            editRemarkForm.id = params.row.id;
            editRemarkForm.remark = params.row.remark;
            if(params.row.remarkInputChange){
              this.$http.put('/cashier',editRemarkForm).then(res=>{
                if(res.data){
                  this.data[params.index].remarkInputChange = false;
                  this.ready();
                }
              })
            }
          },
          remarkInputSure(params){
            params.row.remarkInputShow = true;
            let editRemarkForm = {};
            editRemarkForm.id = params.row.id;
            editRemarkForm.remark = params.row.remarkInput;
            if(params.row.remarkInputChange){
              this.$http.put('/cashier',editRemarkForm).then(res=>{
                if(res.data){
                  this.$Message.success('编辑成功');
                  this.data[params.index].remarkInputChange = false;
                  this.ready();
                }
              })
            }
          },
          subCut(str,n){
            let arr=[];
            if(str){
              let len=Math.ceil(str.length/n);
              for(let i=0;i < len;i++){
                if(str.length >= n){
                  let strCut=str.substring(0,n);
                  arr.push(strCut);
                  str=str.substring(n);
                }else{
                  str=str;
                  arr.push(str);
                }
              }
              return arr;
            }else{
              arr.push('');
              return arr;
            }
          }
        }
    };
</script>
<style scoped>

</style>
<style lang="scss">
 table .button{
   position: relative;
   margin:0 10px;
 }
  table .button i{
    margin-right: 5px;
    font-size: 12px;
  }
  table .button span{
    font-size: 12px;
    line-height: 14px;
  }
  table .button:not(:last-child)::after{
    position: absolute;
    content: '';
    width: 1px;
    height: 14px;
    background: #ccc;
    right: -8px;
    top: 2px;
  }
  .formDiv{
    max-height: 500px;
    overflow-y: auto;
  }
  .cashier-form table .blueButton::after{
    width: 0;
  }
  .cashier-form table .redButton::before{
    width: 0;
  }
  .cashier-form .ivu-table-cell{
    padding-left: 0;
    padding-right: 0;
  }
  .remarkInput .ivu-input{
    border:none!important;
    width:100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .remarkInput .ivu-input-group-append{
    background-color:#fff;
    border:none;
    cursor: pointer;
  }
  .remarkInput .ivu-input-group-append>div{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width:30px;
  }
  .remarkInput .ivu-tooltip-popper{
    height:400px;
    overflow-y: auto;
  }
    .remarkIconWrap>i{
      cursor: pointer;
    }
  .remarkIconWrap>i:not(:last-child){
    margin-right:10px;
  }
</style>
