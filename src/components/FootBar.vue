<template>
  <div class="foot">
    Copyright © 2021 Yaocong Huang
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class FootBar extends Vue {
}
</script>

<style scoped lang="scss">
.foot{
  font-size: 14px;
}
</style>
