/* Three Js App */

// export the threeJsApplication object
export const threeJsApplication = {
    init: function () {

        // get the space ships from the server and display them in the spaceShipsListDiv

        fetch("http://localhost/ships")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.displaySpaceShips(data);
            });
    },
    displaySpaceShips: function (data) {
        var spaceShipsListDiv = document.getElementById("spaceShipsListDiv");

        //make a canvas for each space ship and add it to the spaceShipsListDiv
        for (var i = 0; i < data.length; i++) {

            spaceShipsListDiv.innerHTML += `
                 <div class="spaceShipContainer">
                    <h2 class="contentTitle">${data[i].name}</h2>
                    <button class="deleteBtn" id="deleteBtn${data[i].id}">Delete</button>
                    <editBtn class="editBtn" id="editBtn${data[i].id}">Edit</editBtn>
                    <canvas id="canvas${data[i].id}"></canvas>
                 </div>
                    `;
            //generate the space ship scene
            this.generateSpaceShipScene(data[i]);
        }
    },
    generateSpaceShipScene: function (spaceShipToGenerate) {

        // console.log(spaceShipToGenerate);


        // create a new Three.js scene
        const scene = new THREE.Scene();

        // set the background color of the scene
        scene.background = new THREE.Color(0x13121a);

        // add a camera perspective to the scene
        const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 500);

        // Create a new Three.js renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector(`#canvas${spaceShipToGenerate.id}`)
        });


        // push all the parts of the space ship into an array
        var spaceShipParts = [];
        spaceShipParts.push(spaceShipToGenerate.frontHead);
        spaceShipParts.push(spaceShipToGenerate.body);
        spaceShipParts.push(spaceShipToGenerate.backPart);
        spaceShipParts.push(spaceShipToGenerate.leftWing);
        spaceShipParts.push(spaceShipToGenerate.rightWing);
        console.log(spaceShipParts);

        // push all the colors of the space ship into an array
        var spaceShipColors = [];
        spaceShipColors.push(spaceShipToGenerate.frontHeadColor);
        spaceShipColors.push(spaceShipToGenerate.bodyColor);
        spaceShipColors.push(spaceShipToGenerate.backPartColor);
        spaceShipColors.push(spaceShipToGenerate.leftWingColor);
        spaceShipColors.push(spaceShipToGenerate.rightWingColor);
        //  console.log(spaceShipColors);

        /*  shipFrontHead.position.x = 0;
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
          shipRightWing.position.z = 0;*/

        var shipsXParts = [0, 0, 0, -0.5, 0.5];
        var shipsYParts = [0.5, 0, -0.5, 0, 0];
        var shipsZParts = [0, 0, 0, 0, 0];


        // Set the size of the renderer
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

        // Create a new Three.js cube
        const cubeGeometryMesh = new THREE.CubeGeometry(0.5, 0.5, 0.5);
        const sphereGeometryMesh = new THREE.SphereGeometry(0.3, 0.3, 0.3);
        const coneGeometryMesh = new THREE.ConeGeometry(0.5, 0.5, 0.5);
        const cylinderGeometryMesh = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 0.5);

        // create a new geometry group
        var geometryGroup = new THREE.Group();

        var material;
        var part;

        // for each part of the space ship,
        for (var i = 0; i < spaceShipParts.length; i++) {
            // create a new material for it
            part = new THREE.MeshBasicMaterial({
                color: spaceShipColors[i]
            });

            console.log(spaceShipParts[i]);
            //check what type of geometry the part is and add the mesh to the the part variable
            if (spaceShipParts[i] == "cone") {
                part = new THREE.Mesh(coneGeometryMesh, material);
            } else if (spaceShipParts[i] == "cube") {
                part = new THREE.Mesh(cubeGeometryMesh, material);
            } else if (spaceShipParts[i] == "sphere") {
                part = new THREE.Mesh(sphereGeometryMesh, material);
            } else if (spaceShipParts[i] == "cylinder") {
                part = new THREE.Mesh(cylinderGeometryMesh, material);
            }

            // set the position of the part
            part.position.x = shipsXParts[i];
            part.position.y = shipsYParts[i];
            part.position.z = shipsZParts[i];

            // add the part to the geometry group
            geometryGroup.add(part);

        }



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

        fetch("http://localhost/PostShips", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: spaceShipName,
                    frontHead: frontHead[0],
                    body: body[0],
                    backPart: backPart[0],
                    leftWing: leftWing[0],
                    rightWing: rightWing[0],
                    frontHeadColor: frontHead[1],
                    bodyColor: body[1],
                    backPartColor: backPart[1],
                    leftWingColor: leftWing[1],
                    rightWingColor: rightWing[1]

                })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));

        console.log("done");

        // this.get3DspaceShipFromServer(spaceShipName, frontHead, body, backPart, leftWing, rightWing);

    },
    get3DspaceShipFromServer: function (spaceShipName, frontHead, body, backPart, leftWing, rightWing) {

        // send the space ship form info to the server

        // get the 3d space ship from the server

        // generate the 3d space ship
        //this.generate3DspaceShip(spaceShipName, frontHead, body, backPart, leftWing, rightWing);

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

        if (frontHead[0] == "cone") {
            shipFrontHead = new THREE.Mesh(coneGeometryMesh, frontHeadMaterial);
        } else if (frontHead[0] == "cube") {
            shipFrontHead = new THREE.Mesh(cubeGeometryMesh, frontHeadMaterial);
        } else if (frontHead[0] == "sphere") {
            shipFrontHead = new THREE.Mesh(sphereGeometryMesh, frontHeadMaterial);
        }

        if (body[0] == "cone") {
            shipBody = new THREE.Mesh(coneGeometryMesh, bodyMaterial);
        } else if (body[0] == "cube") {
            shipBody = new THREE.Mesh(cubeGeometryMesh, bodyMaterial);
        } else if (body[0] == "sphere") {
            shipBody = new THREE.Mesh(sphereGeometryMesh, bodyMaterial);
        }

        if (backPart[0] == "cone") {
            shipBackPart = new THREE.Mesh(coneGeometryMesh, backPartMaterial);
        } else if (backPart[0] == "cube") {
            shipBackPart = new THREE.Mesh(cubeGeometryMesh, backPartMaterial);
        } else if (backPart[0] == "sphere") {
            shipBackPart = new THREE.Mesh(sphereGeometryMesh, backPartMaterial);
        } else if (backPart[0] == "cylinder") {
            shipBackPart = new THREE.Mesh(cylinderGeometryMesh, backPartMaterial);
        }

        if (leftWing[0] == "cone") {
            shipLeftWing = new THREE.Mesh(coneGeometryMesh, leftWingMaterial);
        } else if (leftWing[0] == "cube") {
            shipLeftWing = new THREE.Mesh(cubeGeometryMesh, leftWingMaterial);
        } else if (leftWing[0] == "sphere") {
            shipLeftWing = new THREE.Mesh(sphereGeometryMesh, leftWingMaterial);
        }

        if (rightWing[0] == "cone") {
            shipRightWing = new THREE.Mesh(coneGeometryMesh, rightWingMaterial);
        } else if (rightWing[0] == "cube") {
            shipRightWing = new THREE.Mesh(cubeGeometryMesh, rightWingMaterial);
        } else if (rightWing[0] == "sphere") {
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