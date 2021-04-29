<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getUser, requestLogout } from '@/api/api'

@Component
export default class Home extends Vue {
  message = ''

  mounted () {
    const param = {
      username: this.$store.state.user
    }
    getUser(param).then(res => {
      if (parseInt(res.code) === 200) {
        this.message = res.data
      } else {
        if (parseInt(res.code) === 202) {
          requestLogout(param).then(res => {
            if (parseInt(res.code) === 200) {
              this.$router.push({ path: '/login' })
              this.$store.commit('REMOVE_TOKEN')
            }
          })
        }
      }
    })
  }
}
</script>

<style scoped lang="scss">

</style>
