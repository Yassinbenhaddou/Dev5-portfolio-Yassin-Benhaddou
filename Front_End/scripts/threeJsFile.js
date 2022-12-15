/* Three Js App */

// export the threeJsApplication object
export const threeJsApplication = {
    init: function () {

        // create a new Three.js scene
        const scene = new THREE.Scene();

        // set the background color of the scene
        scene.background = new THREE.Color(0x03030);

        // add a camera perspective to the scene
        const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 500);

        // Create a new Three.js renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector("#mySpaceShipCanva")
        });

        // Set the size of the renderer
        renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);

        // Create a new Three.js cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x8280FF
        });
        const cube = new THREE.Mesh(geometry, material);

        // Add the cube to the scene
        scene.add(cube);

        // Set the position of the camera
        camera.position.z = 5;

        // Start the renderer
        renderer.render(scene, camera);

        // Animate the scene (rotate the cube)
        function animate() {
            requestAnimationFrame(animate); //call the animate function again when the browser is ready to render the next frame
            cube.rotation.x += 0.01; //rotate the cube on the x axis (you can change the value to make it rotate faster or slower)
            cube.rotation.y += 0.01; //rotate the cube on the y axis (you can change the value to make it rotate faster or slower)

            renderer.render(scene, camera);
        }
        animate();
        

    },
    
}

