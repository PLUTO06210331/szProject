<template>
  <div class="home-wrap" v-time>
    <!--<p @click="getData()"></p>-->
    <Headers></Headers>
    <div class="layout" :class="{'layout-hide-text': spanRight > 21}">
      <Row type="flex">
        <Col id='left-menu' :style="{height:heightMinus + 'px'}" class="layout-menu-left"
             :class="spanRight > 21 ? 'mediaLeftSmall' : 'mediaLeft'">
        <div style="height: 30px; line-height: 30px; background: rgb(74, 80, 100);">
          <Button  v-bind:class="{'firstStatus' :isA,'secondStatus' :!isA}" class="firstStatus" type="text" @click="toggleClick">
            <!--<Icon v-if="tab" class="tab pre ivu-icon ivu-icon-android-arrow-dropright" size="12"  ></Icon>-->
            <!--<Icon style="margin-left: 8px" type="navicon" size="32" ></Icon>-->
            <!--<Icon v-if="!tab" class="tab next ivu-icon ivu-icon-android-arrow-dropright" size="12"  ></Icon>-->
            <Icon type="navicon-round"></Icon>
          </Button>
          <div style="clear: both"></div>
        </div>
        <Menu :active-name="activeName" accordion theme="dark" width="auto" @on-select="routeTo($event)"
              :open-names="openNames">
          <MenuItem name="12" class="index-item-bg">
            <Tooltip v-if="spanRight != 21" content="首页" placement="right">
              <i class="iconfont icon-fontSize icon-shouye"></i>
            </Tooltip>
            <span class="specialIco">
              <i v-if="spanRight == 21" class="iconfont icon-fontSize icon-shouye"></i>
            </span>
            <span class="layout-text">首页</span>
          </MenuItem>
          <Submenu name="1" class="icon-left" v-show="counts['1']">
            <template slot="title">
              <span class="layout-text">订单管理</span>
            </template>
            <MenuItem name="1-1" v-if="counts['1-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['1-1'].name" placement="right">
                <i :class="counts['1-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['1-1'].icon"></i>
              </span>

              <span class="layout-text">{{ counts['1-1'].name }}</span>
            </MenuItem>
            <MenuItem name="1-2" v-if="counts['1-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['1-2'].name" placement="right">
                <i :class="counts['1-2'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['1-2'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['1-2'].name }}</span>
            </MenuItem>
            <MenuItem name="1-3" v-if="counts['1-3']">
              <Tooltip v-if="spanRight != 21" :content="counts['1-3'].name" placement="right">
                <i :class="counts['1-3'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['1-3'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['1-3'].name }}</span>
            </MenuItem>
            <MenuItem name="1-4" v-if="counts['1-4']">
              <Tooltip v-if="spanRight != 21" :content="counts['1-4'].name" placement="right">
                <i :class="counts['1-4'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['1-4'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['1-4'].name }}</span>
            </MenuItem>
            <MenuItem name="1-5" v-if="counts['1-5']">
                <Tooltip v-if="spanRight != 21" :content="counts['1-5'].name" placement="right">
                <i :class="counts['1-5'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['1-5'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['1-5'].name }}</span>
            </MenuItem>
            <MenuItem name="1-6" v-if="counts['1-6']">
              <Tooltip v-if="spanRight != 21" :content="counts['1-6'].name" placement="right">
                <i :class="counts['1-6'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['1-6'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['1-6'].name }}</span>
            </MenuItem>
            <MenuItem name="1-7" v-if="counts['1-7']">
              <Tooltip v-if="spanRight != 21" :content="counts['1-7'].name" placement="right">
                <i :class="counts['1-7'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['1-7'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['1-7'].name }}</span>
            </MenuItem>
            <MenuItem name="1-8" v-if="counts['1-8']">
              <Tooltip v-if="spanRight != 21" :content="counts['1-8'].name" placement="right">
                <i :class="counts['1-8'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['1-8'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['1-8'].name }}</span>
            </MenuItem>
          </Submenu>
          <Submenu name="2" class="icon-left" v-if="counts['2']">
            <template slot="title">
              <span class="layout-text">档案管理</span>
            </template>
            <MenuItem name="2-1" v-if="counts['2-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['2-1'].name" placement="right">
                <i :class="counts['2-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['2-1'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['2-1'].name }}</span>
            </MenuItem>
            <MenuItem name="2-2" v-if="counts['2-2']">
              <Tooltip v-if="spanRight != 21" :content="counts['2-2'].name" placement="right">
                <i :class="counts['2-2'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['2-2'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['2-2'].name }}</span>
            </MenuItem>
            <MenuItem name="2-3" v-if="counts['2-3']">
              <Tooltip v-if="spanRight != 21" :content="counts['2-3'].name" placement="right">
                <i :class="counts['2-3'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['2-3'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['2-3'].name }}</span>
            </MenuItem>
            <MenuItem name="2-4" v-if="counts['2-4']">
              <Tooltip v-if="spanRight != 21" :content="counts['2-4'].name" placement="right">
                <i :class="counts['2-4'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['2-4'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['2-4'].name }}</span>
            </MenuItem>
            <MenuItem name="2-5" v-if="counts['2-5']">
              <Tooltip v-if="spanRight != 21" :content="counts['2-5'].name" placement="right">
                <i :class="counts['2-5'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['2-5'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['2-5'].name }}</span>
            </MenuItem>
            <MenuItem name="2-6" v-if="counts['2-6']">
              <Tooltip v-if="spanRight != 21" :content="counts['2-6'].name" placement="right">
                <i :class="counts['2-6'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['2-6'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['2-6'].name }}</span>
            </MenuItem>
            <MenuItem name="2-7" v-if="counts['2-7']">
              <Tooltip v-if="spanRight != 21" :content="counts['2-7'].name" placement="right">
                <i :class="counts['2-7'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['2-7'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['2-7'].name }}</span>
            </MenuItem>
            <MenuItem name="2-8" v-if="counts['2-8']">
              <Tooltip v-if="spanRight != 21" :content="counts['2-8'].name" placement="right">
                <i :class="counts['2-8'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['2-8'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['2-8'].name }}</span>
            </MenuItem>
            <MenuItem name="2-9" v-if="counts['2-9']">
              <Tooltip v-if="spanRight != 21" :content="counts['2-9'].name" placement="right">
                <i :class="counts['2-9'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['2-9'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['2-9'].name }}</span>
            </MenuItem>
          </Submenu>
          <Submenu name="3" class="icon-left" v-show="counts['3']">
            <template slot="title">
              <span class="layout-text">面料管理</span>
            </template>
            <MenuItem name="3-1" v-if="counts['3-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['3-1'].name" placement="right">
                <i :class="counts['3-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['3-1'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['3-1'].name }}</span>
            </MenuItem>
            <MenuItem name="3-2" v-if="counts['3-2']">
            <Tooltip v-if="spanRight != 21" :content="counts['3-2'].name" placement="right">
              <i :class="counts['3-2'].icon"></i>
            </Tooltip>
            <span class="ico">
                <i v-if="spanRight == 21" :class="counts['3-2'].icon"></i>
              </span>
            <span class="layout-text">{{ counts['3-2'].name }}</span>
          </MenuItem>
            <MenuItem name="3-3" v-if="counts['3-3']">
              <Tooltip v-if="spanRight != 21" :content="counts['3-3'].name" placement="right">
                <i :class="counts['3-3'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['3-3'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['3-3'].name }}</span>
            </MenuItem>
          </Submenu>
          <Submenu name="4" class="icon-left" v-show="counts['4']">
            <template slot="title">
              <span class="layout-text">款式管理</span>
            </template>
            <MenuItem name="4-1" v-if="counts['4-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['4-1'].name" placement="right">
                <i :class="counts['4-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['4-1'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['4-1'].name }}</span>
            </MenuItem>
          </Submenu>
          <Submenu name="10" class="icon-left" v-if="counts['10']">
            <template slot="title">
              <span class="layout-text">物料管理</span>
            </template>
            <MenuItem name="10-1" v-if="counts['10-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['10-1'].name" placement="right">
                <i :class="counts['10-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['10-1'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['10-1'].name }}</span>
            </MenuItem>

            <MenuItem name="10-2" v-if="counts['10-2']">
              <Tooltip v-if="spanRight != 21" :content="counts['10-2'].name" placement="right">
                <i :class="counts['10-2'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['10-2'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['10-2'].name }}</span>
            </MenuItem>
          </Submenu>
          <Submenu name="11" class="icon-left" v-if="counts['11']">
            <template slot="title">
              <span class="layout-text">供应商管理</span>
            </template>
            <MenuItem name="11-1" v-if="counts['11-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['11-1'].name" placement="right">
                <i :class="counts['11-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['11-1'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['11-1'].name }}</span>
            </MenuItem>
          </Submenu>
          <Submenu name="13" class="icon-left" v-if="counts['11']">
            <template slot="title">
              <span class="layout-text">仓库管理</span>
            </template>
            <MenuItem name="13-1" v-if="counts['13-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['13-1'].name" placement="right">
                <i :class="counts['13-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['13-1'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['13-1'].name }}</span>
            </MenuItem>
            <MenuItem name="13-2" v-if="counts['13-2']">
              <Tooltip v-if="spanRight != 21" :content="counts['13-2'].name" placement="right">
                <i :class="counts['13-2'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['13-2'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['13-2'].name }}</span>
            </MenuItem>
            <MenuItem name="13-3" v-if="counts['13-3']">
              <Tooltip v-if="spanRight != 21" :content="counts['13-3'].name" placement="right">
                <i :class="counts['13-3'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['13-3'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['13-3'].name }}</span>
            </MenuItem>
          </Submenu>
          <Submenu name="5" class="icon-left" v-if="counts['5']">
            <template slot="title">
              <span class="layout-text">人体模型</span>
            </template>
            <MenuItem name="5-1" v-if="counts['5-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['5-1'].name" placement="right">
                <i :class="counts['5-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['5-1'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['5-1'].name }}</span>
            </MenuItem>
            <MenuItem name="5-2" v-if="counts['5-2']">
              <Tooltip v-if="spanRight != 21" :content="counts['5-2'].name" placement="right">
                <i :class="counts['5-2'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['5-2'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['5-2'].name }}</span>
            </MenuItem>
          </Submenu>
          <Submenu name="6" class="icon-left" v-if="counts['6']">
            <template slot="title">
              <span class="layout-text">问题管理</span>
            </template>
            <MenuItem name="6-1" v-if="counts['6-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['6-1'].name" placement="right">
                <i :class="counts['6-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['6-1'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['6-1'].name }}</span>
            </MenuItem>
            <MenuItem name="6-2" v-if="counts['6-2']">
              <Tooltip v-if="spanRight != 21" :content="counts['6-2'].name" placement="right">
                <i :class="counts['6-2'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['6-2'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['6-2'].name }}</span>
            </MenuItem>
          </Submenu>
          <Submenu name="7" class="icon-left" v-if="counts['7']">
            <template slot="title">
              <span class="layout-text">模型管理</span>
            </template>
            <MenuItem name="7-1" v-if="counts['7-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['7-1'].name" placement="right">
                <i :class="counts['7-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['7-1'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['7-1'].name }}</span>
            </MenuItem>
            <MenuItem name="7-2" v-if="counts['7-2']">
              <Tooltip v-if="spanRight != 21" :content="counts['7-2'].name" placement="right">
                <i :class="counts['7-2'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['7-2'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['7-2'].name }}</span>
            </MenuItem>
          </Submenu>
          <Submenu name="8" class="icon-left" v-if="counts['8']">
            <template slot="title">
              <span class="layout-text">系统设置</span>
            </template>
            <MenuItem name="8-1" v-if="counts['8-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['8-1'].name" placement="right">
                <i :class="counts['8-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['8-1'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['8-1'].name }}</span>
            </MenuItem>
            <MenuItem name="8-2" v-if="counts['8-2']">
              <Tooltip v-if="spanRight != 21" :content="counts['8-2'].name" placement="right">
                <i :class="counts['8-2'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['8-2'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['8-2'].name }}</span>
            </MenuItem>
            <MenuItem name="8-3" v-if="counts['8-3']">
              <Tooltip v-if="spanRight != 21" :content="counts['8-3'].name" placement="right">
                <i :class="counts['8-3'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['8-3'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['8-3'].name }}</span>
            </MenuItem>
          </Submenu>
          <Submenu name="9" class="icon-left" v-if="counts['9']">
            <template slot="title">
              <span class="layout-text">收银管理</span>
            </template>
            <MenuItem name="9-1" v-if="counts['9-1']">
              <Tooltip v-if="spanRight != 21" :content="counts['9-1'].name" placement="right">
                <i :class="counts['9-1'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['9-1'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['9-1'].name }}</span>
            </MenuItem>

            <MenuItem name="9-2" v-if="counts['9-2']">
              <Tooltip v-if="spanRight != 21" :content="counts['9-2'].name" placement="right">
                <i :class="counts['9-2'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['9-2'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['9-2'].name }}</span>
            </MenuItem>

            <MenuItem name="9-3" v-if="counts['9-3']">
              <Tooltip v-if="spanRight != 21" :content="counts['9-3'].name" placement="right">
                <i :class="counts['9-3'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['9-3'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['9-3'].name }}</span>
            </MenuItem>

            <MenuItem name="9-4" v-if="counts['9-4']">
              <Tooltip v-if="spanRight != 21" :content="counts['9-4'].name" placement="right">
                <i :class="counts['9-4'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['9-4'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['9-4'].name }}</span>
            </MenuItem>

            <MenuItem name="9-5" v-if="counts['9-5']">
              <Tooltip v-if="spanRight != 21" :content="counts['9-5'].name" placement="right">
                <i :class="counts['9-5'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['9-5'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['9-5'].name }}</span>
            </MenuItem>

            <MenuItem name="9-6" v-if="counts['9-6']">
              <Tooltip v-if="spanRight != 21" :content="counts['9-6'].name" placement="right">
                <i :class="counts['9-6'].icon"></i>
              </Tooltip>
              <span class="ico">
                <i v-if="spanRight == 21" :class="counts['9-6'].icon"></i>
              </span>
              <span class="layout-text">{{ counts['9-6'].name }}</span>
            </MenuItem>
          </Submenu>
        </Menu>
        </Col>
        <Col class="right" :style="{width:widthMinus + 'px',height:heightMinus+'px'}">
        <!--<div class="demo-spin-article" v-if="spinShow">-->
          <!--<Spin size="large" fix>-->
            <!--<Spin fix>-->
              <!--<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>-->
              <!--<div>Loading</div>-->
            <!--</Spin>-->
          <!--</Spin>-->
        <!--</div>-->
        <router-view class="routing-exit" :showName="showName" :showOrder="showOrder">
        </router-view>
        </Col>
      </Row>
    </div>
  </div>
</template>


<script>
  import Headers from '@/components/public/headers'
  import route from '@/router/route'
  // import store from '../../store/index'
  // import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        counts:{
          '1':true,
          '2':true,
          '3':true,
          '4':true,
          '5':true,
          '6':true,
          '7':true,
          '8':true,
          '9':true,
          '10':true,
          '11':true,
          '13':true,
          '1-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'订单管理',
            'show':true
          },
          '1-2':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'客户信息',
            'show':true
          },
          '2-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'工艺',
            'show':true
          },
          '2-2':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'刺绣',
            'show':true
          },
          '2-3':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'量体部位',
            'show':true
          },
          '2-4':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'特体',
            'show':true
          },
          '2-5':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'着装风格',
            'show':true
          },
          '2-6':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'长短款',
            'show':true
          },
          '2-7':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'款式风格',
            'show':true
          },
          '2-8':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'系统档案',
            'show':true
          },
          '2-9':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'尺寸管理',
            'show':true
          },
          '3-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'面料信息',
            'show':true
          },
//          '3-2':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'面料价格',
//            'show':true
//          },
          '4-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'款式管理',
            'show':true
          },
          '5-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'人体模型',
            'show':true
          },

          '6-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'问题管理',
            'show':true
          },
          '7-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'模型管理',
            'show':true
          },
          '7-2':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'锚点管理',
            'show':true
          },
          '8-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'用户管理',
            'show':true
          },
          '8-2':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'菜单管理',
            'show':true
          },
          '8-3':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'角色管理',
            'show':true
          },
          '9-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'收银列表',
            'show':true
          },
           '9-2':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'总单列表',
            'show':true
          },
          '9-3':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'店员维护',
            'show':true
          },
          '9-4':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'门店维护',
            'show':true
          },
          '9-5':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'优惠券管理',
            'show':true
          },
          '9-6':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'推销活动管理',
            'show':true
          },
          '10-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'物料管理',
            'show':true
          },
          '10-2':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'调拨管理',
            'show':true
          },
          '11-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'供应商管理',
            'show':true
          },
          '13-1':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'入库管理',
            'show':true
          },
          '13-2':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'出库管理',
            'show':true
          },
          '13-3':{
            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
            'name':'仓库维护',
            'show':true
          },

//          '1-3':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '1-4':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '1-5':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '1-6':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '1-7':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '1-8':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '2-1':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '2-2':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '3-1':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '3-2':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '4-1':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '4-2':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '5-1':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '5-2':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '7-1':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },
//          '7-2':{
//            'icon':'iconfont icon-fontSize icon-rijunpeisongjian',
//            'name':'物流配送',
//            'show':false
//          },


        },
        //tab箭头
        tab:true,
        isA: true,
        showName:'',
        showOrder:'',
        openNames: ["12"],
        activeName: '6',
        msg: '123',
        spanRight: 21,
        widthMinus: 0,
        heightMinus: document.documentElement.clientHeight - 50,
        widthLeftChange: 0,
        tabIndex: route
      }
    },
    methods: {
      //  路由跳转
      routeTo(e) {
        for (let i = 0; i < this.tabIndex.length; i++) {
          if (this.tabIndex[i].index === e) {
            // 面包屑
            this.showName = this.tabIndex[i].name;
            this.showOrder = this.soc(this.tabIndex[i].open);
            this.$router.push({path: this.tabIndex[i].path});
            return
          }
        }
      },
      routerTo(e){
        for (let i = 0; i < this.tabIndex.length; i++) {
          if (this.tabIndex[i].path === e) {
            this.openNames = [this.tabIndex[i].open];
            this.activeName = this.tabIndex[i].index;
            // 面包屑
            this.showName = this.tabIndex[i].name;
            this.showOrder = this.soc(this.tabIndex[i].open);
            return
          }
        }
      },
      // 面包屑
      soc(val){
        if(val === '1'){
          return '订单管理'
        };
        if(val === '2'){
          return '面料管理'
        };
        if(val === '3'){
          return '档案管理'
        };
        if(val === '4'){
          return '款式管理'
        };
        if(val === '5'){
          return '人体模型'
        };
        if(val === '6'){
          return '问题管理'
        };
        if(val === '7'){
          return '模型管理'
        };
        if(val === '8'){
          return '系统设置'
        };
        if(val === '9'){
          return '系统设置'
        };
        if(val === '10'){
          return '物料管理'
        };
        if(val === '11'){
          return '供应商管理'
        };
        if(val === '13'){
          return '仓库管理'
        };
        if(val === '12'){
          return '首页'
        };
      },
      //  左侧边栏
      toggleClick() {
        this.tab=!this.tab
        let width = this.widthMinus;
        this.widthMinus = 600;
        if (this.spanRight === 21) {
          this.spanRight = 23;
          this.widthMinus = width + this.widthLeftChange - 50
        } else {
          this.spanRight = 21;
          setTimeout(() => {
            this.widthMinus = width - this.widthLeftChange + 50
          }, 100)
        }
        this.isA = !this.isA;
      },
      getHeightCao(){
        var a=document.getElementById('tableBox');
        var b=window.innerHeight;
        if(document.getElementsByClassName('searchForm').length){
          if(a){
            var c=document.getElementsByClassName('searchForm')[0].offsetHeight;
            a.style.height=b-146-c+'px';
          }

        }
      },
      screenDivSize(){
        let screenDiv=document.getElementById('screenDiv');
        let searchForm=document.getElementsByClassName('searchForm')[0];
        if(screenDiv){
          screenDiv.style.height=window.innerHeight-searchForm.offsetHeight-90+'px';
        }
      },
      listMenu(obj){
        console.log(obj)
      },
//      // 测试
//      getData() {
////        "pageIndex":1,
////        "pageSize":10,
//        let a = {"pageIndex":1,"pageSize":10,"username":"",beginTime:"2017-08-10",endTime:"2017-10-24"}
//        this.$store.dispatch("actions_getUserList",a).then(res=>{
//          console.log(res)
//        })
//      }
    },

    beforeMount(){
      // this.counts = JSON.parse(sessionStorage.getItem("menulist"));
//      this.listMenu()
//      this.$router.push({"path":this.$router.currentRoute.fullPath})
      this.routerTo(this.$router.currentRoute.fullPath);
    },
    directives: {
      time: {
        bind: function () {
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          let local = year + '-' + (month<10? '0'+month:month) + '-' + (day<10?'0'+day:day);
          var dates = new Date(date.getTime() - 7 * 24 * 3600 * 1000);
          var years = dates.getFullYear();
          var months = dates.getMonth() + 1;
          var days = dates.getDate();
          let old = years + '-' + (months<10? '0'+months:months) + '-' + (days<10?'0'+days:days);
          let objTime = [local,old];
          // store.dispatch("actions_setTime",[local,local]);
        }
      }
    },
    mounted() {
//      document.getElementById("left-menu").style.height = (document.documentElement.clientHeight - 58) + 'px'
//      document.getElementById("rightMiddle").style.height = (document.documentElement.clientHeight - 58) + 'px'
//      document.getElementById("rightMiddle").style.width = (document.documentElement.clientWidth - document.getElementById("left-menu").style.width) + 'px'
      this.widthMinus = document.body.clientWidth - document.getElementById("left-menu").clientWidth;
      this.widthLeftChange = document.getElementById("left-menu").clientWidth;
      window.onresize = () => {
        document.getElementById("left-menu").style.height = (document.documentElement.clientHeight - 50) + 'px'
        this.heightMinus = document.documentElement.clientHeight - 50
        this.widthMinus = 600;
        setTimeout(() => {
          let change = document.body.clientWidth - document.getElementById("left-menu").clientWidth;
          this.widthMinus = change;
          this.widthLeftChange = document.getElementById("left-menu").clientWidth;
          setTimeout(()=>{
            this.getHeightCao()
            this.screenDivSize()
          },200)
        }, 1)
      }
    },
    // computed: {
    //   ...mapGetters({
    //     spinShow: 'getters_isSuccess'
    //   })
    // },
    components: {
      Headers
    }
  }
</script>
<style lang="scss">
  .layout {
    //background: #ecf1f2;
    position: relative;
    overflow: hidden;
  }
  .layout-breadcrumb {
    padding: 10px 15px 0;
  }
  .layout-content {
    width: 100%;
    min-height: 500px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main {
    padding: 10px;
  }
  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left {
    background: #333744;
  }
  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }
  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout-ceiling-main a {
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text {
    .media-left {
      width: 50px !important;
    }
    display: none;
  }
  .mediaLeftSmall {
    width: 50px !important;
    .ivu-menu-item {
      padding: 9px 15px 8px !important;
    }
    .icon-left {
      .ivu-menu-submenu-title {
        padding-left: 18px;
        line-height: 40px;
        height: 40px;
      }
      .ivu-menu-submenu-title-icon {
        float: left;
        font-size: 14px;
      }
    }
  }
  .mediaLeft {
    width: 170px;
    .ivu-menu-item {
      //padding: 14px 17px 16px 17px !important;
      padding: 0 !important;
      height: 40px;
      font-size: 12px;
      .ico{
        width: 45px;
        //width: 50px;
        /* height: 20px; */
        display: inline-block;
        text-align: center;
        line-height: 40px;
        i{
          padding-right: 5px;
        }
      }
      .specialIco{
        width: 40px;
        //width: 45px;
        /* height: 20px; */
        display: inline-block;
        text-align: center;
        line-height: 40px;
        //margin-right: 1px;
      }
    }

    .ivu-menu-submenu-title {
      //padding-left: 19px;
      padding: 0 !important;
      height: 40px;
      line-height: 40px;
      .ivu-menu-submenu-title-icon{
        width: 40px;
        //width: 45px;
        display: inline-block;
        text-align: center;
        line-height: 32px;
        margin-right: 4px;
      }
    }
    //.ivu-menu-submenu-title-icon {
    //  //margin-right: 14px;
    //}
    //.index-item-bg{
    //  //padding-top: 14px !important;
    //  //padding-bottom: 13px !important;
    //
    //  //i{
    //  //  margin-right: 8px;
    //  //}
    //  //.icon-shouye{
    //  //  padding: 0 !important;
    //  //}
    //}
    //.ivu-menu{
    //  .iconfont{
    //    padding-left: 14px;
    //  }
    //}
  }
  //侧边栏展开
  .firstStatus{
    position: relative;
    //left: 103px;
    color: #fff;
    padding: 0;
    z-index: 10;
    left: 80px;
    //top:12px;
    //transform:rotate(90deg);
    //-ms-transform:rotate(90deg); 	/* IE 9 */
    //-moz-transform:rotate(90deg); 	/* Firefox */
    //-webkit-transform:rotate(90deg); /* Safari 和 Chrome */
    //-o-transform:rotate(90deg); 	/* Opera */
    .ivu-icon-android-arrow-dropright{
      width: 10px;
      left: 19px;
      top: 17px;
      background: #3a3838;
    }

  }
  //侧边栏缩进
  .secondStatus{
    position: relative;
    left: 20px;
    color: #fff;
    z-index: 10;

    //transform:rotate(180deg);
    //-ms-transform:rotate(180deg); 	/* IE 9 */
    //-moz-transform:rotate(180deg); 	/* Firefox */
    //-webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    //-o-transform:rotate(180deg); 	/* Opera */
    .ivu-icon-android-arrow-dropright{
      width: 10px;
      left: 19px;
      top: 18px;
      background: #293d50;
    }
  }
  .index-item-bg {
    &:hover {
      background: #00C1DE !important;
    }
  }
  .ivu-menu-item-selected {
    background: #495060 !important;
    color: #fff !important;
  }
  .icon-left {
    .ivu-menu-submenu-title {
      &:hover {
        background: #00C1DE !important;
      }
    }
  }
  .ivu-icon-ios-arrow-down {
    transform: rotate(270deg);
  }
  .ivu-menu-opened .ivu-menu-submenu-title-icon {
    -webkit-transform: rotate(360deg)!important;
    -ms-transform:rotate(360deg)!important;
    -moz-transform:rotate(360deg)!important;
  }
  .ivu-menu-opened{
    .ivu-menu-submenu-title{
      background: #42485b !important;
    }
    .ivu-menu{
      .ivu-menu-item:hover{
        background: #4A5064 !important;
        color: #fff;
      }
    }
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background: #00C1DE !important;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    border-right: 0;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

