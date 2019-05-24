<template>
  <div class="embroid-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>物流中心 /</span>
          <span>刺绣</span>
        </span>
        <span slot="footer" class="com-slot-right">
           <span v-if="whoAdd==='position'" class="T3 main-heading" @click="positionInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>添加刺绣位置</span></span>
           <span v-if="whoAdd==='font'" class="T3 main-heading" @click="fontInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>添加刺绣字体</span></span>
           <span v-if="whoAdd==='color'" class="T3 main-heading" @click="colorInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>添加刺绣颜色</span></span>
           <span v-if="whoAdd==='pictrue'" class="T3 main-heading" @click="pictrueInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>添加刺绣图案</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <!--<Form-item label="关键字" :label-width="60" class="specialCase" >-->
            <!--<Input @on-enter="search"></Input>-->
            <!--<input type="text" style="display: none">-->
          <!--</Form-item>-->
          <!--<Form-item class="specialHandling .specialHandling">-->
            <!--<Button icon="search" @click="search" @on-enter="search"></Button>-->
          <!--</Form-item>-->
        </Form>
        <div style="clear: both"></div>
        <div id="screenDiv">
          <Tabs type="card">
            <TabPane :label="position" name="position">
              <div class="tabDiv">
                <div class="left">
                  <h4 class="name">品类</h4>
                  <ul style="height: calc(100% - 34px);overflow-y: auto">
                    <li v-for="(item,index) in clothType" @click="chooseCloth(index,item)" :key="index" :style="{'backgroundColor':clothIndex==index?'#00b6f1':''}">{{item.name}}</li>
                  </ul>
                </div>
                <div class="right">
                  <div class="tabTable">
                    <Table border :columns="positionColumns" :data="positionData"></Table>
                  </div>
                  <div class="tabPage">
                    <div class="totals">共<span>{{positionTotals}}</span>条</div>
                    <div style="float: right;width: 500px;text-align: right">
                      <Page :total="positionTotals" placement="top" size="small" show-elevator show-sizer @on-change="positionPage" @on-page-size-change="positionSize"></Page>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane :label="font" name="font">
              <div style="height: calc(100% - 70px);overflow-y: auto;">
                <Table v-com border @on-row-click="aaa" :columns="fontColumns" :data="fontData"></Table>
              </div>
              <div style="height: 70px;">
                <page-current ref="fontTotals" class="pages-position" :total="fontTotals" @pageChange="fontPage"></page-current>
              </div>
            </TabPane>
            <TabPane :label="color">
              <div style="height: calc(100% - 70px);overflow-y: auto;">
                <Table v-com border :columns="colorColumns" :data="colorData"></Table>
              </div>
              <div style="height: 70px;">
                <page-current ref="colorTotals" class="pages-position" :total="colorTotals" @pageChange="colorPage"></page-current>
              </div>
            </TabPane>
            <TabPane :label="pictrue">
              <div style="height: calc(100% - 70px);overflow-y: auto;">
                <Table v-com border :columns="pictrueColumns" :data="pictrueData"></Table>
              </div>
              <div style="height: 70px;">
                <page-current ref="pictrueTotals" class="pages-position" :total="pictrueTotals" @pageChange="pictruePage"></page-current>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
    <!--位置编辑-->
    <div v-if="positionDoneShow">
      <Modal v-model="positionDoneShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('positionDoneInfo')">
        <p slot="header">
          <span class="main-heading">编辑刺绣位置</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="positionDoneInfo" class="searchForm" label-position="left" :model="positionDoneInfo" :rules="positionInsertRule" inline style="text-align: left;padding:15px 60px 0">
            <Form-item prop="ecode" label="ecode:" :label-width="90" >
              <Input v-model="positionDoneInfo.ecode"></Input>
            </Form-item>
            <Form-item prop="name"  label="名称:" :label-width="90" >
              <Input v-model="positionDoneInfo.name"></Input>
            </Form-item>
            <Form-item prop="en"  label="英文名称:" :label-width="90" >
              <Input v-model="positionDoneInfo.en"></Input>
            </Form-item>
            <div style="padding: 10px 0">
              <Radio-group v-model="positionDoneInfo.property">
                <Radio label='W'>仅文字可用</Radio>
                <Radio label='I'>仅图案可用</Radio>
                <Radio label=''>文字图案皆可用</Radio>
              </Radio-group>
            </div>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="positionDoneSave('positionDoneInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--位置新增-->
    <div v-if="positionInsertShow">
      <Modal v-model="positionInsertShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('positionInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增刺绣位置</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="positionInsertInfo" class="searchForm" label-position="left" :model="positionInsertInfo" :rules="positionInsertRule" inline style="text-align: left;padding:15px 60px 0">
            <Form-item prop="dictid" label="下单系统ID:" :label-width="90" >
              <Input v-model="positionInsertInfo.dictid" ></Input>
            </Form-item>
            <Form-item prop="ecode"  label="ecode:" :label-width="90" >
              <Input v-model="positionInsertInfo.ecode"></Input>
            </Form-item>
            <Form-item prop="name"  label="名称:" :label-width="90" >
              <Input v-model="positionInsertInfo.name"></Input>
            </Form-item>
            <Form-item prop="en"  label="英文名称:" :label-width="90" >
              <Input v-model="positionInsertInfo.en"></Input>
            </Form-item>
            <Form-item prop="clothid"  label="品类"  :label-width="75">
              <Select v-model="positionInsertInfo.clothid">
                <Option v-for="item in clothType" :value="item.id" :key="item.name">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <div style="padding: 10px 0">
              <Radio-group v-model="positionInsertInfo.property">
                <Radio label='W'>仅文字可用</Radio>
                <Radio label='I'>仅图案可用</Radio>
                <Radio label=''>文字图案皆可用</Radio>
              </Radio-group>
            </div>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="positionInsertSave('positionInsertInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--位置删除-->
    <div v-if="positionDeleteShow">
      <Modal v-model="positionDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="positionDeleteSave">确认</Button>
            <Button  class="clear" @click="positionDeleteShow=false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!--位置图例-->
    <div v-if="PrintShow">
      <Modal v-model="PrintShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag>
        <p slot="header">
          <span class="main-heading">图例</span>
        </p>
        <div class="pattern">
          <img v-if="positionPrintDone" :src="positionPrintDone" style="width: 300px;height: 300px">
          <div style="position: absolute;bottom:0 ">
            <div class="uploadDiv">
              <Upload
                :before-upload="handleUpload"
                action=""
                :format="['jpg','jpeg','png']"
                style="display: inline-block" >
                <button class="upImg" :style="{'backgroundColor':positionPrintDone?'rgba(0,0,0,0.2)':'transparent','color':positionPrintDone?'white':'#42beb6'}">
                  <i class="ivu-icon ivu-icon-ios-cloud-upload-outline"></i>
                  <span>{{positionPrintDone?'重新上传':'上传文件'}}</span>
                </button>
              </Upload>
            </div>
          </div>
        </div>

        <div slot="footer">
          <Button class="save" @click="PrintDoneSave()">保存</Button>
        </div>
      </Modal>
    </div>

    <!--字体新增-->
    <div v-if="fontInsertShow">
      <Modal v-model="fontInsertShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('fontInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增刺绣字体</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="fontInsertInfo" class="searchForm" label-position="left" :model="fontInsertInfo" :rules="fontInsertRule" inline style="text-align: left;padding:15px 60px 0">
            <Form-item prop="ecode" label="ecode:" :label-width="90" >
              <Input v-model="fontInsertInfo.ecode" ></Input>
            </Form-item>
            <Form-item prop="name"  label="名称:" :label-width="90" >
              <Input v-model="fontInsertInfo.name"></Input>
            </Form-item>
            <Form-item prop="en"  label="英文名称:" :label-width="90" >
              <Input v-model="fontInsertInfo.en"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="fontInsertSave('fontInsertInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--字体编辑-->
    <div v-if="fontDoneShow">
      <Modal v-model="fontDoneShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('fontDoneInfo')">
        <p slot="header">
          <span class="main-heading">编辑刺绣字体</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="fontDoneInfo" class="searchForm" label-position="left" :model="fontDoneInfo" :rules="fontInsertRule" inline style="text-align: left;padding:15px 60px 0">
            <Form-item prop="ecode" label="ecode:" :label-width="90" >
              <Input v-model="fontDoneInfo.ecode"></Input>
            </Form-item>
            <Form-item prop="name"  label="名称:" :label-width="90" >
            <Input v-model="fontDoneInfo.name"></Input>
            </Form-item>
            <Form-item prop="en"  label="英文名称:" :label-width="90" >
              <Input v-model="fontDoneInfo.en"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="fontDoneSave('fontDoneInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--位置删除-->
    <div v-if="fontDeleteShow">
      <Modal v-model="fontDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="fontDeleteSave">确认</Button>
            <Button  class="clear" @click="fontDeleteShow=false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>

    <!--颜色新增-->
    <div v-if="colorInsertShow">
      <Modal v-model="colorInsertShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('colorInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增刺绣颜色</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="colorInsertInfo" class="searchForm" label-position="left" :model="colorInsertInfo" :rules="colorInsertRule" inline style="text-align: left;padding:15px 60px 0">
            <Form-item prop="ecode" label="ecode:" :label-width="90" >
              <Input v-model="colorInsertInfo.ecode" ></Input>
            </Form-item>
            <Form-item prop="name"  label="名称:" :label-width="90" >
              <Input v-model="colorInsertInfo.name"></Input>
            </Form-item>
            <Form-item prop="en"  label="英文名称:" :label-width="90" >
              <Input v-model="colorInsertInfo.en"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="colorInsertSave('colorInsertInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--颜色编辑-->
    <div v-if="colorDoneShow">
      <Modal v-model="colorDoneShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('colorDoneInfo')">
        <p slot="header">
          <span class="main-heading">编辑刺绣颜色</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="colorDoneInfo" class="searchForm" label-position="left" :model="colorDoneInfo" :rules="colorInsertRule" inline style="text-align: left;padding:15px 60px 0">
            <Form-item prop="ecode" label="ecode:" :label-width="90" >
              <Input v-model="colorDoneInfo.ecode"></Input>
            </Form-item>
            <Form-item prop="name"  label="名称:" :label-width="90" >
              <Input v-model="colorDoneInfo.name"></Input>
            </Form-item>
            <Form-item prop="en"  label="英文名称:" :label-width="90" >
              <Input v-model="colorDoneInfo.en"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="colorDoneSave('colorDoneInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--颜色删除-->
    <div v-if="colorDeleteShow">
      <Modal v-model="colorDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="colorDeleteSave">确认</Button>
            <Button  class="clear" @click="colorDeleteShow=false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>

    <!--图案新增-->
    <div v-if="pictrueInsertShow">
      <Modal v-model="pictrueInsertShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('pictrueInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增刺绣图案</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="pictrueInsertInfo" class="searchForm" label-position="left" :model="pictrueInsertInfo" :rules="pictrueInsertRule" inline style="text-align: left;padding:15px 0 0 85px">
            <Form-item prop="ecode" label="ecode:" :label-width="90" >
              <Input v-model="pictrueInsertInfo.ecode" ></Input>
            </Form-item>
            <Form-item prop="name"  label="名称:" :label-width="90" >
              <Input v-model="pictrueInsertInfo.name"></Input>
            </Form-item>
            <Form-item prop="en"  label="英文名称:" :label-width="90" >
              <Input v-model="pictrueInsertInfo.en"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="pictrueInsertSave('pictrueInsertInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--图案编辑-->
    <div v-if="pictrueDoneShow">
      <Modal v-model="pictrueDoneShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('pictrueDoneInfo')">
        <p slot="header">
          <span class="main-heading">编辑刺绣图案</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="pictrueDoneInfo" class="searchForm" label-position="left" :model="pictrueDoneInfo" :rules="pictrueInsertRule" inline style="text-align: left;padding:15px 60px 0">
            <Form-item prop="ecode" label="ecode:" :label-width="90" >
              <Input v-model="pictrueDoneInfo.ecode"></Input>
            </Form-item>
            <Form-item prop="name"  label="名称:" :label-width="90" >
              <Input v-model="pictrueDoneInfo.name"></Input>
            </Form-item>
            <Form-item prop="en"  label="英文名称:" :label-width="90" >
              <Input v-model="pictrueDoneInfo.en"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="pictrueDoneSave('pictrueDoneInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--图案删除-->
    <div v-if="pictrueDeleteShow">
      <Modal v-model="pictrueDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="pictrueDeleteSave">确认</Button>
            <Button  class="clear" @click="pictrueDeleteShow=false">取消</Button>
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
      const pinLei = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择品类'));
        } else {
          callback();
        }
      };
      const ecode = (rule, value, callback) => {
        if (value === "" || value === null) {
          callback(new Error('请输入ecode'));
        } else {
          if (!/^[0-9A-Za-z]+$/.test(value)) {
            callback(new Error('请输入字母、数字'));
          } else if (value.length > 10) {
            callback(new Error('最多输入10位'));
          } else {
            callback();
          }
        }
      };
      const dictid = (rule, value, callback) => {
        if (value === "" || value === null) {
          callback(new Error('请输入下单系统ID'));
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
        position: (h) => {
          return h('div',{
            class:'embroidDivTags',
          }, [
            h('span',{
              class:'embroidSpanTags',
              on: {
                click: () => {
                  this.positionReady()
                }
              },
            },'刺绣位置'),
          ])
        },
        font: (h) => {
          return h('div',{
            class:'embroidDivTags',
            on: {
              click: () => {
                this.fontReady()
              }
            },
          }, [
            h('span',{
              class:'embroidSpanTags',
              on: {
                click: () => {
                  this.fontReady()
                }
              },
            },'刺绣字体'),
          ])
        },
        color: (h) => {
          return h('div',{
            class:'embroidDivTags',
            on: {
              click: () => {
                this.colorReady()
              }
            },
          }, [
            h('span',{
              class:'embroidSpanTags',
              on: {
                click: () => {
                  this.colorReady()
                }
              },
            },'刺绣颜色'),
          ])
        },
        pictrue: (h) => {
          return h('div',{
            class:'embroidDivTags',
            on: {
              click: () => {
                this.pictrueReady()
              }
            },
          }, [
            h('span',{
              class:'embroidSpanTags',
              on: {
                click: () => {
                  this.pictrueReady()
                }
              },
            },'刺绣图案'),
          ])
        },
        //添加模块变量控制
        whoAdd:'position',
        token:'',
        ///////////////////////////////////////////刺绣///////////////////////////////////////////
        //搜索条件
        positionSearchFrom:{
          pageIndex:1,
          pageSize:10,
          parentid:13,
          category:'EP'
        },
        //品类
        clothType:[],
        //品类默认index
        clothIndex:0,
        //刺绣table
        positionColumns: [
          {
            title: '序号',
            width:'10%',
            type:'index',
            align: 'center',
          },
          {
            title: 'ID',
            width:'10%',
            key: 'id',
            align: 'center',
          },
          {
            title: '名称',
            width:'40%',
            key: 'name',
            align: 'center',
          },
          {
            title: '操作',
            width:'40%',
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
                        this.positionPrint(params.row)
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-bianji',
                    }),

                    h('span',{
                    },'图例')
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
                        this.positionDone(params.row)
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
                        this.positionDeleteInfo=params.row.id
                        this.positionDeleteShow=true;
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
        positionData: [],
        positionTotals:1,
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
        //图片
        file:{
          file :'',
          id:'',
        },
        //编辑
        positionDoneShow:false,
        positionDoneInfo:{},
        positionDoneRule:{
          ecode: [
            { required: true,validator:ecode, trigger: 'blur' },
          ],
          dictid: [
            { required: true,validator:dictid, trigger: 'blur' },
          ],
          name: [
            { required: true,message:'请填写名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'}
          ],
        },
        //新增
        positionInsertShow:false,
        positionInsertInfo:{
          en:'',
          ecode:'',
          dictid:'',
          name:'',
          clothid:'',
          property:'',
          category:'EP',
          parentid:''
        },
        positionInsertRule:{
          dictid: [
            { required: true,validator:dictid, trigger: 'blur' },
          ],
          ecode: [
            { required: true,validator:ecode, trigger: 'blur' },
          ],
          name: [
            { required: true,message:'请填写名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'}
          ],
          en: [
            { max:20,message: '英文名称不能超过20位', trigger: 'blur'}
          ],
          clothid: [
            { required: true,validator:pinLei, trigger: 'change' },
          ],
        },
        //删除
        positionDeleteShow:false,
        positionDeleteInfo:'',
        //图例
        PrintShow:false,
        positionPrintDone:'',
        ///////////////////////////////////字体///////////////////////////////////////
        fontSearchFrom:{
          pageIndex:1,
          pageSize:10,
          category:'EF'
        },
        fontTotals:1,
        fontData:[],
        fontColumns:[
          {
            title: '序号',
            width:'5%',
            type:'index',
            align: 'center',
          },
          {
            title: 'ecode',
            width:'10%',
            key: 'ecode',
            align: 'center',
          },
          {
            title: '名称',
            width:'50%',
            key: 'name',
            align: 'center',
          },
          {
            title: '操作',
            width:'20%',
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
                        this.positionPrint(params.row)
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-bianji',
                    }),

                    h('span',{
                    },'图例')
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
                        this.fontDone(params.row)
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
                        this.fontDeleteInfo=params.row.id
                        this.fontDeleteShow=true;
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
        //新增
        fontInsertShow:false,
        fontInsertInfo:{
          ecode:'',
          en:'',
          name:'',
          category:'EF',

        },
        fontInsertRule:{
          ecode: [
            { required: true,validator:ecode, trigger: 'blur' },
          ],
          name: [
            { required: true,message:'请填写名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'}
          ],
          en: [
            { required: true,message:'请填写英文名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'}
          ],
        },
        //编辑
        fontDoneShow:false,
        fontDoneInfo:{},
        //删除
        fontDeleteShow:false,
        fontDeleteInfo:'',

        ///////////////////////////////////颜色///////////////////////////////////////
        colorSearchFrom:{
          pageIndex:1,
          pageSize:10,
          category:'EC'
        },
        colorTotals:1,
        colorData:[],
        colorColumns:[
          {
            title: '序号',
            width:'5%',
            type:'index',
            align: 'center',
          },
          {
            title: 'ecode',
            width:'10%',
            key: 'ecode',
            align: 'center',
          },
          {
            title: '名称',
            width:'50%',
            key: 'name',
            align: 'center',
          },
          {
            title: '操作',
            width:'20%',
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
                        this.positionPrint(params.row)
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-bianji',
                    }),

                    h('span',{
                    },'图例')
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
                        this.colorDone(params.row)
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
                        this.colorDeleteInfo=params.row.id
                        this.colorDeleteShow=true;
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
        //新增
        colorInsertShow:false,
        colorInsertInfo:{
          ecode:'',
          en:'',
          name:'',
          category:'EC',
        },
        colorInsertRule:{
          ecode: [
            { required: true,validator:ecode, trigger: 'blur' },
          ],
          name: [
            { required: true,message:'请填写名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'}
          ],
          en: [
            { required: true,message:'请填写英文名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'}
          ],
        },
        //编辑
        colorDoneShow:false,
        colorDoneInfo:{},
        //删除
        colorDeleteShow:false,
        colorDeleteInfo:'',

        ///////////////////////////////////图案///////////////////////////////////////
        pictrueSearchFrom:{
          pageIndex:1,
          pageSize:10,
          category:'EI'
        },
        pictrueTotals:1,
        pictrueData:[],
        pictrueColumns:[
          {
            title: '序号',
            width:'5%',
            type:'index',
            align: 'center',
          },
          {
            title: 'ecode',
            width:'10%',
            key: 'ecode',
            align: 'center',
          },
          {
            title: '名称',
            width:'50%',
            key: 'name',
            align: 'center',
          },
          {
            title: '操作',
            width:'20%',
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
                        this.positionPrint(params.row)
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-bianji',
                    }),

                    h('span',{
                    },'图例')
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
                        this.pictrueDone(params.row)
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
                        this.pictrueDeleteInfo=params.row.id
                        this.pictrueDeleteShow=true;
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
        //新增
        pictrueInsertShow:false,
        pictrueInsertInfo:{
          ecode:'',
          en:'',
          name:'',
          category:'EI',
        },
        pictrueInsertRule:{
          ecode: [
            { required: true,validator:ecode, trigger: 'blur' },
          ],
          name: [
            { required: true,message:'请填写名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'}
          ],
          en: [
            { required: true,message:'请填写英文名称', trigger: 'blur' },
            { max:20,message: '名称不能超过20位', trigger: 'blur'}
          ],
        },
        //编辑
        pictrueDoneShow:false,
        pictrueDoneInfo:{},
        //删除
        pictrueDeleteShow:false,
        pictrueDeleteInfo:'',
      }
    },
    mounted(){
      //设置高的样式
      this.screenDivSize()
      //获取品类列表
      this.getClothType()
      //获取位置列表
      this.positionReady()
      this.token=sessionStorage.getItem('token')
    },
    methods: {
      aaa(row){
        console.log(row);
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
      positionReady(){
        this.whoAdd='position';
        this.$http.get( '/dictlist',{params:this.positionSearchFrom}).then(res=>{
          this.positionData=res.data.data
          this.positionTotals=res.data.total
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
      //位置编辑
      positionDone(row){
        this.positionDoneShow=true;
        this.positionDoneInfo=JSON.parse(JSON.stringify(row))
      },
      positionDoneSave(name){
        console.log(this.positionDoneInfo);
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.put('/dict',this.positionDoneInfo).then(res=>{
              this.positionDoneShow=false;
              this.positionReady();
              this.$Message.success('修改成功');
            })
          }
        })
      },
      //位置新增
      positionInsertSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/dict',this.positionInsertInfo).then(res=>{
              this.positionInsertShow=false;
              this.positionReady();
              this.cancels(name)
              this.$Message.success('新增成功');
            })
          }
        })
      },
      //删除
      positionDeleteSave(){
        this.$http.delete('/dict/'+this.positionDeleteInfo).then(res=>{
          this.positionDeleteShow=false;
          this.positionReady();
          this.$Message.success('删除成功');
        })
      },
      //获取品类大全
      getClothType(){
        this.$http.get('/dict/category',{params:{
          category:'P',
          parentid:0,
        }}).then(res=>{
          this.clothType=res.data;
          this.positionInsertInfo.parentid=res.data[0].id
        })
      },
      //位置品类变化
      chooseCloth(index,item){
        this.clothIndex=index;
        this.positionSearchFrom.parentid=item.id;
        this.positionInsertInfo.parentid=item.id
        this.positionReady()
      },
      //位置页码变化
      positionPage(data){
        this.positionSearchFrom.pageIndex=data
        this.positionReady();
      },
      positionSize(data){
        this.positionSearchFrom.pageSize=data
        this.positionReady();
      },
      //位置图例
      positionPrint(row){
        this.positionPrintDone=''
        this.$http.get('/image/'+row.id).then(res=>{
          if(res.data.filepath){
            this.positionPrintDone=this.$http.defaults.baseURL+res.data.filepath;
          }
          this.PrintShow=true;
          this.file.id=row.id;
          this.file.file='';
        });
      },
      //手动提交
      handleUpload(file){
        var type= this.formatFlag(file.name)
        if(type){
          this.file.file=file;
          let r = new FileReader();  //本地预览
          var that=this;
          r.onload = function(){
            that.positionPrintDone=r.result
          }
          r.readAsDataURL(file);
        }else{
          this.$Message.error('图片格式错误');
        }
        return false;
      },
      //判断上传文件格式(图片)
      formatFlag(filename){
        var index = filename.lastIndexOf(".");
        var type=filename.substring(index+1,filename.length)
        if(type==='png'||type==='jpeg'||type==='bmp'||type==='jpg' ){
          return true
        }else{
          return false
        }
      },
      PrintDoneSave(){
        let data=new FormData(this.file.file)
        data.append('file', this.file.file)
        data.append('id', this.file.id)
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        if(this.file.file){
          this.$http.post('/dict/image',data,config).then(res=>{
            this.$Message.success('上传成功');
            this.PrintShow=false
            //this.positionPrintDone=this.file.file;
          });
        }else {
          if(this.positionPrintDone){
            this.$Message.success('保存成功');
            this.PrintShow=false
          }else{
            this.$Message.error('请选择图片');
          }
        }

      },
      //////////////////////////////字体////////////////////////////////
      fontReady(){
        this.whoAdd='font';
        this.$refs.fontTotals.pageReset(this.fontSearchFrom.pageSize,this.fontSearchFrom.pageIndex);
        this.$http.get( '/dictlist',{params:this.fontSearchFrom}).then(res=>{
          this.fontData=res.data.data
          this.fontTotals=res.data.total
        })
      },
      //页码
      fontPage(data){
        this.fontSearchFrom.pageIndex=data.pageIndex;
        this.fontSearchFrom.pageSize=data.pageSize;
        this.fontReady();
      },
      //新增保存
      fontInsertSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/dict',this.fontInsertInfo).then(res=>{
              this.fontInsertShow=false;
              this.fontReady();
              this.cancels(name)
              this.$Message.success('新增成功');
            })
          }
        })
      },
      //编辑
      fontDone(row){
        this.fontDoneShow=true;
        this.fontDoneInfo=JSON.parse(JSON.stringify(row))
      },
      //编辑保存
      fontDoneSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.put('/dict',this.fontDoneInfo).then(res=>{
              this.fontDoneShow=false;
              this.fontReady();
              this.cancels(name)
              this.$Message.success('修改成功');
            })
          }
        })
      },
      //确认删除
      fontDeleteSave(){
        this.$http.delete('/dict/'+this.fontDeleteInfo).then(res=>{
          this.fontDeleteShow=false;
          this.fontReady();
          this.$Message.success('删除成功');
        })
      },

      //////////////////////////////颜色////////////////////////////////
      colorReady(){
        this.whoAdd='color';
        this.$refs.colorTotals.pageReset(this.colorSearchFrom.pageSize,this.colorSearchFrom.pageIndex);
        this.$http.get( '/dictlist',{params:this.colorSearchFrom}).then(res=>{
          this.colorData=res.data.data
          this.colorTotals=res.data.total
        })
      },
      //页码
      colorPage(data){
        this.colorSearchFrom.pageIndex=data.pageIndex;
        this.colorSearchFrom.pageSize=data.pageSize;
        this.colorReady();
      },
      //新增保存
      colorInsertSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/dict',this.colorInsertInfo).then(res=>{
              this.colorInsertShow=false;
              this.colorReady();
              this.cancels(name)
              this.$Message.success('新增成功');
            })
          }
        })
      },
      //编辑
      colorDone(row){
        this.colorDoneShow=true;
        this.colorDoneInfo=JSON.parse(JSON.stringify(row))
      },
      //编辑保存
      colorDoneSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.put('/dict',this.colorDoneInfo).then(res=>{
              this.colorDoneShow=false;
              this.colorReady();
              this.cancels(name)
              this.$Message.success('修改成功');
            })
          }
        })
      },
      //确认删除
      colorDeleteSave(){
        this.$http.delete('/dict/'+this.colorDeleteInfo).then(res=>{
          this.colorDeleteShow=false;
          this.colorReady();
          this.$Message.success('删除成功');
        })
      },

      //////////////////////////////图案////////////////////////////////
      pictrueReady(){
        this.whoAdd='pictrue';
        this.$refs.pictrueTotals.pageReset(this.pictrueSearchFrom.pageSize,this.pictrueSearchFrom.pageIndex);
        this.$http.get( '/dictlist',{params:this.pictrueSearchFrom}).then(res=>{
          this.pictrueData=res.data.data
          this.pictrueTotals=res.data.total
        })
      },
      //页码
      pictruePage(data){
        this.pictrueSearchFrom.pageIndex=data.pageIndex;
        this.pictrueSearchFrom.pageSize=data.pageSize;
        this.pictrueReady();
      },
      //新增保存
      pictrueInsertSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/dict',this.pictrueInsertInfo).then(res=>{
              this.pictrueInsertShow=false;
              this.pictrueReady();
              this.cancels(name)
              this.$Message.success('新增成功');
            })
          }
        })
      },
      //编辑
      pictrueDone(row){
        this.pictrueDoneShow=true;
        this.pictrueDoneInfo=JSON.parse(JSON.stringify(row))
      },
      //编辑保存
      pictrueDoneSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.put('/dict',this.pictrueDoneInfo).then(res=>{
              this.pictrueDoneShow=false;
              this.pictrueReady();
              this.cancels(name)
              this.$Message.success('修改成功');
            })
          }
        })
      },
      //确认删除
      pictrueDeleteSave(){
        this.$http.delete('/dict/'+this.pictrueDeleteInfo).then(res=>{
          this.pictrueDeleteShow=false;
          this.pictrueReady();
          this.$Message.success('删除成功');
        })
      }
    },
  }
</script>
<style lang="scss" scoped>
  #screenDiv{
    .tabDiv{
      height: 100%;
      .left{
        float: left;
        height: 97%;
        width: 300px;
        border: 1px solid #dddddd;
        margin-right: 10px;
        /*品类表头*/
        .name{
          border: 1px solid #dddddd;
          border-left: none;
          border-right: none;
          height:34px;
          line-height: 34px;
          text-align: center;
          background-color:#f8f8f9 ;
        }
        /*品类中的选项*/
        li{
          height:40px;
          line-height: 40px;
          text-align: center;
          cursor:pointer;
          border-bottom: 1px solid #dddddd;
        }
      }
      .right{
        float: left;
        height:97%;
        width: calc(100% - 310px);
        border: 1px solid #dddddd;
        .tabTable{
          height: calc(100% - 40px);
          overflow-y: auto;
        }
        .tabPage{
          padding: 0px 10px;
          background-color: #f8f8f9;
          height:40px;
          line-height: 40px;
          .totals{
            float: left;
            width: 80px;
          }
        }
      }
    }
  }
  /*图例*/
  .pattern{
    width: 300px;
    height: auto;
    min-height: 100px;
    padding-top: 20px;
    margin: 0 auto;
    text-align: center;
    position: relative;
  }
  /*上传设置*/
  .uploadDiv{
    width: 100%;
    height: 65px;
    margin: 0 auto;
    text-align: center;
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



