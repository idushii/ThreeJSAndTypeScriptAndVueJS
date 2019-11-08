<template>
  <div class="scene" ref="scene" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);
import { skybox } from "./skyBox";
import { generateTexture } from "./generateTexture";
import { generateHeight } from "./heightMap";

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
    this.camera.position.set(-1000, 5000, 5000);

    this.renderer.setSize(this.width, this.height);
    el.appendChild(this.renderer.domElement);

    var controls = new OrbitControls(this.camera);
    controls.minDistance = 500;
    controls.maxDistance = 15000;

    //this.scene.add(skybox);

    var mesh, texture;
    var worldWidth = 256,
      worldDepth = 256,
      worldHalfWidth = worldWidth / 2,
      worldHalfDepth = worldDepth / 2;
    var clock = new THREE.Clock();

    this.scene.background = new THREE.Color(0xbfd1e5);

    var data = generateHeight(worldWidth, worldDepth);
    var geometry = new THREE.PlaneBufferGeometry(
      7500,
      7500,
      worldWidth - 1,
      worldDepth - 1
    );
    geometry.rotateX(-Math.PI / 2);
    var vertices = geometry.attributes.position.array;
    for (var i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
      vertices[j + 1] = data[i] * 10;
    }
    texture = new THREE.CanvasTexture(
      generateTexture(data, worldWidth, worldDepth)
    );
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ map: texture })
    );
    this.scene.add(mesh);

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
