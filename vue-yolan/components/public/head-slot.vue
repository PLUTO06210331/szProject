<style lang="scss" scoped>
  .header-slot{
    width:100%;
    height:40px;
    line-height: 40px;
    border-bottom:1px solid #dddddd;
    font-size: 14px;
    .header-left{
      float:left;
    }
    .header-right{
      float:right;
      div{
        float:left;
      }
    }
  }
</style>
<template>
  <div class="header-slot">
    <div class="header-left">
      <slot name="header"></slot>
    </div>
    <main>
      <slot></slot>
    </main>
    <div class="header-right">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header-slot',
    data () {
      return {
        msg: '111'
      }
    }
  }
</script>
