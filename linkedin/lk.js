// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create square geometry
const squareGeometry = new THREE.BoxGeometry(1, 1, 1);

// Load the texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('lk.png');

// Create material with the texture
const boxMaterial = new THREE.MeshBasicMaterial({ map: texture });

// Create square mesh with the textured material
const squareMesh = new THREE.Mesh(squareGeometry, boxMaterial);

// Add square mesh to the scene
scene.add(squareMesh);

// Set camera position
camera.position.z = 5;

// Variables for smooth up and down motion
let time = 0;
const motionSpeed = 0.005;

// Variables for tilting the box
let tiltAngle = 0;
const tiltSpeed = 0.02;

// Render the scene
const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the square around its own axis
    squareMesh.rotation.y += 0.01;

    // Tilt the box up and down
    tiltAngle += tiltSpeed;
    squareMesh.rotation.x = Math.sin(tiltAngle) * 0.5; // Adjust the amplitude as needed

    // Smooth up and down motion using a sine function
    const upDownMotion = Math.sin(time) * 0.2; // Adjust the amplitude as needed
    squareMesh.position.y = upDownMotion;

    time += motionSpeed;

    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener("resize", () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

animate();
