<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>模型管理 /</span>
          <span>锚点管理</span>
        </span>
        <span slot="footer" class="com-slot-right">
          <span class="T3 main-heading" @click="tableInsert"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>新增锚点</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="名称" :label-width="60" class="specialCase" >
            <Input v-model="searchForm.name" @on-enter="search"></Input>
            <input type="text" style="display: none">
          </Form-item>
          <Form-item label="品类" :label-width="60" class="specialCase" >
            <Select v-model="searchForm.clothid">
              <Option :value="' '">全部</Option>
              <Option v-for="item in clothTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item class="specialHandling .specialHandling">
            <Button icon="search" @click="search"></Button>
          </Form-item>
        </Form>
        <div style="clear: both"></div>
        <div id="tableBox" ref="tableBox">
          <Table v-com border :columns="columns" :data="data"></Table>
        </div>
        <page-current ref="pages" class="pages-position" :total="totals" @pageChange="pageListen"></page-current>
      </div>
    </div>
    <!--新增-->
    <div v-if="tableInsertShow">
      <Modal v-model="tableInsertShow" class-name="delect entrepot" :mask-closable=false  width="1200" v-drag @on-cancel="tableInsertClear('tableInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <div>
            <h4>锚点信息</h4>
            <div class="row-input">
              <Form ref="tableInsertInfo" class="searchForm" label-position="left" :rules="tableInsertRule" :model="tableInsertInfo" inline style="text-align: left;padding:0px">
                <Row style="padding: 15px">
                    <Row>
                      <i-col span="11">
                        <Form-item label="品类" :label-width="60" prop="clothid">
                          <Select v-model="tableInsertInfo.clothid" @on-change="getTechnologyList('insert',tableInsertInfo.clothid)">
                            <Option v-for="item in clothTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                          </Select>
                        </Form-item>
                      </i-col>
                      <i-col span="11" offset="1" style="position: relative">
                        <Form-item prop="code" label="编号:" :label-width="60" >
                          <Select v-model="tableInsertInfo.code" @on-change="codenameChange('insert',tableInsertInfo.code)">
                            <Option v-for="item in codenameList" :value="item.code" :key="item.id">{{ item.name }}</Option>
                          </Select>
                        </Form-item>
                      </i-col>
                      <i-col span="11">
                        <Form-item label="依赖工艺" :label-width="70" prop="dependid">
                            <div class="sameBut" @click="dependSelect('insert',tableInsertInfo.clothid)">
                              {{tableInsertInfo.dependid!=''?tableInsertInfo.dependid:'请选择'}}
                            </div>
                        </Form-item>
                      </i-col>
                      <i-col span="11" offset="1"  style="position: relative">
                        <Form-item prop="remark" label="备注:" :label-width="60" >
                          <Input class="anchorText" v-model="tableInsertInfo.remark"></Input>
                        </Form-item>
                      </i-col>
                    </Row>
                  <!--<i-col span="11">-->
                    <!--<Form-item label="依赖工艺" :label-width="70" prop="dependid">-->
                      <!--<div class="ivewTree" style="height: 300px;overflow-y: auto">-->
                        <!--<Tree :data="tableInsertInfo.dependid"  show-checkbox></Tree>-->
                      <!--</div>-->
                    <!--</Form-item>-->
                  <!--</i-col>-->
                </Row>
                <h4 style="margin-bottom: 15px">锚点工艺   <Button class="add" @click="addDicts('insert')">添加工艺</Button></h4>
                <div style="max-height: 200px;overflow-y: auto;">
                  <Row v-for="(item,index) in tableInsertInfo.dicts" :key="index" style="padding:0 15px">
                    <i-col span="4">
                      <Form-item label="名称" :label-width="45">
                        <Input v-model="item.name"></Input>
                      </Form-item>
                    </i-col>
                    <i-col span="4" offset="1">
                      <Form-item label="工艺" :label-width="45" prop="dictid">
                        <div class="sameBut" @click="treeSelect('insert',item,index)">
                           {{item.dictid!=''?item.dictid:'请选择'}}
                        </div>
                      </Form-item>
                    </i-col>
                    <i-col span="4"  offset="1">
                      <Form-item label="提交工艺" :label-width="60" prop="submitid">
                        <Input v-model="item.submitid"></Input>
                      </Form-item>
                    </i-col>
                    <i-col span="2" offset="1">
                      <Form-item prop="sequenceno" label="排序:" :label-width="45" >
                        <Input v-model="item.sequenceno" ></Input>
                      </Form-item>
                    </i-col>
                    <i-col span="5" offset="1">
                      <Form-item prop="path" label="地址:" :label-width="45" >
                        <Input v-model="item.path" ></Input>
                      </Form-item>
                    </i-col>
                    <!--<Button type="ghost" icon="ios-cloud-upload-outline">文件1</Button>-->
                    <!--<Button type="ghost" icon="ios-cloud-upload-outline">文件2</Button>-->
                    <Button type="ghost" shape="circle" icon="close" @click="deleteDicts('insert',index)"></Button>
                  </Row>
                </div>

              </Form>
            </div>
          </div>
        </div>
        <div slot="footer">
          <Button class="clear" @click="tableInsertClear('tableInsertInfo')">清空</Button>
          <Button class="save" @click="tableInsertSave('tableInsertInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--编辑-->
    <div v-if="tableDoneShow">
      <Modal v-model="tableDoneShow" class-name="delect entrepot" :mask-closable=false  width="1200" v-drag @on-cancel="cancels('tableDoneInfo')">
        <p slot="header">
          <span class="main-heading">编辑</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <div>
            <h4>锚点信息</h4>
            <div class="row-input">
              <Form ref="tableDoneInfo" class="searchForm" label-position="left" :rules="tableInsertRule" :model="tableDoneInfo" inline style="text-align: left;padding:0px">
                <Row style="padding: 15px">
                  <i-col span="11">
                    <Form-item label="品类" :label-width="60" prop="clothid">
                      <Select :disabled="true" v-model="tableDoneInfo.clothid" @on-change="getTechnologyList('edit',tableDoneInfo.clothid)">
                        <Option v-for="item in clothTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                      </Select>
                    </Form-item>
                  </i-col>
                  <i-col span="11" offset="1" style="position: relative">
                    <Form-item prop="code" label="编号:" :label-width="60" >
                      <Select v-model="tableDoneInfo.code" @on-change="codenameChange('edit',tableDoneInfo.code)">
                        <Option v-for="item in codenameList" :value="item.code" :key="item.id">{{ item.name }}</Option>
                      </Select>
                    </Form-item>
                  </i-col>
                  <i-col span="11">
                    <Form-item label="依赖工艺" :label-width="70" prop="dependid">
                      <div class="sameBut" @click="dependSelect('edit',tableDoneInfo.clothid)">
                        {{tableDoneInfo.dependid!=''?tableDoneInfo.dependid:'请选择'}}
                      </div>
                    </Form-item>
                  </i-col>
                  <i-col span="11" offset="1"  style="position: relative">
                    <Form-item prop="remark" label="备注:" :label-width="60" >
                      <Input class="anchorText" v-model="tableDoneInfo.remark"></Input>
                    </Form-item>
                  </i-col>
                </Row>
                <h4 style="margin-bottom: 15px">锚点工艺   <Button class="add" @click="addDicts('edit')">添加工艺</Button></h4>
                <div style="max-height: 200px;overflow-y: auto;">
                  <Row v-for="(item,index) in tableDoneInfo.dicts" :key="index" style="padding:0 15px">
                    <i-col span="4">
                      <Form-item label="名称" :label-width="45">
                        <Input v-model="item.name"></Input>
                      </Form-item>
                    </i-col>
                    <i-col span="4" offset="1">
                      <Form-item label="工艺" :label-width="45" prop="dictid">
                        <div class="sameBut" @click="treeSelect('edit',item,index)">
                          {{item.dictid!=''?item.dictid:'请选择'}}
                        </div>
                      </Form-item>
                    </i-col>
                    <i-col span="4"  offset="1">
                      <Form-item label="提交工艺" :label-width="60" prop="submitid">
                        <Input v-model="item.submitid"></Input>
                      </Form-item>
                    </i-col>
                    <i-col span="2" offset="1">
                      <Form-item prop="sequenceno" label="排序:" :label-width="45" >
                        <Input v-model="item.sequenceno" ></Input>
                      </Form-item>
                    </i-col>
                    <i-col span="5" offset="1">
                      <Form-item prop="path" label="地址:" :label-width="45" >
                        <Input v-model="item.path" ></Input>
                      </Form-item>
                    </i-col>
                    <!--<Button type="ghost" icon="ios-cloud-upload-outline">文件1</Button>-->
                    <!--<Button type="ghost" icon="ios-cloud-upload-outline">文件2</Button>-->
                    <Button type="ghost" shape="circle" icon="close" @click="deleteDicts('edit',index)"></Button>
                  </Row>
                </div>

              </Form>
            </div>
          </div>
        </div>
        <div slot="footer">
          <Button class="clear" @click="tableDoneShow=false">关闭</Button>
          <Button class="save" @click="tableDoneSave('tableDoneInfo')">保存</Button>
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

    <!--工艺树-->
    <div v-if="treeShow">
      <Modal v-model="treeShow" class-name="delect entrepot" :mask-closable=false  width="600" v-drag>
        <p slot="header">
          <span class="main-heading">工艺</span>
        </p>
        <div class="ivewTreeBox" style="height: 400px;overflow-y: auto">
          <Tree :data="treeData"  show-checkbox></Tree>
        </div>
        <div slot="footer">
          <Button v-if="tableInsertShow" class="save" @click="treeSave('insert')">保存</Button>
          <Button v-if="tableDoneShow" class="save" @click="treeSave('edit')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--依赖树-->
    <div v-if="dependTreeShow">
      <Modal v-model="dependTreeShow" class-name="delect entrepot" :mask-closable=false  width="600" v-drag>
        <p slot="header">
          <span class="main-heading">工艺</span>
        </p>
        <div class="ivewTreeBox" style="height: 400px;overflow-y: auto">
          <Tree :data="dependTreeData"  show-checkbox></Tree>
        </div>
        <div slot="footer">
          <Button v-if="tableInsertShow" class="save" @click="dependSave('insert')">保存</Button>
          <Button v-if="tableDoneShow" class="save" @click="dependSave('edit')">保存</Button>
        </div>
      </Modal>
    </div>

    <!--删除工艺-->
    <div v-if="detailDeleteShow">
      <Modal v-model="detailDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="detailDelete">确认</Button>
            <Button  class="clear" @click="detailDeleteShow=false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
    export default {
        name: "anchor",
        data(){
          const code = (rule, value, callback) => {
            if (value) {
              callback();
            } else {
              callback(new Error('请选择编号'));
            }
          };
          const clothid = (rule, value, callback) => {
            if (value) {
              callback();
            } else {
              callback(new Error('请选择品类'));
            }
          };
          return {
            totals:0,
            searchForm:{
              name:'',
              clothid:' ',
              pageIndex:1,
              pageSize:10,
            },
            //table
            columns: [
              {
                title: '序号',
                width:'4%',
                type:'index',
                align: 'center',
              },
              {
                title: '锚点名称',
                width:'10%',
                key: 'name',
                align: 'center',
              },
              {
                title: '品类',
                width:'10%',
                key: 'clothname',
                align: 'center',
              },
              {
                title: 'code',
                width:'10%',
                key: 'code',
                align: 'center',
              },
              {
                title: '备注',
                width:'10%',
                key: 'remark',
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
                            this.tableDeleteInfo=params.row
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
            //品类选项
            clothTypeList:[],
            // 编号选项
            codenameList:[],
            //新增
            tableInsertShow:false,
            tableInsertInfo:{
              //依赖工艺
              dependid:'',
              tree:'',
              //品类
              clothid:'',
              name:'',
              code:'',
              remark:'',
              dicts:[

              ]
            },
            treeData:[],
            treeIndex:'',
            tableInsertRule:{
//              name: [
//                { required: true,message:'请输入名称', trigger: 'blur' },
//                { max:20,message: '名称不能超过20位', trigger: 'blur'}
//              ],
              remark: [
                { max:50,message:'备注不能超过50位', trigger: 'blur' },
              ],
              code: [
                { required: true,validator:code, trigger: 'change' },
              ],
              clothid: [
                { required: true,validator:clothid, trigger: 'change' },
              ],
            },
            treeShow:false,
            //编辑
            tableDoneInfo:{},
            tableDoneShow:false,
            //删除
            tableDeleteShow:false,
            tableDeleteInfo:'',
            dis:true,
            //依赖工艺
            dependTreeShow:false,
            dependTreeData:'',
            detailDeleteShow:false,
            detailIndex:''
          }
        },
        mounted(){
          this.tableSearch();
          this.getClothType()
        },
        methods:{
          cancels(name){
            this.$refs[name].resetFields();
            this.dependTreeData=''
          },
          tableSearch(){
            this.$http.get('/pointlist',{params:this.searchForm}).then(res=>{
              this.data = res.data.data;
              this.totals = res.data.total;
            })
          },
          search(){
            this.searchForm.pageIndex=1
            this.$refs.pages.pageReset(this.searchForm.pageSize,this.searchForm.pageIndex);
            this.tableSearch()
          },
          pageListen(data){
            this.searchForm.pageIndex=data.pageIndex;
            this.searchForm.pageSize=data.pageSize;
            this.tableSearch();
          },
          getClothType(){
            this.$http.get('/dict/category',{params:{
              category:'P',
              parentid:0,
            }}).then(res=>{
              this.clothTypeList=res.data
            })
          },
          getTechnologyList(type,id){
            //重选时数据清空
            this.tableInsertInfo.code='';
            this.tableInsertInfo.dicts=[];
            this.tableInsertInfo.dependid='';
            this.tableDoneInfo.dependid='';
            this.tableDoneInfo.dicts=[];
            this.tableDoneInfo.code='';
            this.dependTreeData=''
            if(type==='edit'){
              this.$http.get('/point/tree/',{params:{clothid:id}}).then(res=>{
                this.dependTreeData=res.data
              })
            }
            if(id){
              this.$http.get('/dictSystem/list/',{params:{category:'POINT_CODE',property:id}}).then(res=>{
                this.codenameList=res.data
                this.dependTreeData=''
              })
            }else{
              this.codenameList=[]
            }
          },
          //添加工艺
          addDicts(type){
            if(type==='insert'){
              this.tableInsertInfo.dicts.push({
                tree:[],
                name:'',//名称
                dictid:'', //工艺
                submitid:'', //提交工艺
                sequenceno:'', //排序
                path:'', //地址
              })
            }else{
              this.tableDoneInfo.dicts.push({
                tree:'',
                name:'',//名称
                dictid:'', //工艺
                submitid:'', //提交工艺
                sequenceno:'', //排序
                path:'', //地址
              })
            }

          },
          //删除工艺
          deleteDicts(type,index){
            this.detailIndex=index
            this.detailDeleteShow=true
          },
          detailDelete(){
            if(this.tableInsertShow){
              this.tableInsertInfo.dicts.splice(this.detailIndex,1)
            }else if(this.tableDoneShow){
              this.tableDoneInfo.dicts.splice(this.detailIndex,1)
            }
            this.detailDeleteShow=false
          },
          tableInsert(){
            this.tableInsertShow=true;
            this.tableInsertInfo.dependid=[];
          },
          //编号改变
          codenameChange(type,code){
            if(type==='insert'){
              for(let i in this.codenameList){
                if(this.codenameList[i].code==code){
                  this.tableInsertInfo.name=this.codenameList[i].name
                }
              }
            }else{
              for(let i in this.codenameList){
                if(this.codenameList[i].code==code){
                  this.tableDoneInfo.name=this.codenameList[i].name
                }
              }
            }

          },
          //新增,编辑锚点工艺树
          treeSelect(type,item,index){
            if(type==='insert'){
              if(this.tableInsertInfo.clothid){
                if(item.tree.length===0){
                  this.$http.get('/pointDict/tree',{params:{clothid:this.tableInsertInfo.clothid}}).then(res=>{
                    item.tree=res.data;
                    this.treeData=[...item.tree]
                    this.treeShow=true;
                  });
                }else{
                  this.treeData=[...item.tree]
                  this.treeShow=true;
                }
                this.treeIndex=index

              }else{
                this.$Message.error('请先选择品类')
              }
            }else{
              if(this.tableDoneInfo.clothid){
                console.log(item);
                if(!item.tree){
                  this.$http.get('/pointDict/tree',{params:{clothid:this.tableDoneInfo.clothid,pointDictid:item.id}}).then(res=>{
                    item.tree=res.data;
                    this.treeData=[...item.tree]
                    this.treeShow=true;
                  });
                }else{
                  this.treeData=[...item.tree]
                  this.treeShow=true;
                }
                this.treeIndex=index

              }else{
                this.$Message.error('请先选择品类')
              }
            }

          },
          treeSave(type){
            let id=''
            for(let a in this.treeData){
              for(let b in this.treeData[a].children){
                if(this.treeData[a].children[b].checked){
                  id+=this.treeData[a].children[b].id+','
                }
              }
            }
            id=id.substr(0,id.length-1);
            if(type==='insert'){
              this.tableInsertInfo.dicts[this.treeIndex].dictid=id
              this.tableInsertInfo.dicts[this.treeIndex].submitid=id
              this.tableInsertInfo.dicts[this.treeIndex].tree=[...this.treeData]
              this.treeShow=false;
            }else{
              this.tableDoneInfo.dicts[this.treeIndex].dictid=id
              this.tableDoneInfo.dicts[this.treeIndex].submitid=id
              this.tableDoneInfo.dicts[this.treeIndex].tree=[...this.treeData]
              this.treeShow=false;
            }
          },
          //选择依赖
          dependSelect(type,code){
            if(type==='insert'){
              if(code){
                if(!this.dependTreeData){
                  this.$http.get('/point/tree/',{params:{clothid:code}}).then(res=>{
                    this.dependTreeData=res.data
                    this.dependTreeShow=true
                  })
                }else{
                  this.dependTreeShow=true
                }
              }else{
                this.$Message.error('请先选择品类')
              }
            }else{
              if(code){
                if(!this.dependTreeData){
                  this.$http.get('/point/tree/',{params:{clothid:code,id:this.tableDoneInfo.id}}).then(res=>{
                    this.dependTreeData=res.data
                    this.dependTreeShow=true
                  })
                }else{
                  this.dependTreeShow=true
                }
              }else{
                this.$Message.error('请先选择品类')
              }
            }

          },
          //保存依赖
          dependSave(type){
            if(type==='insert'){
              let id=''
              for(let a in this.dependTreeData){
                for(let b in this.dependTreeData[a].children){
                  if(this.dependTreeData[a].children[b].checked){
                    id+=this.dependTreeData[a].children[b].id+','
                  }
                }
              }
              id=id.substr(0,id.length-1);
              this.tableInsertInfo.dependid=id
            }else{
              let ids=''
              for(let first in this.dependTreeData){
                let child=this.dependTreeData[first].children
                for(let check in child){
                  if(child[check].checked){
                    ids+=child[check].id+','
                  }
                }
              }
              ids=ids.substr(0,ids.length-1);
              this.tableDoneInfo.dependid=ids
            }
            this.dependTreeShow=false
          },
          //新增保存
          tableInsertSave(name){
            this.$refs[name].validate((valid) => {
              if (valid) {
                for(let i in this.tableInsertInfo.dicts){
                  if(this.tableInsertInfo.dicts[i].name===''||this.tableInsertInfo.dicts[i].name===null){
                      this.$Message.error('请填写名称');
                      return
                    }else if(this.tableInsertInfo.dicts[i].name.length>50){
                      this.$Message.error('名称不能超过50位');
                      return
                    }
                    if(this.tableInsertInfo.dicts[i].dictid===''||this.tableInsertInfo.dicts[i].dictid===null){
                      this.$Message.error('请选择工艺');
                      return
                    }
                    if(this.tableInsertInfo.dicts[i].submitid===''||this.tableInsertInfo.dicts[i].submitid===null){
                      this.$Message.error('请填写提交工艺');
                      return
                    }
                    if(this.tableInsertInfo.dicts[i].sequenceno===''||this.tableInsertInfo.dicts[i].sequenceno===null){
                      this.$Message.error('请填写排序');
                      return
                    }else if(!(/^[0-9]+$/).test(this.tableInsertInfo.dicts[i].sequenceno)){
                      this.$Message.error('排序仅为数字');
                      return
                    }else if((this.tableInsertInfo.dicts[i].sequenceno+'').length>9){
                      this.$Message.error('排序最大长度9位');
                      return
                    }else{
                       this.tableInsertInfo.dicts[i].sequenceno=Number(this.tableInsertInfo.dicts[i].sequenceno)
                    }
                    if(this.tableInsertInfo.dicts[i].path===''||this.tableInsertInfo.dicts[i].path===null){
                     this.$Message.error('工艺对应地址不能为空');
                     return
                    }else if(this.tableInsertInfo.dicts[i].path.length>50){
                      this.$Message.error('工艺地址最大长度50位');
                      return
                    }
                }
                let data=JSON.parse(JSON.stringify(this.tableInsertInfo));
                console.log(data);
                this.$http.post('/point',data).then(res=>{
                  this.tableInsertShow=false;
                  this.tableSearch();
                  this.$Message.success('添加成功');
                  this.tableInsertClear(name)
                });
              }
            })
          },
          tableInsertClear(name){
            this.dependTreeData=''
            this.codenameList=[]
            this.tableInsertInfo={
              //依赖工艺
              dependid:[],
              //品类
              clothid:'',
              code:'',
              name:'',
              remark:'',
              dicts:[

              ]

            };
            this.cancels(name)
          },
          //编辑
          tableDone(row){
            this.$http.get('/point/'+row.id).then(res=>{
              this.tableDoneInfo=res.data
              this.$http.get('/dictSystem/list/',{params:{category:'POINT_CODE',property:res.data.clothid}}).then(res=>{
                this.codenameList=res.data
                this.tableDoneShow=true;
              })
            });
          },
          //编辑修改品类时(废弃)
          editTechnologyList(id){
            this.tableDoneInfo.code=''
            this.codenameList=[];
            this.tableDoneInfo.dicts=[]
            this.$http.get('/dictSystem/list/',{params:{category:'POINT_CODE',property:id}}).then(res=>{
              this.codenameList=res.data
            })
          },
          tableDoneSave(name){
            this.$refs[name].validate((valid) => {
              if (valid) {
                for(let i in this.tableDoneInfo.dicts){
                  if(this.tableDoneInfo.dicts[i].name===''||this.tableDoneInfo.dicts[i].name===null){
                    this.$Message.error('请填写名称');
                    return
                  }else if(this.tableDoneInfo.dicts[i].name.length>50){
                    this.$Message.error('名称不能超过50位');
                    return
                  }
                  if(this.tableDoneInfo.dicts[i].dictid===''||this.tableDoneInfo.dicts[i].dictid===null){
                    this.$Message.error('请选择工艺');
                    return
                  }
                  if(this.tableDoneInfo.dicts[i].submitid===''||this.tableDoneInfo.dicts[i].submitid===null){
                    this.$Message.error('请填写提交工艺');
                    return
                  }
                  if(this.tableDoneInfo.dicts[i].sequenceno===''||this.tableDoneInfo.dicts[i].sequenceno===null){
                    this.$Message.error('请填写排序');
                    return
                  }else if(!(/^[0-9]+$/).test(this.tableDoneInfo.dicts[i].sequenceno)){
                    this.$Message.error('排序仅为数字');
                    return
                  }else if((this.tableDoneInfo.dicts[i].sequenceno+'').length>9){
                    this.$Message.error('排序最大长度9位');
                    return
                  }else{
                    this.tableDoneInfo.dicts[i].sequenceno=Number(this.tableDoneInfo.dicts[i].sequenceno)
                  }
                  if(this.tableDoneInfo.dicts[i].path===''||this.tableDoneInfo.dicts[i].path===null){
                    this.$Message.error('工艺对应地址不能为空');
                    return
                  }else if(this.tableDoneInfo.dicts[i].path.length>50){
                    this.$Message.error('工艺地址最大长度50位');
                    return
                  }
                }
                let data=JSON.parse(JSON.stringify(this.tableDoneInfo));
                this.$http.put('/point',data).then(res=>{
                  this.tableDoneShow=false;
                  this.tableSearch();
                  this.$Message.success('修改成功');
                  this.codenameList=[];
                  this.treeData=[];
                  this.treeIndex='';
                  this.dependTreeData=''
                }).catch(err=>{

                })
              }
            })
          },
          //删除
          tableDeleteSave(){
            this.$http.delete('/point/'+this.tableDeleteInfo.id).then(res=>{
              this.tableSearch();
              this.$Message.success('删除成功');
              this.tableDeleteShow=false
            });

          },
        }
    }
</script>
<style>
  .sameBut{
    color: #657180 !important;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .sameBut:hover{
    cursor: pointer;
  }
  .ivewTree li{
    margin: 0 !important;
  }
  .ivewTreeBox{
    padding: 10px;
  }
</style>
<style scoped>

   .row-input .ivu-form-item{
      width:100%;
   }
   .row-input button{
      margin-left: 15px;
   }
   .row-input button:hover{
     color: #44bfb7;
     border: 1px solid #44bfb7;
   }
   .add{
     float: right;
     margin-right: 0;
     width: 80px;
     height:32px;
     line-height: 22px;
     margin-top: 3px;
     background-color: #00b6f1;
     border: none;
     color: white;
     cursor: pointer;
     border-radius: 0;
   }
   .add:hover{
     color: white !important;
     background-color: #00b6f1 !important;
   }
</style>
