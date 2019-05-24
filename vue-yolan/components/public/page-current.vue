<style lang="scss" scoped>
  .page-curent{
    border-top:1px solid #dddddd;
    line-height:50px;
  }
  .pages{
    width:670px;
    float:right;
  }
  .pageBox{
    width: 100%;
    height: 50px;
    background-color:#f8f8f9;
    padding: 0 15px;
    border: 1px solid #dddee1;
    border-top: none;
  }
  .ivu-page{
    text-align: right;
    width: 670px;
  }
</style>
<template>
  <div class="page-curent">
    <div class="pageBox">
      <div class="fl">共 <span class="blue-text">{{total}}</span> 条记录 {{page.pageIndex}} / {{pageNum()}}页</div>
        <Page class="pages"
              :total="total"
              show-elevator
              show-sizer
              :current.sync="page.pageIndex"
              :page-size.sync="page.pageSize"
              placement="top"
              @on-change="sizeChange(0,$event)"
              @on-page-size-change="sizeChange(1,$event)"></Page>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'page-curent',
    data () {
      return {
        page:{
          pageSize:10,
          pageIndex:1,
        }
      }
    },
    methods:{
      sizeChange(val,e){
        if(val){
            this.page.pageSize = e;
        }else{
          this.page.pageIndex = e;
        }
        this.$emit('pageChange',this.page)
      },
      pageReset(size,index){
        this.page = {
          pageSize:size,
          pageIndex:index,
        }
      },
      pageNum(){
       let all= this.$props['total']
        if(all){
          let a = Math.ceil(all/this.page.pageSize)
          return a
        }else{
          return '1'
        }
      }
    },
    props: ['total'],
  }
</script>
