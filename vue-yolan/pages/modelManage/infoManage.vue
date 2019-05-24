<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>模型管理 /</span>
          <span>模型管理</span>
        </span>
        <span slot="footer" class="com-slot-right">
          <span class="T3 main-heading" @click="tableInsertShow=true;styleType=[]"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>添加模型</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="关键词" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.name" @on-enter="search"></Input>
            <input type="text" style="display: none">
          </Form-item>
          <Form-item label="着装风格" :label-width="65" class="specialCase" >
            <Select v-model="searchFrom.style">
              <Option :value="' '">全部</Option>
              <Option v-for="item in clothStyle" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属品类" :label-width="65" class="specialCase" >
            <Select v-model="searchFrom.clothid">
              <Option :value="' '">全部</Option>
              <Option v-for="item in clothType" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
          <Form-item prop="clothid"  label="所属品类:" :label-width="70" >
            <Select v-model="tableDoneInfo.clothid"  @on-change="dependChoose(tableDoneInfo.clothid)">
              <Option v-for='(item,index) in clothType' :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item prop="style"  label="着装风格:" :label-width="70" >
            <Select v-model="tableDoneInfo.style">
              <Option v-for='(item,index) in clothStyle' :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item prop="productStyle"  label="长短款:" :label-width="70" >
            <Select v-model="tableDoneInfo.productStyle">
              <Option v-for='(item,index) in longType' :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item prop="pointids"  label="锚点:" :label-width="70" style="-left: 5px;">
            <Select v-model="tableDoneInfo.pointids" filterable multiple>
              <Option v-for="item in styleType" :value="item.id" :key="item.value">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <!--<Form-item prop="pointids"  label="锚点:" :label-width="70" style="-left: 5px;">-->
            <!--<Select  v-model="doneExtension" multiple @on-change="doneTypeArr">-->
              <!--<Option v-for="(item,index) in styleType" :value="item.id" :key="index">{{ item.name }}</Option>-->
            <!--</Select>-->
          <!--</Form-item>-->
          <Form-item prop="depend"  label="内嵌品类:" :label-width="70" >
            <Select v-model="tableDoneInfo.depend" clearable>
              <Option v-for='(item,index) in clothType' :key="index" :value="item.id">{{item.name}}</Option>
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
          <Form-item prop="clothid"  label="所属品类:" :label-width="70" >
            <Select v-model="tableInsertInfo.clothid" @on-change="dependChoose(tableInsertInfo.clothid)">
              <Option v-for='(item,index) in clothType' :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item prop="style"  label="着装风格:" :label-width="70" >
            <Select v-model="tableInsertInfo.style">
              <Option v-for='(item,index) in clothStyle' :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item prop="productStyle"  label="长短款:" :label-width="70" >
            <Select v-model="tableInsertInfo.productStyle">
              <Option v-for='(item,index) in longType' :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item prop="pointids"  label="锚点:" :label-width="70" style="-left: 5px;">
            <Select v-model="tableInsertInfo.pointids" filterable multiple>
              <Option v-for="item in styleType" :value="item.id" :key="item.value">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <!--<Form-item prop="pointids"  label="锚点:" :label-width="70" style="-left: 5px;">-->
            <!--<Select  v-model="insertExtension" multiple @on-change="typeArr">-->
              <!--<Option v-for="(item,index) in styleType" :value="item.id" :key="index">{{ item.name }}</Option>-->
            <!--</Select>-->
          <!--</Form-item>-->
          <Form-item prop="depend"  label="内嵌品类:" :label-width="70" >
            <Select v-model="tableInsertInfo.depend" clearable>
              <Option v-for='(item,index) in clothType' :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="tableInsertSave('tableInsertInfo')">新增</Button>
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
        //衣服种类
        clothType:[],
        //着装风格
        clothStyle:[],
        //搜索条件
        searchFrom:{
          pageIndex:1,
          pageSize:10,
          name:'',
          clothid:' ',
          style:' ',
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
            title: '模型名称',
            width:'10%',
            key: 'name',
            align: 'center',
          },
          {
            title: '所属品类',
            width:'10%',
            key: 'categoryName',
            align: 'center',
          },
          {
            title: '着装风格',
            width:'10%',
            key: 'styleName',
            align: 'center',
          },
          {
            title: '是否内嵌',
            width:'10%',
            key: 'dependname',
            align: 'center',
//            render:(h,params)=>{
//              return h('span',{},params.row.stag=='0'?'正常':'内嵌')
//            }
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
        styleType:[],
        longType:[],
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
        pointids:[],
        tableDoneInfo:{},
        tableDoneRule:{
        },
        //新增
        tableInsertShow:false,
        tableInsertInfo:{
          pointids:[],
          name:'',
          productStyle:'',
          clothid:'',
          style:'',
          depend:'',
        },
        tableInsertRule:{
          name: [
            { required: true,message:'请填写名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'}
          ],
          clothid: [
            { type: 'number',required: true, message: '请选择所属品类', trigger: 'change' },
          ],
          style:[
            { type: 'number',required: true, message: '请选择着装风格', trigger: 'change' },
          ],
          productStyle:[
            { type: 'number',required: true, message: '请选择长短款', trigger: 'change' },
          ],
//          depend: [
//            { type: 'number',required: true, message: '请选择所属品类依赖', trigger: 'change' },
//          ],
        },
        //删除
        tableDeleteShow:false,
        tableDeleteInfo:''
      }
    },
    mounted(){
      this.ready();
      this.getClothType();
      this.getLongType()
    },
    methods: {
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
      //获取长短款
      getLongType(){
        this.$http.get('/stylelist',{params:{category:"ST"}}).then(res=>{
          this.longType = res.data.data
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
        this.$http.get( '/model',{params:this.searchFrom}).then(res=>{
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
        this.ready();
      },
      //编辑
      tableDone(row){
        this.$http.get('/model/'+row.id).then(res=>{
          if(res.data.clothid){
            this.$http.get('/points/'+res.data.clothid).then(res=>{
              this.styleType = res.data;
            })
          }
          this.tableDoneInfo=res.data;
          this.tableDoneInfo.pointids=res.data.pointids.split(',');
          this.tableDoneInfo.pointids=this.tableDoneInfo.pointids.map(function(value,index,array){    //遍历数组将字符串数组转换为数字数组
            return value = Number(value);
          });
          this.tableDoneShow=true;
        })
      },
      //编辑保存
      tableDoneSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(typeof this.tableDoneInfo.pointids !='string'){
              this.tableDoneInfo.pointids=this.tableDoneInfo.pointids.join(',')
            }
            if(this.tableDoneInfo.pointids[0]==''&&this.tableDoneInfo.pointids.length==1){
              this.tableDoneInfo.pointids=[]
            }
            this.$http.put('/model',this.tableDoneInfo).then(res=>{
              this.tableDoneShow=false;
              this.ready();
              this.$Message.success('修改成功');
            })
          }
        })
      },
      //新增
      tableInsertSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(typeof this.tableInsertInfo.pointids=='object'){
              this.tableInsertInfo.pointids=this.tableInsertInfo.pointids.join(',');
            }
            if(this.tableInsertInfo.pointids[0]==''&&this.tableInsertInfo.pointids.length==1){
              this.tableInsertInfo.pointids=[]
            }
            this.$http.post('/model',this.tableInsertInfo).then(res=>{
              this.tableInsertShow=false;
              this.ready();
              this.cancels(name);
              this.$Message.success('新增成功');
            })
          }
        })
      },
      //品类选择
      dependChoose (id) {
        this.styleType = [];
        this.tableInsertInfo.pointids=[]
         if(id){
           this.$http.get('/points/'+id).then(res=>{
             this.styleType = res.data;
           })
         }
      },
      //删除
      tableDeleteSave(){
        this.$http.delete('/model/'+this.tableDeleteInfo).then(res=>{
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
