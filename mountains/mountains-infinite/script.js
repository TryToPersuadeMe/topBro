import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { ImprovedNoise } from "https://threejs.org/examples/jsm/math/ImprovedNoise.js";

const perlin = new ImprovedNoise();

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0.25, 1);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.25, 0);
controls.update();

let light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 0.0625, -1);
scene.add(light, new THREE.AmbientLight(0xffffff, 1.5));

//scene.add(new THREE.GridHelper(125, 10, 0x007f7f, 0x007f7f));

let globalCounter = 1;
let chunks = [];

createChunk(0, 0x00007f);
createChunk(-125, 0x7f007f);

let clock = new THREE.Clock();

renderer.setAnimationLoop((_) => {
  let t = clock.getDelta() * 5;

  chunks.forEach((chunk) => {
    chunk.position.z += t;
    if (chunk.position.z > 125) {
      let p = chunk.position.z % 125;
      chunk.position.z = -125 + p;
      updateChunk(chunk);
    }
  });

  renderer.render(scene, camera);
});

function createChunk(posZ, color) {
  let chunk = new THREE.Group();

  let pg = new THREE.PlaneGeometry(50, 125, 50, 125);
  pg.rotateX(-Math.PI * 0.5);
  let pm = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.6,
    metalness: 0.5,
    wireframe: false,
  });
  let po = new THREE.Mesh(pg, pm);
  chunk.add(po);

  chunk.position.z = posZ;

  updateChunk(chunk);

  chunks.push(chunk);

  scene.add(chunk);
}

function updateChunk(chunk) {
  let g = chunk.children[0].geometry;
  //console.log(g);
  let pos = g.attributes.position;
  let uv = g.attributes.uv;
  let vUv = new THREE.Vector2();
  let uvScale = new THREE.Vector2(10, 25);
  for (let i = 0; i < pos.count; i++) {
    vUv.fromBufferAttribute(uv, i);
    let s = smoothstep(0.01, 0.125, Math.abs(vUv.x - 0.5));
    vUv.multiply(uvScale);
    vUv.y += uvScale.y * globalCounter;
    let y = perlin.noise(vUv.x, vUv.y, 1) * 0.5 + 0.5;
    pos.setY(i, Math.pow(y, 5) * 15 * s);
  }
  g.computeVertexNormals();
  pos.needsUpdate = true;

  globalCounter++;
}

//https://github.com/gre/smoothstep/blob/master/index.js
function smoothstep(min, max, value) {
  var x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}
