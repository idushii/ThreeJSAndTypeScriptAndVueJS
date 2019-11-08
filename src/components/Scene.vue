<template>
  <div class="scene" ref="scene" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);

@Component<Scene>({
  mounted() {
    const el = this.$refs.scene as Element;
    this.camera = new THREE.PerspectiveCamera(
      75,
      el.clientWidth / el.clientHeight,
      0.1,
      1000
    );

    this.renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    this.scene.add(cube);
    this.camera.position.z = 5;
    this.camera.position.x = 5;
    this.camera.position.y = 5;
    var controls = new OrbitControls(this.camera);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 10;
    controls.target = new THREE.Vector3(0.5, 0.5, 0.5);

    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }
})
export default class Scene extends Vue {
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
