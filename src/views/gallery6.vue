<template>
  <div id="three" ref="three"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
import {
  AmbientLight,
  AnimationMixer,
  AxesHelper, Clock,
  DirectionalLight,
  OrthographicCamera,
  Scene,
  WebGLRenderer
} from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Stats from 'stats.js'
import { useThree } from '@/hooks'

let scene: Scene,
  camera: OrthographicCamera,
  renderer: WebGLRenderer,
  point: DirectionalLight,
  ambient: AmbientLight,
  axesHelper: AxesHelper,
  stats: Stats,
  controls: never,
  animation: number,
  mixer: AnimationMixer
const clock: Clock = new THREE.Clock()

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
      initControls
    } = useThree(scene, camera, renderer, point, ambient, axesHelper, stats, controls)

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
      })
    }

    // 渲染
    function render () {
      scene && renderer.render(scene, camera)
      stats && stats.update()
      mixer && mixer.update(clock.getDelta())
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
