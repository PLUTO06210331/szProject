<template>
  <div class="craft spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
          <span>档案管理 /</span>
          <span>工艺</span>
        </span>
        <span slot="footer" class="com-slot-right">
           <span class="T3 main-heading" @click="parentType"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>新增品类</span></span>
        </span>
        <span slot="footer" class="com-slot-right">
           <span class="T3 main-heading" @click="outPut"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="arrow-down-a" style="margin-left: 5px"></Icon></span>导出模板</span></span>
        </span>
        <span slot="footer" class="com-slot-right craftUpLoad">
          <Upload  style="display: inline-block" :on-format-error="handleFormatError" :on-success="handleFormatSuccess" :on-progress="handleFormatLoading" :on-error="uploadErrorimport" :headers="{'Authorization':this.Authorization}"  :format="['xls','xlsx']" :action="$http.defaults.baseURL+'/dict/doUpload'">
            <Button class="uploadButton" type="ghost" icon="ios-cloud-upload-outline" >
              <span class="colorBox colorBoxOrange" style="margin-left: -6px"><Icon type="arrow-up-a" style="margin-right: 4px"></Icon></span>
              导入Excel
            </Button>
          </Upload>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" style="height:60px;" label-position="left" inline>
           <Form-item label="关键词" :label-width="60" class="specialCase">
            <Input v-model="searchFrom.keyword" @on-enter="search"></Input>
             <input type="text" style="display: none">
          </Form-item>
          <Form-item class="specialHandling .specialHandling">
            <Button icon="search" @click="search"></Button>
          </Form-item>
        </Form>
        <div style="clear: both"></div>
        <div id="tableBox" ref="tableBox" style="float: left;width: calc(100% - 450px);">
          <!-- <Tree :animated="false" @on-toggle-expand="expandTree" :load-data="loadTree" :data="tree"  :render="renderContent"></Tree> -->
          <ul id='zTree' class='ztree'></ul>
        </div>
        <!--新增-->
        <div v-if="addTreeShow" class="delect entrepot" style="width: 450px;float: right;padding-left:20px ">
           <Form ref="addTreeInfo" :model="addTreeInfo" :rules="treeRlue" class="searchForm" label-position="left" inline style="text-align: left;padding:15px 60px 0">
              <Form-item label="父级下单ID:" :label-width="100" >
                <Input v-model="addTreeInfo.parentid" :disabled="true"></Input>
              </Form-item>
              <!--<Form-item label="父级工艺名称:" :label-width="100" >-->
              <!--<Input v-model="addTreeInfo.name" :disabled="true"></Input>-->
              <!--</Form-item>-->
             <Form-item prop="type" label="类型:" :label-width="100" >
               <Select v-model="addTreeInfo.type">
                 <Option :value="'0'">款式设计</Option>
                 <Option :value="'1'">深度设计里料</Option>
                 <Option :value="'2'">深度设计工艺</Option>
               </Select>
             </Form-item>
            <Form-item prop="status" label="状态:" :label-width="100" >
              <Select v-model="addTreeInfo.status">
                <Option :value="'TEXTCHECKBOX'">TEXTCHECKBOX</Option>
                <Option :value="'CHECKBOX'">CHECKBOX</Option>
                <Option :value="'TEXT'">TEXT</Option>
                <Option :value="'RADIO'">RADIO</Option>
              </Select>
            </Form-item>
              <Form-item prop="dictid" label="下单系统ID:" :label-width="100" >
                <Input v-model="addTreeInfo.dictid"></Input>
              </Form-item>
              <Form-item prop="ecode"  label="ecode:" :label-width="100" >
                <Input v-model="addTreeInfo.ecode"></Input>
              </Form-item>
              <Form-item prop="name" label="名称:" :label-width="100" >
                <Input v-model="addTreeInfo.name"></Input>
              </Form-item>
              <Form-item prop="en"  label="英文名:" :label-width="100" >
                <Input v-model="addTreeInfo.en"></Input>
              </Form-item>
              <div>
               <Button class="save" @click="addTreeSave('addTreeInfo')">新增</Button>
              </div>
            </Form>
        </div>
        <!--编辑-->
        <div v-if="eidtTreeShow" class="delect entrepot" style="width: 450px;float: right;padding-left:20px ">
          <Form ref="editTreeInfo" :model="editTreeInfo" :rules="treeRlue" class="searchForm" label-position="left" inline style="text-align: left;padding:15px 60px 0">
            <Form-item label="父级下单ID:" :label-width="100" >
              <Input v-model="editTreeInfo.parentid" :disabled="true"></Input>
            </Form-item>
            <!--<Form-item label="父级工艺名称:" :label-width="100" >-->
            <!--<Input v-model="addTreeInfo.name" :disabled="true"></Input>-->
            <!--</Form-item>-->
            <Form-item prop="type" label="类型:" :label-width="100" >
              <Select v-model="editTreeInfo.type">
                <Option :value="'0'">款式设计</Option>
                <Option :value="'1'">深度设计里料</Option>
                <Option :value="'2'">深度设计工艺</Option>
              </Select>
            </Form-item>
            <Form-item prop="status" label="状态:" :label-width="100" >
              <Select v-model="editTreeInfo.status">
                <Option :value="'TEXTCHECKBOX'">TEXTCHECKBOX</Option>
                <Option :value="'CHECKBOX'">CHECKBOX</Option>
                <Option :value="'TEXT'">TEXT</Option>
                <Option :value="'RADIO'">RADIO</Option>
              </Select>
            </Form-item>
            <Form-item prop="dictid" label="下单系统ID:" :label-width="100" >
              <Input v-model="editTreeInfo.dictid"></Input>
            </Form-item>
            <Form-item prop="ecode"  label="ecode:" :label-width="100" >
              <Input v-model="editTreeInfo.ecode"></Input>
            </Form-item>
            <Form-item prop="title" label="名称:" :label-width="100" >
              <Input v-model="editTreeInfo.title"></Input>
            </Form-item>
            <Form-item prop="en"  label="英文名:" :label-width="100" >
              <Input v-model="editTreeInfo.en"></Input>
            </Form-item>
            <div>
              <Button class="save" @click="eidtTreeSave('editTreeInfo')">修改</Button>
            </div>
          </Form>
        </div>
        <!--删除-->
        <div v-if="deleteTreeShow">
          <Modal v-model="deleteTreeShow" class-name="deleteModel" :mask-closable=false width="600" v-drag>
            <p slot="header" class="main-heading">
              提示框
            </p >
            <div>
              <Icon type="information-circled"></Icon>确认删除此条信息吗？
            </div>
            <div slot="footer">
              <div class="footer">
                <Button class="save" @click="deleteTreeSave">确认</Button>
                <Button class="clear" @click="deleteTreeShow=false">取消</Button>
              </div>
            </div>
          </Modal>
        </div>
        <!--新增-->
        <div v-if="parentTypeShow" class="delect entrepot" style="width: 450px;float: right;padding-left:20px ">
          <Form ref="parentTypeInfo" :model="parentTypeInfo" :rules="treeRlue" class="searchForm" label-position="left" inline style="text-align: left;padding:15px 60px 0">
            <Form-item label="父级下单ID:" :label-width="100" >
              <Input v-model="parentTypeInfo.parentid" :disabled="true"></Input>
            </Form-item>
            <!--<Form-item label="父级工艺名称:" :label-width="100" >-->
            <!--<Input v-model="addTreeInfo.name" :disabled="true"></Input>-->
            <!--</Form-item>-->
            <Form-item prop="type" label="类型:" :label-width="100" >
              <Select v-model="parentTypeInfo.type">
                <Option :value="'0'">款式设计</Option>
                <Option :value="'1'">深度设计里料</Option>
                <Option :value="'2'">深度设计工艺</Option>
              </Select>
            </Form-item>
            <Form-item prop="dictid" label="下单系统ID:" :label-width="100" >
              <Input v-model="parentTypeInfo.dictid"></Input>
            </Form-item>
            <Form-item prop="ecode"  label="ecode:" :label-width="100" >
              <Input v-model="parentTypeInfo.ecode"></Input>
            </Form-item>
            <Form-item prop="name" label="名称:" :label-width="100" >
              <Input v-model="parentTypeInfo.name"></Input>
            </Form-item>
            <Form-item prop="en"  label="英文名:" :label-width="100" >
              <Input v-model="parentTypeInfo.en"></Input>
            </Form-item>
            <div>
              <Button class="save" @click="parentTypeSave('parentTypeInfo')">新增</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// import TreeGrid from "../../components/tree/tree.vue";// 这个没用
import HeaderSlot from "../../components/public/head-slot.vue";
import zTree from '../../assets/jquery.ztree.all.min.js';
import '../../assets/zTreeStyle/zTreeStyle.css';
import loadingIcon from '../../assets/zTreeStyle/img/loading.gif';
// let host = 'http://172.16.17.231:8082';
export default {
  name: "craft",
  data() {
    const dictid = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("请输入下单系统ID"));
      } else {
        if (!/^[0-9]*$/.test(value)) {
          callback(new Error("请输入数字"));
        } else if (value.length > 10) {
          callback(new Error("最多输入10位"));
        } else {
          callback();
        }
      }
    };
    const ecode = (rule, value, callback) => {
      //        if (value === "" || value === null) {
      //          callback(new Error('请输入ecode'));
      //        } else {
      if (!/^[0-9A-Za-z]+$/.test(value)) {
        callback(new Error("请输入字母、数字"));
      } else if (value.length > 10) {
        callback(new Error("最多输入10位"));
      } else {
        callback();
      }
    };
    return {
      Authorization: "",
      searchFrom: {
        keyword: ""
      },
      tree: [],
      setting:{
        data:{
          key:{
            name:'title',
            isParent:'expand',

          },
        },
      async:{
          enable: true,
          type:'get',
          url: this.getUrl,
          dataType:"json",
          headers:{
            Authorization:sessionStorage.getItem("token")
          },
        },
        view:{
          addDiyDom:this.addDiyDom
        },
        callback:{
          onClick:this.operation,
          beforeExpand:this.beforeExpand,
          onAsyncSuccess:this.onAsyncSuccess,
        }
      },
      //当前tree数据
      treeData: "",
      //新增
      addTreeShow: false,
      treeRlue: {
        dictid: [{ required: true, validator: dictid, trigger: "blur" }],
        // ecode: [{ validator: ecode, trigger: "blur" }],
        name: [
          { required: true, message: "请输入工艺名称", trigger: "blur" },
          { max: 50, message: "工艺名称最多50位", trigger: "blur" }
        ],
        title: [
          { required: true, message: "请输入工艺名称", trigger: "blur" },
          { max: 50, message: "工艺名称最多50位", trigger: "blur" }
        ],
        en: [
          { required: true, message: "英文名不为空", trigger: "blur" },
          { max: 50, message: "英文名最多50位", trigger: "blur" }
        ]
      },
      addTreeInfo: {
        category: "P",
        parentid: "",
        type: "",
        dictid: "",
        ecode: "",
        name: "",
        en: "",
        status: ""
      },
      //编辑
      eidtTreeShow: false,
      editTreeInfo: {
        category: "P",
        parentid: "",
        title: "",
        dictid: "",
        ecode: "",
        name: "",
        en: "",
        type: "",
        children: "",
        status: ""
      },
      //删除
      deleteTreeShow: false,
      deleteTreeInfo: "",
      deleteRoot: "",
      deleteNode: "",
      //新增第一层
      flag: true,
      parentTypeShow: false,
      parentTypeInfo: {
        category: "P",
        parentid: 0,
        title: "",
        dictid: "",
        ecode: "",
        name: "",
        en: "",
        type: "",
        children: ""
      },
      baseUrl:''
    };
  },
   mounted() {
    this.Authorization = sessionStorage.getItem("token");
    this.baseUrl = sessionStorage.getItem("baseUrl");
    $.fn.zTree.init($("#zTree"), this.setting);
    this.TREE = $.fn.zTree.getZTreeObj('zTree');
  },
  methods: {
    operation(e,id,node){
      if(e.target.innerHTML=='编辑'){
        this.editTree(node)
      }else if(e.target.innerHTML=='添加'){
        this.appendTree(node)
      }else if(e.target.innerHTML=='删除'){
        this.removeTree(node)
      }
    },
    getUrl(treeId,treeNode){
      let url;
      if(treeNode){
        url = `${this.baseUrl}/dict/ztree?parentid=${treeNode.id}&keyword=${this.searchFrom.keyword}`;
      }else{
        url = `${this.baseUrl}/dict/ztree?keyword=${this.searchFrom.keyword}`;
      }
      return url;
    },
    addDiyDom(treeId,treeNode){
      var spaceWidth = 15;
        var liObj = $("#" + treeNode.tId);
        var aObj = $("#" + treeNode.tId + "_a");
        var switchObj = $("#" + treeNode.tId + "_switch");
        var icoObj = $("#" + treeNode.tId + "_ico");
        var spanObj = $("#" + treeNode.tId + "_span");
        aObj.attr('title', '');
        aObj.append('<div class="diy swich"></div>');
        var div = $(liObj).find('div').eq(0);
        switchObj.remove();
        spanObj.remove();
        icoObj.remove();
        div.append(switchObj);
        div.append(icoObj);
        div.append("<span>"+treeNode.id+"</span>");
        var editStr = '';
        editStr += '<div class="diy">'+ treeNode.title +'</div>';
        editStr += '<div class="diy">' + (treeNode.type=='0'?'款式设计':treeNode.type==1?'深度设计里料':treeNode.type==2?'深度设计工艺':'') + '</div>';
        editStr += '<div class="diy">'+ (treeNode.ecode?treeNode.ecode:'') +'</div>';
        editStr += '<div class="diy">' + (treeNode.status?treeNode.status:'') + '</div>';
        editStr += '<div class="diy">' + this.formatHandle(treeNode) + '</div>';
        aObj.append(editStr);

    },
    formatHandle(treeNode){
      var htmlStr =`
        <div class="icon_div">
          <a class="icon_view" title="添加"  href="javascript:void(0)">
            <i class='ivu-icon ivu-icon-plus-round'></i>
            <span>添加</span>
          </a>
        </div>
        <div class="icon_div">
          <a class="icon_edit" title="修改" href="javascript:void(0)">
            <i class='ivu-icon ivu-icon-edit'></i>
            <span>编辑</span>
          </a>
        </div>
        <div class="icon_div">
          <a class="icon_del" title="删除" href="javascript:void(0)">
            <i class='ivu-icon ivu-icon-ios-trash-outline'></i>
            <span>删除</span>
          </a>
        </div> `;
        return htmlStr;
    },
    beforeExpand(id,node){
      console.log(node)
      node.icon = loadingIcon;
      this.TREE.updateNode(node);
      this.TREE.reAsyncChildNodes(node, "refresh",true);
      return true;
    },
    onAsyncSuccess(e,id,node,msg){
      if(node){
        node.icon = '';
        this.TREE.updateNode(node);
      }

    },
    cancels(name) {
      if (this.$refs[name]) {
        this.$refs[name].resetFields();
      }
    },
    search() {
      let that = this;
      $.ajax({
        type:'get',
        url: `${this.baseUrl}/dict/ztree`,
        dataType:"json",
        headers:{
          Authorization:sessionStorage.getItem("token")
        },
        data:{
          keyword:that.searchFrom.keyword,
        },
        success:function(res){
          that.tree = res;
          that.TREE = $.fn.zTree.init($("#zTree"), that.setting, that.tree);
          that.TREE.expandAll(true);
        }
      })
    },
    nextTree(id, type) {
      this.$http.get("/dict/ztree", { params: { parentid: id } }).then(res => {
        if (type === "add") {
          this.treeData.children = res.data;
          this.$Message.success("保存成功!");
          this.init();
        } else if (type === "edit") {
          this.treeData.title = this.editTreeInfo.title;
          this.treeData.children = this.editTreeInfo.children;
          this.treeData.parentid = this.editTreeInfo.parentid;
          this.treeData.ecode = this.editTreeInfo.ecode;
          this.treeData.en = this.editTreeInfo.en;
          this.treeData.dictid = this.editTreeInfo.dictid;
          this.treeData.type = this.editTreeInfo.type;
          this.treeData.status = this.editTreeInfo.status;
          this.$Message.success("修改成功!");
          this.init();
        }
        this.addTreeShow = false;
        this.eidtTreeShow = false;
      });
    },
    //展开树
    expandTree(data) {
      if (!data.expand) {
        data.children = [];
      }
    },
    //添加第一层
    parentType() {
      this.cancels("editTreeInfo");
      this.cancels("addTreeInfo");
      this.cancels("parentTypeInfo");
      this.parentTypeShow = true;
      this.eidtTreeShow = false;
      this.addTreeShow = false;
    },
    parentTypeSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http.post("/dict", this.parentTypeInfo).then(res => {
            // this.getTree();
            this.parentTypeShow = false;
            this.$Message.success("新增成功!");
            this.cancels(name);
            this.init();
          });
        }
      });
    },
    //添加树
    appendTree(data) {
      this.cancels("editTreeInfo");
      this.cancels("addTreeInfo");
      this.cancels("parentTypeInfo");
      const children = data.children || [];
      this.eidtTreeShow = false;
      this.parentTypeShow = false;
      this.treeData = data;
      this.addTreeShow = true;
      this.addTreeInfo.parentid = data.id;
    },
    addTreeSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http.post("/dict", this.addTreeInfo).then(res => {
            this.nextTree(this.treeData.id, "add");
            this.addTreeShow = false;
            this.cancels(name);
          });
        }
      });
    },
    //编辑树
    editTree(data) {
      this.cancels("editTreeInfo");
      this.cancels("addTreeInfo");
      this.cancels("parentTypeInfo");
      this.addTreeShow = false;
      this.parentTypeShow = false;
      this.treeData = data;
      this.editTreeInfo = data;
      this.editTreeInfo.parentid = data.parentid;
      this.editTreeInfo.dictid = data.dictid;
      this.editTreeInfo.name = data.title;
      this.editTreeInfo.title = data.title;
      this.editTreeInfo.en = data.en;
      this.editTreeInfo.ecode = data.ecode;
      this.editTreeInfo.children = data.children;
      this.editTreeInfo.status = data.status;
      this.editTreeInfo.id = data.id;
      this.editTreeInfo.type = data.type;
      this.eidtTreeShow = true;
    },
    eidtTreeSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.editTreeInfo.name = this.editTreeInfo.title;
          this.$http.put("/dict", this.editTreeInfo).then(res => {
            this.nextTree(this.treeData.id, "edit");
          });
        }
      });
    },
    //删除树
    removeTree(data) {
      this.deleteTreeShow = true;
      this.deleteTreeInfo = data;
      if (data.parentid == 0) {
        this.flag = false;
      } else {
        this.flag = true;
        // this.deleteRoot = root.find(el => el === node).parent;
        // this.deleteNode = root.find(el => el.nodeKey === this.deleteRoot).node;

      }
    },
    deleteTreeSave() {
      this.$http.delete("/dict/" + this.deleteTreeInfo.id).then(res => {
        // if (this.flag) {
        //   // const index = this.deleteNode.children.indexOf(this.deleteTreeInfo);
        //   this.deleteNode.children.removeNode(this.deleteTreeInfo);
        // } else {
          // for (let i in this.tree) {
          //   if (this.tree[i].id == this.deleteTreeInfo.id) {
          //     this.tree.splice(i, 1);
          //     break;
          //   }
          // }
          this.TREE.removeNode(this.deleteTreeInfo);
        // }
        this.addTreeShow = false;
        this.parentTypeShow = false;
        this.eidtTreeShow = false;
        this.$Message.success("删除成功!");
        this.deleteTreeShow = false;
      });
    },

    outPut() {
      const link = document.createElement("a");
      link.download = "模板.xls";
      link.href = "/static/importdict.xlsx";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    //导出
    handleFormatError() {
      this.$Message.destroy();
      this.$Message.error({
        content: "文件格式不正确，请上传 .xls 或 .xlsx 格式的文件。",
        duration: 5,
        closable: true
      });
    },
    handleFormatSuccess() {
      // this.getTree();
      this.$Message.destroy();
      this.$Message.success({
        content: "上传成功",
        duration: 3
      });
    },
    handleFormatLoading() {
      this.$Message.loading({
        content: "上传中...",
        duration: 0
      });
    },
    uploadErrorimport(error, err) {
      this.$Message.destroy();
      this.$Message.error({
        content: err,
        duration: 3,
        closable: true
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.craft .ivu-tree ul li {
  padding: 10px 0;
  margin: 0;
}
.craft .ivu-tree ul {
  /*border-bottom: 1px solid #ccc;*/
  background-color: white;
  &:hover {
    background-color: rgba(0, 193, 222, 0.1);
  }
}
.uploadButton .ivu-icon-ios-cloud-upload-outline:before {
  content: "";
}
.craftUpLoad .ivu-upload-list-file {
  display: none;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.uploadButton {
  outline: none;
  padding: 3px 6px;
  border-radius: 15px;
  font-weight: 100;
  border: none;
  color: #464c5b;
}
.uploadButton:hover {
  background-color: #f4eee5;
}
.uploadButton:focus {
  box-shadow: 0 0 0 0;
}
.save {
  padding: 6px 22px;
  background: #00b6f1;
  border: 1px solid #37b3b3;
  color: #ffffff;
  font-size: 12px;
  margin: 8px 0;
  border-radius: 0;
}
/*按钮*/
    .icon_div {
        display: inline-block;
        height: 25px;
        width: 35px;
        margin-right:8px;
    }

    .icon_div a {
        display: inline-block;
        width: 27px;
        height: 20px;
        cursor: pointer;
        text-decoration: none;
    }
    .ztree {
        padding: 0;
        /* border: 2px solid #CDD6D5; */
    }

    .ztree li a {
        vertical-align: middle!important;
        height: 30px!important;
    }

    .ztree li > a {
        width: 100%;
    }

    .ztree li > a,
    .ztree li a.curSelectedNode {
        padding-top: 0px!important;
        background: none!important;
        height: auto!important;
        border: none!important;
        cursor: default!important;
        opacity: 1!important;
    }

    /* .ztree li ul {
        padding-left: 0px
    } */

    .ztree div.diy span {
        line-height: 30px!important;
        vertical-align: middle!important;
    }
    .ztree div.diy {
        height: 100%;
        line-height: 30px;
        /* border-top: 1px dotted #ccc;
        border-left: 1px solid #eeeeee; */
        text-align: center;
        display: inline-block;
        box-sizing: border-box;
        color: #6c6c6c;
        font-family: "SimSun";
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
    }
    .ztree div.diy:nth-child(1){
      width:10%
    }
    .ztree div.diy:nth-child(2){
      width:40%
    }
    .ztree div.diy:nth-child(3){
      width:10%
    }
    .ztree div.diy:nth-child(4){
      width:10%
    }
    .ztree div.diy:nth-child(5){
      width:10%
    }
    .ztree div.diy:nth-child(6){
      width:20%
    }
    .ztree div.diy:first-child {
        text-align: left;
        text-indent: 10px;
        border-left: none;
    }

    .ztree .head {
        background: #5787EB;
    }

    .ztree .head div.diy {
        border-top: none;
        border-right: 1px solid #CDD2D4;
        color: #fff;
        font-family: "Microsoft YaHei";
        font-size: 14px;
    }
    .ztree li a.icon_view{
      margin-right: 8px;
      color: rgb(0, 182, 241);
      cursor: pointer;
      font-size: 14px;
    }
    .ztree li span.button.ico_close,
    .ztree li span.button.ico_open,
    .ztree li span.button.ico_loading,
    .ztree li span.button.ico_docu{
      vertical-align: -14%;
    }
    .ztree li a.icon_edit{
      margin-right: 8px;
      color: rgb(67, 191, 183);
      cursor: pointer;
      font-size: 14px;
    }
    .ztree li a.icon_del{
      color: rgb(255, 153, 1);
      font-size: 14px;
      cursor: pointer;
    }
</style>
