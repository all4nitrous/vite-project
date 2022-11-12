import * as THREE from 'three'
import styles from './style.css'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer({ antialias: true})

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

//Beginning of sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), 
new THREE.ShaderMaterial({ vertexShader, 
  fragmentShader, 
  uniforms: { 
    globeTexture: {
value: new THREE.TextureLoader().load('./01-3.jpg')
      }
    }
  })
)

console.log(sphere)

scene.add(sphere)

camera.position.z = 15


function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()

























