import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 5, 10);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x444444);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

// rt ////////////////////////////////////////////////////////////////
let renderTarget = new THREE.WebGLRenderTarget(512, 512);
let rtScene = new THREE.Scene();
let rtCamera = new THREE.Camera();
let rtGeo = new THREE.PlaneGeometry(2, 2);
let globalUniforms = {
  time: { value: 0 },
};
let rtMat = new THREE.MeshBasicMaterial({
  onBeforeCompile: (shader) => {
    shader.uniforms.time = globalUniforms.time;
    shader.fragmentShader = `
    	uniform float time;
      ${noise}
      ${shader.fragmentShader}
    `.replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `
      	vec3 col = vec3(0);
        float h = clamp(smoothNoise2(vUv * 100.), 0., 1.);
        float valley = smoothstep(0.0125, 0.1, abs(vUv.x - 0.5 + (sin(time * 0.25 + vUv.y * 25.) * 0.5 + 0.5) * 0.025));
        col = vec3(h * valley);
        vec4 diffuseColor = vec4( col, opacity );
      `
    );
    console.log(shader.fragmentShader);
  },
});
rtMat.defines = { USE_UV: "" };
let rtPlane = new THREE.Mesh(rtGeo, rtMat);
rtScene.add(rtPlane);
//////////////////////////////////////////////////////////////////////

let pg = new THREE.PlaneGeometry(50, 50, 250, 250);
pg.rotateX(-Math.PI * 0.5);
let pm = new THREE.MeshStandardMaterial({
  wireframe: true,
  displacementMap: renderTarget.texture,
  displacementScale: 5,
  map: renderTarget.texture,
});
let plane = new THREE.Mesh(pg, pm);
scene.add(plane);

let clock = new THREE.Clock();

renderer.setAnimationLoop((_) => {
  let t = clock.getElapsedTime();
  globalUniforms.time.value = t;
  renderer.setRenderTarget(renderTarget);
  renderer.render(rtScene, rtCamera);
  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
});
