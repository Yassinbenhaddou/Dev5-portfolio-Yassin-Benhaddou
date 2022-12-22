// Discription: This script is used to update the needed space ship
import {
    spaceShipsGeneratorHelper
} from './spaceShipsGeneratorHelper.js';

// export the class
export const updateScriptFunctions = {

    generateTheSelectedSpaceShipInTheEditCanvas: function (selectedSpaceShip) {


        //to update the space ship we show it in the editYourSpaceShipCanva and we change the submit button to update button    we also change the value of the input corect color and correct part 
        document.getElementById("editYourSpaceShipCanva").style.display = "block";
        document.getElementById("generateBtn").style.display = "none";
        document.getElementById("updateBtn").style.display = "block";

        //render the 3d space ship in the editYourSpaceShipCanva
        var scene = new THREE.Scene()

        scene.background = new THREE.Color(0x0d001f);

        var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10)

        camera.position.z = 2

        var canvas = document.getElementById('editYourSpaceShipCanva');

        var renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })

        // set the size of the renderer
        renderer.setSize(200, 200);

        //create a geometry group to hold all the geometry
        var geometryGroup = new THREE.Group();

        // push all the parts of the space ship into an array
        var spaceShipParts = spaceShipsGeneratorHelper.pushEveryPartIntoAnArray(selectedSpaceShip);

        // push all the colors of the space ship into an array
        var spaceShipColors = spaceShipsGeneratorHelper.pushEveryColorIntoAnArray(selectedSpaceShip);

        //generate the correct space ship
        var spaceShipGeoMetry = spaceShipsGeneratorHelper.generateTheCorrectSpaceShip(spaceShipParts, spaceShipColors);

        //add the space ship geometry to the geometry group
        geometryGroup.add(spaceShipGeoMetry)

        scene.add(geometryGroup);

        function animate() {
            requestAnimationFrame(animate)

            geometryGroup.rotation.x += 0.02
            geometryGroup.rotation.y += 0.02

            render();

        }

        function render() {

            renderer.render(scene, camera)

        }

        animate();
    },
    TransformTheColorCode0x00000ToHexColorType: function (selectedSpaceShip) {
        //here we will transform every part color of the space from 0x00000 to #000000
        // we will just change the colors and then return the space ship with the new colors but the same structure
        //to transform the color we need to just change the 0x to #
        var spaceShip = selectedSpaceShip;

        //transform the front head color
        spaceShip.frontHeadColor = spaceShip.frontHeadColor.replace("0x", "#");

        //transform the body color
        spaceShip.bodyColor = spaceShip.bodyColor.replace("0x", "#");

        //transform the back part color
        spaceShip.backPartColor = spaceShip.backPartColor.replace("0x", "#");

        //transform the right wing color
        spaceShip.rightWingColor = spaceShip.rightWingColor.replace("0x", "#");

        //transform the left wing color
        spaceShip.leftWingColor = spaceShip.leftWingColor.replace("0x", "#");

        return spaceShip;

    },
    setupTheFormWithTheCorrectValues: function (selectedSpaceShip) {
        //set the correct name
        document.getElementById("spaceShipName").value = selectedSpaceShip.name;

        //set the correct front head shape (form)
        document.getElementById("frontHeadShap").value = selectedSpaceShip.frontHead;

        //set the correct front head color
        document.getElementById("frontHeadColor").value = selectedSpaceShip.frontHeadColor;

        //set the correct body shape (form)
        document.getElementById("bodyShap").value = selectedSpaceShip.body;

        //set the correct body color
        document.getElementById("bodyColor").value = selectedSpaceShip.bodyColor;

        //set the correct back part shape (form)
        document.getElementById("backEngineShap").value = selectedSpaceShip.backPart;

        //set the correct back part color
        document.getElementById("backEngineColor").value = selectedSpaceShip.backPartColor;

        //set the correct right wing shape (form)
        document.getElementById("rightWingShap").value = selectedSpaceShip.rightWing;

        //set the correct right wing color
        document.getElementById("rightWingColor").value = selectedSpaceShip.rightWingColor;

        //set the correct left wing shape (form)
        document.getElementById("leftWingShap").value = selectedSpaceShip.leftWing;

        //set the correct left wing color
        document.getElementById("leftWingColor").value = selectedSpaceShip.leftWingColor;
    }

};