<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>面料管理 /</span>
          <span>面料价格</span>
        </span>
        <span slot="footer" class="com-slot-right">
          <span class="T3 main-heading" @click="tableInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>新增面料价格</span></span>
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
          <span class="main-heading">编辑</span>
        </p>
        <Form ref="tableDoneInfo" class="searchForm" label-position="left" :model="tableDoneInfo" :rules="tableDoneRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="fabriccode" label=" 面料号:" :label-width="70" >
            <Input disabled v-model="tableDoneInfo.fabriccode"></Input>
          </Form-item>
          <Form-item prop="price"  label="面料价格:" :label-width="70" >
            <Input v-model="tableDoneInfo.price"></Input>
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
        <Form ref="tableInsertInfo" class="searchForm" label-position="left" :model="tableInsertInfo" :rules="tableInsertRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="fabriccode" label="面料号:" :label-width="70" >
            <Input v-model="tableInsertInfo.fabriccode"></Input>
          </Form-item>
          <Form-item prop="price"  label="面料价格:" :label-width="70" >
            <Input v-model="tableInsertInfo.price"></Input>
          </Form-item>
          <Form-item prop="clothid"  label="品类"  :label-width="75">
            <Select v-model="tableInsertInfo.clothid">
              <Option v-for="item in clothType" :value="item.id" :key="item.name">{{ item.name }}</Option>
            </Select>
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
      //面料号
      const fabriccode = (rule, value, callback) => {
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
      // 价格
      const validatePrice = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入价格'));
        } else {
          if (!/^\d+(\.\d{1,2})?$/.test(value)) {
            callback(new Error('请输入数字,最多两位小数'));
          } else if (value.length > 10) {
            callback(new Error('价格最多输入10位'));
          } else {
            callback();
          }
        }
      };
      const pinLei = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择品类'));
        } else {
          callback();
        }
      };
      return {
        //品类
        clothType:[],
        //搜索条件
        searchFrom:{
          pageIndex:1,
          pageSize:10,
          fabriccode:''
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
            title: '面料号',
            width:'10%',
            key: 'fabriccode',
            align: 'center',
          },
          {
            title: '品类',
            width:'10%',
            key: 'categoryName',
            align: 'center',
          },
          {
            title: '面料价格',
            width:'10%',
            key: 'price',
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
          price: [
            { required: true,validator:validatePrice, trigger: 'blur' },
          ],
        },
        //新增
        tableInsertShow:false,
        tableInsertInfo:{
          clothid:'',
          price:'',
          categoryName:'',
          fabriccode:''
        },
        tableInsertRule:{
          fabriccode: [
            { required: true,validator:fabriccode, trigger: 'blur' },
          ],
          price: [
            { required: true,validator:validatePrice, trigger: 'blur' },
          ],
          clothid: [
            { required: true,validator:pinLei, trigger: 'change' },
          ],
        },
        //删除
        tableDeleteShow:false,
        tableDeleteInfo:''
      }
    },
    mounted(){
      this.ready()
      this.getClothType()
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
      //获取品类大全
      getClothType(){
        this.$http.get('/dict/category',{params:{
          category:'P',
          parentid:0,
        }}).then(res=>{
          this.clothType=res.data
        })
      },
      ready(){
        this.$http.get('/fabricprice',{params:this.searchFrom}).then(res=>{
          this.data=res.data.data;
          this.totals=res.data.total;
        });
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
            this.$http.put('/fabricprice',this.tableDoneInfo).then(res=>{
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
            console.log(this.tableInsertInfo);
            this.$http.post('/fabricprice',this.tableInsertInfo).then(res=>{
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
        this.$http.delete('/fabricprice/'+this.tableDeleteInfo).then(res=>{
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


