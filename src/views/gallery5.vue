<template>
  <div id="three" ref="three"></div>
</template>

<script lang="ts">
import type {
  AmbientLight,
  AxesHelper,
  Clock,
  DirectionalLight,
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
  stats: Stats,
  cameraControls: CameraControls,
  clock: Clock,
  animation: number,
  texture: Texture

export default defineComponent({
  name: 'gallery5',
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
      const Loader = new THREE.ObjectLoader()
      Loader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/images/gun/model.json', (mesh: any) => {
        // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
        const textureLoader = new THREE.TextureLoader()
        // 加载纹理贴图
        const texture = textureLoader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/images/gun/diffuse.jpg')
        // 加载法线贴图
        const textureNormal = textureLoader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/images/gun/normal.jpg')
        mesh.material = new THREE.MeshPhongMaterial({
          map: texture,
          normalMap: textureNormal, // 法线贴图
          normalScale: new THREE.Vector2(3, 3) // 设置深浅程度，默认值(1,1)。
        })
        mesh.scale.set(200, 200, 200)
        mesh.rotateY(Math.PI)
        scene.add(mesh)
      })
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
