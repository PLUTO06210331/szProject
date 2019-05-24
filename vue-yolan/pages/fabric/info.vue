<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>面料管理 /</span>
          <span>面料信息</span>
        </span>
        <span slot="footer" class="com-slot-right">
           <span class="T3 main-heading" @click="tableInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>新增面料信息</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="面料号" :label-width="60" class="specialCase" >
            <Input v-model="searchFrom.code" @on-enter="search"></Input>
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
      <Modal v-model="tableDoneShow" class-name="delect entrepot" :mask-closable=false  width="760" v-drag @on-cancel="cancels('tableDoneInfo')">
        <p slot="header">
          <span class="main-heading">编辑面料信息</span>
        </p>
        <Form ref="tableDoneInfo" class="searchForm" label-position="left" :model="tableDoneInfo" :rules="tableInsertRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="code" label=" 面料号:" :label-width="70" >
            <Input disabled v-model="tableDoneInfo.code"></Input>
          </Form-item>
          <Form-item prop="color"  label="面料颜色:" :label-width="70" >
            <Input v-model="tableDoneInfo.color"></Input>
          </Form-item>
          <Form-item prop="category"  label="面料类别:" :label-width="70" >
            <Select v-model="tableDoneInfo.category">
              <Option v-for="(item,index) in categoryArr" :value="item.id+''" :key="index">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item prop="component"  label="面料成分:" :label-width="70" >
            <Input v-model="tableDoneInfo.component"></Input>
          </Form-item>
          <Form-item prop="brand"  label="面料品牌:" :label-width="70" >
            <Input v-model="tableDoneInfo.brand"></Input>
          </Form-item>
          <Form-item prop="yarn"  label="面料纱织:" :label-width="70" >
            <Input v-model="tableDoneInfo.yarn"></Input>
          </Form-item>
          <Form-item prop="similar"  label="相似面料:" :label-width="70" >
            <Input v-model="tableDoneInfo.similar"></Input>
          </Form-item>
          <Form-item prop="flower"  label="花型:" :label-width="70" >
            <Input v-model="tableDoneInfo.flower"></Input>
          </Form-item>
          <Form-item prop="status"  label="状态:" :label-width="70" >
            <div class="optionStatus">
              <Radio-group v-model="tableDoneInfo.status">
                <Radio label='0'>启用</Radio>
                <Radio label='1'>禁用</Radio>
              </Radio-group>
            </div>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="tableDoneSave('tableDoneInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--新增-->
    <div v-if="tableInsertShow">
      <Modal v-model="tableInsertShow" class-name="delect entrepot" :mask-closable=false  width="760" v-drag @on-cancel="cancels('tableInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增面料信息</span>
        </p>
        <Form ref="tableInsertInfo" class="searchForm" label-position="left" :model="tableInsertInfo" :rules="tableInsertRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="code" label=" 面料号:" :label-width="70" >
            <Input v-model="tableInsertInfo.code"></Input>
          </Form-item>
          <Form-item prop="color"  label="面料颜色:" :label-width="70" >
            <Input v-model="tableInsertInfo.color"></Input>
          </Form-item>
          <Form-item prop="category"  label="面料类别:" :label-width="70" >
            <Select v-model="tableInsertInfo.category">
              <Option v-for="(item,index) in categoryArr" :value="item.id+''" :key="index">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item prop="component"  label="面料成分:" :label-width="70" >
            <Input v-model="tableInsertInfo.component"></Input>
          </Form-item>
          <Form-item prop="brand"  label="面料品牌:" :label-width="70" >
            <Input v-model="tableInsertInfo.brand"></Input>
          </Form-item>
          <Form-item prop="yarn"  label="面料纱织:" :label-width="70" >
            <Input v-model="tableInsertInfo.yarn"></Input>
          </Form-item>
          <Form-item prop="similar"  label="相似面料:" :label-width="70" >
            <Input v-model="tableInsertInfo.similar"></Input>
          </Form-item>
          <Form-item prop="flower"  label="花型:" :label-width="70" >
            <Input v-model="tableInsertInfo.flower"></Input>
          </Form-item>
          <Form-item prop="status"  label="状态:" :label-width="70" >
            <div class="optionStatus">
              <Radio-group v-model="tableInsertInfo.status">
                <Radio label='0'>启用</Radio>
                <Radio label='1'>禁用</Radio>
              </Radio-group>
            </div>
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
      const code = (rule, value, callback) => {
        if (value === "" || value === null) {
          callback(new Error('请输入面料号'));
        } else {
          if (!/^[0-9A-Z]*$/g.test(value)) {
            callback(new Error('请输入大写字母、数字'));
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
          code:''
        },
        //外表数据条数
        totals:1,
        categoryArr:[],
        //table
        columns: [
          {
            title: '序号',
            width:'4%',
            type:'index',
            align: 'center',
          },
          {
            title: '面料号',
            width:'10%',
            key: 'code',
            align: 'center',
          },
          {
            title: '颜色',
            width:'10%',
            key: 'color',
            align: 'center',
          },
          {
            title: '成分',
            width:'10%',
            key: 'component',
            align: 'center',
          },
          {
            title: '花型',
            width:'10%',
            key: 'flower',
            align: 'center',
          },
          {
            title: '状态',
            width:'10%',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              return h('i',{
                  class:params.row.status=='0'?'iconfont icon-suo1':'iconfont icon-suo',
                  style:{'color':params.row.status=='0'?'#37b3b3':'#f76165',cursor:'pointer'},
                  on: {
                    click: () => {
                      this.changeStatus(params.row)
                    }
                  },
                }
              )
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
          color: [
            { required: true,message:'请填写颜色', trigger: 'blur' },
            { max:20,message: '颜色不能超过20位', trigger: 'blur'}
          ],
        },
        //新增
        tableInsertShow:false,
        tableInsertInfo:{
          code:'',
          color:'',
          category:'',
          component:'',
          brand:'',
          yarn:'',
          flower:'',
          similar:'',
          status:'0'
        },
        tableInsertRule:{
          code: [
            { required: true,validator:code, trigger: 'blur' },
            { max:20,message: '面料号不能超过20位', trigger: 'blur'}
          ],
          color: [
            { required: true,message:'请填写颜色', trigger: 'blur' },
            { max:10,message: '颜色不能超过10位', trigger: 'blur'}
          ],
          category : [
            { required: true,message:'请选择面料类别', trigger: 'change' },
          ],
          brand: [
            { max:20,message: '品牌不能超过20位', trigger: 'blur'}
          ],
          yarn: [
            { max:50,message: '纱织不能超过50位', trigger: 'blur'}
          ],
          flower: [
            { max:10,message: '花型不能超过10位', trigger: 'blur'}
          ],
          component: [
            { max:20,message: '成分不能超过20位', trigger: 'blur'}
          ],
          similar: [
            { max:20,message: '相似面料不能超过20位', trigger: 'blur'}
          ],
        },
        //删除
        tableDeleteShow:false,
        tableDeleteInfo:''
      }
    },
    mounted(){
      this.ready()
      this.getCategory()
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
      getCategory(){
        this.$http.get('/fabric/category',{}).then(res=>{
          this.categoryArr=res.data
        })
      },
      ready(){
        this.$http.get('/fabric',{params:this.searchFrom}).then(res=>{
          this.data=res.data.data
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
            this.$http.put('/fabric',this.tableDoneInfo).then(res=>{
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
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/fabric',this.tableInsertInfo).then(res=>{
              this.tableInsertShow=false;
              this.search();
              this.cancels(name)
              this.$Message.success('新增成功');
            })
          }
        })
      },
      //删除
      tableDeleteSave(){
        this.$http.delete('/fabric/'+this.tableDeleteInfo).then(res=>{
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


