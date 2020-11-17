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
  cameraControls: CameraControls,
  clock: Clock,
  stats: Stats,
  animation: number,
  texture: Texture

export default defineComponent({
  name: 'gallery3',
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
      const url = 'https://cache-1256738511.cos.ap-chengdu.myqcloud.com/images/run.jpg'
      const textureLoader = new THREE.TextureLoader()

      texture = textureLoader.load(url)
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
      // 等价texture.repeat= new THREE.Vector2(20,1)
      texture.repeat.x = 20

      const tubeMaterial = new THREE.MeshPhongMaterial({ map: texture, transparent: true })

      // 创建一个设置重复纹理的管道
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-80, -40, 0),
        new THREE.Vector3(-70, 40, 0),
        new THREE.Vector3(70, 40, 0),
        new THREE.Vector3(80, -40, 0)
      ])
      const tubeGeometry1 = new THREE.TubeGeometry(curve, 100, 0.6, 50, false)

      // 设置数组材质对象作为网格模型材质参数
      const tube = new THREE.Mesh(tubeGeometry1, tubeMaterial)
      scene.add(tube)

      // 创建一个半透明管道
      const tubeGeometry2 = new THREE.TubeGeometry(curve, 100, 2, 50, false)
      const tubeMaterial2 = new THREE.MeshPhongMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0.3
      })
      const tube2 = new THREE.Mesh(tubeGeometry2, tubeMaterial2)
      scene.add(tube2)

      // 创建两个立方体
      const box = new THREE.BoxGeometry(20, 50, 30)
      const material = new THREE.MeshPhongMaterial({ color: 0x0000ff })
      const mesh1 = new THREE.Mesh(box, material)
      scene.add(mesh1)
      mesh1.position.set(-80, -50, 0)
      const mesh2 = mesh1.clone()
      scene.add(mesh2)
      mesh2.position.set(80, -50, 0)
    }

    // 渲染
    function render () {
      scene && renderer.render(scene, camera)
      stats && stats.update()
      cameraControls && cameraControls.update(clock.getDelta())
      animation = requestAnimationFrame(render)
      // 使用加减法可以设置不同的运动方向
      // 设置纹理偏移
      texture.offset.x -= 0.06
    }

    // 初始化
    function init (el: HTMLElement) {
      scene = initScene()
      camera = initCamera()
      camera.position.set(200, 300, 200)
      renderer = initRenderer(el)
      renderer && renderer.setClearColor(0x000000)
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
