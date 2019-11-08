<template>
  <div class="scene" ref="scene" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);
import { skybox } from "./skyBox";

@Component<Scene>({
  mounted() {
    const el = this.$refs.scene as Element;
    this.width = el.clientWidth;
    this.height = el.clientHeight;

    this.camera = new THREE.PerspectiveCamera(
      55,
      this.width / this.height,
      45,
      30000
    );
    this.camera.position.set(-900, -200, -900);

    this.renderer.setSize(this.width, this.height);
    el.appendChild(this.renderer.domElement);

    var controls = new OrbitControls(this.camera);
    controls.minDistance = 500;
    controls.maxDistance = 1500;

    this.scene.add(skybox);

    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }
})
export default class Scene extends Vue {
  private width: number = 0;
  private height: number = 0;

  private camera!: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene = new THREE.Scene();
}
</script>

<style scoped lang="scss">
.scene {
  width: 100%;
  height: 100vh;
}
</style>
