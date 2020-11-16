<template>
  <div id="three" ref="three"></div>
  <div class="select-wrapper">
    切换动画：
    <a-select
      style="width: 160px;"
      :default-value="currentValue"
      @change="handleSelectChange"
    >
      <a-select-option
        v-for="(item,index) in selectList"
        :key="index"
        :value="item.id"
      >
        {{ item.name }}
      </a-select-option>
    </a-select>
  </div>
  <div class="progress-container" v-if="percent!==100">
    <div class="progress-wrapper">
      <h3>模型加载中...</h3>
      <a-progress :percent="percent"/>
    </div>
  </div>
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
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { defineComponent, onBeforeUnmount, onMounted, ref, reactive } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'stats.js'
import CameraControls from 'camera-controls'
import { useThree } from '@/hooks'
import { AnimationAction } from 'three'

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
  mixer: AnimationMixer,
  animationAction: AnimationAction,
  gltfModel: GLTF

const clock1: Clock = new THREE.Clock()

interface SelectList {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'gallery12',
  setup () {
    const selectList: Array<SelectList> = reactive([
      {
        id: 0,
        name: '动画一'
      },
      {
        id: 1,
        name: '动画二'
      },
      {
        id: 2,
        name: '动画三'
      }
    ])
    const currentValue = ref(0)
    const percent = ref(0)

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
      const loader = new GLTFLoader()
      loader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/models/gltf/bee.glb', (gltf: GLTF) => {
        gltfModel = gltf
        scene.add(gltf.scene)
        gltf.scene.scale.set(10, 10, 10)
        mixer = new THREE.AnimationMixer(gltf.scene)
        changeAnimation(currentValue.value)
      }, ({ loaded, total }) => {
        console.log(`进度：${Math.floor(loaded / total * 100)}`)
        percent.value = Number((loaded / total * 100).toFixed(0))
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
      camera.position.set(200, 200, 200)

      renderer = initRenderer(el)
      stats = initStats(el)
      cameraControls = initControls()
      clock = initClock()
      initLight()
      initHelpers()
      initModel()
      render()
    }

    // 切换动画
    function changeAnimation (value: number) {
      mixer && mixer.stopAllAction()
      animationAction = mixer.clipAction(gltfModel.animations[value])
      animationAction.play()
    }

    // 下拉框更改
    function handleSelectChange (value: number) {
      currentValue.value = value
      changeAnimation(value)
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
      three,
      selectList,
      currentValue,
      percent,
      handleSelectChange
    }
  }
})
</script>

<style scoped lang="less">
.select-wrapper {
  position: absolute;
  top: 0;
  right: 0;
}

.progress-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);

  .progress-wrapper {
    width: 400px;
    margin: 0 auto;

    h3 {
      font-size: 24px;
      text-align: center;
    }
  }
}
</style>
