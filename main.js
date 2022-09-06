import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Luzes

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Estrelas

function addStar() {
  const geometry = new THREE.SphereGeometry(0.17, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('./images/black.png');
scene.background = spaceTexture;

// Logo Espacial

const logoTexture = new THREE.TextureLoader().load('./images/texture.png');
const logo = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: logoTexture }));
scene.add(logo);

logo.position.z = 3;
logo.position.y = 0;
logo.position.x = 0;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0004;
  camera.rotation.y = t * -0.0004;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  logo.rotation.y += 0.01;
  logo.rotation.z += 0.01;
  //controls.update();

  renderer.render(scene, camera);
}

animate();