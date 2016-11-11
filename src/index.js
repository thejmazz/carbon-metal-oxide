import { createScene, createStats } from './lib/create.js'

const glslify = require('glslify')

const loader = new THREE.OBJLoader()

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

// === MATERIAL ===

const uniforms = {
  time: { type: 'f', value: 0.0, step: 0.03 }
}

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: glslify('./shaders/vert.glsl'),
  fragmentShader: glslify('./shaders/frag.glsl')
})

const mat = new THREE.MeshLambertMaterial({ color: 0xB9E13C })

// === MESH ===

const cmoMat = mat
let cmo = null
new THREE.JSONLoader().load('/models/cmo.json', (geometry) => {
  const mesh = new THREE.Mesh(geometry, cmoMat)
  cmo = mesh
  mesh.position.set(0, 1.25, 0)

  scene.add(mesh)
})

const update = (ts, delta) => {
  uniforms.time.value += uniforms.time.step
  if (cmo) {
    cmo.rotation.y += delta * Math.PI / 16
  }
}

const clock = new THREE.Clock()
const stats = createStats()
const render = (ts) => {
  stats.begin()

  // for (let keyframe of keyframes) {
  //   keyframe()
  // }

  renderer.render(scene, camera)

  update(ts, clock.getDelta())
  // uniforms.time.value += uniforms.time.step

  // capturer.capture(renderer.domElement)

  stats.end()

  requestAnimationFrame(render)
}

render()
