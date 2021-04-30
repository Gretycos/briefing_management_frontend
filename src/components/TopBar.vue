<template>
  <div class="top-bar-container">
    <div class="top-bar-title">今日简报后台管理系统</div>
    <el-dropdown>
      <span class="el-dropdown-link">
        管理员<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TopBar extends Vue {

}
</script>

<style scoped lang="scss">
.top-bar-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #545c64;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.top-bar-title{
  margin-left: 20px;
  font-size: 20px;
  color: #ffffff;
}
.el-dropdown-link{
  margin-right: 20px;
  font-size: 16px;
  color: #ffffff;
}
</style>
