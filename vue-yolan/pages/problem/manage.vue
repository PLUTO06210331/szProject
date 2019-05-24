<template>
  <div class="problem-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <div class="headshow">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
          <span>问题管理 /</span>
          <span>问题管理</span>
          </span>
          <span slot="footer" class="com-slot-right">
          <span v-if="parentid===1" class="T3 main-heading" @click="tableInsertAShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>添加形象判定题目</span></span>
          <span v-if="parentid===2" class="T3 main-heading" @click="tableInsertBShow=true;"><span class="shade"><span class="colorBox colorBoxGreen"><Icon type="ios-plus-outline"></Icon></span>添加风格和选择服装题目</span></span>
          </span>
      </header-slot>
      <div class="bodyContent tableDistance">
        <Form class="searchForm searchStyle" label-position="left"  inline >
          <Form-item label="问题关键字" :label-width="80" class="specialCase" >
            <Input @on-enter="search()" v-model="formItem.description" ></Input>
            <Input style="display:none"></Input>
          </Form-item>
          <Form-item class="specialHandling .specialHandling">
            <Button icon="search"  @click="search" style="width=50px"></Button>
          </Form-item>
        </Form>
        <div style="clear: both"></div>
          <div id="screenDiv">
            <Tabs type="card">
              <TabPane :label="image">
                <div ref="tableBox" style="height: calc(100% - 70px);overflow-y: auto;">
                  <Table v-com border :columns="problemAColumns" :data="imageData"></Table>
                </div>
                <div style="height: 70px"> <!-- style="height: 70px;margin-top:-43px" -->
                  <page-current ref="imageTotals" class="pages-position" :total="imageTotals" @pageChange="ApageListen"></page-current>
                </div>
              </TabPane>
              <TabPane :label="style">
                <div ref="tableBox" style="height: calc(100% - 70px);overflow-y: auto;">
                  <Table v-com border :columns="problemBColumns" :data="styleData"></Table>
                </div>
                <div style="height: 70px;">
                  <page-current ref="styleTotals" class="pages-position" :total="styleTotals" @pageChange="BpageListen"></page-current>
                </div>
              </TabPane>
            </Tabs>
          </div>

      </div>
      <!--新增题目-->
    <div v-if="tableInsertAShow">
      <Modal v-model="tableInsertAShow" class-name="delect big-sized" :mask-closable=false  width="780" v-drag @on-cancel="cancels('addQuestionAnswer')">
        <p slot="header">
          <span class="main-heading">添加题目</span>
        </p>
        <Form ref="addQuestionAnswer" class="searchForm" label-position="left" :model="addQuestionAnswer" :rules="tableInsertRule" inline style="text-align: left;padding:15px 50px 0 90px">
          <Form-item prop="description" label="问题描述:" :label-width="70" >
            <Input v-model="addQuestionAnswer.description"></Input>
          </Form-item>
          <Form-item prop="en" label="英文描述:" :label-width="70" >
            <Input v-model="addQuestionAnswer.en"></Input>
          </Form-item>
          <Form-item prop="characters" label="特性:" :label-width="70" >
            <Input v-model="addQuestionAnswer.characters"></Input>
          </Form-item>
          <Form-item prop="weight" label="权重:" :label-width="70" >
            <Input v-model="addQuestionAnswer.weight"></Input>
          </Form-item>
          <Form-item prop="gender"  label="适用性别:" :label-width="70" >
            <Select v-model="addQuestionAnswer.gender">
              <Option  :value="1" >男</Option>
              <Option  :value="0" >女</Option>
            </Select>
          </Form-item>
          </Form>
            <Tabs type="card" style="padding:0 0 0 90px">
              <TabPane v-for="(tab, index) in tabs" :key="tab" :label="'答案' + tab" v-if="addQuestionAnswer.answerBeanList[index]">
                <Form ref="addQuestionAnswer.answerBeanList[index]" class="searchForm" label-position="left" :model="addQuestionAnswer.answerBeanList[index]" :rules="tableInsertRules" inline style="text-align: left;padding:15px 0px 0 0">
                  <Form-item prop="answerDescription" label="答案描述:" :label-width="100" >
                    <Input v-model="addQuestionAnswer.answerBeanList[index].answerDescription"></Input>
                  </Form-item>
                  <Form-item prop="answerDescriptionEn" label="英文答案描述:" :label-width="100" >
                    <Input v-model="addQuestionAnswer.answerBeanList[index].answerDescriptionEn"></Input>
                  </Form-item>
                  <Form-item prop="answeCharactersr"  label="特性:" :label-width="100" >
                    <Input v-model="addQuestionAnswer.answerBeanList[index].answeCharactersr"></Input>
                  </Form-item>
                  <Button size="small" @click="TabRemove(index)" class="tabsDel" style="margin-right:90px">删除</Button>
                </Form>
              </TabPane>
              <Button type="ghost" @click="handleTabsAdd" size="small" slot="extra" style="margin-right:90px">增加答案</Button>
          </Tabs>
          <div slot="footer">
          <Button class="save" @click="AddInsertSave('addQuestionAnswer')" >保存</Button>
        </div>
      </Modal>
    </div>
    <!-- 新增形象判定题目 -->
    <div v-if="tableInsertBShow">
      <Modal v-model="tableInsertBShow" class-name="delect big-sized" :mask-closable=false  width="780" v-drag @on-cancel="cancels('addQuestionAnswerB')">
        <p slot="header">
          <span class="main-heading">添加题目</span>
        </p>
        <Form ref="addQuestionAnswerB" class="searchForm" label-position="left" :model="addQuestionAnswerB" :rules="tableInsertRule" inline style="text-align: left;padding:15px 50px 0 90px">
          <Form-item prop="description" label="问题描述:" :label-width="70" >
            <Input v-model="addQuestionAnswerB.description"></Input>
          </Form-item>
          <Form-item prop="en" label="英文描述:" :label-width="70" >
            <Input v-model="addQuestionAnswerB.en"></Input>
          </Form-item>
          <Form-item prop="characters"  label="特性:" :label-width="70" >
            <Input v-model="addQuestionAnswerB.characters"></Input>
          </Form-item>
          <Form-item prop="weight" label="权重:" :label-width="70" >
            <Input v-model="addQuestionAnswerB.weight"></Input>
          </Form-item>
          <Form-item prop="gender"  label="适用性别:" :label-width="70" >
            <Select v-model="addQuestionAnswerB.gender">
              <Option  :value="1" >男</Option>
              <Option  :value="0" >女</Option>
            </Select>
          </Form-item>
          </Form>
          <Tabs type="card" style="padding:0 0 0 90px">
              <TabPane v-for="(tab, index) in tabs" :key="tab" :label="'答案' + tab" v-if="addQuestionAnswerB.answerBeanList[index]">
                <Form ref="addQuestionAnswerB.answerBeanList[index]" class="searchForm" label-position="left" :model="addQuestionAnswerB.answerBeanList[index]" :rules="tableInsertRules" inline style="text-align: left;padding:15px 50px 0 0">
                  <Form-item prop="answerDescription" label="答案描述:" :label-width="100" >
                    <Input v-model="addQuestionAnswerB.answerBeanList[index].answerDescription"></Input>
                  </Form-item>
                  <Form-item prop="answerDescriptionEn" label="英文答案描述:" :label-width="100" >
                    <Input v-model="addQuestionAnswerB.answerBeanList[index].answerDescriptionEn"></Input>
                  </Form-item>
                  <Form-item prop="answeCharactersr"  label="特性:" :label-width="100" >
                    <Input v-model="addQuestionAnswerB.answerBeanList[index].answeCharactersr"></Input>
                  </Form-item>
                  <Button size="small" @click="TabRemove(index)" class="tabsDel" style="margin-right:90px">删除</Button>
                  </Form>
              </TabPane>
              <Button type="ghost" @click="handleTabsAdd" size="small" slot="extra" style="margin-right:90px">增加答案</Button>
          </Tabs>
          <div slot="footer">
          <Button class="save" @click="AddInsertSaveB('addQuestionAnswerB')">保存</Button>
        </div>
      </Modal>
    </div>
    <!-- 编辑题目 -->
    <div v-if="tableEditAShow">
      <Modal v-model="tableEditAShow" class-name="delect big-sized" :mask-closable=false  width="780" v-drag @on-cancel="cancels('answerA')">
        <p slot="header">
          <span class="main-heading">编辑题目</span>
        </p>
        <Form ref="answerA" class="searchForm" label-position="left" :model="answerA" :rules="tableInsertRule" inline style="text-align: left;padding:15px 50px 0 90px">
          <Form-item prop="description" label="问题描述:" :label-width="70" >
            <Input v-model="answerA.description"></Input>
          </Form-item>
          <Form-item prop="en" label="英文描述:" :label-width="70" >
            <Input v-model="answerA.en"></Input>
          </Form-item>
          <Form-item prop="characters"  label="特性:" :label-width="70" >
            <Input v-model="answerA.characters"></Input>
          </Form-item>
          <Form-item prop="weight" label="权重:" :label-width="70" >
            <Input v-model="answerA.weight"></Input>
          </Form-item>
          <Form-item prop="gender"  label="适用性别:" :label-width="70" >
            <Select v-model="answerA.gender">
              <Option  :value="'1'" >男</Option>
              <Option  :value="'0'" >女</Option>
            </Select>
          </Form-item>
          </Form>
         <Tabs type="card" style="padding:0 0 0 90px">
              <TabPane v-for="(tab, index) in answerA.answerBeanList.length" :key="tab" :label="'答案' + tab" v-if="answerA.answerBeanList[index]">
                <Form ref="answerA.answerBeanList[index]" class="searchForm" label-position="left" :model="answerA.answerBeanList[index]" :rules="tableInsertRule" inline style="text-align: left;padding:15px 50px 0 0">
                  <Form-item prop="answerDescription" label="答案描述:" :label-width="100" required>
                    <Input v-model="answerA.answerBeanList[index].answerDescription"  ></Input>
                  </Form-item>
                  <Form-item prop="answerDescriptionEn" label="英文答案描述:" :label-width="100" >
                    <Input v-model="answerA.answerBeanList[index].answerDescriptionEn" ></Input>
                  </Form-item>
                  <Form-item prop="answeCharactersr"  label="特性:" :label-width="100" >
                    <Input v-model="answerA.answerBeanList[index].answeCharactersr" ></Input>
                  </Form-item>
                  <!-- <Button @click="EditTabRemove(index)" class="tabsDel" size='small'>删除</Button> -->
                </Form>
              </TabPane>
              <!-- <Button type="ghost" @click="EdithandleTabsAdd(answerA.id)" size="small" slot="extra">增加</Button> -->
          </Tabs>
          <div slot="footer">
          <Button class="" @click="editSave('answerA')">保存</Button>

        </div>
      </Modal>
    </div>
    <!-- 查看题目详情 -->
    <div v-if="tableInfoAShow">
      <Modal v-model="tableInfoAShow" class-name="delect entrepot" :mask-closable=false  width="780" v-drag >
        <p slot="header">
          <span class="main-heading">问题描述</span>
        </p>
            <Form class="basicForm searchForm" :label-width="70"  inline style="text-align: left">
              <Row class="detailRow">
                <i-col span="8">
                  <Form-item label="问题描述:">
                    {{questionData.description}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="英文描述:">
                    {{questionData.en}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="适用性别">
                    {{questionData.gender==='1'?'男':'女'}}
                  </Form-item>
                </i-col>
                <i-col span="8">
                  <Form-item label="权重:">
                    {{questionData.weight}}
                  </Form-item>
                </i-col>
              </Row>
            </Form>
        <Table v-com border :columns="qusetionAnswerColumns" :data="answerData"></Table>
          <div slot="footer">
          <Button class="save" @click="tableInfoAShow=false">关闭</Button>
          </div>
      </Modal>
      </div>
    </div>
    </div>

      <div v-if="answerADeleteShow">
        <Modal v-model="answerADeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
          <p slot="header" class="main-heading">
            提示框
          </p>
          <div>
            <Icon type="information-circled"></Icon>确认删除此条信息吗？
          </div>
          <div slot="footer">
            <div class="footer">
              <Button  class="save" @click="answerADeleteSave">确认</Button>
              <Button  class="clear" @click="answerADeleteShow=false">取消</Button>
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
  data(){
    const weight = (rule, value, callback) => {
      // console.log(value)
      if (value === "" || value === undefined || value === null) {
      callback(new Error('请填写权重'));
      } else {
      if (!/^[0-9]*$/.test(value)) {
          callback(new Error('请输入数字'));
      } else if (value.length > 5) {
          callback(new Error('最多输入5位'));
      } else {
          callback();
      }
      }
  };
      const descriptions = (rule, value, callback) => {
      if (value === "" || value === undefined || value === null) {
          callback(new Error('请填写答案描述'));
      }else
      {
        if(value.length > 10){
            callback(new Error('最多输入10位'));
        }else if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(value)){
            callback(new Error('请输入中文、英文或数字'));
        }
        else{
          callback()
        }
      }
  };
  const description = (rule, value, callback) => {
      // if (value === "" || value === undefined || value === null) {
      //     callback(new Error('请填写答案描述'));
      // }else
      // {
        if(value.length > 10){
            callback(new Error('最多输入10位'));
        }else if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(value)){
            callback(new Error('请输入中文、英文或数字'));
        }
        else{
          callback()
        }
      // }
  }
    return{
      formItem:{
        parentid:1,
      },
      tabs: 1,
      holider:'',
      tableInsertRules:{
        description: [
            { required: true,message:'请填写描述', trigger: 'blur' },
            { max:15,message: '问题描述不能超过15位', trigger: 'blur'}
          ],
          answerDescription: [
            { required: true,validator:description, trigger: 'change' },
            // { max:15,message: '答案描述不能超过15位', trigger: 'blur'}
          ],
          en: [
            { required: true,message:'请填写英文描述', trigger: 'blur' },
            { max:30,message: '英文描述不能超过30位', trigger: 'blur'}
          ],
          gender: [
            { required: true,message:'请选择性别',  },
          ],
          weight: [
            { required: true,validator:weight, trigger: 'blur' },
          ],
          characters: [
            { required: true,message:'请填写特性', trigger: 'blur' },
            { max:20,message: '长度不能超过20位', trigger: 'blur'}
          ],
          answerDescriptionEn: [
            { required: false,message:'请填写英文描述', trigger: 'blur' },
            { max:20,message: '长度不能超过20位', trigger: 'blur'}
          ],
          answeCharactersr: [
            { required: false,message:'请填写特性', trigger: 'blur' },
            { max:20,message: '长度不能超过20位', trigger: 'blur'}
          ],
      },
      tableInsertRule:{
          description: [
            { required: true,message:'请填写描述', trigger: 'blur' },
            { max:15,message: '问题描述不能超过15位', trigger: 'blur'}
          ],
          answerDescription: [
            { required: true,validator:descriptions, trigger: 'blur' },
            // { max:15,message: '答案描述不能超过15位', trigger: 'blur'}
          ],
          en: [
            { required: true,message:'请填写英文描述', trigger: 'blur' },
            { max:30,message: '英文描述不能超过30位', trigger: 'blur'}
          ],
          gender: [
            { required: true,message:'请选择性别',  },
          ],
          weight: [
            { required: true,validator:weight, trigger: 'blur' },
          ],
          characters: [
            { required: true,message:'请填写特性', trigger: 'blur' },
            { max:20,message: '长度不能超过20位', trigger: 'blur'}
          ],
          answerDescriptionEn: [
            { required: false,message:'请填写英文描述', trigger: 'blur' },
            { max:20,message: '长度不能超过20位', trigger: 'blur'}
          ],
          answeCharactersr: [
            { required: false,message:'请填写特性', trigger: 'blur' },
            { max:20,message: '长度不能超过20位', trigger: 'blur'}
          ],
        },
      answerADeleteShow:false,
      tableInsertAShow:false,
      tableInsertBShow:false,
      tableInfoAShow:false,
      fontDeleteShow:false,
      tableEditAShow:false,
        image: (h) => {
          return h('div',{
            class:'embroidDivTags',
            style:{
              display:'block',
              width:'100%',
              height:'100%',
              // padding:'5px 10px',
            },
            on: {
                click: () => {
                  this.parentid = 1;
                  this.getData()
                }
              },
          }, [
            h('span',{
              class:'embroidSpanTags',
              on: {
                click: () => {
                  this.parentid = 1;
                  this.changeparent1()
                }
              },
            },'形象判定'),
          ])
        },
        style: (h) => {
          return h('div',{
            class:'embroidDivTags',
            style:{
              width:'100%',
              height:'100%',

            },
            on: {
                click: () => {
                  this.parentid = 2;
                  // this.changeparent2()
                }
              },
          }, [
            h('span',{
              class:'embroidSpanTags',
              on: {
                click: () => {
                  this.parentid = 2;
                  this.changeparent2()
                }
              },
            },'风格与选择服装判断'),
          ])
        },
        imageTotals:1,
        styleTotals:1,
        imageData:[
        ],
        styleData:[],
        answerData:[],
        answerA:{
          answerBeanList:[],
          parentid:1,
        },
        editData:{
          answerBeanList:[],
          parentid:1,
        },
        questionData:[],
        addQuestionAnswerB:{
          answerBeanList:[
            {
              answeCharactersr:"",
              answerDescription:"",
              answerDescriptionEn:"",
            }
          ],
          parentid:2,
        },
        addQuestionAnswer:{
          answerBeanList:[
            {
              answeCharactersr:"",
              answerDescription:"",
              answerDescriptionEn:"",
            }
          ],
          parentid:1,
        },
        qusetionAnswerColumns:[
           {
            title: '答案描述',
            width:'33%',
            key: 'description',
            align: 'center',
          },
          {
            title: '英文描述',
            width:'33%',
            key: 'en',
            align: 'center',
          },
          {
            title: '特性',
            width:'33%',
            key: 'characters',
            align: 'center',
          },

        ],
        problemBColumns:[
          {
            title: '问题描述',
            width:'30%',
            key: 'description',
            align: 'center',
          },
          {
            title: '英文描述',
            width:'30%',
            key: 'en',
            align: 'center',
          },
          {
            title: '性别',
            width:'10%',
            key: 'gender',
            align: 'center',
            render:(h,params)=>{
              return h('span',{},params.row.gender==='1'?'男':'女')
            }
          },
          {
            title: '权重',
            width:'10%',
            key: 'weight',
            align: 'center',
          },
          {
            title: '特性',
            width:'20%',
            key: 'characters',
            align: 'center',
          },
          {
            title: '操作',
            width:'20%',
            //key: 'id',
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
                        this.showquestionAnswer.parentid = 2;
                        this.tableInfoAShow = true
                        this.showquestionAnswer.id = params.row.id
                        this.showAnswer()
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-bianji',
                    }),

                    h('span',{
                    },'查看')
                  ]
                ),
                h('Button', {
                    class: 'greenButton ',
                    style: {
                      marginLeft: '8px',
                      background:"#fff",
                    },
                    on: {
                      click: () => {
                        this.showquestionAnswer.parentid = 2;
                        this.answerA.parentid = 2;
                        this.tableEditAShow=true;
                        this.showquestionAnswer.id = params.row.id;
                        this.answerA.id = params.row.id
                        this.showAnswer()
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
                        this.answerADeleteShow=true;
                        this.questionADeleteInfo = params.row.id;
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
        problemAColumns:[
          {
            title: '问题描述',
            width:'30%',
            key: 'description',
            align: 'center',
          },
          {
            title: '英文描述',
            width:'20%',
            key: 'en',
            align: 'center',
          },
          {
            title: '适用性别',
            width:'10%',
            key: 'gender',
            align: 'center',
            render:(h,params)=>{
              return h('span',{},params.row.gender==='1'?'男':'女')
            }
          },
          {
            title: '权重',
            width:'10%',
            key: 'weight',
            align: 'center',
          },
          {
            title: '特性',
            width:'10%',
            key: 'characters',
            align: 'center',
          },
          {
            title: '操作',
            width:'20%',
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
                        this.showquestionAnswer.parentid = 1;
                        this.tableInfoAShow = true
                        this.showquestionAnswer.id = params.row.id
                        this.showAnswer()
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-bianji',
                    }),

                    h('span',{
                    },'查看')
                  ]
                ),
                h('Button', {
                    class: 'greenButton ',
                    style: {
                      marginLeft: '8px',
                      background:"#fff",
                    },
                    on: {
                      click: () => {
                        this.showquestionAnswer.parentid = 1;
                        this.answerA.parentid = 1;
                        this.tableEditAShow=true;
                        this.showquestionAnswer.id = params.row.id;
                        this.answerA.id = params.row.id
                        this.showAnswer()
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
                        this.answerADeleteShow=true;
                        this.questionADeleteInfo = params.row.id;
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
        questionADeleteInfo:'',
        answerADeleteInfo:'',
        showquestionAnswer:{
          parentid:1,
          id:0
        },
        parentid:1,
        getMesA:{
          parentid:1,
          pageIndex:1,
          pageSize:10,
        },
        getMes:{
          parentid:2,
          pageIndex:1,
          pageSize:10,
        }
    }
  },

  mounted(){
    this.getData()
    /*this.getStyleData()*/
    this.screenDivSize()
  },
  methods:{
    descriptionsProp(){
      console.log('1')
    },
    screenDivSize(){
      let screenDiv=document.getElementById('screenDiv');
      this.$nextTick(function(){
        let searchForm=document.getElementsByClassName('searchForm')[0];
        if(screenDiv){
          screenDiv.style.height=window.innerHeight-searchForm.offsetHeight-90+'px';
        }
      })
    },
    //获取parentId为1的数据
    getData(){
      console.log(this.getMesA);
      this.$http.get('/question/list',{params:this.getMesA}).then(res=>{
          this.imageTotals = res.data.total;
          this.imageData = res.data.data
        })
    },
    //获取parentId为2的数据
    getStyleData(){
      this.$http.get('/question/list',{params:this.getMes}).then(res=>{
        this.styleData = res.data.data;
        this.styleTotals = res.data.total;
      })
    },

    search(){
      this.formItem.parentid = this.parentid
      this.formItem.pageIndex=1;
      if(this.formItem.parentid==1){
        this.formItem.pageSize=this.$refs['imageTotals'].page.pageSize
        this.$refs.imageTotals.pageReset(this.formItem.pageSize,1);
      }else{
        this.formItem.pageSize=this.$refs['styleTotals'].page.pageSize
        this.$refs.styleTotals.pageReset(this.formItem.pageSize,1);
      }

        this.$http.get('/question/list',{params:this.formItem}).then(res=>{
          this.imageTotals = res.data.total;
          this.imageData = res.data.data;
          this.styleData = res.data.data;
          this.styleTotals = res.data.total;
        })
    },
    //切换问题管理
    changeparent1(){
      this.getData();
    },
    changeparent2(){
      this.getStyleData();
    },
    //清空弹窗中的数据
    cancels(name){
        this.$refs[name].resetFields();
        this.addQuestionAnswer = {
          answerBeanList:[
            {
              answeCharactersr:"",
              answerDescription:"",
              answerDescriptionEn:"",
            }
          ],
          parentid:1,
        }
        this.addQuestionAnswerB={
        answerBeanList:[
          {
            answeCharactersr:"",
            answerDescription:"",
            answerDescriptionEn:"",
          }
        ],
        parentid:2,
      }
      },
    //添加保存
    AddInsertSave(name){
      this.$refs[name].validate((valid) => {
        if(valid){
          var question = false
          for(let i in this.addQuestionAnswer.answerBeanList){
            if(this.addQuestionAnswer.answerBeanList[i].answerDescription === ''){
              this.$Message.error('请补全答案信息')
              return
            }else{
              question = true
            }
          }
          for(let i in this.addQuestionAnswer.answerBeanList){
              if(this.addQuestionAnswer.answerBeanList[i].answerDescription.length > 10 ||this.addQuestionAnswer.answerBeanList[i].answerDescriptionEn.length > 20 || this.addQuestionAnswer.answerBeanList[i].answeCharactersr.length > 20){
                return
              }
//              else if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(this.addQuestionAnswer.answerBeanList[i].answerDescription)){
//                return
//              }
              else{
                  question = true
              }
            }

          if (question) {
            console.log(this.addQuestionAnswer)
            this.$http.post('/question',this.addQuestionAnswer).then(res=>{
              this.getData()
              this.cancels(name)
              this.tableInsertAShow = false;
              this.$Message.success('新增成功');
            })
          }else{
            this.$Message.error('请补全答案信息')
          }
        }
        })
    },
    AddInsertSaveB(name){
      this.$refs[name].validate((valid) => {
        if(valid){
          var question = false
          for(let i in this.addQuestionAnswerB.answerBeanList){
            if(this.addQuestionAnswerB.answerBeanList[i].answerDescription === ''){
              this.$Message.error('请补全答案信息')
              return
            }else{
              question = true
            }
          }
          for(let i in this.addQuestionAnswer.answerBeanList){
              if(this.addQuestionAnswer.answerBeanList[i].answerDescription.length > 10 ||this.addQuestionAnswer.answerBeanList[i].answerDescriptionEn.length > 20 || this.addQuestionAnswer.answerBeanList[i].answeCharactersr.length > 20){

                return
              }
//              else if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(this.addQuestionAnswer.answerBeanList[i].answerDescription)){
//                console.log('@@@');
//                return
//              }
              else{
                  question = true
              }
            }
            // console.log(question)
          if (question) {
            this.$http.post('/question',this.addQuestionAnswerB).then(res=>{
              // console.log(res.data)
              this.getStyleData();
              this.tableInsertBShow = false;
              this.parentid = 2;
              this.cancels(name)
              this.$Message.success('新增成功');
            })
            // console.log(this.addQuestionAnswerB)
          }else{
            this.$Message.error('请补全答案信息')
          }
        }
        })
    },

    //删除确认(公用)
    answerADeleteSave(){
      this.$http.delete('/question/'+this.questionADeleteInfo).then(res=>{
              //console.log(res.data)
              this.getData()
              this.getStyleData();
              this.answerADeleteShow = false
              this.$Message.success('删除问题成功');
            })
    },
    //修改保存
    editSave(name){
      this.$refs[name].validate((valid) => {
          if (valid) {
            var question = false
            for(let i in this.answerA.answerBeanList){
              if(this.answerA.answerBeanList[i].answerDescription === ''){
                return
              }else{
                question = true
              }
            }
            for(let i in this.answerA.answerBeanList){
              if(this.answerA.answerBeanList[i].answerDescription.length > 10 ||this.answerA.answerBeanList[i].answerDescriptionEn.length > 20 || this.answerA.answerBeanList[i].answeCharactersr.length > 20){
                return
              }else if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(this.answerA.answerBeanList[i].answerDescription)){
                return
              }else{
                question = true
              }
            }
            // console.log(question)
            if(question){
                this.$http.put('/question',this.answerA).then(res=>{
                // console.log(res.data)
                this.getData()
                this.getStyleData();
                this.cancels(name)
                this.tableEditAShow = false;
                this.$Message.success('修改成功');
              })
            }else{
              this.$Message.error('请补全答案信息')
            }

            // console.log(this.answerA)
          }
        })
    },
    //查看答案(公用)
    showAnswer(){
      this.answerA.answerBeanList = []
      this.$http.get('/question/answers',{params:this.showquestionAnswer}).then(res=>{
              this.answerData = res.data[1];
              this.questionData = res.data[0];
              this.answerA.description = res.data[0].description;
              this.answerA.gender = res.data[0].gender;
              this.answerA.en = res.data[0].en;
              this.answerA.characters = res.data[0].characters;
              this.answerA.weight = res.data[0].weight;
              this.answerA.answerBeanList = res.data[1];
              for(let i in this.answerA.answerBeanList){
                this.answerA.answerBeanList[i].answerDescription = res.data[1][i].description
                this.answerA.answerBeanList[i].answerDescriptionEn = res.data[1][i].en
                this.answerA.answerBeanList[i].answeCharactersr = res.data[1][i].characters
              }
            })
    },
    //新增移除子答案
    TabRemove(index){
      this.tabs --;
      this.addQuestionAnswer.answerBeanList.splice(index,1)
      this.addQuestionAnswerB.answerBeanList.splice(index,1)
      console.log(this.addQuestionAnswer.answerBeanList);
    },
    //新增添加子答案
    handleTabsAdd () {
        this.tabs ++;
        this.addQuestionAnswer.answerBeanList.push({
          answerDescription:'',
          answerDescriptionEn:'',
          answeCharactersr:'',
        })
        this.addQuestionAnswerB.answerBeanList.push({
          answerDescription:'',
          answerDescriptionEn:'',
          answeCharactersr:'',
        })
    },
    //修改移除子答案
    EditTabRemove(index){
      this.answerA.answerBeanList.splice(index,1)
      console.log(this.answerA.answerBeanList);
    },
    //修改添加子答案
    EdithandleTabsAdd (id) {
        this.answerA.answerBeanList.push({
          answerDescription:'',
          answerDescriptionEn:'',
          answeCharactersr:'',
          parentid:id,
        })
    },
    //分页A监听
    ApageListen(data){
          this.getMesA.pageIndex=data.pageIndex;
          this.getMesA.pageSize=data.pageSize;
          console.log(this.getMesA);
          this.getData();
        },
    //分页A监听
    BpageListen(data){
      this.getMes.pageIndex=data.pageIndex;
      this.getMes.pageSize=data.pageSize;
      console.log(this.getMes)
      this.getStyleData();
    },
  }
}
</script>
<style lang="scss" scoped>
  // .bodyContent{
  //   form{
  //     padding: 15px 0;
  //   }
  // }
  .entrepot input{
    border:1px solid #dddee1 !important;
  }
  .ivu-input{
    border:1px solid #dddee1 !important;
  }
  .main-span{
    display: inline-block;
    width: 100%;
    height: 30px;
    background: #ccc;
    font-size: 12px;
    line-height: 30px;
    opacity: 0.5;
    padding-left: 15px;
    color:#464c5b;
    font-weight: bold;
  }
  .entrepot .ivu-modal-body .ivu-form{
    padding: 10px 80px;
    border: 0;
  }
  .entrepot .ivu-form-item{
    border: 0px;
    text-align: center
  }
  .ivu-tabs-tabpane{
    position: relative;
    .tabsDel{
      position:absolute;
      right: 0;
      top: 0;
    }
  }

</style>

<style>
  #screenDiv .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
    border-radius: 0 !important;
    margin-right: 0 !important;
  }
  #screenDiv .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
    background-color: white;
  }
  #screenDiv .ivu-tabs.ivu-tabs-card{
    height:100%;
  }
  #screenDiv .ivu-tabs-content.ivu-tabs-content-animated{
    height: calc(100% - 32px);
  }
  #screenDiv .ivu-tabs-tab-active{
    border-top: 1px solid;
  }

  #screenDiv .tabDiv .right .ivu-page-item{
    border:1px solid #dddee1
  }

  #screenDiv .ivu-tabs-tab{
    padding: 0;
  }
  #screenDiv .embroidDivTags{
    width: 100%;
    height: 100%;
    padding: 5px 10px;
  }
</style>
