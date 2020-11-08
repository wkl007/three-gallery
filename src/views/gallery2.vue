<template>
  <div id="three" ref="three"></div>
</template>

<script lang="ts">
import type {
  AmbientLight,
  AxesHelper,
  Clock,
  DirectionalLight,
  Mesh,
  OrthographicCamera,
  Scene,
  WebGLRenderer
} from 'three'
import * as THREE from 'three'
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import Stats from 'stats.js'
import CameraControls from 'camera-controls'
import { useThree } from '@/hooks'

let scene: Scene,
  camera: OrthographicCamera,
  renderer: WebGLRenderer,
  point: DirectionalLight,
  ambient: AmbientLight,
  axesHelper: AxesHelper,
  mesh: Mesh,
  cameraControls: CameraControls,
  clock: Clock,
  stats: Stats,
  animation: number

export default defineComponent({
  name: 'gallery2',
  setup () {
    const three = ref<HTMLElement>(document.createElement('div'))
    const {
      initScene,
      initCamera,
      initRenderer,
      initLight,
      initHelpers,
      initStats,
      windowResize,
      initControls,
      initClock
    } = useThree(scene, camera, renderer, point, ambient, axesHelper, stats, cameraControls, clock)

    // 初始化模型
    function initModel () {
      const geometry = new THREE.SphereGeometry(100, 25, 25)
      const material = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        specular: 0x4488ee,
        shininess: 20
      })
      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
    }

    // 渲染
    function render () {
      scene && renderer.render(scene, camera)
      stats && stats.update()
      cameraControls && cameraControls.update(clock.getDelta())
      animation = requestAnimationFrame(render)
    }

    // 初始化
    function init (el: HTMLElement) {
      scene = initScene()
      camera = initCamera()
      renderer = initRenderer(el)
      stats = initStats(el)
      cameraControls = initControls()
      clock = initClock()
      initLight()
      initHelpers()
      initModel()
      render()
    }

    onMounted(() => {
      const el = three.value
      init(el)
      window.addEventListener('resize', windowResize)
    })

    onBeforeUnmount(() => {
      cancelAnimationFrame(animation)
      cameraControls && cameraControls.dispose()
      window.removeEventListener('resize', windowResize)
    })

    return {
      three
    }
  }
})
</script>
