import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// -- Constants and Window EventListeners
const sizes = {
    width: 480,
    height: 240
}


// -- Canvases and Scenes
const canvas1 = document.querySelector('#canvas-1');
const canvas2 = document.querySelector('#canvas-2');
const canvas3 = document.querySelector('#canvas-3');
const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();
const scene3 = new THREE.Scene();

// -- Meshes
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red' });

const mesh = new THREE.Mesh(geometry, material);
scene1.add(mesh);

// -- Camera and Controls
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = -2;
const controls = new OrbitControls(camera, canvas1);
controls.enableDamping = true;

// -- Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas1,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor('lavender', 1);

renderer.render(scene1, camera);

// -- Animation
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    controls.update();
    renderer.render(scene1, camera);
    window.requestAnimationFrame(tick);
}

// -- MAIN 
tick();