import './style.css';
import * as THREE from 'three';

const sizes = {
    width: 1600,
    height: 800
}

const canvas = document.querySelector('#three-canvas');

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'aliceblue' });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor('lavender', 1);

renderer.render(scene, camera);