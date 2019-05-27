<template>
  <div class="propMessage">
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    name: 'propMessage',
    props:["message"],
    data () {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
