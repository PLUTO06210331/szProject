<style lang="scss">
    .textareaDiv {
        .ivu-form-item{
            height: 120px !important;
            width:100% !important;
            .ivu-input-wrapper{
            width: 100% !important;
        }
        textarea.ivu-input{
            height: 117px !important;
            width: 100% !important;
            border: none;
            font-size:12px;
            color: #657180;
        }
    }
 }
</style>
<template>
    <div class="supplier-wrap spaceBetween" v-com>
        <div class="allShow white-bottom">
            <header-slot>
                <span slot="header" class="com-slot-left">
                    <span>当前位置：</span>
                    <span>供应商管理 /</span>
                    <span>供应商管理</span>
                </span>
                <span slot="footer" class="com-slot-right">
                    <span class="T3 main-heading" @click="InsertSupplierShow=true">
                        <span class="shade"><span class="colorBox colorBoxOrange" style="text-align:center">
                            <Icon type="ios-plus-outline" style="margin-left:-1px"></Icon>
                        </span>
                        新增供应商
                    </span>
                </span>
                </span>
            </header-slot>
            <div class="tableDistance">
                <Form class="searchForm searchStyle" label-position="left" inline >
                    <Form-item label="供应商名称" :label-width="80" class="specialCase" >
                        <Input v-model="searchForm.name" @on-enter="search()"></Input>
                    </Form-item>
                    <Form-item label="联系人" :label-width="80" class="specialCase" >
                        <Input v-model="searchForm.linkman" @on-enter="search()"></Input>
                    </Form-item>
                    <Form-item label="联系电话" :label-width="80" class="specialCase" >
                        <Input v-model="searchForm.linktel" @on-enter="search()"></Input>
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
        <!-- 新增供应商 -->
        <div v-if="InsertSupplierShow">
            <Modal v-model="InsertSupplierShow" class-name="delect big-sized" :mask-closable=false  width="700" v-drag @on-cancel="cancels('InsertSupplierInfo')">
                <p slot="header">
                    <span class="main-heading">新增供应商</span>
                </p>
                <div class="modalContent" style="text-align:center">
                 <Form ref="InsertSupplierInfo" class="searchForm" label-position="left" :model="InsertSupplierInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
                    <Form-item prop="name"  label="供应商名称:" :label-width="90" >
                        <Input v-model="InsertSupplierInfo.name"></Input>
                    </Form-item>
                    <Form-item prop="linkman"  label="联系人:" :label-width="70" >
                        <Input v-model="InsertSupplierInfo.linkman"></Input>
                    </Form-item>
                     <Form-item prop="linktel"  label="联系电话:" :label-width="70" >
                        <Input v-model="InsertSupplierInfo.linktel"></Input>
                    </Form-item>
                    <Form-item prop="email"  label="邮箱:" :label-width="70" >
                        <Input v-model="InsertSupplierInfo.email"></Input>
                    </Form-item>
                    <Form-item prop="address"  label="地址:" :label-width="70" class='form-item-block' style='width:95%'>
                        <Input v-model="InsertSupplierInfo.address"></Input>
                    </Form-item>
                    <div class="textareaDiv">
                        <Form-item prop="remark"  label="描述:" :label-width="70" class='form-item-block'>
                            <Input type="textarea" :rows='5' v-model="InsertSupplierInfo.remark" style='border:none'></Input>
                        </Form-item>
                    </div>
                </Form>
                </div>
                <div slot="footer">
                <Button class="save" @click="InsertSupplierSave('InsertSupplierInfo')">保存</Button>
                </div>
            </Modal>
        </div>
        <!-- 编辑供应商信息 -->
        <div v-if="EditSupplierShow">
            <Modal v-model="EditSupplierShow" class-name="delect big-sized" :mask-closable=false  width="700" v-drag @on-cancel="cancels('EditSupplierInfo')">
                <p slot="header">
                    <span class="main-heading">编辑供应商</span>
                </p>
                <div class="modalContent" style="text-align:center">
                 <Form ref="EditSupplierInfo" class="searchForm" label-position="left" :model="EditSupplierInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
                    <Form-item prop="name"  label="供应商名称:" :label-width="90" >
                        <Input v-model="EditSupplierInfo.name"></Input>
                    </Form-item>
                    <Form-item prop="linkman"  label="联系人:" :label-width="70" >
                        <Input v-model="EditSupplierInfo.linkman"></Input>
                    </Form-item>
                     <Form-item prop="linktel"  label="联系电话:" :label-width="70" >
                        <Input v-model="EditSupplierInfo.linktel"></Input>
                    </Form-item>
                    <Form-item prop="email"  label="邮箱:" :label-width="70" >
                        <Input v-model="EditSupplierInfo.email"></Input>
                    </Form-item>
                    <Form-item prop="address"  label="地址:" :label-width="70" class='form-item-block' style='width:95%'>
                        <Input v-model="EditSupplierInfo.address"></Input>
                    </Form-item>
                    <div class="textareaDiv">
                        <Form-item prop="remark"  label="描述:" :label-width="90">
                            <Input type="textarea" v-model="EditSupplierInfo.remark"></Input>
                        </Form-item>
                    </div>
                </Form>
                </div>
                <div slot="footer">
                <Button class="save" @click="EditSupplierSave('EditSupplierInfo')">保存</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            const phone = (rule, value, callback) => {
                if (value === "" || value === null) {
                    callback(new Error('请输入联系电话'));
                } else {
                    if (!/^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/.test(value)) {
                            callback(new Error('联系电话格式不正确'));
                    } else {
                            callback();
                    }
                }
            };
            const email = (rule,value,callback) => {
                if (value === "" || value === null) {
                    callback();
                } else {
                    if(!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)){
                        callback(new Error('邮箱格式不正确'));
                    } else {
                        callback();
                    }
                }
            }
             return {
               searchForm:{
                    name:'',
                    linkman:'',
                    linktel:'',
                    pageIndex:1,
                    pageSize:10,
                    beginTime:'',
                    endTime:'',
                    id:'',
                    keyword:'',
                    address:'',
                    remark:''
                },
                data:[],
                totals:0,
                InsertSupplierShow:false,
                EditSupplierShow:false,
                columns: [
                    {
                        title: '序号',
                        // width:'4%',
                        type:'index',
                        align: 'center',
                    },
                    {
                        title: '供应商名称',
                        // width:'4%',
                        key:'name',
                        align: 'center',
                    },
                    {
                        title: '联系人',
                        // width:'4%',
                        key:'linkman',
                        align: 'center',
                    },
                    {
                        title: '联系电话',
                        // width:'4%',
                        key:'linktel',
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
                                                // console.log(params.row);
                                                this.EditSupplierShow = true;
                                                this.EditSupplierInfo = JSON.parse(JSON.stringify(params.row));
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
                                )
                            ])
                        }
                    }
                ],
                InsertSupplierInfo:{
                    id:'',
                    name:'',
                    linkman:'',
                    linktel:'',
                    email:'',
                    address:'',
                    keyword:'',
                    remark:''
                },
                leftInsertRule:{
                    name:[
                        {required: true, message:'请填写供应商名称',trigger: 'blur'},
                        { max:30,message: '供应商名称不能超过30位', trigger: 'blur'}
                    ],
                    linkman:[
                        {required: true, message:'请填写联系人',trigger: 'blur'},
                        { max:20,message: '联系人不能超过20位', trigger: 'blur'}
                    ],
                    linktel:[
                        {required: true, validator:phone,trigger: 'blur'},
                        { max:20,message: '联系电话不能超过20位', trigger: 'blur'}
                    ],
                    email:[
                        { validator:email,trigger: 'blur'},
                        { max:30,message: '邮箱不能超过30位', trigger: 'blur'}
                    ],
                    address:[
                        { max:100,message: '地址不能超过100字', trigger: 'blur'}
                    ],
                    remark:[
                      { max:200,message: '描述不能超过200字', trigger: 'blur'}
                    ]
                },
                // 编辑供应商
                EditSupplierInfo:{}
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            // 获取表格数据
            getData(){
                this.$http.get('/suppliers',{params:this.searchForm}).then(res => {
                    // console.log(res.data);
                    this.data = res.data.data;
                    this.totals=res.data.total;
                })
            },
            // 搜索表格数据
            search(){
                this.$http.get('/suppliers',{params:this.searchForm}).then(res => {
                    this.data = res.data.data;
                    this.totals=res.data.total;
                })
            },
            // 分页
            pageListen(data){
                this.searchForm.pageIndex=data.pageIndex;
                this.searchForm.pageSize=data.pageSize;
                this.getData();
            },
            //清空
            cancels(name){
                this.$refs[name].resetFields();
            },
            // 新增保存
            InsertSupplierSave(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // console.log(this.leftInsertInfo)
                        this.$http.post('/supplier',this.InsertSupplierInfo).then(res=>{
                        this.InsertSupplierShow = false;
                        this.getData();
                        this.cancels(form);
                        this.$Message.success('添加成功');
                        })
                    }
                })
            },
            // 编辑保存
            EditSupplierSave(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // console.log(this.leftInsertInfo)
                        this.$http.put('/supplier',this.EditSupplierInfo).then(res=>{
                        this.EditSupplierShow = false;
                        this.getData();
                        this.cancels(form);
                        this.$Message.success('修改成功');
                        })
                    }
                })
            }
        }
    }
</script>
