
<template>
    <div  class="delivery-wrap spaceBetween" v-com>
        <div class="allShow white-bottom">
            <header-slot>
                <span slot="header" class="com-slot-left">
                <span>当前位置：</span>
                <span>仓库管理 /</span>
                <span>仓库维护</span>
                </span>
                <span slot="footer" class="com-slot-right">
                <span class="T3 main-heading" @click="leftInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline" style="margin-left:-1px"></Icon></span>新增仓库</span></span>
                </span>
            </header-slot>
            <div class="tableDistance">
                <Form class="searchForm searchStyle" label-position="left" inline >
                <Form-item label="名称" :label-width="60" class="specialCase" >
                    <Input v-model="searchFrom.name" @on-enter="search()"></Input>
                    <Input style="display:none"></Input>
                </Form-item>
                <Form-item label="仓库编码" :label-width="80" class="specialCase" >
                    <Input v-model="searchFrom.code" @on-enter="search()"></Input>
                </Form-item>
                <Form-item label="所属门店" :label-width="80" class="specialCase" >
                    <Select v-model="searchFrom.storeid">
                        <Option :value="' '">全部</Option>
                        <Option v-for='(item,index) in searchStoreArr' :key="index" :value="item.id">{{item.name}}</Option>
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
        <!-- 新增 -->
        <div v-if="leftInsertShow">
            <Modal v-model="leftInsertShow" class-name="delect big-sized" :mask-closable=false  width="700" v-drag @on-cancel="cancels('InsertInfo')">
                <p slot="header">
                <span class="main-heading">新增仓库信息</span>
                </p>
                <div class="modalContent" style="text-align:center">
                <Form ref="InsertInfo" class="searchForm" label-position="left" :model="InsertInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
                    <Form-item prop="storeid"  label="所属门店:" :label-width="70" >
                        <Select v-model="InsertInfo.storeid">
                        <Option v-for="(item,index) in storeArr" :value="item.id" :key="index">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item prop="code"  label="仓库编码:" :label-width="90" >
                        <Input v-model="InsertInfo.code"></Input>
                    </Form-item>
                    <Form-item prop="name"  label="名称:" :label-width="80" >
                        <Input v-model="InsertInfo.name"></Input>
                    </Form-item>
                    <Form-item prop="address"  label="地址:" :label-width="80" >
                        <Input v-model="InsertInfo.address"></Input>
                    </Form-item>
                    <Form-item prop="keeper" label="仓管员:" :label-width="80" >
                        <Input v-model="InsertInfo.keeper" ></Input>
                    </Form-item>
                    <Form-item prop="keeperTel"  label="仓管员:" :label-width="80" >
                        <Input v-model="InsertInfo.keeperTel"></Input>
                    </Form-item>
                    <Form-item prop="remark"  label="备注:" :label-width="80" >
                        <Input v-model="InsertInfo.remark"></Input>
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
            <span class="main-heading">编辑仓库信息</span>
            </p>
            <div class="modalContent" style="text-align:center">
            <Form ref="leftEditInfo" class="searchForm" label-position="left" :model="leftEditInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
                <Form-item prop="storeid"  label="所属门店:" :label-width="70" >
                    <Select v-model="leftEditInfo.storeid">
                    <Option v-for="(item,index) in storeArr" :value="item.id" :key="index">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item prop="code"  label="仓库编码:" :label-width="90" >
                    <Input v-model="leftEditInfo.code"></Input>
                </Form-item>
                <Form-item prop="name"  label="名称:" :label-width="80" >
                    <Input v-model="leftEditInfo.name"></Input>
                </Form-item>
                <Form-item prop="address"  label="地址:" :label-width="80" >
                    <Input v-model="leftEditInfo.address"></Input>
                </Form-item>
                <Form-item prop="keeper" label="仓管员:" :label-width="80" >
                    <Input v-model="leftEditInfo.keeper" ></Input>
                </Form-item>
                <Form-item prop="keeperTel"  label="仓管员电话:" :label-width="80" >
                    <Input v-model="leftEditInfo.keeperTel"></Input>
                </Form-item>
                <Form-item prop="remark"  label="备注:" :label-width="80" >
                    <Input v-model="leftEditInfo.remark"></Input>
                </Form-item>
            </Form>
            </div>
            <div slot="footer">
            <Button class="save" @click="leftEditSave('leftEditInfo')">保存</Button>
            </div>
        </Modal>
        </div>
        <!-- 库位列表 -->
        <div v-if="detailsShow">
                <Modal v-model="detailsShow"  width="900" class-name="delectNopad" :mask-closable=false  v-drag >
                    <p slot="header">
                    <span class="main-heading">库位列表</span>
                    </p>
                    <Form class="searchForm searchStyle" label-position="left" inline >
                        <Button type="primary" class="save" @click="InsertdetailsShow = true" style="float:right">新增库位</Button>
                        <Form-item label="库位名称" :label-width="80" style="width:200px;" class="specialCase" >
                            <Input v-model="storagelocations.name" @on-enter="searchStoragelocations()"></Input>
                            <Input style="display:none"></Input>
                        </Form-item>
                        <Form-item label="库位编码" :label-width="80" style="width:200px;" class="specialCase" >
                            <Input v-model="storagelocations.code" @on-enter="searchStoragelocations()"></Input>
                        </Form-item>
                        <Form-item class="specialHandling .specialHandling" style="width:32px">
                            <Button icon="search" @click="searchStoragelocations" @on-enter="searchStoragelocations" style="width:30px"></Button>
                        </Form-item>
                    </Form>
                    <div class="styleDetail" style="padding: 15px">
                        <Table border :columns="storagelocationInfo" :data="storagelocationData"></Table>
                        <page-current ref="pages" class="pages-position" :total="totalstorage" @pageChange="storagepageListen"></page-current>
                    </div>

                    <div slot="footer">
                        <Button  class="clear" @click="detailsShow=false">关闭</Button>
                    </div>
                </Modal>
        </div>
        <!-- 新增库位信息 -->
            <div v-if="InsertdetailsShow">
                <Modal v-model="InsertdetailsShow" class-name="delect big-sized" :mask-closable=false  width="400" v-drag @on-cancel="cancels('InsertdetailsInfo')">
                    <p slot="header">
                    <span class="main-heading">新增库位信息</span>
                    </p>
                    <div class="modalContent" style="text-align:center">
                    <Form ref="InsertdetailsInfo" class="searchForm" label-position="left" :model="InsertdetailsInfo" :rules="editrule" inline style="text-align: left;padding:15px 60px 0">
                        <Form-item prop="code"  label="库位编码:" :label-width="70" >
                            <Input v-model="InsertdetailsInfo.code"></Input>
                        </Form-item>
                        <Form-item prop="name"  label="库位名称:" :label-width="70" >
                            <Input v-model="InsertdetailsInfo.name"></Input>
                        </Form-item>
                        <Form-item prop="status"  label="状态:" :label-width="70" >
                            <Select v-model="InsertdetailsInfo.status">
                                <Option :value="'1'">启用</Option>
                                <Option :value="'0'">禁用</Option>
                            </Select>
                        </Form-item>
                    </Form>
                    </div>
                    <div slot="footer">
                    <Button class="save" @click="InsertStockSave('InsertdetailsInfo')">保存</Button>
                    </div>
                </Modal>
            </div>
            <!-- 修改库位信息 -->
            <div v-if="editdetailShow">
                <Modal v-model="editdetailShow" class-name="delect big-sized" :mask-closable=false  width="400" v-drag @on-cancel="cancels('editdetailInfo')">
                    <p slot="header">
                    <span class="main-heading">修改库位信息</span>
                    </p>
                    <div class="modalContent" style="text-align:center">
                    <Form ref="editdetailInfo" class="searchForm" label-position="left" :model="editdetailInfo" :rules="editrule" inline style="text-align: left;padding:15px 60px 0">
                        <Form-item prop="code"  label="库位编码:" :label-width="70" >
                            <Input v-model="editdetailInfo.code"></Input>
                        </Form-item>
                        <Form-item prop="name"  label="库位名称:" :label-width="70" >
                            <Input v-model="editdetailInfo.name"></Input>
                        </Form-item>
                        <Form-item prop="status"  label="状态:" :label-width="70" >
                            <Select v-model="editdetailInfo.status">
                                <Option :value="'1'">启用</Option>
                                <Option :value="'0'">禁用</Option>
                            </Select>
                        </Form-item>
                    </Form>
                    </div>
                    <div slot="footer">
                    <Button class="save" @click="EditStockSave('editdetailInfo')">保存</Button>
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
            const code = (rule, value, callback) => {
                    if (value === "" || value === null||value === undefined) {
                    callback(new Error('请输入仓库编码'));
                    } else {
                    if (!/^[A-Za-z0-9]+$/.test(value)) {
                        callback(new Error('请输入字母或数字'));
                    } else if (value.length > 50) {
                        callback(new Error('仓库编码最多输入50位'));
                    } else {
                        callback();
                    }
                    }
                };
                const codeedit = (rule, value, callback) => {
                    if (value === "" || value === null||value === undefined) {
                    callback(new Error('请输入库位编码'));
                    } else {
                    if (!/^[A-Za-z0-9]+$/.test(value)) {
                        callback(new Error('请输入字母或数字'));
                    } else if (value.length > 50) {
                        callback(new Error('库位编码最多输入50位'));
                    } else {
                        callback();
                    }
                    }
                };
            const tel = (rule, value, callback) => {
          if (value === "" || value === null||value === undefined) {
          callback(new Error('请输入电话'));
          } else {
          if (value.length > 20){
            callback(new Error('电话长度不能多于20位'));
          }else if(!/^[\d\-]+$/.test(value)) {
              callback(new Error('电话格式错误'));
          } else {
            callback();
          }
          }
      };
            const type = (rule, value, callback) => {
                    if (!value) {
                    callback(new Error('请选择分类'));
                    } else {
                    callback();
                    }
                };
            return {
                data:[],
                totals:0,
                totalstorage:0,
                leftInsertShow:false,
                leftEditShow:false,
                InsertdetailsShow:false,
                detailsShow:false,
                editdetailShow:false,
                searchFrom:{    //查询信息
                    name:'',
                    storeid:' ',
                    pageIndex:1,
                    pageSize:10,
                    createDate:'',
                    beginTime:'',
                    endTime:'',
                },
                storeArr:[],
                searchStoreArr:[],
                editdetailInfo:{
                    // status:'1',
                    warehouseid:1,
                },
                InsertdetailsInfo:{
                    status:'1',
                    warehouseid:1,
                },
                storagelocations:{
                    warehouseid:1,
                    pageIndex:1,
                    pageSize:10,
                },
                InsertInfo:{  //新增信息
                    storeid:1,
                },
                storagelocationsinfo:{
                    warehouseid:0,
                },
                leftEditInfo:{},//编辑信息
                editrule:{
                    code: [
                        { required: true, trigger: 'blur', validator:codeedit },
                    ],
                    name: [
                        { required: true, message:'请输入库位名称',trigger: 'blur', },
                        { max:50,message: '库位名称最多输入50位', trigger: 'blur'}
                    ],
                },
                leftInsertRule:{
                    code: [
                        { required: true, trigger: 'blur', validator:code },
                    ],
                    name: [
                        { required: true, message:'请输入仓库名称',trigger: 'blur', },
                        { max:50,message: '仓库名称最多输入50位', trigger: 'blur'}
                    ],
                    address: [
                        { required: true, message:'请输入仓库地址',trigger: 'blur', },
                        { max:100,message: '地址最多输入100位', trigger: 'blur'}
                    ],
                    keeper: [
                        { required: true, message:'请输入仓管员',trigger: 'blur', },
                        { max:50,message: '联系人最多输入50位', trigger: 'blur'}
                    ],
                    keeperTel: [
                        { required: true,trigger: 'blur',validator:tel },
                    ],
                    remark: [
                        { required: false, message:'请输入备注',trigger: 'blur', },
                        { max:200,message: '备注最多输入200位', trigger: 'blur'}
                    ],
                    storeid: [
                        { required: true,validator:type, trigger: 'change' },
                    ],
                },
                storagelocationData:[],
                columns: [   //table
                {
                    title: '序号',
                    width:'4%',
                    type:'index',
                    align: 'center',
                },
                {
                    title: '所属门店',
                    width:'15%',
                    key: 'storename',
                    align: 'center',
                },
                {
                    title: '仓库编码',
                    width:'10%',
                    key: 'code',
                    align: 'center',
                },
                {
                    title: '名称',
                    width:'10%',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '地址',
                    width:'10%',
                    key: 'address',
                    align: 'center',
                },
                {
                    title: '仓管员',
                    width:'10%',
                    key: 'keeper',
                    align: 'center',
                },
                {
                    title: '仓管员电话',
                    width:'10%',
                    key: 'keeperTel',
                    align: 'center',
                },
                {
                    title: '备注',
                    width:'10%',
                    key: 'remark',
                    align: 'center',
                },
                // {
                //     title: '状态',
                //     width:'10%',
                //     key: 'status',
                //     align: 'center',
                //     render:(h,params)=>{
                //     return h('span',params.row.status==='1'?'启用':'禁用')
                // }
                // },
                // {
                //     title: '单位',
                //     width:'10%',
                //     key: 'unit',
                //     align: 'center',
                // },
                // {
                //     title: '供应商名称',
                //     width:'10%',
                //     key: 'suppliername',
                //     align: 'center',
                // },
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
                                this.detailsShow = true
                                this.storagelocations.warehouseid = params.row.id
                                this.stockSee()
                                this.InsertdetailsInfo.warehouseid = params.row.id
                                // this.tableShowDone(params.row)
                            }
                            }
                        },
                        [
                            h('i',{
                            class:'iconfont  icon-chakan',
                            }),
                            h('span',{
                            },'库位')
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
                        // h('Button', {
                        //     class: 'yellowButton',
                        //     style: {
                        //     background:"#fff",
                        //     marginLeft: '8px',
                        //     marginRight: '8px',
                        //     },
                        //     on: {
                        //     click: () => {
                        //         this.DeleteShow = true
                        //         this.DeleteInfo = params.row.id;
                        //     }
                        //     },
                        // },[
                        //     h('i',{
                        //     class:'iconfont icon-qingkong',
                        //     }),
                        //     h('span',{

                        //     },'删除')
                        // ]
                        // ),
                    ]);
                    }
                }
                ],
                storagelocationInfo:[
                    {
                        title: '序号',
                        width: '10%',
                        type: 'index',
                        align: 'center',
                    },
                    {
                        title: '库位编码',
                        width: '15%',
                        key: 'code',
                        align: 'center',
                    },
                    {
                        title: '库位名称',
                        width: '15%',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        width: '15%',
                        key: 'status',
                        align: 'center',
                        render:(h,params)=>{
                        return h('span',params.row.status==='1'?'启用':'禁用')
                        }
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
                                    this.tableeditDone(params.row)
                                    this.editdetailShow = true
                                    this.editdetailInfo.id = params.row.id
                                    this.editdetailInfo.warehouseid = this.storagelocations.warehouseid
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
            this.getData();
            this.getStore();
          this.getStoreCan();
        },
        methods: {
            //获取列表
            getData(){
                this.$http.get('/warehouses',{params:this.searchFrom}).then(res=>{
                    console.log(res.data)
                    this.data=res.data.data
                    this.totals=res.data.total
                    })
            },
            pageListen(data){
                this.searchFrom.pageIndex=data.pageIndex;
                this.searchFrom.pageSize=data.pageSize;
                this.getData();
            },
            storagepageListen(data){
                this.storagelocations.pageIndex=data.pageIndex;
                this.storagelocations.pageSize=data.pageSize;
                this.stockSee();
            },
            search(){

            },
            //清空
            cancels(name){
                this.$refs[name].resetFields();
            },
            //获取门店
            getStore(){
                this.$http.get('/store/all',{}).then(res=>{
                    this.searchStoreArr=res.data
                })
            },
            //新增
            InsertSave(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('/warehouse',this.InsertInfo).then(res=>{
                        this.leftInsertShow=false;
                        this.getData();
                        this.cancels(name)
                        this.$Message.success('添加成功');
                        })
                    }
                    })
            },
            //编辑
            leftEditSave(name){
                this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$http.put('/warehouse',this.leftEditInfo).then(res=>{
                    this.leftEditShow=false;
                    this.getData();
                    this.cancels(name)
                    this.$Message.success('更新成功');
                    })
                }
                })
            },
            //查看库位信息
            stockSee(){
                this.$http.get('/storagelocations',{params:this.storagelocations}).then(res=>{
                    // console.log(res.data)
                    this.storagelocationData = res.data.data
                    this.totalstorage = res.data.total
                    // this.detailsStockShow = true
                })
            },
            //搜索库位信息
            searchStoragelocations(){
                this.$http.get('/storagelocations',{params:this.storagelocations}).then(res=>{
                    // console.log(res.data)
                    this.storagelocationData = res.data.data
                    this.totalstorage = res.data.total
                    // this.detailsStockShow = true
                })
            },
            //新增库位信息
            InsertStockSave(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('/storagelocation',this.InsertdetailsInfo).then(res=>{
                        this.InsertdetailsShow=false;
                        this.stockSee();
                        this.cancels(name)
                        this.$Message.success('添加库位信息成功');
                        })
                    }
                    })
            },
            //修改库位信息
            EditStockSave(name){
                this.$refs[name].validate((valid) => {
                if (valid) {
                    // console.log(this.editdetailInfo)
                    this.$http.put('/storagelocation',this.editdetailInfo).then(res=>{
                    this.editdetailShow=false;
                    this.stockSee();
                    this.cancels(name)
                    this.$Message.success('修改库位信息成功');
                    })
                }
                })
            },
            //查询
            search(){
                this.$http.get('/warehouses',{params:this.searchFrom}).then(res=>{
                    this.data=res.data.data
                    this.totals=res.data.total
                })
            },
          //新增编辑获取门店
          getStoreCan(){
            this.$http.get('/store/effective',{}).then(res=>{
              this.storeArr=res.data
            })
          },

            tableDone(row){
                this.leftEditInfo=JSON.parse(JSON.stringify(row))
                // console.log(this.leftEditInfo)
            },
            tableeditDone(row){
                this.editdetailInfo=JSON.parse(JSON.stringify(row))
                this.editdetailInfo.warehouseid = this.warehouseid
            },
        }
    };
</script>
<style scoped>

</style>
