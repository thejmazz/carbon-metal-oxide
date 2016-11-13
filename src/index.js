import { createScene, createStats } from './lib/create.js'

const glslify = require('glslify')

const loader = new THREE.OBJLoader()
const jsonLoader = new THREE.JSONLoader()

const { scene, camera, renderer } = createScene({
  clearColor: 0x3C4248
})
window.scene = scene

const light = new THREE.PointLight(0xffffff, 1, 1000)
light.position.set(5, 10, 5)
scene.add(light)

camera.position.set(0,4,4)

const controls = new THREE.OrbitControls(camera, renderer.domElement)

// === PLANE ===

const planeMaker = () => {
  const geom = new THREE.PlaneGeometry(10, 10, 10, 10)
  const mat = new THREE.MeshLambertMaterial({ color: 0x6D6961, side: THREE.DoubleSide, wireframe: false })

  const plane = new THREE.Mesh(geom, mat)
  plane.rotation.x = - Math.PI/2

  return plane
}

let plane = planeMaker()
scene.add(plane)

// === CARBON METAL OXIDE ===

let cmo = null

const carbonMetalOxideMaterial = new THREE.ShaderMaterial({
  uniforms: Object.assign({}, THREE.ShaderLib.lambert.uniforms, {
    time: { type: 'f', value: 0.0, step: 0.03 },
  }),
  vertexShader: glslify('./shaders/cmo-vert.glsl'),
  fragmentShader: glslify('./shaders/cmo-frag.glsl'),
  lights: true
})

jsonLoader.load('models/cmo.json', (geometry) => {
  const mesh = new THREE.Mesh(geometry, carbonMetalOxideMaterial)
  cmo = mesh
  mesh.position.set(0, 1.25, 0)

  scene.add(mesh)
})

// === LOOP ===

const update = (ts, delta) => {
  carbonMetalOxideMaterial.uniforms.time.value += carbonMetalOxideMaterial.uniforms.time.step
  if (cmo) {
    cmo.rotation.y += delta * Math.PI / 16
  }
}

// === RENDER ===

const clock = new THREE.Clock()
const stats = createStats()
const render = (ts) => {
  stats.begin()

  renderer.render(scene, camera)
  update(ts, clock.getDelta())

  stats.end()

  requestAnimationFrame(render)
}

render()
