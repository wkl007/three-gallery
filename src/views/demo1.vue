<template>
  <div id="three" ref="three"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as THREE from 'three'
import {
  AmbientLight,
  AxesHelper,
  DirectionalLight,
  Geometry,
  Material,
  Mesh,
  OrthographicCamera,
  Scene,
  WebGLRenderer
} from 'three'
import Stats from 'stats.js'

const OrbitControls = require('three-orbit-controls')(THREE)

const x: number = window.innerWidth
const y: number = window.innerHeight
const pixelRatio: number = window.devicePixelRatio
const s = 200 // 三维场景显示范围控制系数，系数越大，显示的范围越大

let scene: Scene,
  camera: OrthographicCamera,
  renderer: WebGLRenderer,
  point: DirectionalLight,
  ambient: AmbientLight,
  axesHelper: AxesHelper,
  geometry: Geometry,
  material: Material,
  mesh: Mesh,
  stats: Stats,
  animation: number,
  three: HTMLElement,
  controls

export default defineComponent({
  name: 'Demo1',
  mounted () {
    three = this.$refs.three as HTMLElement
    this.init(three)
    window.addEventListener('resize', this.windowResize)
  },
  beforeUnmount () {
    window.addEventListener('resize', this.windowResize)
    cancelAnimationFrame(animation)
  },
  methods: {
    // 初始化
    init (el: HTMLElement) {
      this.initScene()
      this.initCamera()
      this.initRenderer(el)
      this.initLight()
      this.initModel()
      this.initControls()
      this.initHelpers()
      this.initStats(el)
      this.render()
    },
    // 初始化场景
    initScene () {
      scene = new THREE.Scene()
    },
    // 初始化相机
    initCamera () {
      // 正投影相机
      const k: number = x / y // 窗口宽高比
      camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      camera.position.set(200, 300, 200)
      camera.lookAt(scene.position)
    },
    // 初始化渲染器
    initRenderer (el: HTMLElement) {
      renderer = new THREE.WebGLRenderer()
      renderer.setPixelRatio(pixelRatio) // 设置dpr
      renderer.setSize(x, y) // 设置渲染区域尺寸
      renderer.setClearColor(0xb9d3ff) // 设置背景颜色
      el && el.appendChild(renderer.domElement)
    },
    // 初始化光源
    initLight () {
      // 点光源
      point = new THREE.DirectionalLight(0xffffff)
      point.position.set(400, 200, 300)
      scene.add(point)
      // 环境光
      ambient = new THREE.AmbientLight(0x444444)
      scene.add(ambient)
    },
    // 初始化轨道控制插件
    initControls () {
      controls = new OrbitControls(camera, renderer.domElement)
    },
    // 初始化辅助内容
    initHelpers () {
      axesHelper = new THREE.AxesHelper(250)
      scene.add(axesHelper)
    },
    // 初始化性能检测插件
    initStats (el: HTMLElement) {
      stats = new Stats()
      stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
      stats.dom.style.position = 'absolute'
      stats.dom.style.left = '0px'
      stats.dom.style.top = '0px'
      el && el.appendChild(stats.dom)
    },
    // 初始化模型
    initModel () {
      geometry = new THREE.SphereGeometry(100, 25, 25)
      material = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        specular: 0x4488ee,
        shininess: 20
      })
      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
    },
    // 渲染
    render () {
      renderer.render(scene, camera)
      animation = requestAnimationFrame(this.render)
      stats.update()
    },
    // 窗口缩放事件
    windowResize () {
      // TODO 窗口滚动事件添加截流函数
      const innerWidth: number = window.innerWidth
      const innerHeight: number = window.innerHeight
      // 重置正投影相机相关参数
      const k: number = innerWidth / innerHeight // 窗口宽高比
      camera.left = -s * k
      camera.right = s * k
      camera.top = s
      camera.bottom = -s
      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
      // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
      // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
      camera.updateProjectionMatrix()
      renderer.setSize(innerWidth, innerHeight)
    }
  }
})
</script>
