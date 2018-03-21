<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <span>{{itemName}}</span>
      </nav>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import '../assets/css/base.css'
  export default {
    data() {
      return {};
    },
    props:["itemName"]
  };

</script>

<style scoped lang="scss">


</style>
