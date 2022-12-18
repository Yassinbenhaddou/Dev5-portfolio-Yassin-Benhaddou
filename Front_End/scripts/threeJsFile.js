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
        cube.position.y = 0;
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


        // send the space ship form info to the server
        console.log(spaceShipName);
        console.log(frontHead);
        console.log(body);
        console.log(backPart);
        console.log(leftWing);
        console.log(rightWing);




        this.get3DspaceShipFromServer(spaceShipName, frontHead, body, backPart, leftWing, rightWing);

       

        

    },
    get3DspaceShipFromServer: function (spaceShipName, frontHead, body, backPart, leftWing, rightWing) {

        // send the space ship form info to the server

        // get the 3d space ship from the server

        // generate the 3d space ship
        this.generate3DspaceShip(spaceShipName, frontHead, body, backPart, leftWing, rightWing);

    },
    generate3DspaceShip: function (spaceShipName, frontHead, body, backPart, leftWing, rightWing) {
        

        // create a new Three.js scene
        const scene = new THREE.Scene();

        // set the background color of the scene
        scene.background = new THREE.Color(0x03030);

        // add a camera perspective to the scene
        const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 500);

        // Create a new Three.js renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector("#generatedSpaceShipCanva")
        });

        // Set the size of the renderer
        renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);

        // Create a new Three.js cube
        const cubeGeometryMesh = new THREE.CubeGeometry(0.5, 0.5, 0.5);
        const sphereGeometryMesh = new THREE.SphereGeometry(0.3, 0.3, 0.3);
        const coneGeometryMesh = new THREE.ConeGeometry(0.5, 0.5, 0.5);
        const cylinderGeometryMesh = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 0.5);

        //log witch type of var is the frontHead
        console.log(typeof frontHead);
        console.log(typeof frontHead[1]);

        //remove the # from the color code and convert it to hex
        const frontHeadColor = parseInt(frontHead[1].replace("#", "0x"));
        const bodyColor = parseInt(body[1].replace("#", "0x"));
        const backPartColor = parseInt(backPart[1].replace("#", "0x"));
        const leftWingColor = parseInt(leftWing[1].replace("#", "0x"));
        const rightWingColor = parseInt(rightWing[1].replace("#", "0x"));


        const frontHeadMaterial = new THREE.MeshBasicMaterial({
            color: frontHeadColor
        });

        const bodyMaterial = new THREE.MeshBasicMaterial({
            color: bodyColor
        });

        const backPartMaterial = new THREE.MeshBasicMaterial({
            color: backPartColor
        });

        const leftWingMaterial = new THREE.MeshBasicMaterial({
            color: leftWingColor
        });

        const rightWingMaterial = new THREE.MeshBasicMaterial({
            color: rightWingColor
        });

        var shipFrontHead = new THREE.Mesh(coneGeometryMesh, frontHeadMaterial);

        var shipBody = new THREE.Mesh(cubeGeometryMesh, backPartMaterial);

        var shipBackPart = new THREE.Mesh(sphereGeometryMesh, bodyMaterial);

        var shipLeftWing = new THREE.Mesh(cubeGeometryMesh, leftWingMaterial);

        var shipRightWing = new THREE.Mesh(cubeGeometryMesh, rightWingMaterial);

        if(frontHead[0] == "cone"){
            shipFrontHead = new THREE.Mesh(coneGeometryMesh, frontHeadMaterial);
        }else if(frontHead[0] == "cube"){
            shipFrontHead = new THREE.Mesh(cubeGeometryMesh, frontHeadMaterial);
        }else if(frontHead[0] == "sphere"){
            shipFrontHead = new THREE.Mesh(sphereGeometryMesh, frontHeadMaterial);
        }

        if(body[0] == "cone"){
            shipBody = new THREE.Mesh(coneGeometryMesh, bodyMaterial);
        }else if(body[0] == "cube"){
            shipBody = new THREE.Mesh(cubeGeometryMesh, bodyMaterial);
        }else if(body[0] == "sphere"){
            shipBody = new THREE.Mesh(sphereGeometryMesh, bodyMaterial);
        }

        if(backPart[0] == "cone"){
            shipBackPart = new THREE.Mesh(coneGeometryMesh, backPartMaterial);
        }else if(backPart[0] == "cube"){
            shipBackPart = new THREE.Mesh(cubeGeometryMesh, backPartMaterial);
        }else if(backPart[0] == "sphere"){
            shipBackPart = new THREE.Mesh(sphereGeometryMesh, backPartMaterial);
        }else if(backPart[0] == "cylinder"){
            shipBackPart = new THREE.Mesh(cylinderGeometryMesh, backPartMaterial);
        }

        if(leftWing[0] == "cone"){
            shipLeftWing = new THREE.Mesh(coneGeometryMesh, leftWingMaterial);
        }else if(leftWing[0] == "cube"){
            shipLeftWing = new THREE.Mesh(cubeGeometryMesh, leftWingMaterial);
        }else if(leftWing[0] == "sphere"){
            shipLeftWing = new THREE.Mesh(sphereGeometryMesh, leftWingMaterial);
        }

        if(rightWing[0] == "cone"){
            shipRightWing = new THREE.Mesh(coneGeometryMesh, rightWingMaterial);
        }else if(rightWing[0] == "cube"){
            shipRightWing = new THREE.Mesh(cubeGeometryMesh, rightWingMaterial);
        }else if(rightWing[0] == "sphere"){
            shipRightWing = new THREE.Mesh(sphereGeometryMesh, rightWingMaterial);
        }

        


        const geometryGroup = new THREE.Group();

        geometryGroup.add(shipFrontHead);
        geometryGroup.add(shipBody);
        geometryGroup.add(shipBackPart);
        geometryGroup.add(shipLeftWing);
        geometryGroup.add(shipRightWing);

        shipFrontHead.position.x = 0;
        shipFrontHead.position.y = 0.5;
        shipFrontHead.position.z = 0;

        shipBody.position.x = 0;
        shipBody.position.y = 0;
        shipBody.position.z = 0;

        shipBackPart.position.x = 0;
        shipBackPart.position.y = -0.5;
        shipBackPart.position.z = 0;

        shipLeftWing.position.x = -0.5;
        shipLeftWing.position.y = 0;
        shipLeftWing.position.z = 0;

        shipRightWing.position.x = 0.5;
        shipRightWing.position.y = 0;
        shipRightWing.position.z = 0;

        

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
            geometryGroup.rotation.x += 0.005; //rotate the cube on the z axis (you can change the value to make it rotate faster or slower)
            renderer.render(scene, camera);
        }
        animate(); 

    }


}