<template>
  <div ref="container" class="three-bg" />
</template>

<script setup lang="ts">
import type { BufferGeometry, Group, PerspectiveCamera, Points, Scene, Texture, WebGLRenderer } from 'three'

const props = defineProps<{
  theme?: string
}>()

const container = ref<HTMLDivElement | null>(null)
const effectiveTheme = ref('light')

let renderer: WebGLRenderer | null = null
let scene: Scene | null = null
let camera: PerspectiveCamera | null = null
let group: Group | null = null
let points: Points | null = null
let texture: Texture | null = null
let animationId = 0
let mediaQuery: MediaQueryList | null = null
let reduce = false
let isMobile = false
let time = 0
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

function resolveTheme() {
  const theme = props.theme || 'light'
  if (theme === 'system') {
    effectiveTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    return
  }
  effectiveTheme.value = theme === 'dark' ? 'dark' : 'light'
}

function isDark() {
  return effectiveTheme.value === 'dark'
}

function palette() {
  return isDark()
    ? [
      [0.95, 0.55, 0.38],
      [0.96, 0.74, 0.44],
      [0.98, 0.90, 0.78],
      [0.86, 0.36, 0.28],
    ]
    : [
      [0.79, 0.39, 0.26],
      [0.85, 0.47, 0.34],
      [0.72, 0.48, 0.22],
      [0.55, 0.30, 0.20],
    ]
}

function makeSprite(THREE: typeof import('three')) {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const glow = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  glow.addColorStop(0, 'rgba(255,255,255,1)')
  glow.addColorStop(0.28, 'rgba(255,236,210,0.85)')
  glow.addColorStop(0.62, 'rgba(201,100,66,0.28)')
  glow.addColorStop(1, 'rgba(201,100,66,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, size, size)
  const map = new THREE.CanvasTexture(canvas)
  map.minFilter = THREE.LinearFilter
  map.magFilter = THREE.LinearFilter
  return map
}

function disposeObject(object: { geometry?: BufferGeometry, material?: { dispose?: () => void } | Array<{ dispose?: () => void }> }) {
  object.geometry?.dispose()
  const material = object.material
  if (Array.isArray(material)) material.forEach((item) => item.dispose?.())
  else material?.dispose?.()
}

function clearGroup() {
  if (!group || !scene) return
  group.traverse((child) => {
    disposeObject(child as Points)
  })
  scene.remove(group)
  group = null
  points = null
}

function createField(THREE: typeof import('three')) {
  if (!scene) return
  clearGroup()

  const colors = palette()
  const count = isMobile ? 280 : 640
  const positions = new Float32Array(count * 3)
  const colorAttr = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const phases = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const radius = 52 + Math.random() * 58
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    const ink = colors[i % colors.length]
    const jitter = 0.86 + Math.random() * 0.2
    colorAttr[i * 3] = ink[0] * jitter
    colorAttr[i * 3 + 1] = ink[1] * jitter
    colorAttr[i * 3 + 2] = ink[2] * jitter

    const ember = Math.random() > 0.9
    sizes[i] = ember ? 2.6 + Math.random() * 1.8 : 0.7 + Math.random() * 1.4
    phases[i] = Math.random() * Math.PI * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colorAttr, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1))

  texture?.dispose()
  texture = makeSprite(THREE)

  const material = new THREE.ShaderMaterial({
    uniforms: {
      pointTexture: { value: texture },
      time: { value: 0 },
    },
    vertexShader: `
      attribute float size;
      attribute float phase;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vAlpha;
      uniform float time;

      void main() {
        vColor = color;
        float twinkle = 0.62 + 0.38 * sin(time * 1.7 + phase);
        vAlpha = twinkle;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (0.82 + 0.28 * twinkle) * (280.0 / max(40.0, -mvPosition.z));
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D pointTexture;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec4 texel = texture2D(pointTexture, gl_PointCoord);
        float alpha = texel.a * vAlpha;
        if (alpha < 0.04) discard;
        gl_FragColor = vec4(vColor * texel.rgb, alpha);
      }
    `,
    blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthTest: false,
    depthWrite: false,
    transparent: true,
  })

  points = new THREE.Points(geometry, material)
  group = new THREE.Group()
  group.add(points)

  if (!isMobile && !reduce) {
    const linePositions: number[] = []
    const lineColors: number[] = []
    const maxLines = 120
    const threshold = 26
    let drawn = 0
    for (let i = 0; i < count && drawn < maxLines; i += 3) {
      for (let j = i + 1; j < count && drawn < maxLines; j += 5) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        if (dx * dx + dy * dy + dz * dz > threshold * threshold) continue
        linePositions.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
        )
        const fade = isDark() ? 0.42 : 0.22
        lineColors.push(
          colorAttr[i * 3], colorAttr[i * 3 + 1], colorAttr[i * 3 + 2],
          colorAttr[j * 3] * fade, colorAttr[j * 3 + 1] * fade, colorAttr[j * 3 + 2] * fade,
        )
        drawn++
      }
    }
    if (linePositions.length) {
      const lineGeo = new THREE.BufferGeometry()
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
      lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3))
      const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: isDark() ? 0.28 : 0.16,
        blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      })
      group.add(new THREE.LineSegments(lineGeo, lineMat))
    }
  }

  scene.add(group)
}

function tick() {
  if (document.hidden) {
    animationId = 0
    return
  }
  time += reduce || isMobile ? 0.006 : 0.01
  if (points) {
    const material = points.material as { uniforms?: { time: { value: number } } }
    if (material.uniforms) material.uniforms.time.value = time
  }
  if (group && camera) {
    if (!reduce && !isMobile) {
      targetX += (mouseY * 0.22 - targetX) * 0.045
      targetY += (mouseX * 0.28 - targetY) * 0.045
    }
    group.rotation.x = targetX + time * 0.03
    group.rotation.y = targetY + time * 0.055
    camera.position.z = (isMobile ? 128 : 148) + Math.sin(time * 0.18) * (reduce ? 0 : 7)
  }
  renderer?.render(scene!, camera!)
  animationId = requestAnimationFrame(tick)
}

function onPointer(event: PointerEvent) {
  if (isMobile || reduce) return
  mouseX = event.clientX / window.innerWidth - 0.5
  mouseY = event.clientY / window.innerHeight - 0.5
}

function onVisibility() {
  if (document.hidden) {
    cancelAnimationFrame(animationId)
    animationId = 0
    return
  }
  if (!animationId) tick()
}

function handleResize() {
  if (!container.value || !renderer || !camera) return
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  isMobile = window.innerWidth <= 900
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75))
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

async function initThree() {
  if (!container.value) return
  const THREE = await import('three')
  isMobile = window.innerWidth <= 900
  reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const width = container.value.clientWidth
  const height = container.value.clientHeight

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: !isMobile,
    powerPreference: isMobile ? 'low-power' : 'high-performance',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75))
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(isMobile ? 64 : 68, width / height, 1, 1000)
  camera.position.z = isMobile ? 128 : 148

  createField(THREE)
  tick()
}

watch(() => props.theme, () => {
  resolveTheme()
})

watch(effectiveTheme, async () => {
  if (!scene) return
  const THREE = await import('three')
  createField(THREE)
})

onMounted(() => {
  resolveTheme()
  if (props.theme === 'system') {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', resolveTheme)
  }
  initThree()
  window.addEventListener('pointermove', onPointer, { passive: true })
  window.addEventListener('resize', handleResize)
  document.addEventListener('visibilitychange', onVisibility)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('pointermove', onPointer)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('visibilitychange', onVisibility)
  mediaQuery?.removeEventListener('change', resolveTheme)
  clearGroup()
  texture?.dispose()
  renderer?.dispose()
  renderer?.domElement.remove()
})
</script>

<style scoped>
.three-bg {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
  min-height: 400px;
  overflow: hidden;
  background: transparent;
  pointer-events: none;
}

@media (max-width: 900px) {
  .three-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    min-height: 0;
    opacity: 0.8;
  }
}
</style>
