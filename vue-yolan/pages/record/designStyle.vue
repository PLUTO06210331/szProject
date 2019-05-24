<template>
  <div class="attireStyle spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
          <span>档案管理 /</span>
          <span>款式风格</span>
        </span>
        <span slot="footer" class="com-slot-right">
          <span class="T3 main-heading" @click="tableInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>新增风格</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline>
          <Form-item label="关键词" :label-width="60" class="specialCase">
            <Input v-model="searchForm.keyword" @on-enter="search"></Input>
          </Form-item>
          <Form-item :label-width="60" style="display: none">
            <Input></Input>
          </Form-item>
          <Form-item label="性别" :label-width="60" class="specialCase">
            <Select v-model="searchForm.gender">
              <Option :value="''">全部</Option>
              <Option :value="1">男</Option>
              <Option :value="0">女</Option>
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
      <!--新增-->
      <div v-if="tableInsertShow">
        <Modal v-model="tableInsertShow" class-name="delect entrepot" :mask-closable="false"  width="780" @on-cancel="cancels('tableAddInfo')" v-drag>
          <p slot="header">
            <span class="main-heading">新增</span>
          </p>
          <div class="autoDiv">
            <div class="modalContent" style="text-align:center">
              <h4>风格描述</h4>
              <Form ref="tableAddInfo" class="searchForm" label-position="left" :rules="tableInsertValidate" :model="tableAddInfo"  inline style="text-align: left;padding:30px 87px 0">
                <Row :gutter="24">
                  <i-col span="8">
                    <Form-item class="main-row miaoshu" prop="name" label=" 风格描述:" :label-width="75" >
                      <Input  v-model="tableAddInfo.name"></Input>
                    </Form-item>
                  </i-col>
                  <i-col span = "8" >
                    <Form-item class="main-row miaoshu " prop="sequenceno" label="排序:" :label-width="75" >
                      <Input  v-model="tableAddInfo.sequenceno"></Input>
                    </Form-item>
                  </i-col>
                  <i-col span="8">
                    <Form-item class="main-row" prop="gender" label="性别:" :label-width="70" >
                      <Select v-model="tableAddInfo.gender">
                        <Option :value="1">男</Option>
                        <Option :value="0">女</Option>
                      </Select>
                    </Form-item>
                  </i-col>
                </Row>
              </Form>
              <h4>标签</h4>
              <div class="main-tag" id="tagParName" style="text-align:left;padding: 30px 87px 45px;border-bottom:1px solid #e9eaec">
                <Tag id="tagName" v-for="(item,index) in count" :key="index" :name="item" closable @on-close="handleClose2">
                    <Input  v-model="count[index]" style="width: 150px;" @on-blur="countBlur(index)"></Input>
                </Tag>
                <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
              </div>
              <!--上传-->
              <!--<div id="pictrue" style="text-align:left;padding: 30px 70px 45px;">
                <ul>
                  <li v-for="(item,index) in tableAddInfo.picArr" style="position: relative;">
                    <img :src="item" alt="" style="width: 150px;height: 150px;">
                    <div class="iconStyle" @click="tableAddClose(index)">
                      <Icon  type="close-round"></Icon>
                    </div>
                  </li>
                  <Upload
                    multiple
                    :before-upload="rightUpload"
                    action=""
                    :format="['jpg','jpeg','png']"
                    style="margin: 5px;border: 1px dashed #dddddd;cursor: pointer">
                    <div style="width: 150px;height:150px;line-height: 150px;float: left;text-align: center;">
                      <Icon type="camera" size="20"></Icon>
                    </div>
                  </Upload>
                </ul>
              </div>-->
            </div>
          </div>
          <div slot="footer">
            <Button  class="clear" @click="tableInsertCancel('tableAddInfo')">清空</Button>
            <Button class="save" @click="tableAddSave('tableAddInfo')">保存</Button>
          </div>
        </Modal>
      </div>

      <!--编辑-->
      <div v-if="tableDoneShow">
        <Modal v-model="tableDoneShow" class-name="delect entrepot" :mask-closable="false"  width="780" @on-cancel="cancels('tableEditInfo')" v-drag>
          <p slot="header">
            <span class="main-heading">编辑</span>
          </p>
          <div class="autoDiv">
            <div class="modalContent" style="text-align:center">
              <h4>风格描述</h4>
              <Form ref="tableEditInfo" class="searchForm" label-position="left" :rules="tableInsertValidate" :model="tableEditInfo"  inline style="text-align: left;padding:30px 87px 0">
                <Row :gutter="24">
                  <i-col span="8">
                    <Form-item class="main-row miaoshu" prop="name" label=" 风格描述:" :label-width="75" >
                      <Input  v-model="tableEditInfo.name"></Input>
                    </Form-item>
                  </i-col>
                  <i-col span = "8">
                    <Form-item class="main-row miaoshu" prop="sequenceno" label="排序:" :label-width="75" >
                      <Input  v-model="tableEditInfo.sequenceno"></Input>
                    </Form-item>
                  </i-col>
                  <i-col span = "8">
                    <Form-item class="main-row" prop="gender" label="性别:" :label-width="70" >
                      <Select v-model="tableEditInfo.gender">
                        <Option :value="1">男</Option>
                        <Option :value="0">女</Option>
                      </Select>
                    </Form-item>
                  </i-col>
                </Row>
              </Form>
              <h4>标签</h4>
              <div class="main-tag" style="text-align:left;padding: 30px 87px 45px;border-bottom:1px solid #e9eaec;position: relative;">
                <Tag v-for="(item,index) in count" :key="index" :name="item" closable @on-close="handleClose2">
                      <Input v-model="count[index]"  style="width: 150px;" @on-blur="countBlur(index)"></Input>
                </Tag>
                <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
              </div>
              <!--上传-->
              <h4>风格描述</h4>
            </div>
          </div>
          <div slot="footer">
            <Button class="save" @click="tableInsertSave('tableEditInfo')">保存</Button>
          </div>
        </Modal>
      </div>
      <!--删除-->
      <div v-if="tableDeleteShow">
        <Modal v-model="tableDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
          <p slot="header" class="main-heading">
            提示框
          </p>
          <div>
            <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
          </div>
          <div slot="footer">
            <div class="footer">
              <Button  class="save" @click="tableDeleteSave">确认</Button>
              <Button  class="clear" @click="tableDeleteShow=false">取消</Button>
            </div>
          </div>
        </Modal>
      </div>
      <!--图例-->
      <div v-if="printShow">
        <Modal v-model="printShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag>
          <p slot="header">
            <span class="main-heading">图例</span>
          </p>
          <div class="pattern">
            <img v-if="specialPrintDone" :src="specialPrintDone" style="width: 300px;height: 300px">
            <div style="position: absolute;bottom:0 ">
              <div class="uploadDiv">
                <Upload
                  :before-upload="handleUpload"
                  action=""
                  :format="['jpg','jpeg','png']"
                  style="display: inline-block" >
                  <button class="upImg" :style="{'backgroundColor':specialPrintDone?'rgba(0,0,0,0.2)':'transparent','color':specialPrintDone?'white':'#42beb6'}">
                    <i class="ivu-icon ivu-icon-ios-cloud-upload-outline"></i>
                    <span>{{specialPrintDone?'重新上传':'上传文件'}}</span>
                  </button>
                </Upload>
              </div>
            </div>
          </div>

          <div slot="footer">
            <Button class="save" @click="PrintDoneSave()">保存</Button>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderSlot from "../../components/public/head-slot.vue";
  import page from '../../components/public/page-current.vue';
  import ICol from "../../../node_modules/iview/src/components/grid/col";
  export default {
    components: {ICol}, data () {
      const tableValidate = (rule, value, callback ) => {
        if(value === ""){
          callback(new Error('风格描述不能为空'));
        }else if(value.length > 50){
          callback(new Error('最多输入50位'));
        }else{
          callback()
        }
      };
      return {
          value:"",
         /*标签*/
        count: [],
        clothType:[],
        totals:1,              /*列表数据条数*/
        tableDeleteShow:false, /*删除*/
        searchForm:{           /*搜索条件*/
          keyword:"",
          pageIndex:1,
          pageSize:10,
          category:"SE",
          gender:"",
        },
        tableEditInfo: {
          name:"",
          gender:"",
          parentid:0,
          extension:"",
          dictid:"",
          category:"SE",
          picArr:[],
          sequenceno:"",
        },
        tableAddInfo:{
          name:"",
          gender:1,
          parentid:0,
          extension:"",
          dictid:"",
          category:"SE",
          picArr:[],
          sequenceno:"",
        },
        /*新增*/
        tableInsertShow:false,
        tableAddValidate: {
          name: [
            {required: true,validator:tableValidate, trigger: 'blur' }
          ],
          sequenceno: [
            {required: true,validator:this.$validate(true,'number','排序',10), trigger: 'blur' }
          ]
        },
        /*编辑*/
        tableDoneShow:false,
        tableInsertValidate: {
          name: [
            {required: true,validator:tableValidate, trigger: 'blur' }
          ],
          sequenceno: [
            {required: true,validator:this.$validate(true,'number','排序',10), trigger: 'blur' }
          ]
        },

        /*图例*/
        file:{
          file :'',
          id:'',
        },
        printShow:false,
        specialPrintDone:'',
        /*表格数据*/
        columns: [
          {
            title: '序号',
            width:'4%',
            type:'index',
            align: 'center',
          },
          {
            title: '风格描述',
            width:'10%',
            key:'name',
            align: 'center',
          },
          {
            title: '性别',
            width:'10%',
            key: 'gender',
            align: 'center',
            render:(h,params)=>{
              return h('span',{},params.row.gender=='1'?'男':'女');
            }
          },
          {
            title: '标签',
            width:'15%',
            key: 'extension',
            align: 'center',
            render: (h,params) => {
              return h('div',[
                h('Button', {
                  props: {
                    type: params.row.extension == '商务正装'? 'success': params.row.extension == '混搭'? 'primary':params.row.extension == '商务休闲'?'warning':params.row.extension == '礼服'?'error':'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                }, params.row.extension),
              ]);

            },
          },
          {
            title: '操作',
            width:'10%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    class: 'blueButton ',
                    style: {
                      marginLeft: '8px',
                      background:"#fff",
                    },
                    on: {
                      click: () => {
                        this.specialPrint(params.row)
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-bianji',
                    }),

                    h('span',{
                    },'图例')
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
                        this.tableDeleteInfo=params.row.id;
                        this.tableDeleteShow=true;
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
        data:[],
        /*品类名*/
        style:[],
      }
    },
    mounted(){
      this.ready();
    },
    methods:{
      /*获取表格数据*/
      ready(){
        this.$http.get('/dictlist',{params:this.searchForm}).then(res=>{
          this.data = res.data.data;
          this.totals = res.data.total;
        })
      },

      pageListen (data) {
        this.searchForm.pageIndex=data.pageIndex;
        this.searchForm.pageSize=data.pageSize;
        this.ready();
      },
      /*搜索*/
      search(){
        this.searchForm.pageIndex = 1;
        this.$refs.pages.pageReset(this.searchForm.pageSize,this.searchForm.pageIndex);
        this.ready()
      },

      tableAddTag(name) {
          let Arr=this.count;
          let Arr1 = new Array();
          for(let i in Arr){
            Arr1.push(Arr[i]);
          }
        name.extension = Arr1.join(",");
      },
      /*新增保存*/
      tableAddSave (name) {
        this.$refs[name].validate((valid) => {
          if(valid){
            var length = this.count;
            for(var x in length){
              if(length[x].length > 50){
                this.$Message.error('标签总长度不能大于50');
                return
              }
            }
            this.tableAddTag(this.tableAddInfo);
            this.$http.post('/dict',this.tableAddInfo).then(res=>{
                this.count = [];
                this.tableInsertShow = false;
                this.search();
                this.$refs[name].resetFields();
                this.tableAddInfo.picArr = [];
                this.$Message.success("新增成功!");
            });
          }
        });
      },
      /*清空*/
      tableInsertCancel (name) {
        this.$refs[name].resetFields();
        this.count = [];
      },
      //编辑
      tableDone (row){
        this.tableDoneShow = true;
        this.tableEditInfo.gender = Number(row.gender);
        this.$http.get('/dict/'+row.id).then(res=>{
          this.tableEditInfo=res.data;
          this.count = res.data.extension.split(",");
          if(this.count[0] == "" && this.count.length == 1){
            this.count = [];
          }
        });
      },
      //标签市区焦点
      countBlur (name){
        this.count[name] = this.count[name].replace(/,/g,'');
        if(this.count[name].length > 50){
          this.$Message.error('标签总长度不能大于50');
          return
        }
      },
      /*编辑保存*/
      tableInsertSave (name) {
        this.$refs[name].validate((valid) =>{
         if(valid){
           var length = this.count;
           for(var x in length){
             if(length[x].length > 50){
               this.$Message.error('标签总长度不能大于50');
               return
             }
           }
           this.tableAddTag(this.tableEditInfo);
            this.$http.put('/dict',this.tableEditInfo).then(res=> {
              this.tableDoneShow = false;
              this.search();
              this.$Message.success("修改成功!");
            });
         }
        });
      },

      /*图例*/
      specialPrint (row) {
        this.specialPrintDone='';
        this.$http.get('/image/'+row.id).then(res=>{
          if(res.data.filepath){
            this.specialPrintDone=this.$http.defaults.baseURL+res.data.filepath;
          }
          this.printShow=true;
          this.file.id=row.id;
          this.file.file='';
        });
      },
      handleUpload (file) {
        var type= this.formatFlag(file.name);
        if(type){
          this.file.file=file;
          let r = new FileReader();
          var that=this;
          r.onload = function(){
            that.specialPrintDone=r.result
          };
          r.readAsDataURL(file);
        }else{
          this.$Message.error('图片格式错误');
        }
        return false;
      },
      //判断上传文件格式(图片)
      formatFlag(filename){
        var index = filename.lastIndexOf(".");
        var type=filename.substring(index+1,filename.length)
        if(type==='png'||type==='jpeg'||type==='bmp'|| type==='jpg'){
          return true
        }else{
          return false
        }
      },
      PrintDoneSave () {
        let data=new FormData(this.file.file);
        data.append('file', this.file.file);
        data.append('id', this.file.id);
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        if(this.file.file){
          this.$http.post('/dict/styleimage',data,config).then(res=>{
            this.$Message.success('上传成功');
            this.printShow=false
          });
        }else{
          if(this.specialPrintDone){
            this.$Message.success('保存成功');
            this.printShow=false;
            return;
          }
          this.$Message.error('请选择图片');
        }
      },

      /*删除*/
      tableDeleteInfo () {
        this.tableDeleteShow = true;
      },
      /*确认删除*/
      tableDeleteSave () {
        this.$http.delete('/dict/'+this.tableDeleteInfo).then(res=>{
          this.tableDeleteShow=false;
          this.search();
          this.$Message.success('删除成功');
        })
      },

      //点击Model右上角叉号
      cancels (name) {
        this.$refs[name].resetFields();
        this.count = [];
      },

      //添加标签
      handleAdd () {
        if (this.count.length) {
          this.count.push('');
        } else {
          this.count.push('');
        }
      },
      handleClose2 (event, name) {
        const index = this.count.indexOf(name);
        this.count.splice(index, 1);
      },

      /*上传图片*/
      rightUpload(file){
        var type= this.formatFlag(file.name);
        if(type){
          let r = new FileReader();  //本地预览
          var that=this;
          r.onload = function(){
            that.tableAddInfo.picArr.push(r.result)
          };
          r.readAsDataURL(file);
        }else{
          that.tableAddInfo.picArr.push('???');
          this.$Message.error('图片格式错误');
        }
        return false;
      },
      /*删除图片*/
      tableAddClose(index){
        this.tableAddInfo.picArr.splice(index,1);
      },
    }
  }
</script>

<style scoped>

</style>

<style lang="scss">
  .main-row{
    width: 100% !important;
  }
  .ivu-form{
    border: none !important;
  }
    .main-tag {
      .ivu-btn {
        width: 31%;
        height: 32px;
      }
      .ivu-tag{
        width:31% !important;
        height:32px;
      }
      input{
        background: #f7f7f7 !important;
      }
    }
  /*图例*/
  .pattern{
    width: 300px;
    height: auto;
    min-height: 100px;
    padding-top: 20px;
    margin: 0 auto;
    text-align: center;
    position: relative;
  }
  .iconStyle{
    width: 20px;
    height: 20px;
    position: absolute;
    top: -15px;
    left: -9px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 50%;
    text-align: center;
  }
  /*上传设置*/
  .uploadDiv{
    width: 100%;
    height: 65px;
    margin: 0 auto;
    text-align: center;
  }

  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  #pictrue{
    width: 100%;
    padding: 15px;
    overflow: auto;
    li{
      width: 150px;
      height: 150px;
      border: 1px solid #dddddd;
      margin: 5px 5px;
      float: left;
    }
    .ivu-upload{
      width:150px;
      float: left;
    }
  }
  .miaoshu{
    position: relative;
  }
  .miaoshu .ivu-form-item-error-tip{
    left: 105px;
    position: absolute;
  }

</style>

