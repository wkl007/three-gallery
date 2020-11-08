<template>
  <div id="three" ref="three"></div>
</template>

<script lang="ts">
import type {
  AmbientLight,
  AnimationMixer,
  AxesHelper,
  Clock,
  DirectionalLight,
  OrthographicCamera,
  Scene,
  WebGLRenderer
} from 'three'
import * as THREE from 'three'
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
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
  mixer: AnimationMixer

const clock1: Clock = new THREE.Clock()

export default defineComponent({
  name: 'gallery6',
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
      const loader = new FBXLoader()
      loader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/models/14.4/SambaDancing.fbx', (object: any) => {
        scene.add(object)
        object.translateY(-80)
        mixer = new THREE.AnimationMixer(object)
        const AnimationAction = mixer.clipAction(object.animations[0])
        // AnimationAction.timeScale = 1 //默认1，可以调节播放速度
        // AnimationAction.loop = THREE.LoopOnce //不循环播放
        // AnimationAction.clampWhenFinished = true//暂停在最后一帧播放的状态
        AnimationAction.play()
      }, ({ loaded, total }) => {
        console.log(`进度：${Math.floor(loaded / total * 100)}`)
      })
    }

    // 渲染
    function render () {
      scene && renderer.render(scene, camera)
      stats && stats.update()
      cameraControls && cameraControls.update(clock1.getDelta())
      mixer && mixer.update(clock.getDelta())
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
