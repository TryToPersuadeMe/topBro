import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";

import { GUI } from "https://unpkg.com/three@0.126.1/examples/jsm/libs/dat.gui.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
import { Sky } from "/skyShader.js";

let camera, scene, renderer;

let sky, sun;

init();
render();

function initSky() {
  // Add Sky
  sky = new Sky();
  sky.scale.setScalar(1111);
  scene.add(sky);

  sun = new THREE.Vector3();

  /// GUI

  const effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    inclination: 0.49, // elevation / inclination
    azimuth: 0.25, // Facing front,
    exposure: renderer.toneMappingExposure,
  };

  function guiChanged() {
    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = effectController.turbidity;
    uniforms["rayleigh"].value = effectController.rayleigh;
    uniforms["mieCoefficient"].value = effectController.mieCoefficient;
    uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

    const theta = Math.PI * (effectController.inclination - 0.5);
    const phi = 2 * Math.PI * (effectController.azimuth - 0.5);

    sun.x = Math.cos(phi);
    sun.y = Math.sin(phi) * Math.sin(theta);
    sun.z = Math.sin(phi) * Math.cos(theta);
    // sun.z = -0.9999999999979956603656316;

    uniforms["sunPosition"].value.copy(sun);

    renderer.toneMappingExposure = effectController.exposure;
    renderer.render(scene, camera);
  }

  const gui = new GUI();

  gui.add(effectController, "turbidity", 0.0, 20.0, 0.1).onChange(guiChanged);
  gui.add(effectController, "rayleigh", 0.0, 4, 0.001).onChange(guiChanged);
  gui.add(effectController, "mieCoefficient", 0.0, 0.1, 0.001).onChange(guiChanged);
  gui.add(effectController, "mieDirectionalG", 0.0, 1, 0.001).onChange(guiChanged);
  gui.add(effectController, "inclination", 0, 1, 0.0001).onChange(guiChanged);
  gui.add(effectController, "azimuth", 0, 1, 0.0001).onChange(guiChanged);
  gui.add(effectController, "exposure", 0, 1, 0.0001).onChange(guiChanged);

  guiChanged();
}

function init() {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 20000);
  // camera.position.set(0, 100, 2000);

  scene = new THREE.Scene();

  /* sky */
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.3;
  // document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  // controls.maxPolarAngle = Math.PI / 2;
  controls.enableZoom = false;
  controls.enablePan = false;

  initSky();

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  renderer.render(scene, camera);
}

function mountains(params) {
  // let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);

  camera.position.set(0, 2, 13);

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
    time: { value: 2 },
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
    },
  });
  rtMat.defines = { USE_UV: "" };
  let rtPlane = new THREE.Mesh(rtGeo, rtMat);
  rtScene.add(rtPlane);
  //////////////////////////////////////////////////////////////////////

  let pg = new THREE.PlaneGeometry(50, 25, 50, 150);
  pg.rotateX(-Math.PI * 0.5);
  let pm = new THREE.MeshStandardMaterial({
    displacementMap: renderTarget.texture,
    displacementScale: 6,
    map: renderTarget.texture,
  });
  let plane = new THREE.Mesh(pg, pm);
  scene.add(plane);

  // let clock = new THREE.Clock();

  renderer.setAnimationLoop((_) => {
    // let t = clock.getElapsedTime();
    // globalUniforms.time.value = t;
    renderer.setRenderTarget(renderTarget);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  });
}

mountains();
