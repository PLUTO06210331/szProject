<template>
  <div class="footers-wrap bottom-colour">
    <p class="footer-words assist-text">2017 © 酷特智能股份有限公司</p>
  </div>
</template>

<script>
  import footers from '@/components/footers'
  export default {
    name: 'page',
    data () {
      return {
        msg: 'header'
      }
    },
    mounted(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .footers-wrap{
    height:30px;
    line-height:30px;
    .footer-words{
      font-size:12px;
      width:100%;
      text-align:center;
    }
  }
</style>
