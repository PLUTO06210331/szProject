<style scoped>
    ul,li{
       list-style:none;
    }
    .system-wrap{
        height:100%;
    }
    .system-tabWrap{
        height:calc(100% - 60px);
        padding-top:20px;
    }
    .system-tabWrap:after{
        content:'';
        display:block;
        clear: both;
    }
    .system-tabWrap>div{
        height:100%;
        border: 1px solid #dddddd;
        text-align: center;
    }
    .system-tab{
        float:left;
        width:calc(30% - 10px);
        margin-right:10px;
    }
    .system-tabContent{
        float:left;
        width:70%;
    }
    .system-tab-left--title{
        background-color: #f8f8f9
    }
    .system-tab-left--title,.system-tab-item{
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        border-bottom: 1px solid #dddddd;
    }
    .systemActive{
       background-color: rgb(0, 182, 241);
    }
</style>
<style lang='scss'>
    .ivu-table-wrapper{
      height:100%;
    }
    .ivu-table-body{
      height:calc(100% - 34px);
      overflow-y: auto;
    }
</style>

<template>
    <div class="system-wrap spaceBetween">
        <div class="allShow white-bottom">
            <header-slot>
                <span slot="header" class="com-slot-left">
                    <span>当前位置：</span>
                    <span>档案管理 /</span>
                    <span>系统档案</span>
                </span>
                <span slot="footer" class="com-slot-right">
                    <span class="T3 main-heading" @click='systemInsertShow=true'>
                        <span class="shade">
                            <span class="colorBox colorBoxOrange" style="text-align:center">
                                <Icon type="ios-plus-outline" style="margin-left:-1px"></Icon>
                            </span>
                        添加档案
                        </span>
                    </span>
                </span>
            </header-slot>
        </div>
        <div class="system-tabWrap">
            <div class="system-tab">
                <div class='system-tab-left'>
                    <h4 class='system-tab-left--title'>类别</h4>
                    <ul>
                        <li class='system-tab-item' v-for='item in systemLeftData' :key='item.id' :class="tabNum==item.id?'systemActive':''" @click='systemTab(item)'>{{item.name}}</li>
                    </ul>
                </div>
            </div>
            <div class="system-tabContent">
                <Table :columns='systemColumns' :data='systemData'></Table>
            </div>
        </div>
        <!--添加-->
        <div v-if="systemInsertShow">
            <Modal v-model="systemInsertShow" class-name="delect entrepot" :mask-closable='false'  width="480" v-drag @on-cancel="cancels('systemInsertInfo')">
                <p slot="header">
                    <span class="main-heading">编辑系统档案</span>
                </p>
                <div class="modalContent" style="text-align:center">
                    <Form ref="systemInsertInfo" class="searchForm" label-position="left" :model="systemInsertInfo" :rules="systemEditRule" inline style="text-align: left;padding:15px 60px 0">
                        <Form-item prop="name" label="名称:" :label-width="90" >
                            <Input v-model="systemInsertInfo.name" ></Input>
                        </Form-item>
                        <Form-item prop="code"  label="编码:" :label-width="90" >
                            <Input v-model="systemInsertInfo.code"></Input>
                        </Form-item>
                        <Form-item prop="en"  label="英文名称:" :label-width="90" >
                            <Input v-model="systemInsertInfo.en"></Input>
                        </Form-item>
                        <Form-item prop="parentid"  label="上级ID:" :label-width="90" >
                            <Input v-model="systemInsertInfo.parentid"></Input>
                        </Form-item>
                        <Form-item prop="property"  label="属性:" :label-width="90" >
                            <Input v-model="systemInsertInfo.property"></Input>
                        </Form-item>
                    </Form>
                </div>
                <div slot="footer">
                    <Button class="save" @click="systemInsertSave('systemInsertInfo')">保存</Button>
                </div>
            </Modal>
        </div>
        <!--编辑-->
        <div v-if="systemEditShow">
            <Modal v-model="systemEditShow" class-name="delect entrepot" :mask-closable='false'  width="480" v-drag @on-cancel="cancels('systemEditInfo')">
                <p slot="header">
                    <span class="main-heading">编辑系统档案</span>
                </p>
                <div class="modalContent" style="text-align:center">
                    <Form ref="systemEditInfo" class="searchForm" label-position="left" :model="systemEditInfo" :rules="systemEditRule" inline style="text-align: left;padding:15px 60px 0">
                        <Form-item prop="name" label="名称:" :label-width="90" >
                            <Input v-model="systemEditInfo.name" ></Input>
                        </Form-item>
                        <Form-item prop="code"  label="编码:" :label-width="90" >
                            <Input v-model="systemEditInfo.code"></Input>
                        </Form-item>
                        <Form-item prop="en"  label="英文名称:" :label-width="90" >
                            <Input v-model="systemEditInfo.en"></Input>
                        </Form-item>
                        <Form-item prop="parentid"  label="上级ID:" :label-width="90" >
                            <Input v-model="systemEditInfo.parentid"></Input>
                        </Form-item>
                        <Form-item prop="property"  label="属性:" :label-width="90" >
                            <Input v-model="systemEditInfo.property"></Input>
                        </Form-item>
                    </Form>
                </div>
                <div slot="footer">
                    <Button class="save" @click="systemEditSave('systemEditInfo')">保存</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
             const validateNum = (rule, value, callback) => {
                 if(value==="" || value === null){
                     callback()
                 }else{
                     if(!/^[0-9]*$/.test(value)){
                         callback(new Error('请填写数字'))
                     }else{
                       if(value.length>10){
                         callback(new Error('上级ID最大为10位'))
                       }else{
                         callback()
                       }
                     }
                 }
             }
            const validateNoSymbol = (rule, value, callback) => {
                 if(value==="" || value === null){
                     callback()
                 }else{
                     if(!/^[a-zA-Z0-9]*$/.test(value)){
                         callback(new Error('请填写字母或数字'))
                     }else{
                       if(value.length>20){
                         callback(new Error('编码最大为20位'))
                       }else{
                        callback()
                       }
                     }
                 }
             }
            return {
                systemColumns:[
                    {
                        title:'序号',
                        type:'index',
                        width:60,
                        align:'center',
                    },
                    {
                        title:'名称',
                        key:'name',
                        align:'center'
                    },
                    {
                        title:'编码',
                        key:'code',
                        align:'center'
                    },
                    {
                        title:'操作',
                        key:'action',
                        align:'center',
                        render:(h,params)=>{
                           return h('div',
                                [
                                    h('Button',{
                                        class:'greenButton',
                                        style:{
                                            background:'#fff',
                                        },
                                        on:{
                                            click: () => {
                                                this.systemEdit(params);
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
                systemData:[],
                systemLeftData:[],
                tabNum:1,
                systemCategory:{
                    category:''
                },
                systemItem:{},
                systemInsertShow:false,
                systemInsertInfo:{
                    name:'',
                    category:'',
                    code:'',
                    en:'',
                    parentid:null,
                    property:''
                },
                systemEditShow:false,
                systemEditRule:{
                    name:[
                        {required:true,message:'名称为必填项',trigger:'blur'},
                        {max:20, message:'名称最大为20位', trigger:'blur,change'}
                    ],
                    code:[
                        {validator:validateNoSymbol,trigger:'blur,change'},
                    ],
                    en:[
                       {max: 20, message: '英文名称最大为20位', trigger: 'change' }
                    ],
                    parentid:[
                        {validator:validateNum,trigger:'blur,change'},
                    ],
                    property:[
                        {max: 20, message: '属性最大为20位', trigger: 'change' }
                    ]
                },
                systemEditInfo:{
                    name:'',
                    category:'',
                    code:'',
                    en:'',
                    parentid:null,
                    property:''
                },
            };
        },
        created(){
          this.systemItem = {};
          this.getDictCategory();
        },
        mounted() {

        },
        methods: {
            getDictCategory(){
                this.$http.get('/dictCategory')
                .then((res) => {
                    this.systemLeftData = res.data;
                    if(!this.systemCategory.category){
                      this.systemCategory.category = res.data[0].category;
                    }
                    this.systemInsertInfo.category = res.data[0].category;
                    this.systemTab();
                })
            },
            systemTab(item){
                if(item){
                    this.tabNum = item.id;
                    this.systemCategory.category = item.category;
                }
                this.$http.get('/dictSystem/category',{params:this.systemCategory}).then((res) =>{
                    this.systemData = res.data;
                })
            },
            cancels(name){
                this.$refs[name].resetFields();
            },
            systemInsertSave(name){
                this.$refs[name].validate((valid) => {
                     if(valid){
                         this.systemInsertInfo.category = this.systemCategory.category;
                         this.$http.post('/dictSystem',this.systemInsertInfo).then((res)=>{
                            // console.log(res);
                            if(res.status==200){
                                this.$Message.success('新增档案成功');
                                this.systemInsertShow = false;
                                this.systemTab();
                                this.cancels(name);
                            }
                        })
                     }
                 })
            },
            systemEdit(params){
                this.systemEditShow = true;
                this.systemEditInfo = JSON.parse(JSON.stringify(params.row));
            },
            systemEditSave(name){
                 this.$refs[name].validate((valid) => {
                     if(valid){
                         this.$http.put('/dictSystem',this.systemEditInfo).then((res)=>{
                            // console.log(res);
                            if(res.status==200){
                                this.$Message.success('编辑成功');
                                this.systemEditShow = false;
                                this.getDictCategory();
                            }
                        })
                     }
                 })
            }
        }
    };
</script>
