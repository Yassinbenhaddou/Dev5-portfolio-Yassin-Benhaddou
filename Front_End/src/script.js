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

