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



//resizes
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //camera
  camera.aspect = sizes.aspect;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// LIGHTS

// Need directional?

const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

// CAMERA

const camera = new THREE.PerspectiveCamera(75, sizes.aspect);
camera.position.z = 10;

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

// OBJECTS
const material = new THREE.MeshStandardMaterial({ color: 'red' });
const geometry = new THREE.SphereGeometry(2);

const sphere1 = new THREE.Mesh(geometry, material);
sphere1.position.x = -5;
const sphere2 = new THREE.Mesh(geometry, material);

const sphere3 = new THREE.Mesh(geometry, material);
sphere3.position.x = 5;

scene.add(sphere1, sphere2, sphere3);



// INSTANTIATE A RAYCASTER
const raycaster = new THREE.Raycaster();
const rayOrigin = new THREE.Vector3(-7, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0);

rayDirection.normalize();
raycaster.set(rayOrigin, rayDirection);

// what single object intersection looks like and only fires ray once - not animated
// const intersectSingleObject = raycaster.intersectObject(sphere1)
// console.log(intersectSingleObject)

// const intersectMultipleObjects = raycaster.intersectObjects([sphere1, sphere2, sphere3])
// console.log(intersectMultipleObjects)



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

  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
