import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

import Stats from "https://unpkg.com/three@0.126.1/examples/jsm/libs/stats.module.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.getPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const fov = 60;
const aspect = 1920 / 1080;
const near = 1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(72, 20, 0);

const scene = new THREE.Scene();

// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(20, 100, 10);
// light.target.position.set(0, 0, 0);
// light.castShadow = true;
// scene.add(light);

// let AmbientLightColor = 0xffffff;
// let AmbientLightIntensity = 1;
// const light = new THREE.AmbientLight(AmbientLightColor, AmbientLightIntensity); // soft white light
// scene.add(light);

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
let geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
let material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});

// const plane = new THREE.Mesh(geometry, material);
// plane.castShadow = true;
// plane.receiveShadow = true;
// plane.rotation.x = -Math.PI / 2;
// scene.add(plane);

// let stats = new Stats();
// document.body.appendChild(stats.dom);

// const box = new THREE.Mesh(
//   new THREE.BoxGeometry(2, 2, 2),
//   new THREE.MeshStandardMaterial({
//     color: 0xffffff,
//   })
// );
// box.position.set(0, 5, 0);
// box.castShadow = true;
// box.receiveShadow = true;
// scene.add(box);

const Sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
  })
);
// Sphere.position.set(0, 20, 0);
// Sphere.castShadow = true;
// Sphere.receiveShadow = true;
// scene.add(Sphere);

const animate = function () {
  requestAnimationFrame(animate);
  stats.update();
  renderer.render(scene, camera);
};

animate();
