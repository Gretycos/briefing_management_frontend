<template>
  <el-container class="container">
    <router-view/>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class App extends Vue {
}

</script>

<style lang="scss">
//*{
//  outline: solid #f00 1px !important;
//  background: #000 !important;
//  color: #fff !important;
//}
.container {
  font-family: sans-serif, Avenir, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
html, body{
  width: 100%;
  height: 100%;
  margin: 0;
}
.tooltip-content{
  font-family: sans-serif, Avenir, Helvetica, Arial;
  font-size: 14px;
  color: #2c3e50;
}
.el-pagination{
  margin-top: 20px;
}
</style>
