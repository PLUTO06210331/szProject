<template>
  <div class="embroid-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>物流中心 /</span>
          <span>特体</span>
        </span>
        <span slot="footer" class="com-slot-right">
          <span class="T3 main-heading" @click="specialBodyShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>添加特体部位</span></span>
        </span>
        <span slot="footer" class="com-slot-right">
          <span class="T3 main-heading" @click="specialInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>添加{{clothType[clothIndex].name}}</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <!--<Form-item label="关键字" :label-width="60" class="specialCase" >-->
          <!--<Input @on-enter="search"></Input>-->
          <!--<input type="text" style="display: none">-->
          <!--</Form-item>-->
          <!--<Form-item class="specialHandling .specialHandling">-->
          <!--<Button icon="search" @click="search" @on-enter="search"></Button>-->
          <!--</Form-item>-->
        </Form>
        <div style="clear: both"></div>
        <div id="screenDiv">
          <div class="tabDiv">
            <div class="left">
              <h4 class="name">特体部位</h4>
                  <Tabs value="1" :animated='false' @on-click='tabClick'>
                    <TabPane label="净体特体" name="1">
                      <ul style="height: calc(100% - 34px);overflow-y: auto">
                        <li v-for="(item,index) in clothType" @click="chooseCloth(index,item)" :key="index" :style="{'backgroundColor':clothIndex==index?'#00b6f1':''}">{{item.name}}  <Button @click.stop="bodyDelete(item.id,item.name)" class="bodyDelete" type="ghost" shape="circle" icon="close" size="small"></Button></li>
                      </ul>
                    </TabPane>
                    <TabPane label="成衣特体 " name="2">
                      <ul style="height: calc(100% - 34px);overflow-y: auto">
                        <li v-for="(item,index) in clothType" @click="chooseCloth(index,item)" :key="index" :style="{'backgroundColor':clothIndex==index?'#00b6f1':''}">{{item.name}}  <Button @click.stop="bodyDelete(item.id,item.name)" class="bodyDelete" type="ghost" shape="circle" icon="close" size="small"></Button></li>
                      </ul>
                    </TabPane>
                    <TabPane label="标准号特体" name="3">
                      <ul style="height: calc(100% - 34px);overflow-y: auto">
                        <li v-for="(item,index) in clothType" @click="chooseCloth(index,item)" :key="index" :style="{'backgroundColor':clothIndex==index?'#00b6f1':''}">{{item.name}}  <Button @click.stop="bodyDelete(item.id,item.name)" class="bodyDelete" type="ghost" shape="circle" icon="close" size="small"></Button></li>
                      </ul>
                    </TabPane>
                </Tabs>
            </div>
            <div class="right">
              <div class="tabTable">
                <Table border :columns="specialColumns" :data="specialData"></Table>
              </div>
              <!--<div class="tabPage">-->
                <!--&lt;!&ndash;<div class="totals">共<span>{{specialTotals}}</span>条</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div style="float: right;width: 500px;text-align: right">&ndash;&gt;-->
                  <!--&lt;!&ndash;<Page :total="specialTotals" placement="top" size="small" show-elevator show-sizer @on-change="specialPage" @on-page-size-change="specialSize"></Page>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--编辑-->
    <div v-if="specialDoneShow">
      <Modal v-model="specialDoneShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('specialDoneInfo')">
        <p slot="header">
          <span class="main-heading">编辑</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="specialDoneInfo" class="searchForm" label-position="left" :model="specialDoneInfo" :rules="specialRule" inline style="text-align: left;padding:15px 60px 0">
            <Form-item prop="ecode" label="ecode:" :label-width="90" >
              <Input v-model="specialDoneInfo.ecode"></Input>
            </Form-item>
            <Form-item prop="name"  label="名称:" :label-width="90" >
              <Input v-model="specialDoneInfo.name"></Input>
            </Form-item>
            <Form-item prop="en"  label="英文名称:" :label-width="90" >
              <Input v-model="specialDoneInfo.en"></Input>
            </Form-item>
            <Form-item prop="dictid"  label="dictid:" :label-width="90" >
              <Input v-model="specialDoneInfo.dictid"></Input>
            </Form-item>
            <Form-item prop="sequenceno"  label="排序:" :label-width="90" >
              <Input v-model="specialDoneInfo.sequenceno"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="specialDoneSave('specialDoneInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--新增-->
    <div v-if="specialInsertShow">
      <Modal v-model="specialInsertShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('specialInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增</span>
        </p>
        <Form ref="specialInsertInfo" class="searchForm" label-position="left" :model="specialInsertInfo" :rules="specialRule" inline style="text-align: left;padding:15px 50px 0 90px">
          <Form-item prop="name" label="名称:" :label-width="70" >
            <Input v-model="specialInsertInfo.name"></Input>
          </Form-item>
          <Form-item prop="en" label="英文名称:" :label-width="70" >
            <Input v-model="specialInsertInfo.en"></Input>
          </Form-item>
          <Form-item prop="ecode"  label="ecode:" :label-width="70" >
            <Input v-model="specialInsertInfo.ecode"></Input>
          </Form-item>
          <Form-item prop="dictid" label="下单系统ID:" :label-width="85" >
            <Input v-model="specialInsertInfo.dictid"></Input>
          </Form-item>
          <Form-item prop="sequenceno"  label="排序:" :label-width="70" >
            <Input v-model="specialInsertInfo.sequenceno"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="specialInsertSave('specialInsertInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--删除-->
    <div v-if="specialDeleteShow">
      <Modal v-model="specialDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="specialDeleteSave">确认</Button>
            <Button  class="clear" @click="specialDeleteShow=false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!--位置图例-->
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
    <!--新增特体-->
    <div v-if="specialBodyShow">
      <Modal v-model="specialBodyShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('specialBody')">
        <p slot="header">
          <span class="main-heading">新增</span>
        </p>
        <Form ref="specialBody" class="searchForm" label-position="left" :model="specialBody" :rules="specialRule" inline style="text-align: left;padding:15px 50px 0 90px">
          <Form-item prop="name" label="名称:" :label-width="70" >
            <Input v-model="specialBody.name"></Input>
          </Form-item>
          <Form-item prop="en" label="英文名称:" :label-width="70" >
            <Input v-model="specialBody.en"></Input>
          </Form-item>
          <Form-item prop="ecode"  label="ecode:" :label-width="70" >
            <Input v-model="specialBody.ecode"></Input>
          </Form-item>
          <Form-item prop="dictid" label="下单系统ID:" :label-width="85" >
            <Input v-model="specialBody.dictid"></Input>
          </Form-item>
          <Form-item prop="sequenceno"  label="排序:" :label-width="70" >
            <Input v-model="specialBody.sequenceno"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="specialBodySave('specialBody')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--删除特体-->
    <div v-if="bodyDeleteShow">
      <Modal v-model="bodyDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除<span style="color: red">{{specialBodyName}}</span>吗？删除后该部位所有信息将会删除
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="bodyDeleteShowSave">确认</Button>
            <Button  class="clear" @click="bodyDeleteShow=false">取消</Button>
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
      const ecode = (rule, value, callback) => {
        if (value === "" || value === null) {
          callback(new Error('请输入ecode'));
        } else {
          if (!/^[0-9A-Za-z]+$/.test(value)) {
            callback(new Error('请输入字母、数字'));
          } else if (value.length > 10) {
            callback(new Error('最多输入10位'));
          } else {
            callback();
          }
        }
      };
      return {
        //添加模块变量控制
        whoAdd:'position',
        token:'',
        //品类
        clothType:[{name:''}],
        //品类默认index
        clothIndex:0,
        searchFrom:{
          parentid:0,
        },
        specialTotals:1,
        specialColumns:[
          {
            title: '序号',
            width:'10%',
            type:'index',
            align: 'center',
          },
          {
            title: 'ID',
            width:'10%',
            key: 'id',
            align: 'center',
          },
          {
            title: '名称',
            width:'40%',
            key: 'name',
            align: 'center',
          },
          {
            title: '操作',
            width:'40%',
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
                        this.specialDone(params.row)
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
                        this.specialDeleteInfo=params.row.id
                        this.specialDeleteShow=true;
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
        specialData:[],
        specialRule:{
          name: [
            { required: true,message:'请填写名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'},
          ],
          en: [
            { required: true,message:'请填写英文名称', trigger: 'blur' },
            { max:30,message: '英文名称不能超过30位', trigger: 'blur'},
          ],
          // ecode: [
          //   { required: true,validator:ecode, trigger: 'blur' },
          // ],
          dictid :[
            { required: true,validator:this.$validate(true,'number','下单系统id',10), trigger: 'blur' },
          ],
          sequenceno:[
            { required: true,validator:this.$validate(true,'number','排序',10), trigger: 'blur' },
          ],
        },
        //新增
        specialInsertShow:false,
        specialInsertInfo:{
          parentid:'',
          name:'',
          en:'',
          ecode:'',
          dictid:'',
          sequenceno:'',
          category:'BD'
        },
        //编辑
        specialDoneInfo:{},
        specialDoneShow:false,
        //删除
        specialDeleteInfo:"",
        specialDeleteShow:false,
        //图例
        file:{
          file :'',
          id:'',
        },
        printShow:false,
        specialPrintDone:'',
        //添加左侧特体
        specialBodyShow:false,
        specialBody:{
          parentid:0,
          name:'',
          en:'',
          ecode:'',
          dictid:'',
          sequenceno:'',
          category:'BD'
        },
        //删除左侧的
        bodyDeleteShow:false,
        specialBodyID:'',
      }
    },
    mounted(){
      //设置高的样式
      this.screenDivSize();
      //获取品类列表
      this.getClothType();
      this.token=sessionStorage.getItem('token')
    },
    methods: {
      screenDivSize(){
        let screenDiv=document.getElementById('screenDiv');
        this.$nextTick(function(){
          let searchForm=document.getElementsByClassName('searchForm')[0];
          if(screenDiv){
            screenDiv.style.height=window.innerHeight-searchForm.offsetHeight-90+'px';
          }
        })
      },
      cancels(name){
        this.$refs[name].resetFields();
      },
      //获取品类大全
      getClothType(){
        this.$http.get('/specialParts',{params:{extension:1,parentid:0}}).then(res=>{
          console.log(res.data)
          this.clothType=res.data;
          this.specialInsertInfo.parentid=res.data[0].id;
          this.searchFrom.parentid=res.data[0].id;
          this.tableReady()
        })
      },
      tableReady(){
        this.$http.get('/specialParts',{params:this.searchFrom}).then(res=>{
          this.specialData=res.data
        })
      },
      //品类变化
      chooseCloth(index,item){
        this.clothIndex=index;
        this.searchFrom.parentid=item.id;
        this.specialInsertInfo.parentid=item.id;
        this.tableReady()
      },
      //页码变化
      specialPage(data){
        this.positionSearchFrom.pageIndex=data
        this.tableReady();
      },
      specialSize(data){
        this.searchFrom.pageSize=data
        this.tableReady();
      },
      //编辑
      specialDone(row){
        this.specialDoneShow=true;
        this.specialDoneInfo=JSON.parse(JSON.stringify(row))
      },
      //编辑保存
      specialDoneSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.put('/dict',this.specialDoneInfo).then(res=>{
              this.specialDoneShow=false;
              this.tableReady();
              this.$Message.success('修改成功');
            })
          }
        })
      },
      //新增保存
      specialInsertSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log(this.specialInsertInfo);
            this.$http.post('/dict',this.specialInsertInfo).then(res=>{
              this.specialInsertShow=false;
              this.tableReady();
              this.$Message.success('添加成功');
              this.cancels(name)
            })
          }
        })
      },
      //确认删除
      specialDeleteSave(){
        this.$http.delete('/dict/'+this.specialDeleteInfo).then(res=>{
          this.specialDeleteShow=false;
          this.tableReady();
          this.$Message.success('删除成功');
        })
      },
      //图例
      specialPrint(row){
        this.specialPrintDone=''
        this.$http.get('/image/'+row.id).then(res=>{
          if(res.data.filepath){
            this.specialPrintDone=this.$http.defaults.baseURL+res.data.filepath;
          }
          this.printShow=true;
          this.file.id=row.id;
          this.file.file='';
        });
      },
      //手动提交
      handleUpload(file){
        var type= this.formatFlag(file.name)
        if(type){
          this.file.file=file;
          let r = new FileReader();  //本地预览
          var that=this
          r.onload = function(){
            that.specialPrintDone=r.result
          }
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
        if(type==='png'||type==='jpeg'||type==='bmp'||type==='jpg'){
          return true
        }else{
          return false
        }
      },

      PrintDoneSave(){
        let data=new FormData(this.file.file)
        data.append('file', this.file.file)
        data.append('id', this.file.id)
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        if(!this.file.file&&this.specialPrintDone){
          this.$Message.success('上传成功');
          this.printShow=false
          return
        }
        if(this.file.file){
          this.$http.post('/dict/specialimage',data,config).then(res=>{
            this.$Message.success('上传成功');
            this.printShow=false
            //this.positionPrintDone=this.file.file;
          });
        }else {
          this.$Message.error('请选择图片');
        }

      },
      //添加左侧特体
      specialBodySave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/dict',this.specialBody).then(res=>{
              this.specialBodyShow=false;
              this.getClothType();
              this.$Message.success('添加成功');
              this.cancels(name)
            })
          }
        })
      },
      //删除
      bodyDelete(id,name){
        this.specialBodyID=id
        this.specialBodyName=name
        this.bodyDeleteShow=true
      },
      bodyDeleteShowSave(){
        this.$http.delete('/dict/'+this.specialBodyID).then(res=>{
            this.$Message.success('删除成功')
            this.bodyDeleteShow=false
            this.getClothType()
        })
      },
      // tab切换
      tabClick(name){
        this.$http.get('/specialParts',{params:{extension:name,parentid:0}}).then(res=>{
          console.log(res.data)
          this.clothType=res.data;
          this.specialInsertInfo.parentid=res.data[0].id;
          this.searchFrom.parentid=res.data[0].id;
          this.tableReady()
        })
      }
    },
  }
</script>
<style lang="scss">
  .bodyDelete{
    float: right;
    position: relative;
    top: 8px;
    right:10px;
    color:#ff9901;
    border: none;
    &:hover{
      border: none;
      color:#ff9901;
    }
  }
  #screenDiv{
    .tabDiv {
      height: 100%;
      .left {
        float: left;
        height: 97%;
        width: 300px;
        border: 1px solid #dddddd;
        margin-right: 10px;
          // tab
        .ivu-tabs{
          height:100%;
          .ivu-tabs-tab{
            margin-right:10px;
            padding:8px 14px;
          }
          .ivu-tabs-content{
            overflow-y: scroll;
            height: calc(100% - 41px);
          }
        }
        /*品类表头*/
        .name {
          border: 1px solid #dddddd;
          border-left: none;
          border-right: none;
          height: 34px;
          line-height: 34px;
          text-align: center;
          background-color: #f8f8f9;
        }
        /*品类中的选项*/
        li {
          height: 40px;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
          border-bottom: 1px solid #dddddd;
        }
      }
      .right {
        float: left;
        height: 97%;
        width: calc(100% - 310px);
        border: 1px solid #dddddd;
        .tabTable {
          height: calc(100% - 40px);
          overflow-y: auto;
        }
        .tabPage {
          padding: 0px 10px;
          background-color: #f8f8f9;
          height: 40px;
          line-height: 40px;
          .totals {
            float: left;
            width: 80px;
          }
        }
      }
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
  /*上传设置*/
  .uploadDiv{
    width: 100%;
    height: 65px;
    margin: 0 auto;
    text-align: center;
  }
</style>



