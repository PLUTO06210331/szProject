<template>
  <div class="manage-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>款式管理 /</span>
          <span>款式管理</span>
        </span>
        <span slot="footer" class="com-slot-right">
          <span class="T3 main-heading" @click="leftInsertShow=true"><span class="shade"><span class="colorBox colorBoxOrange"><Icon type="ios-plus-outline"></Icon></span>添加款式</span></span>
          <span class="T3 main-heading" @click="rightInsertFun"><span class="shade"><span class="colorBox colorBoxGreen"><Icon type="ios-plus-outline"></Icon></span>添加品类</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="款式名称" :label-width="70" class="specialCase" >
            <Input v-model="searchForm.name" @on-enter="search()"></Input>
            <input type="text" style="display: none">
          </Form-item>
          <!--<Form-item label="性别" :label-width="45" class="specialCase" >-->
            <!--<Select v-model="searchForm.gender">-->
              <!--<Option :value="' '">全部</Option>-->
              <!--<Option :value="1">男</Option>-->
              <!--<Option :value="0">女</Option>-->
            <!--</Select>-->
          <!--</Form-item>-->
          <Form-item label="风格" :label-width="45" class="specialCase" >
            <Select v-model="searchForm.series">
              <Option value=" ">全部</Option>
              <Option v-for="item in styleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item class="specialHandling .specialHandling">
            <Button icon="search" @click="search" @on-enter="search"></Button>
          </Form-item>
        </Form>
        <div id="tableBox" ref="tableBox">
          <Table v-com border :columns="columnsLeft" :data="dataLeft"></Table>
        </div>
        <page-current ref="pages" class="pages-position" :total="totalLeft" @pageChange="pageListen"></page-current>
      </div>
    </div>

    <!--新增-->
    <div v-if="leftInsertShow">
      <Modal v-model="leftInsertShow" class-name="delect big-sized" :mask-closable=false  width="700" v-drag @on-cancel="cancels('leftInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增款式</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="leftInsertInfo" class="searchForm" label-position="left" :model="leftInsertInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
            <Row>
              <i-col span="10">
                <Form-item label="风格" :label-width="60" prop="series">
                  <Select v-model="leftInsertInfo.series">
                    <Option v-for="item in styleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </i-col>
              <i-col span="10" offset="3">
                <Form-item prop="name"  label="名称:" :label-width="60" >
                  <Input v-model="leftInsertInfo.name"></Input>
                </Form-item>
              </i-col>
              <i-col span="10">
                <Form-item prop="weight" label="权重:" :label-width="60" >
                  <Input v-model="leftInsertInfo.weight" ></Input>
                </Form-item>
              </i-col>
              <i-col span="10" offset="3">
                <Form-item prop="code"  label="编号:" :label-width="60" >
                  <Input v-model="leftInsertInfo.code"></Input>
                </Form-item>
              </i-col>
              <i-col span="10">
                <Form-item prop="sales"  label="销量:" :label-width="60" >
                  <Input v-model="leftInsertInfo.sales"></Input>
                </Form-item>
              </i-col>
              <i-col span="10" offset="3">
                <Form-item prop="isdefault"  label="默认情况:" :label-width="70">
                  <Select v-model="leftInsertInfo.isdefault">
                    <Option :value="'1'">默认</Option>
                    <Option :value="'0'">不默认</Option>
                  </Select>
                </Form-item>
              </i-col>
              <i-col span="10">
                <Form-item prop="ptype"  label="人体模型:" :label-width="70" >
                  <Select v-model="leftInsertInfo.ptype">
                    <Option :value="'1'">插兜</Option>
                    <Option :value="'0'">不插兜</Option>
                  </Select>
                </Form-item>
              </i-col>
              <i-col span="10" offset="3">
                <Form-item prop="status" label="状态:" :label-width="70" >
                  <div class="optionStatus">
                    <Radio-group v-model="leftInsertInfo.status">
                      <Radio label='0'>启用</Radio>
                      <Radio label='1'>禁用</Radio>
                    </Radio-group>
                  </div>
                </Form-item>
              </i-col>
                <div class="searchLength">
                  <Form-item prop="description" label="描述:" :label-width="70" >
                    <Input v-model="leftInsertInfo.description"></Input>
                  </Form-item>
                </div>
                <div class="searchLength">
                  <Form-item prop="descriptionen"  label="英文描述:" :label-width="70" >
                    <Input v-model="leftInsertInfo.descriptionen"></Input>
                  </Form-item>
                </div>
                <div class="textareaDiv searchLength">
                  <Form-item prop="descriptiondetail" label="中文详细描述:" :label-width="90" >
                    <Input type="textarea" class="manageDescript" v-model="leftInsertInfo.descriptiondetail"></Input>
                  </Form-item>
                </div>
                <div class="textareaDiv searchLength">
                  <Form-item prop="descriptiondetailen" label="英文详细描述:" :label-width="90" >
                      <Input type="textarea" class="manageDescript" v-model="leftInsertInfo.descriptiondetailen"></Input>
                  </Form-item>
                </div>
            </Row>
          </Form>
        </div>
        <div slot="footer">
          <Button class="clear" @click="cancels('leftInsertInfo')">清空</Button>
          <Button class="save" @click="leftInsertSave('leftInsertInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--编辑-->
    <div v-if="leftDoneShow">
      <Modal v-model="leftDoneShow" class-name="delect big-sized" :mask-closable=false  width="700" v-drag @on-cancel="cancels('leftDoneInfo')">
        <p slot="header">
          <span class="main-heading">编辑</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="leftDoneInfo" class="searchForm" label-position="left" :model="leftDoneInfo" :rules="leftInsertRule" inline style="text-align: left;padding:15px 60px 0">
            <Row>
              <i-col span="10">
                <Form-item label="风格" :label-width="60" prop="series">
                  <Select v-model="leftDoneInfo.series">
                    <Option v-for="item in styleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </i-col>
              <i-col span="10" offset="3">
                <Form-item prop="name"  label="名称:" :label-width="60" >
                  <Input v-model="leftDoneInfo.name"></Input>
                </Form-item>
              </i-col>
              <i-col span="10">
                <Form-item prop="weight" label="权重:" :label-width="60" >
                  <Input v-model="leftDoneInfo.weight" ></Input>
                </Form-item>
              </i-col>
              <i-col span="10" offset="3">
                <Form-item prop="code"  label="编号:" :label-width="60" >
                  <Input v-model="leftDoneInfo.code"></Input>
                </Form-item>
              </i-col>
              <i-col span="10">
                <Form-item prop="sales"  label="销量:" :label-width="60" >
                  <Input v-model="leftDoneInfo.sales"></Input>
                </Form-item>
              </i-col>
              <i-col span="10" offset="3">
                <Form-item prop="isdefault"  label="默认情况:" :label-width="70">
                  <Select v-model="leftDoneInfo.isdefault">
                    <Option :value="'1'">默认</Option>
                    <Option :value="'0'">不默认</Option>
                  </Select>
                </Form-item>
              </i-col>
              <i-col span="10">
                <Form-item prop="ptype"  label="人体模型:" :label-width="70" >
                  <Select v-model="leftDoneInfo.ptype">
                    <Option :value="'1'">插兜</Option>
                    <Option :value="'0'">不插兜</Option>
                  </Select>
                </Form-item>
              </i-col>
              <i-col span="10" offset="3">
                <Form-item prop="status" label="状态:" :label-width="70" >
                  <div class="optionStatus">
                    <Radio-group v-model="leftDoneInfo.status">
                      <Radio label='0'>启用</Radio>
                      <Radio label='1'>禁用</Radio>
                    </Radio-group>
                  </div>
                </Form-item>
              </i-col>
              <div class="searchLength">
                <Form-item prop="description"  label="描述:" :label-width="70" >
                  <Input v-model="leftDoneInfo.description"></Input>
                </Form-item>
              </div>
              <div class="searchLength">
                <Form-item prop="descriptionen"  label="英文描述:" :label-width="70" >
                  <Input v-model="leftDoneInfo.descriptionen"></Input>
                </Form-item>
              </div>
              <div class="textareaDiv searchLength">
                <Form-item prop="descriptiondetail"  label="中文详细描述:" :label-width="90" >
                  <Input type="textarea"  class="manageDescript" v-model="leftDoneInfo.descriptiondetail"></Input>
                </Form-item>
              </div>
              <div class="textareaDiv searchLength">
                <Form-item prop="descriptiondetailen"  label="英文详细描述:" :label-width="90" >
                  <Input type="textarea" class="manageDescript" v-model="leftDoneInfo.descriptiondetailen"></Input>
                </Form-item>
              </div>
            </Row>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="leftDoneSave('leftDoneInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--删除-->
    <div v-if="leftDeleteShow">
      <Modal v-model="leftDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="leftDeleteSave">确认</Button>
            <Button  class="clear" @click="leftDeleteShow=false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!--图例-->
    <div v-if="leftPrintShow">
      <Modal v-model="leftPrintShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag>
        <p slot="header">
          <span class="main-heading">图例</span>
        </p>
        <div class="pattern">
          <img v-if="leftPrintDone" :src="leftPrintDone" style="width: 300px;height: 300px">
          <div style="position: absolute;bottom:0 ">
            <div class="uploadDiv">
              <Upload
                :before-upload="handleUpload"
                action=""
                :format="['jpg','jpeg','png']"
                style="display: inline-block" >
                <button class="upImg" :style="{'backgroundColor':leftPrintDone?'rgba(0,0,0,0.2)':'transparent','color':leftPrintDone?'white':'#42beb6'}">
                  <i class="ivu-icon ivu-icon-ios-cloud-upload-outline"></i>
                  <span>{{leftPrintDone?'重新上传':'上传文件'}}</span>
                </button>
              </Upload>
            </div>
          </div>
        </div>

        <div slot="footer">
          <Button class="save" @click="leftPrintSave()">保存</Button>
        </div>
      </Modal>
    </div>

    <!--右表格-->
    <!--详情-->
    <div v-if="rightShow">
      <Modal v-model="rightShow"  width="870" class-name="delectNopad" :mask-closable=false  v-drag >
        <p slot="header">
          <span class="main-heading">款式详情</span>
        </p>
        <div class="autoDiv">
          <div class="modalContent" style="text-align:center">
            <h4>基本信息</h4>
            <Form class="basicForm searchForm" :label-width="70"  inline style="text-align: left">
              <Row class="detailRow">
                <i-col span="8">
                  <Form-item label="名称:">
                    {{rightSearch.name}}
                  </Form-item>
                </i-col>
              </Row>
            </Form>
            <h4>订单明细</h4>
            <div class="styleDetail" style="padding: 15px">
              <Table border :columns="columnsRight" :data="dataRight"></Table>
            </div>
          </div>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
    <!--新增-->
    <div v-if="rightInsertShow">
      <Modal v-model="rightInsertShow" class-name="delect big-sized" :mask-closable=false  width="480" v-drag @on-cancel="rightInsertClear('rightInsertInfo')">
        <p slot="header">
          <span class="main-heading">新增品类</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <div>
          <Form ref="rightInsertInfo" class="searchForm" label-position="left" :model="rightInsertInfo" :rules="rightInsertRule" inline style="text-align: left;padding:15px 60px 0 64px">
            <Form-item label="品类" :label-width="60" prop="clothid">
              <Select v-model="rightInsertInfo.clothid">
                <Option v-for="item in clothType" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item label="着装风格" :label-width="70" prop="style">
              <Select v-model="rightInsertInfo.style">
                <Option v-for="item in styleInsertList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item label="款式" :label-width="60" prop="productid">
              <Select v-model="rightInsertInfo.productid" filterable @on-change="getSuitList(rightInsertInfo.productid)">
                <Option v-for="(item,index) in leftAll" :value="item.id" :key="index">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item prop="productStyle"  label="长短款:" :label-width="70">
              <Select v-model="rightInsertInfo.productStyle">
                <Option v-for="(item,index) in productList" :value="item.id" :key="index">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item prop="suit"  label="是否套装:" :label-width="70">
              <Select v-model="rightInsertInfo.suit">
                <Option :value="' '">无套装</Option>
                <Option v-for="(item,index) in suitList" :value="item.id" :key="index">{{ item.clothname }}</Option>
              </Select>
            </Form-item>
            <Form-item prop="sequenceno" label="排序:" :label-width="60" >
              <Input v-model="rightInsertInfo.sequenceno"></Input>
            </Form-item>
          </Form>
          <!--<h4>图片</h4>-->
          <!--<div id="pictrue">-->
             <!--<ul>-->
               <!--<li v-for="(item,index) in picShow">-->
                 <!--<img :src="item" alt="" style="width: 150px;height: 150px">-->
                 <!--<div class="closeTip" @click="deletePic(index)">-->
                   <!--<Icon type="close"></Icon>-->
                 <!--</div>-->
               <!--</li>-->
               <!--<Upload-->
                 <!--multiple-->
                 <!--:before-upload="rightUpload"-->
                 <!--action=""-->
                 <!--:format="['jpg','jpeg','png']"-->
                 <!--style="margin: 5px;border: 1px dashed #dddddd;cursor: pointer">-->
                 <!--<div style="width: 150px;height:150px;line-height: 150px;float: left">-->
                   <!--<Icon type="camera" size="20"></Icon>-->
                 <!--</div>-->
               <!--</Upload>-->
             <!--</ul>-->
          <!--</div>-->
          </div>
        </div>
        <div slot="footer">
          <Button class="clear" @click="rightInsertClear('rightInsertInfo')">清空</Button>
          <Button class="save" @click="rightInsertSave('rightInsertInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--编辑-->
    <div v-if="rightDoneShow">
      <Modal v-model="rightDoneShow" class-name="delect big-sized" :mask-closable=false  width="750" v-drag @on-cancel="rightDoneShow=false">
        <p slot="header">
          <span class="main-heading">编辑品类</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <div>
            <h4>基本信息</h4>
            <Form ref="rightDoneInfo" class="searchForm" label-position="left" :model="rightDoneInfo" :rules="rightInsertRule" inline style="text-align: left;padding:15px 60px 15px 100px">
              <Form-item label="品类" :label-width="60" prop="clothid">
                <Select v-model="rightDoneInfo.clothid" :disabled="true">
                  <Option v-for="item in clothType" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </Form-item>
              <Form-item label="着装风格" :label-width="70" prop="style">
                <Select v-model="rightDoneInfo.style">
                  <Option v-for="item in styleInsertList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </Form-item>
              <Form-item label="款式" :label-width="60" prop="productid">
                <Select v-model="rightDoneInfo.productid" @on-change="getSuitList(rightDoneInfo.productid)">
                  <Option v-for="(item,index) in leftAll" :value="item.id" :key="index">{{ item.name }}</Option>
                </Select>
              </Form-item>
              <Form-item prop="productStyle"  label="长短款:" :label-width="70">
                <Select v-model="rightDoneInfo.productStyle">
                  <Option v-for="(item,index) in productList" :value="item.id" :key="index">{{ item.name }}</Option>
                </Select>
              </Form-item>
              <Form-item prop="suit"  label="是否套装:" :label-width="70">
                <Select v-model="rightDoneInfo.suit">
                  <Option :value="' '">无套装</Option>
                  <Option v-for="(item,index) in suitList" :value="item.id" :key="index">{{ item.clothname }}</Option>
                </Select>
              </Form-item>
              <Form-item prop="sequenceno" label="排序:" :label-width="60" >
                <Input v-model="rightDoneInfo.sequenceno" ></Input>
              </Form-item>
            </Form>
          </div>
        </div>
        <div slot="footer">
          <Button class="clear" @click="rightDoneShow=false">关闭</Button>
          <Button class="save" @click="rightDoneSave('rightDoneInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--删除-->
    <div v-if="rightDeleteShow">
      <Modal v-model="rightDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="rightDeleteSave">确认</Button>
            <Button  class="clear" @click="rightDeleteShow=false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!--面料-->
    <div v-if="fabricInfoShow">
      <Modal v-model="fabricInfoShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag @on-cancel="cancels('fabriccodes')">
        <p slot="header">
          <span class="main-heading">面料</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="fabriccodes" class="searchForm" label-position="left" :model="fabricInfo" :rules="fabricInfoRules" inline style="text-align: left;padding:15px 60px 0">
            <Form-item prop="fabriccodes" label="面料:" :label-width="90" >
              <Input v-model="fabricInfo.fabriccodes"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="fabricInfoSave('fabriccodes')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--模型-->
    <div v-if="modelInfoShow">
      <Modal v-model="modelInfoShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag>
        <p slot="header">
          <span class="main-heading">模型</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <Form ref="modelInfo" class="searchForm" label-position="left"  inline style="text-align: left;padding:15px 60px 0">
            <Form-item prop="extensions"  label="关联模型:" :label-width="70" >
              <Select v-model="modelInfo" multiple class='modelSelect'>
                <Option v-for='(item,index) in modeList' :key="index" :value="item.id">{{item.name}}</Option>
              </Select>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button class="save" @click="modelInfoSave('fabriccodes')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--工艺-->
    <div v-if="technologyInfoShow">
      <Modal v-model="technologyInfoShow"  class-name="delect big-sized" :mask-closable=false  width="900" v-drag @on-cancel="technologyInfoShow=false">
        <p slot="header">
          <span class="main-heading">工艺</span>
        </p>
        <div class="modalContent">
          <div id="titleSearch" style="width: 60%;margin: 0 auto">
            <Select
              id="hhh"
              @on-change="selectSure"
              v-model="technologySearch"
              filterable
              remote
              clearable
              :remote-method="getTechnologyList"
              :loading="technologyLoading">
              <Option v-for="(option, index) in technologyList" :value="JSON.stringify(option)" :key="index">
                <span style="margin-right: 20px">{{option.ecode}}</span>
                <span style="margin-right: 20px">{{option.parentname}} :</span>
                <span>{{option.name}}</span>
              </Option>
            </Select>
          </div>

          <div style="padding: 15px;height: 300px; overflow-y: auto">
            <div class="searchResult" v-for="(item,index) in technologyInfo" :key = 'index'>
              <div style="clear: both" id="longSearch"></div>
              <div class="technologyContent" style="width: 6%;margin-left: 1%">{{item.ecode}}</div>
              <div class="technologyContent" style="width: 78%;text-align: left">{{item.parentname}}:{{item.name}}</div>
              <div v-if="item.status==='TEXT'||item.status==='TEXTCHECKBOX'" class="technologyContent" style="width: 10%;margin-left: 1%">
                <input type="text" style="width: 100%" v-model="item.content">
              </div>
              <div class="technologyContent close" @click="reduceItem(index)">
                <Icon type="ios-close-outline"></Icon>
              </div>
            </div>

          </div>
        </div>
        <div slot="footer">
          <Button class="clear" @click="technologyInfoShow=false">关闭</Button>
          <Button class="save" @click="technologyInfoSave('rightDoneInfo')">保存</Button>
        </div>
      </Modal>
    </div>
    <!--工艺删除-->
    <div v-if="craftDeleteShow">
      <Modal v-model="craftDeleteShow" class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条工艺吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save" @click="craftDeleteSave">确认</Button>
            <Button  class="clear" @click="craftDeleteShow=false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import HeaderSlot from "../../components/public/head-slot.vue";
  import page from '../../components/public/page-current.vue';
  import ICol from "../../../node_modules/iview/src/components/grid/col";
  export default {
    components: {ICol, HeaderSlot},

    data () {
      const style = (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error('请选择风格'));
        }
      };
      const code = (rule, value, callback) => {
        if (value) {
          if((/^[0-9a-zA-Z]+$/).test(value)){
            callback()
          }else{
            callback(new Error('编号为数字和字母'));
          }
        } else {
          callback(new Error('请输入编号'));
        }
      };
      //新增
      const clothid = (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error('请选择品类'));
        }
      };
      const clothStyle = (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error('请选择着装风格'));
        }
      };
      const productid = (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error('请选择款式'));
        }
      };
      const productStyle = (rule,value,callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error('请选择长短款'));
        }
      }

      return {
        searchForm:{
          name:'',
          gender:' ',
          series:' ',
          pageIndex:1,
          pageSize:10
        },
        //款式选项
        leftAll:[],
        //套装选项
        suitList:[],
        productList:[], // 长短款
        //新增着装风格
        styleInsertList:[],
        //品类下拉选项
        clothType:[],
        //风格下拉选项
        styleList:[],
        //左表格
        dataLeft:[],
        columnsLeft:[
          {
            title: '序号',
            width:'10%',
            type:'index',
            align: 'center',
          },
          {
            title: '名称',
            width:'40%',
            key: 'name',
            align: 'center',
          },
          {
            title:'风格',
            width:'20%',
            key:'seriesname',
            align:'center',
          },
          {
            title: '状态',
            width:'20%',
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
            width:'50%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    class: 'blueButton',
                    style: {
                      marginLeft: '8px',
                      background:"transparent",
                    },
                    on: {
                      click: () => {
                        this.leftPrint(params.row)
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
                    class: 'greenButton',
                    style: {
                      background:"transparent",
                      marginLeft: '8px',
                      marginRight: '8px',

                    },
                    on: {
                      click: () => {
                        this.getRightTable(params.row)
                      }
                    },
                  },[
                    h('i',{
                      class:'iconfont icon-qingkong',
                    }),
                    h('span',{

                    },'详情')
                  ]
                ),
                h('Button', {
                    class: 'yellowButton ',
                    style: {
                      marginLeft: '8px',
                      marginRight: '8px',
                      background:"transparent",
                    },
                    on: {
                      click: () => {
                        this.leftDone(params.row)
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
                    class: 'darkBlueButton',
                    style: {
                      background:"transparent",
                      marginLeft: '8px',
                      marginRight: '8px',
                    },
                    on: {
                      click: () => {
                        this.leftDeleteInfo=params.row.id
                        this.leftDeleteShow=true;
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
        totalLeft:0,
        leftInsertShow:false,
        //左新增
        leftInsertInfo:{
          series:'',  //上级风格的id
          name:'',   //名称
          weight:'',   //权重
          code:'',    //编码
          status:'0', //状态
          isdefault:'0',
          sales:0,   //销量
          ptype:'0',    //人体模型
          description:'',  //中文描述
          descriptionen:'',  //英文描述
          descriptiondetail:'',  //中详情描述
          descriptiondetailen:'',  //英详情描述
        },
        //左验证
        leftInsertRule:{
          series:[
            { required: true,validator:style, trigger: 'change' },
          ],
          name: [
            { required: true,message:'请填写款式名称', trigger: 'blur' },
            { max:10,message: '款式名称不能超过10位', trigger: 'blur'}
          ],
          weight: [
            { required: true,message:'请填写权重', trigger: 'blur' },
            { max:10,message: '权重不能超过10位', trigger: 'blur'}
          ],
          code: [
            { required: true,validator:code, trigger: 'blur' },
            { max:20,message: '编号不能超过20位', trigger: 'blur'}
          ],
          sales: [
            { required: true,validator:this.$validate(true,'number','销量',10), trigger: 'blur' },
          ],
          ptype: [
            { required: true,message:'请选择模型', trigger: 'change' },
          ],
          isdefault: [
            { required: true,message:'请选择默认情况', trigger: 'change' },
          ],
          description: [
            { message:'请填写中文描述', trigger: 'blur' },
            { max:50,message: '中文描述不能超过50位', trigger: 'blur'}
          ],
          descriptionen: [
            { message:'请填写英文描述', trigger: 'blur' },
            { max:100,message: '英文描述不能超过100位', trigger: 'blur'}
          ],
          descriptiondetail: [
            { max:500,message: '中文详情描述不能超过500位', trigger: 'blur'}
          ],
          descriptiondetailen: [
            { max:1000,message: '英文详情描述不能超过1000位', trigger: 'blur'}
          ],
        },
        //左编辑
        leftDoneShow:false,
        leftDoneInfo:'',
        //删除
        leftDeleteInfo:'',
        leftDeleteShow:false,
        //图例
        leftPrintShow:false,
        leftPrintDone:'',
        file:{
          id:'',
          file:''
        },
        //右表格
        rightShow:false,
        rightSearch:{
          productid:'',
        },
        dataRight:[],
        columnsRight:[
          {
            title: '序号',
            width:'10%',
            type:'index',
            align: 'center',
          },
          {
            title: '品类名称',
            width:'20%',
            key: 'clothname',
            align: 'center',
          },
          {
            title: '面料',
            width:'40%',
            key: 'fabrics',
            align: 'center',
          },
          {
            title: '模型数量',
            width:'20%',
            key: 'modelcount',
            align: 'center',
          },
          {
            title: '操作',
            width:'70%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    class: 'blueButton',
                    style: {
                      background:"transparent",
                      marginLeft: '5px',
                      marginRight: '5px',
                    },
                    on: {
                      click: () => {
                        this.rightDoneModel(params.row)
                      }
                    },
                  },[
                    h('i',{
                      class:'iconfont icon-qingkong',
                    }),
                    h('span',{

                    },'模型')
                  ]
                ),
                h('Button', {
                    class: 'greenButton ',
                    style: {
                      marginLeft: '5px',
                      background:"transparent",
                    },
                    on: {
                      click: () => {
                        this.rightDoneFabric(params.row)
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-bianji',
                    }),

                    h('span',{
                    },'面料')
                  ]
                ),
                h('Button', {
                    class: 'redButton ',
                    style: {
                      marginLeft: '5px',
                      background:"transparent",
                    },
                    on: {
                      click: () => {
                        this.rightDoneTechnology(params.row)
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-bianji',
                    }),

                    h('span',{
                    },'工艺')
                  ]
                ),
                h('Button', {
                    class: 'yellowButton',
                    style: {
                      background:"transparent",
                      marginLeft: '14px',
                      marginRight: '5px',
                    },
                    on: {
                      click: () => {
                        this.rightDone(params.row)
                      }
                    },
                  },[
                    h('i',{
                      class:'iconfont icon-qingkong',
                    }),
                    h('span',{

                    },'编辑')
                  ]
                ),
                h('Button', {
                    class: 'darkBlueButton',
                    style: {
                      background:"transparent",
                      marginLeft: '5px',
                      marginRight: '5px',
                    },
                    on: {
                      click: () => {
                        this.rightDeleteInfo=params.row.id
                        this.rightDeleteShow=true;
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
        //面料
        fabricInfo:{
          detailid:'',
          fabriccodes:''
        },
        fabricInfoShow:false,
        fabricInfoRules:{
          fabriccodes: [
            { required: true,message:'请输入面料号', trigger: 'blur' },
          ],
        },
        //模型
        modelInfoShow:false,
        modelInfo:{},
        modeList:[],
        modelId:'',
        //工艺
        technologyInfo:'',
        technologyRow:'',
        technologyInfoShow:false,
        technologySearch:'',
        technologyList:[],
        technologyLoading:false,
        //工艺删除
        craftDeleteShow:false,
        craftDeleteIndex:'',
        rightInsertShow:false,
        rightInsertInfo:{
          clothid:'', //品类
          sequenceno:'',  //排序
          style:'',  //着装风格
          suit:' ',  //是否套装
          productid:'', //款式
          productStyle:'',// 长短款
        },
        picShow:[],
        rightInsertRule:{
          clothid:[
            { required: true,validator:clothid, trigger: 'change' },
          ],
          style: [
            { required: true,validator:clothStyle, trigger: 'change' },
          ],
          productid: [
            { required: true,validator:productid, trigger: 'change' },
          ],
          productStyle:[
            {required: true,validator:productStyle, trigger: 'change' }
          ],
          code: [
            { required: true,validator:code, trigger: 'blur' },
            { max:20,message: '编号不能超过20位', trigger: 'blur'}
          ],
          sequenceno: [
            { required: false,validator:this.$validate(false,'number','排序',10), trigger: 'blur' },
          ],
        },
        rightDoneShow:false,
        rightDoneInfo:'',
        picDoneShow:[],
        rightDeleteShow:false,
        rightDeleteInfo:''
      }
    },
    mounted(){
      //获取所有款式
      //this.getLeftTableAll()
      //获取品类列表
      this.getClothType()
      this.screenDivSize()
      //获取风格表
      this.getStyleList()
      //获取着装风格
      this.getAddStyleList()
      this.getLeftTable();
      //获取长短款
      this.getProductList();
    },
    methods: {
      cancels(name){
        this.$refs[name].resetFields();
      },
      //设置高的样式
      screenDivSize(){
        let screenDiv=document.getElementById('screenDiv');
        this.$nextTick(function(){
          let searchForm=document.getElementsByClassName('searchForm')[0];
          if(screenDiv){
            screenDiv.style.height=window.innerHeight-searchForm.offsetHeight-90+'px';
          }
        })
      },
      //获取品类大全
      getClothType(){
        this.$http.get('/dict/category',{params:{
          category:'P',
          parentid:0,
        }}).then(res=>{
          this.clothType=res.data;
        })
      },
      //获取风格表
      getStyleList(){
        this.$http.get( '/dict/category',{params:{parentid:0,category:'SE'}}).then(res=>{
          this.styleList=res.data;
        })
      },
      //获取新增着装风格下拉
      getAddStyleList(){
        this.$http.get( '/dict/category',{params:{parentid:0,category:'S'}}).then(res=>{
          this.styleInsertList=res.data;
        })
      },
      //左列表全部数据
      getLeftTableAll(){
        this.$http.get( '/products',{params:{}}).then(res=>{
          this.leftAll=res.data;
        })
      },
      //左表格
      getLeftTable(){
        this.$http.get( '/productlist',{params:this.searchForm}).then(res=>{
          this.dataLeft=res.data.data;
          this.totalLeft=res.data.total;

        })
      },
      pageListen(data){
        this.searchForm.pageIndex=data.pageIndex;
        this.searchForm.pageSize=data.pageSize;
        this.getLeftTable();
      },
      search(){
        this.searchForm.pageIndex=1;
        this.$refs.pages.pageReset(this.searchForm.pageSize,this.searchForm.pageIndex);
        this.getLeftTable()
      },
      leftInsertSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/product',this.leftInsertInfo).then(res=>{
              this.leftInsertShow=false;
              this.getLeftTable();
              this.cancels(name)
              this.$Message.success('添加成功');
            })
          }
        })
      },
      leftDone(row){
        this.$http.get('/product/'+row.id).then(res=>{
          this.leftDoneInfo = res.data;
          this.leftDoneShow=true
        })
      },
      leftDoneSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.put('/product',this.leftDoneInfo).then(res=>{
              this.leftDoneShow=false;
              this.getLeftTable();
              this.$Message.success('修改成功');
            })
          }
        })
      },
      leftDeleteSave(){
        this.$http.delete('/product/'+this.leftDeleteInfo).then(res=>{
          this.leftDeleteShow=false;
          this.getLeftTable();
          this.$Message.success('删除成功');
        })
      },
      leftPrint(row){
        this.leftPrintDone=''
        this.$http.get('/product/image/'+row.id).then(res=>{
          if(res.data.filepath){
            this.leftPrintDone=this.$http.defaults.baseURL+res.data.filepath;
          }
          this.leftPrintShow=true;
          this.file.id=row.id;
          this.file.file='';
        });
      },
      handleUpload(file){
        var type= this.formatFlag(file.name)
        if(type){
          this.file.file=file;
          let r = new FileReader();  //本地预览
          var that=this
          r.onload = function(){
            that.leftPrintDone=r.result
          }
          r.readAsDataURL(file);
        }else{
          this.leftPrintDone='???'
          this.$Message.error('图片格式错误');
        }
        return false;
      },
      //判断上传文件格式(图片)
      formatFlag(filename){
        var index = filename.lastIndexOf(".");
        var type=filename.substring(index+1,filename.length)
        if(type==='png'||type==='jpeg'||type==='bmp'||type==='jpg'){
          return true
        }else{
          return false
      }
      },
      leftPrintSave(){
        let data=new FormData(this.file.file)
        data.append('file', this.file.file)
        data.append('id', this.file.id)
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        if(this.file.file){
          this.$http.post('/product/image',data,config).then(res=>{
            this.$Message.success('上传成功');
            this.leftPrintShow=false
            //this.positionPrintDone=this.file.file;
          });
        }else {
          this.$Message.error('请选择图片');
        }
      },
      rightInsertFun(){
        this.rightInsertShow=true;
        this.getLeftTableAll()
      },
      //右表格
      getRight(){
        this.$http.get('/productdetails',{params:{productid:this.rightSearch.id}}).then(res=>{
          this.dataRight=res.data
        })
      },
      getRightTable(row){
        this.rightSearch=row;
        this.$http.get('/productdetails',{params:{productid:this.rightSearch.id}}).then(res=>{
          this.dataRight=res.data
          this.rightShow=true;
        })

        //this.getSuitList()
      },
      //状态
      changeStatus (row) {
        let data=JSON.parse(JSON.stringify(row));
        data.status==0?data.status=1:data.status=0;
        let storeData = {};
        storeData.id = data.id;
        storeData.status = data.status;
        this.$http.put('/product', storeData).then(res => {
          this.$Message.success("更改成功!");
          row.status==0?row.status=1:row.status=0
        })
      },
      //款式改变
      getSuitList(id){
        id?id:'';
        this.$http.get('/productdetail/suit',{params:{
          productid:id,
        }}).then(res=>{
          this.suitList=res.data;
//          this.rightInsertInfo.suit='';
//          this.rightDoneInfo.suit ='';
        })
      },
      // 获取长短款
      getProductList(){
        this.$http.get('/stylelist',{params:{category:"ST"}}).then((res)=>{
          this.productList = res.data.data;
        })
      },
//      rightUpload(file){
//        var type= this.formatFlag(file.name)
//        if(type){
//          let r = new FileReader();  //本地预览
//          var that=this
//          r.onload = function(){
//            that.picShow.push(r.result)
//            that.rightInsertInfo.files.push(file)
//          }
//          r.readAsDataURL(file);
//        }else{
//          this.$Message.error('图片格式错误');
//        }
//        return false;
//      },
      //删除图片
      deletePic(index){
        this.rightInsertInfo.files.splice(index,1);
        this.picShow.splice(index,1)
      },
      //添加清空
      rightInsertClear(name){
        this.cancels(name)
        this.rightInsertInfo.files=[]
        this.picShow=[]
      },
      rightInsertSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/productdetail',this.rightInsertInfo).then(res=>{
              this.getRight()
              this.rightInsertClear(name)
              this.rightInsertShow=false;
              this.$Message.success('添加成功');
            })
          }
        })
      },
      //编辑
      rightDone(row){
        this.$http.get('/productdetail/'+row.id).then(res=>{
          this.getLeftTableAll()
          this.rightDoneInfo=JSON.parse(JSON.stringify(res.data));
          if(this.rightDoneInfo.suit===''||this.rightDoneInfo.suit===null){this.rightDoneInfo.suit=' '}
          this.picDoneShow=res.data.files
          this.rightDoneShow=true
          this.getSuitList(this.rightDoneInfo.productid)
        })
      },
      rightDoneSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.rightDoneInfo.suit===' '){this.rightDoneInfo.suit=''}
            this.$http.put('/productdetail',this.rightDoneInfo).then(res=>{
              this.getRight()
              this.rightDoneShow=false;
              this.$Message.success('修改成功');
            })
          }
        })
      },
      //删除
      rightDeleteSave(){
        this.$http.delete('/productdetail/'+this.rightDeleteInfo).then(res=>{
          this.getRight()
          this.rightDeleteShow=false
        })
      },
      //编辑面料
      rightDoneFabric(row){
        this.$http.get('/detailFabric/'+row.id).then(res=>{
          this.fabricInfo.fabriccodes=res.data
          this.fabricInfo.detailid=row.id
          this.fabricInfoShow=true
        })
      },
      fabricInfoSave(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/detailFabric',this.fabricInfo).then(res=>{
              this.getRight()
              this.fabricInfoShow=false;
              this.$Message.success('修改成功');
            })
          }
        })
      },
      rightDoneModel(row){
        this.modelId=row.id
        this.$http.get('/detailModel/'+row.id).then(res=>{
          this.modelInfo=this.strToArr(res.data);
          this.modelInfoShow=true;
          this.getModeList(row.clothid)
        })
      },
      //获取模型列表
      getModeList(id){
        this.$http.get('/detailModels/'+id).then(res=>{
          this.modeList=res.data
        })
      },
      //字符串=>数组
      strToArr(str){
        if(str.charAt(str.length-1)==','){
          str=str.slice(0,str.length-1)
        }
        var arr=str.split(',');
        if(arr.length==1&&arr[0]==''){
          arr=[]
        }
        for(var i in arr){
          arr[i]=Number(arr[i])
        }
        return arr
      },
      modelInfoSave(){
        if(typeof this.modelInfo !=='string'){
          this.modelInfo=this.modelInfo.join(',');
        }
        let data={
          modelids:this.modelInfo,
          detailid:this.modelId
        }
        this.$http.post('/detailModel',data).then(res=>{
          this.getRight();
          this.modelInfoShow=false
          this.$Message.success('修改成功');
        })
      },
      //工艺操作
      rightDoneTechnology(row){
        this.$http.get('/detailProcess/'+row.id).then(res=>{
          this.technologyInfo=res.data;
          this.technologySearch='';
          this.technologyInfoShow=true;
          this.technologyRow=row
        })
      },
      technologyInfoSave(){
        var arr=[]
        for(var i in this.technologyInfo){
            if((this.technologyInfo[i].status==='TEXT'||this.technologyInfo[i].status==='TEXTCHECKBOX')&&!this.technologyInfo[i].content){
              this.$Message.error('请填写指定内容');
              return
            }
            arr.push({
              dictid:this.technologyInfo[i].dictid,
              content:this.technologyInfo[i].content?this.technologyInfo[i].content:null,
            })
        }
        let data={
          detailProcesses:arr,
          detailid:this.technologyRow.id
        };
        this.$http.post('/detailProcess',data).then(res=>{
           this.$Message.success('保存成功');
           this.technologyInfoShow=false
        })

      },
      getTechnologyList(query){
          this.technologyLoading=true;
          if (query !== '') {
            if(query.length>1){
              let data={clothid:this.technologyRow.clothid,keyword:query};
              this.$http.get('/dict/process',{params:data}).then(res=>{
                this.technologyList = res.data;
                this.technologyLoading=false;
              })
            }else{
              this.technologyLoading=false;
              this.technologyList = [];
            }
          } else {
            this.technologyLoading=false;
            this.technologyList = [];
          }
      },
      //选中时
      selectSure(val){
        if(val){
          for(var i in this.technologyInfo){
            if(this.technologyInfo[i].dictid==JSON.parse(val).dictid){
              this.$Message.error('该工艺已添加')
              this.$nextTick(()=>{
                this.technologySearch='';
              })
              return
            }
          }
          this.technologyInfo.push(
            JSON.parse(val)
          );
          this.$nextTick(()=>{
            this.technologySearch='';
          })
        }
      },
      //删除
      reduceItem(index){
        this.craftDeleteShow=true;
        this.craftDeleteIndex=index;
      },
      craftDeleteSave(){
        this.technologyInfo.splice(this.craftDeleteIndex,1)
        this.craftDeleteShow=false;
      }
    },
  }
</script>
<style lang="scss" scoped>
  .textareaForm{
    .ivu-form-item .ivu-input-wrapper{
      width: 100% !important;
    }
  }
  .searchForm {
    .ivu-row .ivu-form-item{
      width: 266px !important;
    }
    .searchLength .ivu-form-item{
      width: 580px !important;
    }
  }
  .optionStatus{
    margin-top:-4px !important;
  }
  #pictrue{
    width: 100%;
    padding: 15px;
    overflow: auto;
    li{
      width: 150px;
      height: 150px;
      border: 1px solid #dddddd;
      margin: 5px 5px;
      float: left;
      position: relative;
      .closeTip{
        width: 20px;
        height: 20px;
        border: 1px solid #dddddd;
        border-radius: 100%;
        position: absolute;
        top:-10px;
        left:-10px;
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
  #leftTable{
     height: 100%;
     width: 40%;
     float: left;
     border: 1px solid #dddddd;
    .tabTable{
      height: calc(100% - 50px);
      overflow-y: auto;
    }
    .tabPage{
      .totals{
        text-align: center;
        height: 26px;
        line-height: 26px;
      }
      height: 50px;
    }
  }
  #rightTable{
    height: 100%;
    width: calc(60% - 15px);
    float: right;
    border: 1px solid #dddddd;
    .tabTable{
      height: calc(100% - 50px);
      overflow-y: auto;
    }
    .tabPage{
      .totals{
        text-align: center;
        height: 26px;
        line-height: 26px;
      }
      height: 50px;
    }
  }
  table .blueButton:hover{
    background-color: transparent!important;
  }
  //工艺搜索结果
  .searchResult{
    height: 40px;
    width: 95%;
    border: 1px solid #ccc;
    border-top: none;
    margin: 0 auto;
    input{
      padding: 2px;
      border: 1px solid #ccc;
    }
    &:first-child{
      border-top: 1px solid #ccc;
    }
    .close{
      float: right;
      margin-left: 1%;
      width: 3%;
      font-size: 20px;
      cursor: pointer;
    }
  }
  //标题
  .technologyContent{
    float: left;
    text-align: left;
    height: 40px;
    display: flex;
    align-items: center;
  }

</style>
<style lang="scss">
  //输入框
  .manageDescript textarea{
    font-size: 12px !important;
  }
  #titleSearch .ivu-select-single .ivu-select-selection{
    border: 1px solid #dddee1!important;
  }
  .longSearch .ivu-select-single .ivu-select-selection{
    border: 1px solid #dddee1!important;
  }
  #pictrue div{
    height: 150px;
    width: 150px;
    float: left;
  }
  // .modalContent .ivu-form-item{
  //   width: 350px !important;
  // }
  .manage-wrap .ivu-table-cell{
    padding-left: 0;
    padding-right: 0;
  }
 .manage-wrap #leftTable .ivu-table-row-highlight td{
    background-color: #00b6f1;
    color: white !important;
     span,i,button,div{
       color: white;
     }
  }
  .manage-wrap #leftTable tr.ivu-table-row-hover td{
    background-color: #00b6f1;
    span,i,button,div{
      color: white;
    }
  }
 .textareaDiv {
   .ivu-form-item{
     height: 120px !important;
     width:100% !important;
     .ivu-input-wrapper{
       width: 100% !important;
     }
     textarea.ivu-input{
       height: 117px !important;
       width: 100% !important;
       border: none;
     }
   }
 }
</style>



