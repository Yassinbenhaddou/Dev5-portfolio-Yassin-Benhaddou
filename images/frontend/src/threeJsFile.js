/* Three Js App */

// import the spaceShipsGeneratorHelper from the spaceShipsGeneratorHelper.js file
import {
    spaceShipsGeneratorHelper
} from './spaceShipsGeneratorHelper.js';


// import the fetchFunctions from the fetchFunctions.js file
import {
    fetchFunctions
} from './fetchFunctions.js';


// import the updateScript from the updateScript.js file
import {
    updateScriptFunctions
} from './updateScript.js';

// to render my 3D space ships correctly using three.js, 
//i need to create multiples canvas, scenes, cameras, renderers, geometryGroups, etc...
// so i created arrays to store all the elements that i need to create

var canvas = []; // this array will contain every canvas element that will be created
var cameras = []; // this array will contain every camera that will be created
var scenes = []; // this array will contain every scene that will be created
var renderers = []; // this array will contain every renderer that will be created
var geometryGroups = []; // this array will contain every geometryGroup that will be created
var allMySpaceShipsData; // this array will contain every space ship data that will be fetched from the server

// export the threeJsApplication object
export const threeJsApplication = {
    init: function () {

        //fetch (GET) the space ships from the server
        fetchFunctions.getSpaceShips();
    },
    displaySpaceShips: function (data) {

        //empty the spaceShipsListDiv
        document.getElementById("spaceShipsListDiv").innerHTML = "";

        //check if the data is empty or not and display the correct message (if empty show the empty message, if not empty show the space ships)

        if (data.length == 0) {
            //add a empty message to the spaceShipsListDiv
            document.getElementById("spaceShipsListDiv").innerHTML = `
                <div class'spaceShipsCards' id="emptyDbMessageDiv">
                    <h2>There are no space ships in the database</h2>
                    <h2>please make a space ship and publish it</h2>
                </div>
                `;
        } else {

            allMySpaceShipsData = data;
            //create all needed canvas
            spaceShipsGeneratorHelper.createNeededCanvas(allMySpaceShipsData);

            //set for loo to create multiples scenes
            for (var i = 0; i < allMySpaceShipsData.length; i++) {
                console.log(allMySpaceShipsData[i].name);

                geometryGroups[i] = new THREE.Group(); // create a new geometryGroup

                scenes[i] = new THREE.Scene() // create a new scene

                scenes[i].background = new THREE.Color(0x0d001f); // set the background color of the scene

                cameras[i] = new THREE.PerspectiveCamera(75, 1, 0.1, 10) // create a new camera

                cameras[i].position.z = 2 // set the camera position

                canvas[i] = document.getElementById('canvas' + allMySpaceShipsData[i].id); // get the canvas element

                // create a new renderer and set the canvas of the renderer to the canvas element
                renderers[i] = new THREE.WebGLRenderer({
                    canvas: canvas[i]
                })
                // set the size of the renderer
                renderers[i].setSize(200, 200);

                // push all the parts of the space ship into an array
                var spaceShipParts = spaceShipsGeneratorHelper.pushEveryPartIntoAnArray(allMySpaceShipsData[i]);

                // push all the colors of the space ship into an array
                var spaceShipColors = spaceShipsGeneratorHelper.pushEveryColorIntoAnArray(allMySpaceShipsData[i]);

                var spaceSHipForm = spaceShipsGeneratorHelper.generateTheCorrectSpaceShip(spaceShipParts, spaceShipColors);
                geometryGroups[i].add(spaceSHipForm)

                scenes[i].add(geometryGroups[i]);

            }

            var toAnimateAndRender = 0;
            var toAnimateAndRenderMax = allMySpaceShipsData.length - 1;

            function animate() {
                requestAnimationFrame(animate)

                if (toAnimateAndRender > toAnimateAndRenderMax) {
                    toAnimateAndRender = 0;
                }

                geometryGroups[toAnimateAndRender].rotation.x += 0.02
                geometryGroups[toAnimateAndRender].rotation.y += 0.02

                render();

                toAnimateAndRender++;
            }

            function render() {

                renderers[toAnimateAndRender].render(scenes[toAnimateAndRender], cameras[toAnimateAndRender])

            }

            animate();

            this.addSpaceShipsListeners();
        }
    },
    addSpaceShipsListeners: function () {

        //delete btns listeners
        var deleteBtns = document.getElementsByClassName("deleteBtn");
        for (var i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", function () {
                console.log(this.id);
                fetchFunctions.deleteSpaceShip(this.id);
            });
        }

        //edit btns listeners
        var editBtns = document.getElementsByClassName("editBtn");
        for (var i = 0; i < editBtns.length; i++) {
            editBtns[i].addEventListener("click", function () {
                console.log(this.id);
                fetchFunctions.getSpaceShipById(this.id);



            });
        }

    },
    getFormInfoAndSendTosever: function () {

        //set all the info into an object
        const spaceShipInfo = spaceShipsGeneratorHelper.getSpaceShipInfoFromForm();

        fetchFunctions.postSpaceShip(spaceShipInfo)

        console.log("done");

    },
    updateSpaceShip: function (selectedSpaceShip) {

        //firt we need to move to the space ship maker page
        document.getElementById("spaceShipsListId").classList.remove("navSelected"); //remove the class from the button

        document.getElementById("spaceShipMakerId").classList.add("navSelected"); //add the navSelected class to the button that was clicked

        document.getElementById("spaceShipsListIdDiv").style.display = "none"; //hide the div

        //show the div that corresponds to the button that was clicked
        document.getElementById("spaceShipMakerIdDiv").style.display = "block";

        console.log('Go update the space ship Hi Hi Hi =D');

        selectedSpaceShip = selectedSpaceShip[0];
        console.log(selectedSpaceShip);

        // generate the selected space ship using the setupTheFormWithTheCorrectValues function in the updateScriptFunctions.js file
        updateScriptFunctions.generateTheSelectedSpaceShipInTheEditCanvas(selectedSpaceShip);


        // before that we set the form with the correct values we need to set the colors code in the correct format
        // set the colors code in the correct format using the setupTheFormWithTheCorrectValues function in the updateScriptFunctions.js file
        selectedSpaceShip = updateScriptFunctions.TransformTheColorCode0x00000ToHexColorType(selectedSpaceShip);

        /* setup the form with the correct values */
        updateScriptFunctions.setupTheFormWithTheCorrectValues(selectedSpaceShip);

        // add the update btn listener
        document.getElementById("updateBtn").addEventListener("click", function () {

            var updatedSpaceShip = spaceShipsGeneratorHelper.getSpaceShipInfoFromForm();

            fetchFunctions.updateSpaceShipFetch(updatedSpaceShip, selectedSpaceShip.id);
        });

    }

}