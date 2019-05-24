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
                  <Radio :label="index" v-for="(item,index) in receiveType" :key="index" :disabled='item.isDisabled'>{{item.name}}</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div class="flux1_body">
            <Form ref="formItem" :model="formItem" :label-width="80" class="flux1_form">
              <Form-item label="总单单号：" class="l flux1_lable" style="position: relative">
                <Input v-model="totalOrderCode" placeholder="总单单号" class="input_length" disabled></Input>
                <Button icon="search" @click="searchOrderCode" class="searchTel"></Button>
              </Form-item>
              <Form-item label="客户手机号：" class="l flux1_lable" style="position: relative">
                <Input v-model="formItem.tel" @on-change="telChange(1,formItem.tel)" @on-blur="diyDownClear()" placeholder="客户手机号" class="input_length" :disabled="receiveTypeData==5"></Input>
                <ul class="diySelect" v-if="diyDownListOut">
                   <li v-for="(item,index) in customInfo" :key="index" @mousedown="clickTel(item,1)">{{item.tel}}</li>
                   <li v-if="customInfo.length==0">无匹配结果</li>
                </ul>
                <Button icon="search" @click="search" class="searchTel"></Button>
              </Form-item>
              <FormItem label="客户姓名:" class="r flux1_lable">
                <Input v-model="formItem.name" placeholder="客户姓名" :disabled='hasPhone' class="input_length"></Input>
              </FormItem>
              <FormItem label="店员:" class="l flux1_lable">
                <Select v-model="clerkID" class="input_length" filterable>
                  <Option :value="item.id" v-for="(item,index) in staffData" :key="index">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="客户身高：" class="r flux1_lable height_cm">
                <Input v-model="formItem.height" placeholder="客户身高" :disabled='hasPhone' class="input_length"></Input>
                <span>cm</span>
              </FormItem>
              <FormItem label="客户体重:" class="l flux1_lable height_cm">
                <Input v-model="formItem.weight" placeholder="客户体重" :disabled='hasPhone' class="input_length"></Input>
                <span>kg</span>
              </FormItem>
            </Form>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="flux2">
          <div style="height: 500px;overflow-y: auto">
            <Table :columns="columns" :data='data' style="border:0"></Table>
          </div>
          <div class="add" @click="AddShow"  v-if="this.receiveTypeData!==5">
            <img src="../../assets/images/add.png" alt="" class="l">
            <p class="l" style="display:block;margin-left:5px;color:#43bfb7">添加订单</p>
          </div>
          <div class="sumPrice">
            <p>商品数量：<span class="sumPrice1">{{orderTotal}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本页小计：<span class="sumPrice2">￥{{priceSumData}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加订单弹窗 -->
    <div v-if="AddOrderShow">
      <Modal v-model="AddOrderShow" class-name="delectNopad CashierModalStyle" :mask-closable='false' width="870" v-drag>
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
    <div class="rightModel l">
      <div class="flux1">
        <Form ref="kuCard" :model='kuCard' label-position="left" :label-width="80" :rules="numRlue" class="flux1_form">
          <FormItem label="酷卡:">
            <Input v-model="kuCard.full" class="input_length"></Input>
          </FormItem>
          <FormItem label="优惠券:">
            <Row>
              <Col span="12" style="margin-top:-9px;margin-bottom:4px;margin-left: -19px;">
              <!--<Select-->
                <!--ref="select"-->
                <!--v-model="model13"-->
                <!--filterable-->
                <!--remote clearable-->
                <!--:remote-method="remoteMethod1"-->
                <!--:loading="loading1">-->
                <!--<Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>-->
              <!--</Select>-->

              <Select v-model="model13" filterable>
                <Option v-for="item in options1" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>

              </Col>
            </Row>
          </FormItem>
          <FormItem prop="discoune" label="折扣:">
            <InputNumber  :class="'zhekoulv'" :max="1" :step="0.1" :min="0" v-model="kuCard.discoune" :disabled="receiveTypeData==5" class="input_length"></InputNumber>
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
              <p>￥{{discoune}}</p>
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
              <p>￥{{zhifu.xjprice !=='' && zhifu.wxprice !=='' && zhifu.posprice !=='' && zhifu.zfbprice !==''?
                (zhifu.xjprice + zhifu.wxprice + zhifu.posprice + zhifu.zfbprice).toFixed(2):0}}</p>
            </FormItem>
            <FormItem label="已付金额:"  v-if="receiveTypeData==5">
              <p>￥{{(this.amountpaid).toFixed(2)}}</p>
            </FormItem>
            <FormItem label="剩余未付:">
              <p>￥{{zhifu.xjprice >=0 && zhifu.wxprice >=0  && zhifu.posprice >=0  && zhifu.zfbprice >=0 ?
                (sum - zhifu.xjprice - zhifu.wxprice - zhifu.posprice - zhifu.zfbprice-amountpaid).toFixed(2):sum}}</p>
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
          <Button type="primary" class="JS" :loading="ZFloading" @click="JieSuan('zhifu')" >
            <img v-if="!ZFloading" src="../../assets/images/print.png" alt="">
            <p v-if="!ZFloading">结算打印</p>
            <p v-if="ZFloading">结算中...</p>
          </Button>
        </div>

      </div>
    </div>
    <!--客户订单弹窗 -->
    <div v-if="JSBTN">
      <Modal v-model="JSBTN" class-name="delectNopad CashierModalStyle" :mask-closable=false width="900" v-drag @on-cancel="JSTableC=[]">
        <p slot="header">
          <span class="main-heading">选择需要添加付款的订单</span>
        </p>
        <div class="searchOrder">
          <Form ref="formItem" :model="formItem" :label-width="90" class="flux1_form" inline style="position: relative">
            <span>客户手机号：</span>
            <Input ref="inputIn" v-model="otherItem.tel" @on-change="telChange(2,otherItem.tel)" @on-blur="diyDownClear(2)" @on-enter="enterTel(otherItem)" :disabled="myTel" placeholder="客户手机号" class="" style="width:200px"></Input>
            <ul class="diySelect diySelectIn samllDiySelect" v-if="diyDownListIn">
              <li v-for="(item,index) in customInfo" :key="index" @mousedown="clickTel(item,2)">{{item.tel}}</li>
              <li v-if="customInfo.length==0">无匹配结果</li>
            </ul>
            <span>客户姓名：</span>
            <Input v-model="otherItem.name" placeholder="客户姓名" disabled class="" style="width:200px;"></Input>
          </Form>
        </div>
        <div class="modalBody maintenance" style="height:350px;overflow:auto">
          <Table stripe border ref="selection" :columns="JSTable" :data="OrderInfoA" @on-selection-change="tableSelect"></Table>
        </div>
        <p class="all" style="font-size:8px;">（共选择了<span>&nbsp;{{JSTableMun}}</span>个订单，总金额<span style="font-size:8px;">&nbsp;&nbsp;{{JSTablePrice}}</span>）</p>
        <p slot="footer">
          <Button @click="closeTelModel">关闭</Button>
          <Button @click="makeSure">确定</Button>
        </p>
      </Modal>
    </div>
    <!--总单单号单弹窗 -->
    <div v-if="orderCodeShow">
      <Modal v-model="orderCodeShow" class-name="delectNopad CashierModalStyle" :mask-closable=false width="900" v-drag @on-cancel="orderCodeClose">
        <p slot="header">
          <span class="main-heading">选择需要付款的订单</span>
        </p>
        <div class="searchOrder">
          <Form ref="formItem" :model="formItem" :label-width="90" class="flux1_form" inline style="position: relative">
            <span>客户手机号：</span>
            <Input ref="inputIn" v-model="otherItem.tel" clearable @on-change="telChange(2,otherItem.tel)"  @on-blur="diyDownClear(2)" @on-enter="clickOrderTel(otherItem)" style="width:200px"></Input>
            <input type="text" style="display: none">
            <ul class="diySelect diySelectIn samllDiySelect" v-if="diyDownListIn">
              <li v-for="(item,index) in customInfo" :key="index" @mousedown="clickOrderTel(item)">{{item.tel}}</li>
              <li v-if="customInfo.length==0">无匹配结果</li>
            </ul>
          </Form>

        </div>
        <div class="modalBody maintenance" style="height:350px;overflow:auto">
          <Table stripe border ref="selection" :columns="orderCodeTable" :data="OrderInfoB"></Table>
        </div>
        <p slot="footer">
          <Button @click="orderCodeClose">关闭</Button>
        </p>
      </Modal>
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
    <div v-if="chexiao2">
      <Modal v-model="chexiao2" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认撤销此订单？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="chexiao2Sure">确认</Button>
            <Button  class="clear" @click="chexiao2=false">取消</Button>
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
      const discoune = (rule, value, callback) => {
        if (value === "" || value === null) {
          callback(new Error('请输入折扣信息'));
        } else {
          if (!/^(1|1\.[0]*|0?\.(?!0+$)[\d]+|0)$/.test(value)) {
            callback(new Error('0到1之间的数字'));
          } else if (value.length > 10) {
            callback(new Error('最多输入10位'));
          }else if (!/^\d{0,8}\.{0,1}(\d{1,2})?$/.test(value)) {
            callback(new Error('金额格式错误'));
          } else {
            callback();
          }
        }
      };
      // const wxprice = (rule, value, callback) => {
      //   if (value === "" || value === null) {
      //     callback(new Error('最小金额为0'));
      //   } else {
      //     if (!/^\d{0,8}\.{0,1}(\d{1,2})?$/.test(value)) {
      //       callback(new Error('金额格式错误'));
      //     }else {
      //       callback();
      //     }
//          else if((this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice)>this.priceSumNum ){
//            callback(new Error('超出实收金额'));
//          }
      //   }
      // };
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
        // 单选框disabled
        model13: '',
        loading1: false,
        options1: [],
        model14: [],
        loading2: false,
        options2: [],
        clerkID:'',//店员
        hasPhone:true,
        totalOrderCode:'', //总单单号
        formItem: {
          name:'',
          tel:'',
          height:'',
          weight:'',
        },
        otherItem: {
          name:'',
          tel:'',
          height:'',
          weight:'',
        },
        customInfo:[],     //远程搜索数组
        diyDownListOut:false,
        diyDownListIn:false,
        numRlue:{
          discoune:[
            { required: true,validator:discoune, trigger: 'change' },
          ],
          wxprice:[
            { required: true,validator:wxprice, trigger: 'blur,change' },
          ],
          zfbprice:[
            { required: true,validator:wxprice, trigger: 'blur,change' },
          ],
          xjprice:[
            { required: true,validator:wxprice, trigger: 'blur,change' },
          ],
          posprice:[
            { required: true,validator:wxprice, trigger: 'blur,change' },
          ],
        },
        technologyLoading:false,
        couponList:[],
        paymentType:[],
        priceSumData:0,     //商品总额（本页小计）
        discouneData:0,     //优惠总额
        priceSumNum:0,    //应收总额
        payAllData:0,   //支付总额
        payRestData:0,   //剩余未付
        staffData:[],
        receiveTypeData:3,
        kuCard:{
          discoune:1,
          full:''
        },
        receiveType:[],
        priceType:0,
        cashierOrderCode:'',
        xjchecked:false,
        wxchecked:false,
        poschecked:false,
        zfbchecked:false,
        AddOrderShow:false,
        weikuan:false, //尾款控制
        JSBTN:false,
        myTel:false, //添加订单时 手机号不可变
        OrderInfo:[],
        autoValue: '',
        autoData: [],
        searchLoading:false,
        jsData:{                  //结算信息
          cashierOrderCode:'',
          amount:0,
          type:'3',
          payments: {
            11:'',
            12:'',
            13:'',
            14:''
          },
        },
        zhifu:{
          paymentType:[],
          xjprice:0,
          wxprice:0,
          zfbprice:0,
          posprice:0,
        },
        OrderInfoA:[],
        JSTable:[
          {
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
            key: 'code',
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
          // {
          //   title: '零售价',
          //   width:'8%',
          //   key: 'price',
          //   align: 'center',
          // },
          // {
          //   title: '折扣',
          //   width:'8%',
          //   key: 'zhekou',
          //   align: 'center',
          // },
          // {
          //   title: '优惠金额',
          //   width:'9%',
          //   key: 'youhui',
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('Tooltip', {
          //         style:{
          //           verticalAlign: 'middle',
          //           //fontWeight:'bold',
          //           color:'#43bfb7',
          //           fontFamily:'DIN'
          //         },
          //         props: {
          //           content:params.row.youhui,
          //           placement: "bottom",

          //         }
          //       },
          //       [
          //         h('span',params.row.youhui)
          //       ]);
          //   }
          // },
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
                  content:params.row.price,
                  placement: "bottom",
                }
              }, [
                h('span',
                  {

                  }, [
                    h("span", params.row.price)
                  ])
              ]);
            }
          },
        ],
        JSTableMun:0, //选择订单数
        JSTablePrice:0, //选择订单总价
        JSTableC:[], //已选择的订单
        chexiao1:false,
        chexiao2:false,
        chexiaoIndex:'',
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
        copyData:'',
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
                  content:params.row.price/params.row.amount,
                  placement: "bottom",

                }
              }, [
                h('span',
                  {

                  }, [
                    h("span",{
                      domProps:{
                        innerHTML:params.row.isMateriel?(params.row.price/params.row.amount):params.row.price
                      }
                    })
                  ]
                )
              ]);
            }
          },
          // {
          //   title: '折扣',
          //   width:'8%',
          //   key: 'zhekou',
          //   align: 'center',
//            render: (h, params) => {
//              if(params.row.ordentype&&params.row.ordentype==5){
//                return h('input', {
//                  props:{
//                    model:params.row.zhekou
//                  },
//                  on:{
//                    blur:()=>{
//                      console.log(params.row.zhekou);
//                    }
//                  }
//                });
//              }
//            }
          // },
          // {
          //   title: '优惠金额',
          //   width:'11%',
          //   key: 'youhui',
          //   align: 'center',
          //   render: (h, params) => {
          //       return h('Tooltip', {
          //           style:{
          //             verticalAlign: 'middle',
          //             fontWeight:'bold',
          //             color:'#43bfb7',
          //             fontFamily:'DIN'
          //           },
          //           props: {
          //             content:params.row.youhui,
          //             placement: "bottom",

          //           }
          //         },
          //         [
          //           h('span',params.row.youhui)
          //         ]);
          //     }
          // },
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
            key: 'realPrice',
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
                  content:params.row.realPrice,
                  placement: "bottom",

                }
              }, [
                h('span',
                  {

                  }, [
                    h("span", params.row.realPrice)
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
        beyond:false, //超出金额
        orderdetailids:'',  //结算时订单id
        goodsids:'',  //结算时物料id
        websock: null,
        payWayArr:[],
        payWayIndex:0,
        sessionData:'',
        ZFloading:false,
        //总订单弹窗
        OrderInfoB:[], //表格数据
        orderCodeShow:false,
        orderCodeTable:[
          {
            title: '序号',
            width:'5%',
            type:'index',
            align: 'center',
          },
          {
            title: '客户姓名',
            width:'10%',
            key: 'customerName',
            align: 'center',
          },
          {
            title: '客户电话',
            width:'10%',
            key: 'customerTel',
            align: 'center',
          },
          {
            title: '总单单号',
            width:'20%',
            key: 'orderCode',
            align: 'center',
          },
          {
            title: '时间',
            width:'10%',
            key: 'createDate',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                style:{verticalAlign: 'middle'},
                props: {
                  content:this.setTime(params.row.createDate),
                  placement: "bottom"
                }
              }, [
                h('span',
                  {

                  }, [
                    h("span", this.setTime(params.row.createDate))
                  ])
              ]);
            }
          },
          {
            title: '状态',
            width:'10%',
            key: 'statusname',
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
                      this.addOrderCode(params.row)
                    }
                  }
                }, '付款'),
              ]);
            }
          },
        ],
        amountpaid:0,  //已付金额
        pay:0, // 储存支付金额
        orderTotal:0, // 商品数量
        sum:'',
      };
    },
    computed: {
      discoune: function () {
        this.discouneData = (this.priceSumData-this.priceSumData * this.kuCard.discoune).toFixed(2)
        return this.discouneData
      },
      // sum: {
      //   get:function () {
      //     this.priceSumNum = (this.priceSumData - this.discouneData).toFixed(2)
      //     return this.priceSumNum
      //   },
      //   set:function(val){
      //     this.priceSumData = 0;
      //     this.discouneData = 0;
      //     this.data.map(item=>{
      //       this.priceSumData += Number(item.realPrice);
      //     })
      //     this.priceSumData = this.priceSumData.toFixed(2);
      //     this.discouneData = Number(JSON.parse(JSON.stringify(this.priceSumData)));
      //     console.log(typeof this.discouneData)
      //   }
      // }
    },
    watch:{
      // ['zhifu.xjprice'](val){
      //   this.zhifu.xjprice = val;
      //   this.pay= this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice;
      //   this.priceSumNum -= this.pay;
      // },
      // ['zhifu.wxprice'](val){
      //   this.zhifu.wxprice = val;
      //   this.pay= this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice;
      //   this.priceSumNum -= this.pay;
      // },
      // ['zhifu.zfbprice'](val){
      //   this.zhifu.zfbprice = val;
      //   this.pay= this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice;
      //   this.priceSumNum -= this.pay;
      // },
      // ['zhifu.posprice'](val){
      //   this.zhifu.posprice= val;
      //   this.pay= this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice;
      //   this.priceSumNum -= this.pay;
      // },
      model13(val){
        this.kuCard.discoune = 1;
      },
      ['kuCard.discoune'](val){
        this.model13 = '';
        this.discouneData = (this.priceSumData-this.priceSumData * this.kuCard.discoune).toFixed(2);
        this.pagePrice();
      }
    },
    mounted(){
      this.ready()
      this.getStaff()
      //收银单号
      this.$http.get('/cashier/cashierOrderCode',{}).then(res=>{
        this.cashierOrderCode=res.data
      });
      //总单单号
      this.$http.get('/cashier/totalOrderCode',{}).then(res=>{
        this.totalOrderCode=res.data;
      });
      this.initWebSocket();
    },
    beforeDestroy(){
      this.websock.close()
    },
    methods:{
      //test优惠券名称查询
      remoteMethod1 (query) {
        if (query !== '') {
          this.loading1 = true;

        } else {
          this.options1 = [];
        }
      },
      AddShow(){
        if(!this.formItem.name){
          this.$Message.error('请输入客户姓名')
        }else if(!this.formItem.weight){
          this.$Message.error('请输入客户体重')
        } else if(!this.formItem.height){
          this.$Message.error('请输入客户身高')
        }else{
          this.AddOrderShow = true;
          this.OrderInfo=[]
          this.autoData=[]
          this.autoValue=''
        }

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
      //获取店员选项
      getStaff(){
        this.$http.get('/cashier/staff',{}).then(res=>{
          this.staffData=res.data
        })
      },
      //总单单号查订单
      searchOrderCode(){
        if(this.formItem.tel){
          this.$http.get('/cashier/totalorders',{params:{tel:this.formItem.tel,totalOrderCode:this.totalOrderCode}}).then(res=>{
          this.otherItem.tel=this.formItem.tel;
          this.OrderInfoB = res.data;
          this.orderCodeShow=true;
        });
        }else{
          this.$http.get('/cashier/totalorders',{params:{totalOrderCode:this.totalOrderCode}}).then(res=>{
          this.OrderInfoB = res.data
          this.orderCodeShow=true
        });
        }
      },
      clickOrderTel(item){
        this.$http.get('/cashier/totalorders',{params:{tel:item.tel,totalOrderCode:this.totalOrderCode}}).then(res=>{
          this.otherItem=item;
          this.OrderInfoB = res.data
        });
      },
      //总单单号添加
      addOrderCode(row){
        console.log(row);
        if(row.statusname=='未付尾款'){
           this.priceType=2;
           this.receiveType.map((item)=>{
             let isDisabled = true;
             if(item.name=='尾款'){
               isDisabled = false;
             }
             this.$set(item,'isDisabled',isDisabled);
             this.receiveTypeData = 5;
           })

        }else{
           this.priceType=0;
           this.receiveType.map((item)=>{
             let isDisabled = false;
             if(item.name=='尾款'){
               isDisabled = true;
             }
             this.$set(item,'isDisabled',isDisabled);
             this.receiveTypeData = 3;
           })
        }
        this.orderCodeShow=false;
        this.otherItem.tel=''
        this.otherItem.name=''
        let totalorder = {};
        totalorder.id = row.id;
        console.log(this.receiveTypeData)
        totalorder.type = this.receiveTypeData;
        this.$http.get('/cashier/totalorder',{params:totalorder}).then(res=>{
          if(res.data.cashierOrderCode){
            this.cashierOrderCode=res.data.cashierOrderCode
          }

          this.data=res.data.orders;
          if(res.data.staffid){
            this.clerkID = res.data.staffid;
          }
          if(res.data.type){
            this.receiveTypeData = res.data.type;
            this.priceType = res.data.type - 3;
          }
          this.data.map((item=>{
            this.$set(item,'realPrice',item.price);
            this.$set(item,'isMateriel',true);
            this.orderTotal += item.amount;
          }))
          this.formItem.tel=res.data.customer.tel
          this.formItem.name=res.data.customer.name
          this.formItem.height=res.data.customer.height
          this.formItem.weight=res.data.customer.weight
          this.totalOrderCode=row.orderCode
          //this.kuCard.discoune=1
          if(res.data.ispay==1){
            //支付方式index
            this.receiveTypeData=5;  //支付方式id
            // this.priceType=2;
            this.weikuan=true;
          }
          this.amountpaid=res.data.amountpaid  //已付金额
          this.kuCard.discoune=res.data.discount
          this.pagePrice();
          // this.isMateriel = true;
        });
      },
      //关闭窗口
      orderCodeClose(){
        this.orderCodeShow=false
        this.otherItem.tel=''
        this.otherItem.name=''
      },
      //手机号查订单
      search(){
        if(this.receiveTypeData==5){
          return
        }
        this.copyData=new Array(...this.data);
        this.JSTableMun=0
        this.JSTablePrice=0
        if(!this.formItem.tel){
          this.$Message.error('请输入手机号')
        }else{
          let arr=[]
          for(var i in this.data){
            arr.push(this.data[i].id)
          }
          arr=arr.join(',')
          this.$http.get('/cashier/orderdetails',{params:{tel:this.formItem.tel,orderids:arr}}).then(res=>{
            console.log(res.data)
            this.OrderInfoA = res.data
            this.otherItem=JSON.parse(JSON.stringify(this.formItem))
            this.JSBTN=true
            this.myTel=false
          })
        }
      },
      //手机号变化
      telChange(num,tel){
          this.data=[];
          this.priceSumData=0;
          this.JSTableC=[];
          if(tel.length>5){
          this.$http.get('/cashier/customers/' + tel).then(res=>{
            if(res.data.length){
              this.customInfo=res.data;
            }else{
              this.customInfo=[];
            }
            if(num===1){
              if(tel.length>=11 && this.customInfo.length<=0){
                this.hasPhone = false;
              }else{
                this.hasPhone = true;
              }
              this.diyDownListOut=true;
              this.formItem.name='';
              this.formItem.height='';
              this.formItem.weight='';
              if(this.customInfo.length===1&&tel.length===11){
                this.formItem.name=this.customInfo[0].name;
                this.formItem.height=this.customInfo[0].height;
                this.formItem.weight=this.customInfo[0].weight;
                this.getCouponList(tel)
                this.diyDownListOut=false
              }
            }else {
              this.diyDownListIn=true
              this.otherItem.name='';
              this.otherItem.height='';
              this.otherItem.weight='';
              if(this.customInfo.length===1&&tel.length===11){
                this.enterTel(this.otherItem);
                this.getCouponList(tel);
                this.otherItem.name=this.customInfo[0].name;
                this.otherItem.height=this.customInfo[0].height;
                this.otherItem.weight=this.customInfo[0].weight;
                this.diyDownListIn=false
              }
            }
          })
        }else {
          if(num===1){
            this.diyDownListOut=false
            this.formItem.name='';
            this.formItem.height='';
            this.formItem.weight='';
          }else{
            this.diyDownListIn=false
            this.otherItem.name='';
            this.otherItem.height='';
            this.otherItem.weight='';
          }
          this.customInfo=[]
        }
      },
      //失焦清空
      diyDownClear(num){
        if(num===1){
          this.formItem.tel='';
          this.formItem.name='';
          this.formItem.height='';
          this.formItem.weight='';
        }else{
//          this.otherItem.tel='';
//          this.otherItem.name='';
//          this.otherItem.height='';
//          this.otherItem.weight='';
        }
        setTimeout(()=>{
          this.customInfo=[]
          this.diyDownListOut=false;
          this.diyDownListIn=false;
        },100)
      },
      //点击下拉
      clickTel(item,num){
        if(num===1){
          setTimeout(()=>{
            this.formItem=item;
            this.getCouponList(item.tel)
          },100)
        }else{
          this.otherItem=item;
          let arr=[]
          for(var i in this.data){
            arr.push(this.data[i].id)
          }
          arr=arr.join(',')
          this.$http.get('/cashier/orderdetails',{params:{tel:item.tel,orderids:arr}}).then(res=>{
            this.OrderInfoA = res.data
          })
        }
        this.myTel=false
        this.diyDownListOut=false;
        this.diyDownListIn=false;
      },
      //内部 搜索回车
      enterTel(item){
        if(item.tel.length>5){
          let arr=[]
          for(var i in this.data){
            arr.push(this.data[i].id)
          }
          arr=arr.join(',')
          this.$http.get('/cashier/orderdetails',{params:{tel:item.tel,orderids:arr}}).then(res=>{
            this.OrderInfoA = res.data;
            this.$http.get('/cashier/customer/'+item.tel).then(res=>{
              if(res.data){
                this.otherItem=res.data;
              }else{
                this.otherItem.name=''
              }
              this.diyDownListIn=false;
            });
          })
        }
      },
      //选择框事件
      tableSelect(val){
        var price = 0
        var num=0
        for(let i=0;i<val.length;i++){
           price += parseFloat(val[i].price)
           num ++
        }
        this.JSTablePrice=price.toFixed(2);
        this.JSTableMun=num;
        this.JSTableC=val;
      },
      //确定,保存
      makeSure(){
        if(this.otherItem.name==''){
          this.$Message.error('请选择有效电话号')
        }else{
          //this.receiveTypeData=3;
          //this.priceType=0
          this.formItem.weight=this.otherItem.weight
          this.formItem.height=this.otherItem.height
          this.formItem.tel=this.otherItem.tel
          this.formItem.name=this.otherItem.name
          this.getCouponList(this.formItem.tel)
          for(var i in this.JSTableC){
            this.data.push(this.JSTableC[i])
          }
          this.pagePrice()
          this.JSBTN=false;
          this.JSTableC=[]
        }

      },
      closeTelModel(){
        this.JSBTN=false;
        this.JSTableC=[];
        this.data=new Array(...this.copyData)
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
      pagePrice () {
        let price=0
        for(var i in this.data){
          price+=parseFloat(this.data[i].realPrice=''||this.data[i].realPrice===undefined?0:this.data[i].realPrice)
        }
        this.priceSumData=price.toFixed(2);
        if(this.receiveTypeData==6){
          this.sum = '0.00';
        }else{
          this.sum = (this.priceSumData*this.kuCard.discoune).toFixed(2);
        }
      },
      //已选中的删除 (废弃)
      delectOrder(arr1,arr2){
        for(var i in arr1){
          for(var j in arr2){
            if(arr1[i].id===arr2[j].id){
               arr2.splice(j,1)
              break
            }
          }
        }
      },
      insertOrder(query){
        if (query !== '') {
          this.searchLoading = true;
          this.$http.get('/cashier/goods',{params:{code:query}}).then(res=>{
            this.searchLoading = false;
            this.autoData=res.data;
            this.autoData.map(item=>{
              this.$set(item,'isMateriel',false);
              this.$set(item,'amount',1);
              this.$set(item,'realPrice',(item.amount*item.price).toFixed(2))
            })
            console.log(this.data)
          });
        } else {
          this.searchLoading = false;
          this.autoData = [];
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
      deleteGoods(index){
        this.chexiaoIndex=index
        this.chexiao2=true;
      },
      chexiao2Sure(){
        this.OrderInfo.splice(this.chexiaoIndex,1)
        this.chexiao2=false;
      },
      addGoods(){
        console.log(this.OrderInfo);
        // if(this.OrderInfo.length>=1){
        //   this.isMateriel = false;
        // }
        for(var i in this.OrderInfo){
          this.data.push(this.OrderInfo[i]);
          this.orderTotal += this.OrderInfo[i].amount;
        }
        this.pagePrice()
        this.AddOrderShow=false
      },
      ready(){
        //查询收款类型
        this.$http.get('/cashier/receiveType').then(res=>{
          console.log(res.data);
          this.receiveType = res.data;
          this.receiveType.map((item)=>{
            let isDisabled = false;
            if(item.name=='尾款'){
              isDisabled = true;
            }
            this.$set(item,'isDisabled',isDisabled);
          })
          console.log(this.receiveType);
        }).catch(err=>{
          console.log(err)
        })
      },
      //查询优惠券
      getCouponList(tel){
        this.options1=[]
        this.$http.get('/cashier/coupon/'+tel).then(res=>{
          this.options1 = res.data
        })
      },
      //本页小计 计算data.price的和
      // priceSum(){
      //     let sum = 0;
      //     for(let i = 0 ;i<this.data.length;i++){
      //       sum += parseFloat(this.data[i].price)
      //     }
      //     this.priceSumData = sum.toFixed(2)
      //   },
      //结算按钮组
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
        this.orderTotal = 0;
        this.receiveTypeData = this.receiveType[index].id;
        if(this.receiveTypeData==5){
          this.formItem.tel='';
          this.formItem.name='';
          this.formItem.height='';
          this.formItem.weight='';
        }
        else if(this.receiveTypeData==4){
          this.beyond=false
        }
          let ordenprice = {};
          ordenprice.code = this.totalOrderCode;
          ordenprice.type = this.receiveTypeData;
          this.$http.get('/cashier/ordenprice',{params:ordenprice}).then(res=>{
            this.data = res.data.orders;
            this.data.map((item=>{
              this.$set(item,'realPrice',item.price);
              this.$set(item,'isMateriel',true);
              this.orderTotal += item.amount;
            }))
            console.log(this.data)
            this.amountpaid=res.data.amountpaid  //已付金额
            this.kuCard.discoune=res.data.discount;
            this.pagePrice();
          })
      },
      beyondFlag(){
        if(Number(this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice).toFixed(2)>this.sum){
          this.beyond=true
        }else{
          this.beyond=false
        }
        if(this.receiveTypeData==3||this.receiveTypeData==7){
          if(Number(this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice).toFixed(2)!=this.sum){
            this.beyond=true
          }else{
            this.beyond=false
          }
        }
        if(this.receiveTypeData==5){
          if((Number(this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice)+this.amountpaid).toFixed(2)!=this.sum){
            this.beyond=true
          }else{
            this.beyond=false
          }
        }
        if(this.receiveTypeData==6){
          this.beyond=false
        }
      },
      //截取id
      branchID(type){
        var goodsids=[];
        var orderdetailids=[];
        for(var i in this.data){
          if(this.data[i].ordentype && this.data[i].ordentype==5){
            goodsids.push(this.data[i].id)
          }else{
            orderdetailids.push(this.data[i].id)
          }
        }
        if(type=='DD'){
          return orderdetailids.join(',')
        }else{
          return goodsids.join(',')
        }


      },
      //结算打印
      JieSuan(name){
        if(this.formItem.name==''){
          this.$Message.error('请填写信息')
          return
        }
        if(this.data.length==0){
          this.$Message.error('请选择付款单')
          return
        }
        if(this.clerkID==''){
          this.$Message.error('请选择店员')
          return
        }
        if(this.receiveTypeData!=6){
          if(this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice==0){
            this.$Message.error('请输入支付金额')
            return
          }
        }
        this.beyondFlag();
        sessionStorage.setItem('data','')
        this.payWayArr=[]
        //现金的时候不走pos   其余存在走pos
        if(this.zhifu.posprice!=0&&this.zhifu.posprice!=''){this.payWayArr.push({way:'pos',pay:this.zhifu.posprice})}
        if(this.zhifu.wxprice!=0&&this.zhifu.wxprice!=''){this.payWayArr.push({way:'微信',pay:this.zhifu.wxprice})}
        if(this.zhifu.zfbprice!=0&&this.zhifu.zfbprice!=''){this.payWayArr.push({way:'支付宝',pay:this.zhifu.zfbprice})}
        this.$refs[name].validate((valid) => {
          if (valid) {
            let pay= (this.zhifu.wxprice + this.zhifu.zfbprice + this.zhifu.posprice + this.zhifu.xjprice).toFixed(2);
            if(this.receiveTypeData == 4 && (pay==this.priceSumNum)){
              this.$Message.error({
                content:'请选择正确的支付方式'
              })
              return;
            }
            let data={
              totalOrderCode:this.totalOrderCode,
              cashierOrderCode:this.cashierOrderCode, //收银单编码craft
              coolcard:this.kuCard.full,  //酷卡
              couponid:this.model13, //优惠券ID
              discount:this.kuCard.discoune,    //折扣
              strategyid:'', //店铺优惠id
              payments:{
                11 : this.zhifu.xjprice,
                12 : this.zhifu.posprice,
                13 : this.zhifu.wxprice,
                14 : this.zhifu.zfbprice,
              },  //支付方式
              remark:this.kuCard.remark,  //备注
              //实收金额
              amount:pay,
              type:this.receiveTypeData, //收款方式
              saleAmount:this.priceSumData, //销售金额
              actualAmount:this.sum, //实际金额
              totalAmount:'',
              orderdetailids:this.branchID('DD'),  //订单id
              // goodsids:this.branchID('WL'),  //物料单id
              customerName:this.formItem.name, //客户姓名
              customerTel:this.formItem.tel,   //客户电话
              weight:this.formItem.weight, // 客户体重
              height:this.formItem.height, // 客户身高
              staffid:this.clerkID,
              goodsArr:this.data,
              payAmount:this.amountpaid,  //已付金额
              priceType:this.receiveTypeData,
              goodsVOs:[],
              router:1

            };
            this.staffData.map(item=>{
              if(item.id==this.clerkID){
                data.staffname = item.name;
              }
            })
            this.data.map((item,index)=>{
              if(!item.isMateriel){
                data.goodsVOs.push(item);
              }
            })
            this.sessionData=data;
            if(!this.beyond){
              this.ZFloading=true
              if(this.payWayArr.length==0){
                this.$http.post('/cashier/settlement',data).then(res=> {
                  sessionStorage.setItem('data',JSON.stringify(this.sessionData))
                  this.ZFloading=false
                  this.$router.push('/print')
                })
              }else{
                this.threadPoxi(this.payWayArr[this.payWayIndex])
              }

            }
          }
        })


//        this.jsData.cashierOrderCode = this.cashierOrderCode
//        this.jsData.amount = this.zhifu.wxprice + this.zhifu.xjprice + this.zhifu.zfbprice + this.zhifu.posprice
//        this.jsData.type = this.receiveTypeData
//        this.jsData.saleAmount = this.priceSumData
//        this.jsData.actualAmount = this.priceSumNum
//        this.jsData.payments={
//          11 : this.zhifu.xjprice,
//          12 : this.zhifu.posprice,
//          13 : this.zhifu.wxprice,
//          14 : this.zhifu.zfbprice,
//        };
        //     this.$http.post('/cashier/settlement',this.jsData).then(res=>{
        //      console.log(res.data)
        //   }).catch(err=>{
        //     console.log(err)
        //   })
      },
      //转换pos支持的格式
      toPos(num){
        let a= Number(num).toFixed(2)+'';
        let n='';
        for(var b=a.length;b<12;b++){
          n+='0'
        }
        return n+a
      },
      // 实际调用的方法
      threadPoxi(data){
        console.log(data);
        var agentData=''
        if(data.way==='pos'){
          agentData = '0100'+this.toPos(data.pay)+"000000"+"00000000"+"000000000000";
        }else{
          agentData = '0200'+this.toPos(data.pay)+"000000"+"00000000"+"000000000000";
          console.log(agentData);
        }

        //若是ws开启状态
        if (this.websock.readyState === this.websock.OPEN) {
          console.log('OPEN');
          this.websocketsend(agentData)
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (this.websock.readyState === this.websock.CONNECTING) {
          console.log('CONNECTING');
          let that = this;//保存当前对象this
          setTimeout(function () {
            that.websocketsend(agentData)
          }, 500);
        }
        // 若未开启 ，则等待500毫秒
        else {
          console.log('else');
          this.initWebSocket();
          let that = this;//保存当前对象this
          setTimeout(function () {
            that.websocketsend(agentData)
          }, 500);
        }
      },
      //初始化weosocket
      initWebSocket(){
        //ws地址
        const wsuri = 'ws://127.0.0.1:1818';
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;

      },
      websocketonmessage(e){
        console.log(e.data);
        // if(e.data.indexOf('银行')>=0){
        //   this.sessionData.card = e.data.split(' ')[0].split('银行')[1];
        // }
        if(e.data.indexOf('交易成功')!==-1){
          this.payWayIndex++;
          if(this.payWayIndex==this.payWayArr.length){
            this.$http.post('/cashier/settlement',this.sessionData).then(res=> {
              sessionStorage.setItem('data',JSON.stringify(this.sessionData))
              this.ZFloading=false
              this.$router.push('/print')
            })

          }else {
            this.websock.close()
            this.threadPoxi(this.payWayArr[this.payWayIndex])
          }
        }else{
          console.log(e)
          this.websock.close()
          this.$Message.error(this.payWayArr[this.payWayIndex].way+'支付失败,请重新支付')
          this.threadPoxi(this.payWayArr[this.payWayIndex])
        }

      },
      websocketsend(agentData){//数据发送
        this.websock.send(agentData);
      },
      websocketclose(e){  //关闭
        console.log("服务关闭");
      },
      //最后结算转换number
      toPayNumber(str){

      },

    },

  };
</script>
<style scoped lang="scss">
  .diySelect{
    width: 90%;
    max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    position: absolute;
    top:20px;
    z-index: 2000;
    li{
      width: 100%;
      height: 35px;
      margin: 0;
      line-height: 35px;
      padding-left: 5px;
      clear: both;
      color: #495060;
      font-size: 12px!important;
      white-space: nowrap;
      list-style: none;
      cursor: pointer;
      transition: background .2s ease-in-out;
    }
  }
  .diySelectIn{
    left: 97px;
    top:25px;
    li{
      width: 200px;
    }
  }
  .samllDiySelect{
    width: 200px !important;
    li{
      width: 100%;
    }
  }
</style>
<style lang="scss">
  .zhekoulv .ivu-icon-ios-arrow-down{
    -webkit-transform:rotate(0deg) !important;
  }
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
      height: 510px;
      overflow-y: auto;
    }
    .ivu-modal-body{
      padding: 0 !important;
      .ivu-table-wrapper{
        border: 0;

        // overflow-y:scroll;
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
          padding:0 0px;
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
            color:  #657180;
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
          height: 550px;
          border: 1px solid #dde0e3;
          border-top:0;
          position: relative;
          .ivu-table th{
            border-color:#d4d4d4;
            .ivu-table-cell{
              padding:0 0px;
            }
          }
          .ivu-table td{
            height: 50px;
            .ivu-table-cell{
              white-space:normal;
              padding:0 0px;
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
          p:last-of-type {
            display:flex;
            flex-flow:row wrap;
            justify-content: center;
            i{
              font-style: normal;
              flex-basis:50%;
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
        height: 400px;
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
