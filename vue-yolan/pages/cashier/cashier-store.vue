<template>
  <div class="info-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>收银管理 /</span>
          <span>门店维护</span>
        </span>
        <span slot="footer" class="com-slot-right">
           <span class="T3 main-heading" @click="tableAddShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>新增门店维护</span></span>
        </span>

      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline>
          <Form-item label="编码" :label-width="75" class="specialCase">
            <Input v-model="searchForm.code" @on-enter="search"></Input>
          </Form-item>
          <Form-item label="名称" :label-width="75" class="specialCase">
            <Input v-model="searchForm.name" @on-enter="search"></Input>
          </Form-item>
          <Form-item label="门店类型" :label-width="65" class="specialCase" >
            <Select v-model.trim="searchForm.type">
              <Option :value="' '">全部</Option>
              <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
      <!--新增-->
      <div v-if="tableAddShow">
        <Modal v-model="tableAddShow" class-name="delect entrepot" :mask-closable=false  width="800" v-drag @on-cancel="cancels('tableAddInfo')">
          <p slot="header">
            <span class="main-heading">新增门店信息</span>
          </p>
          <Form ref="tableAddInfo" class="searchForm key-input" label-position="left" :model="tableAddInfo" :rules="tableAddRule" inline style="text-align: left;padding:15px 30px">
            <Row>
              <i-col span="7">
                <Form-item prop="code"  label="门店编码:" :label-width="70" >
                  <Input v-model="tableAddInfo.code"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="name" label="门店名称:" :label-width="70" >
                  <Input v-model="tableAddInfo.name"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="type"  label="门店类型:" :label-width="70" >
                  <Select v-model="tableAddInfo.type">
                    <Option v-for="(item,index) in typeList" :value="item.id" :key="index">{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </i-col>
              <i-col span="7">
                <Form-item prop="province" label=" 省:" :label-width="70" >
                  <Input v-model="tableAddInfo.province"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="city"  label="市:" :label-width="70" >
                  <Input v-model="tableAddInfo.city"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="area"  label="县:" :label-width="70" >
                  <Input v-model="tableAddInfo.area"></Input>
                </Form-item>
              </i-col>
              <i-col span="15">
                <Form-item prop="address"  label="详细地址:" :label-width="70" >
                  <Input v-model="tableAddInfo.address"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="code1"  label="SAP工厂编码:" :label-width="95" >
                  <Input v-model="tableAddInfo.code1"></Input>
                </Form-item>
              </i-col>
              <i-col span="7">
                <Form-item prop="leader"  label="负责人:" :label-width="70" >
                  <Input v-model="tableAddInfo.leader"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="leaderTel" class="phone" label="负责人电话:" :label-width="90" >
                  <Input v-model="tableAddInfo.leaderTel"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="brand"  label="门店品牌:" :label-width="70" >
                  <Select v-model="tableAddInfo.brand">
                    <Option v-for="(item,index) in brandList" :value="item.id" :key="index">{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </i-col>
              <i-col span="7">
                <Form-item prop="consignee"  label="收货人:" :label-width="70" >
                  <Input v-model="tableAddInfo.consignee"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="consigneeTel" class="phone" label="收货人电话:" :label-width="90" >
                  <Input v-model="tableAddInfo.consigneeTel"></Input>
                </Form-item>
              </i-col>
              <!--<i-col span="7" offset="1">
                <Form-item prop="beginTime"  label="营业时间(始):" :label-width="90" >
                  <DatePicker type="date" placeholder="" v-model="tableAddInfo.beginTime"></DatePicker>
                </Form-item>
              </i-col>
              <i-col span="7">
                <Form-item prop="endTime"  label="营业时间(止):" :label-width="90" >
                  <DatePicker type="date" placeholder="" v-model="tableAddInfo.endTime"></DatePicker>
                </Form-item>
              </i-col>-->
              <i-col span="7" offset="1">
                <Form-item prop="startDate"  label="有效日期(始):" :label-width="95" >
                  <DatePicker type="date" v-model="tableAddInfo.startDate"></DatePicker>
                </Form-item>
              </i-col>
              <i-col span="7">
                <Form-item prop="endDate"  label="有效日期(止):" :label-width="95" >
                  <DatePicker type="date" v-model="tableAddInfo.endDate"  :options="tableAddInfoOption"></DatePicker>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
              <Form-item prop="status"  label="状态:" :label-width="70" >
                <div class="optionStatus">
                  <Radio-group v-model="tableAddInfo.status">
                    <Radio label='0'>启用</Radio>
                    <Radio label='1'>禁用</Radio>
                  </Radio-group>
                </div>
              </Form-item>
              </i-col>
            </Row>
          </Form>
          <div slot="footer">
            <Button class="save" @click="tableAddSave('tableAddInfo')">保存</Button>
          </div>
        </Modal>
      </div>
      <!--编辑-->
      <div v-if="tableEditShow">
        <Modal v-model="tableEditShow" class-name="delect entrepot" :mask-closable=false  width="800" v-drag @on-cancel="cancels('tableEditInfo')">
          <p slot="header">
            <span class="main-heading">编辑门店信息</span>
          </p>
          <Form ref="tableEditInfo" class="searchForm key-input" label-position="left" :model="tableEditInfo" :rules="tableAddRule" inline style="text-align: left;padding:15px 30px">
            <Row>
              <i-col span="7">
                <Form-item prop="code"  label="门店编码:" :label-width="70" >
                  <Input v-model="tableEditInfo.code"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
              <Form-item prop="name" label="门店名称:" :label-width="70" >
                <Input v-model="tableEditInfo.name"></Input>
              </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="type"  label="门店类型:" :label-width="70" >
                  <Select v-model="tableEditInfo.type">
                    <Option v-for="(item,index) in typeList" :value="item.id" :key="index">{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </i-col>
              <i-col span="7">
                <Form-item prop="province" label=" 省:" :label-width="70" >
                  <Input v-model="tableEditInfo.province"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="city"  label="市:" :label-width="70" >
                  <Input v-model="tableEditInfo.city"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="area"  label="县:" :label-width="70" >
                  <Input v-model="tableEditInfo.area"></Input>
                </Form-item>
              </i-col>
              <i-col span="15">
                <Form-item prop="address"  label="详细地址:" :label-width="70" >
                  <Input v-model="tableEditInfo.address"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="code1"  label="SAP工厂编码:" :label-width="90" >
                  <Input v-model="tableEditInfo.code1"></Input>
                </Form-item>
              </i-col>
              <i-col span="7">
                <Form-item prop="leader"  label="负责人:" :label-width="70" >
                  <Input v-model="tableEditInfo.leader"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="leaderTel" class="phone" label="负责人电话:" :label-width="90" >
                  <Input v-model="tableEditInfo.leaderTel"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="brand"  label="门店品牌:" :label-width="70" >
                  <Select v-model="tableEditInfo.brand">
                    <Option v-for="(item,index) in brandList" :value="item.id" :key="index">{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </i-col>
              <i-col span="7">
                <Form-item prop="consignee"  label="收货人:" :label-width="60" >
                  <Input v-model="tableEditInfo.consignee"></Input>
                </Form-item>
              </i-col>
              <i-col span="7" offset="1">
                <Form-item prop="consigneeTel" class="phone" label="收货人电话:" :label-width="90" >
                  <Input v-model="tableEditInfo.consigneeTel"></Input>
                </Form-item>
              </i-col>
              <!--<i-col span="7" offset="1">
                <Form-item prop="beginTime"  label="营业时间(始):" :label-width="90" >
                  <DatePicker type="date" placeholder="" v-model="tableAddInfo.beginTime"></DatePicker>
                </Form-item>
              </i-col>
              <i-col span="7">
                <Form-item prop="endTime"  label="营业时间(止):" :label-width="90" >
                  <DatePicker type="date" placeholder="" v-model="tableAddInfo.endTime"></DatePicker>
                </Form-item>
              </i-col>-->
              <i-col span="7" offset="1">
                <Form-item prop="startDate"  label="有效日期(始):" :label-width="90" >
                  <DatePicker type="date" placeholder="" v-model="tableEditInfo.startDate"></DatePicker>
                </Form-item>
              </i-col>
              <i-col span="7">
                <Form-item prop="endDate"  label="有效日期(止):" :label-width="90" >
                  <DatePicker type="date" v-model="tableEditInfo.endDate"  :options="tableEditInfoOption"></DatePicker>
                </Form-item>
              </i-col>
              <i-col span="15" offset="1">
                <Form-item prop="status"  label="状态:" :label-width="70" >
                  <div class="optionStatus">
                    <Radio-group v-model="tableEditInfo.status">
                      <Radio label='0'>启用</Radio>
                      <Radio label='1'>禁用</Radio>
                    </Radio-group>
                  </div>
                </Form-item>
              </i-col>
            </Row>
          </Form>
          <div slot="footer">
            <Button class="save" @click="tableEditSave('tableEditInfo')">保存</Button>
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
  </div>
</template>
<script>
  export default {
    data () {
      const code = (rule, value, callback) => {
        if (value === "" || value === null) {
          callback(new Error('请输入门店代码'));
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
      const phone = (rule, value, callback) => {
        if (value === "" || value === null) {
          callback(new Error('请输入联系电话'));
        } else {
          if (!/^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/.test(value)) {
            callback(new Error('联系电话格式不正确'));
          } else {
            callback();
          }
        }
      };
      return {
        totals: 1,
        //门店类型
        typeList: [],
        //门店品牌
        brandList: [],
        searchForm: {     //搜索条件
          code: "",
          name: "",
          type:' ',
          pageIndex: 1,
          pageSize: 10,
        },
        //新增
        tableAddShow: false,
        tableAddInfo: {
          status:'0',
          name: "",
          tel: "",
          type: "",
          province: "",
          city: "",
          area: "",
          address: "",
          code: "",
          leader: "",
          leaderTel: "",
          brand: "",
          consignee: "",
          consigneeTel: "",
          startDate: "",
          endDate: "",
        },
        tableAddRule: {
          province:[
            {max:10,message: '省不能大于10位',trigger: 'blur'}
          ],
          city:[
            {max:10,message: '市不能大于10位',trigger: 'blur'}
          ],
          area:[
            {max:10,message: '区不能大于10位',trigger: 'blur'}
          ],
          address:[
            {max:100,message: '详细地址不能大于100位',trigger: 'blur'}
          ],
          code:[
            {required: true, validator:code, trigger: 'blur' }
          ],
          name:[
            {required: true, message: '门店名称不能为空', trigger: 'blur' },
            {max:50,message: '门店名称不能大于50位',trigger: 'blur'}
          ],
          leader:[
            {required: true, message: '负责人不能为空', trigger: 'blur' },
            {max:10,message: '负责人不能大于10位',trigger: 'blur'}
          ],
          leaderTel:[
            {required: true, validator:phone,trigger: 'blur'},
            { max:20,message: '负责人电话不能超过20位', trigger: 'blur'}
          ],
          consignee:[
            {required: true, message: '收货人不能为空', trigger: 'blur' },
            {max:10,message: '收货人不能大于10位',trigger: 'blur'}
          ],
          consigneeTel:[
            {required: true, validator:phone,trigger: 'blur'},
            { max:20,message: '收货人电话不能超过20位', trigger: 'blur'}
          ],
        },
        /*编辑*/
        tableEditShow: false,
        tableEditInfo: {
          name: "",
          tel: "",
          type: "",
          province: "",
          city: "",
          area: "",
          address: "",
          code: "",
          leader: "",
          leaderTel: "",
          brand: "",
          consignee: "",
          consigneeTel: "",
          startDate: "",
          endDate: "",
        },
        //结束日期
        tableEditInfoOption: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        tableAddInfoOption: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        tableEditRule: {
          code:[
            {required: true, message: '门店编码不能为空', trigger: 'blur' }
          ],
          name:[
            {required: true, message: '门店名称不能为空', trigger: 'blur' }
          ],
          leader:[
            {required: true, message: '负责人不能为空', trigger: 'blur' }
          ],
          leaderTel:[
            {required: true,validator:this.$validate(true,'number','负责人电话',20), trigger: 'blur' }
          ],
          consignee:[
            {required: true, message: '收货人不能为空', trigger: 'blur' }
          ],
          consigneeTel:[
            {required: true,validator:this.$validate(true,'number','收货人电话',20), trigger: 'blur' }
          ],
        },
        /*删除*/
        tableDeleteShow: false,
        /*表格数据*/
        columns: [
          {
            title: '序号',
            width: '10%',
            type: 'index',
            align: 'center',
          },
          {
            title: '编码',
            width: '20%',
            key: 'code',
            align: 'center',
          },
          {
            title: '名称',
            width: '15%',
            key: 'name',
            align: 'center',
          },
          {
            title: '门店类型',
            width: '15%',
            key: 'typename',
            align: 'center',
          },
          {
            title: '负责人',
            width: '15%',
            key: 'leader',
            align: 'center',
          },
          {
            title: '负责人电话',
            width: '15%',
            key: 'leaderTel',
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
            width: '20%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    class: 'greenButton ',
                    style: {
                      marginLeft: '8px',
                      background: "#fff",
                    },
                    on: {
                      click: () => {
                        this.tableDone(params.row);
                      }
                    }
                  },
                  [
                    h('i', {
                      class: 'iconfont  icon-bianji',
                    }),

                    h('span', {}, '编辑')
                  ]
                ),
//                h('Button', {
//                    class: 'redButton',
//                    style: {
//                      marginLeft: '8px',
//                      background: "transparent",
//                    },
//                    on: {
//                      click: () => {
//                        this.tableDeleteInfo = params.row.id
//                        this.tableDeleteShow = true;
//                      }
//                    }
//                  },
//                  [
//                    h('i', {
//                      class: 'iconfont icon-qingkong',
//                    }),
//
//                    h('span', {}, '删除')
//                  ]
//                )
              ]);
            }
          }
        ],
        data: [],
      }
    },

    mounted() {
      this.ready();
      this.searchtype();
      this.searchbrand();
    },
    methods: {
      ready () {
        this.$http.get('/stores', {params: this.searchForm}).then(res => {
          this.data = res.data.data;
          this.totals = res.data.total;
        })
      },
      setDate(date){
        if(date!==''&&date!==null){
          let year=new Date(date).getFullYear();
          let month=new Date(date).getMonth()+1;
          month<10?month='0'+month:month;
          let day=new Date(date).getDate();
          day<10?day='0'+day:day;
          return year+'-'+month+'-'+day
        }
      },
      getTime(data){
        if(data!=''&&data!=null){
          return data.getTime()
        }else{
          return 0
        }
      },
      //给门店类型赋值
      searchtype () {
        this.$http.get('/storetype').then(res => {
          this.typeList = res.data;
          this.tableAddInfo.type = res.data[0].id
        })
      },
      //给门店品牌赋值

      searchbrand () {
        this.$http.get('/storebrand').then(res => {
          this.brandList = res.data;
          this.tableAddInfo.brand = res.data[0].id
        })
      },


      pageListen (data) {
        this.searchForm.pageIndex = data.pageIndex;
        this.searchForm.pageSize = data.pageSize;
        this.ready();
      },
      search () {
        this.searchForm.pageIndex = 1;
        this.$refs.pages.pageReset(this.searchForm.pageSize, this.searchForm.pageIndex);
        this.ready()
      },
      //新增保存
      tableAddSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.tableAddInfo.endDate){
              if(this.getTime(this.tableAddInfo.endDate)<this.getTime(this.tableAddInfo.startDate)){
                this.$Message.error('日期范围有误')
                return
              }
            }
            this.tableAddInfo.startDate=this.setDate(this.tableAddInfo.startDate);
            this.tableAddInfo.endDate=this.setDate(this.tableAddInfo.endDate);
            if(this.tableAddInfo.endDate == null){
              this.tableAddInfo.endDate = null;
            }else if(this.tableAddInfo.startDate == null){
              this.tableAddInfo.startDate = null;
            }
            this.$http.post('/store', this.tableAddInfo).then(res => {
              this.tableAddShow = false;
              this.search();
              this.$refs[name].resetFields();
              this.$Message.success("新增成功!");
            })
          }
        });
      },
      //编辑
      tableDone (row) {
        this.$http.get('/store/'+row.id).then(res => {
          this.tableEditInfo=res.data;
          this.tableEditInfo.type = Number(res.data.type);
          this.tableEditInfo.brand = Number(res.data.brand);
          this.tableEditShow = true;
        })
      },
      //编辑保存
      tableEditSave (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            /*if(this.getTime(this.tableEditInfo.endDate)<this.getTime(this.tableEditInfo.startDate)){
              this.$Message.error('日期范围有误');
              return
            }*/
            this.tableEditInfo.startDate=this.setDate(this.tableEditInfo.startDate);
            this.tableEditInfo.endDate=this.setDate(this.tableEditInfo.endDate);
           if(this.tableEditInfo.endDate == null){
              this.tableEditInfo.endDate = null;
           }else if(this.tableEditInfo.startDate == null){
             this.tableEditInfo.startDate = null
           }
            this.$http.put('/store', this.tableEditInfo).then(res => {
              this.tableEditShow = false;
              this.search();
              this.$refs[name].resetFields();
              this.$Message.success("编辑成功!");
            })
          }
        });
      },
      //叉号删除
      cancels(name){
        this.$refs[name].resetFields();
      },
      /*删除数据*/
      /*删除*/
      tableDeleteInfo () {
        this.tableDeleteShow = true;
      },
      /*确认删除*/
      tableDeleteSave () {
        this.$http.delete('/store/' + this.tableDeleteInfo).then(res => {
          this.tableDeleteShow = false;
          this.search();
          this.$Message.success('删除成功');
        })
      },
      changeStatus(row){
        let data=JSON.parse(JSON.stringify(row));
        data.status==0?data.status=1:data.status=0;
        let storeData = {};
        storeData.id = data.id;
        storeData.status = data.status;
        this.$http.put('/store/status', storeData).then(res => {
          this.$Message.success("更改成功!");
          row.status==0?row.status=1:row.status=0
        })
      },
    },
  }
</script>
<style scoped>
  .key-input .ivu-form-item{
    width:100%;
  }
  .key-input .ivu-date-picker{
    line-height: 31px;
  }

</style>
<style lang="scss">
  .key-input .ivu-form-item-error-tip{
    position: absolute;
    left: 140px !important;
  }
  .phone .ivu-form-item-error-tip{
    position: absolute;
    left: 120px;
  }
</style>




