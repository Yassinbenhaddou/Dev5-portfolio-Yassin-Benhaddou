"use strict"

//Nav Bar Buttons functionality

var navBarBtns = document.getElementsByClassName("navBtns"); //get all the nav bar buttons in an array

//loop through the array and add an event listener to each button
for (var i = 0; i < navBarBtns.length; i++) {

    navBarBtns[i].addEventListener("click", function (e) {

        e.preventDefault(); //prevent the default action of the button

        console.log("clicked"); //test to see if the event listener is working

        //loop through the array and remove the navSelected class from each button and to hide all the divs
        for (var i = 0; i < navBarBtns.length; i++) {
            navBarBtns[i].classList.remove("navSelected"); //remove the class from the button


            document.getElementById(navBarBtns[i].id + "Div").style.display = "none"; //hide the div
        }

        //show the div that corresponds to the button that was clicked
        document.getElementById(this.id + "Div").style.display = "block";

        this.classList.add("navSelected"); //add the navSelected class to the button that was clicked
    });

}

import {
    threeJsApplication
} from './threeJsFile.js'; //import the threeJsFile.js file 

threeJsApplication.init(); //call the init function from the threeJsFile.js file


// generate button trigger
document.getElementById("generateBtn").addEventListener("click", function (e) {
    e.preventDefault(); //prevent the default action of the button

    threeJsApplication.getFormInfoAndSendTosever();
});




// make a example array of dummy data (i need a array of arrays)

var exampleArray = [id=1, name="test", color="red", part="body", x=0, y=0, z=0, rotation=0, scale=1, texture="texture1",];

var exampleArray2 = [id=2, name="test2", color="blue", part="body", x=0, y=0, z=0, rotation=0, scale=1, texture="texture2",];

var exampleArray3 = [id=3, name="test3", color="green", part="body", x=0, y=0, z=0, rotation=0, scale=1, texture="texture3",];

var allExampleArrays = [exampleArray, exampleArray2, exampleArray3];

console.log("testttt");
console.log(allExampleArrays);

var arraysToKeep = [1,3];

//now keep only the arrays that have the id 1 and 3

var filteredArray = allExampleArrays.filter(function (el) {
    return arraysToKeep.indexOf(el.id) !== -1;
});
console.log("testttt");
console.log(filteredArray);
