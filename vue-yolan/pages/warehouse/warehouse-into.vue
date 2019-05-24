<style lang='scss' scoped>
    .lookIntoModal-wrap .ivu-form-item{
        border:none;
    }
    .lookIntoModal-wrap .big-sized .ivu-modal-body{
        border-bottom:none!important;
    }
    .ivu-modal-wrap .ivu-form-item .ivu-input-wrapper{
        width:100%;
    }
    .ivu-date-picker{
        width:100%;
        line-height:3;
    }
    .addAllocationModal .ivu-modal-mask,.addAllocationModal .ivu-modal-wrap{
        z-index:2000;
    }
   .lookIntoModal-wrap .ivu-form-item {
        width: 272px;
        height: 30px;
        margin-bottom: 10px;
        margin-right: 4px;
    }
    .uploadButton{
    outline: none;
    padding: 3px 6px;
    border-radius: 15px;
    font-weight: 100;
    border: none;
    color: #464c5b;
  }
  .uploadButton:hover{
    background-color: #F4EEE5;
  }
  .uploadButton:focus{
    box-shadow:0 0 0 0
  }
  .warehouseInto-wrap .specialHandling{
    width:100px;
    border:none;
  }
  .searchStyle .specialHandling .ivu-btn{
      border:1px solid #dddee1;
      width:43%;
  }
  .searchMatterForm>.ivu-form-item:not(:first-child){
      width:150px;
  }
  .searchMatterForm>.ivu-form-item:last-child{
      width:40px;
      height:100%;
      border:none;
  }
  .ivu-input-icon{
      line-height:30px;
  }
  .ivu-form-item-content button{
    vertical-align: inherit;
  }
</style>
<template>
    <div class="warehouseInto-wrap spaceBetween" v-com>
           <div class="allShow white-bottom">
            <header-slot>
                <span slot="header" class="com-slot-left">
                    <span>当前位置：</span>
                    <span>仓库管理 /</span>
                    <span>入库管理</span>
                </span>
                <span slot="footer" class="com-slot-right">
                    <span class="T3 main-heading" @click="insertMatterModalShow">
                        <span class="shade">
                            <span class="colorBox colorBoxYellow" style="text-align:center">
                                <Icon type="ios-plus-outline" style="margin-left:-1px"></Icon>
                            </span>
                        物料入库
                        </span>
                    </span>
                    <!-- 暂时屏蔽 -->
                    <!-- <span class="T3 main-heading" @click="InsertOrderIntoShow=true">
                        <span class="shade">
                            <span class="colorBox colorBoxBlue" style="text-align:center">
                                <Icon type="ios-plus-outline" style="margin-left:-1px"></Icon>
                            </span>
                        订单号入库
                        </span>
                    </span>
                    <span class="T3 main-heading" @click="InsertAllocationShow=true">
                        <span class="shade">
                            <span class="colorBox colorBoxGreen" style="text-align:center">
                                <Icon type="ios-plus-outline" style="margin-left:-1px"></Icon>
                            </span>
                        调拨入库
                        </span>
                    </span> -->
                    <span class="T3 main-heading" @click="outPut">
                        <span class="shade">
                            <span class="colorBox colorBoxOrange">
                                <Icon type="arrow-down-a" style="margin-left: 5px"></Icon>
                            </span>导出
                        </span>
                    </span>
                </span>
            </header-slot>
            <div class="tableDistance">
                <Form class="searchForm searchStyle" label-position="left" inline ref='formSearch' :model='searchForm'>
                    <Form-item label="入库方式" :label-width="80" class="specialCase" prop='transtype'>
                        <Select v-model="searchForm.mode">
                            <Option v-for="item in intoWayList" :value="item.id" :key="item.id">{{item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="入库类型" :label-width="80" class="specialCase" prop='mode'>
                        <Select v-model="searchForm.transtype">
                            <Option v-for="item in intoTypeList" :value="item.id" :key="item.id">{{ item.name}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="关键字搜索" :label-width="80" class="specialCase" prop='keyword'>
                        <Input v-model="searchForm.keyword" @on-enter="search()"></Input>
                    </Form-item>
                    <Form-item label="入库时间" :label-width="80" class="specialCase" style='width:305px' prop='createDate'>
                        <Date-picker type="daterange" v-model="searchForm.createDate"  :options="date0ptions"></Date-picker>
                    </Form-item>
                    <Form-item class="specialHandling .specialHandling">
                        <Button icon="search" @click="search" @on-enter="search"></Button>
                        <Button type="ghost" @click="reset('formSearch')" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Form>
                <div style="clear: both"></div>
                <div id="tableBox" ref="tableBox">
                    <Table border :columns="columns" :data="data" ref='matterTable' @on-select='warehouseIntoSelect' @on-select-all='warehouseIntoSelectAll'></Table>
                </div>
                <page-current ref="pages" class="pages-position" :total="totals" @pageChange="pageListen"></page-current>
            </div>
        </div>
        <!-- 查看入库信息 -->
        <div v-if="LookIntoShow">
            <Modal v-model="LookIntoShow" :mask-closable='false'  width="770" v-drag class='lookIntoModal-wrap'>
                <p slot="header">
                    <span class="main-heading">单号详情</span>
                </p>
                <div class="modalContent" style="text-align:center">
                    <h4>基本信息</h4>
                    <Form ref="LookIntoInfo" class="searchForm" label-position="left" :model="LookIntoInfo"  inline style="text-align: left;padding:15px 20px 0">
                        <Form-item prop="intoNumber"  label="入库单号:" :label-width="70" >
                            <div v-html="LookIntoInfo.code"></div>
                        </Form-item>
                        <Form-item prop="shopName"  label="门店:" :label-width="70" >
                            <div v-html="LookIntoInfo.storename"></div>
                        </Form-item>
                        <Form-item prop="intoType"  label="入库类型:" :label-width="70" >
                            <div v-html="LookIntoInfo.modename"></div>
                        </Form-item>
                        <Form-item prop="intiTime"  label="入库时间:" :label-width="70" >
                            <div v-html="LookIntoInfo.storageDate"></div>
                        </Form-item>
                        <Form-item prop="explain"  label="说明:" :label-width="50" class='form-item-block' style='width:95%'>
                            <div v-html="LookIntoInfo.remark"></div>
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
        <!-- 物料入库 -->
        <div v-if="InsertMatterIntoShow">
            <Modal v-model="InsertMatterIntoShow"  ref='InsertMatterIntoRules'
                    class-name="delect big-sized"
                    :mask-closable='false'
                     :closable="false"
                    width="870">
                <p slot="header">
                    <span class="main-heading">物料入库</span>
                </p>
                <div class="modalContent" style="text-align:center">
                    <Form ref="MatterIntoInfo" class="searchForm" label-position="left" :model="MatterIntoInfo" :rules='MatterOutInfoRules' inline style="text-align: left;padding:15px 20px 0">
                        <Form-item prop="code"  label="入库单号:" :label-width="70">
                            <Input v-model="MatterIntoInfo.code" disabled></Input>
                        </Form-item>
                        <Form-item prop="shopName"  label="门店:" :label-width="70">
                            <Input v-model="shopName" disabled></Input>
                        </Form-item>
                        <Form-item prop="transtype"  label="入库类型:" :label-width="70" >
                            <Select v-model="MatterIntoInfo.transtype">
                                <Option v-for="item in intoTypeList" :value="item.id" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </Form-item>
                        <Form-item prop="storageDate"  label="入库时间:" :label-width="70" >
                            <DatePicker type="datetime" v-model='MatterIntoInfo.storageDate' class='matterInto-timeWrap'></DatePicker>
                        </Form-item>
                        <Form-item prop="remark"  label="说明:" :label-width="70" class='form-item-block' style='width:95%'>
                            <Input v-model="MatterIntoInfo.remark"></Input>
                        </Form-item>
                    </Form>
                    <div style='padding: 5px 20px 15px;text-align:left'>
                        <Button type="primary" @click='addMatterShow'>新增物料</Button>
                    </div>
                    <div class="styleDetail" style='padding:0 20px'>
                        <Table border height="300" :columns="MatterIntocolumns" :data="MatterIntoInfo.list"></Table>
                    </div>
                </div>
                <div slot='footer'>
                    <Button  class="save" @click="insertMatterOK('MatterIntoInfo')">确认</Button>
                    <Button  class="clear" @click="InsertMatterCancels('MatterIntoInfo')">取消</Button>
                </div>
            </Modal>
        </div>
        <!-- 订单号入库 -->
        <div v-if="InsertOrderIntoShow">
            <Modal v-model="InsertOrderIntoShow" class-name="delect big-sized" :mask-closable='false'  width="700" v-drag @on-cancel="cancels('MatterIntoInfo')">
                <p slot="header">
                    <span class="main-heading">订单号入库</span>
                </p>
                <div class="modalContent" style="text-align:center">
                    <Form ref="OrderIntoInfo" class="searchForm" label-position="left" :model="OrderIntoInfo" inline style="text-align: left;padding:15px 20px 0">
                        <Form-item prop="intoNumber"  label="入库单号:" :label-width="90" >
                            <Input v-model="OrderIntoInfo.intoNumber" readonly></Input>
                        </Form-item>
                        <Form-item prop="shopName"  label="门店:" :label-width="70" >
                            <Input v-model="OrderIntoInfo.shopName" readonly></Input>
                        </Form-item>
                        <Form-item prop="shopName"  label="订单号:" :label-width="70" >
                            <Input v-model="OrderIntoInfo.orderID" icon="ios-search" @on-click='searchOrderShow=true'></Input>
                        </Form-item>
                        <Form-item prop="intoType"  label="入库类型:" :label-width="70" >
                            <Select v-model="OrderIntoInfo.intoType">
                                <Option v-for="item in matterTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item prop="intiTime"  label="入库时间:" :label-width="70" >
                            <DatePicker type="date"></DatePicker>
                        </Form-item>
                        <Form-item prop="intiTime"  label="订单价格:" :label-width="70" >
                            <Input v-model="OrderIntoInfo.orderPrice" readonly></Input>
                        </Form-item>
                        <Form-item prop="explain"  label="说明:" :label-width="70" class='form-item-block' style='width:95%'>
                            <Input v-model="OrderIntoInfo.explain" readonly></Input>
                        </Form-item>
                    </Form>
                    <div class="styleDetail" style='padding:0 20px'>
                        <Table border :columns="OrderIntocolumns" :data="OrderIntoData"></Table>
                    </div>
                </div>
            </Modal>
        </div>
        <!-- 调拨入库 -->
        <div v-if="InsertAllocationShow">
            <Modal v-model="InsertAllocationShow" class-name="delect big-sized" :mask-closable=false  width="700" v-drag @on-cancel="cancels('AllocationIntoInfo')">
                <p slot="header">
                    <span class="main-heading">订单号入库</span>
                </p>
                <div class="modalContent" style="text-align:center">
                    <Form ref="AllocationIntoInfo" class="searchForm" label-position="left" :model="AllocationIntoInfo" inline style="text-align: left;padding:15px 20px 0">
                        <Form-item prop="intoNumber"  label="入库单号:" :label-width="90" >
                            <Input v-model="AllocationIntoInfo.intoNumber" readonly></Input>
                        </Form-item>
                        <Form-item prop="shopName"  label="调拨单号:" :label-width="70" >
                            <Input v-model="AllocationIntoInfo.allocationNumber" icon="ios-search" @on-click='searchAllocationShow=true'></Input>
                        </Form-item>
                        <Form-item prop="intoTime"  label="入库时间:" :label-width="70" >
                            <DatePicker type="date"></DatePicker>
                        </Form-item>
                        <Form-item prop='outToShop' label="调出门店:" :label-width="70" >
                            <Input v-model="AllocationIntoInfo.outToShop" readonly></Input>
                        </Form-item>
                        <Form-item prop='intoShop' label="调入门店:" :label-width="70" >
                            <Input v-model="AllocationIntoInfo.intoShop" readonly></Input>
                        </Form-item>
                        <Form-item prop="intoType"  label="入库类型:" :label-width="70" >
                            <Select v-model="AllocationIntoInfo.intoType">
                                <Option v-for="item in matterTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item prop="explain"  label="说明:" :label-width="70" class='form-item-block' style='width:95%'>
                            <Input v-model="AllocationIntoInfo.explain"></Input>
                        </Form-item>
                    </Form>
                </div>
            </Modal>
        </div>
        <!-- 新增物料 -->
        <div v-if='addAllocationShow' class='addAllocationShow'>
            <Modal v-model='addAllocationShow' class-name="delect big-sized" :mask-closable='false'  width="870" v-drag>
                <p slot="header">
                    <span class="main-heading">物料</span>
                </p>
                <div class="modalContent" style="padding:0 15px">
                    <div class="tableDistance">
                        <Form ref="OrderIntoInfo" class="searchMatterForm" label-position="left" :model="addMaterielForm" inline style="text-align: left;padding:15px 20px 0">
                            <Form-item prop="intoNumber"  label="物料类型:" :label-width="90">
                                <Select v-model='addMaterielForm.category'>
                                    <Option v-for='item in addMaterielGoodsList' :value="item.id" :key="item.id" :label='item.name'></Option>
                                </Select>
                            </Form-item>
                            <Form-item label='编码:' prop='code' :label-width='55'>
                                <Input v-model='addMaterielForm.code'></Input>
                            </Form-item>
                            <Form-item label='名称:' prop='name' :label-width='55'>
                                <Input v-model='addMaterielForm.name'></Input>
                            </Form-item>
                            <Form-item class="specialHandling .specialHandling">
                                <Button icon="search" @click='addMaterielSearch'></Button>
                            </Form-item>
                        </Form>
                        <Table border :columns="addAllocationcolumns" :data="addAllocationData" @on-select='addMaterieltableSelect' @on-select-all='addMaterieltableSelectAll'></Table>
                        <page-current ref="addMaterielPages" class="pages-position addMateriel" :total="addMaterieltotals" @pageChange="addMaterielpageListen"></page-current>
                    </div>
                </div>
                <div slot='footer'>
                    <Button  class="save" @click="addMaterielOK('OrderIntoInfo')">确认</Button>
                    <Button  class="clear" @click="addMaterielCancels('OrderIntoInfo')">取消</Button>
                </div>
            </Modal>
        </div>
        <!-- 搜索订单 -->
        <div v-if='searchOrderShow'>
            <Modal v-model='searchOrderShow' class-name="delect big-sized" :mask-closable=false  width="700" v-drag>
                <p slot="header">
                    <span class="main-heading">订单</span>
                </p>
                <div class="modalContent" style="padding:0 15px">
                    <div class='searchOrderModal-searchWrap'>
                        <Input type='text' size='large' placeholder="搜索"></Input>
                    </div>
                    <div>
                        <Table border :columns="addAllocationcolumns" :data="addAllocationData"></Table>
                    </div>
                </div>
            </Modal>
        </div>
        <!-- 搜索调拨单 -->
        <div v-if='searchAllocationShow'>
            <Modal v-model='searchAllocationShow' class-name="delect big-sized" :mask-closable=false  width="700" v-drag>
                <p slot="header">
                    <span class="main-heading">调拨单</span>
                </p>
                <div class="modalContent" style="padding:0 15px">
                    <div class='searchOrderModal-searchWrap'>
                        <Input type='text' size='large' placeholder="搜索"></Input>
                    </div>
                    <div>
                        <Table border :columns="searchAllocationcolumns" :data="searchAllocationData"></Table>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                InsertMatterShow:false,
                InsertOrderIDShow:false,
                InsertAllocationShow:false,
                addOperateList:[],
                searchForm:{
                    createDate:'',
                    pageIndex:1,
                    pageSize:10,
                    mode:'',
                    transtype:'',
                    keyword:'',
                    beginTime:'',
                    endTime:''
                },
                // 导出数据
                esvData:[],
                intoWayList:[],
                intoTypeList:[],
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
                columns:[
                    {
                        title: '序号',
                        // width:'4%',
                        key:'index',
                        align: 'center',
                    },
                    {
                        title:'入库单号',
                        key:'code',
                        align: 'center',
                    },
                    {
                        title:'门店名称',
                        key:'storename',
                        align: 'center',
                    },
                    {
                        title:'入库类型',
                        key:'transtypename',
                        align: 'center',
                    },
                    {
                        title:'入库时间',
                        key:'storageDate',
                        align: 'center',
                    },
                    {
                        title:'入库方式',
                        key:'modename',
                        align: 'center',
                    },
                    {
                        title:'入库来源',
                        key:'source',
                        align: 'center',
                    },
                    {
                        title:'操作',
                        key:'id',
                        align:'center',
                        render: (h,params) => {
                            return h('div',
                                [
                                    h('Button',{
                                        class:'greenButton',
                                        style:{
                                            marginLeft:'8px',
                                            background:'#fff',
                                        },
                                        on:{
                                            click: () => {
                                                this.warehouseIntoViewDetail(params);
                                            }
                                        }
                                    },
                                    [
                                        h('i',{
                                            class:'iconfont  icon-chakan',
                                        }),
                                        h('span',{
                                            },'查看详情')
                                    ])
                            ])
                        }
                    }
                ],
                data:[],
                totals:0,
                LookIntoShow:false,
                LookIntoInfo:{
                    intoNumber:'',
                    shopName:'',
                    intoType:'',
                    intoTime:'',
                    explain:''

                },
                LookIntocolumns:[
                    {
                        title: '序号',
                        width:'8%',
                        type:'index',
                        align: 'center',
                    },
                    {
                        title:'物料编码',
                        width:'15%',
                        key:'code',
                        align: 'center',
                    },
                    {
                       title:'物料名称',
                        width:'15%',
                        key:'name',
                        align: 'center',
                    },
                    {
                        title:'数量',
                        key:'amount',
                        align: 'center',
                    },
                    {
                        title:'单位',
                        key:'unitname',
                        align: 'center',
                    },
                    {
                        title:'单价',
                        key:'price',
                        align: 'center',
                    },
                    {
                        title:'仓库',
                        key:'warehouse',
                        align: 'center',
                    },
                    {
                        title:'库位',
                        key:'storagelocation',
                        align: 'center',
                    },
                    // {
                    //     title:'批次',
                    //     key:'batch',
                    //     align: 'center',
                    // },
                ],
                LookIntodata:[],
                // 物料入库
                InsertMatterIntoShow:false,
                MatterIntoInfo:{
                    storeid:null,
                    storecode:'',
                    transtype:41,
                    storageDate:'',
                    code:'',
                    remark:'',
                    list:[],
                    locationList:[]

                },
                 MatterOutInfoRules:{
                    storageDate:[
                        {requied:true,type: 'date',message:'出库时间不能为空',trigger:'change'}
                    ]
                },
                InsertMatterIntoRules:{
                    code:[
                        {requied:true,message:'入库单号不能为空',trigger:'blur'}
                    ],
                    shopName:[
                        {requied:true,message:'门店不能为空',trigger:'blur'}
                    ],
                    transtype:[
                        {requied:true,message:'入库类型不能为空',trigger:'blur'}
                    ],
                    storageDate:[
                        {requied:true,message:'入库时间不能为空',trigger:'blur'}
                    ]
                },
                shopName:'',
                MatterIntocolumns:[
                    {
                        title:'物料编码',
                        width:'18%',
                        key:'code',
                        align: 'center',
                    },
                    {
                       title:'物料名称',

                        key:'name',
                        align: 'center',
                    },
                    {
                        title:'数量',
                        type:'id',
                        width:'11%',
                        align: 'center',
                        render:(h,params) => {
                            return h('div',[
                                h('InputNumber',{
                                    props:{
                                        min:0,
                                        value: this.MatterIntoInfo.list[params.index].amount
                                    },
                                    on: {
                                        'on-change':(val) => {
                                           this.MatterIntoInfo.list[params.index].amount = val;
                                        }
                                    },
                                    style:{
                                        width:'57px',
                                        borderStyle:'solid',
                                        borderWidth:'1px',
                                        borderColor:'#dddee1'
                                    },
                                })
                            ])
                        }
                    },
                    {
                        title:'单位',
                        key:'unitname',
                        align: 'center',
                    },
                    {
                        title:'单价',
                        key:'price',
                        align: 'center',
                    },
                    {
                        title:'仓库',
                        key: 'action',
                        width:'13%',
                        align: 'center',
                        render: (h, params) => {
                            var params = params;
                            return h('Select', {
                                props:{
                                    value: this.MatterIntoInfo.list[params.index].warehouse,
                                    'label-in-value':true
                                },
                                on: {
                                    'on-change':(val) => {
                                        this.MatterIntoInfo.list[params.index].warehouseid = val.label;
                                        this.MatterIntoInfo.list[params.index].warehouse = val.value;
                                         this.warehouseSelect(val,params.index);
                                    }
                                },
                            },
                            this.addMateriel.warehouseList.map(function(type){
                                return h('Option', {
                                    props: {
                                        value: type.id,
                                        label:type.name
                                    }
                                }, type);
                            })
                            );
                        },
                    },
                    {
                        title:'库位',
                        type:'matterInto',
                         width:'13%',
                        align: 'center',
                        render:(h,params) => {
                            return h('Select', {
                                props:{
                                    value:this.MatterIntoInfo.list[params.index].location,
                                    'label-in-value':true
                                },
                                on:{
                                    'on-change':(val) => {
                                        this.MatterIntoInfo.list[params.index].storagelocationid = val.label;
                                        this.MatterIntoInfo.list[params.index].location = val.value;
                                    }
                                }
                            },
                            this.MatterIntoInfo.locationList[params.index].map(function(item){
                                return h('Option',{
                                    props:{
                                        value:item.id,
                                        label:item.name
                                    }
                                })
                            })
                            )
                        }
                    },
                    // 暂时屏蔽
                    // {
                    //     title:'批次',
                    //     type:'matterInto',
                    //      width:'13%',
                    //     align: 'center',
                    //     render:(h) => {
                    //         return h('Select',{
                    //             props:{
                    //                 value:0
                    //             }
                    //         },[
                    //             h('Option',{},'你好')
                    //         ])
                    //     }
                    // },
                    {
                        title:'操作',
                        key:'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    },
                ],
                // 物料入库-表格
                addMateriel:{
                    number:0,
                    warehouse:'',
                    warehouseList:[],
                    location:'',
                    locationList:[],
                    batch:''
                },
                MatterIntodata:[],
                // 订单号入库
                InsertOrderIntoShow:false,
                OrderIntoInfo:{},
                OrderIntocolumns:[
                    {
                        title:'编码',
                        type:'orderCode',
                        align:'center'
                    },
                    {
                        title:'服装分类',
                        type:'orderClassification',
                        align:'center'
                    },
                    {
                        title:'数量',
                        type:'orderNumber',
                        align:'center'
                    },
                    {
                        title:'仓库',
                        type:'orderWarehouse',
                        align:'center'
                    },
                    {
                        title:'库位',
                        type:'orderLibrary',
                        align:'center'
                    }
                ],
                OrderIntoData:[],
                // 调拨入库
                AllocationIntoInfo:{},
                // 新增物料
                addAllocationShow:false,
                addAllocationcolumns:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title:'物料编码',
                        key:'code',
                        align:'center'
                    },
                    {
                        title:'物料名称',
                        key:'name',
                        align:'center'
                    },
                    {
                        title:'规格型号',
                        key:'',
                        align:'center'
                    },
                    {
                        title:'单位',
                        key:'unitname',
                        align:'center'
                    },
                    {
                        title:'单价',
                        key:'price',
                        align:'center'
                    },
                    {
                        title:'物料说明',
                        key:'remark',
                        align:'center'
                    }
                ],
                addAllocationData:[],
                // 搜索订单
                searchOrderShow:false,
                // 搜索调货单
                searchAllocationShow:false,
                searchAllocationcolumns:[
                    {
                        title:'序号',
                        type:'index',
                        align:'center'
                    },
                    {
                        title:'申请时间',
                        type:'',
                        align:'center'
                    },
                    {
                        title:'调入门店',
                        type:'',
                        align:'center'
                    },
                    {
                        title:'调出门店',
                        type:'',
                        align:'center',
                    },
                    {
                        title:'调拨单号',
                        type:'',
                        align:'center'
                    }
                ],
                searchAllocationData:[],
                // 新增物料-搜索
                addMaterielForm:{
                    pageIndex:1,
                    pageSize:10,
                    category:'',
                    code:'',
                    name:'',
                },
                // 新增物料搜索-下拉框选项
                addMaterielGoodsList:[],
                // 新增物料-分页
                addMaterieltotals:0,
                // 物料入库-表格数据
                addMaterielTableSelection:[]
            }
        },
        mounted() {
            this.getInstorageWay();
            this.getInstorageType();
            this.getInstorageList();
            this.getMaterielSelectList();
            this.getStoreInfo();
        },
        methods: {
             /** =============== 时间处理begin ================ **/
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
            // 获取现在时间
            getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                        + " " + date.getHours() + seperator2 + date.getMinutes()
                        + seperator2 + date.getSeconds();
                return currentdate;
            },
             /** =============== 时间处理end ==================== **/

             /** =============== 搜索begin ====================== **/

             // 搜索-入库方式
            getInstorageWay(){
                this.$http.get('/instorage/mode').then((res) => {
                    this.intoWayList  = res.data;
                })
            },
            // 搜索-入库类型
            getInstorageType(){
                this.$http.get('/instorage/type').then((res) => {
                    this.intoTypeList= res.data;
                })
            },
             // 搜索-搜索按钮
            search(){
                this.getInstorageList();
            },
            // 搜索-重置按钮
            reset(form){
                this.$refs[form].resetFields();
                this.getInstorageList();
            },
            /** ================ 搜索end ======================= **/

            /** =============== 物料入库begin ================== **/
            // 物料入库-导出
            outPut(){
                 if (this.searchForm.createDate[0].length>0) {
                    this.searchForm.beginTime = this.setDate(this.searchForm.createDate[0]);
                    this.searchForm.endTime = this.setDate(this.searchForm.createDate[1]);
                } else {
                    this.searchForm.beginTime = '';
                    this.searchForm.endTime = ''
                }
                this.$http.post('/instorage/export',this.searchForm).then((res) => {
                     let resData = res.data;
                    resData.map((val,index) => {
                        val.storageDate = this.setTime(val.storageDate);
                        val.index = index + 1;
                    })
                    this.$refs.matterTable.exportCsv({
                        filename: '入库管理',
                        columns: this.columns.filter((col, index) => index < 7),
                        data:resData
                    });
                })
            },
            // 物料入库-主表格选中某一行
            warehouseIntoSelect(selection,row){
                this.esvData = selection;
                // console.log(selection)
            },
            warehouseIntoSelectAll(selection,row){
                this.esvData = selection;
                //  console.log(selection)
            },
            // 物料入库-查询门店
            getStoreInfo(){
                this.$http.get('/store/info')
                        .then((res) => {
                            // console.log(res.data);
                            this.MatterIntoInfo.storeid = res.data.id;
                            this.MatterIntoInfo.id = res.data.id;
                            this.shopName = res.data.name;
                            this.MatterIntoInfo.storecode = res.data.code;
                        })
            },
            // 物料入库-modal框显示
            insertMatterModalShow(){
                // 物料入库-入库单号
                this.$http.get('/instorage/incode').then((res) => {
                    this.MatterIntoInfo.code = res.data;
                    // this.MatterIntoInfo.storeid = res.data;
                    this.InsertMatterIntoShow=true;
                    this.MatterIntoInfo.storageDate = this.getNowFormatDate();
                })
            },
            // 物料入库-入库列表
            getInstorageList(){
                if (this.searchForm.createDate[0].length>0) {
                    this.searchForm.beginTime = this.setDate(this.searchForm.createDate[0]);
                    this.searchForm.endTime = this.setDate(this.searchForm.createDate[1]);
                } else {
                    this.searchForm.beginTime = '';
                    this.searchForm.endTime = ''
                }
                this.$http.get('/instorages',{params:this.searchForm}).then((res) => {
                    let resData = res.data;
                    resData.data.map((val,index) => {
                        val.storageDate = this.setTime(val.storageDate);
                         val.index = index + 1;
                    })
                    this.data = resData.data;
                    this.totals = resData.total;
                })
            },
            // 物料入库-入库列表查看详情
            warehouseIntoViewDetail(params){
                this.LookIntoShow = true;
                this.LookIntoInfo= JSON.parse(JSON.stringify(params.row));
                this.$http.get('/instorage/'+params.row.id).then((res) => {
                    this. LookIntodata = res.data.list;
                })
            },
            // 物料入库-确定添加
            insertMatterOK(form){
                console.log( this.MatterIntoInfo.list)
                 this.$refs[form].validate((valid) => {
                     if (valid) {
                          let len = this.MatterIntoInfo.list.length;
                            if(len>=1){
                                let bool = this.MatterIntoInfo.list.every((item) => {
                                    return item.warehouseid
                                })
                                if(bool){
                                    this.$http.post('/instorage/material',this.MatterIntoInfo)
                                    .then((res) => {
                                        console.log(res.data);
                                       this.MatterIntoInfo.locationList = [];
                                       this.MatterIntoInfo.list = [];
                                        this.$Message.success('保存成功!');
                                        this.InsertMatterIntoShow = false;
                                        this.$refs[form].resetFields();
                                        this.getInstorageList();
                                })
                                }else{
                                    this.$Message.error('仓库为必填项！');
                                }
                            }else{
                                this.$Message.error('请新增物料！');
                            }
                                }
                            })
            },
            // 物料入库-modal取消
            InsertMatterCancels(form){
                let len = this.MatterIntoInfo.locationList.length;
                this.MatterIntoInfo.locationList.splice(0,len);
                this.MatterIntoInfo.list = [];
                this.$refs[form].resetFields();
                this.InsertMatterIntoShow = false;
            },
            // 入库管理
            addMatterShow(){
                let _this = this;
                function getGoodsCategory(){
                    return _this.$http.get('/goods/category');
                }
                function getGoodsList(){
                    return _this.$http.get('/goods/list',{params:_this.addMaterielForm});
                }
                this.$http.all([getGoodsCategory(),getGoodsList()])
                .then(_this.$http.spread(function(category,list){
                    this.addAllocationData = list.data.data;
                    this.addMaterieltotals = list.data.total;
                    this.addMaterielGoodsList = category.data;
                    this.addAllocationShow = true;

                }.bind(_this)))
            },
            // 获取物料下拉选项列表
            getMaterielSelectList(){
                this.$http.get('/warehouse/list').then((res)=>{
                    this.addMateriel.warehouseList = res.data;
                })
            },
            // 物料入库-仓库select
            warehouseSelect(val,index){
                this.$http.get('/storagelocation/list',{params:{
                  warehouseid:val.value
                }}).then((res) => {
                    this.$set(this.MatterIntoInfo.locationList,index,res.data);
                })
            },
             // 分页
            pageListen(data){
                this.searchForm.pageIndex=data.pageIndex;
                this.searchForm.pageSize=data.pageSize;
                this.getInstorageList();
            },
            remove(index){
                 this.MatterIntoInfo.list.splice(index,1);
            },
            /** ==================== 新增物料 ================== **/

            // 新增物料-公共请求列表
            addMaterielCommonGetList(){
                this.$http.get('/goods/list',{params:this.addMaterielForm})
                          .then((res) => {
                               this.addAllocationData = res.data.data;
                               this.addMaterieltotals = res.data.total;
                          })
            },
            // 新增物料-搜索
            addMaterielSearch(){
                this.addMaterielCommonGetList();
            },
            // 新增物料-换页
            addMaterielpageListen(data){
                this.addMaterielForm.pageIndex=data.pageIndex;
                this.addMaterielForm.pageSize=data.pageSize;
                this.addMaterielCommonGetList();
            },
            // 新增物料-选择表格某一项
            addMaterieltableSelect(selection,row){
                this.addMaterielTableSelection = selection;

            },
            // 新增物料-全选
            addMaterieltableSelectAll(selection){
                this.addMaterielTableSelection = selection;
            },
            // 新增物料-确认
            addMaterielOK(form){
                let o;
                this.addAllocationShow = false;
                 this.addMaterielTableSelection.map((item,index) => {
                     o = {
                        code:item.code,
                        materielid:item.id,
                        category:0,
                        amount:1,
                        price:item.price,
                        warehouseid:null,
                        storagelocationid:null,
                    };
                    o = Object.assign(this.addMaterielTableSelection[index],o);
                    this.$set(this.MatterIntoInfo.list,index,o);
                    this.MatterIntoInfo.locationList.push([]);
                });
                this.addMaterielTableSelection = [];
                this.$refs[form].resetFields();
            },
             // 新增物料-取消
            addMaterielCancels(form){
                this.addAllocationShow = false;
                this.$refs[form].resetFields();
            },
        },
    };
</script>
