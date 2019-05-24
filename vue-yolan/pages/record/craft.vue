<template>
  <div class="craft spaceBetween" v-com>
    <div class="allShow white-bottom">
      <header-slot>
          <span slot="header" class="com-slot-left">
          <span>当前位置：</span>

            <!--<span>{{showOrder}} /</span>-->
            <!--<span>{{showName}}</span>-->
          <span>档案管理 /</span>
          <span>工艺</span>
        </span>
        <span slot="footer" class="com-slot-right">

        </span>
      </header-slot>
      <div class="tableDistance">
        <Form class="searchForm searchStyle" style="height:40px;" label-position="left" inline>
          <!-- <Form-item label="关键词" :label-width="60" class="specialCase">
            <Input v-model="searchFrom.orderid" @on-enter="search()"></Input>
          </Form-item> -->
          <!-- <Form-item label="下单系统ID" :label-width="80" class="specialCase">
            <Input v-model="searchFrom.membername" @on-enter="search()"></Input>
          </Form-item>
          <Form-item class="specialHandling .specialHandling">
            <Button icon="search" @click="search" @on-enter="search"></Button>
          </Form-item> -->
        </Form>
        <div style="clear: both"></div>
        <div id="tableBox" ref="tableBox">
          <tree-grid @listenChange="listenData" :forData="datas"></tree-grid>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import TreeGrid from '../../components/tree/tree.vue'
  import HeaderSlot from "../../components/public/head-slot.vue";
  export default {
    name: 'craft',
    data () {
      return {
        searchFrom:{
          membername:'',
          orderid:'',
        },
        datas:[]
      }
    },
    methods:{
      search(){

      },
      onload(){
        this.$http.get('/treelist').then(res=>{
          this.datas = res.data;
        })
      },
      listenData(data){
        this.onload();
      }
    },
    mounted(){
      this.onload();
    },
    components: {
      TreeGrid
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ivu-table-cell-expand{
  width:40px !important;
}
</style>
