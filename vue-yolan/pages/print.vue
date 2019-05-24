<template>
    <div >
        <router-view></router-view>
        <div id="print" style="width:900px;margin:10px auto">
            <p style="text-align: center;">{{printData.priceTypeName}}收据</p>
            <table id="tablePrint" width='900' cellspacing='0' border="1">
            <tr>
                <td class="align_c" style="width:100px">客户名称</td>
                <td >{{printData.customerName}}</td>
                <td class="align_c" style="width:100px">付款日期</td>
                <td >{{payDate | dateFilters}}</td>
                <td class="align_c" style="width:100px">单据编号</td>
                <td style="width:200px">{{printData.cashierOrderCode}}</td>
            </tr>
            <tr>
                <td>收款单位</td>
                <td >酷特云蓝</td>
                <td>合同编号</td>
                <td></td>
                <td>实收金额</td>
                <td >{{printData.amount}}</td>
            </tr>
            <tr>
                <td>数量 商品</td>
                <td colspan="5">
                    <span style="float:left;padding:0 5px" v-for="(item,index) in goodsData" :key="index">{{item.amount + ' ' +item.clothname}}</span>
                </td>
            </tr>
            <tr>
                <td colspan="2" >付款方式</td>
                <td colspan="2" >付款金额</td>
                <td style="width:140px">卡号</td>
                <td>备注</td>
            </tr>
            <tr v-for="(item,index) in payWayArr" :key="index">
                <td colspan="2" ref="way">{{item.way}}</td>
                <td colspan="2" >{{item.pay}}</td>
                <td></td>
                <td></td>
            </tr>
            <tr v-if='printData.tradeNo'>
              <td >流水号</td>
              <td  colspan="5">{{printData.tradeNo}}</td>
            </tr>
        </table>
        <div class="Remarks" style="width: 900px;height: 40px;line-height: 40px;text-align: left;border-bottom: 2px solid #000;font-size: 14px;">
            备注:{{printData.remark}}
        </div>
        <div class="info_b" style="width: 900px;display: flex;">
           <div style="width: 33.3%;font-size: 14px;">
               制单：{{printData.staffname}}
           </div>
           <div style="width: 33.3%;font-size: 14px;">
               收款：
           </div>
           <div style="width: 33.3%;font-size: 14px;">
               审核：
           </div>
        </div>

        </div>
            <Button id="printBtn" @click="printReceipt">打印收据</Button>
            <Button class="return"  @click="returnIndex">返回</Button>
    </div>
</template>
<script>
export default {
  data() {
    return {
      printData: {},
      loginName: "",
      goods: [],
      goodsData:[],
      payDate:'',
      payWayArr: [],
      searchFrom: {
        username: "",
        // orderid:'',
        pageIndex: 1,
        pageSize: 10,
        createDate: "",
        beginTime: "",
        endTime: ""
      },
      router:''
    };
  },
  mounted() {
    this.getData();
  },
  filters: {
    dateFilters: function(input) {
      var d = new Date(input);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
      // var hour = d.getHours();
      // var minutes = d.getMinutes();
      // var seconds = d.getSeconds();
      return year + "-" + month + "-" + day + " ";
    }
  },
  methods: {
    getData() {
      let mes = sessionStorage.getItem("data");
      this.searchFrom.username = sessionStorage.getItem("login");
      let data = JSON.parse(mes);
      this.router = data.router;
      if(data.payDate){
        this.payDate = data.payDate;
      }else{
        this.payDate = Date.now();
      }
        this.card = data.card;
        if (data.priceType == 3) {
          data.priceTypeName = "全款";
        } else if (data.priceType == 4) {
          data.priceTypeName = "定金";
        } else if (data.priceType == 5) {
          data.priceTypeName = "尾款";
        } else if (data.priceType == 6) {
          data.priceTypeName = "免单";
        } else if (data.priceType == 7) {
          data.priceTypeName = "工装";
        }
        this.$http.get("/member", { params: this.searchFrom }).then(res => {
          // console.log(res.data.data[0].name)
          this.loginName = res.data.data[0].name;
        });

        if (data != null) {
          this.printData = data;
          if (this.printData.payments["11"] != 0 && this.printData.payments["11"]) {
            this.payWayArr.push({
              way: "现金",
              pay: this.printData.payments["11"]
            });
          }
          if (this.printData.payments["12"] != 0 && this.printData.payments["12"]) {
            this.payWayArr.push({
              way: "pos刷卡",
              pay: this.printData.payments["12"]
            });
          }
          if (this.printData.payments["13"] != 0 && this.printData.payments["13"]) {
            this.payWayArr.push({
              way: "微信",
              pay: this.printData.payments["13"]
            });
          }
          if (this.printData.payments["14"] != 0 && this.printData.payments["14"]) {
            this.payWayArr.push({
              way: "支付宝",
              pay: this.printData.payments["14"]
            });
          }
          let goodsData = data.goodsArr;
          this.goodsData = goodsData;
          this.goodsData.map(item=>{
            if(item.name){
              this.$set(item,'clothname',item.name)
            }
          })
          let arr = [];
          // for (var p in goodsData) {
          //   arr.push(goodsData[p].clothname);
          // }
          // for (var p in goodsData) {
          //   arr.push(goodsData[p].name);
          // }
          // this.goods = Array.from(new Set(arr));
          this.$http.get("/member", this.loginName).then(res => {
            console.log(res.data);
          });
        }


    },
    printReceipt() {
      let newWindow = window.open("_blank"); //打开新窗口
      let codestr = document.getElementById("print").innerHTML; //获取需要生成pdf页面的div代码
      newWindow.document.write(codestr); //向文档写入HTML表达式或者JavaScript代码
      newWindow.document.close(); //关闭document的输出流, 显示选定的数据
      newWindow.print(); //打印当前窗口
      return true;
    },
    returnIndex() {
      if(this.router==1){
        this.$router.push("/home/money");
      }else{
        this.$router.push("/home/cashier/cashier-form");
      }
    }
  }
};
</script>
<style lang='scss' scoped>
#tablePrint {
  width: 900px !important;
  text-indent:10px;
}
table tr td {
  text-align: left;
  color: #000;
  font-size: 12px;
  border: 1px solid #000;
}
.align_c {
  width: 100px;
}
// .Remarks{
//     width: 900px;
//     height: 40px;
//     line-height: 40px;
//     text-align: left;
//     border-bottom: 2px solid #000;
//     font-size: 14px;
// }
// .info_b{
//     width: 900px;
//     display: flex;
// }
// .info_b div{
//     width: 33.3%;
//     font-size: 14px;
// }
#printBtn {
  margin-left: 620px;
  margin-top: 30px;
}
.return {
  margin-top: 30px;
}
</style>
