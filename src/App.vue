<template>
  <div id="app">
    <Scene />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Scene from './components/Scene.vue';

@Component({
  components: {
    Scene,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 0px;
}
</style>
