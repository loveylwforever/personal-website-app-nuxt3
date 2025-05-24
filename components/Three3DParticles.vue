<template>
  <div ref="container" class="three-bg"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
let renderer: any, scene: any, camera: any, animationId: number, points: any

const props = defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (value: string) => ['dark', 'light', 'system'].includes(value)
  }
})

const container = ref<HTMLDivElement | null>(null)
const effectiveTheme = ref(props.theme)
let mediaQuery: MediaQueryList | null = null

function updateSystemTheme() {
  if (props.theme === 'system') {
    effectiveTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } else {
    effectiveTheme.value = props.theme
  }
}

watch(() => props.theme, () => {
  updateSystemTheme()
})

function initThree() {
  import('three').then(THREE => {
    const width = container.value!.clientWidth
    const height = container.value!.clientHeight
    
    // 检测是否为移动设备
    const isMobile = window.innerWidth <= 900
    
    // 1. 设置更高质量的渲染器，并配置设备像素比
    renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      precision: isMobile ? 'mediump' : 'highp', // 移动设备使用中等精度提高性能
      powerPreference: isMobile ? 'default' : 'high-performance' // 移动设备使用默认性能模式节省电量
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)) // 限制像素比例，提高移动端性能
    renderer.setClearColor(0x000000, 0)
    container.value!.appendChild(renderer.domElement)

    scene = new THREE.Scene()
    // 2. 调整相机参数，提高近平面分辨率
    camera = new THREE.PerspectiveCamera(isMobile ? 65 : 70, width / height, 1, 1000)
    camera.position.z = isMobile ? 120 : 150

    createParticles(THREE, effectiveTheme.value)

    // 8. 改进动画循环，增加时间变量
    let time = 0
    function animate() {
      time += isMobile ? 0.008 : 0.01 // 移动端略微降低动画速度
      if (points && points.material.uniforms) {
        points.material.uniforms.time.value = time
      }
      
      if (points) {
        points.rotation.y += isMobile ? 0.0008 : 0.001
        points.rotation.x += isMobile ? 0.0004 : 0.0005
      }
      
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()
  })
}

function createParticles(THREE: any, theme: string) {
  if (points) {
    scene.remove(points)
  }

  // 3. 优化粒子数量和分布
  const isMobile = window.innerWidth <= 900
  const particles = isMobile ? 500 : 800 // 移动端减少粒子数量
  const geometry = new THREE.BufferGeometry()
  const positions = []
  const colors = []
  const sizes = [] // 添加尺寸变量
  
  // 创建更复杂的粒子分布
  for (let i = 0; i < particles; i++) {
    // 球形分布
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const radius = 60 + Math.random() * 40 // 60-100范围内的半径
    
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    
    positions.push(x, y, z)
    
    // 4. 根据主题调整颜色
    let hue, saturation, lightness
    
    if (theme === 'dark') {
      // 暗色模式：偏蓝色系，明亮的粒子
      hue = 0.6 + 0.4 * Math.random() // 蓝色范围的色相
      saturation = 0.8 + 0.2 * Math.random() // 高饱和度
      lightness = 0.7 + 0.3 * Math.random() // 较高亮度
    } else {
      // 亮色模式：偏紫色系，更温暖的颜色
      hue = 0.7 + 0.15 * Math.random() // 偏紫色的色相
      saturation = 0.6 + 0.2 * Math.random() // 中等饱和度
      lightness = 0.5 + 0.3 * Math.random() // 中等亮度
    }
    
    // 将HSL转换为RGB
    let r, g, b
    
    // 简化的HSL到RGB转换
    if (saturation === 0) {
      r = g = b = lightness
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      
      const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation
      const p = 2 * lightness - q
      
      r = hue2rgb(p, q, hue + 1/3)
      g = hue2rgb(p, q, hue)
      b = hue2rgb(p, q, hue - 1/3)
    }
    
    colors.push(r, g, b)
    
    // 5. 随机粒子尺寸，增加层次感
    const size = 0.5 + Math.random() * 1.5
    sizes.push(size)
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

  // 6. 创建更高质量的圆形贴图
  const circleTexture = (() => {
    const size = 256 // 增加纹理尺寸到256像素
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    
    // 根据主题调整发光效果
    const gradientColor1 = theme === 'dark' 
      ? 'rgba(255, 255, 255, 1)' 
      : 'rgba(240, 240, 255, 1)'
    const gradientColor2 = theme === 'dark' 
      ? 'rgba(240, 240, 255, 0.8)' 
      : 'rgba(210, 210, 255, 0.8)'
    const gradientColor3 = theme === 'dark' 
      ? 'rgba(220, 220, 255, 0)' 
      : 'rgba(180, 180, 255, 0)'
    
    // 使用渐变填充，创建更自然的发光效果
    const gradient = ctx.createRadialGradient(
      size/2, size/2, 0,
      size/2, size/2, size/2
    )
    gradient.addColorStop(0, gradientColor1)
    gradient.addColorStop(0.5, gradientColor2)
    gradient.addColorStop(1, gradientColor3)
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    // 设置更好的纹理采样参数
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    
    return texture
  })()

  // 7. 使用ShaderMaterial代替PointsMaterial，实现更好的粒子效果
  const material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xffffff) },
      pointTexture: { value: circleTexture },
      time: { value: 0 }
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float time;
      
      void main() {
        vColor = color;
        
        // 添加轻微的动画效果，让粒子呼吸
        float scale = 1.0 + 0.2 * sin(time * 0.5 + position.x * 0.05 + position.y * 0.05 + position.z * 0.05);
        
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * scale * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D pointTexture;
      varying vec3 vColor;
      
      void main() {
        gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
        // 更加明亮的中心
        if (gl_FragColor.a < 0.05) discard;
      }
    `,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false,
    transparent: true,
  })

  points = new THREE.Points(geometry, material)
  scene.add(points)
}

// 监听 effectiveTheme 变化，动态切换粒子主题
watch(effectiveTheme, (newTheme) => {
  if (typeof window !== 'undefined') {
    import('three').then(THREE => {
      createParticles(THREE, newTheme as string)
    })
  }
})

onMounted(() => {
  updateSystemTheme()
  if (props.theme === 'system') {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', updateSystemTheme)
  }
  initThree()
  window.addEventListener('resize', handleResize)
})

function handleResize() {
  if (!container.value || !renderer || !camera) return
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio) // 确保在resize时也设置正确的像素比
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) {
    renderer.dispose?.()
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }
  window.removeEventListener('resize', handleResize)
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', updateSystemTheme)
  }
})
</script>

<style scoped>
.three-bg {
  width: 100%;
  height: 100vh;
  min-height: 400px;
  background: transparent;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

/* 移动端样式适配 */
@media (max-width: 900px) {
  .three-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.85;  /* 在移动端降低不透明度，使粒子效果更柔和 */
  }
}
</style> 