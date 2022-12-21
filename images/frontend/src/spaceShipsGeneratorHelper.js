// create my needed geometries
const cubeGeometryMesh = new THREE.CubeGeometry(0.5, 0.5, 0.5);
const sphereGeometryMesh = new THREE.SphereGeometry(0.3, 0.3, 0.3);
const coneGeometryMesh = new THREE.ConeGeometry(0.5, 0.5, 0.5);
const cylinderGeometryMesh = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 0.5);

export const spaceShipsGeneratorHelper = {

    createNeededCanvas: function (allMySpaceShipsData) { 

        // for each space ship, create a canvas

        for (var i = 0; i < allMySpaceShipsData.length; i++) {
            // create the canvas 
            document.getElementById("spaceShipsListDiv").innerHTML += `
             <div class="spaceShipContainer">
                <h2 class="contentTitle">${allMySpaceShipsData[i].name}</h2>
                <button class="deleteBtn" id="${allMySpaceShipsData[i].id}">Delete</button>
                <editBtn class="editBtn" id="${allMySpaceShipsData[i].id}">Edit</editBtn>
                <canvas id="canvas${allMySpaceShipsData[i].id}"></canvas>
             </div>
             `;
        }
    },
    pushEveryPartIntoAnArray: function (spaceShipToGenerate) {
        // push all the parts of the space ship into an array
        var spaceShipParts = [];
        spaceShipParts.push(spaceShipToGenerate.frontHead);
        spaceShipParts.push(spaceShipToGenerate.body);
        spaceShipParts.push(spaceShipToGenerate.backPart);
        spaceShipParts.push(spaceShipToGenerate.leftWing);
        spaceShipParts.push(spaceShipToGenerate.rightWing);
        console.log(spaceShipParts);

        return spaceShipParts;
    },
    pushEveryColorIntoAnArray: function (spaceShipToGenerate) {
        // push all the colors of the space ship into an array
        var spaceShipColors = [];
        spaceShipColors.push(spaceShipToGenerate.frontHeadColor);
        spaceShipColors.push(spaceShipToGenerate.bodyColor);
        spaceShipColors.push(spaceShipToGenerate.backPartColor);
        spaceShipColors.push(spaceShipToGenerate.leftWingColor);
        spaceShipColors.push(spaceShipToGenerate.rightWingColor);

        return spaceShipColors;
    },
    generateTheCorrectSpaceShip: function (spaceShipParts, spaceShipColors) {

        var geometryGroup = new THREE.Group();

        var shipsXParts = [0, 0, 0, -0.5, 0.5];
        var shipsYParts = [0.5, 0, -0.5, 0, 0];
        var shipsZParts = [0, 0, 0, 0, 0];
        var part = [];
        // for each part of the space ship,
        for (var i = 0; i < spaceShipParts.length; i++) {

            // create a new material for the part
            console.log(spaceShipColors[i]);
            let colorInt = parseInt(spaceShipColors[i]);
            var material = new THREE.MeshBasicMaterial({
                color: colorInt
            });

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

        return geometryGroup;
    },
    getSpaceShipInfoFromForm: function () {
        const spaceShipInfo = {
            spaceShipName: document.getElementById("spaceShipName").value,
            frontHead: [document.getElementById("frontHeadShap").value,
                document.getElementById("frontHeadColor").value
            ],
            body: [document.getElementById("frontHeadShap").value,
                document.getElementById("bodyColor").value
            ],
            backPart: [document.getElementById("backEngineShap").value,
                document.getElementById("backEngineColor").value
            ],
            leftWing: [document.getElementById("leftWingShap").value,
                document.getElementById("leftWingColor").value
            ],
            rightWing: [document.getElementById("rightWingShap").value,
                document.getElementById("rightWingColor").value
            ]
        }
        return spaceShipInfo;
    }
};