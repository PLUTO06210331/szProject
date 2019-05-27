<template>
  <div class="container">
    <header>
      <slot name="header">我是子组件头部</slot> 
      <!-- 如果父组件没有定义name = 'header' 则默认显示此header -->
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
</div>
</template>

<script>
  export default {
    name: 'container',
    data () {
      return {

      }
    }
  }
</script>
