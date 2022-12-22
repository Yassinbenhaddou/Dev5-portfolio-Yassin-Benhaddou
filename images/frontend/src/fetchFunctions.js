import {
    threeJsApplication
} from "./threeJsFile.js";
export const fetchFunctions = {
    postSpaceShip: function (spaceShipToPost) {

        fetch("http://localhost/PostShips", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: spaceShipToPost.spaceShipName,
                    frontHead: spaceShipToPost.frontHead[0],
                    body: spaceShipToPost.body[0],
                    backPart: spaceShipToPost.backPart[0],
                    leftWing: spaceShipToPost.leftWing[0],
                    rightWing: spaceShipToPost.rightWing[0],
                    frontHeadColor: spaceShipToPost.frontHead[1],
                    bodyColor: spaceShipToPost.body[1],
                    backPartColor: spaceShipToPost.backPart[1],
                    leftWingColor: spaceShipToPost.leftWing[1],
                    rightWingColor: spaceShipToPost.rightWing[1]

                })
            })
            .then(response => response.json())
            .then(data => {
                threeJsApplication.init()
                console.log(data)
            }).catch(error => console.error(error));
    },
    getSpaceShips: function () {

        // get the space ships from the server and display them in the spaceShipsListDiv
        fetch("http://localhost/ships")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                threeJsApplication.displaySpaceShips(data);
            })
            .catch(error => {
                console.error(error);
            });


    },
    getSpaceShipById: function (idOfTheSpaceShipToGet) {
        fetch(`http://localhost/ships/${idOfTheSpaceShipToGet}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                threeJsApplication.updateSpaceShip(data);
            })
            .catch(error => {
                console.error(error);
            });
    },
    deleteSpaceShip: function (idOfTheSpaceShipToDelete) {

        fetch(`http://localhost/DeleteShips/${idOfTheSpaceShipToDelete}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                threeJsApplication.init();
            })
            .catch(error => {
                console.error(error);
            });

    },
    updateSpaceShipFetch: function (spaceShipToUpdate, idOfTheSpaceShipToUpdate) {

        fetch(`http://localhost/PutShips/${idOfTheSpaceShipToUpdate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: spaceShipToUpdate.spaceShipName,
                    frontHead: spaceShipToUpdate.frontHead[0],
                    body: spaceShipToUpdate.body[0],
                    backPart: spaceShipToUpdate.backPart[0],
                    leftWing: spaceShipToUpdate.leftWing[0],
                    rightWing: spaceShipToUpdate.rightWing[0],
                    frontHeadColor: spaceShipToUpdate.frontHead[1],
                    bodyColor: spaceShipToUpdate.body[1],
                    backPartColor: spaceShipToUpdate.backPart[1],
                    leftWingColor: spaceShipToUpdate.leftWing[1],
                    rightWingColor: spaceShipToUpdate.rightWing[1]
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //refresh the page
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });

    }
}