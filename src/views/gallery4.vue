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
  Texture,
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
  stats: Stats,
  cameraControls: CameraControls,
  clock: Clock,
  animation: number,
  texture: Texture

export default defineComponent({
  name: 'gallery4',
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
      const geometry = new THREE.SphereGeometry(100, 100, 100) // 球体
      const textureLoader = new THREE.TextureLoader()
      // 加载纹理贴图
      const texture = textureLoader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/images/Earth.png')
      // 加载法线贴图
      const textureNormal = textureLoader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/images/EarthNormal.png')
      // 加载高光贴图
      const textureSpecular = textureLoader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/images/earth_specular.png')

      const material = new THREE.MeshPhongMaterial({
        map: texture,
        normalMap: textureNormal, // 法线贴图
        normalScale: new THREE.Vector2(1.5, 1.5), // 设置深浅程度，默认值(1,1)。
        shininess: 40, // 高光部分的亮度，默认30
        specularMap: textureSpecular // 高光贴图
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
      mesh.rotateY(0.005)
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
