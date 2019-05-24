<template>
  <div class="delivery-wrap spaceBetween" >
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
          <span>订单管理 /</span>
          <span>客户信息</span>
        </span>
        <span slot="footer" class="com-slot-right">
          <!-- <span class="T3 main-heading" @click="caseWHInfoAddShow = true"><span class="shade" style='padding: 7px 8px;border-radius: 15px;'><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline" style="margin-left: 0px;"></Icon></span>添加客户信息</span></span> -->
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="客户姓名" :label-width="70" class="specialCase" >
            <Input v-model="searchFrom.name" @on-enter="search()"></Input>
          </Form-item>
          <Form-item label="客户电话" :label-width="70" class="specialCase" >
            <Input v-model="searchFrom.tel" @on-enter="search()"></Input>
          </Form-item>
          <Form-item class="specialHandling" style="width:33px;">
            <Button icon="search" @click="search" style="width:30px;"></Button>
          </Form-item>
        </Form>
        <div style="clear: both"></div>
        <div id="tableBox" ref="tableBox">
          <Table v-com border :columns="columns" :data="data" ></Table>
        </div>

        <page-current class="pages-position" ref="pages" :total = 'totals'  @pageChange="pageListen"></page-current>
      </div>
    </div>
    <!--详情-->
    <div v-if="detailsModalShow">
      <Modal v-model="detailsModalShow"  width="600" class-name="delectNopad" :mask-closable='false'  v-drag >
        <p slot="header">
          <span class="main-heading">客户档案详情</span>
        </p>
        <div class="autoDiv">
          <div class="modalContent" style="text-align:center">
            <h4>基本信息</h4>
            <Form class="basicForm searchForm" :label-width="70"  inline style="text-align: left">
              <Row class="detailRow">
                <i-col span="8">
                  <Form-item label="用户名:">
                    {{clientInfo.name}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="身高:">
                    {{clientInfo.height}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="体重:">
                    {{clientInfo.weight}}
                  </Form-item>
                </i-col>
              </Row>
            </Form>
            <h4 style="position:relative">尺寸信息 <Button class="greenButton" @click="searchOldSize" style="position:absolute;right:15px;top:2px">查看历史尺寸信息</Button></h4>

              <Tabs value="1">
                <TabPane label="自主设计" name="1">
                  <div class="showWay1" style="text-align:center" v-if='sizeValue'>
                      <Row v-if="sizeValue">
                        <i-col span="8" v-for="(item,index) in sizeValue" :key="index" :style="{'border-top':index<3 ? '1px solid #e9eaec':'none','border-right':index==sizeValue.length-1? '1px solid #e9eaec':'none'}">
                          <span>{{item.name}} :</span>
                          <span>{{item.sizevalue}}</span>
                        </i-col>
                      </Row>
                  </div>
                  <h3 v-else>暂无自主设计信息</h3>
                </TabPane>
                <TabPane label="快速下单" name="2">
                  <div class="showWay1" style="text-align:center" v-if='placeOrder'>
                    <Tabs value="1">
                        <TabPane label="净体" name="1">
                          <Row v-if="placeOrder['1']">
                            <i-col span="8" v-for="(item,index) in placeOrder['1']" :key="index" :style="{'border-top':index<3 ? '1px solid #e9eaec':'none','border-right':index==sizeValue.length-1? '1px solid #e9eaec':'none'}">
                              <span>{{item.name}} :</span>
                              <span>{{item.sizevalue}}</span>
                            </i-col>
                          </Row>
                          <h3 v-else>暂无净体信息</h3>
                        </TabPane>
                        <TabPane label="成衣" name="2">
                          <Row v-if="placeOrder['2']" v-for="(item,index) in placeOrder['2']" :key='index'>
                            <h5 style='margin:10px 0;'>{{item.clothname}}</h5>
                            <i-col span="8" v-for="(item_child,index_child) in item.sizes" :key="index_child" :style="{'border-top':index<3 ? '1px solid #e9eaec':'none'}" style='border-right:1px solid #e9eaec'>
                              <span>{{item_child.name}} :</span>
                              <span>{{item_child.sizevalue}}</span>
                            </i-col>
                          </Row>
                           <h3 v-else>暂无成衣信息</h3>
                        </TabPane>
                      </Tabs>
                    </div>
                    <h3 v-else >暂无快速下单信息</h3>
                </TabPane>
              </Tabs>
          </div>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
    <!-- 历史尺寸信息弹窗 -->
    <div v-if="detailsModalOldInfoShow">
      <Modal v-model="detailsModalOldInfoShow"  width="600" :styles="{height:'55%','overflow-y': 'scroll','box-shadow':'1px 1px 16px 6px #bbbec4'}" class-name="delectNopad" :mask-closable='false'  v-drag >
        <p slot="header">
          <span class="main-heading">客户历史尺寸信息</span>
        </p>
            <div class="showWay1 autoDiv">
              <div v-if="detailsModalOldInfo">
                <Row v-for="(item,index) in detailsModalOldInfo" :key="index">
                  <h4 style="display:block;height:30px;line-height:30px">订单号:<span>{{item.orderid}}</span></h4>
                  <i-col span="8" v-for="(items,indexs) in item.sizevos" :key="indexs" :style="{'border-top':indexs<3 ? '1px solid #e9eaec':'none','border-right':indexs  ==item.sizevos.length-1? '1px solid #e9eaec':'none'}" style="text-align:center">
                    <span>{{items.name}} :</span>
                    <span>{{items.sizevalue}}</span>
                  </i-col>
                </Row>
              </div>

              <h3 v-if="detailsModalOldInfo===null" style="text-align:center">暂无历史尺寸信息</h3>
            </div>


        <div slot="footer">
        </div>
      </Modal>
    </div>
    <!--新增-->
    <div v-if="caseWHInfoAddShow">
      <Modal v-model="caseWHInfoAddShow" class-name="delect big-sized" :mask-closable=false  width="870" v-drag>
        <p slot="header">
          <span class="main-heading">新增客户信息</span>
        </p>
        <Form ref="caseWHInfoAdd" class="searchForm" :model='caseWHInfoAdd' label-position="right" :rules="tableInsertRule" inline style="text-align: left;">
          <Form-item prop="name" label="用户名"   :label-width="75" class="specialCase">
            <Input v-model="caseWHInfoAdd.name"></Input>
          </Form-item>
          <Form-item prop="gender"  label="性别"  :label-width="75">
            <Input v-model="caseWHInfoAdd.gender"></Input>
          </Form-item>
          <Form-item prop="height"  label="身高" :label-width="75" >
            <Input v-model="caseWHInfoAdd.height"></Input>
          </Form-item>
          <Form-item prop="weight"  label="体重"  :label-width="75">
            <Input v-model="caseWHInfoAdd.weight"></Input>
          </Form-item>
          <Form-item prop="tel"  label="电话"  :label-width="75">
            <Input v-model="caseWHInfoAdd.tel"></Input>
          </Form-item>
          <Form-item prop="beginTime"  label="开始时间" :label-width="75" >
            <DatePicker type="date"  v-model="caseWHInfoAdd.beginTime" class="timeInput"></DatePicker>
          </Form-item>
          <Form-item prop="endTime"  label="结束时间" :label-width="75" >
            <DatePicker type="date"   v-model="caseWHInfoAdd.endTime" class="timeInput"></DatePicker>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="clear ripples" @click="handleReset('caseWHInfoAdd')" style="margin-bottom: 15px">清空</Button>
          <Button class="save ripple"  style="margin-bottom: 15px" @click="handleSubmit('caseWHInfoAdd')">添加</Button>
        </div>
      </Modal>
    </div>
    <!--修改-->
    <div v-if="clientEditShow">
      <Modal v-model="clientEditShow" class-name="delect big-sized" :mask-closable=false  width="870" v-drag>
        <p slot="header">
          <span class="main-heading">编辑客户信息</span>
        </p>
        <Form ref="clientEdit" class="searchForm" :model='clientEdit' label-position="right" inline style="text-align: left;">
          <Form-item prop="name" label="用户名"   :label-width="75" class="specialCase">
            <Input v-model="clientEdit.name"></Input>
          </Form-item>
          <Form-item prop="gender"  label="性别"  :label-width="75">
            <Input v-model="clientEdit.gender"></Input>
          </Form-item>
          <Form-item prop="height"  label="身高" :label-width="75" >
            <Input v-model="clientEdit.height"></Input>
          </Form-item>
          <Form-item prop="weight"  label="体重"  :label-width="75">
            <Input v-model="clientEdit.weight"></Input>
          </Form-item>
          <Form-item prop="tel"  label="电话"  :label-width="75">
            <Input v-model="clientEdit.tel"></Input>
          </Form-item>
          <Form-item prop="beginTime"  label="开始时间" :label-width="75" >
            <DatePicker type="date"  v-model="clientEdit.beginTime" class="timeInput"></DatePicker>
          </Form-item>
          <Form-item prop="endTime"  label="结束时间" :label-width="75" >
            <DatePicker type="date"   v-model="clientEdit.endTime" class="timeInput"></DatePicker>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="clear ripples" @click="handleReset('clientEdit')" style="margin-bottom: 15px">复原</Button>
          <Button class="save ripple"  style="margin-bottom: 15px" @click="clientEditSubmit('clientEdit')">修改</Button>
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
            <Button  class="save" @click="deleteConfirm">确认</Button>
            <Button  class="clear" @click="deleteModal=false">取消</Button>
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
      return {
        detailId:'',
        caseWHInfoAdd:{
          beginTime:'',
          endTime:'',
          name:'',
          weight:'',
          height:'',
          gender:'',
          tel:''
        },
        totals:1,
        searchFrom:{
          pageIndex:1,
          pageSize:10,
        },
        clientInfo:{
          pageIndex:1,
          pageSize:10,
        },
        clientEdit:{
          pageIndex:1,
          pageSize:10,
        },
        searchData:{
          pageIndex:1,
          pageSize:10,
        },
        tableInsertRule:{
          name: [
            { required: true,message:'请填写姓名', trigger: 'blur' },
          ],

        },
        columns: [
          {
            title: '序号',
            width:'5%',
            type:'index',
            align: 'center',
          },
          {
            title: '用户名',
            width:'8%',
            key: 'name',
            align: 'center',
          },
          {
            title: '性别',
            width:'8%',
            key: 'gender',
            align: 'center',
            render:(h,params)=>{
              return h('span',{},params.row.gender==='1'?'男':'女')
            }
          },
          {
            title: '身高',
            width:'8%',
            key: 'height',
            align: 'center',
          },
          {
            title: '体重',
            width:'8%',
            key: 'weight',
            align: 'center',
          },
          // {
          //   title: '尺寸',
          //   width:'8%',
          //   key: 'sizes',
          //   align: 'center',
          // },
          {
            title: '电话',
            width:'10%',
            key: 'tel',
            align: 'center',
          },
          {
            title: '开始时间',
            width:'9%',
            key: 'beginTime',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{verticalAlign: 'middle'},
                props: {
                  content:this.setDate(params.row.beginTime) ,
                  placement: "bottom"
                }
              }, [
                h('span',
                  {

                  }, [
                    h("span", this.setDate(params.row.beginTime))
                  ])
              ]);
            }
          },
          {
            title: '结束时间',
            width:'13%',
            key: 'endTime',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{verticalAlign: 'middle'},
                props: {
                  content:this.setDate(params.row.endTime) ,
                  placement: "bottom"
                }
              }, [
                h('span',
                  {

                  }, [
                    h("span", this.setDate(params.row.endTime))
                  ])
              ]);
            }
          },
          {
            title: '操作',
            width:'14%',
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
                        this.detailId = params.row.id
                        this.tableSee()
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
                // h('Button', {
                //     class: 'darkBlueButton',
                //     style:{
                //       background:"#fff",
                //       marginLeft: '8px',
                //       paddingRight:'8px'
                //     },
                //     on:{
                //     click: ()=>{
                //       this.edit(params.row)
                //     }
                //   }
                //   },
                //   [
                //     h('i',{
                //       class:'iconfont icon-qianming'
                //     }),
                //     h('span',{

                //     },'编辑')
                //   ]
                // ),
                // h('Button', {
                //     class: 'yellowButton',
                //     style: {
                //       background:"#fff",
                //       marginLeft: '8px',
                //       marginRight: '8px',
                //     },
                //     on: {
                //       click: () => {
                //         this.deleteModal=true;
                //         this.deleteMesId = params.row.id;
                //       }
                //     },
                //   },[
                //     h('i',{
                //       class:'iconfont icon-qingkong',
                //     }),
                //     h('span',{

                //     },'删除')
                //   ]
                // ),

              ]);
            }
          }
        ],
        sizeValue:[],
        placeOrder:{},
        data: [{}],
        //仓库维护
        //caseWHShow:false,
        caseWHInfoAddShow:false,
        //WaybillWHShow:false,
        clientEditShow:false,
        detailsModalShow:false,
        deleteModal:false,
        //logisticsModalShow:false,
        //rebutModel:false,
        deleteMesId:'',
        detailsModalOldInfoShow:false,
        detailsModalOldInfo:null,
      }
    },
    mounted(){
      this.getData()

    },
    methods: {
      page(){
        this.$refs.pages.pageReset(20,1);
      },
      handleReset(name){
          this.$refs[name].resetFields();
            },
      pageListen(data){
          this.searchData.pageIndex=data.pageIndex;
          this.searchData.pageSize=data.pageSize;
          console.log(this.searchData);
          this.getData();
        },
       //获取数据
      getData(){
       this.$http.get('/customer',{params:this.searchData}).then(res=>{
        //  console.log(res.data)
        this.totals = res.data.total
        this.data = res.data.data
        //console.log(this.totals);
      }).catch(err=>{
        console.log(err)
      })
      },
      //查看
      tableSee(){
          this.$http.get('/customer/detailinfo/'+this.detailId).then(res=>{
            this.detailsModalShow = true;
            this.clientInfo = res.data;
            this.sizeValue = res.data.sizes['1'];
            this.placeOrder = res.data.sizes['3'];
          })
        },
        //查看客户历史尺寸信息
      searchOldSize(){
        this.$http.get('/customer/historysize/'+this.detailId).then(res=>{
          this.detailsModalOldInfoShow = true;
            // console.log(res)
            if(res.data.length === 0){
              this.detailsModalOldInfo = null
            }else{
              this.detailsModalOldInfo = res.data
            }
          })
      },
        //查询
        search(){

          //console.log(this.searchFrom)
          this.$http.get('/customer',{params:this.searchFrom}).then(res=>{
            //console.log(res.data)
            this.data = res.data.data
          })
        },
      pageChange(data){
          this.searchData.pageIndex=data.pageIndex;
          this.searchData.pageSize=data.pageSize;
          this.getData();
        },
        //添加
        handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.$http.post('/customer',this.caseWHInfoAdd).then(res=>{
                        //console.log(res);
                        this.handleReset('caseWHInfoAdd');
                        this.caseWHInfoAddShow=false;
                        this.getData();
                        this.$Message.success('新增成功');
                      }).catch(err=>{
                        console.log(err)
                      })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
           // 修改
           edit(row){
            this.$http.get('/customer/'+row.id).then(res=>{
              this.clientEditShow = true;
              res.data.beginTime = this.setDate(res.data.beginTime)
              res.data.endTime = this.setDate(res.data.endTime)
              this.clientEdit = res.data
          })
           },
           clientEditSubmit (name){
             this.$refs[name].validate((valid) => {
                    if (valid) {
                      // console.log(this.clientEdit)
                      this.$http.put('/customer',this.clientEdit).then(res=>{
                        //console.log(res);
                        this.clientEditShow=false;
                        this.getData();
                      }).catch(err=>{
                        console.log(err)
                      })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
           },
        //删除
        deleteConfirm (){
        this.$http.delete('/customer/'+this.deleteMesId).then(res=>{
          this.deleteModal=false;
          this.getData();
          // console.log(res)
        })
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

    },
  }
</script>
<style lang="scss" scoped>
.delectNopad .ivu-modal-content{
  height:100%!important;
  overflow-y: scroll;
}
.showWay1{
    padding: 15px 15px;
    .ivu-col-span-8{
      border-left: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      height: 30px;
      line-height: 30px;
    }
    .ivu-col-span-8:nth-child(3n){
      border-right: 1px solid #e9eaec !important;
    }
  }
  ////搜索样式
  .searchStyle{
    position: relative;
    input{
      outline: 0;
      border: 0;
      height: 25px;
      line-height: 25px;
      color: #657180;
    }
    .ivu-form-item{
      border: 1px solid #dddee1;
      height:32px;
      width: calc(19.4% - 16px);
      margin-right: 11px !important;
      border-radius: 3px;
      margin-bottom: 16px;
      .ivu-form-item-label{
        line-height: 28px;
        color: #666;
        padding: 0 0 0 16px !important;
        font-weight: 100;
      }
      .ivu-form-item-content{
        line-height: 27px;
        padding-right: 1px;
        .ivu-select{
          text-align: left;
        }
        .ivu-date-picker{
          line-height: 27px;
          .ivu-select-dropdown{
            left:-137px !important
          }
        }
        .ivu-select-placeholder{
          line-height: 25px !important;
        }
        .ivu-select-selection{
          border:0;
          height: 25px !important;
          color:  #657180;
          .ivu-select-selected-value{
            height: 30px !important;
            line-height: 25px !important;
          }
        }
        .ivu-select-visible .ivu-select-selection{
          box-shadow: none;
        }
        .ivu-select-visible{
          .ivu-select-dropdown{
            width: calc(100% + 45px) !important;
            left: -45px !important;
          }
        }
        .ivu-select-single{
          .slide-up-leave-active{
            width: calc(100% + 45px) !important;
            left: -45px !important;
          }
          .slide-up-leave-to{
            width: calc(100% + 45px) !important;
            left: -45px !important;
          }
        }
      }
      .ivu-input-group-prepend{
        background: #fff;
        border: 0;
      }
      .ivu-date-picker{
        float: right;
        .ivu-input-icon{
          line-height: 27px;
        }
      }
    }
    //两行时第二行间距调整
    .specialInterval {
      margin-top: 0px;
    }
    .expressCompany{
      .ivu-form-item-content{
        .ivu-select-visible{
          .ivu-select-dropdown{
            width: calc(100% + 75px) !important;
            left: -75px !important;
          }
        }
        .ivu-select-single{
          .slide-up-leave-active{
            width: calc(100% + 75px) !important;
            left: -75px !important;
          }
          .slide-up-leave-to{
            width: calc(100% + 75px) !important;
            left: -75px !important;
          }
        }
      }
    }
    .createBtn{
      float:right;
      margin-bottom:10px;
      width:10%
    }
    .selectTime{
      width:calc(38.8% - 16px);
      .ivu-date-picker{
        width: 95%;
      }
    }
    .ivu-form-item:hover{
      border-color: #66afe9;
    }
    .ivu-input:focus{
      border-color: #dddee1;
      outline: 0;
      box-shadow: none;
    }

    .specialButton{
      text-align: center;
      font-size: 18px;
      width: 3%;
      border: 1px solid #e9eaec;
      .ivu-form-item-content{
        button{
          width: 100%;

        }
      }
    }
    .technicalDates{
      .ivu-form-item-content{
        .ivu-date-picker{
          .ivu-select-dropdown{
            left:-167px !important
          }
        }
      }
    }
    .otherDates{
      .ivu-form-item-content{
        .ivu-date-picker{
          .ivu-select-dropdown{
            left:-99px !important
          }
        }
      }
    }
    .specialDates{
      .ivu-form-item-content{
        .ivu-date-picker{
          .ivu-select-dropdown{
            left:40px !important
          }
        }
      }
    }
  }

  #tableBox{
    overflow-y: auto;
    border:1px solid #e9eaec;
    .ivu-table-wrapper{
      border:0;
      .ivu-table-stripe::after{
        width: 0;
      }
      .ivu-table-border td{
        border-right: 0;
      }
    }
  }

  ////table表格标题及字体颜色
  .ivu-table-wrapper{
    .ivu-table{
      .ivu-table-header{
        th{
          text-align: center;
          height: 34px;
          border-right: 0px;
        }
        .ivu-table-cell{
          color: #464c5b;
        }
      }
      .ivu-table-tbody{
        .ivu-table-row{
          td{
            //height: 44px;
            height: 37px;
            border-right: 0px;
          }
          .ivu-table-cell{
            color:  #657180;
          }
        }
        .ivu-table-row:hover{
          .blueButton{
            background: #ebf7ff!important;
          }
          .greenButton{
            background: #ebf7ff!important;
          }
          .yellowButton{
            background: #ebf7ff!important;
          }
          .darkBlueButton{
            background: #ebf7ff!important;
          }
        }
      }
    }
  }
  .delivery-wrap .ivu-table-cell,.delivery-wrap th,.delivery-wrap span{
    padding: 0;
    text-align: center;
  }
//   .com-slot-right span i {
//     font-size: 14px;
//     color: #fff;
//     margin-right: 0px;
//     font-weight: 500;
//     display: inline-block;
//     margin-left: 0px;
// }

  //大型弹框870X580全是输入框的样式
  .big-sized{
    input{
      outline: 0;
      border: 0;
      height: 27px;
      line-height: 28px;
      color: #657180;
    }
    .ivu-form-item{
      width: 272px;
      height: 30px;
      border: 1px solid #eee;
      margin-bottom: 10px;
      margin-right: 4px;
      label{
        padding-left: 10px!important;
        color: #9ea7b4;
        text-align: left;
        line-height: 8px;
      }
      .ivu-select{
        vertical-align: top;
        color: #657180;
        .ivu-select-selection{
          outline: 0;
          border: 0;
          height: 28px;
          line-height: 28px;
          color: #657180;
        }
      }
      .ivu-input-wrapper{
        vertical-align: top;
      }
    }
    .ivu-form-item:hover{
      border-color: #44bfb7;
    }
    .ivu-input:focus{
      border-color: #dddee1;
      outline: 0;
      box-shadow: none;
    }
    .ivu-form-item-error{
      border-color: #f00;
      .ivu-input{
        border: 0;
      }
    }
    .ivu-select-visible .ivu-select-selection{
      outline: 0;
      box-shadow: none;
      border: 0;
    }
    .ivu-modal-body{
      padding: 30px 10px !important;
      border-bottom: 1px solid #e1e1e1;
    }
    .ivu-form-item-error-tip{
      padding: 10px;
      background: rgba(255,120,105,0.8);
      left: 202px;
      color: #fff;
      top: -3px;
      display: inline-block;
      white-space: nowrap;
      z-index: 1;
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
  }

  //中型弹窗宽度480全是输入框的样式
  .entrepot{
    input{
      outline: 0;
      border: 0;
      height: 27px;
      line-height: 28px;
      color: #657180;
    }
    .ivu-form-item{
      width: 306px;
      height: 30px;
      border: 1px solid #eee;
      margin-bottom: 10px;
      label{
        padding-left: 10px!important;
        color: #9ea7b4;
        line-height: 8px;
      }
      .ivu-select{
        vertical-align: top;
        color: #657180;
        .ivu-select-selection{
          outline: 0;
          border: 0;
          height: 28px;
          line-height: 28px;
          color: #657180;
        }
      }
      .ivu-input-wrapper{
        vertical-align: top;
      }
    }
    .ivu-form-item:hover{
      border-color: #44bfb7;
    }
    .ivu-input:focus{
      border-color: #dddee1;
      outline: 0;
      box-shadow: none;
    }
    .ivu-form-item-error{
      border-color: #f00;
      .ivu-input{
        border: 0;
      }
    }
    .ivu-select-visible .ivu-select-selection{
      outline: 0;
      box-shadow: none;
      border: 0;
    }
    .ivu-modal-body{
      padding: 0 !important;
      .ivu-form{
        padding: 30px 80px;
        border-bottom: 1px solid #e1e1e1;
      }
    }
  }

  /*必填星号*/
  .ivu-modal-wrap{
    .ivu-form-item-required{
      .ivu-form-item-label:before{
        content:'';
      }
      .ivu-form-item-content:after{
        content:'*';
        font-size: 12px;
        font-family: SimSun;
        color: #f30;
        position: absolute;
        top:-3px;
      }
      .ivu-form-item-content{
        .ivu-input-wrapper, .ivu-input-type{
          width:90%;
        }
        .ivu-select{
          width: 90%;
        }
        .ivu-date-picker{
          vertical-align: top;
          width: 90%;
          .ivu-date-picker-editor{
            width:100%;
          }
        }
      }
    }
    .ivu-form-item{
      .ivu-input-wrapper{
        width: 90%;
      }
    }
  }
  //浅蓝色按钮
  table .blueButton{
    padding: 0;
    border: 0;
    position: relative;
    margin-right: 8px;
    span{
      font-size: 12px;
      line-height: 14px;
      color: #00b6f1;
    }
    i{
      margin-right: 5px;
      color: #00b6f1;
      font-size: 12px;
    }
  }
  table .blueButton::after{
    position: absolute;
    content: '';
    width: 1px;
    height:14px;
    background: #ccc;
    right: -8px;
    top: 2px;
  }
  //绿色按钮
  table .greenButton{
    padding: 0;
    border: 0;
    margin-right: 8px;
    span{
      font-size: 12px;
      line-height: 14px;
      color: #43bfb7;
    }
    i{
      margin-right: 5px;
      color: #43bfb7;
      font-size: 12px;
    }
  }

  table .yellowButton::before{
    position: absolute;
    content: '';
    width: 1px;
    height:14px;
    background: #ccc;
    left: -8px;
    top: 2px;
    display: inline-block;
    opacity: 1;
  }
  //深蓝色按钮
  table .darkBlueButton{
    padding: 0;
    border: 0;
    position: relative;
    span{
      font-size: 12px;
      line-height: 14px;
      color: #06c;
    }
    i{
      margin-right: 5px;
      color: #06c;
      font-size: 12px;
    }
  }
  table .darkBlueButton::before{
    position: absolute;
    content: '';
    width: 1px;
    height:14px;
    background: #ccc;
    left: -8px;
    top: 2px;
    display: inline-block;
    opacity: 1;
  }

  /*详情中标题样式*/
  .modalContent h4{
    margin-top: 10px;
    height: 38px;
    font-size: 12px;
    color: #464c5b;
    line-height: 38px;
    text-align: left;
    /*background:-webkit-gradient(linear, 0 0, 0 100%, from(#fbfbfb), to(#f5f5f5));*/
    padding: 0 30px;
    /*border: 1px solid #e5eaee;*/
    background: #f9f9f9;
    position: relative;
    .shade{
      padding: 7px 8px;
      border-radius: 15px;
    }
    .T3:hover>.shade{
      background: #F4EEE5;
    }
    .T3{
      cursor: pointer;
      text-decoration: none;
      font-size: 12px;
      display: inline-block;
      margin-right: 10px;
      font-weight: 100;
      margin: 0;
    }
    .T3 span,.com-slot-right span{
      //margin-right: 10px;
    }
    span i{
      font-size:14px;
      color: #fff;
      margin-right: 0px;
      font-weight: 500;
      display: inline-block;
    }
  }
  .modalContent h4:before{
    content: '';
    width: 3px;
    height: 15px;
    position: absolute;
    left: 20px;
    background: #005c7a;
    top:11px;
  }
  /*详情中信息栏*/
  .ivu-modal-content .ivu-modal-body{
    padding: 0;
  }
  .basicForm .ivu-col-span-6{
    height: 50px !important;
  }
  .detailRow .ivu-select-selected-value ,.detailRow .ivu-select-placeholder{
    text-align: left;
  }
  .detailRow .ivu-select .ivu-select-dropdown{
    top:34px !important;
  }
  .detailRow .deliverySpan{
    color: #657180;
    font-weight: 200;
  }
  .detailRow table{
    width:100% !important;
  }
  .modalContent .detailRow .ivu-table-cell,.modalContent .detailRow th,.detailRow span{
    text-align: center;
  }
  .detailRow td{
    height: 35px;
  }
  .detailRow .ivu-col-span-8{
    height: 35px;
  }
  .detailRow .ivu-col-span-24{
    height: 28px;
  }
  .detailRow .ivu-form-item{
    width: 100%;
  }
  .detailRow label{
    color: #9ea7b4 !important;
    font-weight: 200 !important;
    margin-left: 15px;
  }
  .delectNopad {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    z-index: 2000;
    border-radius: 5px;
    span{
      font-size:12px;
    }
    .ivu-modal{
      top:0;
      .ivu-modal-content{
        // height: 300px !important;
        overflow-y: auto;
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
  form {
    padding: 15px 15px 0px;

  }
  //物流详情弹框中的输入框样式
  .goodsRow{
    input{
      outline: 0;
      border: 0;
      height: 27px;
      line-height: 28px;
      color: #657180;
    }
    .ivu-form-item{
      width: 272px;
      height: 30px;
      border: 1px solid #eee;
      margin-bottom: 10px;
      label{
        padding-left: 10px!important;
        color: #9ea7b4;
        line-height: 8px;
      }
      .ivu-select{
        vertical-align: top;
        color: #657180;
        .ivu-select-selection{
          outline: 0;
          border: 0;
          height: 28px;
          line-height: 28px;
          color: #657180;
        }
      }
      .ivu-input-wrapper{
        vertical-align: top;
      }
      .ivu-tooltip{
        .ivu-tooltip-popper{
          left: 818px !important;
          .ivu-tooltip-content{
            .ivu-tooltip-inner{
              background: #f2d133;
            }
          }
        }
      }
      .ivu-form-item-content{
        line-height: 27px;
      }
    }
    .ivu-form-item:hover{
      border-color: #66afe9;
    }
    .ivu-input:focus{
      border-color: #dddee1;
      outline: 0;
      box-shadow: none;
    }
    .ivu-form-item-error{
      border-color: #f00;
      .ivu-input{
        border: 0;
      }
    }
    .ivu-select-visible .ivu-select-selection{
      outline: 0;
      box-shadow: none;
      border: 0;
    }
    .ivu-input[disabled], fieldset[disabled] .ivu-input{
      color: #657180;
    }
    .ivu-tooltip-popper[x-placement^=right] .ivu-tooltip-arrow{
      border-right-color: #f2d133;
    }
    .ivu-form-item-error-tip{
      padding: 10px;
      background: rgba(255,120,105,0.8);
      left: 202px;
      color: #fff;
      top: -3px;
      display: inline-block;
      white-space: nowrap;
      z-index: 1;
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
  }
  .ivu-form-inline .ivu-form-item{
    margin-right: 5px;
  }
  .timeInput{
    input{
      padding: 0;
      margin-top:-10px;
      height: 10px;
    }
    .ivu-input-icon{
      top:-10px
    }
  }
.ivu-modal .timeInput{
  position: relative;
  top: -9px !important;
}
</style>

