import * as THREE from 'three';
import { GUI } from 'dat.gui';

const canvas = document.getElementById('threecanvas');

const sizes = {
  height: canvas.innerHeight,
  width: canvas.innerWidth,
};
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.height / sizes.width);
camera.position.z = 2;

scene.add(camera);
