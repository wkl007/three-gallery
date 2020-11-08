<template>
  <div id="three" ref="three"></div>
</template>

<script lang="ts">
import type { AmbientLight, AxesHelper, Clock, DirectionalLight, OrthographicCamera, Scene, WebGLRenderer } from 'three'
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
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
  mesh: any

export default defineComponent({
  name: 'gallery8',
  setup () {
    const three = ref<HTMLElement>(document.createElement('div'))
    const {
      initScene,
      initCamera,
      initRenderer,
      initHelpers,
      initStats,
      windowResize,
      initControls,
      initClock
    } = useThree(scene, camera, renderer, point, ambient, axesHelper, stats, cameraControls, clock)

    // 初始化模型
    function initModel () {
      const loader = new OBJLoader()
      loader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/models/14.6/heart/model.obj', (object: any) => {
        scene.add(object)
        mesh = object.children[0] // 获得心脏网格模型
        mesh.scale.set(10, 10, 10)

        // 创建一个纹理加载器
        const textureLoader = new THREE.TextureLoader()

        // 加载颜色纹理
        mesh.material.map = textureLoader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/models/14.6/heart/color.png')

        // 加载法线贴图，表面细节更丰富
        mesh.material.normalMap = textureLoader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/models/14.6/heart/normal.png')
        mesh.material.normalScale.set(1.5, 1.5)

        // 设置高光贴图，一个网格模型不同的区域反射光线的能力不同
        mesh.material.specularMap = textureLoader.load('https://cache-1256738511.cos.ap-chengdu.myqcloud.com/models/14.6/heart/specular.png')
        mesh.material.specular.set(0xffffff) // 高光反射颜色
        mesh.material.shininess = 100 // 高光高亮程度，默认30

        // 设置环境贴图
        const path = 'https://cache-1256738511.cos.ap-chengdu.myqcloud.com/models/14.6/env/'
        const format = '.jpg'
        const urls = [
          path + 'px' + format, path + 'nx' + format,
          path + 'py' + format, path + 'ny' + format,
          path + 'pz' + format, path + 'nz' + format
        ]
        mesh.material.envMap = new THREE.CubeTextureLoader().load(urls)
      })
    }

    // 光源设置
    function initLight () {
      // 点光源
      const point = new THREE.PointLight(0xffffff, 0.3)
      point.position.set(400, 200, 300) // 点光源位置
      scene.add(point) // 点光源添加到场景中
      // 环境光
      ambient = new THREE.AmbientLight(0xffffff, 0.8)
      scene.add(ambient)
      // 方向光1
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight1.position.set(400, 200, 300)
      scene.add(directionalLight1)
      // 方向光2
      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight2.position.set(-400, -200, -300)
      scene.add(directionalLight2)
    }

    // 渲染
    function render () {
      scene && renderer.render(scene, camera)
      stats && stats.update()
      cameraControls && cameraControls.update(clock.getDelta())
      mesh && mesh.rotateY(0.01)
      animation = requestAnimationFrame(render)
    }

    // 初始化
    function init (el: HTMLElement) {
      scene = initScene()
      camera = initCamera()
      renderer = initRenderer(el)
      renderer.setClearColor(0x000000)
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
