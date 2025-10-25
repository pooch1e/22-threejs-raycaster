import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.getElementById('threecanvas');
const gui = new GUI();
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth,
  get aspect() {
    return this.width / this.height;
  },
};

const scene = new THREE.Scene();

// OBJECTS
const material = new THREE.MeshStandardMaterial();
const geometry = new THREE.SphereGeometry(2);
const sphere = new THREE.Mesh(material, geometry);

scene.add(sphere);

//resizes
window.addEventListener(() => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //camera
  camera.aspect = sizes.aspect;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// CAMERA

const camera = new THREE.PerspectiveCamera(75, sizes.aspect);
camera.position.z = 2;

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

// Renderer

const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate if needed
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  let elapsedTime = clock.getElapsedTime();
  let deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  constrols.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
