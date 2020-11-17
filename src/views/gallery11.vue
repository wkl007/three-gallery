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
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three'
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
import Stats from 'stats.js'
import CameraControls from 'camera-controls'
import { useThrottleFn } from '@vueuse/core'
import { useThree } from '@/hooks'

let scene: Scene,
  camera: PerspectiveCamera,
  camera1: OrthographicCamera,
  renderer: WebGLRenderer,
  point: DirectionalLight,
  ambient: AmbientLight,
  axesHelper: AxesHelper,
  stats: Stats,
  cameraControls: CameraControls,
  clock: Clock,
  animation: number,
  mesh: Mesh,
  points: Array<Vector3>

let i = 0

export default defineComponent({
  name: 'gallery11',
  setup () {
    const three = ref<HTMLElement>(document.createElement('div'))
    const {
      initScene,
      initRenderer,
      initLight,
      initHelpers,
      initStats
    } = useThree(scene, camera1, renderer, point, ambient, axesHelper, stats, cameraControls, clock)

    // 初始化模型
    function initModel () {
      // 创建一个设置重复纹理的管道
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-500, 200, 900),
        new THREE.Vector3(-100, 400, 400),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(600, -600, 0),
        new THREE.Vector3(900, -400, 600),
        new THREE.Vector3(1200, -200, 300)
      ])
      points = curve.getPoints(500)
      // 通过多段曲线路径创建生成管道
      const geometry = new THREE.TubeGeometry(curve, 200, 30, 30)
      const length = geometry.vertices.length
      for (let i = 0; i < length; i++) {
        const color = new THREE.Color()
        color.setRGB(Math.random(), 0.8, i / length)
        geometry.colors.push(color)
      }
      // 点渲染模式
      const material = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true
      })
      // 点模型对象
      const point = new THREE.Points(geometry, material)
      scene.add(point)
    }

    // 初始化创建
    function initCamera () {
      const x: number = window.innerWidth // 宽
      const y: number = window.innerHeight // 高
      // 正投影相机
      const k = x / y
      camera = new THREE.PerspectiveCamera(60, k, 1, 1000)
      return camera
    }

    // 渲染
    function render () {
      scene && renderer.render(scene, camera)
      stats && stats.update()
      animation = requestAnimationFrame(render)
      if (i < points.length - 100) {
        camera.position.set(points[i].x, points[i].y, points[i].z)
        camera.lookAt(new THREE.Vector3(points[i + 1].x, points[i + 1].y, points[i + 1].z))
        i += 1
      } else {
        i = 0
      }
    }

    // 窗口缩放事件
    const windowResize = useThrottleFn(() => {
      const innerWidth: number = window.innerWidth
      const innerHeight: number = window.innerHeight
      // 重置透视投影相机
      // 重置渲染器输出画布canvas尺寸
      renderer.setSize(innerWidth, innerHeight)
      // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
    }, 100)

    // 初始化
    function init (el: HTMLElement) {
      scene = initScene()
      camera = initCamera()
      renderer = initRenderer(el)
      renderer.setClearColor(0x000000)
      stats = initStats(el)
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
      window.removeEventListener('resize', windowResize)
    })

    return {
      three
    }
  }
})
</script>
