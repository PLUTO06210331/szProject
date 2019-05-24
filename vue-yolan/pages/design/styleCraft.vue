<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>款式管理 /</span>
          <span>款式工艺</span>
        </span>
        <span slot="footer" class="com-slot-right">
          <span class="T3last main-heading" @click="tableInsertShow=true"><span class="function"><span class="functionBox"><i class="iconfont settingPosition">&#xe649</i></span>新增工艺信息</span></span>
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
      <Modal v-model="tableDoneShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('tableDoneInfo')">
        <p slot="header">
          <span class="main-heading">编辑面料信息</span>
        </p>
        <Form ref="tableDoneInfo" class="searchForm" label-position="left" :model="tableDoneInfo" :rules="tableDoneRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="code" label=" 面料号:" :label-width="70" >
            <Input disabled v-model="tableDoneInfo.code"></Input>
          </Form-item>
          <Form-item prop="color"  label="面料颜色:" :label-width="70" >
            <Input v-model="tableDoneInfo.color"></Input>
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
          <span class="main-heading">新增面料信息</span>
        </p>
        <Form ref="tableInsertInfo" class="searchForm" label-position="left" :model="tableInsertInfo" :rules="tableInsertRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="code" label=" 款式:" :label-width="70" >
            <Select v-model="tableInsertInfo.code" @on-change="getCraft()">
              <Option v-for="item in styleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item prop="color"  label="工艺:" :label-width="70" >
            <Input v-model="tableInsertInfo.color"></Input>
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
      return {
        //搜索条件
        searchFrom:{
          pageIndex:1,
          pageSize:10,
        },
        //款式列表
        styleList:[],
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
            title: '品类',
            width:'10%',
            key: 'clothname',
            align: 'center',
          },
          {
            title: '工艺名称',
            width:'10%',
            key: 'dictname',
            align: 'center',
          },
          {
            title: '内容',
            width:'10%',
            key: 'content',
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
                    class: 'greenButton',
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
          status:'0'
        },
        tableInsertRule:{
          code: [
            { required: true,message:'请填写面料号', trigger: 'blur' },
            { max:20,message: '面料号不能超过20位', trigger: 'blur'}
          ],
          color: [
            { required: true,message:'请填写颜色', trigger: 'blur' },
            { max:20,message: '颜色不能超过20位', trigger: 'blur'}
          ],
        },
        //删除
        tableDeleteShow:false,
        tableDeleteInfo:''
      }
    },
    mounted(){
      this.ready()
      this.getStyleList()
    },
    methods: {
      cancels(name){
        this.$refs[name].resetFields();
      },
      setDate(date){
        let month=new Date(date).getMonth()+1;
        let year=new Date(date).getFullYear();
        month<10?month='0'+month:month;
        let day=new Date(date).getDate();
        day<10?day='0'+day:day;
        return year+'-'+month+'-'+day
      },

      //获取款式选项
      getStyleList(){
        this.$http.get('/productdetail/suit',{params:{}}).then(res=>{
          this.styleList=res.data
        })
      },
      //获取工艺选项
      getCraft(){
        console.log(this.tableInsertInfo);
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
        this.$http.get('/detailProcess',{params:this.searchFrom}).then(res=>{
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



