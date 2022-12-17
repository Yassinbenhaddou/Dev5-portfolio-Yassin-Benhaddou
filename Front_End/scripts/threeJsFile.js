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

        /**Drag and drop test  */



        /*
        *i want to make a three js app that generate 3D space ships using basic three js forms i want min 3 basic three.js form like box, sphere and cone.
        the user generate the 3D space ship from a 2d interface, the 2d interface contain a table 10 x 10 and 3 2d svg shaps like rect, circle and triangle. The user can drag and drop the shaps on the chosen case of the table, the chosen case get the shap that the user has droped in when the user is done he can click on the generate button the  we show the generated ship on a aparte canvas 
         */

        /* 
        
i have found another alternative can you help me using this my alternative is to have the 2d elments using svg and  baisc html elements the user can drag and drop to place the 2d elments where he want on the canvas 

          * */

        this.dragAndDropTable();

    },
    dragAndDropTable: function () {
        console.log("drag and drop table");

        // get the table cells and SVG shapes
        const cells = document.querySelectorAll("td");
        const shapes = document.querySelectorAll("svg");

        // make the shapes draggable
        shapes.forEach(shape => {
            shape.addEventListener("dragstart", e => {
                // set the data that will be transferred with the drag event
                e.dataTransfer.setData("shape", shape.innerHTML);
            });
        });

        // make the table cells droppable
        cells.forEach(cell => {
            cell.addEventListener("dragover", e => {
                // allow the drop event to be triggered
                e.preventDefault();
                //console.log("drag over");
            });
            cell.addEventListener("drop", e => {
                // get the data transferred with the drag event
                const html = e.dataTransfer.getData("shape");
                console.log(html);

                //get the cell position
                const cellLeft = cell.offsetLeft;
                const cellTop = cell.offsetTop;

                //create a new svg element and set the position of the svg element
                const shapeToDraw = document.createElementNS("http://www.w3.org/2000/svg", "svg");

                shapeToDraw.innerHTML = html;

                shapeToDraw.style.left = `${cellLeft}px`;
                shapeToDraw.style.top = `${cellTop}px`;

                shapeToDraw.setAttribute("transform", "translate(0,0)");
                //add the shape to the table
                cell.appendChild(shapeToDraw);
                // set the HTML of the cell to the transferred data
                // cell.innerHTML = html;
            });
        });

        document.querySelector("#generateBtn").addEventListener("click", e => {
            console.log("generate");
            this.generate3DSpaceShip();
        });



    },
    generate3DSpaceShip: function () {

        // create the scene, camera, and renderer
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x03030);
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer( {
            canvas: document.querySelector("#generatedSpaceShipCanva"),
        });
        const material = new THREE.MeshBasicMaterial({color: 0x8280FF});
        renderer.setSize(window.innerWidth /3, window.innerHeight/3);
        document.body.appendChild(renderer.domElement);

        // get the table cells
        const cells = document.querySelectorAll("td");

        // create the 3D forms for each cell
        cells.forEach(cell => {
            // get the HTML of the cell
            const html = cell.innerHTML;
            // create the corresponding 3D form

            let geometry;
            if (html === '<rect x="10" y="10" width="30" height="30"></rect>') {
                geometry = new THREE.CubeGeometry(0.5, 0.5, 0.5);
            } else if (html === '<circle class="shapes" cx="25" cy="25" r="25"></circle>') {
                geometry = new THREE.SphereGeometry(0.3, 0.3, 0.3);
            } else if (html === '<polygon class="shapes" points="0,50 50,50 25,0"></polygon>') {
                geometry = new new THREE.ConeGeometry(0.5, 0.5, 0.5);
            }
            console.log(geometry);
            // create a mesh for the form and add it to the scene
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        });

        // render the scene
        renderer.render(scene, camera);

    }

}


