<template>
  <div id="test">
    <Table @on-expand="expands($event)" class="out" :columns="columns" :data="forData"></Table>
    <!--新增-->
    <div v-if="addShow">
      <Modal v-model="addShow" class-name="delect entrepot" :mask-closable='false'  width="480" v-drag>
        <p slot="header">
          <span class="main-heading">新增工艺</span>
        </p>
        <Form ref="pubForm" :model="pubForm" :rules="pubFormRule" class="searchForm" label-position="left" inline style="text-align: left;padding:15px 60px 0">
          <Form-item label="父级下单ID:" :label-width="100" >
            <Input v-model="pubForm.parentid" :disabled="true">
            </Input>
          </Form-item>

          <Form-item label="父级工艺名称:" :label-width="100" >
            <Input v-model="nowName" :disabled="true"></Input>
          </Form-item>
          <Form-item prop="dictid" label="下单系统ID:" :label-width="100" >
            <Input v-model="pubForm.dictid"></Input>
          </Form-item>
          <Form-item prop="ecode"  label="ecode:" :label-width="100" >
            <Input v-model="pubForm.ecode"></Input>
          </Form-item>
          <Form-item prop="name" label="工艺名称:" :label-width="100" >
            <Input v-model="pubForm.name"></Input>
          </Form-item>
          <Form-item prop="en"  label="英文名:" :label-width="100" >
            <Input v-model="pubForm.en"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="addCraft('pubForm')">新增</Button>
        </div>
      </Modal>
    </div>
    <!--修改-->
    <div v-if="changeShow">
      <Modal v-model="changeShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag>
        <p slot="header">
          <span class="main-heading">修改工艺</span>
        </p>
        <Form ref="editInfo" :model="editInfo" :rules="pubFormRule" class="searchForm" label-position="left" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="dictid" label="下单系统ID:" :label-width="100" >
            <Input v-model="editInfo.dictid"></Input>
          </Form-item>
          <Form-item prop="ecode"  label="ecode:" :label-width="100" >
            <Input v-model="editInfo.ecode"></Input>
          </Form-item>
          <Form-item prop="name" label="工艺名称:" :label-width="100" >
            <Input v-model="editInfo.name"></Input>
          </Form-item>
          <Form-item prop="en"  label="英文名:" :label-width="100" >
            <Input v-model="editInfo.en"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="save" @click="edit">保存</Button>
        </div>
      </Modal>
    </div>
    <!--删除-->
    <div v-if="deleteModal">
      <Modal v-model="deleteModal" class-name="deleteModel" :mask-closable='false' width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p >
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
        </div>
        <div slot="footer">
          <div class="footer">
            <Button class="save" @click="deleteConfirm">确认</Button>
            <Button class="clear" @click="deleteModal=false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import treeChild from './tree.vue';
  export default {
    data () {
      const validateNumber = (rule, value, callback) => {
        if (value === "" || value === null) {
          callback(new Error('下单系统ID不为空'));
        } else {
          if (!/^[0-9]*$/.test(value)) {
            callback(new Error('请输入数字'));
          } else if (value.length > 10) {
            callback(new Error('最多输入10位'));
          } else {
            callback();
          }
        }
      };
      return {
        pubFormRule:{
          dictid:[
            { required: true,validator:validateNumber,trigger: 'blur'},
          ],
          name:[
            { required: true, message: '工艺名称不为空', trigger: 'blur' },
            { max:100,message: '工艺名称最大长度不能超过100位', trigger: 'blur'}
          ],
          en:[
            { required: true, message: '英文名不为空', trigger: 'blur' },
            { max:200,message: '英文名最大长度不能超过200位', trigger: 'blur'}
          ],
          ecode:[
            { required: true, message: 'ecode不为空', trigger: 'blur' },
            { max:20,message: 'ecode最大长度不能超过20位', trigger: 'blur'}
          ],
        },
        nowName:'adsf',
        deleteInfo:{},
        addShow:false,
        changeShow:false,
        deleteModal:false,
        pubForm:{
          parentid:'',
          category:'P',
          dictid:'',
          name:'',
          en:'',
          ecode:'',
        },
        editInfo:{

        },
        childrenData:[],
        pubColumns:[
          {
            key: ' ',
            type:'expand',
            render: (h, params) => {
              if(!this.childrenData){
                return h('div',{
                  style:'text-align:center'
                },'暂无数据')
              }
              return h('Table',{
                  props:{
                    data:this.childrenData,
                    columns:this.pubColumns,
                  },
                }
              )
            }
          },
          {
            width:'15%',
            title: ' ',
            key: 'id'
          },
          {
            title: ' ',
            key: 'name'
          },
          {
            title: ' ',
            key: 'dictid'
          }
        ],
        columns: [
          {
            width:(50-this.tier*8 + ''),
            key: 'name',
            type:'expand',
            render: (h, params) => {
                if(!this.childrenData){
                  return h('div',{
                      style:'text-align:center'
                  },'没有数据了！')
                }
                return h(treeChild,{
                  on:{
                    listenChange:(data)=>{
                      this.getChildrenData(data)
                    }
                  },
                  props:{
                    forData:this.childrenData,
                    columns:this.columns,
                    tier:this.tier+1
                  }
                }
              )
            }
          },
          {
            width:'15%',
            title: 'id',
            key: 'id'
          },
          {
            title: 'name',
            key: 'name'
          },
          {
            title: 'dictid',
            key: 'dictid'
          },
          {
            title: '操作',
            width:'21%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
//                h('Button', {
//                    class: 'darkBlueButton',
//                    style:{
//                      background:"#fff",
//                      marginLeft: '8px',
//                      paddingRight:'8px'
//                    },
//                    on:{
//                      click: ()=>{
//                        this.WarehouseEditShow = true
//                      }
//                    }
//                  },
//                ),
                h('Button', {
                    class: 'greenButton ',
                    style: {
                      marginLeft: '8px',
                      background:"#fff",
                    },
                    on: {
                      click: () => {
                        this.handle(1,params)
                      }
                    }
                  },
                  [
                    [
                      h('i',{
                        class:'iconfont icon-qianming'
                      }),
                      h('span',{},'添加')
                    ]
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
                        this.handle(2,params);
                      }
                    },
                  },[
                    h('i',{
                      class:'iconfont icon-qingkong',
                    }),
                    h('span',{},'修改')
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
                        this.handle(3,params);
                      }
                    },
                  },[
                    h('i',{
                      class:'iconfont icon-qingkong',
                    }),
                    h('span',{},'删除')
                  ]
                ),
              ]);
            }
          }
        ],
        rules:{
          dictid: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          name: [
            { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          ],
          en: [
            { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          ],
          ecode: [
            { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          ]
        }
      }
    },
    components:{
      treeChild
    },
    props:{
      forData: {
        type: Array,
        default: function () {
          return []
        }
      },
      tier:{
        type:Number,
        default:function() {
          return 0
        }
      }
    },
    mounted() {
    },
    methods:{
      expands(e){
        this.getChildrenData(e.id);
      },
      getChildrenData(id){
        this.$http.get('/treelist',{params:{parentid:id}}).then(res=>{
          this.childrenData = res.data;
        })
      },
      // 操作
      handle(status,value){
        if(status == 1){
          this.pubForm.parentid = value.row.id;
          this.nowName = value.row.name;
          this.addShow = true;
//          setTimeout(()=>{
//            this.$refs.pubForm.resetFields();
//          },1000)
        }else if(status == 2){
          this.$http.get('/dict/'+value.row.id).then(res=>{
            this.editInfo = res.data;
            this.changeShow = true;
            console.log(res)
          })

        } else if(status == 3){
          this.deleteInfo = value.row;
          this.deleteModal = true;
        }
      },
      //添加
      addCraft(formname){
        this.$refs[formname].validate((valid) => {
          if (valid) {
            this.$http.post('/dict',this.pubForm).then(res=>{
              this.$Message.success('添加工艺成功!');
              this.addShow = false;
              this.getChildrenData(this.pubForm.parentid);
            })
          }
        })
      },
      //修改
      edit(formname){
        this.$refs[formname].validate((valid) => {
          this.$http.put('/dict/',this.editInfo).then(res=>{
            this.reload(this.editInfo.parentid);
            this.changeShow = false;
          })
        })
      },
      // 删除
      deleteConfirm(){
        this.$http.delete('/dict/'+ this.deleteInfo.id).then(res=>{
          this.reload(this.deleteInfo);
          this.deleteModal = false;
        })
      },
      //刷新
      reload(info){
        this.$emit('listenChange',info.parentid);
      }
    },
  }
</script>
<style lang="scss">
  .ivu-table-expanded-cell{
    width:40px !important;
    padding:0px 0px 0px 10px !important;
  }
  .out{
    .ivu-table-wrapper .ivu-table .ivu-table-header {
      height:1px
    }
  }
</style>
