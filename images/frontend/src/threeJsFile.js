/* Three Js App */

import {
    spaceShipsGeneratorHelper
} from './spaceShipsGeneratorHelper.js';

import {
    fetchFunctions
} from './fetchFunctions.js';

var canvas = [];
var cameras = [];
var scenes = [];
var renderers = [];
var geometryGroups = [];
var allMySpaceShipsData;

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

                geometryGroups[i] = new THREE.Group();

                scenes[i] = new THREE.Scene()

                scenes[i].background = new THREE.Color(0x0d001f);

                cameras[i] = new THREE.PerspectiveCamera(75, 1, 0.1, 10)

                cameras[i].position.z = 2

                canvas[i] = document.getElementById('canvas' + allMySpaceShipsData[i].id);

                renderers[i] = new THREE.WebGLRenderer({
                    canvas: canvas[i]
                })
                renderers[i].setSize(200, 200);

                // push all the parts of the space ship into an array
                var spaceShipParts = spaceShipsGeneratorHelper.pushEveryPartIntoAnArray(allMySpaceShipsData[i]);

                // push all the colors of the space ship into an array
                var spaceShipColors = spaceShipsGeneratorHelper.pushEveryColorIntoAnArray(allMySpaceShipsData[i]);

                var cube = spaceShipsGeneratorHelper.generateTheCorrectSpaceShip(spaceShipParts, spaceShipColors);
                geometryGroups[i].add(cube)

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
                //fetchFunctions.getSpaceShip(this.id);
            });
        }

    },
    getFormInfoAndSendTosever: function () {

        //set all the info into an object
        const spaceShipInfo = spaceShipsGeneratorHelper.getSpaceShipInfoFromForm();

        fetchFunctions.postSpaceShip(spaceShipInfo)

        console.log("done");

    }

}