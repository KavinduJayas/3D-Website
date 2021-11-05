import './style.css'
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { WEBGL } from "./WebGL";

// scene, camera, and renderer objects
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
});

// configure renderer and camera 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 2;

// cube object
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshStandardMaterial({ color: 0xA8A9AD });
// const cube = new THREE.Mesh(geometry, material);

// moon object
const moonTexture = new THREE.TextureLoader().load("./images/moon.jpg");
const moonGeometry = new THREE.SphereGeometry(3, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

// lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 10);

const ambientLight = new THREE.AmbientLight(0x111111);
ambientLight.position.set(10, 10, 10);

// helpers
// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(50, 100);
const controls = new OrbitControls(camera, renderer.domElement);

// adding objects to the scene
// scene.add(cube);
scene.add(moon);
scene.add(pointLight);
scene.add(ambientLight);
// scene.add(pointLightHelper, gridHelper);

// renderer every time the screen is refreshed
function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.001;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.001;

  controls.update();

  renderer.render(scene, camera);
}

// add star
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  // assign random values to x, y, z from -100 to 100
  const [x, y, z] = Array(3).fill().map(() =>
    THREE.MathUtils.randFloatSpread(100)
  );

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// space texture to background
const spaceTexture = new THREE.TextureLoader().load("./images/space.jpg");
scene.background = spaceTexture;

// check WebGL compatibility
if (WEBGL.isWebGLAvailable()) {

  animate();

} else {

  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);

}