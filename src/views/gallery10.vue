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
  Mesh,
  OrthographicCamera,
  Scene,
  WebGLRenderer
} from 'three'
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
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
  uniforms: any,
  mixer: AnimationMixer,
  mesh: Mesh

const clock1: Clock = new THREE.Clock()

export default defineComponent({
  name: 'gallery10',
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
      const url = 'https://cache-1256738511.cos.ap-chengdu.myqcloud.com/images/sun/'
      const textureLoader = new THREE.TextureLoader()

      // 太阳模型
      const geometry = new THREE.SphereGeometry(100, 100, 100)
      const texture1 = textureLoader.load(`${url}noise.png`)
      const texture2 = textureLoader.load(`${url}atmosphere.jpg`)
      texture1.wrapS = THREE.RepeatWrapping
      texture1.wrapT = THREE.RepeatWrapping
      texture2.wrapS = THREE.RepeatWrapping
      texture2.wrapT = THREE.RepeatWrapping
      // 着色器材质
      uniforms = {
        time: { value: 1 },
        texture1: { value: texture1 },
        texture2: { value: texture2 }
      }
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: 'varying vec2 texCoord;void main(){texCoord = uv;vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );gl_Position = projectionMatrix * mvPosition;}',
        fragmentShader: 'uniform float time;uniform sampler2D texture1;uniform sampler2D texture2;varying vec2 texCoord;uniform float opacity;void main(  ) {vec4 noise = texture2D( texture1, texCoord );vec2 T1 = texCoord + vec2( 1.5, -1.5 ) * time  * 0.01;vec2 T2 = texCoord + vec2( -0.5, 2.0 ) * time *  0.01;T1.x -= noise.r * 2.0;T1.y += noise.g * 4.0;T2.x += noise.g * 0.2;T2.y += noise.b * 0.2;float p = texture2D( texture1, T1 * 2.0 ).a + 0.25;vec4 color = texture2D( texture2, T2 );vec4 temp = color * 2.0 * ( vec4( p, p, p, p ) ) + ( color * color );  gl_FragColor = vec4(temp.rgb,temp.a*opacity);}'
      })
      mesh = new THREE.Mesh(geometry, material)

      scene.add(mesh)
    }

    // 初始化加载动画
    function initAnimation () {
      // 创建位置关键帧对象
      const posTrack = new THREE.KeyframeTrack('.scale', [0, 5], [0.01, 0.01, 0.01, 1, 1, 1])
      const clip = new THREE.AnimationClip('default', 5, [posTrack])
      mixer = new THREE.AnimationMixer(mesh)
      const AnimationAction = mixer.clipAction(clip, mesh)
      AnimationAction.loop = THREE.LoopOnce // 不循环播放
      AnimationAction.clampWhenFinished = true // 暂停在最后一帧播放的状态
      AnimationAction.play()
    }

    // 渲染
    function render () {
      // 此处用常量定义clock
      const delta = clock1.getDelta()
      scene && renderer.render(scene, camera)
      stats && stats.update()
      cameraControls && cameraControls.update(clock.getDelta())
      animation = requestAnimationFrame(render)
      uniforms.time.value += delta
      mesh.rotation.y -= 0.005
      mixer && mixer.update(delta)
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
      initAnimation()
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
