<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>档案管理 /</span>
          <span>量体部位</span>
        </span>
        <span slot="footer" class="com-slot-right">
           <span class="T3 main-heading" @click="tableInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>新增量体部位</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="关键词" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.keyword" @on-enter="search"></Input>
            <input type="text" style="display: none">
          </Form-item>
          <Form-item label='部位分类' :label-width="80" class="specialCase">
            <Select v-model='searchFrom.category '>
              <Option  value="PT" >净体部位</Option>
              <Option  value="PTF" >成衣部位</Option>
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
          <span class="main-heading">编辑</span>
        </p>
        <Form ref="tableDoneInfo" class="searchForm" label-position="left" :model="tableDoneInfo" :rules="tableInsertRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="name" label="名称:" :label-width="70" >
            <Input v-model="tableDoneInfo.name"></Input>
          </Form-item>
          <Form-item prop="en" label="英文名称:" :label-width="70" >
            <Input v-model="tableDoneInfo.en"></Input>
          </Form-item>
          <Form-item prop="ecode"  label="ecode:" :label-width="70" >
            <Input v-model="tableDoneInfo.ecode"></Input>
          </Form-item>
          <Form-item prop="category"  label="部位分类:" :label-width="70" >
            <Select v-model="tableDoneInfo.category ">
              <Option  value="PT" >净体部位</Option>
              <Option  value="PTF" >成衣部位</Option>
            </Select>
          </Form-item>
          <Form-item prop="dictid" label="下单系统ID:" :label-width="85" >
            <Input v-model="tableDoneInfo.dictid"></Input>
          </Form-item>
          <Form-item prop="sequenceno"  label="排序:" :label-width="70" >
            <Input v-model="tableDoneInfo.sequenceno"></Input>
          </Form-item>
          <Form-item prop="category "  label="是否必填:" :label-width="70" >
            <Select v-model="tableDoneInfo.category ">
              <Option  :value="'1'" >是</Option>
              <Option  :value="'0'" >否</Option>
            </Select>
          </Form-item>
          <Form-item prop="property"  label="范围:" :label-width="70" >
            <Input v-model="tableDoneInfo.property"></Input>
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
          <span class="main-heading">新增</span>
        </p>
        <Form ref="tableInsertInfo" class="searchForm" label-position="left" :model="tableInsertInfo" :rules="tableInsertRule" inline style="text-align: left;padding:15px 50px 0 90px">
          <Form-item prop="name" label="名称:" :label-width="70" >
            <Input v-model="tableInsertInfo.name"></Input>
          </Form-item>
          <Form-item prop="en" label="英文名称:" :label-width="70" >
            <Input v-model="tableInsertInfo.en"></Input>
          </Form-item>
          <Form-item prop="ecode"  label="ecode:" :label-width="70" >
            <Input v-model="tableInsertInfo.ecode"></Input>
          </Form-item>
          <Form-item prop="category "  label="部位分类:" :label-width="70" >
            <Select v-model="tableInsertInfo.category ">
              <Option  value="PT" >净体部位</Option>
              <Option  value="PTF" >成衣部位</Option>
            </Select>
          </Form-item>
          <Form-item prop="dictid" label="下单系统ID:" :label-width="85" >
            <Input v-model="tableInsertInfo.dictid"></Input>
          </Form-item>
          <Form-item prop="sequenceno"  label="排序:" :label-width="70" >
            <Input v-model="tableInsertInfo.sequenceno"></Input>
          </Form-item>
          <Form-item prop="category "  label="是否必填:" :label-width="70" >
            <Select v-model="tableInsertInfo.category ">
              <Option  :value="1" >是</Option>
              <Option  :value="0" >否</Option>
            </Select>
          </Form-item>
          <Form-item prop="property"  label="范围:" :label-width="70" >
            <Input v-model="tableInsertInfo.property"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="tableInsertSave('tableInsertInfo')">保存</Button>
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
      const dictid = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入下单系统ID'));
        } else {
          if (!/^\d+(\.\d+)?$/.test(value)) {
            callback(new Error('请输入数字'));
          } else if (value.length > 10) {
            callback(new Error('下单系统ID最多10位'));
          } else {
            callback();
          }
        }
      };
      const sequenceno = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入排序'));
        } else {
          if (!/^\d+(\.\d+)?$/.test(value)) {
            callback(new Error('请输入数字'));
          } else if (value.length > 10) {
            callback(new Error('排序最多10位'));
          } else {
            callback();
          }
        }
      };
      return {
        //搜索条件
        searchFrom:{
          pageIndex:1,
          pageSize:10,
          keyword:'',
          code:'',
          category :'',
          category:'PT'
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
            title: 'ecode',
            width:'5%',
            key: 'ecode',
            align: 'center',
          },
          {
            title:'部位分类',
            width:'5%',
            key:'category ',
            align:'center',
            render:(h,params)=>{
              return h('div',{
                domProps:{
                  innerHTML:params.row.category =='PT'?'净体部位':params.row.category =='PTF'?'成衣部位':''
                }
              })
            }
          },
          {
            title: '名称',
            width:'10%',
            key: 'name',
            align: 'center',
          },
          {
            title: '范围',
            width:'10%',
            key: 'property',
            align: 'center',
          },
          {
            title: '下单系统ID',
            width:'10%',
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
          color: [
            { required: true,message:'请填写颜色', trigger: 'blur' },
            { max:20,message: '颜色不能超过20位', trigger: 'blur'}
          ],
        },
        //新增
        tableInsertShow:false,
        tableInsertInfo:{
          name:'',
          en:'',
          dictid:'',
          sequenceno:'',
          category :1,
          property:'',
          ecode:'',
          category :'',
          category:'PT',
          parentid:0
        },
        tableInsertRule:{
          name: [
            { required: true,message:'请填写名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'},
          ],
          en: [
            { required: true,message:'请填写英文名称', trigger: 'blur' },
            { max:20,message: '英文名称不能超过20位', trigger: 'blur'},
          ],
          ecode: [
            { required: true,message:'请填写ecode', trigger: 'blur' },
            { max:20,message: 'ecode不能超过20位', trigger: 'blur'},
          ],
          dictid :[
            { required: true,validator:dictid, trigger: 'blur' },
          ],
          sequenceno:[
            { required: true,validator:sequenceno, trigger: 'blur' },
          ],
        },
        //删除
        tableDeleteShow:false,
        tableDeleteInfo:''
      }
    },
    mounted(){
      this.ready()
    },
    methods: {
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
        this.$http.get( '/dictlist',{params:this.searchFrom}).then(res=>{
          this.data=res.data.data;
          this.totals=res.data.total
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
        this.tableDoneShow=true;
        this.tableDoneInfo=JSON.parse(JSON.stringify(row))
      },
      tableDoneSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.put('/dict',this.tableDoneInfo).then(res=>{
              this.tableDoneShow=false;
              this.ready();
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
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/dict',this.tableInsertInfo).then(res=>{
              this.tableInsertShow=false;
              this.ready();
              this.cancels(name)
              this.$Message.success('新增成功');
            })
          }
        })
      },
      //删除
      tableDeleteSave(){
        this.$http.delete('/dict/'+this.tableDeleteInfo).then(res=>{
          this.tableDeleteShow=false;
          this.search();
          this.$Message.success('删除成功');
        })
      }
    },
  }
</script>
<style lang="scss" scoped>
  .optionStatus{
    line-height: 24px;
  }
</style>


