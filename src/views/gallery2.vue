<template>
  <div id="three" ref="three"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
import { AmbientLight, AxesHelper, DirectionalLight, Mesh, OrthographicCamera, Scene, WebGLRenderer } from 'three'
import Stats from 'stats.js'
import { useThree } from '@/hooks'

let scene: Scene,
  camera: OrthographicCamera,
  renderer: WebGLRenderer,
  point: DirectionalLight,
  ambient: AmbientLight,
  axesHelper: AxesHelper,
  mesh: Mesh,
  stats: Stats,
  controls: never,
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
      initControls
    } = useThree(scene, camera, renderer, point, ambient, axesHelper, stats, controls)

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
      animation = requestAnimationFrame(render)
    }

    // 初始化
    function init (el: HTMLElement) {
      scene = initScene()
      camera = initCamera()
      renderer = initRenderer(el)
      stats = initStats(el)
      initLight()
      initControls()
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
      window.removeEventListener('resize', windowResize)
    })

    return {
      three
    }
  }
})
</script>
