<template>
  <div id="three" ref="three"></div>
  <ul class="bracelet-list">
    <li
      class="bracelet-item"
      v-for="(item,index) in braceletList"
      :key="index"
      @click="changeBracelet(index)"
    >
      <a-avatar :size="64" :src="item.url"/>
    </li>
  </ul>
</template>

<script lang="ts">
import type { AmbientLight, AxesHelper, Clock, DirectionalLight, OrthographicCamera, Scene, WebGLRenderer } from 'three'
import * as THREE from 'three'
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
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
  objectModel: any

export default defineComponent({
  name: 'gallery7',
  setup () {
    const braceletList: Array<{ url: string; }> = reactive([
      {
        url: 'http://www.yanhuangxueyuan.com/3D/yuzhuo/images/g.png'
      },
      {
        url: 'http://www.yanhuangxueyuan.com/3D/yuzhuo/images/o.png'
      },
      {
        url: 'http://www.yanhuangxueyuan.com/3D/yuzhuo/images/w.png'
      }
    ])

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
      const loader = new OBJLoader()
      loader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/models/14.5/model.obj', (object: any) => {
        const map = new THREE.TextureLoader().load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/models/14.5/texture1.png')
        object.children[0].material = new THREE.MeshBasicMaterial({
          map
        })
        objectModel = object

        // 加载后的一些编辑操作
        object.children[0].scale.set(5, 5, 5) // 网格模型缩放
        scene.add(object)
      })
    }

    // 渲染
    function render () {
      scene && renderer.render(scene, camera)
      stats && stats.update()
      cameraControls && cameraControls.update(clock.getDelta())
      objectModel && objectModel.rotateY(0.01)
      animation = requestAnimationFrame(render)
    }

    // 初始化
    function init (el: HTMLElement) {
      scene = initScene()
      camera = initCamera()
      camera.position.set(0, 0, 200)

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

    // 更换手镯
    function changeBracelet (index: number): void {
      const map = new THREE.TextureLoader().load(`https://cache-1256738511.cos.ap-chengdu.myqcloud.com/models/14.5/texture${index + 1}.png`)
      objectModel.children[0].material = new THREE.MeshBasicMaterial({
        map
      })
    }

    return {
      three,
      braceletList,
      changeBracelet
    }
  }
})
</script>

<style scoped lang="less">
.bracelet-list {
  position: fixed;
  right: 0;
  bottom: 40px;
  left: 0;
  display: flex;
  justify-content: center;
  list-style: none;

  .bracelet-item {
    margin: 0 20px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-3px);
    }
  }
}
</style>
