/* Three Js App */

// export the threeJsApplication object
export const threeJsApplication = {
    init: function () {

        // create a new Three.js scene
        /* const scene = new THREE.Scene();

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
         const geometry = new THREE.CubeGeometry(0.5, 0.5, 0.5)
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
         animate();*/


        /**Drag and drop test  */

        var canvas = document.getElementById("canvas");

        // Get the 2D context of the canvas element
        var ctx = canvas.getContext("2d");

        // Handle the drag start event
        function dragStart(event) {
            console.log("dragStart");
            event.dataTransfer.setData("text", event.target.id);
        }

        // Handle the drop event
        function drop(event) {
            console.log("drop");
            event.preventDefault();
            var data = event.dataTransfer.getData("text");

            // Draw the shape on the canvas
            switch (data) {
                case "square":
                    ctx.drawImage(document.getElementById(data), event.offsetX - 25, event.offsetY - 25);
                    break;
                case "circle":
                    ctx.drawImage(document.getElementById(data), event.offsetX - 25, event.offsetY - 25);
                    break;
                case "triangle":
                    ctx.drawImage(document.getElementById(data), event.offsetX - 25, event.offsetY - 25);
                    break;
            }
        }

        //make dragable event 

        document.getElementById("square").addEventListener("dragstart", dragStart, true);

        document.getElementById("circle").addEventListener("dragstart", dragStart, true);

        document.getElementById("triangle").addEventListener("dragstart", dragStart, true);


        //make dropable event 
        document.getElementById("square").addEventListener("drop", drop, true);

        




    },

}






//three js basic geometry form that you can generate from the three js library

/////CubeGeometry
// var geometry = new THREE.CubeGeometry( 1, 1, 1 );
/////SphereGeometry
// var geometry = new THREE.SphereGeometry( 1, 1, 1 );
/////TorusGeometry
// var geometry = new THREE.TorusGeometry( 1, 1, 1, 1 );

//bro i want to make a three js app that can generate 3D space Ships using basic geometry like box, cone, sphere, torus, capsule,
// to generate the 3d space ship the user can give 2d geometry like square, circle, triangle, rectangle, hexagon, pentagon eatch 2d geometry will be converted to 3d geometry and then the 3d geometry will be used to generate the 3d space ship 

//to make the user use a drag and drop interface to generate the 3d space ship, he will drag and drop the 2d geometry on a apart 2d interface with cases (10 x 10) every case represent a 2d element