import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// -- Constants and Window EventListeners
const sizes = {
    width: 480,
    height: 240
}

// TODO: Make factory functions for meshes, scenes, and renderers (make DRY)
// TODO: Animate only on mouse hover

// -- Canvases and Scenes
const canvas1 = document.querySelector('#canvas-1');
const canvas2 = document.querySelector('#canvas-2');
const canvas3 = document.querySelector('#canvas-3');
const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();
const scene3 = new THREE.Scene();

// -- Meshes
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.ShaderMaterial({
    uniforms: {
          thickness: {
                  value: 1.5
              }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
          });
// const material = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh1 = new THREE.Mesh(geometry1, material1);

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.ShaderMaterial({
    uniforms: {
          thickness: {
                  value: 1.5
              }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
          });
// const material2 = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh2 = new THREE.Mesh(geometry2, material2);

scene1.add(mesh1);
scene2.add(mesh2);

// -- Camera and Controls
const camera1 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera1.position.z = -3;
const controls1 = new OrbitControls(camera1, canvas1);
controls1.enableDamping = true;

const camera2 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera2.position.z = -2;
const controls2 = new OrbitControls(camera2, canvas2);
controls2.enableDamping = true;

// -- Renderer
const renderer1 = new THREE.WebGLRenderer({
    canvas: canvas1,
    alpha: true
})

renderer1.setSize(sizes.width, sizes.height);
renderer1.setClearColor('lavender', 1);
renderer1.render(scene1, camera1);

const renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
    alpha: true
})

renderer2.setSize(sizes.width, sizes.height);
renderer2.setClearColor('lavender', 1);
renderer2.render(scene2, camera2);


// -- Animation
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    controls1.update();
    controls2.update();

    // Update objects
    mesh1.rotation.x = elapsedTime/2;
    mesh1.rotation.y = elapsedTime/2;

    // Behavior 1 - boop
    mesh1.position.x = -2 * Math.tan(elapsedTime*1);
    mesh1.position.z = 1 * Math.abs(Math.sin(elapsedTime)*2.5);

    mesh2.position.x = Math.sin(elapsedTime/1);
    mesh2.position.y = Math.tan(elapsedTime*1);
    camera2.lookAt(mesh2.position);

    renderer1.render(scene1, camera1);
    renderer2.render(scene2, camera2);
    window.requestAnimationFrame(tick);
}

// -- MAIN 
tick();