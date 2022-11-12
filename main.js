import * as THREE from 'three'
import styles from './style.css'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer()

renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

//Beginning of sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.MeshBasicMaterial({color: 0xFF0000}))

console.log(sphere)

scene.add(sphere)

camera.position.z = 10


function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()

























