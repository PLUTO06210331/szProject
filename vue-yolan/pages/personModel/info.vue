<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>

            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>模型管理 /</span>
          <span>人体模型信息</span>
        </span>
        <span slot="footer" class="com-slot-right">
          <span class="T3 main-heading" @click="tableInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>添加模型</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="关键词" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.name" @on-enter="search"></Input>
            <input type="text" style="display: none">
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
    </div>
    <!--编辑-->
    <div v-if="tableDoneShow">
      <Modal v-model="tableDoneShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('tableDoneInfo')">
        <p slot="header">
          <span class="main-heading">编辑模型</span>
        </p>
        <Form ref="tableDoneInfo" class="searchForm" label-position="left" :model="tableDoneInfo" :rules="tableInsertRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="name" label=" 名称:" :label-width="70" >
            <Input v-model="tableDoneInfo.name"></Input>
          </Form-item>
          <Form-item prop="code"  label="code:" :label-width="70" >
            <Input v-model="tableDoneInfo.code"></Input>
          </Form-item>
          <Form-item prop="path"  label="路径:" :label-width="70" >
            <Input v-model="tableDoneInfo.path"></Input>
          </Form-item>
          <Form-item prop="gender"  label="性别:" :label-width="70" >
            <Select v-model="tableDoneInfo.gender">
              <Option value="1" >男</Option>
              <Option value="0" >女</Option>
            </Select>
          </Form-item>
          <Form-item prop="ptype"  label="是否插兜:" :label-width="70" >
            <Select v-model="tableDoneInfo.ptype">
              <Option value="1" >插兜</Option>
              <Option value="0" >不插兜</Option>
            </Select>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="tableDoneSave('tableDoneInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--新增-->
    <div v-if="tableInsertShow">
      <Modal v-model="tableInsertShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('tableInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增模型</span>
        </p>
        <Form ref="tableInsertInfo" class="searchForm" label-position="left" :model="tableInsertInfo" :rules="tableInsertRule" inline style="text-align: left;padding:15px 50px 0 90px">
          <Form-item prop="name" label=" 名称:" :label-width="70" >
            <Input v-model="tableInsertInfo.name"></Input>
          </Form-item>
          <Form-item prop="code"  label="code:" :label-width="70" >
            <Input v-model="tableInsertInfo.code"></Input>
          </Form-item>
          <Form-item prop="path"  label="路径:" :label-width="70" >
            <Input v-model="tableInsertInfo.path"></Input>
          </Form-item>
          <Form-item prop="gender"  label="性别:" :label-width="70" >
            <Select v-model="tableInsertInfo.gender">
              <Option value="1" >男</Option>
              <Option value="0" >女</Option>
            </Select>
          </Form-item>
          <Form-item prop="ptype"  label="是否插兜:" :label-width="70" >
            <Select v-model="tableInsertInfo.ptype">
              <Option value="1" >插兜</Option>
              <Option value="0" >不插兜</Option>
            </Select>
          </Form-item>

        </Form>

        <div slot="footer">
          <i-col style="height: 40px;width: 310px;margin: 0 auto;text-align: center">
            <Upload :before-upload="handleUpload"
            action="" style="display: inline-block" >
              <Button class="Waybill" style="height: 60px;width: 310px;margin: 0 auto;text-align: center;">
                <i class="iconfont icon-wenjian"></i>
                <span>上传文件</span>
              </Button>
            </Upload>
          </i-col>
          <!--<div class="pattern">-->
            <!--<img v-if="positionPrintDone" :src="positionPrintDone" style="width: 300px;height: 300px">-->
            <!--<div style="position: absolute;bottom:0 ">-->
              <!--<div class="uploadDiv">-->
                <!--<Upload-->
                  <!--:before-upload="handleUpload"-->
                  <!--action=""-->
                  <!--:format="['jpg','jpeg','png']"-->
                  <!--style="display: inline-block" >-->
                  <!--<button class="upImg" :style="{'backgroundColor':positionPrintDone?'rgba(0,0,0,0.2)':'transparent','color':positionPrintDone?'white':'#42beb6'}">-->
                    <!--<i class="ivu-icon ivu-icon-ios-cloud-upload-outline"></i>-->
                    <!--<span>{{positionPrintDone?'重新上传':'上传文件'}}</span>-->
                  <!--</button>-->
                <!--</Upload>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <Button style="margin-top:30px;" class="save" @click="tableInsertSave('tableInsertInfo')">新增</Button>
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
  </div>
</template>

<script>
  import HeaderSlot from "../../components/public/head-slot.vue";
  import page from '../../components/public/page-current.vue';
  export default {
    components: {HeaderSlot},
    data () {
      return {
        files:'',
        //衣服种类
        clothType:[],
        //着装风格
        clothStyle:[],
        //搜索条件
        searchFrom:{
          pageIndex:1,
          pageSize:10,
          name:'',
        },
        //外表数据条数
        totals:1,
        //table
        columns: [
          {
            title: '序号',
            width:'4%',
            type:'index',
            align: 'center',
          },
          {
            title: '名称',
            width:'10%',
            key: 'name',
            align: 'center',
          },
          {
            title: '姓别',
            width:'10%',
            key: 'gender',
            align: 'center',
            render:(h,params)=>{
              return h('span',{},params.row.gender=='1'?'男':'女')
            }
          },
          {
            title: '路径',
            width:'10%',
            key: 'path',
            align: 'center',
          },
          {
            title: '是否插兜',
            width:'10%',
            key: 'stag',
            align: 'center',
            render:(h,params)=>{
              return h('span',{},params.row.ptype=='0'?'不插兜':'插兜')
            }
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
                        this.tableDeleteInfo=params.row.id
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
        data: [],
        //最近日期
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
        //编辑
        tableDoneShow:false,
        tableDoneInfo:{},
        tableDoneRule:{
        },
        //新增
        tableInsertShow:false,
        tableInsertInfo:{
          name:'',
          path:'',
          gender:'',
          ptype:'',
          code:'',
        },
        tableInsertRule:{
          name: [
            { required: true,message:'请填写名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'}
          ],
          code: [
            { required: true,message:'code不为空', trigger: 'blur' },
            { max:20,message: 'code不能超过20位', trigger: 'blur'}
          ],
          path: [
            { required: true,message:'path不为空', trigger: 'blur' },
            { max:20,message: 'path不能超过20位', trigger: 'blur'}
          ],
          gender: [
            { required: true, message: '请选择姓别', trigger: 'change' },
          ],
          ptype:[
            { required: true, message: '请选择是否插兜', trigger: 'change' },
          ],
        },
        //删除
        tableDeleteShow:false,
        tableDeleteInfo:''
      }
    },
    mounted(){
      this.ready();
      this.getClothType();
    },
    methods: {
      //手动提交
      handleUpload(file){
        this.files = '';
        var type= this.formatFlag(file.name)
        console.log(type);
        if(type){
          this.files=file;
          let r = new FileReader();  //本地预览
          var that=this
          r.onload = function(){
            that.positionPrintDone=r.result
          }
          r.readAsDataURL(file);
        }else{
          this.$Message.error('图片格式错误');
        }
        return false;
      },
      //判断上传文件格式(图片)
      formatFlag(filename){
        //return true
        var index = filename.lastIndexOf(".");
        var type=filename.substring(index+1,filename.length)
        if(type==='png'||type==='jpeg'||type==='bmp'||type==='jpg'){
          return true
        }else{
          return false
        }
      },
      PrintDoneSave(id){
        let data=new FormData(this.files)
        data.append('file', this.files)
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        if(this.files){
          this.$http.post('/personModel/path/'+id,data,config).then(res=>{
            this.$Message.success('新增成功');
            this.PrintShow=false
          });
        }else {
          this.$Message.success('新增成功');
        }

      },
      getClothType(){
        let obj = {
          category:'P',
          parentid:0,
        }
        this.$http.get('/dict/category',{params:obj}).then(res=>{
          this.clothType = res.data;
          let objs = {
            category:'S',
            parentid:0,
          }
          this.$http.get('/dict/category',{params:objs}).then(res=>{
            this.clothStyle = res.data;
          })
        })
      },
      cancels(name){
        this.$refs[name].resetFields();
      },
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
      ready(){
        this.$http.get( '/personModels',{params:this.searchFrom}).then(res=>{
          console.log(res.data);
          this.data=res.data.data;
          this.totals=res.data.total;
        })
      },
      search(){
        this.searchFrom.pageIndex=1
        this.$refs.pages.pageReset(this.searchFrom.pageSize,this.searchFrom.pageIndex);
        this.ready()
      },
      pageListen(data){
        this.searchFrom.pageIndex=data.pageIndex;
        this.searchFrom.pageSize=data.pageSize;
        console.log(this.searchFrom);
        this.ready();
      },
      //编辑
      tableDone(row){
        this.tableDoneInfo=JSON.parse(JSON.stringify(row));
        this.tableDoneShow=true;
      },
      tableDoneSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.put('/personModel',this.tableDoneInfo).then(res=>{
              this.tableDoneShow=false;
              this.search();
              this.$Message.success('修改成功');
            })
          }
        })
      },
      changeStatus(row){
        let date=JSON.parse(JSON.stringify(row));
        date.status=='1'?date.status='0':date.status='1'
        this.$http.put('/fabric',date).then(res=>{
          row.status=='1'?row.status='0':row.status='1'
        })
      },
      //新增
      tableInsertSave(name){
        console.log(this.tableInsertInfo);
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/personModel',this.tableInsertInfo).then(res=>{
              this.tableInsertShow=false;
              this.search();
              this.cancels(name);
              this.PrintDoneSave(res.data.id);
            })
          }
        })
      },
      //删除
      tableDeleteSave(){
        this.$http.delete('/personModels/'+this.tableDeleteInfo).then(res=>{
          this.tableDeleteShow=false;
          this.search();
          this.$Message.success('删除成功');
        })
      }
    },
  }
</script>
<style lang="scss" scoped>
</style>
