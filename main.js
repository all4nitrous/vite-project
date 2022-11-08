import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GridHelper } from 'three';
import { Sphere } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); 

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize (window.innerWidth, window.innerHeight );

camera.position.setZ(30);
renderer.render( scene, camera );

const ringTexture = new THREE.TextureLoader().load('SaturnRings.png');

const geometry = new THREE.RingGeometry( 20, 30, 32 );
const material = new THREE.MeshBasicMaterial( {  map: ringTexture, side: THREE.DoubleSide } );
geometry.rotateX( - Math.PI / 2.5 );
const mesh = new THREE.Mesh( geometry, material );
mesh.material.transparent = true;
// set opacity to 50%
mesh.material.opacity = 0.8;
scene.add( mesh );


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lighthelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lighthelper)
scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh( geometry, material );

const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

star.position.set(x, y, z);

scene.add(star);
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture;


 

const saturnTexture = new THREE.TextureLoader().load('saturnsurface.jpg');

const saturn = new THREE.Mesh ( new THREE.SphereGeometry( 15, 32, 16 ),
new THREE.MeshBasicMaterial( { map: saturnTexture } ));
scene.add( saturn );

function animate() {
  requestAnimationFrame( animate );
  
  saturn.rotation.z += .0001;
  saturn.rotation.x += .002;
  
controls.update();


  renderer.render( scene, camera );
}

animate()

