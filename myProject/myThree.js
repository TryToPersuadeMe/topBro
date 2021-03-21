const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath("./assets/");
mtlLoader.load("MickeyMouse.mtl", function (material) {
  material.preload();
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(material);

  objLoader.setPath("./assets/");
  objLoader.load("MickeyMouse.obj", function (object) {
    scene.add(object);
    object.position.y -= 60;
  });
});

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
