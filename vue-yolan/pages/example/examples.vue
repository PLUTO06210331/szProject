<template>
    <div class="cashier-warp">
      <div class="leftModel l">
        <div class="leftFirst">
          <div class="flux1">
            <div class="flux1_header">
              <div class="l">
                <p>收银单号：&nbsp;<span>{{cashierOrderCode}}</span></p>
              </div>
              <div class="r ">
                <p class="l">收款类型:</p>
                <div class="r receivables_type">
                  <RadioGroup v-model="priceType" type="button" class="receivables_type r " @on-change='receiveTypeRadio'>
                      <Radio :label="index" v-for="(item,index) in receiveType" :key="index" :disabled="item.name=='尾款'">{{item.name}}</Radio>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div class="flux1_body">
              <Form ref="formItem" :model="formItem" :label-width="80" class="flux1_form">
                <Form-item label="总订单编号" class="l flux1_lable">
                    <Input v-model="orderCode" placeholder="总订单编号" disabled class="input_length"></Input>
                    <Button v-if="searchord" icon="search" @click="search" class="searchTel"></Button>
                </Form-item>
                <Form-item label="客户手机号：" class="l flux1_lable">
                    <Input v-model="formItem.tel" placeholder="客户手机号" disabled class="input_length"></Input>
                    <Button v-if="searchord" icon="search" @click="search" class="searchTel"></Button>
                </Form-item>
                <FormItem label="客户姓名:" class="r flux1_lable">
                    <Input v-model="formItem.name" placeholder="客户姓名" disabled class="input_length"></Input>
                </FormItem>
                <FormItem label="店员:" class="l flux1_lable">
                    <Select v-model="checkID" class="input_length">
                        <Option :value="item.id" v-for="(item,index) in staffData"  :key="index">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="客户身高：" class="r flux1_lable height_cm">
                    <Input v-model="formItem.height" placeholder="客户身高" disabled class="input_length">
                    </Input>
                    <span>cm</span>
                </FormItem>
                <FormItem label="客户体重:" class="r flux1_lable height_cm">
                    <Input v-model="formItem.weight" placeholder="客户体重" disabled class="input_length"></Input>
                    <span>kg</span>
                </FormItem>
              </Form>
            </div>
          </div>
          <div style="clear: both"></div>
          <div class="flux2">
            <Table :columns="columns" :data='data' style="border:0" height='460'></Table>
            <div class="add" @click="AddShow">
                <img src="../../assets/images/add.png" alt="" class="l">
                <p class="l" style="display:block;margin-left:5px;color:#43bfb7">添加订单</p>
            </div>
            <div class="sumPrice">
              <p>商品数量：<span class="sumPrice1">{{data.length}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本页小计：<span class="sumPrice2">￥{{priceSumData}}</span></p>
            </div>
          </div>
        </div>
      </div>
      <!-- 添加订单弹窗 -->
      <div v-if="AddOrderShow">
        <Modal v-model="AddOrderShow" class-name="delectNopad CashierModalStyle" :mask-closable=false width="870" v-drag>
          <p slot="header">
            <span class="main-heading">添加订单</span>
          </p>
          <div class="searchOrder">
            <!--<AutoComplete v-model="autoValue" :data="autoData" :filter-method="insertOrder"  placeholder="input here" style="width:200px;margin-left:10px"></AutoComplete>-->
            <Select
              style="width:200px;margin-left:10px"
              v-model="autoValue"
              filterable
              remote
              :remote-method="insertOrder"
              @on-change="InsertTable"
              :loading="searchLoading">
              <Option v-for="(option, index) in autoData" :value="JSON.stringify(option)" :key="index">{{option.code}}:{{option.name}}</Option>
            </Select>
          </div>
          <div class="modalBody maintenance" style="height: 400px;overflow-y: auto">
            <Table stripe border :columns="OrderTable" :data="OrderInfo"></Table>
          </div>
          <p slot="footer">
            <Button @click="AddOrderShow=false">关闭</Button>
            <Button @click="addGoods">确定</Button>
          </p>
        </Modal>
      </div>
      <!-- <div v-if="AddOrderShow">
        <Modal v-model="AddOrderShow" class-name="delectNopad CashierModalStyle" :mask-closable=false width="870" v-drag>
          <p slot="header">
            <span class="main-heading">添加订单</span>
          </p>
          <div class="searchOrder">
            <AutoComplete v-model="autoValue" :data="autoData"  placeholder="input here" style="width:200px;margin-left:10px"></AutoComplete>
          </div>
          <div class="modalBody maintenance">
            <Table stripe border :columns="OrderTable" :data="OrderInfo"></Table>
          </div>
        </Modal>
      </div> -->
      <div class="rightModel l">
        <div class="flux1">
          <Form ref="kuCard" :model='kuCard' label-position="left" :label-width="80" :rules="numRlue" class="flux1_form">
            <FormItem label="酷卡:">
                <Input v-model="kuCard.full" class="input_length"></Input>
            </FormItem>
            <FormItem label="优惠券:">
              <Row>
              <Col span="12" style="margin-top:-9px;margin-bottom:4px;margin-left: -19px;">
                  <!-- <Select
                      ref="select"
                      v-model="model13"
                      filterable
                      remote clearable
                      :remote-method="remoteMethod1"
                      :loading="loading1">
                      <Option v-for="(option, index) in options1" :value="option.id" :key="index">{{option.label}}</Option>
                  </Select> -->
                <Select v-model="model13" filterable>
                  <Option v-for="item in options1" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </Col>
              </Row>
            </FormItem>

            <FormItem prop="discount" label="折扣:">
                <Input v-model="kuCard.discount" class="input_length"></Input>
            </FormItem>
            <FormItem label="备注:">
                <Input v-model="kuCard.remark" class="input_length"></Input>
            </FormItem>
          </Form>
        </div>
        <div class="flux2">
          <div class="flux2_header">
              <ul>
              <li class="l">
                <p>￥{{priceSumData}}</p>
                <p>商品总额</p>
              </li>
              <li class="l">
                <p>￥{{discount}}</p>
                <p>优惠总额</p>
              </li>
              <li class="l">
                <p>￥{{(sum - amountpaid).toFixed(2)}}</p>
                <p>应收总额</p>
              </li>
            </ul>
          </div>
          <div class="flux2_body">
              <p>实收金额：&nbsp;<span>￥{{zhifu.xjprice !=='' && zhifu.wxprice !=='' && zhifu.posprice !=='' && zhifu.zfbprice !==''?
                (zhifu.xjprice + zhifu.wxprice + zhifu.posprice + zhifu.zfbprice).toFixed(2):0}}</span></p>
              <p><i v-if="zhifu.xjprice===0?false:true">现金付款：<span>￥{{zhifu.xjprice}}</span></i>
              <i v-if="zhifu.wxprice===0?false:true">微信付款：<span>￥{{zhifu.wxprice}}</span></i>
              <i v-if="zhifu.posprice===0?false:true">pos付款：<span>￥{{zhifu.posprice}}</span></i>
              <i v-if="zhifu.zfbprice===0?false:true">支付宝付款：<span>￥{{zhifu.zfbprice}}</span></i></p>
          </div>
        </div>
        <div class="flux3">
          <div class="flux_l l">
            <Form ref="zhifu" :model="zhifu" label-position="left" :rules="numRlue" :label-width="60" class="flux3_form">
            <FormItem prop='xjprice' label="现金:">
                <InputNumber :min='0' v-model.number="zhifu.xjprice" :disabled="!xjchecked" @on-change="beyondFlag" class="input_length"></InputNumber>
            </FormItem>
            <FormItem prop='wxprice' label="微信:">
                <InputNumber :min='0' v-model.number="zhifu.wxprice" :disabled="!wxchecked" @on-change="beyondFlag" class="input_length"></InputNumber>
            </FormItem>
            <FormItem prop='posprice' label="pos:">
                <InputNumber :min='0' v-model.number="zhifu.posprice" :disabled="!poschecked" @on-change="beyondFlag" class="input_length"></InputNumber>
            </FormItem>
            <FormItem prop='zfbprice' label="支付宝:">
                <InputNumber :min='0' v-model.number="zhifu.zfbprice" :disabled="!zfbchecked" @on-change="beyondFlag" class="input_length"></InputNumber>
            </FormItem>
            <FormItem label="支付总额:">
              <p>￥{{payAll}}</p>
            </FormItem>
            <FormItem label="剩余未付:">
                <p>￥{{(sum-payAll).toFixed(2)}}</p>
            </FormItem>
            <p v-if="beyond" style="color: #ed3f14">结算金额不相符</p>
          </Form>
          </div>
          <div class="flux_r l">
              <div class="XJ" @click="XJBtn">
                <img v-if="xjchecked" src="../../assets/images/xjSelected.png" alt="">
                <img v-else src="../../assets/images/xj.png" alt="">
              </div>
              <div class="WX" @click="WXBtn">
                  <img v-if="wxchecked" src="../../assets/images/wxSelected.png" alt="">
                  <img v-else src="../../assets/images/wx.png" alt="">
              </div>
              <div class="POS" @click="POSBtn">
                <img v-if="poschecked" src="../../assets/images/POSSelected.png" alt="">
                <img v-else src="../../assets/images/pos.png" alt="">
              </div>
              <div class="ZFB" @click="ZFBBtn">
                <img v-if="zfbchecked" src="../../assets/images/zfbSelected.png" alt="">
                <img v-else src="../../assets/images/zfb.png" alt="">
              </div>
              <Button type="primary" class="JS" :loading="ZFloading" @click="JSBTn('zhifu')" >
                <img v-if="!ZFloading" src="../../assets/images/print.png" alt="">
                <p v-if="!ZFloading">结算打印</p>
                <P v-if="ZFloading">结算中...</P>
              </Button>
          </div>
          <!--客户订单弹窗 -->
          <div v-if="JSBTN">
            <Modal v-model="JSBTN" class-name="delectNopad CashierModalStyle" :mask-closable=false width="900" v-drag>
              <p slot="header">
                <span class="main-heading">选择需要添加付款的订单</span>
              </p>
              <div class="searchOrder">
                <Form ref="formItem" :model="formItem" :label-width="90" class="flux1_form" inline>
                  <span>客户手机号：</span>
                  <Input v-model="formItem.tel" placeholder="客户手机号" class="" style="width:200px;"></Input>
                  <span>客户姓名：</span>
                  <Input v-model="formItem.name" placeholder="客户姓名" disabled class="" style="width:200px;"></Input>
                </Form>
              </div>
              <div class="modalBody maintenance" style="height:350px;overflow:auto">
                <Table stripe border ref="selection" :columns="JSTable" :data="OrderInfoA" ></Table>
              </div>
              <p class="all" style="font-size=8px;">（共选择了<span>&nbsp;</span>个订单，总金额<span style="font-size:8px;">&nbsp;&nbsp;</span>）</p>
            </Modal>
          </div>
        </div>
      </div>
    <!--撤销订单-->
    <div v-if="chexiao1">
      <Modal v-model="chexiao1" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认撤销此订单？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="chexiao1Sure">确认</Button>
            <Button  class="clear" @click="chexiao1=false">取消</Button>
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
  data() {
    const discount = (rule, value, callback) => {
        if (value === "" || value === null) {
          this.kuCard.discount = 1
          callback(new Error('请输入折扣信息'));
        } else {
          if (value < 0 || value > 1) {
            callback(new Error('0到1之间的数字'));
          } else if (!/^(\-)?\d+(\.\d{1,2})?$/.test(value)) {
            callback(new Error('0到1之间的数字'));
          }else if (value.length >= 5) {
            callback(new Error('最多输入5位'));
          } else {
            callback();
          }
        }
      };
      const wxprice = (rule, value, callback) => {
        let a = this.zhifu.xjprice != ''?this.zhifu.xjprice:0
        let b = this.zhifu.wxprice != ''?this.zhifu.wxprice:0
        let c = this.zhifu.posprice != ''?this.zhifu.posprice:0
        let d = this.zhifu.zfbprice != ''?this.zhifu.zfbprice:0
        if (value === "" || value === null) {
          callback(new Error('最小金额为0'));
        } else {
         if (!/^\d{0,8}\.{0,1}(\d{1,2})?$/.test(value)) {
            callback(new Error('金额格式错误'));
          } else {
            callback();
          }
        }
      };
    return {
      websock:null,
      model13: '',
      loading1: false,
      options1: [],
      model14: [],
      beyond:false, //超出金额
      ZFloading:false,  //结算中
      payWayArr:[],  //支付方式
      payWayIndex:0,
      loading2: false,
      options2: [],

      formItem: {
        name:'',
        tel:'',
      },
      checkID:'',
      numRlue:{
          discount:[
            { required: true,validator:discount, trigger: 'change' },
          ],
           wxprice:[
            { required: true,validator:wxprice, trigger: 'change' },
          ],
           zfbprice:[
            { required: true,validator:wxprice, trigger: 'change' },
          ],
           xjprice:[
            { required: true,validator:wxprice, trigger: 'change' },
          ],
           posprice:[
            { required: true,validator:wxprice, trigger: 'change' },
          ],
      },
      technologyLoading:false,
      couponList:[],
      paymentType:[],
      couponSelect:[],
      CouponTel:null,
      couponid:0,
      orderCode:'',//总单编号
      cashierOrderCodeId:0, //收银单号id
      priceSumData:0,     //商品总额
      discouneData:0,     //优惠总额
      priceSumNum:0,    //应收总额
      payAllData:0,   //支付总额
      payRestData:0,   //剩余未付
      staffData:[],
      receiveTypeData:3,
      kuCard:{
        discount:1,
      },
      receiveType:[],
      priceType:0,
      cashierOrderCode:'',
      xjchecked:false,
      wxchecked:false,
      poschecked:false,
      zfbchecked:false,
      AddOrderShow:false,
      searchord:false,
      JSBTN:false,
      searchLoading:false,
      OrderInfo:[{}],
      autoValue: '',
      autoData: [],
      jsData:{
        discount:'',
        cashierOrderCode:'',
        amount:0,
        type:'3',
        payments: {
          11:'',
          12:'',
          13:'',
          14:''
      },
      staffname:''
      },
      zhifu:{
      paymentType:[],
      xjprice:0,
      wxprice:0,
      zfbprice:0,
      posprice:0,
      },
      OrderInfoA:[
        {
        number:'QCK17120106',
        pruduct:'新款羊绒上衣',
        mnumber:'SAA140',
        type:'机器工艺',
        length:'25.4',
        priceA:523.12,
        zhekou:'8.0',
        youhui:-23,
        num:1,
        price:500.12
      },
      ],
      JSTable:[
          {
            title: '序号',
            width:'5%',
            type:'selection',
            align: 'center',
          },
          {
            title: '序号',
            width:'5%',
            type:'index',
            align: 'center',
          },
          {
            title: '分销单号',
            width:'11%',
            key: 'mtmordenid',
            align: 'center',
          },
          {
            title: '产品',
            width:'12%',
            key: 'pruduct',
            align: 'center',
          },
          {
            title: '面料编号',
            width:'9%',
            key: 'fabriccode',
            align: 'center',
          },
          // {
          //   title: '衬类型',
          //   width:'9%',
          //   key: 'type',
          //   align: 'center',
          // },
          {
            title: '面料库存',
            width:'9%',
            key: 'stock',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{
                  verticalAlign: 'middle',
                  color:'#81db6c',
                  fontFamily:'DIN'
                },
                props: {
                  content:params.row.stock,
                  placement: "bottom",

                }
              },
              [
                h('span',params.row.stock)
              ]);
            }
          },
          {
            title: '零售价',
            width:'8%',
            key: 'price',
            align: 'center',
          },
          {
            title: '折扣',
            width:'8%',
            key: 'discount',
            align: 'center',
          },
          {
            title: '优惠金额',
            width:'9%',
            key: 'youhui',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{
                  verticalAlign: 'middle',
                  //fontWeight:'bold',
                  color:'#43bfb7',
                  fontFamily:'DIN'
                },
                props: {
                  content:params.row.youhui,
                  placement: "bottom",

                }
              },
              [
                h('span',params.row.youhui)
              ]);
            }
          },
          {
            title: '数量',
            width:'7%',
            key: 'amount',
            align: 'center',
          },
          {
            title: '应收金额',
            width:'9%',
            key: 'price',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{
                  verticalAlign: 'middle',
                  //fontWeight:'bold',
                  color:'#ff7d41',
                  fontFamily:'DIN'
                },
                props: {
                  content:params.row.price === ""?0:params.row.price,
                  placement: "bottom",

                }
              }, [
                h('span',
                  {

                  }, [
                    h("span", params.row.price === ""?0:params.row.price)
                  ])
              ]);
            }
          },
      ],
      //订单table
      OrderTable:[
          {
            title: '序号',
            width:'10%',
            type:'index',
            align: 'center',
          },
          {
            title: '编码',
            width:'30%',
            key: 'code',
            align: 'center',
          },
          {
            title: '名称',
            width:'20%',
            key: 'name',
            align: 'center',
          },
          {
            title: '价格',
            width:'20%',
            key: 'price',
            align: 'center',
          },
          {
            title: '操作',
            width:'10%',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  class:'shanChu',
                  on: {
                    click: () => {
                      this.deleteGoods(params.index)
                    }
                  }
                }, '取消'),
              ]);
            }
          },
//          {
//            title: '产品',
//            width:'30%',
//            key: 'membername',
//            align: 'center',
//          },
//          {
//            title: '零售价',
//            width:'10%',
//            key: 'price_',
//            align: 'center',
//
//          },
//          {
//            title: '折扣',
//            width:'15%',
//            key: 'zhekou',
//            align: 'center',
//          },
//          {
//            title: '优惠金额',
//            width:'15%',
//            key: 'express',
//            align: 'center',
//          },
//          {
//            title: '数量',
//            width:'10%',
//            key: 'num',
//            align: 'center',
//          },
//          {
//            title: '应收金额',
//            width:'10%',
//            key: 'price',
//            align: 'center',
//          },
        ],
      data:[],
      //页面table
      columns: [
          {
            title: '序号',
            width:'5%',
            type:'index',
            align: 'center',
          },
          {
            title: '分销单号',
            width:'12%',
            key: 'ordenid',
            align: 'center',
          },
          {
            title: '产品',
            width:'12%',
            key: 'name',
            align: 'center',
          },
          {
            title: '面料编号',
            width:'11%',
            key: 'fabriccode',
            align: 'center',
          },
          // {
          //   title: '衬类型',
          //   width:'9%',
          //   key: 'liningtype',
          //   align: 'center',
          // },
          {
            title: '面料库存',
            width:'9%',
            key: 'stock',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{
                  verticalAlign: 'middle',
                  //fontWeight:'bold',
                  color:'#81db6c',
                  fontFamily:'DIN'
                },
                props: {
                  content:params.row.stock,
                  placement: "bottom",

                }
              },
              [
                h('span',params.row.stock)
              ]);
            }
          },
          {
            title: '零售价',
            width:'8%',
            key: 'price',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{
                  verticalAlign: 'middle',
                  fontWeight:'500',
                  color:'#444',
                  fontFamily:'DIN'
                },
                props: {
                  content:params.row.isMateriel?(params.row.price/params.row.amount).toFixed(1):params.row.price,
                  placement: "bottom",

                }
              }, [
                h('span',
                  {

                  }, [
                    h("span",{
                      domProps:{
                        innerHTML:params.row.isMateriel?(params.row.price/params.row.amount).toFixed(1):params.row.price
                      }
                    })
                  ]
                  )
              ]);
            }
          },
          {
            title: '折扣',
            width:'8%',
            key: 'zhekou',
            align: 'center',
          },
          {
            title: '优惠金额',
            width:'9%',
            key: 'youhui',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{
                  verticalAlign: 'middle',
                  fontWeight:'bold',
                  color:'#43bfb7',
                  fontFamily:'DIN'
                },
                props: {
                  content:params.row.youhui,
                  placement: "bottom",

                }
              },
              [
                h('span',params.row.youhui)
              ]);
            }
          },
          {
            title: '数量',
            width:'7%',
            key: 'amount',
            align: 'center',
            render:(h,params) => {
              return h('div',{
                style:{
                  marginTop:'5px',
                }
              },[
                h('span',{
                  style:{
                    display:params.row.isMateriel ?'block':'none'
                  }
                },params.row.amount),
                h('InputNumber',{
                  props:{
                    min:1,
                    value:params.row.amount,
                    size:'small',
                    step:1
                  },
                  style:{
                    margin:'0 auto',
                    width:'45px',
                    display:params.row.isMateriel ?'none':'block'
                  },
                  on:{
                    'on-change':(val)=>{
                     this.orderTotal = 0;
                      params.row.amount = val;
                      params.row.realPrice = (params.row.price*params.row.amount).toFixed(2);
                      this.$nextTick(()=>{
                          this.data[params.index] = params.row;
                          this.data.map(item=>{
                            this.orderTotal += item.amount;
                          })
                          this.pagePrice();
                      })
                    }
                  },
                })
              ])
            }
          },
          {
            title: '应收金额',
            width:'10%',
            key: 'price',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{
                  verticalAlign: 'middle',
                  fontWeight:'bold',
                  color:'#ff7d41',
                  fontFamily:'DIN'
                },
                props: {
                  content:params.row.realPrice = ''?0:params.row.realPrice,
                  placement: "bottom",

                }
              }, [
                h('span',
                  {

                  }, [
                    h("span",params.row.realPrice = ''?0:params.row.realPrice)
                  ])
              ]);
            }
          },
          {
            title: '操作',
            width:'8%',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  class:'shanChu',
                  style:{
                    display:this.priceType==2 || params.row.isMateriel ?'none':'block'
                  },
                  on: {
                    click: () => {
                      this.cancelOrder(params.index)
                    }
                  }
                }, '取消'),
              ]);
            }
          },
        ],
        sum:null,
        chexiaoIndex:'',
        chexiao1:false,
        amountpaid:0
    };
  },
  computed: {
    discount: function () {
      if(this.kuCard.discount===0 ||this.kuCard.discount===''){
        return this.discouneData
      }else{
        this.discouneData = (this.priceSumData-this.priceSumData * this.kuCard.discount).toFixed(2)
      }
      return this.discouneData
    },
    // sum: function () {
    //   this.priceSumNum = (this.priceSumData - this.discouneData).toFixed(2)
    //   return this.priceSumNum
    // },
    payAll:function(){
      let a = this.zhifu.xjprice != ''?this.zhifu.xjprice:0
      let b = this.zhifu.wxprice != ''?this.zhifu.wxprice:0
      let c = this.zhifu.posprice != ''?this.zhifu.posprice:0
      let d = this.zhifu.zfbprice != ''?this.zhifu.zfbprice:0
      this.payAllData = (a+b+c+d).toFixed(2)
      return this.payAllData
      // this.priceSumNum?this.priceSumNum :this.payAllData
    }
  },
  watch:{
    ['kuCard.discount'](val){
        this.model13 = '';
        this.discouneData = (this.priceSumData-this.priceSumData * this.kuCard.discount).toFixed(2);
        this.pagePrice();
      }
  },
  mounted(){
    this.initWebSocket() //初始化初始化websocket
    this.Coupon();
    let tableID = JSON.parse(sessionStorage.getItem('tableID'));
    if(tableID.staffid){
      this.checkID = tableID.staffid;
    }
    },
  beforeDestroy(){
    this.websock.close()
  },

  methods:{
  threadPoxi(data){  // 实际调用的方法
      console.log(data)
      var agentData=''
        if(data.way.indexOf('pos')>=0){
          agentData = '0100'+this.toPos(data.pay)+"000000"+"00000000"+"000000000000";
        }else{
          agentData = '0200'+this.toPos(data.pay)+"000000"+"00000000"+"000000000000";
          console.log(agentData);
        }
      //若是ws开启状态
      if (this.websock.readyState === this.websock.OPEN) {
        console.log(OPEN)
          this.websocketsend(agentData)
      }
      // 若是 正在开启状态，则等待300毫秒
      else if (this.websock.readyState === this.websock.CONNECTING) {
          console.log('CONNENTING');
          let that = this;//保存当前对象this
          setTimeout(function () {
              that.websocketsend(agentData)
          }, 300);
      }
      // 若未开启 ，则等待500毫秒
      else {
          console.log('WAIT');
          this.initWebSocket();
          let that = this;//保存当前对象this
          setTimeout(function () {
              that.websocketsend(agentData)
          }, 500);
      }
  },
  initWebSocket(){ //初始化websocket
      //ws地址
      const wsuri = 'ws://127.0.0.1:1818';
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
  },
  websocketonmessage(e){ //数据接收
      // const redata = JSON.parse(e.data);
      console.log(e)
      // if(e.data.indexOf('银行')>=0){
      //   let card = e.data.split(' ')[0].split('银行')[1];
      //   this.jsData.card = card;
      // }
      if(e.data.indexOf('交易成功')!==-1){
          this.payWayIndex++;
          if(this.payWayIndex==this.payWayArr.length){
            this.$http.post('/cashier/settlement',this.jsData).then(res=> {
              sessionStorage.setItem('data',JSON.stringify(this.jsData))
              this.ZFloading=false
              this.$router.push('/print')
            })

          }else {
            this.websock.close()
            this.threadPoxi(this.payWayArr[this.payWayIndex])
          }
        }else{
          this.websock.close()
          this.$Message.error(this.payWayArr[this.payWayIndex].way+'支付失败,请重新支付')
          this.threadPoxi(this.payWayArr[this.payWayIndex])
        }
  },
  websocketsend(agentData){//数据发送
      this.websock.send(agentData);
  },
  websocketclose(e){  //关闭
      console.log("服务已关闭");
  },

    // //test优惠券名称查询
    // remoteMethod1 (query) {
    //             if (query !== '') {
    //                 this.loading1 = true;
    //                 setTimeout(() => {
    //                     this.loading1 = false;
    //                     const list = this.couponList.map(item => {
    //                         return {
    //                             value: item.name,
    //                             label: item.name,
    //                             id: item.id,
    //                         };
    //                     });
    //                     this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
    //                     console.log(this.options1)
    //                 }, 200);
    //             } else {
    //                 this.options1 = [];
    //             }
    //         },


    //手机号查订单
    search(){
      this.JSBTN=true
      this.$http.get('/cashier/orders/'+this.formItem.tel).then(res=>{
         console.log(res.data)
        this.OrderInfoA = res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    PrefixInteger(num, n) {
      num=parseFloat(num).toFixed(2).replace(".","");

      var i = (num + "").length;
      while(i++ < n) num = "0" + num;
      return num;
    },
    //表格删除订单
      cancelOrder(index){
        if(this.receiveTypeData==5){
          this.$Message.error('尾款支付不可操作')
        }else{
          this.chexiaoIndex=index;
          this.chexiao1=true
        }
      },
      chexiao1Sure(){
        this.orderTotal = 0;
        let order = this.data.splice(this.chexiaoIndex, 1);
        this.data.map(item=>{
          this.orderTotal += item.amount;
        })
        this.$Message.destroy()
        this.$Message.success('取消订单成功')
        this.chexiao1=false
        this.chexiao2=false
        this.pagePrice()
      },
    //客户信息
    Coupon(){
      let arr =  sessionStorage.getItem('tableID')
      let data = JSON.parse(arr);
      if(data != null){
        console.log(data)
        this.amountpaid = data.amountpaid;
        this.formItem = data.customer;
        this.data = data.orders;
        this.data.map(item=>{
          this.$set(item,'realPrice',item.price);
          this.$set(item,'isMateriel',true);
        })
      if(data.discount){
        this.kuCard.discount = data.discount;
      }
      if(data.type){
        this.priceType = data.type - 3;
      }
        this.cashierOrderCode = data.cashierOrderCode
        this.cashierOrderCodeId = data.id
        this.orderCode = data.orderCode  //总单编号
        //优惠券列表
        this.$http.get('/cashier/coupon/'+this.formItem.tel).then(res=>{
                console.log(res.data)
                this.options1 = res.data
                // for(let i = 0;i<res.data.length;i++){
                //   this.couponList.push(
                //     {
                //       name:res.data[i].name,
                //       id:res.data[i].id
                //     }
                //     )
                // }
              })
        //查询收款类型
        this.$http.get('/cashier/receiveType').then(res=>{
          //console.log(res.data)
          this.receiveType = res.data
        }).catch(err=>{
          console.log(err)
        })
        //查店员
        this.$http.get('/cashier/staff').then(res=>{
          console.log(res.data)
          this.staffData = res.data
        }).catch(err=>{
          console.log(err)
        })
        this.pagePrice()
        // this.priceSum()
        //获取支付方式
        this.$http.get('/cashier/payment').then(res=>{
          this.zhifu.paymentType = res.data
        }).catch(err=>{
          console.log(err)
        })
      }
      },


      //计算按钮组
      XJBtn(){
        this.xjchecked = !this.xjchecked;
        this.wxchecked = false;
        this.poschecked = false;
        this.zfbchecked = false;

      },
      WXBtn(){
        this.wxchecked = !this.wxchecked;
        this.xjchecked = false;
        this.poschecked = false;
        this.zfbchecked = false;
      },
      POSBtn(){
        this.poschecked = !this.poschecked;
        this.wxchecked = false;
        this.xjchecked = false;
        this.zfbchecked = false;
      },
      ZFBBtn(){
        this.zfbchecked = !this.zfbchecked;
        this.wxchecked = false;
        this.poschecked = false;
        this.xjchecked = false;
      },
      //收款类型变化
      receiveTypeRadio(index){
        console.log(this.receiveType[index].id);
        this.beyond = false;
        this.receiveTypeData = this.receiveType[index].id;
        let ordenprice = {};
        ordenprice.code = this.orderCode;
        ordenprice.type = this.receiveTypeData;
        this.$http.get('/cashier/ordenprice',{params:ordenprice}).then(res=>{
          this.data = res.data.orders;
            this.data.map((item=>{
              this.$set(item,'realPrice',item.price);
              this.$set(item,'isMateriel',true);
              this.orderTotal += item.amount;
            }))
          this.pagePrice();
        })
      },
      // priceSum(){
      //   let sum = 0;
      //   for(let i = 0 ;i<this.data.length;i++){
      //     sum += parseFloat(this.data[i].price)
      //   }
      //   this.priceSumData = sum.toFixed(2)
      // },

      addGoods(){
          this.OrderInfo.map(item=>{
            this.$set(item,'amount',1);
            this.$set(item,'realPrice',item.price);
            this.$set(item,'isMateriel',false);
          })
          for(var i in this.OrderInfo){
            this.data.push(this.OrderInfo[i])
          }
          console.log(this.data)
          this.AddOrderShow=false
          this.pagePrice()
        },
      deleteGoods(index){
        this.OrderInfo.splice(index,1)
      },
      AddShow(){
        if(!this.formItem.name){
          this.$Message.error('请输入正确手机号')
        }else{
          this.AddOrderShow = true;
          this.OrderInfo=[]
          this.autoData=[]
          this.autoValue=''
        }

      },
      InsertTable(data){
        if(data){
          this.OrderInfo.push(JSON.parse(data));
        }
        this.$nextTick(()=>{
          this.autoValue=''
          this.autoData=[];
        })
      },
      insertOrder(query){
        if (query !== '') {
          this.searchLoading = true;
          this.$http.get('/cashier/goods',{params:{code:query}}).then(res=>{
            this.searchLoading = false;
            this.autoData=res.data
          });
        } else {
          this.searchLoading = false;
          this.autoData = [];
        }

      },
      pagePrice () {
        let price=0
        for(var i in this.data){
          price+=parseFloat(this.data[i].realPrice=''||this.data[i].realPrice===undefined?0:this.data[i].realPrice)
        }
        this.priceSumData=price.toFixed(2);
        if(this.receiveTypeData==6){
          this.sum = '0.00';
        }else{
          this.sum = (this.priceSumData*this.kuCard.discount).toFixed(2);
        }
      },

      beyondFlag(){
        // if(this.zhifu.wxprice && typeof(this.zhifu.wxprice) == 'number' || this.zhifu.posprice && typeof(this.zhifu.posprice) == 'number' || this.zhifu.xjprice && typeof(this.zhifu.xjprice) == 'number')
        let totalPrice = Number(this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice).toFixed(2);
        if(this.receiveTypeData==3 || this.receiveTypeData==7){
          if(totalPrice != this.sum){
            this.beyond=true
          }else{
            this.beyond=false
          }
        }
          // if(totalPrice>this.sum){
          //   this.beyond=true
          // }else{
          //   this.beyond=false
          // }
      },


      //结算打印
      JSBTn(name){
          if(this.formItem.name==''){
          this.$Message.error('请填写信息')
          return
        }
        if(this.data.length==0){
          this.$Message.error('请选择付款单')
          return
        }
        if(this.checkID==''){
          this.$Message.error('请选择店员')
          return
        }
        if(this.receiveTypeData!=6){
          if(this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice==0){
            this.$Message.error('请输入支付金额')
            return
          }
        }
        //console.log(this.formItem.clerk)
        sessionStorage.setItem('data','')
        this.payWayArr=[]
        if(this.zhifu.posprice!=0){this.payWayArr.push({way:'pos刷卡',pay:this.zhifu.posprice})}
        if(this.zhifu.wxprice!=0){this.payWayArr.push({way:'微信',pay:this.zhifu.wxprice})}
        if(this.zhifu.zfbprice!=0){this.payWayArr.push({way:'支付宝',pay:this.zhifu.zfbprice})}
        this.$refs[name].validate((valid)=>{
          if(valid) {
            let pay = (this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice).toFixed(2)
            if(this.receiveTypeData == 4 && (pay==this.priceSumNum)){
              this.$Message.error({
                content:'请选择正确的支付方式'
              })
              return;
            }
            this.jsData.cashierOrderCode = this.cashierOrderCode
            this.jsData.totalOrderCode = this.orderCode
            this.jsData.amount = pay
            this.jsData.type = this.receiveTypeData
            this.jsData.saleAmount = this.priceSumData
            this.jsData.actualAmount = this.sum
            this.jsData.coolcard = this.kuCard.full
            this.jsData.couponid = this.model13
            this.jsData.remark = this.kuCard.remark
            this.jsData.discount=this.kuCard.discount
            this.jsData.id = this.cashierOrderCodeId
            this.jsData.staffid = this.formItem.clerk
            this.staffData.map(item=>{
              if(item.id==this.checkID){
                this.jsData.staffname = item.name;
              }
            })
            this.jsData.customerName = this.formItem.name
            this.jsData.priceType = this.receiveTypeData
            this.jsData.payments={
              11 : this.zhifu.xjprice,
              12 : this.zhifu.posprice,
              13 : this.zhifu.wxprice,
              14 : this.zhifu.zfbprice,
            },
            this.jsData.goodsArr = this.data;
            this.jsData.goodsVOs = [];
            this.jsData.router = 2;
          }
          this.data.map((item,index)=>{
              if(!item.isMateriel){
                this.jsData.goodsVOs.push(item);
              }
            })
          if(!this.beyond){
            console.log(this.payWayArr.length);
              this.ZFloading=true
              if(this.payWayArr.length==0){
                this.$http.post('/cashier/settlement',this.jsData).then(res=> {
                  sessionStorage.setItem('data',JSON.stringify(this.jsData))
                  this.ZFloading=false
                  this.$router.push('/print')
                })
              }else{
                this.threadPoxi(this.payWayArr[this.payWayIndex])
              }

            }
        })

      //   this.jsData.cashierOrderCode = this.cashierOrderCode
      //   this.jsData.amount = this.payAllData
      //   this.jsData.type = this.receiveTypeData
      //   this.jsData.saleAmount = this.priceSumData
      //   this.jsData.actualAmount = this.priceSumNum
      //   this.jsData.coolcard = this.kuCard.full
      //   this.jsData.couponid = this.model13
      //   this.jsData.remark = this.kuCard.remark
      //   this.jsData.id = this.cashierOrderCodeId
      //   this.jsData.staffid = this.formItem.clerk
      //   this.jsData.payments={
      //     11 : this.zhifu.xjprice,
      //     12 : this.zhifu.posprice,
      //     13 : this.zhifu.wxprice,
      //     14 : this.zhifu.zfbprice,
      //   }
      //   this.$http.post('/cashier/settlement',this.jsData).then(res=>{
      //    console.log(res.data)
      // }).catch(err=>{
      //   console.log(err)
      // })
      },
      toPos(num){
        num=parseFloat(num).toFixed(2).replace(".","");
        var i = (num + "").length;
        while(i++ < 12) num = "0" + num;
        return num;

      },
  },

};
</script>
<style lang="scss">
  .shanChu{
    color: #f76165;
    cursor: pointer;
    &:hover{
      color: red;
    }
  }
.l {
  float: left;
}
.r {
  float: right;
}
 .CashierModalStyle{
    .all{
      font-size: 10px;
      margin-left: 95px;
      margin-top: 5px;
      span:nth-of-type(1){
        font-size: 10px;
        color: #43bfb7;
      }
      span:nth-of-type(2){
        font-size: 10px;
        color:#ff7d41;
        font-family:DIN
      }
    }
    .ivu-modal-header{
      border-top-right-radius: 6px;
      border-top-left-radius: 6px;
      background: #fff;
      border-bottom: 1px solid #E1E1E1;
      padding: 15px 20px;
      background:#f5f5f5
    }
    .searchOrder{
      padding: 10px 20px 10px 1px;
      input{
        text-align: left;
        outline: 0;
        height: 30px;
        line-height: 30px;
        color: #657180;
        border: 1px solid #dddee1;
      }
    }
    .ivu-modal-content{
        height: 500px;
        overflow-y: auto;
      }
    .ivu-modal-body{
      padding: 0 !important;
      .ivu-table-wrapper{
              border: 0;
            }
          .ivu-table th{
            background: #fff !important;
          }
          .ivu-table-wrapper .ivu-table .ivu-table-tbody .ivu-table-row td{
            height: 50px;
          }
          .ivu-table td, .ivu-table th{
            border-bottom:1px solid #dfe4ea;
          }
        Table{
          width: 100%;
          thead{
            th{
              span{
                font-size: 11px !important;
                font-weight: 100 !important;
              }
            }
          }
          .ivu-table-cell{
              white-space:normal;
              padding:0 10px;
            }
        }
      input:hover{
        border: 1px solid #57a3f3;
      }
      input:focus{
        border: 1px solid #57a3f3;
      }
      form{
        width: 100%;
        padding: 0px 20px;
        .ivu-form-item-content{
          margin-right: -13px !important;
          .ivu-input-wrapper{
            width: 100%;
          }
          .ivu-select{
            width: 100%;
          }
        }
      }
      .ivu-form-item{
        border: 1px solid #dddee1;
        height:30px;
        width: 16%;
        margin-right: 5px !important;
        border-radius: 3px;
        margin-bottom: 0;

        .ivu-form-item-label{
          line-height: 28px;
          color: #9ea7b4;
          padding: 0 0 0 10px !important;
          font-weight: 100;
        }
        .ivu-form-item-content{
          line-height: 27px;
          padding-right: 1px;
          .ivu-select{
            text-align: center;
            vertical-align: top;
          }
          .ivu-date-picker{
            line-height: 27px;
            .ivu-select-dropdown{
              left:-137px !important
            }
          }
          .ivu-select-selection{
            border:0;
            height: 27px;
            color: 	#657180;
            .ivu-select-selected-value{
              text-align: right !important;
              height: 28px;
              line-height: 28px;
            }
          }
          .ivu-select-visible .ivu-select-selection{
            box-shadow: none;
          }
          .ivu-select-visible{
            .ivu-select-dropdown{
              width: calc(100% + 70px) !important;
              left: -70px !important;
            }
          }
          .ivu-select-single{
            .slide-up-leave-active{
              width: calc(100% + 70px) !important;
              left: -70px !important;
            }
            .slide-up-leave-to{
              width: calc(100% + 70px) !important;
              left: -70px !important;
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
      .ivu-form-item:hover{
        border-color: #66afe9;
      }
      .ivu-input:focus{
        border-color: #dddee1;
        outline: 0;
        box-shadow: none;
      }
      input[disabled]{
              background: #f6f6f6;
              border-color:#eee;
              color:#363636;
            }
      .modalSearch{
        border: 0;
        margin: 0 !important;
        width: 30px;
        height: 30px;
        .ivu-btn{
          border: 0;
          padding: 0;
          width: 100%;
          height: 30px;
          i{
            font-size: 16px;
          }
        }
        .ivu-btn:hover{
          color:#37b3b3
        }
      }
      .dateAdd{
        border: 0;
        width: 58px;
        margin: 0 !important;
        .ivu-btn{
          border: 0;
          padding: 0;
          width: 100%;
          height: 30px;
          i{
            font-size: 16px;
          }
        }
        .ivu-btn:hover{
          background: #EDC36C;
          color: #fff;
        }
      }
      .companyName{
        width:calc(32% + 10px);
      }
    }
    .ivu-modal-content{

      .ivu-modal-close{
        top:4px;
      }
    }
    .ivu-modal-footer{
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0 20px !important;
      position: absolute;
      bottom: 5px;
      Button:nth-child(1){
        width: 150px;
        background: #ccc;
        color:#fff;
      }
      Button:nth-child(2){
        width: 150px;
        background:#31bdc0;
        color:#fff;
      }
    }
  }
  .ivu-table-cell .ivu-checkbox-input{
    height: 14px !important;
    line-height: 14px !important;
  }

.ivu-input[disabled], fieldset[disabled] .ivu-input{
  color:#4e4e4e
}

.cashier-warp {
  width: 100%;
  height: 100%;
  background: #eaedf0;
  color: #333;
  font-size: 12px;
  .ivu-input:hover{
    border: 1px solid #57a3f3
  }
  .ivu-input:focus{
    border: 1px solid #57a3f3
  }
  //弹窗
  .ivu-input-number.ivu-input-number-small{
    width: 43px!important;
  }
  //左半部分
  .leftModel {
    margin: 16px;
    height: 100%;
    width: calc(63%);
    overflow: hidden;
    //左面第一行
    .leftFirst {
      margin-bottom: 16px;
      width: 100%;
      .flux1 {
        width: 100%;
        margin-right: 16px;
        margin-bottom: 16px;
        background: #fff;
        text-align: left;
        height: 219px;
        border: 1px solid #dde0e3;
        .flux1_header {
          width: 100%;
          height: 50px;
          background: #f7f7f7;
          border-bottom: 1px solid #d0d0d0;
          line-height: 50px;
          padding: 0 20px;
          font-size: 12px;
          font-family: '平方中粗';
          color: #666;
          span{
            font-family: 'DIN';
            color:#43bfb7;
            font-weight: 500;
            font-size: 13px;
          }
          p{
            font-weight:bold;
          }
          .receivables_type {
            height: 50px;
            margin-left: 10px;

            .ivu-radio-group-button{
              lable{
                color:#363636;
                font-size: 12px;
                //font-family: '平方常规';
              }

            }
            .ivu-radio-group-button .ivu-radio-wrapper:first-child {
              border-radius: 20px 0 0 20px;
            }
            .ivu-radio-group-button .ivu-radio-wrapper:last-child {
              border-radius:0 20px 20px 0 ;
            }
            .ivu-radio-group-button .ivu-radio-wrapper-checked{
              background: #00a7d3;
              color: #fff
            }
          }
        }
        .flux1_body {
          //padding: 20px;
          .flux1_form {
            padding: 20px;

            .flux1_lable{
              font-size: 14px;
              position: relative;
              width: 50%;
              .searchTel{
                position: absolute;
                top:-7px;
                right: 11%;
                width: 33px;
                background: #fff;
                border: none;
                .ivu-icon-search{
                  font-size: 14px;
                }
              }
            }
            .height_cm{
              position: relative;
              span{
                display: block;
                position: absolute;
                right:10%;
                bottom:10px;
                color: #9b9b9b;
                font-family:'DIN';
              }
            }

            .ivu-form-item-label {
              padding: 10px 0 !important;
              margin-top: -8px;
              font-size: 10px !important;
              color:#495060 !important;
              font-family: 微软雅黑 !important;
            }
            .input_length {
              width: 90%;
              margin-top: -20px;
              color: #4e4e4e
            }
            input{
              width: 100%;
              color:#363636;
              font-size: 12px;
              font-family: 'arial';
            }
            input[disabled]{
              background: #f6f6f6;
              border-color:#eee;
            }
            .ivu-select-selection{
              width: 100% !important;
            }
          }
        }
      }
      .flux2 {
        width: 100%;
        margin-right: 16px;
        margin-bottom: 16px;
        background: #fff;
        text-align: left;
        height: 540px;
        border: 1px solid #dde0e3;
        border-top:0;
        position: relative;
        .ivu-table th{
                 border-color:#d4d4d4;
               }
        .ivu-table td{
            height: 50px;
            .ivu-table-cell{
              white-space:normal;
              padding:0 10px;
            }

        }
        Table{
          width: 100%;
          thead{
            font-size: 11px !important;
            th{
              font-weight: 100 !important;

            }
          }
        }
        .ivu-table:before{
          height: 0
        }
        .ivu-table:after{
          width: 0;
        }
        .add{
          width: 85px;
          height: 24px;
          line-height: 24px;
          position: absolute;
          left: 16px;
          bottom: 16px;
          font-size: 10px;
          cursor: pointer;
        }
        .sumPrice{
          position: absolute;
          text-align: right;
          width: 400px;
          height: 24px;
          right: 20px;
          bottom: 16px;
          font-size: 12px;
          color: #858585;
          .sumPrice1{
            text-align: center;
            color: #444;
            font-size: 12px;
            font-family: 'DIN';
            font-weight:bold;
          }
          .sumPrice2{
            text-align: center;
            color: #ff6833;
            font-size: 22px;
            font-family: 'DIN';
            font-weight:bold;
          }

        }
      }
    }
  }
  //右半部分
  .rightModel {
    margin: 16px;
    margin-left: 0;
    height: 100%;
    width: calc(32%);
    overflow: hidden;
    .flux1 {
      border: 1px solid #dde0e3;
      width: 100%;
      margin-right: 16px;
      margin-bottom: 20px;
      background: #fff;
      text-align: center;
      height: 219px;
      .ivu-form-item-error-tip{
        margin-top: -8px;
      }
      .ivu-col-span-12{
        width: 100%
      }
      .ivu-form-item-content{
        margin-left: 60px;
      }
      .ivu-select-single{
        width: 107%
      }
      .flux1_form {
        padding: 20px;
        .ivu-form-item{
          margin-bottom: 20px;
        }
        .ivu-form-item-label {
          width: 60px !important;
          margin-top: -6px;
          font-size: 10px !important;
          color: #495060 !important;
        }
        .input_length {
          width: 107%;
          margin-top: -15px;
          margin-left: -20px;
        }
        input{
          height: 30px;
          float: right;
        }
      }
    }
    .flux2 {
      width: 100%;
      margin-right: 16px;
      margin-bottom: 20px;
      background: #fff;
      text-align: left;
      height: 135px;
      padding: 10px;
      border: 1px solid #dde0e3;
      position: relative;
      overflow: hidden;
      .flux2_header {
        text-align: center;
        ul {
          display: block;
          li {
            display: block;
            width: 33.3%;
            border-left: 1px solid #e0e6ea;
            height: auto;
            text-align: center;
            p:first-of-type {
              color: #43bfb7;
              font-size: 16px;
              font-family: 'DINAlternate';
              font-weight: bold;
            }
            p:last-of-type {
              color: #363636;
              font-size: 10px;
              //font-family: PingFang SC Regular;
            }
          }
        }
        li:first-of-type {
          border: 0;
        }
      }
      .flux2_body {
        width: 100%;
        height: auto;
        position: absolute;
        bottom: 10px;
        p:first-of-type {
            text-align: center;
            color: #363636;
            font-size: 12px;
          span{
            color: #ff6833;
            font-size: 22px;
            font-family: 'DINAlternate';
            font-weight:bold;
          }
        }
        p:last-of-type{
          display:flex;
          flex-flow:row wrap;
          justify-content: center;
          i{
            flex-basis:50%;
            font-style: normal
          }
          color: #363636;
          font-size: 8px;
          text-align: center;
          span{
            font-weight: bold;
            font-family: 'DIN';
          }
        }
      }
    }
    .flux3 {
      width: 100%;
      margin-right: 16px;
      margin-bottom: 16px;
      background: #fff;
      text-align: left;
      height: 345px;
      padding: 20px 10px 20px 10px;
      border: 1px solid #dde0e3;
      overflow: hidden;
      .ivu-form-item-error-tip{
        margin-top: -15px;
        font-size: 10px
      }
      .flux_l {
        height: 100%;
        width: 50%;
        form{
          padding-top: 10px;
          padding-left:10px;
        }

        .ivu-form-item{
          margin-bottom: 20px;
        }
        .flux3_form .ivu-form-item-label {
          padding: 10px 0 !important;
          margin-top: -10px;
          font-size: 10px !important;
        }
        .input_length {
          height: 35px!important;
          width: 90%;
          margin-top: -30px;
          input{
            height: 26px;
          }
          .ivu-input-number-handler-wrap{
            display:none;
          }
        }
        p{
          margin-top: -10px
        }
      }
      .flux_r {
        //height: 100%;
        width: 50%;
        border-left: 1px solid #e0e6ea;
        display: flex;
        flex-wrap:wrap;
        height: 100%;
        padding-left:2px;
        div {
          width: 50%;
          height: 80px;
          cursor: pointer;
          text-align: center;
        }
        div:first-of-type{
          width: 54%
        }
        div:nth-child(2){
          width: 46%
        }
        div:nth-child(3){
          width: 54%
        }
        div:nth-child(4){
          width: 46%
        }
        .JS {
          width: 92%;
          height: 50px;
          background: #ff6733;
          position: relative;
          border: 1px solid #e4e4e4;
          border-radius: 5px;
          left: 6%;
          img{
            display: block;
            position: absolute;
            top:20%;
            left: 20%;
          }
          p{
            display:block;
            position: absolute;
            color: #fff;
            font-size: 15px;
            left:40%;
            top:28%;
          }
        }
      }
    }
  }
    .ivu-icon-ios-arrow-down{
      transform: rotate(358deg);
    }
}
</style>
