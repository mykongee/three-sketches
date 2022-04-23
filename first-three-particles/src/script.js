import './style.css';
import * as THREE from 'three';

const sizes = {
    width: 1600,
    height: 800
}

const cursor = {
    x: 0,
    y: 0,
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
})

// -- CANVAS / SCENE
const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();

// -- PARTICLE
const vertices = [];

for (let i = 0; i < 5000; i++) {
    const x = THREE.MathUtils.randFloatSpread(200);
    const y = THREE.MathUtils.randFloatSpread(20);
    const z = THREE.MathUtils.randFloatSpread(200);

    vertices.push(x, y, z);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({ color: 'blue' });
const points = new THREE.Points(geometry, material);
scene.add(points);

// -- CAMERA
const camera = new THREE.PerspectiveCamera(105, sizes.width / sizes.height, 10, 100);
camera.position.z = 100;

// -- RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor('lavender', 1);

renderer.render(scene, camera);

const clock = new THREE.Clock();
const tick = () => {

    camera.rotation.x = Math.sin(cursor.x * Math.PI * 2) * 1.5;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 1.5;
    camera.position.z = clock.getElapsedTime();
    camera.position.y = cursor.y * 3;
    // camera.lookAt(new THREE.Vector3());

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();