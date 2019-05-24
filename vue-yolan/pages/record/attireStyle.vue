<template>
  <div class="attireStyle spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
          <span>档案管理 /</span>
          <span>着装风格</span>
        </span>
        <span slot="footer" class="com-slot-right">
          <span class="T3 main-heading" @click="tableInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>添加着装风格</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline>
          <!--<Form-item label="关键词" :label-width="60" class="specialCase">-->
            <!--<Input v-model="searchForm.keyword" @on-enter="search"></Input>-->
            <!--<input type="text" style="display: none">-->
          <!--</Form-item>-->
          <!--<Form-item class="specialHandling .specialHandling">-->
            <!--<Button icon="search" @click="search" @on-enter="search"></Button>-->
          <!--</Form-item>-->
        </Form>
        <div style="clear: both"></div>
        <div id="tableBox" ref="tableBox">
          <Table v-com border :columns="columns" :data="data"></Table>
        </div>
        <page-current ref="pages" class="pages-position" :total="totals" @pageChange="pageListen"></page-current>
      </div>
      <!--新增-->
      <div v-if="tableInsertShow">
        <Modal v-model="tableInsertShow" v-drag class-name="delect entrepot" :mask-closable="false"  width="480" @on-cancel="cancels('tableAddInfo')">
          <p slot="header">
            <span class="main-heading">新增</span>
          </p>
          <Form ref="tableAddInfo" class="searchForm" label-position="left" :rules="tableInsertValidate" :model="tableAddInfo"  inline style="text-align: left;padding:15px 87px 0">
            <Form-item prop="name" label="名称:" :label-width="90" >
              <Input  v-model="tableAddInfo.name"></Input>
            </Form-item>
            <Form-item prop="dictid"  label="下单系统ID:" :label-width="90" >
              <Input v-model="tableAddInfo.dictid"></Input>
            </Form-item>
            <Form-item prop="extension"  label="品类:" :label-width="84" style="-left: 5px;">
              <Select class="select" v-model="insertExtension" multiple @on-change="typeArr">
                <Option v-for="(item,index) in style" :value="item.id" :key="index">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Form>
          <div slot="footer">
            <Button  class="clear" @click="tableInsertCancel('tableAddInfo',1)">清空</Button>
            <Button class="save" @click="tableInsertSave('tableAddInfo')">保存</Button>
          </div>
        </Modal>
      </div>

      <!--编辑-->
      <div v-if="tableDoneShow">
        <Modal v-model="tableDoneShow" v-drag class-name="delect entrepot" :mask-closable="false"  width="480" @on-cancel="cancels('tableDoneInfo')">
          <p slot="header">
            <span class="main-heading">编辑</span>
          </p>
          <Form ref="tableDoneInfo" class="searchForm" label-position="left" :rules="tableDoneValidate" :model="tableDoneInfo"  inline style="text-align: left;padding:15px 87px 0">
            <Form-item prop="name" label="名称:" :label-width="90" >
              <Input v-model="tableDoneInfo.name"></Input>
            </Form-item>
            <Form-item prop="dictid"  label="下单系统ID:" :label-width="90" >
              <Input v-model="tableDoneInfo.dictid"></Input>
            </Form-item>
            <Form-item prop="extension"  label="品类:" :label-width="84" style="padding-left: 5px">
              <Select class="select" v-model="doneExtension" multiple @on-change="doneTypeArr">
                <Option v-for="(item,index) in style" :value="item.id" :key="index">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Form>
          <div slot="footer">
            <Button class="save" @click="tableEditSave('tableDoneInfo')">保存</Button>
          </div>
        </Modal>
      </div>
      <!--删除-->
      <div v-if="tableDeleteShow">
        <Modal v-model="tableDeleteShow" v-drag class-name="deleteModel" :mask-closable=false  width="600" v-drag>
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
  </div>
</template>
<script>
  import HeaderSlot from "../../components/public/head-slot.vue";
  import page from '../../components/public/page-current.vue';
  export default {
    data () {
      const tableValidate = (rule, value, callback ) => {
        if(value === ""){
          callback(new Error('品类不能为空'));
        }else{
          callback();
        }
      };
      return {
        doneExtension:[],
        insertExtension:[],
        totals:1,              /*列表数据条数*/
        tableDeleteShow:false, /*删除*/
        searchForm:{           /*搜索条件*/
          keyword:"",
          pageIndex:1,
          pageSize:10,
          category:"S"
        },
        tableDoneInfo: {
          name:"",
          category:"S",
          extension:[],
          parentid:0,
        },
        tableAddInfo:{
          name:"",
          parentid:0,
          extension:[],
          dictid:"",
          category:"S"
        },
        tableNewInfo:{
          parentid:0,
          category:"P"
        },
        /*新增*/
        tableInsertShow:false,
        tableInsertValidate: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur' }
          ],
          dictid: [
            {required: true,validator:this.$validate(true,'number','下单系统ID',10), trigger: 'blur' }
          ],
          extension:[
            {required: true,message: '请选择服装品类', trigger: 'change' }
          ]
        },
        /*编辑*/
        tableDoneShow:false,
        tableDoneValidate: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur' }
          ],
          dictid: [
            {required: true,validator:this.$validate(true,'number','下单系统ID',10), trigger: 'blur' }
          ],
          extension:[
            {required: true,message: '请选择服装品类', trigger: 'change' }
          ]
        },
        /*表格数据*/
        columns: [
          {
            title: '序号',
            width:'4%',
            type:'index',
            align: 'center',
          },
          {
            title: '名称',
            width:'20%',
            key:'name',
            align: 'center',
          },
          {
            title: '应用品类',
            width:'20%',
            key: 'extension',
            align: 'center',
          },
          {
            title: '下单系统ID',
            width:'20%',
            key: 'dictid',
            align: 'center',
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
                        this.tableDone(params.row);
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
        data:[],
        /*品类名*/
        style:[],
      }
    },
    mounted(){
      this.ready();
      this.styleList();
    },
    methods:{
      /*编辑给品类赋值*/
      styleList () {
        this.$http.get('/dict/category',{params:this.tableNewInfo}).then(res => {
          this.style = res.data;
        });
      },
      /*获取表格数据*/
      ready(){
        this.$http.get('/stylelist',{params:this.searchForm}).then(res=>{
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
      /*新增*/
      tableInsertSave (name) {
        this.$refs[name].validate((valid) => {
          if(valid){
            this.$http.post('/dict',this.tableAddInfo).then(res=>{
              this.tableInsertShow = false;
              this.ready();
              this.$refs[name].resetFields();
              this.insertExtension = [];
              this.$Message.success("新增成功!");
            });
          }
        });
      },
      /*新增数组转换字符串*/
      typeArr(){
        let Arr=new Array(this.insertExtension);
        this.tableAddInfo.extension=Arr.join(',');

      },
      /*新增 编辑清空*/
      tableInsertCancel (name,val) {
        if(val == 1){
          this.insertExtension = [];
        }else if(val == 2){
          this.doneExtension = [];
        }
        this.$refs[name].resetFields();
      },
      //编辑
      tableDone (row) {
        this.$http.get('/dict/'+row.id).then(res=> {
          this.doneExtension = res.data.extension.split(','); //取到值转换成数组
          let numArr = this.doneExtension;                    // 定义变量等于这个数组
          numArr = numArr.map(function(value,index,array){    //遍历数组将字符串数组转换为数字数组
            return value = Number(value);
          });
          this.doneExtension = numArr;
          this.tableDoneInfo=res.data;
          this.tableDoneShow=true;
        });
      },

      /*编辑保存*/
      tableEditSave (name) {
        this.$refs[name].validate((valid) => {
          if(valid){
            this.$http.put('/dict',this.tableDoneInfo).then(res=> {
              this.tableDoneShow = false;
              this.ready();
              this.$Message.success("修改成功!");
            });
          }
        });
      },
      doneTypeArr () {
        let Arr1=new Array(this.doneExtension);
        this.tableDoneInfo.extension=Arr1.join(',');
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
        this.insertExtension = [];
      },
    }
  }
</script>

<style scoped>

</style>

<style lang="scss">
/*.select{
  .ivu-select-selection {
    padding: 0 24px 0 4px;
    min-height: 28px;
  }*/
//}
</style>

