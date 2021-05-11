<template>
  <el-menu
    ref="menu"
    :default-active="$route.path"
    :default-openeds="['/summary']"
    class="el-menu-vertical"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true">
    <el-menu-item index="/news">
      <i class="el-icon-menu"></i>
      <span slot="title">新闻管理</span>
    </el-menu-item>
    <el-submenu index="/summary">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>详情管理</span>
      </template>
      <el-menu-item-group>
        <template slot="title"></template>
        <el-menu-item index="/summary">简报管理</el-menu-item>
        <el-menu-item index="/gather">汇总管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SideBar extends Vue {
  handleClose (key: any, keyPath: any) {
    const menu:any = this.$refs.menu
    menu.open(keyPath)
    // console.log(key, keyPath)
  }
}
</script>

<style scoped lang="scss">
.el-menu-vertical{
  height: 100%;
  text-align: start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
