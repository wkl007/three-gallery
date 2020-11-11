import * as THREE from 'three'
import type { AmbientLight, AxesHelper, Clock, DirectionalLight, OrthographicCamera, Scene, WebGLRenderer } from 'three'
import CameraControls from 'camera-controls'
import Stats from 'stats.js'

CameraControls.install({ THREE })

interface UseThree {
  initScene: () => Scene;
  initCamera: () => OrthographicCamera;
  initRenderer: (el: HTMLElement) => WebGLRenderer;
  initLight: () => void;
  initControls: () => CameraControls;
  initClock: () => Clock;
  initHelpers: () => void;
  initStats: (el: HTMLElement) => Stats;
  windowResize: () => void;
}

/**
 * Three.js hooks
 * @param scene
 * @param camera
 * @param renderer
 * @param point
 * @param ambient
 * @param axesHelper
 * @param stats
 * @param cameraControls
 * @param clock
 */
export function useThree (scene: Scene, camera: OrthographicCamera, renderer: WebGLRenderer, point: DirectionalLight, ambient: AmbientLight, axesHelper: AxesHelper, stats: Stats, cameraControls: CameraControls, clock: Clock): UseThree {
  const x: number = window.innerWidth // 宽
  const y: number = window.innerHeight // 高
  const pixelRatio: number = window.devicePixelRatio // dpr
  const s = 200 // 三维场景显示范围控制系数，系数越大，显示的范围越大

  // 初始化场景
  function initScene () {
    scene = new THREE.Scene()
    return scene
  }

  // 初始化创建
  function initCamera () {
    // 正投影相机
    const k = x / y
    camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    camera.position.set(200, 200, 200)
    camera.lookAt(scene.position)
    return camera
  }

  // 初始化渲染器
  function initRenderer (el: HTMLElement) {
    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(pixelRatio) // 设置dpr
    renderer.setSize(x, y) // 设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff) // 设置背景颜色
    el.appendChild(renderer.domElement)
    return renderer
  }

  // 初始化光源
  function initLight () {
    // 点光源
    point = new THREE.DirectionalLight(0xffffff)
    point.position.set(400, 200, 300)
    scene.add(point)
    // 环境光
    ambient = new THREE.AmbientLight(0x444444)
    scene.add(ambient)
  }

  // 初始化轨道控制插件
  function initControls () {
    cameraControls = new CameraControls(camera, renderer.domElement)
    cameraControls.draggingDampingFactor = 1 // 拖动阻尼惯性
    return cameraControls
  }

  // 初始化clock
  function initClock () {
    clock = new THREE.Clock()
    return clock
  }

  // 初始化辅助内容
  function initHelpers () {
    axesHelper = new THREE.AxesHelper(250)
    scene.add(axesHelper)
  }

  // 初始化性能检测插件
  function initStats (el: HTMLElement) {
    stats = new Stats()
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.position = 'absolute'
    stats.dom.style.left = '0px'
    stats.dom.style.top = '0px'
    el && el.appendChild(stats.dom)
    return stats
  }

  // 窗口缩放事件
  function windowResize () {
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

  return {
    initScene,
    initCamera,
    initRenderer,
    initLight,
    initControls,
    initClock,
    initHelpers,
    initStats,
    windowResize
  }
}
