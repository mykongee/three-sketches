import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Vector3 } from 'three';
import { Scene } from 'three';

const renderers = [];
const baseVector3 = new Vector3(1, 1, 1);
const material = new THREE.ShaderMaterial({
    uniforms: {
        thickness: {
            value: 1.5
        }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
})
const geometry = new THREE.BoxGeometry(baseVector3);

function createMesh() {
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function createScene() {

}

// -- Constants and Window EventListeners
const sizes = {
    width: 480,
    height: 240
}

window.addEventListener('resize', () => {
    // Update measurements in reference object
    sizes.width = window.innerWidth/3;
    sizes.height = window.innerHeight/3;

    // Update camera
    camera1.aspect = sizes.width / sizes.height;
    camera1.updateProjectionMatrix();

    camera2.aspect = sizes.width / sizes.height;
    camera2.updateProjectionMatrix();

    // Update renderer to resize canvas
    // And handles case if user moves window to different screens
    renderer1.setSize(sizes.width, sizes.height);
    renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer2.setSize(sizes.width, sizes.height);
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}) 


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

const renderer3 = new THREE.WebGLRenderer({
    canvas: canvas3,
    alpha: true
})
renderer3.setClearColor('lavender', 1);
renderer3.render(scene2, camera2);

// -- Animation
const clock = new THREE.Clock();


// interface AnimationScene {
//     scene: Scene,
//     animation: Animation
// }

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    controls1.update();
    controls2.update();
    
    // TODO: implement function to apply a specific animation to a mesh
    // How to represent animation? Might have to hardcode
    function applyAnimation(mesh, animationId) {
        
    }

    // One mesh per renderer
    for (const i = 0; i < renderers.length; i++) {
        applyAnimation(mesh[i], i);
    }

    // Animation 1 - boop
    mesh1.rotation.x = elapsedTime/2;
    mesh1.rotation.y = elapsedTime/2;
    mesh1.position.x = -2 * Math.tan(elapsedTime*1);
    mesh1.position.z = 1 * Math.abs(Math.sin(elapsedTime)*2.5);
    
    // Animation 2 - yo-yo
    mesh2.position.x = Math.sin(elapsedTime/1);
    mesh2.position.y = Math.tan(elapsedTime*1);
    camera2.lookAt(mesh2.position);

    // Animation 3 - so close yet so far
    // mesh.position.z = Math.tan(elapsedTime)/2;
    // camera.position.z = elapsedTime*1.5;

    renderer1.render(scene1, camera1);
    // renderer1.autoClear = false; // Interesting behavior!
    renderer2.render(scene2, camera2);

    // TODO: experiment with different renderers, but alternate scene/camera 
    // Interesting experiment
    // if (parseInt(elapsedTime) % 3 === 0) {
    //     renderer3.render(scene2, camera1); 
    // } else {
    //     renderer3.render(scene1, camera1); 
    // }
    renderer3.render(scene1, camera1); 
    window.requestAnimationFrame(tick);
}

// -- MAIN 
tick();