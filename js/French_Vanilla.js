function concatenate(a, b) {
    return parseFloat(`${a}${b}`);    
}

function isObject(variable) { //returns true if its an object {} ||| and false if its not
    let str_variable = `${variable}`; //sets str_variable to variable but as a string
    str_variable = str_variable.charAt(0); //sets to the first letter inside str_variable
    if (typeof variable === 'string' || variable instanceof String) { //runs when string
        return false; //is not an object
    }
    if (str_variable != '[') { //runs when object
        return false; //is not an object
    }
    return true; //is an object
}

function hex_to_rgb(hex) { 
    if (hex.length == 4 || hex.length == 7) { //runs when the hex has a #
        hex = hex.substring(1, 7); //removes the #
    } 

    if (hex.length == 3) { //if 3 letter hex
        hex = hex.split(""); //splits hex into r g b
        for (let i = 0; i < hex.length; i++) { //doubles each component
            hex[i] = hex[i] + hex[i]; //doubles the component
        }
    } else if (hex.length == 6) { //if 6 letter hex
        hex = hex.split(""); //splits into 6 array
        hex[0] = hex[0] + hex[1];  //combines to 1
        hex[1] = hex[2] + hex[3];  //combines to 2
        hex[2] = hex[4] + hex[5];  //combines to 3
        hex = [hex[0], hex[1], hex[2]] //removes unnecessary array items
    }

    for (let i = 0; i < hex.length; i++) {
        hex[i] = parseInt(hex[i], 16);
        // log(hex[i]);
    }

    // log(hex);
    return hex;
}