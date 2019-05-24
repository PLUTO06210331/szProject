
<template>
    <div  class="delivery-wrap spaceBetween" v-com>
        <div class="allShow white-bottom">
            <header-slot>
                <span slot="header" class="com-slot-left">
                <span>当前位置：</span>
                <span>物料管理 /</span>
                <span>物料管理</span>
                </span>
                <span slot="footer" class="com-slot-right">
                <span class="T3 main-heading" @click="leftInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline" style="margin-left:-1px"></Icon></span>新增物料信息</span></span>
                </span>
            </header-slot>
            <div class="tableDistance">
                <Form class="searchForm searchStyle" label-position="left" inline >
                <Form-item label="商品名称" :label-width="80" class="specialCase" >
                    <Input v-model="searchFrom.name" @on-enter="search()"></Input>
                </Form-item>
                <Form-item label="商品编码" :label-width="80" class="specialCase" >
                    <Input v-model="searchFrom.code" @on-enter="search()"></Input>
                </Form-item>
                <Form-item label="供应商名称" :label-width="80" class="specialCase" >
                    <Select v-model="searchFrom.supplierid">
                        <Option :value="' '">全部</Option>
                        <Option v-for='(item,index) in SupplierData' :key="index" :value="item.id">{{item.name}}</Option>
                    </Select>
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
        <!-- 新增物料信息 -->
        <div v-if="leftInsertShow">
        <Modal v-model="leftInsertShow" class-name="delect big-sized" :mask-closable=false  width="700" v-drag @on-cancel="cancels('InsertInfo')">
            <p slot="header">
            <span class="main-heading">新增物料信息</span>
            </p>
            <div class="modalContent" style="text-align:center">
            <Form ref="InsertInfo" class="searchForm" label-position="left" :model="InsertInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
                <Form-item prop="code"  label="商品编码:" :label-width="70" >
                <Input v-model="InsertInfo.code"></Input>
                </Form-item>
                <Form-item prop="name"  label="商品名称:" :label-width="90" >
                <Input v-model="InsertInfo.name"></Input>
                </Form-item>
                <Form-item prop="category"  label="分类" :label-width="70" >
                <Select v-model="InsertInfo.category">
                    <Option v-for='(item,index) in CategoryData' :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
                </Form-item>
                <Form-item prop="status"  label="状态:" :label-width="70" >
                <Select v-model="InsertInfo.status">
                    <Option :value="'1'">启用</Option>
                    <Option :value="'0'">禁用</Option>
                </Select>
                </Form-item>
                <Form-item prop="specifications" label="规格型号:" :label-width="70" >
                <Input v-model="InsertInfo.specifications" ></Input>
                </Form-item>
                <Form-item prop="unit"  label="单位" :label-width="70" >
                <Select v-model="InsertInfo.unit">
                    <Option v-for='(item,index) in unitData' :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
                </Form-item>
                <Form-item prop="supplierid"  label="供应商" :label-width="70" >
                <Select v-model="InsertInfo.supplierid">
                    <Option v-for='(item,index) in SupplierData' :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
                </Form-item>
            </Form>
            </div>
            <div slot="footer">
            <Button class="save" @click="InsertSave('InsertInfo')">保存</Button>
            </div>
        </Modal>
        </div>
        <!-- 编辑 -->
        <div v-if="leftEditShow">
        <Modal v-model="leftEditShow" class-name="delect big-sized" :mask-closable=false  width="700" v-drag @on-cancel="cancels('leftEditInfo')">
            <p slot="header">
            <span class="main-heading">编辑物料信息</span>
            </p>
            <div class="modalContent" style="text-align:center">
            <Form ref="leftEditInfo" class="searchForm" label-position="left" :model="leftEditInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
                <!-- <Form-item prop="code"  label="商品编码:" :label-width="70" >
                <Input v-model="leftEditInfo.code"></Input> -->
                </Form-item>
                <Form-item prop="name"  label="商品名称:" :label-width="90" >
                <Input v-model="leftEditInfo.name"></Input>
                </Form-item>
                <Form-item prop="category"  label="分类" :label-width="70" >
                <Select v-model="leftEditInfo.category">
                    <Option v-for='(item,index) in CategoryData' :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
                </Form-item>
                <Form-item prop="status"  label="状态:" :label-width="70" >
                <Select v-model="leftEditInfo.status">
                    <Option :value="'1'">启用</Option>
                    <Option :value="'0'">禁用</Option>
                </Select>
                </Form-item>
                <Form-item prop="specifications" label="规格型号:" :label-width="70" >
                <Input v-model="leftEditInfo.specifications" ></Input>
                </Form-item>
                <Form-item prop="unit"  label="单位" :label-width="70" >
                <Select v-model="leftEditInfo.unit">
                    <Option v-for='(item,index) in unitData' :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
                </Form-item>
                <Form-item prop="supplierid"  label="供应商" :label-width="70" >
                <Select v-model="leftEditInfo.supplierid">
                    <Option v-for='(item,index) in SupplierData' :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
                </Form-item>
            </Form>
            </div>
            <div slot="footer">
            <Button class="save" @click="leftEditSave('leftEditInfo')">保存</Button>
            </div>
        </Modal>
        </div>
        <!-- 删除 -->
        <div v-if="DeleteShow">
            <Modal v-model="DeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
            <p slot="header" class="main-heading">
                提示框
            </p>
            <div>
                <Icon type="information-circled"></Icon>确认删除此条信息吗？
            </div>
            <div slot="footer">
                <div class="footer">
                <Button  class="save" @click="DeleteSave">确认</Button>
                <Button  class="clear" @click="DeleteShow=false">取消</Button>
                </div>
            </div>
            </Modal>
        </div>
        <!-- 查看物料价格 -->
         <div v-if="detailsModalShow">
            <Modal v-model="detailsModalShow"  width="700" class-name="delectNopad" :mask-closable=false  v-drag >
                <p slot="header">
                <span class="main-heading">物料价格 -- {{message1}}</span>
                </p>
                <div style="padding:15px 0 0 15px;">
                    <Button type="primary" class="save" @click="InsertPriceShow = true">新增物料价格</Button>
                </div>
                <div class="styleDetail" style="padding: 15px">
                    <Table border :columns="goodpriceInfo" :data="priceData"></Table>
                </div>
                <div slot="footer">
                    <Button  class="clear" @click="detailsModalShow=false">关闭</Button>
                </div>
            </Modal>
            </div>
            <!-- 新增物料价格 -->
            <div v-if="InsertPriceShow">
                <Modal v-model="InsertPriceShow" class-name="delect big-sized" :mask-closable=false  width="400" v-drag @on-cancel="cancels('InsertPriceInfo')">
                    <p slot="header">
                    <span class="main-heading">新增物料价格</span>
                    </p>
                    <div class="modalContent" style="text-align:center">
                    <Form ref="InsertPriceInfo" class="searchForm" label-position="left" :model="InsertPriceInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
                        <Form-item prop="price"  label="物料价格:" :label-width="70" >
                            <Input v-model="InsertPriceInfo.price"></Input>
                        </Form-item>
                        <Form-item prop="storeid"  label="所属门店:" :label-width="70" >
                            <Select v-model="InsertPriceInfo.storeid">
                            <Option v-for="(item,index) in storeArr" :value="item.id" :key="index">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                    </div>
                    <div slot="footer">
                    <Button class="save" @click="InsertPriceSave('InsertPriceInfo')">保存</Button>
                    </div>
                </Modal>
            </div>
            <!-- 修改物料价格 -->
            <div v-if="EditPriceShow">
                <Modal v-model="EditPriceShow" class-name="delect big-sized" :mask-closable=false  width="400" v-drag @on-cancel="cancels('goodsEditprice')">
                    <p slot="header">
                    <span class="main-heading">修改物料价格</span>
                    </p>
                    <div class="modalContent" style="text-align:center">
                    <Form ref="goodsEditprice" class="searchForm" label-position="left" :model="goodsEditprice" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
                        <Form-item prop="price"  label="物料价格:" :label-width="70" >
                            <Input v-model="goodsEditprice.price"></Input>
                        </Form-item>
                        <Form-item prop="storeid"  label="所属门店:" :label-width="70" >
                            <Select v-model="goodsEditprice.storeid">
                            <Option v-for="(item,index) in storeArr" :value="item.id" :key="index">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                    </div>
                    <div slot="footer">
                    <Button class="save" @click="editPriceSave('goodsEditprice')">保存</Button>
                    </div>
                </Modal>
            </div>
            <!-- 查看物料库存 -->
            <div v-if="detailsStockShow">
                <Modal v-model="detailsStockShow"  width="700" class-name="delectNopad" :mask-closable=false  v-drag >
                    <p slot="header">
                    <span class="main-heading">物料库存 -- {{message}}</span>
                    </p>
                    <div style="padding:15px 0 0 15px;">
                        <Button type="primary" class="save" @click="InsertStockShow = true">新增库存信息</Button>
                    </div>
                    <div class="styleDetail" style="padding: 15px">
                        <Table border :columns="goodStockInfo" :data="StockData"></Table>
                    </div>
                    <div slot="footer">
                        <Button  class="clear" @click="detailsStockShow=false">关闭</Button>
                    </div>
                </Modal>
            </div>
            <!-- 新增库存信息 -->
            <div v-if="InsertStockShow">
                <Modal v-model="InsertStockShow" class-name="delect big-sized" :mask-closable=false  width="400" v-drag @on-cancel="cancels('InsertStockInfo')">
                    <p slot="header">
                    <span class="main-heading">新增库存信息</span>
                    </p>
                    <div class="modalContent" style="text-align:center">
                    <Form ref="InsertStockInfo" class="searchForm" label-position="left" :model="InsertStockInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
                        <Form-item prop="stock"  label="物料库存:" :label-width="70" >
                            <Input v-model="InsertStockInfo.stock"></Input>
                        </Form-item>
                        <Form-item prop="storeid"  label="所属门店:" :label-width="70" >
                            <Select v-model="InsertStockInfo.storeid">
                            <Option v-for="(item,index) in storeArr" :value="item.id" :key="index">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                    </div>
                    <div slot="footer">
                    <Button class="save" @click="InsertStockSave('InsertStockInfo')">保存</Button>
                    </div>
                </Modal>
            </div>
            <!-- 修改库存信息 -->
            <div v-if="editStockShow">
                <Modal v-model="editStockShow" class-name="delect big-sized" :mask-closable=false  width="400" v-drag @on-cancel="cancels('editStockInfo')">
                    <p slot="header">
                    <span class="main-heading">修改库存信息</span>
                    </p>
                    <div class="modalContent" style="text-align:center">
                    <Form ref="editStockInfo" class="searchForm" label-position="left" :model="editStockInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
                        <Form-item prop="stock"  label="物料库存:" :label-width="70" >
                            <Input v-model="editStockInfo.stock"></Input>
                        </Form-item>
                        <Form-item prop="storeid"  label="所属门店:" :label-width="70" >
                            <Select v-model="editStockInfo.storeid">
                            <Option v-for="(item,index) in storeArr" :value="item.id" :key="index">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                    </div>
                    <div slot="footer">
                    <Button class="save" @click="EditStockSave('editStockInfo')">保存</Button>
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
            const price = (rule, value, callback) => {
                    if (value === "" || value === null||value === undefined) {
                    callback(new Error('请输入物料价格'));
                    } else {
                    if (value.length > 8) {
                        callback(new Error('最多输入8位'));
                    } else if (!/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value)) {
                        callback(new Error('请输入整数或者两位小数'));
                    } else {
                        callback();
                    }
                    }
                };
            const type = (rule, value, callback) => {
                    if (!value) {
                    callback(new Error('请选择单位'));
                    } else {
                    callback();
                    }
                };
                const suppliertype = (rule, value, callback) => {
                    if (!value) {
                    callback(new Error('请选择供应商'));
                    } else {
                    callback();
                    }
                };
            const code = (rule, value, callback) => {
                    if (value === "" || value === null||value === undefined) {
                    callback(new Error('请输入商品编码'));
                    } else {
                    if (!/^[A-Za-z0-9]+$/.test(value)) {
                        callback(new Error('请输入字母或数字'));
                    } else if (value.length > 50) {
                        callback(new Error('最多输入50位'));
                    } else {
                        callback();
                    }
                    }
                };
            return {

                goodsData:'',
                InsertInfo:{
                    category:21,
                    status:'1',
                    unit:44,
                    supplierid:1
                },
                goodsid:1,
                unitData:[],
                showpriceInfo:{},
                EditPriceShow:false,
                detailsStockShow:false,
                InsertPriceShow:false,
                InsertStockShow:false,
                storeArr:[],//门店
                goodsEditprice:{},
                editStockShow:false,
                SupplierData:[],
                editStockInfo:{
                    goodsid:1
                },
                InsertStockInfo:{
                    goodsid:1,
                    storeid:1
                },
                InsertPriceInfo:{
                    goodsid:1,
                    storeid:1,
                },
                //物料价格
                goodsprice:{
                    price:''
                },
                StockData:{}, //库存信息
                searchFrom:{
                    name:'',
                    // orderid:'',
                    pageIndex:1,
                    pageSize:10,
                    createDate:'',
                    beginTime:'',
                    endTime:'',
                    supplierid:' '
                },
                detailsModalShow:false,
                data:[],
                CategoryData:[],//物料类别
                totals:1,
                leftEditShow:false,
                leftInsertShow:false,
                InsertPriceShow:false,
                DeleteShow:false,
                DeleteInfo:'',
                priceData:[],
                leftEditInfo:{
                    category:'21',
                    status:'1'
                },
                leftInsertRule:{
                    price: [
                        { required: true, trigger: 'blur' , validator:price },
                        // { max:10,message: '金额最多输入10位', trigger: 'blur'}
                    ],
                    stock: [
                        { required: true, message:'请填写库存信息',trigger: 'blur'},
                    ],
                    specifications: [
                        // { message:'请填写库存信息',trigger: 'blur'},
                        { max:10,message: '规格型号不能超过10位', trigger: 'blur'}
                    ],
                    unit: [
                        { required: true,validator:type, trigger: 'change' },
                    ],
                    code: [
                        { required: true, trigger: 'blur',validator:code },
                        // { max:50,message: '商品编码不能超过50位', trigger: 'blur'}
                    ],
                    name: [
                        { required: true,message:'请填写商品名称', trigger: 'blur' },
                        { max:50,message: '商品名称不能超过50位', trigger: 'blur'}
                    ],
                    category: [
                        { required: true,validator:type, trigger: 'change' },
                    ],
                    status: [
                        { required: true,validator:status, trigger: 'change' },
                    ],
                    supplierid: [
                        { required: true,validator:suppliertype, trigger: 'change' },
                    ],

                },
                columns: [   //table
                {
                    title: '序号',
                    width:'4%',
                    type:'index',
                    align: 'center',
                },
                {
                    title: '物料编码',
                    width:'15%',
                    key: 'code',
                    align: 'center',
                },
                {
                    title: '物料名称',
                    width:'10%',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '分类',
                    width:'10%',
                    key: 'categoryname',
                    align: 'center',
                },
                {
                    title: '规格型号',
                    width:'10%',
                    key: 'specifications',
                    align: 'center',
                },
                {
                    title: '状态',
                    width:'10%',
                    key: 'status',
                    align: 'center',
                    render:(h,params)=>{
                    return h('span',params.row.status==='1'?'启用':'禁用')
                }
                },
                {
                    title: '单位',
                    width:'10%',
                    key: 'unitname',
                    align: 'center',
                },
                {
                    title: '供应商名称',
                    width:'10%',
                    key: 'suppliername',
                    align: 'center',
                },
                {
                    title: '操作',
                    width:'20%',
                    key: 'id',
                    align: 'center',
                    render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            class: 'blueButton',
                            style: {
                            marginLeft: '8px',
                            background:"#fff",
                            },
                            on: {
                            click: () => {
                                this.goodsid = params.row.id
                                this.stockSee(params.row)
                                this.InsertStockInfo.goodsid = params.row.id
                                this.tableShowDone(params.row)
                            }
                            }
                        },
                        [
                            h('i',{
                            class:'iconfont  icon-chakan',
                            }),
                            h('span',{
                            },'库存')
                        ]
                        ),
                        h('Button', {
                            class: 'blueButton ',
                            style: {
                            marginLeft: '8px',
                            background:"#fff",
                            },
                            on: {
                            click: () => {
                                this.goodsid = params.row.id
                                this.priceSee(params.row)
                                this.InsertPriceInfo.goodsid = params.row.id
                                this.tableShowDone(params.row)
                                // this.goodsEditprice.goodsid = params.row.id
                                // this.goodsEditprice.storeid = params.row.storeid
                            }
                            }
                        },
                        [
                            h('i',{
                            class:'iconfont  icon-chakan',
                            }),

                            h('span',{
                            },'价格')
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
                                this.leftEditShow = true
                                this.leftEditInfo.id = params.row.id
                                this.tableDone(params.row)
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
                            class: 'yellowButton',
                            style: {
                            background:"#fff",
                            marginLeft: '8px',
                            marginRight: '8px',
                            },
                            on: {
                            click: () => {
                                this.DeleteShow = true
                                this.DeleteInfo = params.row.id;
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
                goodpriceInfo:[
                    {
                        title: '序号',
                        width: '10%',
                        type: 'index',
                        align: 'center',
                    },
                    {
                      title: '门店名称',
                      width: '15%',
                      key: 'storename',
                      align: 'center',
                    },
                    {
                        title: '物料价格',
                        width: '15%',
                        key: 'price',
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
                                class: 'greenButton ',
                                style: {
                                    marginLeft: '8px',
                                    background: "#fff",
                                    marginRight: '8px',
                                },
                                on: {
                                click: () => {
                                    // this.EditPriceShow(params.row);
                                    this.tablePriceDone(params.row)
                                    this.EditPriceShow = true
                                }
                                }
                            },
                            [
                                h('i', {
                                    class: 'iconfont  icon-bianji',
                                }),

                                h('span', {}, '编辑'),
                            ]
                            ),

                        ]);
                        }
                    }
                    ],
                    goodStockInfo:[
                        {
                            title: '序号',
                            width: '10%',
                            type: 'index',
                            align: 'center',
                        },

                        {
                          title: '门店名称',
                          width: '15%',
                          key: 'storename',
                          align: 'center',
                        },
                        {
                            title: '物料库存',
                            width: '15%',
                            key: 'stock',
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
                                    class: 'greenButton ',
                                    style: {
                                        marginLeft: '8px',
                                        background: "#fff",
                                        marginRight: '8px',
                                    },
                                    on: {
                                    click: () => {
                                        // this.EditPriceShow(params.row);
                                        this.tablePriceDone(params.row)
                                        this.editStockShow = true
                                    }
                                    }
                                },
                                [
                                    h('i', {
                                        class: 'iconfont  icon-bianji',
                                    }),

                                    h('span', {}, '编辑'),
                                ]
                                ),
                            ]);
                            }
                        }
                        ],
            };
        },
        mounted() {
            this.getData()
            this.getUnit()
            this.getCategoryData()
            this.getStore()
            this.getSupplierData()
        },
        methods: {
            getData(){
                this.$http.get('/goodses',{params:this.searchFrom}).then(res=>{
                    this.data=res.data.data
                    this.totals=res.data.total
                })
            },
            // 获取分类列表
            getCategoryData(){
                this.$http.get('/goods/category',{params:this.searchFrom}).then(res=>{
                    this.CategoryData = res.data
                })
            },
            // 获取供应商列表
            getSupplierData(){
                this.$http.get('/supplier/all',{params:this.searchFrom}).then(res=>{
                    this.SupplierData = res.data
                })
            },
            pageListen(data){
                this.searchFrom.pageIndex=data.pageIndex;
                this.searchFrom.pageSize=data.pageSize;
                this.getData();
            },
            search(){
                this.$http.get('/goodses',{params:this.searchFrom}).then(res=>{
                    this.data=res.data.data
                    this.totals=res.data.total
                })
            },
            //清空
            cancels(name){
                this.$refs[name].resetFields();
            },
            tableDone(row){
                this.leftEditInfo=JSON.parse(JSON.stringify(row))
            },
            tableShowDone(row){
                this.showpriceInfo=JSON.parse(JSON.stringify(row))
            },
            tablePriceDone(row){
                this.editStockInfo=JSON.parse(JSON.stringify(row))
                this.goodsEditprice=JSON.parse(JSON.stringify(row))
                this.goodsEditprice.goodsid = this.goodsid
                this.editStockInfo.goodsid = this.goodsid
            },
            //新增
            InsertSave(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('/goods',this.InsertInfo).then(res=>{
                        this.leftInsertShow=false;
                        this.getData();
                        this.cancels(name)
                        this.$Message.success('添加成功');
                        })
                    }
                })
            },
            //获取门店
            getStore(){
                this.$http.get('/staff/store',{}).then(res=>{
                    this.storeArr=res.data
                })
            },
            //获取单位
            getUnit(){
                this.$http.get('/goods/unit',{}).then(res=>{
                    this.unitData=res.data
                })
            },
            //编辑
            leftEditSave(name){
                this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$http.put('/goods',this.leftEditInfo).then(res=>{
                    this.leftEditShow=false;
                    this.getData();
                    this.cancels(name)
                    this.$Message.success('更新成功');
                    })
                }
                })
            },
            DeleteSave(){
                this.$http.delete('/goods/'+this.DeleteInfo).then(res=>{
                this.DeleteShow = false;
                this.getData()
                this.$Message.success('删除成功');
                })
            },
            //查看物料价格
            priceSee(row){
                this.$http.get('/goodsprice/'+this.goodsid).then(res=>{
                    this.priceData = res.data
                    for(let i in this.priceData){
                        this.priceData[i].goodsname = this.showpriceInfo.name
                    }
                    this.detailsModalShow = true
                    this.message1= row.name;
                })
            },
            //新增物料价格
            InsertPriceSave(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('/goodsprice',this.InsertPriceInfo).then(res=>{
                        this.InsertPriceShow=false;
                        this.priceSee();
                        this.cancels(name)
                        this.$Message.success('添加价格成功');
                        })
                    }
                    })
            },
            //修改物料价格
            editPriceSave(name){
                this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$http.put('/goodsprice',this.goodsEditprice).then(res=>{
                    this.EditPriceShow=false;
                    this.priceSee();
                    this.cancels(name)
                    this.$Message.success('修改价格成功');
                    })
                }
                })
            },
            //查看库存信息
            stockSee(row){
                this.$http.get('/goodsstock/'+this.goodsid).then(res=>{
                    this.StockData = res.data
                    for(let i in this.StockData){
                        this.StockData[i].goodsname = this.showpriceInfo.name
                    }
                    this.detailsStockShow = true
                    this.message = row.name;
                })
            },
            //新增库存信息
            InsertStockSave(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('/goodsstock',this.InsertStockInfo).then(res=>{
                        this.InsertStockShow=false;
                        this.stockSee();
                        this.cancels(name)
                        this.$Message.success('添加库存信息成功');
                        })
                    }
                    })
            },
            // 修改库存信息
            EditStockSave(name){
                this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$http.put('/goodsstock',this.editStockInfo).then(res=>{
                    this.editStockShow=false;
                    this.stockSee();
                    this.cancels(name)
                    this.$Message.success('修改库存信息成功');
                    })
                }
                })
            },
        }
    };
</script>
<style scoped>

</style>
