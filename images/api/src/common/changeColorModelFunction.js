// Description: This file contains the function that converts the hex color to x0rgb color model


/**
 * This function converts the hex color to x0rgb color model
 * we need it to be used for the three.js color model
 * @param hexColor(string): the hex color to be converted to x0rgb
 * @returns x0rgbColor(number): the x0rgb color
 */

function changeColorModelFromHexToX0Rgb(hexColor) {
    console.log("hexColor: " + hexColor);
     //replace # with 0x to convert hex to x0rgb
    let x0rgbColor = hexColor.replace("#", "0x");

    return x0rgbColor; //return x0rgb color
}


//export the changeColorModelFromHexToX0Rgb function
module.exports = { changeColorModelFromHexToX0Rgb }