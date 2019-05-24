<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>档案管理 /</span>
          <span>尺寸管理</span>
        </span>
        <span slot="footer" class="com-slot-right">
           <span class="T3 main-heading" @click="sizeInsert">
             <span class="shade">
             <span class="colorBox colorBoxOrange">
               <Icon type="ios-plus-outline"></Icon>
              </span>新增尺寸</span>
            </span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline>
          <Form-item label="尺寸分类" :label-width="70" class="specialCase">
            <Select v-model="searchFrom.sizecategoryid">
              <Option :value="' '">全部</Option>
              <Option :value='1'>净体量体</Option>
              <Option :value='2'>成衣尺寸 </Option>
              <Option :value='3'>标准号加减</Option>
            </Select>
          </Form-item>
           <Form-item label="尺码" :label-width="60" class="specialCase">
            <Select v-model='searchFrom.areaid'>
              <Option :value="' '">全部</Option>
              <Option v-for='item in areaArr' :key='item.id' :value='item.id'>{{item.name}}</Option>
            </Select>
          </Form-item>
           <Form-item label="号型" :label-width="60" class="specialCase">
            <Input v-model="searchFrom.specheight" @on-enter="search"></Input>
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
    <!--明细-->
    <div v-if="sizeDetailShow">
      <Modal v-model="sizeDetailShow"  width="870" class-name="delectNopad" :mask-closable='false'  v-drag @on-cancel='sizedetailCancel'>
        <p slot="header">
          <span class="main-heading">尺寸明细</span>
        </p>
        <div class="autoDiv">
          <div class="modalContent" style="text-align:center">
            <h4>基本信息</h4>
            <Form class="basicForm searchForm" :label-width="70"  inline style="text-align: left">
              <Row class="detailRow">
                <i-col span="8">
                  <Form-item label="尺寸分类:">
                    {{sizedetailForm.sizecategoryname}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="尺码:">
                    {{sizedetailForm.areaname}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="号型:">
                    {{sizedetailForm.specheight}}
                  </Form-item>
                </i-col>
              </Row>
            </Form>
            <h4>尺寸明细</h4>
            <div class='sizedetailInsert'>
              <Button type="primary" size="large" @click='sizedetailInsert'>新增</Button>
            </div>
            <div class="styleDetail" style="padding: 15px">
              <Table border :columns="sizedetail" :data="sizedetailData" height='410'></Table>
              <page-current ref="pages" class="pages-position" :total="sizeDetailtotals" @pageChange="sizeDetailpageListen"></page-current>
            </div>
          </div>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
    <!--明细编辑-->
    <div v-if="sizedetailEditShow">
      <Modal v-model="sizedetailEditShow" class-name="delect entrepot" :mask-closable='false'  width="480" v-drag @on-cancel="cancels('sizedetailEditForm')">
        <p slot="header">
          <span class="main-heading">编辑</span>
        </p>
        <Form ref="sizedetailEditForm" class="searchForm" label-position="left" :model="sizedetailEditForm" :rules="sizedetailEditRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="clothname" label="品类:" :label-width="70" >
            <Input v-model='sizedetailEditForm.clothname' disabled></Input>
          </Form-item>
          <Form-item prop="partname" label="部位:" :label-width="70" >
            <Input v-model='sizedetailEditForm.partname' disabled></Input>
          </Form-item>
          <Form-item prop="isrequired"  label="是否必须:" :label-width="70" >
            <Select v-model='sizedetailEditForm.isrequired'>
              <Option  :value="1" >是</Option>
              <Option  :value="2" >否</Option>
            </Select>
          </Form-item>
          <Form-item prop="defaultvalue" label="默认值:" :label-width="85" >
            <Input v-model="sizedetailEditForm.defaultvalue"></Input>
          </Form-item>
          <Form-item prop="sizefrom"  label="最小值:" :label-width="70" >
            <Input v-model="sizedetailEditForm.sizefrom"></Input>
          </Form-item>
          <Form-item prop="sizeto"  label="最大值:" :label-width="70" >
            <Input  v-model="sizedetailEditForm.sizeto"></Input>
          </Form-item>
          <Form-item prop="blecode"  label="匹配代码:" :label-width="70" >
            <Input v-model="sizedetailEditForm.blecode"></Input>
          </Form-item>
          <Form-item prop="sequenceno"  label="排序:" :label-width="70" >
            <Input v-model="sizedetailEditForm.sequenceno"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="sizedetailSave('sizedetailEditForm')">保存</Button>
        </div>
      </Modal>
    </div>
  <!--明细新增-->
    <div v-if="sizedetailInsertShow">
      <Modal v-model="sizedetailInsertShow" class-name="delect entrepot" :mask-closable='false'  width="480" v-drag @on-cancel="cancels('sizedetailInsertForm')">
        <p slot="header">
          <span class="main-heading">新增</span>
        </p>
        <Form ref="sizedetailInsertForm" class="searchForm" label-position="left" :model="sizedetailInsertForm" :rules="sizedetailEditRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="singleclothingid" label="品类:" :label-width="70" >
            <Select v-model='sizedetailInsertForm.singleclothingid' @on-change='singleclothingidelect'>
              <Option v-for='item in clothnameArr' :key='item.id' :value='item.id'>{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item prop="partid" label="部位:" :label-width="70">
            <Select v-model='sizedetailInsertForm.partid' :disabled='!sizedetailInsertForm.singleclothingid'>
              <Option v-for='item in partnameArr' :key='item.id' :value='item.dictid'>{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item prop="isrequired"  label="是否必须:" :label-width="70" >
            <Select v-model='sizedetailInsertForm.isrequired'>
              <Option  :value="1" >是</Option>
              <Option  :value="0" >否</Option>
            </Select>
          </Form-item>
          <Form-item prop="defaultvalue" label="默认值:" :label-width="85" >
            <Input v-model="sizedetailInsertForm.defaultvalue"></Input>
          </Form-item>
          <Form-item prop="sizefrom"  label="最小值:" :label-width="70" >
            <Input v-model="sizedetailInsertForm.sizefrom"></Input>
          </Form-item>
          <Form-item prop="sizeto"  label="最大值:" :label-width="70" >
            <Input  v-model="sizedetailInsertForm.sizeto"></Input>
          </Form-item>
          <Form-item prop="blecode"  label="匹配代码:" :label-width="70" >
            <Input v-model="sizedetailInsertForm.blecode"></Input>
          </Form-item>
          <Form-item prop="sequenceno"  label="排序:" :label-width="70" >
            <Input v-model="sizedetailInsertForm.sequenceno"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="sizedetailInsertsave('sizedetailInsertForm')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--编辑-->
    <div v-if="sizeEditShow">
      <Modal v-model="sizeEditShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('sizeEditForm')">
        <p slot="header">
          <span class="main-heading">编辑</span>
        </p>
        <Form ref="sizeEditForm" class="searchForm" label-position="left" :model="sizeEditForm" :rules="sizeEditFormRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="name" label="尺寸分类:" :label-width="70" >
            <Select v-model="sizeEditForm.sizecategoryid">
              <Option :value='1'>净体量体</Option>
              <Option :value='2'>成衣尺寸 </Option>
              <Option :value='3'>标准号加减</Option>
            </Select>
          </Form-item>
          <Form-item prop="en" label="尺码:" :label-width="70" >
            <Select v-model="sizeEditForm.areaid">
              <Option :value='item.id' v-for='item in areaArr' :key='item.id'>{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item prop="ecode"  label="号型:" :label-width="70" >
            <Input v-model="sizeEditForm.specheight"></Input>
          </Form-item>
          <Form-item prop="dictid" label="备注:" :label-width="85" >
            <Input v-model="sizeEditForm.memo"></Input>
          </Form-item>
          <Form-item prop="sequenceno"  label="状态:" :label-width="70" >
            <Select v-model="sizeEditForm.status">
              <Option  :value="0" >启用</Option>
              <Option  :value="1" >禁用</Option>
            </Select>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="sizeEditSave('sizeEditForm')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--新增-->
    <div v-if="sizeInsertShow">
      <Modal v-model="sizeInsertShow" class-name="delect entrepot" :mask-closable='false'  width="480" v-drag @on-cancel="cancels('sizeInsertForm')">
        <p slot="header">
          <span class="main-heading">新增</span>
        </p>
        <Form ref="sizeInsertForm" class="searchForm" label-position="left" :model="sizeInsertForm" :rules="sizeInsertFormRule" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="sizecategoryid" label="尺寸分类:" :label-width="70" >
            <Select v-model="sizeInsertForm.sizecategoryid">
              <Option :value='1'>净体量体</Option>
              <Option :value='2'>成衣尺寸 </Option>
              <Option :value='3'>标准号加减</Option>
            </Select>
          </Form-item>
          <Form-item prop="areanid" label="尺码:" :label-width="70" v-if='sizeInsertForm.sizecategoryid==3'>
            <Select v-model="sizeInsertForm.areaid">
              <Option :value='item.id' v-for='item in areaArr' :key='item.id'>{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item prop="specheight"  label="号型:" :label-width="70" v-if='sizeInsertForm.sizecategoryid==3'>
            <Input v-model="sizeInsertForm.specheight"></Input>
          </Form-item>
          <Form-item prop="memo" label="备注:" :label-width="85" >
            <Input v-model="sizeInsertForm.memo"></Input>
          </Form-item>
          <Form-item prop="status"  label="状态:" :label-width="70" >
            <Select v-model="sizeInsertForm.status">
              <Option  :value="1" >禁用</Option>
              <Option  :value="0" >启用</Option>
            </Select>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="sizeInsertSave('sizeInsertForm')">保存</Button>
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
          sizecategoryid:'',
          areaid:null,
          specheight:''
        },
        areaArr:[],
        //外表数据条数
        totals:0,
        //table
        columns: [
          {
            title: '序号',
            width:'4%',
            type:'index',
            align: 'center',
          },
          {
            title: '尺寸分类',
            width:'10%',
            key: 'sizecategoryid',
            align: 'center',
            render:(h,params)=>{
             return h('div',{
                domProps:{
                  innerHTML:params.row.sizecategoryid==1?'净体量体':params.row.sizecategoryid==2?'成衣尺寸':params.row.sizecategoryid==3?'标准号加减':''
                }
              })
            }
          },
          {
            title: '尺码',
            width:'10%',
            key: 'areaid',
            align: 'center',
            render:(h,params)=>{
              return h('div',{
                domProps:{
                  innerHTML:this.getAreaid(params.row.areaid)
                }
              })
            }
          },
          {
            title: '号型',
            width:'10%',
            key: 'specheight',
            align: 'center',
          },
          {
            title: '备注',
            width:'10%',
            key: 'memo',
            align: 'center',
          },
          {
            title: '状态',
            width:'10%',
            key: 'status',
            align: 'center',
            render:(h,params)=>{
             return h('div',{
                domProps:{
                  innerHTML:params.row.status==0?'启用':'禁用'
                }
              })
            }
          },
          {
            title:'操作',
            width:'20%',
            key:'id',
            align:'center',
            render:(h,params)=>{
              return h('div',{

              },[
                h('Button',{
                  class: 'blueButton ',
                  style: {
                    marginLeft: '8px',
                    background:"#fff",
                  },
                  on:{
                    click:()=>{
                      this.sizeDetail(params.row)
                    }
                  }
                },'明细'),
                h('Button',{
                    class: 'greenButton ',
                    style: {
                      marginLeft: '8px',
                      background:"#fff",
                    },
                    on:{
                      click:()=>{
                        this.sizeEdit(params.row)
                      }
                    }
                },'编辑'),
                h('Button',{
                    class: 'redButton',
                    style: {
                       marginLeft: '8px',
                      background:"#fff",
                    },
                    on:{
                      click:()=>{
                        this.sizeDelete(params);
                      }
                    }
                },'删除')
              ])
            }
          }

        ],
        data: [],
        //明细
        sizeDetailShow:false,
        sizedetailForm:{
          sizecategoryname:'',
          specheight:'',
          areaname:''
        },
        sizedetailData:[],
        sizedetail:[
          {
            title:'序号',
            width:'10%',
            type:'index',
            align:'center'
          },
          {
            title:'品类',
            width:'10%',
            key:'clothname',
            align:'center'
          },
          {
            title:'部位',
            width:'10%',
            key:'partname',
            align:'center'
          },
          {
            title:'是否必须',
            width:'10%',
            key:'isrequired',
            align:'center',
            render:(h,params)=>{
              return h('div',{
                domProps:{
                  innerHTML:params.row.isrequired==1?'是':'否'
                }
              })
            }
          },
          {
            title:'默认值',
            width:'10%',
            key:'defaultvalue',
            align:'center'
          },
          {
            title:'最小值',
            width:'10%',
            key:'sizefrom',
            align:'center'

          },
          {
            title:'最大值',
            width:'10%',
            key:'sizeto',
            align:'center'
          },
          {
            title:'匹配代码',
            width:'10%',
            key:'blecode',
            align:'center'
          },
          {
            title:'排序',
            width:'10%',
            key:'sequenceno',
            align:'center'
          },
          {
            title:'操作',
            width:'20%',
            key:'id',
            align:'center',
            render:(h,params)=>{
              return h('div',[
                h('Button',{
                  class: 'greenButton ',
                    style: {
                      marginLeft: '8px',
                      background:"#fff",
                    },
                    on:{
                      click:()=>{
                        this.sizedetailEdit(params.row);
                      }
                    }
                },'编辑'),
                h('Button',{
                  class: 'redButton ',
                    style: {
                      marginLeft: '8px',
                      background:"#fff",
                    },
                    on:{
                      click:()=>{
                        this.sizedetailDelete(params);
                      }
                    }
                },'删除')
              ])
            }
          }
        ],
        sizeDetailtotals:0,
        sizeDetailSearch:{
          pageIndex:1,
          pageSize:10,
          sizestandardid :''
        },
        // 明细编辑
        sizedetailEditShow:false,
        sizedetailEditForm:{
          clothname:'', // 品类
          partname:'', // 部位
          isrequired:'', // 是否必须
          defaultvalue:'', // 默认值
          sizefrom:'', // 最小值
          sizeto:'', // 最大值
          blecode:'', // 匹配代码
          sequenceno:'' // 排序
        },
        sizedetailEditFormAjax:{
          singleclothingid:null, // 品类
          partid:null, // 部位
          isrequired:'', // 是否必须
          defaultvalue:null, // 默认值
          sizefrom:null, // 最小值
          sizeto:null, // 最大值
          blecode:'', // 匹配代码
          sequenceno:null,// 排序
          sizestandardid:null,
        },
        sizedetailEditRule:{

        },
        clothnameArr:[],
        partnameArr:[],
        // 明细新增
        sizedetailInsertShow:false,
        sizedetailInsertForm:{
          singleclothingid:null, // 品类
          partid:null, // 部位
          isrequired:'', // 是否必须
          defaultvalue:null, // 默认值
          sizefrom:null, // 最小值
          sizeto:null, // 最大值
          blecode:'', // 匹配代码
          sequenceno:null,// 排序
          sizestandardid:null,
        },
        sizedetailSearchForm:{
          singleclothingid:'',
           category :'',
           sizestandardid:''
        },
        sizestandarddetail:{},
        // 编辑
        sizeEditShow:false,
        sizeEditForm:{
          id:'',
          sizecategoryid:'',
          areaid:null,
          specheight:'',
          memo:'',
          status:'',

        },
        sizeEditFormAjax:{
          areaid:null,
          memo:'',
          sizecategoryid:'',
          specheight:'',
          status:null,
        },
        sizeEditFormRule:{

        },
        //新增
        sizeInsertShow:false,
        sizeInsertForm:{
          sizecategoryid:1,
          areaid:'',
          specheight:'',
          memo:'',
          status:0
        },
        sizeInsertFormRule:{
          specheight:[
            { required:true,message:'号型必填',toggle:'blur' }
          ],
          areaid:[
            { required:true,message:'尺码必填',toggle:'blur' }
          ]
        },

        //删除
        sizeDeleteShow:false,
        tableDeleteInfo:''
      }
    },
    mounted(){
      this.ready();
      this.$http.get('/dictSystem/category',{params:{category:'SIZETYPE'}}).then(res=>{
        this.areaArr= res.data;
        this.areaArr.map(item=>{
          item.id = String(item.id);
        })
        console.log(this.areaArr);
      })
    },
    methods: {
      cancels(name){
        this.$refs[name].resetFields();
      },
      ready(){
        this.$http.get('/sizestandards',{params:this.searchFrom}).then(res=>{
          this.data = res.data.data;
          this.totals = res.data.total;
        })
      },
      search(){
        this.searchFrom.pageIndex=1;
        this.$children[3].page.pageIndex = 1;
        this.ready();
      },
      pageListen(data){
        this.searchFrom.pageIndex=data.pageIndex;
        this.searchFrom.pageSize=data.pageSize;
        this.ready();
      },
      getAreaid(id){
        let area = this.areaArr.find((item)=>{
          return item.id == id;
        })
        return area.name
      },

      //明细
      getSizeDetail(){
        this.$http.get('/sizestandarddetails',{params:this.sizeDetailSearch}).then(res=>{
          this.sizedetailData = res.data.data;
          this.sizedetailSearchForm.sizestandardid = this.sizedetailData[0].sizestandardid;
          this.sizeDetailtotals = res.data.total;
        })
      },
      sizeDetail(row){
        this.sizeDetailSearch.sizestandardid  = row.id;
        if(row.sizecategoryid==1){
          this.sizedetailSearchForm.category = 'PT';
        }else{
          this.sizedetailSearchForm.category = 'PTF';
        }
        this.getSizeDetail();
        Object.keys(this.sizedetailForm).map(item=>{
          this.sizedetailForm[item] = row[item];
        })
        this.sizeDetailShow = true;
      },
      sizeDetailpageListen(data){
        this.sizeDetailSearch.pageIndex=data.pageIndex;
        this.sizeDetailSearch.pageSize=data.pageSize;
        this.getSizeDetail();
      },
      sizedetailCancel(){
          this.sizeDetailShow = false;
          this.sizedetailData = [];
          this.sizeDetailtotals = 0;
      },
      singleclothingidelect(val){
        console.log(val);
        this.sizedetailSearchForm.singleclothingid = val;

        this.$http.get('/sizestandarddetail/parts',{params:this.sizedetailSearchForm}).then(res=>{
          this.partnameArr = res.data;
        })
      },
      // 尺寸编辑
      sizeEdit(row){
        this.sizeEditShow = true;
        console.log(row);
        let rowObj = JSON.parse(JSON.stringify(row));
        Object.keys(this.sizeEditForm).map(item=>{
          this.sizeEditForm[item] = rowObj[item];
        })
                console.log(this.sizeEditForm);
        Object.keys(this.sizeEditFormAjax).map(item=>{
          this.sizeEditFormAjax[item] = rowObj[item];
        })
       this.sizeEditForm.sizestandardid  = rowObj.id;
      },
      // 尺寸编辑保存
      sizeEditSave(form){
        this.$http.put('/sizestandard',this.sizeEditForm).then(res=>{
          if(res.status==200){
            this.$Message.success('编辑成功');
            this.sizeEditShow = false;
            this.ready();
          }
        })
      },
      // 明细编辑
      sizedetailEdit(row){
        this.sizedetailEditForm = JSON.parse(JSON.stringify(row));
        this.sizedetailEditShow = true;
      },
      // 明细编辑保存
      sizedetailSave(form){
        Object.keys(this.sizedetailEditFormAjax).map(item=>{
          this.sizedetailEditFormAjax[item] = this.sizedetailEditForm[item];
        })
        this.sizedetailEditFormAjax.sizestandardid = this.sizeDetailSearch.sizestandardid;
        this.$http.put('/sizestandarddetail',this.sizedetailEditForm).then(res=>{
          if(res.status==200){
            this.$Message.success('编辑成功');
            this.sizedetailEditShow = false;
            this.$refs[form].resetFields();
            this.getSizeDetail();
          }
        })
      },
      // 明细删除
      sizedetailDelete(params){
        this.$Modal.confirm({
          title:'提示信息',
          content:'确定删除此条数据吗?',
          onOk:()=>{
            this.$http.delete('/sizestandarddetail/'+params.row.id).then(res=>{
              if(res.status==200){
                this.$Message.success('删除成功');
                this.getSizeDetail();
              }
            })
          }
        })
      },
      // 明细新增
      sizedetailInsert(){
        this.$http.get('/dict/category?category=P&parentid=0').then(res=>{
          this.clothnameArr = res.data;
        })
        this.sizedetailInsertShow = true;
      },
      // 明细新增保存
      sizedetailInsertsave(form){
        this.sizedetailInsertForm.sizestandardid = this.sizeDetailSearch.sizestandardid;
        this.$http.post('/sizestandarddetail',this.sizedetailInsertForm).then(res=>{
          if(res.status==200){
            this.$Message.success('新增成功');
            this.sizedetailInsertShow = false;
            this.$refs[form].resetFields();
             this.getSizeDetail();
          }
        })
      },
      //新增
      sizeInsert(name){
        this.sizeInsertShow = true;
      },
      // 新增保存
      sizeInsertSave(form){
        this.$refs[form].validate((valid) => {
          if(valid){
            this.$http.post('/sizestandard',this.sizeInsertForm).then(res=>{
              if(res.status==200){
                this.$Message.success('新增成功');
                this.sizeInsertShow = false;
                this.cancels(form);
                this.ready();
              }
            })
          }
        })
      },
      //删除
      sizeDelete(params){
        this.$Modal.confirm({
          title:'提示信息',
          content:'确定删除此条数据吗?',
          onOk:()=>{
            this.$http.delete('/sizestandard/'+params.row.id).then(res=>{
              if(res.status==200){
                this.$Message.success('删除成功');
                this.ready();
              }
            })
          }
        })
      },
      // sizeDeleteSave(){
      //   this.$http.delete('/dict/'+this.tableDeleteInfo).then(res=>{
      //     this.tableDeleteShow=false;
      //     this.search();
      //     this.$Message.success('删除成功');
      //   })
      // }
    },
  }
</script>
<style lang="scss" scoped>
  .optionStatus{
    line-height: 24px;
  }
  .sizedetailInsert{
    margin-top:15px;
    padding:0 15px;
    text-align: right;
  }
</style>
<style>
    .ivu-modal-wrap{
    z-index:9999!important;
  }
  .ivu-modal-content .ivu-modal-body{
    padding:16px!important;
  }
</style>



