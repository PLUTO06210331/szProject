<style lang="scss">
  .home-index-wrap{
    background: #eaedf1;
    color: #333;
    font-size: 14px;
    //左半部分
    .leftModel{
      margin: 16px;
      height: 100%;
      width: calc(75% - 32px);
      //左面第一行
      .leftFirst{
        margin-bottom: 16px;
        height: 160px;
        width: 100%;
        .flux{
          width: calc(65% - 16px);
          margin-right: 16px;
          background: #fff;
          height: 160px;
          text-align: left;
          .passengerFlow{
            height: 100%;
            width: 41%;
            .analyze{
              height: 46px;
              padding-left: 16px;
              line-height: 46px
            }
            .samllImg{
              width: 100%;
              height: 115px;
              text-align: center;
            }
            img{
              margin-top: 25.5px;
            }
          }
          .conversion{
            height: 100%;
            width: 59%;
            .conversionAnalyze{
              height: 46px;
              line-height: 46px;
              ul{
                margin-left: 18px;
                font-size: 12px;
                color: #dadada
              }
            }
            .frame{
              height: 44px;
              width: 76%;
              background: #f6f6f6;
              line-height: 44px;
              margin-bottom: 10px;
              span{
                font-size: 12px;
                padding-left: 16px
              }
            }
            .information{
              width: 44px;
              height: 44px;
              margin: 0 16px 10px 10px;
            }
          }
        }
        .backlog{
          width: 35%;
          background: #fff;
          height: 160px;
          .backlogLine{
            height:46px;
            text-align: left;
            padding-left: 16px;
            line-height: 46px;
            .fr{
              margin-right: 16px;
              font-size: 16px;
            }
          }
          .audit{
            height: 44px;
            width:calc(100% - 32px);
            background: #f6f6f6;
            line-height: 44px;
            margin:0 16px;
            span.fl{
              font-size: 12px;
              color: #464c5b;
              padding-left: 16px;
            }
            span.fr{
              margin-right: 16px;
              .especial{
                display: inline-block;
                padding: 0 8px;
                border-radius: 15px;
                background: #81db6c;
                color: #fff;
                font-size: 12px;
                line-height: 20px;
                height: 20px
              }
            }
          }
          .repair{
            height: 44px;
            width:calc(100% - 32px);
            background: #f6f6f6;
            line-height: 44px;
            margin:10px 16px;
          }
        }
      }
      //左面第二行
      .leftSecond{
        margin-bottom: 16px;
        height: 160px;
        width: 100%;
        .maximum{
          width: calc(65% - 16px);
          margin-right: 16px;
          background: #fff;
          height: 160px;
          .maximumTitle{
            height:46px;
            text-align: left;
            padding-left: 16px;
            line-height: 46px;
          }
          .maximumOne{
            padding-left: 16px;
            height: 44px;
            width: 100%;
            div{
              margin-right: 16px;
              width: calc(25% - 16px);
              height: 44px;
              background: #f6f6f6;
              line-height: 44px;
            }
          }
          .maximumTwo{
            padding: 10px 0 10px 16px;
            height: 44px;
            width: 100%;
            div{
              margin-right: 16px;
              width: calc(25% - 16px);
              height: 44px;
              background: #f6f6f6;
              line-height: 44px;
            }
          }
        }
        .download{
          width: 35%;
          background: #fff;
          height: 160px;
          .downloadTitle{
            height:46px;
            text-align: left;
            padding-left: 16px;
            line-height: 46px;
          }
          .recommend{
            text-align: left;
            padding-left: 16px;
            width: calc(100% - 111px);
            div{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      //左面第三行
      .leftThirdly{
        margin-bottom: 16px;
        height: 216px;
        width: 100%;
        background: #fff;
        position: relative;
        .userinfo{
          position: absolute;
          width: 100%;
          top:62px;
          left: 16px;
          .userinfoFrame{
            height: 46px;
            width:36%;
            background: #f6f6f6;
            border-radius: 19px;
            img{
              vertical-align: middle;
            }
            .grade{
              line-height: 46px;
              color: #9ea7b4;
              font-size: 12px;
              padding-left: 16px
            }
            .nowadays{
              color: #9ea7b4;
            }
            .actual{
              padding-right: 16px;
              color: #657180;
            }
          }
        }
        .ivu-tabs-bar{
          color: #9ea7b4;
          background: #f6f6f6;
          border: 0;
          .ivu-tabs-nav-wrap{
            padding: 0;
            .ivu-tabs-nav-scroll{
              .ivu-tabs-nav{
                line-height: 30px;
              }
              .ivu-tabs-nav .ivu-tabs-tab:hover{
                color: #81db6c;
              }
            }
          }
          .ivu-tabs-nav .ivu-tabs-tab-active{
            color: #81db6c;
          }
          .ivu-tabs-ink-bar{
            background:#81db6c;
            width: 56px !important;
            left: 16px;
          }
        }
        .ivu-tabs-tabpane{
          margin-top: 48px;
          margin-left: 16px;
          .InformationzList{
            width: 32%;
            height: 70px;
            text-align: left;
            margin-right: 8px;
            margin-top: 8px;
            .medal{
              margin-top: 25px;
              margin-right: 26px;
            }
            .circularize{
              width: calc(100% - 46px);
              .clothing{
                padding-top: 16px;
                padding-bottom: 10px;
                color: #657180;
                font-size: 12px;
                line-height: 12px;
              }
              .hint{
                color: #9ea7b4;
                font-size: 12px;
              }
              div{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
            }

          }
        }
      }
    }
    //右半部分
    .rightModel{
      margin: 16px 16px 16px 0;
      height: 100%;
      width: calc(25% - 16px);
      //右边第一行
      .rightFirst{
        width: 100%;
        height: 160px;
        margin-bottom: 16px;
        background: #fff;
        .ivu-tabs-bar{
          color: #9ea7b4;
          background: #f6f6f6;
          border: 0;
          .ivu-tabs-nav-wrap{
            padding: 0;
            .ivu-tabs-nav-scroll{
              .ivu-tabs-nav{
                line-height: 46px;
                width: 100%;
              }
              .ivu-tabs-nav .ivu-tabs-tab:hover{
                color: #81db6c;
              }
            }
          }
          .ivu-tabs-nav .ivu-tabs-tab-active{
            color: #81db6c;
          }
          .ivu-tabs-ink-bar{
            background:#81db6c;
            width: 49px !important;
            left: 16px;
          }
        }
        .ivu-tabs-tabpane{
          p{
            font-size: 12px;
            text-align: left;
            padding-left: 16px;
          }
        }
        .ivu-tabs-mini .ivu-tabs-tab{
          padding: 0 10px;
        }
        .more{
          color: #81db6c;
          text-align: left;
          padding-left: 16px;
          margin-top: 10px;
          font-size: 12px;
          cursor: pointer;
        }
      }
      //右边第二行
      .rightSecond{
        height: 337px;
        width: 100%;
        background: #fff;
        margin-bottom: 16px;
        .product{
          margin: 0 16px 10px 16px ;
          /*width: calc(100% - 32px);*/
          height: 90px;
          border: 1px solid #f6f6f6;
          .message{
            text-align: left;
            padding-left: 16px;
            width: calc(100% - 70px);
            .productName{
              padding-bottom: 10px;
              padding-top: 16px;
              color: #657180;
            }
            div{
              color: #9ea7b4;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-size: 12px;
            }
          }

        }
      }
      //右边第三行
      .rightThirdly{
        height: 40px;
        width: calc(100% - 2px);
        border:1px dashed #c9d4d6;
        margin-bottom: 16px;
        line-height: 40px;
        text-align: center;
        color: #9ea7b4;
      }
    }
    //阴影
    .shade{
      box-shadow: 0 0 1px rgba(0,0,0,0.15);
    }
  }
</style>
<template>
  <div class="home-index-wrap">
    <div class="leftModel fl">
      <div class="leftFirst">
        <div class="flux fl shade">
          <div class="fl passengerFlow">
            <div class="analyze">客流量分析</div>
            <div class="samllImg">
              <img src="../../assets/images/samlllogo.png"/>
            </div>
          </div>
          <div class="fr conversion">
            <div class="conversionAnalyze">
              <span class="fl">转化率分析</span>
              <ul class="fl">
                <li>
                  月战况<span style="padding-left: 16px"><Icon type="chevron-down"></Icon></span>
                </li>
              </ul>
            </div>
            <div>
              <div class="fl frame">
                <span class="fl" style="color: #464c5b;">客流</span>
                <span class="fr" style="color: #9ea7b4;padding-right: 16px">309人</span>
              </div>
              <img class="information fr" src="../../assets/images/img1.png" />
            </div>
            <div>
              <div class="fl frame">
                <span class="fl" style="color: #464c5b;">够买</span>
                <span class="fr" style="color: #81db6c;padding-right: 16px">请先购买服务</span>
              </div>
              <img class="information fr" src="../../assets/images/img2.png" />
            </div>
          </div>
        </div>
        <div class="backlog fl shade">
          <div class="backlogLine">
            <span>待办事项</span><span class="fr"><Icon type="ios-list-outline"></Icon></span>
          </div>
          <div class="audit">
            <span class="fl">下单审核</span>
            <span class="fr">
              <span class="especial">309</span>
            </span>
          </div>
          <div class="repair">
            <span class="fl" style="font-size: 12px;color: #464c5b;padding-left: 16px">返修订单</span>
            <span class="fr" style="font-size: 12px;color: #81db6c;padding-right: 16px">请先购买服务</span>
          </div>
        </div>
      </div>
      <div style="clear: both"></div>
      <div class="leftSecond">
        <div class="maximum fl shade">
          <div class="maximumTitle">
            <span>出现最多词汇</span>
            <span class="fr" style="margin-right: 16px">
              <Icon type="ios-clock-outline" style="margin-right: 10px"></Icon>
              <Icon type="ios-paper-outline"></Icon>
            </span>
          </div>
          <div class="maximumOne">
            <div class="fl">35岁</div>
            <div class="fl">35岁</div>
            <div class="fl">35岁</div>
            <div class="fl">35岁</div>
          </div>
          <div class="maximumTwo">
            <div class="fl">35岁</div>
            <div class="fl">35岁</div>
            <div class="fl">35岁</div>
            <div class="fl">35岁</div>
          </div>
        </div>
        <div class="download fl shade">
          <div class="downloadTitle">
            APP下载
          </div>
          <div>
            <div class="fl">
              <img src="../../assets/images/weima.png" style="padding-left: 16px"/>
            </div>
            <div class="fl recommend">
              <div style="font-size: 16px">云蓝</div>
              <div>随时随地移动管控</div>
              <div>独有的行业资讯</div>
              <div>更安全，更迅捷</div>
            </div>
          </div>
        </div>
      </div>
      <div class="leftThirdly shade">
        <div class="userinfo">
          <div class="userinfoFrame">
            <span class="fl">
              <span class="grade">用户等级：</span>
              <span><img src="../../assets/images/level.png"/></span>
            </span>
            <span class="fr" style="line-height: 46px;font-size: 12px">
              <span class="nowadays">当前权限：</span>
              <span class="actual">超级权限</span>
            </span>
          </div>
        </div>
        <Tabs value="name1">
          <TabPane label="模块标题" name="name1">
            <div>
              <div class="InformationzList fl">
                <div class="fl">
                  <img class="medal" src="../../assets/images/medal.png" />
                </div>
                <div class="fl circularize">
                  <div class="clothing">优雅礼服</div>
                  <div class="hint">备案系统增加短信验证码确认功能</div>
                </div>
              </div>
              <div class="InformationzList fl">
                <div class="fl">
                  <img class="medal" src="../../assets/images/medal.png" />
                </div>
                <div class="fl circularize">
                  <div class="clothing">优雅礼服</div>
                  <div class="hint">备案系统增加短信验证码确认功能</div>
                </div>
              </div>
              <div class="InformationzList fl">
                <div class="fl">
                  <img class="medal" src="../../assets/images/medal.png" />
                </div>
                <div class="fl circularize">
                  <div class="clothing">优雅礼服</div>
                  <div class="hint">备案系统增加短信验证码确认功能</div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="模块标题" name="name2">
            <div>
              <div class="InformationzList fl">
                <div class="fl">
                  <img class="medal" src="../../assets/images/medal.png" />
                </div>
                <div class="fl circularize">
                  <div class="clothing">优雅礼服</div>
                  <div class="hint">备案系统增加短信验证码确认功能</div>
                </div>
              </div>
              <div class="InformationzList fl">
                <div class="fl">
                  <img class="medal" src="../../assets/images/medal.png" />
                </div>
                <div class="fl circularize">
                  <div class="clothing">优雅礼服</div>
                  <div class="hint">备案系统增加短信验证码确认功能</div>
                </div>
              </div>
              <div class="InformationzList fl">
                <div class="fl">
                  <img class="medal" src="../../assets/images/medal.png" />
                </div>
                <div class="fl circularize">
                  <div class="clothing">优雅礼服</div>
                  <div class="hint">备案系统增加短信验证码确认功能</div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="模块标题" name="name3">
            <div>
              <div class="InformationzList fl">
                <div class="fl">
                  <img class="medal" src="../../assets/images/medal.png" />
                </div>
                <div class="fl circularize">
                  <div class="clothing">优雅礼服</div>
                  <div class="hint">备案系统增加短信验证码确认功能</div>
                </div>
              </div>
              <div class="InformationzList fl">
                <div class="fl">
                  <img class="medal" src="../../assets/images/medal.png" />
                </div>
                <div class="fl circularize">
                  <div class="clothing">优雅礼服</div>
                  <div class="hint">备案系统增加短信验证码确认功能</div>
                </div>
              </div>
              <div class="InformationzList fl">
                <div class="fl">
                  <img class="medal" src="../../assets/images/medal.png" />
                </div>
                <div class="fl circularize">
                  <div class="clothing">优雅礼服</div>
                  <div class="hint">备案系统增加短信验证码确认功能</div>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <div class="rightModel fl">
      <div class="rightFirst shade">
        <Tabs value="name1"  size="small">
          <TabPane label="模块标题" name="name1">
            <p>备案系统</p>
            <p>备案系统</p>
            <p>备案系统</p>
          </TabPane>
          <TabPane label="模块标题" name="name2">
            <p>备案系统</p>
            <p>备案系统</p>
            <p>备案系统</p>
          </TabPane>
          <TabPane label="模块标题" name="name3">
            <p>备案系统</p>
            <p>备案系统</p>
            <p>备案系统</p>
          </TabPane>
          <TabPane label="模块标题" name="name4">
            <p>备案系统</p>
            <p>备案系统</p>
            <p>备案系统</p>
          </TabPane>
        </Tabs>
        <div class="more">更多</div>
      </div>
      <div class="rightSecond shade">
        <div style="height: 46px;width: 100%;padding: 0 16px;line-height: 46px">
          <span class="fl">新增套装</span>
          <span class="fr" style="color:#81db6c;cursor: pointer">查看效果</span>
        </div>
        <div class="product">
          <img src="../../assets/images/img3.png" class="fl"/>
          <div class="fl message">
            <div class="productName">优雅礼服</div>
            <div>备案系统增加短信功能</div>
            <div>12月21日MQ升级通知</div>
          </div>
        </div>
        <div class="product">
          <img src="../../assets/images/img3.png" class="fl"/>
          <div class="fl message">
            <div class="productName">优雅礼服</div>
            <div>备案系统增加短信功能</div>
            <div>12月21日MQ升级通知</div>
          </div>
        </div>
      </div>
      <div class="rightThirdly">
        + 定制首页模板
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        meta:'',
        isCollapsed: false
      }
    },
    mounted(){
      this.meta = this.$router.currentRoute.meta;
    },
    computed: {
      rotateIcon () {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods: {
      collapsedSider () {
        this.$refs.side1.toggleCollapse();
      }
    }
  }
</script>

