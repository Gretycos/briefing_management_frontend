<template>
  <el-container class="home-container">
    <el-header class="home-header"><TopBar/></el-header>
    <el-container>
      <el-aside class="home-aside"><SideBar/></el-aside>
      <el-container>
        <el-main>
          <div class="page-header">{{this.$route.name}}</div>
          <el-divider></el-divider>
          <router-view/>
        </el-main>
        <el-divider></el-divider>
        <el-footer><FootBar/></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getUser, requestLogout } from '@/api/api'
import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
import FootBar from '@/components/FootBar.vue'
@Component({
  components: { FootBar, TopBar, SideBar }
})
export default class Home extends Vue {
  // message = ''

  // mounted () {
  //   const param = {
  //     username: this.$store.state.user
  //   }
  //   getUser(param).then(res => {
  //     if (parseInt(res.code) === 200) {
  //       this.message = res.data
  //     } else {
  //       if (parseInt(res.code) === 202) {
  //         requestLogout(param).then(res => {
  //           if (parseInt(res.code) === 200) {
  //             this.$router.push({ path: '/login' })
  //             this.$store.commit('REMOVE_TOKEN')
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
}
</script>

<style scoped lang="scss">
.home-container{
  width: 100%;
}
.home-header{
  width: 100%;
  padding: 0;
}
.home-aside{
  width: 220px !important;
  height: 831px;
}
.page-header{
  text-align: left;
  font-size: 18px;
}
.el-divider--horizontal{
  margin: 15px 0;
}
.el-footer{
  height: 30px !important;
}
</style>
