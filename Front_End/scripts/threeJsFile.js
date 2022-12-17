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
        const cubeGeometryMesh = new THREE.CubeGeometry(0.5, 0.5, 0.5);
        const sphereGeometryMesh = new THREE.SphereGeometry(0.3, 0.3, 0.3);
        const coneGeometryMesh = new THREE.ConeGeometry(0.5, 0.5, 0.5);


        const material = new THREE.MeshBasicMaterial({
            color: 0x8280FF
        });




        const cube = new THREE.Mesh(cubeGeometryMesh, material);

        const sphere = new THREE.Mesh(sphereGeometryMesh, material);

        const cone = new THREE.Mesh(coneGeometryMesh, material);

        const geometryGroup = new THREE.Group();

        geometryGroup.add(cube);
        geometryGroup.add(sphere);
        geometryGroup.add(cone);


        cube.position.x = 0;
        cube.position.y = -0, 5;
        cube.position.z = 0;

        sphere.position.x = 0;
        sphere.position.y = -0.8;
        sphere.position.z = 0;

        cone.position.x = 0;
        cone.position.y = 0.7;
        cone.position.z = 0;

        // Add the cube to the scene
        scene.add(geometryGroup);

        // Set the position of the camera
        camera.position.z = 5;

        // Start the renderer
        renderer.render(scene, camera);

        // Animate the scene (rotate the cube)
        function animate() {
            requestAnimationFrame(animate); //call the animate function again when the browser is ready to render the next frame
            // geometryGroup.rotation.x += 0.005; //rotate the cube on the x axis (you can change the value to make it rotate faster or slower)
            geometryGroup.rotation.y += 0.005; //rotate the cube on the y axis (you can change the value to make it rotate faster or slower)
            geometryGroup.rotation.z += 0.005; //rotate the cube on the z axis (you can change the value to make it rotate faster or slower)
            renderer.render(scene, camera);
        }
        animate(); //call the animate function

    },
    getFormInfoAndSendTosever: function () {

        // get the space ship form info

        const spaceShipName = document.getElementById("spaceShipName").value;

        const frontHead = [document.getElementById("frontHeadShap").value,
            document.getElementById("frontHeadColor").value
        ];

        const body = [document.getElementById("frontHeadShap").value,
            document.getElementById("bodyColor").value
        ];

        const backPart = [document.getElementById("backEngineShap").value,
            document.getElementById("backEngineColor").value
        ];

        const leftWing = [document.getElementById("leftWingShap").value,
            document.getElementById("leftWingColor").value
        ];

        const rightWing = [document.getElementById("rightWingShap").value,
            document.getElementById("rightWingColor").value
        ];

        console.log(spaceShipName);
        console.log(frontHead);
        console.log(body);
        console.log(backPart);
        console.log(leftWing);
        console.log(rightWing);
        
        // send the space ship form info to the server

    }


}