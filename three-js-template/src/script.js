import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// -- Constants and Window EventListeners
const sizes = {
    width: 1600,
    height: 800
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}) 


// -- Canvas and Scene
const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();

// -- Meshes
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'aliceblue' });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// -- Camera and Controls
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true

// -- Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor('lavender', 1);

renderer.render(scene, camera);

// -- Animation