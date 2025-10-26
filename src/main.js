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
const sphere2 = new THREE.Mesh(geometry, material.clone());

const sphere3 = new THREE.Mesh(geometry, material.clone());
sphere3.position.x = 5;

scene.add(sphere1, sphere2, sphere3);

// INSTANTIATE A RAYCASTER
const raycaster = new THREE.Raycaster();

// HANDLE MOUSE

const mousePos = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
  mousePos.x = (e.clientX / sizes.width) * 2 - 1;
  mousePos.y = -(e.clientY / sizes.height) * 2 + 1;

  // console.log(mousePos);
});

// Renderer

const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate if needed
const clock = new THREE.Clock();
let previousTime = 0;

let currentIntersect = null;

const tick = () => {
  let elapsedTime = clock.getElapsedTime();
  let deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate spheres

  sphere1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  sphere2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
  sphere3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

  raycaster.setFromCamera(mousePos, camera);

  const objectsToTest = [sphere1, sphere2, sphere3];
  const intersects = raycaster.intersectObjects(objectsToTest);

  if (intersects.length) {
    if (!currentIntersect) {
      console.log('mouse enter');
    }
    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      console.log('mouse leave');
    }
    currentIntersect = null;
  }

  // listen for click
  window.addEventListener('click', () => {
    if (currentIntersect) {
      console.log('click')
    }
  })

  for (const intersect of intersects) {
    intersect.object.material.color.set('#0000ff');
  }

  for (const object of objectsToTest) {
    if (!intersects.find((intersect) => intersect.object === object)) {
      object.material.color.set('#ff0000');
    }
  }

  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
