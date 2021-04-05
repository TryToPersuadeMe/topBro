import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { ImprovedNoise } from "https://threejs.org/examples/jsm/math/ImprovedNoise.js";

const perlin = new ImprovedNoise();

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0.5, 1);

// let backColor = 0xff7fbb;
// scene.fog = new THREE.Fog(backColor, 2, 100);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

let light = new THREE.DirectionalLight(0xff99dd, 7);
light.position.set(0, 45, -200);
scene.add(light, new THREE.AmbientLight(0xcc338f, 0.5));

//sun
let globalUniforms = {
  time: { value: 0 },
};

let sg = new THREE.CircleGeometry(20, 64);
let sm = new THREE.MeshBasicMaterial({
  color: 0xe19e40,
  fog: false,
  transparent: true,
  onBeforeCompile: (shader) => {
    shader.uniforms.time = globalUniforms.time;
    shader.fragmentShader = `
      uniform float time;
      ${shader.fragmentShader}`.replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `
        vec2 uv = vUv - 0.5;
        float f = smoothstep(0.5, 0.475, length(uv));
        
        // stripes
        vec2 sUv = uv;
        sUv.y *= 100.;
        float sf = (sin(sUv.y - (time * 2.)) * 0.5 + 0.5);
        float wave = (uv.y + 0.5) * 2.;
        float e = length(fwidth(sUv));
        sf = 1. - smoothstep(wave - e, wave, sf);
        //
        vec3 col = mix(diffuse * vec3(1, 0.75, 0.875), diffuse, clamp(vUv.y * 4., 0., 1.));
        vec4 diffuseColor = vec4( col, pow(f, 3.) * sf );
      `
    );
  },
});
sm.defines = { USE_UV: "" };
let so = new THREE.Mesh(sg, sm);
so.position.copy(camera.position).setY(10).z -= 250;

scene.add(so);

//scene.add(new THREE.GridHelper(125, 10, 0x007f7f, 0x007f7f));

// background
let bg = new THREE.SphereGeometry(400, 64, 32);
let bm = new THREE.MeshBasicMaterial({
  fog: false,
  side: THREE.BackSide,
  onBeforeCompile: (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `
        vec2 uv = vUv;
        vec3 c1 = vec3(1., 0.5, 0.5);
        vec3 c2 = vec3(0, 0, 0.5);
        float f = smoothstep(0.5, 0.575, uv.y);
        vec3 col = mix(c1, c2, f);
      vec4 diffuseColor = vec4( col, opacity );`
    );
  },
});
bm.defines = { USE_UV: "" };
let bo = new THREE.Mesh(bg, bm);
scene.add(bo);

/* chunk */
let globalCounter = 1;
let chunks = [];

createChunk(0, 0x00007f);
createChunk(-125, 0x00007f);

let clock = new THREE.Clock();

let scrollPos = 0;
window.addEventListener("scroll", () => (scrollPos = window.scrollY));

renderer.setAnimationLoop((_) => {
  let t = clock.getDelta() * 25;
  // renderer.setClearColor(backColor);

  so.scale.x = 1 + scrollPos * 0.00005;
  so.scale.y = 1 + scrollPos * 0.00005;

  globalUniforms.time.value = clock.getElapsedTime();
  let calcedPos = (scrollPos * 0.0025) % 50;

  chunks.forEach((chunk) => {
    // let scrollPosCounted = scrollPos / 500;
    // console.log(scrollPosCounted);
    // chunk.position.z = scrollPosCounted;

    // chunk.position.z += t;

    chunk.position.z = calcedPos;
    console.log(chunk.position.z);

    if (chunk.position.z > 125 / 2) {
      let p = chunk.position.z % 125;
      console.log(p);
      chunk.position.z = -125 + p;
      updateChunk(chunk);
    }
  });

  renderer.render(scene, camera);
});
console.log(camera);

// dots
// let pos = g.attributes.position;

// let ig = new THREE.InstancedBufferGeometry().copy(new THREE.SphereGeometry(0.1, 8, 6));
// ig.instanceCount = Infinity;
// ig.setAttribute("instPos", new THREE.InstancedBufferAttribute(pg.attributes.position.array, 3));
// let im = new THREE.MeshBasicMaterial({
//   color: 0xd3f1f1,
//   onBeforeCompile: (shader) => {
//     shader.vertexShader = `
//       attribute vec3 instPos;
//       ${shader.vertexShader}
//     `.replace(
//       `#include <begin_vertex>`,
//       `#include <begin_vertex>
//         transformed += instPos;
//       `
//     );
//     shader.fragmentShader = shader.fragmentShader.replace(
//       `#include <fog_fragment>`,
//       `#ifdef USE_FOG
//           #ifdef FOG_EXP2
//             float fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );
//           #else
//             float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
//           #endif
//           if (fogDepth > fogFar) discard;
//           gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
//         #endif`
//     );
//   },
// });
// let io = new THREE.Mesh(ig, im);
// io.frustumCulled = false;
// scene.add(io);

/* dots end */

function createChunk(posZ) {
  let chunk = new THREE.Group();

  let pg = new THREE.PlaneGeometry(100, 125, 50, 125);
  pg.rotateX(-Math.PI * 0.5);
  let pm = new THREE.MeshStandardMaterial({
    color: 0x00007f,
    roughness: 1,
    metalness: 0.8,
    wireframe: false,
    onBeforeCompile: (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <fog_fragment>`,
        `
        // http://madebyevan.com/shaders/grid/
        vec2 coord = vUv * vec2(50., 125.);
        vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) / 1.5;
        float line = min(grid.x, grid.y);
        line = min(line, 1.0);
        vec3 col = mix(vec3(0.5, 1, 1), gl_FragColor.rgb, line);
        gl_FragColor = vec4( col, opacity);
        
        #ifdef USE_FOG
          #ifdef FOG_EXP2
            float fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );
          #else
            float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
          #endif
          if (fogDepth > fogFar + 50.) discard;
          gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
        #endif
      `
      );
    },
  });

  pm.defines = { USE_UV: "" };

  let po = new THREE.Mesh(pg, pm);
  chunk.add(po);

  chunk.position.z = posZ;

  updateChunk(chunk);

  chunks.push(chunk);

  scene.add(chunk);
}

function updateChunk(chunk) {
  let g = chunk.children[0].geometry;
  let pos = g.attributes.position;
  let uv = g.attributes.uv;
  let vUv = new THREE.Vector2();
  let uvScale = new THREE.Vector2(10, 25);
  for (let i = 0; i < pos.count; i++) {
    vUv.fromBufferAttribute(uv, i);
    let s = smoothstep(0.005, 0.125, Math.abs(vUv.x - 0.5));
    vUv.multiply(uvScale);
    vUv.y += uvScale.y * globalCounter;
    let y = perlin.noise(vUv.x, vUv.y, 1) * 0.5 + 0.5;
    pos.setY(i, Math.pow(y, 5) * 45 * s);
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

function onWindowResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}
