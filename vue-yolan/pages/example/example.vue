<template>
  <div class="delivery-wrap spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>
            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>物流中心 /</span>
          <span>物流配送</span>
        </span>
        <span slot="footer" class="com-slot-right">
          <span class="T3 main-heading" @click="caseWHReady"><span class="shade"><span class="colorBox colorBoxOrange" ><i class="iconfont cofont">&#xe668</i></span>仓库维护</span></span>
          <span class="T3 main-heading"@click="WarehouseEditShow=true" ><span class="shade"><span class="colorBox colorBoxGreen"><i class="iconfont cofont">&#xe6cf</i></span>箱型维护</span></span>
          <span class="T3 main-heading" @click="WaybillWHShow=true"><span class="shade"><span class="colorBox colorBoxYellow" ><i class="iconfont cofont">&#xe611</i></span>运单维护</span></span>
          <span class="T3last main-heading" @click="exportDetailShow=true" ><span class="shade"><span class="colorBox colorBoxRed" ><i class="iconfont cofont">&#xe61d</i></span>导出明细</span></span>
        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" label-position="left" inline >
          <Form-item label="订单号" :label-width="60" class="specialCase" >
            <Input ></Input>
          </Form-item>
          <Form-item label="运单号" :label-width="60" class="specialCase" >
            <Input></Input>
          </Form-item>
          <Form-item label="物流单号" :label-width="70" class="specialCase" >
            <Input></Input>
          </Form-item>
          <Form-item label="门店号" :label-width="60" class="specialCase" >
            <Input ></Input>
          </Form-item>
          <Form-item label="电话" :label-width="45" class="specialCase" >
            <Input></Input>
          </Form-item>
          <Form-item class="specialHandling specialButton">
            <Button icon="search" ></Button>
          </Form-item>
          <Form-item label="状态" :label-width="45" class="specialInterval" >
            <Select >
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="快递公司" :label-width="75" class="expressCompany specialInterval" >
            <Select>
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="订单类型" :label-width="75" class="expressCompany specialInterval" >
            <Select>
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="发货日期" :label-width="75" class="selectTime technicalDates specialInterval">
            <Date-picker type="daterange" v-model="shipdate"  :options="date0ptions"></Date-picker>
          </Form-item>

        </Form>
        <div style="clear: both"></div>
        <div id="tableBox" ref="tableBox">
          <Table border :columns="columns" :data="data"></Table>
        </div>
      </div>
    </div>
    <!--仓库维护-->
    <div v-if="caseWHShow">
      <Modal v-model="caseWHShow" class-name="delect modalStyle" :mask-closable=false width="870" v-drag>
        <p slot="header">
          <span class="main-heading">仓库维护</span>
        </p>
        <Form class="searchForm" label-position="left" inline>
          <Form-item label="公司名称" :label-width="70"  class="companyName">
            <Input ></Input>
          </Form-item>
          <Form-item label="快递公司" :label-width="70">
            <Select>
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="是否启用" :label-width="70" class="location">
            <Select>
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span class="lock"></span>
          </Form-item>
          <Form-item label="联系人" :label-width="60" >
            <Input></Input>
          </Form-item>
          <Form-item class="modalSearch">
            <Button icon="search" class="subject-color white-text" ></Button>
          </Form-item>
          <Form-item class="dateAdd">
            <Button class="add-colour white-text" @click="caseWHInfoAddShow=true"  >新增</Button>
          </Form-item>
        </Form>
        <div class="modalBody maintenance">
          <Table stripe border :columns="caseWHTable" :data="caseWHInfo"></Table>
        </div>
        <div slot="footer">
          <div class="footPage">
            <div class="fl assist-text">
              <span>共</span>
              <span class="green-text"> 100 </span>
              <span>条记录 1/10 页</span>
            </div>
            <div class="fr" >
              <Page></Page>
            </div>
          </div>
        </div>
      </Modal>
    </div>
    <!--新增-->
    <div v-if="caseWHInfoAddShow">
      <Modal v-model="caseWHInfoAddShow" class-name="delect big-sized" :mask-closable=false  width="870" v-drag>
        <p slot="header">
          <span class="main-heading">新增快递仓库信息</span>
        </p>
        <Form ref="caseWHInfoAdd" class="searchForm" label-position="right" inline style="text-align: left;padding: 0" :rules="ruleCase">
          <Form-item prop="company" label="公司名称"   :label-width="75" >
            <Input></Input>
          </Form-item>
          <Form-item prop="express"  label="快递公司"  :label-width="75">
            <Select>
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item prop="contact"  label="联系人" :label-width="75" >
            <Input></Input>
          </Form-item>
          <Form-item prop="tel"  label="电话"  :label-width="75">
            <Input></Input>
          </Form-item>
          <Form-item prop="address"  label="详细地址"  :label-width="75">
            <Input></Input>
          </Form-item>
          <Form-item prop="pName"  label="省份" :label-width="75" >
            <Input></Input>
          </Form-item>
          <Form-item prop="city"  label="城市" :label-width="75" >
            <Input></Input>
          </Form-item>
          <Form-item prop="area"  label="城市代码" :label-width="75" >
            <Input></Input>
          </Form-item>
          <Form-item prop="username"  label="账号"  :label-width="75">
            <Input></Input>
          </Form-item>
          <Form-item prop="pwd"  label="密码"  :label-width="75">
            <Input type="password"></Input>
          </Form-item>
          <Form-item prop="cardNo" label="月结卡号"  :label-width="75">
            <Input></Input>
          </Form-item>
          <Form-item prop="taxAccount" label="关税号"  :label-width="60">
            <Input></Input>
          </Form-item>
          <Form-item prop="payAccount" label="支付账号"  :label-width="75">
            <Input></Input>
          </Form-item>
          <Form-item prop="taxAccountZipcode" label="关税账号所在地邮编:"  :label-width="131">
            <Input></Input>
          </Form-item>
          <Form-item prop="taxAccountCity" label="关税账号所在地城市:"  :label-width="131">
            <Input></Input>
          </Form-item>
          <Form-item prop="payAccountZipcode" label="支付账号所在地邮编:" :label-width="131">
            <Input></Input>
          </Form-item>
          <Form-item prop="payAccountCity" label="支付账号所在地城市:"  :label-width="131">
            <Input></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="clear ripples"  style="margin-bottom: 15px">清空</Button>
          <Button class="save ripple"  style="margin-bottom: 15px">保存</Button>
        </div>
      </Modal>
    </div>
    <!--运单维护-->
    <div v-if="WaybillWHShow">
      <Modal v-model="WaybillWHShow" class-name="delect" :mask-closable=false  width="480" v-drag>
        <p slot="header">
          <span class="main-heading">运单维护</span>
        </p>
        <div class="WaybillWH">
          <Row>
            <i-col style="height: 60px;width: 310px;margin: 24px auto 20px;text-align: center;">
              <Button class="Waybill">
                <i class="iconfont icon-tijiao"></i>
                <span >导出模板</span>
              </Button>
            </i-col>
            <i-col style="height: 40px;width: 310px;margin: 0 auto;text-align: center">
              <Upload  style="display: inline-block" >
                <Button class="Waybill" style="height: 60px;width: 310px;margin: 0 auto;text-align: center;">
                  <i class="iconfont icon-wenjian"></i>
                  <span>上传文件</span>
                </Button>
              </Upload>
            </i-col>
            <p style="text-align: center;color: #9ea7b4;padding-top: 30px;padding-bottom: 19px">只能导入Excel表格，包含.xls和xlsx类型</p>
          </Row>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
    <!--箱型修改-->
    <div v-if="WarehouseEditShow">
      <Modal v-model="WarehouseEditShow" class-name="delect entrepot" :mask-closable=false  width="480" v-drag>
        <p slot="header">
          <span class="main-heading">箱型修改</span>
        </p>
        <Form ref="WarehouseEdit" class="searchForm" label-position="left" inline style="text-align: left;padding:15px 60px 0">
          <Form-item prop="name" label="箱名:" :label-width="70" >
            <Input></Input>
          </Form-item>
          <Form-item prop="bLength"  label="长度:" :label-width="70" >
            <Input></Input>
          </Form-item>
          <Form-item prop="bWidth"  label="宽度:" :label-width="70" >
            <Input></Input>
          </Form-item>
          <Form-item prop="bHeight"  label="高度:" :label-width="70" >
            <Input></Input>
          </Form-item>
          <Form-item prop="bWeight"  label="重量:" :label-width="70" >
            <Input></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="clear">清空</Button>
          <Button class="save">保存</Button>
        </div>
      </Modal>
    </div>
    <!--详情-->
    <div v-if="detailsModalShow">
      <Modal v-model="detailsModalShow"  width="870" class-name="delectNopad" :mask-closable=false  v-drag >
        <p slot="header">
          <span class="main-heading">详情</span>
        </p>
        <div class="modalContent" style="text-align:center">
          <h4>基本信息</h4>
          <Form class="basicForm searchForm"   inline style="text-align: left">
            <Row class="detailRow">
              <i-col span="8">
                <Form-item label="物流单号:">
                  <span class="borderSpan">123</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="运单号">
              <span  class="borderSpan" style="color: #37b3b3">
                <span>fda</span>
              </span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="状态:">
                  <span class="borderSpan">sadsa</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="创建日期:">
                  <span class="borderSpan">1414</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="发货日期:">
                  <span class="borderSpan">14142</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="提货单号:">
                  <span class="borderSpan">3223</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="揽件日期:">
                  <span class="borderSpan">1232131</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="签收日期:">
                  <span class="borderSpan">13213</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="确认收货日期:">
                  <span class="borderSpan">dgfdg</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="操作时间:">
                  <span class="borderSpan">dsdfh</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="确认收货IP:">
                  <span class="borderSpan">sfsd</span>
                </Form-item>
              </i-col>
            </Row>
          </Form>
          <h4>地址信息</h4>
          <Form class="basicForm searchForm"   inline style="text-align: left">
            <Row class="detailRow">
              <i-col span="8">
                <Form-item label="快递公司:">
                  <span class="borderSpan">gfdgd</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="发货方式:">
                  <span class="borderSpan">sdfs</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="邮政编码:">
                  <span class="borderSpan">sdfdsf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="公司:">
                  <span class="borderSpan">dsfdsf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="联系人:">
                  <span class="borderSpan">sdafsadf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="手机号码:">
                  <span class="borderSpan">afddsf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="国家:">
                  <span class="borderSpan">afddsfdsf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="州(省):">
                  <span class="borderSpan">adfdsfdsf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="城市:">
                  <span class="borderSpan">sdfsfs</span>
                </Form-item>
              </i-col>
              <i-col span="24">
                <Form-item label="详细地址:">
                  <span class="borderSpan" style="width:86.5%;text-align: left">dgdsgd</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="付款方式:">
                  <span class="borderSpan">asfddsaf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="付款帐号:">
                  <span class="borderSpan">adfsf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="帐号所在地邮编:">
                  <span class="borderSpan">asfddsfdsf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="关税支付方式:">
                  <span class="borderSpan">ghkhgk</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="关税支付账户:">
                  <span class="borderSpan">khgkguyu</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="关税所在地邮编:">
                  <span class="borderSpan">fdhgfdhrjuh</span>
                </Form-item>
              </i-col>
              <i-col span="24">
                <Form-item label="备注:">
                  <span class="borderSpan" style="width:86.5%;text-align: left">ewqrfdsfdsf</span>
                </Form-item>
              </i-col>
            </Row>
          </Form>
          <h4>订单信息</h4>
          <Form class="basicForm searchForm"   inline style="text-align: left;padding: 0">
            <Row class="detailRow" style="padding: 30px 10px 0!important;">
              <Table border :columns="orderInfo" :data="orderInfoData"></Table>
              <div class="footPage" style="width: 100%;height: 60px;padding: 0 10px">
                <div class="fl" style="height: 60px;line-height: 60px;font-size: 12px">
                  <span>共</span>
                  <span style="color: #37b3b3"> 100 </span>
                  <span>条记录 1/10 页</span>
                </div>
                <div class="fr" style="line-height: 60px">
                  <Page></Page>
                </div>
              </div>
            </Row>
          </Form>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
    <!--删除-->
    <div v-if="deleteModal">
      <Modal v-model="deleteModal"class-name="deleteModel" :mask-closable=false  width="600" v-drag>
        <p slot="header" class="main-heading">
          提示框
        </p>
        <div>
          <Icon type="information-circled"></Icon>确认删除此条信息吗？
          <!--<i class="iconfont prompt" style="color: #f00;padding-right: 10px">&#xe615</i>确认删除?-->
        </div>
        <div slot="footer">
          <div class="footer">
            <Button  class="save">确认</Button>
            <Button  class="clear">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!--物流详情-->
    <div v-if="logisticsModalShow">
      <Modal  v-model="logisticsModalShow" :transfer="false" width="870" class-name="delectNopad" :mask-closable=false  v-drag >
        <p slot="header" style="text-align: left">
          <span class="main-heading">物流详情</span>
        </p>
        <div class="modalContent" style="text-align:left">
          <h4>物品信息
            <!--<Button type="text" class="goodsBack" @click="overrule()"><i class="iconfont">&#xe605</i>驳回</Button>-->
            <!--<Button type="text" class="goodsTo stockUp" ><i class="iconfont">&#xe66c</i>发货</Button>-->
            <!--<Button type="text" class="goodsBack" ><i class="iconfont">&#xe66c</i>取消发货</Button>-->
            <span class="T3 main-heading fr" @click="overrule()"><span class="shade"><span class="colorBox colorBoxRed"><i class="iconfont cofont">&#xe605</i></span>驳回</span></span>
            <span class="T3 main-heading fr"><span class="shade"><span class="colorBox colorBoxOrange"><i class="iconfont cofont">&#xe62c</i></span>备货</span></span>
            <span class="T3 main-heading fr"><span class="shade"><span class="colorBox colorBoxOrange"><i class="iconfont cofont">&#xe62c</i></span>外贸备货</span></span>
            <span class="T3 main-heading fr"><span class="shade"><span class="colorBox colorBoxOrange"><i class="iconfont cofont">&#xe62c</i></span>瑞璞备货</span></span>
            <span class="T3 main-heading fr"><span class="shade"><span class="colorBox colorBoxOrange"><i class="iconfont cofont">&#xe62c</i></span>凯妙备货</span></span>
            <span class="T3 main-heading fr"><span class="shade"><span class="colorBox colorBoxOrange"><i class="iconfont cofont">&#xe62c</i></span>电商备货</span></span>
            <!--<Button type="text" class="goodsTo stockUp"><i class="iconfont">&#xe62c</i>备货</Button>-->
            <!--<Button type="text" class="goodsTo" ><i class="iconfont">&#xe62c</i>外贸备货</Button>-->
            <!--<Button type="text" class="goodsTo" ><i class="iconfont">&#xe62c</i>瑞璞备货</Button>-->
            <!--<Button type="text" class="goodsTo" ><i class="iconfont">&#xe62c</i>凯妙备货</Button>-->
            <!--<Button type="text" class="goodsTo" ><i class="iconfont">&#xe62c</i>电商备货</Button>-->
          </h4>
          <Form ref="shippingDetailsInfo" class="basicForm goodsRow" :label-width=75  inline style="text-align: left;padding:30px 2px 20px 10px;" :rules="mustFillIn">
            <Form-item label="快递仓库" prop="storage">
              <Select  >
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <Form-item label="快递公司" style="background: #f3f3f3">
              <Select  disabled>
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <Form-item label="快递方式" style="background: #f3f3f3">
              <Input  disabled></Input>
            </Form-item>
            <Form-item label="箱号选择" prop="box">
              <Select>
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <Form-item label="包裹重量" prop="weight">
              <Input class="handWeight"></Input>
            </Form-item>
            <Form-item label="总货值" prop="totalPrice" >
              <Input class="handWeight"></Input>
            </Form-item>

            <Form-item label="支付方式" style="background: #f3f3f3">
              <Input  disabled></Input>
            </Form-item>
            <Form-item label="关税类型" style="background: #f3f3f3">
              <Input disabled></Input>
            </Form-item>
            <Form-item prop="payAccount" label="支付账号" >
              <Input ></Input>
            </Form-item>
            <Form-item prop="payAccountZipcode" label="支付邮编" >
              <Input ></Input>
            </Form-item>
            <Form-item prop="payAccountCity" label="运费国家" >
              <Input ></Input>
            </Form-item>
            <Form-item prop="taxAccount" label="关税账号">
              <Input></Input>
            </Form-item>
            <Form-item prop="taxAccountZipcode" label="关税邮编">
              <Input></Input>
            </Form-item>
            <Form-item prop="price" label="价格">
              <Tooltip content="青岛地区请手动计算" placement="right">
                <Input></Input>
              </Tooltip>
            </Form-item>
            <Form-item prop="taxAccountCity" label="关税城市" >
              <Input></Input>
            </Form-item>
          </Form>
          <h4>物流信息</h4>
          <Form class="basicForm" :label-width=75  inline style="text-align: left">
            <Row class="detailRow">
              <i-col span="8">
                <Form-item label="提货类型" >
                  <span class="borderSpan" style="width: 90%;">qwe</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="订单前缀">
                  <span class="borderSpan" style="width: 90%;">qe</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="门店号">
                  <span class="borderSpan" style="width: 90%;">qewe</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="手机号">
                  <span class="borderSpan" style="width: 90%;">dfdsf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="发货时间">
                  <span class="borderSpan" style="width: 90%;">adfdsf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="姓名">
                  <span class="borderSpan" style="width: 90%;">adfsf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="公司名称">
                  <span class="borderSpan" style="width: 90%;">adfsafdsf</span>
                </Form-item>
              </i-col>
            </Row>
          </Form>
          <h4>收货信息</h4>
          <Form class="basicForm" :label-width=75  inline style="text-align: left">
            <Row class="detailRow">
              <i-col span="8">
                <Form-item label="国家">
                  <span class="borderSpan" style="width: 90%;">adfsadf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="省份">
                  <span class="borderSpan" style="width: 90%;">adfdsafds</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="城市">
                  <span class="borderSpan" style="width: 90%;">adfsadfdsf</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="地区">
                  <span class="borderSpan" style="width: 90%;">zcvcxv</span>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="详细地址">
                  <span class="borderSpan" style="width: 90%;">cxvcxv</span>
                </Form-item>
              </i-col>
            </Row>
          </Form>
          <h4>发货明细
            <Button type="text" class="goodsTo" ><i class="iconfont">&#xe61d</i>导出</Button>
            <Button type="text" class="goodsTo" ><i class="iconfont" >&#xe61d</i>导入箱号信息</Button>
          </h4>
          <div class="goodsTable">
            <Table border :columns="orderInfo" :data="orderInfoData"></Table>
            <div class="footPage" style="width: 100%;height: 60px;padding: 0 10px">
              <div class="fl" style="height: 60px;line-height: 60px;font-size: 12px">
                <span>共</span>
                <span style="color: #37b3b3"> 100 </span>
                <span>条记录 1/10 页</span>
              </div>
              <div class="fr" style="line-height: 60px">
                <Page  ></Page>
              </div>
            </div>
          </div>
          <h4>备注信息</h4>
          <div class="remarks" >wqwdwqwd</div>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
    <!--驳回-->
    <div v-if="rebutModel">
      <Modal v-model="rebutModel" class-name="delect rejectStyle" :mask-closable=false  width="480" v-drag>
        <p slot="header" class="main-heading" style="text-align:left">
          驳回原因
        </p>
        <Input type="textarea" :rows="5" ></Input>
        <div slot="footer">
          <Button type="primary" class="clear">取消</Button>
          <Button type="primary" class="save">提交</Button>
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
      // 验证手机号
      const telCheck = (rule, value, callback) =>{
        if(!value){
          callback(new Error('请输入电话号'));

        }else if(!(/^[0-9+-][0-9+-]*$/).test(value) || value.length > 20){
//          !(/^1[3|5][0-9]\d{4,8}$/.test(value))
          callback(new Error('请输入正确的电话号'));
        }else{
          callback();
        }
      }
      const expressRule = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择快递公司'));
        }else{
          callback();
        }
      };
      const provinceRule = (rule, value, callback) => {
        if (value) {
          callback();
        }else{
          return callback(new Error('请填写省份'));
        }
      };
      return {
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        //table
        columns: [
          {
            title: '序号',
            width:'4%',
            type:'index',
            align: 'center',
          },
          {
            title: '物流编号',
            width:'18%',
            key: 'code',
            align: 'center',
          },
          {
            title: '姓名',
            width:'8%',
            key: 'salesMan',
            align: 'center',
          },
          {
            title: '用户',
            width:'8%',
            key: 'username',
            align: 'center',
          },
          {
            title: '发货日期',
            width:'12%',
            key: 'shipdate',
            align: 'center',
          },
          {
            title: '快递公司',
            width:'7%',
            key: 'express',
            align: 'center',
          },
          {
            title: '创建日期',
            width:'13%',
            key: 'createTime',
            align: 'center',
          },
          {
            title: '状态',
            width:'6%',
            key: 'status',
            align: 'center',
          },
          {
            title: '操作',
            width:'24%',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    class: 'blueButton',
                    style: {
                      background:"#fff",
                    },
                    on: {
                      click: () => {
                        this.logisticsModalShow=true;
                      }
                    }
                  },
                  [
                    h('i',{
                      class:' iconfont icon-88'
                    }),
                    h('span',{
                    },'报关单')
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
                        this.detailsModalShow=true;
                      }
                    }
                  },
                  [
                    h('i',{
                      class:'iconfont  icon-chakan',
                    }),

                    h('span',{
                    },'查看')
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
                        this.deleteModal=true;
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
                ///////////////////

                h('Button', {
                    class: 'darkBlueButton',
                    style:{
                      background:"#fff",
                      marginLeft: '8px',
                    },
                  },[
                    h('i',{
                      class:'iconfont icon-qianming'
                    }),
                    h('span',{

                    },'查看签名')
                  ]
                ),
                ////////////
              ]);
            }
          }
        ],
        data: [{}],
        //仓库维护
        caseWHShow:false,
        caseWHInfoAddShow:false,
        WaybillWHShow:false,
        WarehouseEditShow:false,
        detailsModalShow:false,
        deleteModal:false,
        logisticsModalShow:false,
        rebutModel:false,
        //仓库维护table
        caseWHTable: [
          {
            title: '序号',
            key: 'index',
            type:'index',
            width:'5%',
          },
          {
            title: '公司名称',
            key: 'company',
            width:'14%',
          },
          {
            title: '联系人',
            width:'6%',
            key: 'contact',
          },
          {
            title: '电话',
            width:'10%',
            key: 'tel',
          },
          {
            title: '省份',
            width:'10%',
            key: 'pName',
          },
          {
            title: '城市',
            width:'10%',
            key: 'city',
          },
          {
            title: '账号',
            width:'14%',
            key: 'username',
          },
          {
            title: '快递公司',
            width:'10%',
            key: 'expressName',
          },
          {
            title: '状态',
            width:'6%',
            key: 'status',
          },
          {
            title: '操作',
            width:'15%',
            key: 'action',
            align: 'center',
          }
        ],
        caseWHInfo:[],
        //仓库维护必填项
        ruleCase: {
          company: [
            { required: true, message: '请填写公司名称', trigger: 'blur' },
            { max:100,message: '公司名称最大长度不能超过100位', trigger: 'blur'}
          ],
          express: [
            {validator: expressRule, required: true, message: '请填写快递公司', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '请填写联系人', trigger: 'blur' },
            { max:40,message: '联系人最大长度不能超过40位', trigger: 'blur'}
          ],
          tel: [
            {required:true , validator:telCheck, trigger:'blur'}
          ],
          address: [
            { required: true, message: '请填写详细地址', trigger: 'blur' },
            { max:200,message: '详细地址最大长度不能超过200位', trigger: 'blur'}
          ],
          pName: [
            {validator:provinceRule, required: true, message: '请填写省份', trigger: 'blur' },
            { max:50,message: '省份最大长度不能超过50位', trigger: 'blur'}
          ],
          city: [
            { required: true, message: '请填写城市代码', trigger: 'blur' },
            { max:50,message: '城市代码最大长度不能超过50位', trigger: 'blur'}
          ],
          area: [
            { required: true, message: '请填写城市', trigger: 'blur' },
            { max:50,message: '城市最大长度不能超过50位', trigger: 'blur'}
          ],
          username: [
            { required: true, message: '请填写账号', trigger: 'blur' },
            { max:50,message: '账号最大长度不能超过50位', trigger: 'blur'}
          ],
          pwd: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { max:20,message: '密码最大长度不能超过20位', trigger: 'blur'}
          ],
          cardNo:[
            { max:50,message: '月结卡号最大长度不能超过50位', trigger: 'blur'}
          ],
          taxAccount: [
            { max:50,message: '关税账号最大长度不能超过50位', trigger: 'blur'}
          ],
          payAccount: [
            { max:50,message: '支付账号最大长度不能超过50位', trigger: 'blur'}
          ],
          taxAccountZipcode: [
            { max:10,message: '关税账号所在地邮编长度不能超过10位', trigger: 'blur'}
          ],
          taxAccountCity: [
            { max:50,message: '关税账号所在地城市长度不能超过50位', trigger: 'blur'}
          ],
          payAccountZipcode: [
            { max:10,message: '支付账号所在地邮编长度不能超过10位', trigger: 'blur'}
          ],
          payAccountCity: [
            { max:50,message: '支付账号所在地城市长度不能超过50位', trigger: 'blur'}
          ],
        },
        //物流详情必填
        mustFillIn:{
          payAccountZipcode:[
            { required: true, message: '请填写公司名称', trigger: 'blur' },
          ],
        },
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
        //发货日期
        shipdate:[],
        //详情中的订单信息 table
        orderInfoData:[],
        orderInfo:[
          {
            title: '序号',
            width:'5%',
            key: 'index',
          },
          {
            title: '订单名',
            width:'15%',
            key: 'orderid',
          },
          {
            title: '客户名/品名',
            width:'15%',
            key: 'customer',
          },
          {
            title: '箱号',
            width:'5%',
            key: 'boxno',
          },
          {
            title: '价格',
            width:'15%',
            key: 'price',
          },
          {
            title: '数量',
            width:'10%',
            key: 'categoryCount',
          },
          {
            title: '原订单',
            width:'15%',
            key: 'originOrder',
          },
          {
            title: '类型',
            width:'5%',
            key: 'orderType',
          },
          {
            title: '订单交期',
            width:'15%',
            key: 'orderDeliveryDate',
          },
        ],
      }
    },
    mounted(){
    },
    methods: {

      //仓库维护数据
      caseWHReady() {
        this.caseWHShow = true;
      },
      //打开驳回弹窗
      overrule(){
        this.rebutModel = true;
      }
    },
  }
</script>
<style lang="scss">
  ////搜索样式
  .searchStyle{
    position: relative;
    input{
      outline: 0;
      border: 0;
      height: 25px;
      line-height: 25px;
      color: #657180;
    }
    .ivu-form-item{
      border: 1px solid #dddee1;
      height:32px;
      width: calc(19.4% - 16px);
      margin-right: 11px !important;
      border-radius: 3px;
      margin-bottom: 16px;
      .ivu-form-item-label{
        line-height: 28px;
        color: #666;
        padding: 0 0 0 16px !important;
        font-weight: 100;
      }
      .ivu-form-item-content{
        line-height: 27px;
        padding-right: 1px;
        .ivu-select{
          text-align: left;
        }
        .ivu-date-picker{
          line-height: 27px;
          .ivu-select-dropdown{
            left:-137px !important
          }
        }
        .ivu-select-placeholder{
          line-height: 25px !important;
        }
        .ivu-select-selection{
          border:0;
          height: 25px !important;
          color: 	#657180;
          .ivu-select-selected-value{
            height: 30px !important;
            line-height: 25px !important;
          }
        }
        .ivu-select-visible .ivu-select-selection{
          box-shadow: none;
        }
        .ivu-select-visible{
          .ivu-select-dropdown{
            width: calc(100% + 45px) !important;
            left: -45px !important;
          }
        }
        .ivu-select-single{
          .slide-up-leave-active{
            width: calc(100% + 45px) !important;
            left: -45px !important;
          }
          .slide-up-leave-to{
            width: calc(100% + 45px) !important;
            left: -45px !important;
          }
        }
      }
      .ivu-input-group-prepend{
        background: #fff;
        border: 0;
      }
      .ivu-date-picker{
        float: right;
        .ivu-input-icon{
          line-height: 27px;
        }
      }
    }
    .specialCase{
      margin-bottom: 10px;
    }
    //两行时第二行间距调整
    .specialInterval {
      margin-top: -32px;
    }
    .expressCompany{
      .ivu-form-item-content{
        .ivu-select-visible{
          .ivu-select-dropdown{
            width: calc(100% + 75px) !important;
            left: -75px !important;
          }
        }
        .ivu-select-single{
          .slide-up-leave-active{
            width: calc(100% + 75px) !important;
            left: -75px !important;
          }
          .slide-up-leave-to{
            width: calc(100% + 75px) !important;
            left: -75px !important;
          }
        }
      }
    }
    .selectTime{
      width:calc(38.8% - 16px);
      .ivu-date-picker{
        width: 95%;
      }
    }
    .ivu-form-item:hover{
      border-color: #66afe9;
    }
    .ivu-input:focus{
      border-color: #dddee1;
      outline: 0;
      box-shadow: none;
    }
    .specialHandling{
      border: 1px solid #ddd;
      width: 3%;
      height: 32px;
      margin: 0 !important;
      .ivu-btn{
        border: 0;
        width: 100%;
        height: 30px;
        background-color: #fff;
        padding: 0;
        i{
          font-size: 16px;
        }
      }
      .ivu-btn:hover{
        color:#3153ff;
      }
    }
    .specialButton{
      text-align: center;
      //position: absolute;
      //right: 0;
      //top: 16px;
      height: 75px;
      font-size: 18px;
      width: 3%;
      border: 1px solid #e9eaec;
      .ivu-form-item-content{
        button{
          width: 100%;
          height: 70px;
        }
      }
    }
    .technicalDates{
      .ivu-form-item-content{
        .ivu-date-picker{
          .ivu-select-dropdown{
            left:-167px !important
          }
        }
      }
    }
    .otherDates{
      .ivu-form-item-content{
        .ivu-date-picker{
          .ivu-select-dropdown{
            left:-99px !important
          }
        }
      }
    }
    .specialDates{
      .ivu-form-item-content{
        .ivu-date-picker{
          .ivu-select-dropdown{
            left:40px !important
          }
        }
      }
    }
  }

  #tableBox{
    overflow-y: auto;
    border:1px solid #e9eaec;
    .ivu-table-wrapper{
      border:0;
      .ivu-table-stripe::after{
        width: 0;
      }
      .ivu-table-border td{
        border-right: 0;
      }
    }
  }

  ////table表格标题及字体颜色
  .ivu-table-wrapper{
    .ivu-table{
      .ivu-table-header{
        th{
          text-align: center;
          height: 34px;
          border-right: 0px;
        }
        .ivu-table-cell{
          color: #464c5b;
        }
      }
      .ivu-table-tbody{
        .ivu-table-row{
          td{
            //height: 44px;
            height: 37px;
            border-right: 0px;
          }
          .ivu-table-cell{
            color: 	#657180;
          }
        }
        .ivu-table-row:hover{
          .blueButton{
            background: #ebf7ff!important;
          }
          .greenButton{
            background: #ebf7ff!important;
          }
          .yellowButton{
            background: #ebf7ff!important;
          }
          .darkBlueButton{
            background: #ebf7ff!important;
          }
        }
      }
    }
  }
  .delivery-wrap .ivu-table-cell,.delivery-wrap th,.delivery-wrap span{
    padding: 0;
    text-align: center;
  }

  //对话框样式
  .modalStyle{
    .ivu-modal-header{
      border-top-right-radius: 6px;
      border-top-left-radius: 6px;
      background: #fff;
      border-bottom: 1px solid #E1E1E1;
      padding: 10px 20px;
    }
    .ivu-modal-body{
      padding: 0 !important;
      input{
        text-align: right;
        outline: 0;
        border: 0;
        height: 25px;
        line-height: 25px;
        color: #657180;
      }
      form{
        width: 100%;
        padding: 30px 20px;
        .ivu-form-item-content{
          .ivu-input-wrapper{
            width: 100%;
          }
          .ivu-select{
            width: 100%;
          }
        }
      }
      .ivu-form-item{
        border: 1px solid #dddee1;
        height:30px;
        width: 16%;
        margin-right: 5px !important;
        border-radius: 3px;
        margin-bottom: 0;
        .ivu-form-item-label{
          line-height: 28px;
          color: #9ea7b4;
          padding: 0 0 0 10px !important;
          font-weight: 100;
        }
        .ivu-form-item-content{
          line-height: 27px;
          padding-right: 1px;
          .ivu-select{
            text-align: center;
            vertical-align: top;
          }
          .ivu-date-picker{
            line-height: 27px;
            .ivu-select-dropdown{
              left:-137px !important
            }
          }
          .ivu-select-selection{
            border:0;
            height: 27px;
            color: 	#657180;
            .ivu-select-selected-value{
              text-align: right !important;
              height: 28px;
              line-height: 28px;
            }
          }
          .ivu-select-visible .ivu-select-selection{
            box-shadow: none;
          }
          .ivu-select-visible{
            .ivu-select-dropdown{
              width: calc(100% + 70px) !important;
              left: -70px !important;
            }
          }
          .ivu-select-single{
            .slide-up-leave-active{
              width: calc(100% + 70px) !important;
              left: -70px !important;
            }
            .slide-up-leave-to{
              width: calc(100% + 70px) !important;
              left: -70px !important;
            }
          }
        }
        .ivu-input-group-prepend{
          background: #fff;
          border: 0;
        }
        .ivu-date-picker{
          float: right;
          .ivu-input-icon{
            line-height: 27px;
          }
        }
      }
      .ivu-form-item:hover{
        border-color: #66afe9;
      }
      .ivu-input:focus{
        border-color: #dddee1;
        outline: 0;
        box-shadow: none;
      }
      .modalSearch{
        border: 0;
        margin: 0 !important;
        width: 30px;
        height: 30px;
        .ivu-btn{
          border: 0;
          padding: 0;
          width: 100%;
          height: 30px;
          i{
            font-size: 16px;
          }
        }
        .ivu-btn:hover{
          color:#37b3b3
        }
      }
      .dateAdd{
        border: 0;
        width: 58px;
        margin: 0 !important;
        .ivu-btn{
          border: 0;
          padding: 0;
          width: 100%;
          height: 30px;
          i{
            font-size: 16px;
          }
        }
        .ivu-btn:hover{
          background: #EDC36C;
          color: #fff;
        }
      }
      .companyName{
        width:calc(32% + 10px);
      }
    }
    .ivu-modal-content{
      .ivu-modal-close{
        top:4px;
      }
    }
    .ivu-modal-footer{
      height: 50px;
      line-height: 50px;
      padding: 0 20px !important;
    }
  }

  //大型弹框870X580全是输入框的样式
  .big-sized{
    input{
      outline: 0;
      border: 0;
      height: 27px;
      line-height: 28px;
      color: #657180;
    }
    .ivu-form-item{
      width: 272px;
      height: 30px;
      border: 1px solid #eee;
      margin-bottom: 10px;
      margin-right: 4px;
      label{
        padding-left: 10px!important;
        color: #9ea7b4;
        text-align: left;
        line-height: 8px;
      }
      .ivu-select{
        vertical-align: top;
        color: #657180;
        .ivu-select-selection{
          outline: 0;
          border: 0;
          height: 28px;
          line-height: 28px;
          color: #657180;
        }
      }
      .ivu-input-wrapper{
        vertical-align: top;
      }
    }
    .ivu-form-item:hover{
      border-color: #44bfb7;
    }
    .ivu-input:focus{
      border-color: #dddee1;
      outline: 0;
      box-shadow: none;
    }
    .ivu-form-item-error{
      border-color: #f00;
      .ivu-input{
        border: 0;
      }
    }
    .ivu-select-visible .ivu-select-selection{
      outline: 0;
      box-shadow: none;
      border: 0;
    }
    .ivu-modal-body{
      padding: 30px 10px !important;
      border-bottom: 1px solid #e1e1e1;
    }
    .ivu-form-item-error-tip{
      padding: 10px;
      background: rgba(255,120,105,0.8);
      //left: 202px;
      color: #fff;
      top: -3px;
      display: inline-block;
      white-space: nowrap;
      z-index: 1;
    }
    .ivu-form-item-error-tip::before{
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-right: 6px solid rgba(255,120,105,0.8);
      border-bottom: 6px solid transparent;
      left: -6px;
    }
  }

  //中型弹窗宽度480全是输入框的样式
  .entrepot{
    input{
      outline: 0;
      border: 0;
      height: 27px;
      line-height: 28px;
      color: #657180;
    }
    .ivu-form-item{
      width: 306px;
      height: 30px;
      border: 1px solid #eee;
      margin-bottom: 10px;
      label{
        padding-left: 10px!important;
        color: #9ea7b4;
        line-height: 8px;
      }
      .ivu-select{
        vertical-align: top;
        color: #657180;
        .ivu-select-selection{
          outline: 0;
          border: 0;
          //height: 28px;
          line-height: 28px;
          color: #657180;
        }
      }
      .ivu-input-wrapper{
        vertical-align: top;
      }
    }
    .ivu-form-item:hover{
      border-color: #44bfb7;
    }
    .ivu-input:focus{
      border-color: #dddee1;
      outline: 0;
      box-shadow: none;
    }
    .ivu-form-item-error{
      border-color: #f00;
      .ivu-input{
        border: 0;
      }
    }
    .ivu-select-visible .ivu-select-selection{
      outline: 0;
      box-shadow: none;
      border: 0;
    }
    .ivu-modal-body{
      padding: 0 !important;
      .ivu-form{
        padding: 30px 80px;
        border-bottom: 1px solid #e1e1e1;
      }
    }
  }

  /*必填星号*/
  .ivu-modal-wrap{
    .ivu-form-item-required{
      .ivu-form-item-label:before{
        content:'';
      }
      .ivu-form-item-content:after{
        content:'*';
        font-size: 12px;
        font-family: SimSun;
        color: #f30;
        position: absolute;
        top:-3px;
      }
      .ivu-form-item-content{
        .ivu-input-wrapper, .ivu-input-type{
          width:90%;
        }
        .ivu-select{
          width: 90%;
        }
        .ivu-date-picker{
          vertical-align: top;
          width: 90%;
          .ivu-date-picker-editor{
            width:100%;
          }
        }
      }
    }
    .ivu-form-item{
      .ivu-input-wrapper{
        width: 90%;
      }
    }
  }

  /*运单维护*/
  .Waybill{
    background-color: white;
    color: #7a7676;
    width: 100%;
    height: 100%;
    border: 1px dashed #efefef;
    border-radius: 8px;
    i{
      font-size:30px;
      padding-right: 10px;
      color: #42beb6;
      vertical-align: middle;
    }
    span{
      color: #657180;
      font-size: 15px;
      font-weight: 600;
      vertical-align: middle;
    }
  }
  .Waybill:hover{
    border: 1px dashed #37b3b3;
    color: #37b3b3;
    background: #f0faf9;
  }

  //浅蓝色按钮
  table .blueButton{
    padding: 0;
    border: 0;
    position: relative;
    margin-right: 8px;
    span{
      font-size: 12px;
      line-height: 14px;
      color: #00b6f1;
    }
    i{
      margin-right: 5px;
      color: #00b6f1;
      font-size: 12px;
    }
  }
  table .blueButton::after{
    position: absolute;
    content: '';
    width: 1px;
    height:14px;
    background: #ccc;
    right: -8px;
    top: 2px;
  }
  //绿色按钮
  table .greenButton{
    padding: 0;
    border: 0;
    margin-right: 8px;
    span{
      font-size: 12px;
      line-height: 14px;
      color: #43bfb7;
    }
    i{
      margin-right: 5px;
      color: #43bfb7;
      font-size: 12px;
    }
  }
  //黄色按钮
  table .yellowButton{
    padding: 0;
    border: 0;
    position: relative;
    span{
      font-size: 12px;
      line-height: 14px;
      color: #ff9901;
    }
    i{
      margin-right: 5px;
      color: #ff9901;
      font-size: 12px;
    }
  }
  table .yellowButton::before{
    position: absolute;
    content: '';
    width: 1px;
    height:14px;
    background: #ccc;
    left: -8px;
    top: 2px;
    display: inline-block;
    opacity: 1;
  }
  //深蓝色按钮
  table .darkBlueButton{
    padding: 0;
    border: 0;
    position: relative;
    span{
      font-size: 12px;
      line-height: 14px;
      color: #06c;
    }
    i{
      margin-right: 5px;
      color: #06c;
      font-size: 12px;
    }
  }
  table .darkBlueButton::before{
    position: absolute;
    content: '';
    width: 1px;
    height:14px;
    background: #ccc;
    left: -8px;
    top: 2px;
    display: inline-block;
    opacity: 1;
  }

  /*详情中标题样式*/
  .modalContent h4{
    margin-top: 10px;
    height: 38px;
    font-size: 12px;
    color: #464c5b;
    line-height: 38px;
    text-align: left;
    /*background:-webkit-gradient(linear, 0 0, 0 100%, from(#fbfbfb), to(#f5f5f5));*/
    padding: 0 30px;
    /*border: 1px solid #e5eaee;*/
    background: #f9f9f9;
    position: relative;
    .shade{
      padding: 7px 8px;
      border-radius: 15px;
    }
    .T3:hover>.shade{
      background: #F4EEE5;
    }
    .T3{
      cursor: pointer;
      text-decoration: none;
      font-size: 12px;
      display: inline-block;
      margin-right: 10px;
      font-weight: 100;
      margin: 0;
    }
    .T3 span,.com-slot-right span{
      //margin-right: 10px;
    }
    span i{
      font-size:14px;
      color: #fff;
      margin-right: 0px;
      font-weight: 500;
      display: inline-block;
    }
  }
  .modalContent h4:before{
    content: '';
    width: 3px;
    height: 15px;
    position: absolute;
    left: 20px;
    background: #005c7a;
    top:11px;
  }
  /*详情中信息栏*/
  .ivu-modal-content .ivu-modal-body{
    padding: 0;
  }
  .basicForm .ivu-col-span-6{
    height: 50px !important;
  }
  .detailRow .ivu-select-selected-value ,.detailRow .ivu-select-placeholder{
    text-align: left;
  }
  .detailRow .ivu-select .ivu-select-dropdown{
    top:34px !important;
  }
  .detailRow .deliverySpan{
    color: #657180;
    font-weight: 200;
  }
  .detailRow table{
    width:100% !important;
  }
  .modalContent .detailRow .ivu-table-cell,.modalContent .detailRow th,.detailRow span{
    text-align: center;
  }
  .detailRow td{
    height: 35px;
  }
  .detailRow .ivu-col-span-8{
    height: 35px;
  }
  .detailRow .ivu-col-span-24{
    height: 28px;
  }
  .detailRow .ivu-form-item{
    width: 100%;
  }
  .detailRow label{
    color: #9ea7b4 !important;
    font-weight: 200 !important;
    margin-left: 15px;
  }
  .borderSpan{
    width: 60%;
    float: right;
    height: 23px;
    border-bottom:1px solid #555;
    text-align: left !important;
    /*margin-left: 5px;*/
    font-size: 12px;
    line-height: 33px !important;
    color: #657180;
  }

  .delectNopad {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    z-index: 2000;
    border-radius: 5px;
    i{
      //color: #f76165;
    }
    span{
      font-size:12px;
    }
    .ivu-modal{
      top:0;
      .ivu-modal-content{
        /*height: 500px;*/
        /*overflow-y: auto;*/
      }
      .ivu-modal-close{
        top:4px;
      }
      .ivu-modal-header{
        padding: 9px 20px;
      }
      .ivu-modal-body{
        padding: 0px !important;
      }
    }
  }
  form {
    padding: 15px 15px 0px;
  }
  //物流详情弹框中的输入框样式
  .goodsRow{
    input{
      outline: 0;
      border: 0;
      height: 27px;
      line-height: 28px;
      color: #657180;
    }
    .ivu-form-item{
      width: 272px;
      height: 30px;
      border: 1px solid #eee;
      margin-bottom: 10px;
      label{
        padding-left: 10px!important;
        color: #9ea7b4;
        line-height: 8px;
      }
      .ivu-select{
        vertical-align: top;
        color: #657180;
        .ivu-select-selection{
          outline: 0;
          border: 0;
          height: 28px;
          line-height: 28px;
          color: #657180;
        }
      }
      .ivu-input-wrapper{
        vertical-align: top;
      }
      .ivu-tooltip{
        .ivu-tooltip-popper{
          left: 818px !important;
          .ivu-tooltip-content{
            .ivu-tooltip-inner{
              background: #f2d133;
            }
          }
        }
      }
      .ivu-form-item-content{
        line-height: 27px;
      }
    }
    .ivu-form-item:hover{
      border-color: #66afe9;
    }
    .ivu-input:focus{
      border-color: #dddee1;
      outline: 0;
      box-shadow: none;
    }
    .ivu-form-item-error{
      border-color: #f00;
      .ivu-input{
        border: 0;
      }
    }
    .ivu-select-visible .ivu-select-selection{
      outline: 0;
      box-shadow: none;
      border: 0;
    }
    .ivu-input[disabled], fieldset[disabled] .ivu-input{
      color: #657180;
    }
    .ivu-tooltip-popper[x-placement^=right] .ivu-tooltip-arrow{
      border-right-color: #f2d133;
    }
    .ivu-form-item-error-tip{
      padding: 10px;
      background: rgba(255,120,105,0.8);
     // left: 202px;
      color: #fff;
      top: -3px;
      display: inline-block;
      white-space: nowrap;
      z-index: 1;
    }
    .ivu-form-item-error-tip::before{
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-right: 6px solid rgba(255,120,105,0.8);
      border-bottom: 6px solid transparent;
      left: -6px;
    }
  }
  .ivu-form-inline .ivu-form-item{
    margin-right: 5px;
  }
  //备注信息
  .remarks{
    width: 830px;
    height: 90px;
    border: 1px solid #cccccc;
    margin: 20px auto;
    overflow-y:auto;
    white-space:normal;
  }

  //备货以及发货按钮
  .stockUp{
    height: 30px;
    background: #00b6f1;
    color: #fff !important;
    i{
      margin-right: 5px;
    }
  }
  .goodsBack{
    padding-left: 11px;
    color: #fff;
    float: right;
    height: 30px;
    margin-top: 4px;
    margin-right: 8px;
    border-radius: 8px;
    text-align: center;
    background: #ff7357;
    line-height: 15px;
    i{
      margin-right: 5px;
    }
  }
  .goodsTo{
    padding-left:11px ;
    color: #8b939c;
    float: right;
    height: 30px;
    border: 1px solid #e1e1e1;
    margin-top: 4px;
    margin-right: 8px;
    border-radius: 8px;
    text-align: center;
    line-height: 15px;
    i{
      margin-right: 5px;
    }
  }
  .goodsTo:hover{
    color: #8b939c;
    border: 1px solid #e1e1e1;
  }
  .goodsBack:hover{
    color: #fff;
    background: #ff7357;
  }
  .stockUp:hover{
    background: #00b6f1;
    color: #fff;
  }

  //驳回弹框样式
  .rejectStyle{
    .ivu-modal{
      .ivu-modal-content{
        .ivu-modal-body{
          padding: 30px 80px;
          border-bottom: 1px solid #e1e1e1;
          .ivu-input-wrapper{
            width: 306px;
            height: 124px;
            textarea{
              width: 100%;
              height: 100%;
            }
          }
        }
        .ivu-modal-footer{
          padding: 0;
        }
      }
    }
  }
</style>

