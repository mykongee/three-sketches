import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import imageSource from '/static/textures/texture.jpg';
import imageSource from '/static/textures/particle.png';

// console.log(imageSource);
/**
 * Things to experiment with:
 *  - Change argument to MathUtils.randFloatSpread(num) to different values to constrain the spawn range in x, y, z
 * 
 */

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

// -- CANVAS / SCENE -----------------
const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();

// -- AXES HELPER
// const axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);

// -- PARTICLE
const vertices = [];

for (let i = 0; i < 5000; i++) {
    const x = THREE.MathUtils.randFloatSpread(170);
    const y = THREE.MathUtils.randFloatSpread(30);
    const z = THREE.MathUtils.randFloatSpread(200);

    vertices.push(x, y, z);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const texture = new THREE.TextureLoader().load(imageSource);
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set( 3, 1 );

const material = new THREE.PointsMaterial({ 
    // color: 'black',
    map: texture,
    blending: THREE.AdditiveBlending,
    transparent: true
 });

const points = new THREE.Points(geometry, material);
scene.add(points);

// -- CAMERA
const camera = new THREE.PerspectiveCamera(105, sizes.width / sizes.height, 15, 100);
camera.position.z = 100;

const controls = new OrbitControls(camera, canvas);
controls.maxDistance = 10;

// -- RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor('lavender', 0.8);

renderer.render(scene, camera);

const clock = new THREE.Clock();
const tick = () => {

    camera.position.x = Math.sin(clock.getElapsedTime() / 5) * 10;
    camera.position.y = Math.cos(clock.getElapsedTime() * 0.5) * 5;
    camera.position.z = -clock.getElapsedTime();
    
    // camera.position.x = Math.cos(clock.getElapsedTime()) * THREE.MathUtils.randFloat(0.5, 1);

    // camera.position.y = cursor.y * 3;
    // camera.lookAt(new THREE.Vector3());

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();