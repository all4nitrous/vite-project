import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GridHelper } from 'three';
import { Sphere } from 'three';
import { BufferAttribute } from 'three';
import { BufferGeometry } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); 

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize (window.innerWidth, window.innerHeight );

camera.position.setZ(30);
renderer.render( scene, camera );

function addRing() {
  const ringTexture = new THREE.TextureLoader().load(
    "8k_saturn_ring_alpha.png"
  );
  const ring = new THREE.BufferGeometry(3, 5, 64);
  var pos = geometry.attributes.position;
  var v3 = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++){
    v3.fromBufferAttribute(pos, i);
    geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
  }
  // adjustRingGeometry(geometry);

  const material = new THREE.MeshBasicMaterial({
    map: ringTexture
  });
  const mesh = new THREE.Mesh(geometry, material);
  ring.add(mesh);
  scene.add( ring );
}

function adjustRingGeometry(geom) {
  const twopi = 2 * Math.PI;
  const iVer = Math.max(2, geom.gridY);
  for (let i = 0; i < iVer + 1; i++) {
    const fRad1 = i / iVer,
      fRad2 = (i + 1) / iVer,
      fX1 = geom.innerRadius * Math.cos(fRad1 * twopi),
      fY1 = geom.innerRadius * Math.sin(fRad1 * twopi),
      fX2 = geom.outerRadius * Math.cos(fRad1 * twopi),
      fY2 = geom.outerRadius * Math.sin(fRad1 * twopi),
      fX4 = geom.innerRadius * Math.cos(fRad2 * twopi),
      fY4 = geom.innerRadius * Math.sin(fRad2 * twopi),
      fX3 = geom.outerRadius * Math.cos(fRad2 * twopi),
      fY3 = geom.outerRadius * Math.sin(fRad2 * twopi),
      v1 = new THREE.Vector3(fX1, fY1, 0),
      v2 = new THREE.Vector3(fX2, fY2, 0),
      v3 = new THREE.Vector3(fX3, fY3, 0),
      v4 = new THREE.Vector3(fX4, fY4, 0);
    geom.vertices.push(new THREE.Vertex(v1));
    geom.vertices.push(new THREE.Vertex(v2));
    geom.vertices.push(new THREE.Vertex(v3));
    geom.vertices.push(new THREE.Vertex(v4));
  }
  for (let i = 0; i < iVer + 1; i++) {
    geom.faces.push(new THREE.Face3(i * 4, i * 4 + 1, i * 4 + 2));
    geom.faces.push(new THREE.Face3(i * 4, i * 4 + 2, i * 4 + 3));
    geom.faceVertexUvs[0].push([
      new THREE.UV(0, 1),
      new THREE.UV(1, 1),
      new THREE.UV(1, 0)
    ]);
    geom.faceVertexUvs[0].push([
      new THREE.UV(0, 1),
      new THREE.UV(1, 0),
      new THREE.UV(0, 0)
    ]);
  }
  geom.computeFaceNormals();
  geom.boundingSphere = {
    radius: geom.outerRadius
  };
}


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
  
  
  saturn.rotation.y += 0.002;
  
  

controls.update();


  renderer.render( scene, camera );
}

animate()

