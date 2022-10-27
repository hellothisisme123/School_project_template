// log(`terminal tab: ${terminal_tab.left}`);
let flip_flop_terminal = true;
window.addEventListener('keydown', (e) => {
    if (e.key == 'Tab') {
        if (flip_flop_terminal) {
            terminal.style.left = '-20%';
            terminal_tab.style.left = '0%';
            flip_flop_terminal = false;
        }
        else if (!flip_flop_terminal) {
            terminal.style.left = '0%';
            terminal_tab.style.left = '20%';
            flip_flop_terminal = true;
        }
    }
}); 

window.addEventListener('click', (e) => {
    if (e.target==terminal_tab || e.target==terminal_tab.childNodes[terminal_tab.childNodes.length-1]) {
        if (flip_flop_terminal) {
            terminal.style.left = '-20%';
            terminal_tab.style.left = '0%';
            flip_flop_terminal = false;
        }
        else if (!flip_flop_terminal) {
            terminal.style.left = '0%';
            terminal_tab.style.left = '20%';
            flip_flop_terminal = true;
        }
    }
});

let console_i = 0;
let console_object_i = 0;
function log(text, name, color) {
    console_i++;
    if (isObject(text)) { //runs when its an object
        terminal.appendChild(document.createElement('div'));                                     //makes parent div
        let parent_object = terminal.childNodes[terminal.childNodes.length-1];                   //sets a selector for parent div
        parent_object.classList.add('console_object');                                           //gives it a class
        
        parent_object.appendChild(document.createElement('label'));                              //creates a label for the console index
        parent_object.childNodes[parent_object.childNodes.length-1].innerHTML = `${console_i}:`; //sets the value of this label
        

        parent_object.appendChild(document.createElement('div'));                                //sets a div for the title of the object
        let object_label = parent_object.childNodes[parent_object.childNodes.length-1];          //sets a selector for the title
        if (name) { //sets the title when name is explicitly passed
            object_label.innerHTML = name;                                                       //sets the titles value
        } else if (text.name) { //sets the title to name key when the title isn't passed
            object_label.innerHTML = text.name;                                                  //sets the titles value
        } else { //sets the title when its not defined
            object_label.innerHTML = 'undefined name';                                           //sets the titles value
        }

        for (const key in text) { //runs once for each key in the object
            parent_object.appendChild(document.createElement('label'));                          //creates a label for the key
            key_label = parent_object.childNodes[parent_object.childNodes.length-1];             //sets the key name selector
            key_label.innerHTML = key;                                                           //sets the innerHTML to the key name

            parent_object.appendChild(document.createElement('div'));                            //creates a div for the key value
            key_value = parent_object.childNodes[parent_object.childNodes.length-1];             //sets the key value selector
            key_value.innerHTML = text[key];                                                     //sets to the value of the key
        }
        return; //cuts the function off early
    }
    
    terminal.appendChild(document.createElement('p'));                                           //creates a <p> element
    let new_terminal_item = terminal.childNodes[terminal.childNodes.length-1];                   //sets the new_terminal_item to the element
    new_terminal_item.innerHTML = `${console_i}: ${text}`;                                       //sets the innerHTML for the element
    if (color==undefined || color) new_terminal_item.style.color = random_rgb_color(new_terminal_item); //sets the text color
}

function clear_console() {
    console_i = 0;                                                      //resets the console index
    terminal.innerHTML = '<input type="text" class="terminal_input">';  //empties the terminal
    terminal_input = document.querySelector('.terminal_input');         //sets terminal input selector again
    log('terminal active');                                             //logs the terminal is still active
}

function clear_storage() {
    localStorage.setItem("input_history", []);
}


function random_rgb_color(location) {
    let r = parseInt(Math.random() * 255); //random color
    let g = parseInt(Math.random() * 255); //random color
    let b = parseInt(Math.random() * 255); //random color
    
    if (location) { //runs if there is a location to make sure contrast is good
        let bg_color = window.getComputedStyle(location.parentElement).background; //sets bg_color to the background color rgb
        bg_color = bg_color.split(',');                                            //sets bg_color to an array split at the commas
        
        let bg_r = bg_color[0].slice(4);                                           //sets the bg_r to the red value
        let bg_g = bg_color[1].slice(1);                                           //sets the bg_g to the green value
        let bg_b = bg_color[2].slice(1).slice(0, -1);                              //sets the bg_b to the blue value

        let r_dif;                      //initialize r_dif for r difference
        if (r > bg_r) {                 //if foreground > background
            r_dif = r - bg_r;           //sets r_dif
            if (r_dif < 100) {          //if contrast is below 100 
                r = r + 100;            //adds 100 to r
                if (r > 255) r = r-255; //wraps to 0 when it goes above 255
            }
        } else if (r < bg_r) {          //if background > foreground
            r_dif = bg_r - r;           //sets r_dif
            if (r_dif < 100) {          //if contrast is below 100
                r = r - 100;            //removes 100 from r
                if (r < 0) r = 255 + r; //wraps to 255 when it goes below 0
            }
        }

        let g_dif;                      //initialize g_dif for g difference
        if (g > bg_g) {                 //if foreground > background
            g_dif = g - bg_g;           //sets g_dif
            if (g_dif < 100) {          //if contrast is below 100 
                g = g + 100;            //adds 100 to g
                if (g > 255) g = g-255; //wraps to 0 when it goes above 255
            }
        } else if (g < bg_g) {          //if background > foreground
            g_dif = bg_g - g;           //sets g_dif
            if (g_dif < 100) {          //if contrast is below 100
                g = g - 100;            //removes 100 from g
                if (g < 0) g = 255 + g; //wraps to 255 when it goes below 0
            }
        }

        let b_dif;                      //initialize b_dif for b difference
        if (b > bg_b) {                 //if foreground > background
            b_dif = b - bg_b;           //sets b_dif
            if (b_dif < 100) {          //if contrast is below 100 
                b = b + 100;            //adds 100 to b
                if (b > 255) b = b-255; //wraps to 0 when it goes above 255
            }
        } else if (b < bg_b) {          //if background > foreground
            b_dif = bg_b - b;           //sets b_dif
            if (b_dif < 100) {          //if contrast is below 100
                b = b - 100;            //removes 100 from b
                if (b < 0) b = 255 + b; //wraps to 255 when it goes below 0
            }
        }
    }    
    let output = `rgb(${r}, ${g}, ${b})`; //sets the output
    // log(output, null, false);          //demonstrates log() without random color
    return output;                        //returns the output
}




let terminal;
let terminal_tab;
let terminal_input;
let input_history = [];
let input_i = input_history.length; //sets the currently selected history location

window.onload = () => {
    //vvvvv -> this creates the terminal and terminal tab so its not in the html
    document.querySelector('.container').innerHTML += '<div class="terminal"><input type="text" class="terminal_input"></div><div class="terminal_tab"><p>Terminal</p></div>';
    let generic_object = {"hello": "world", "world": "hello", "name": "generic object"}; //just a generic object with data to demonstate object logging
    terminal = document.querySelector('.terminal');                                      //sets terminal
    terminal_tab = document.querySelector('.terminal_tab');                              //sets terminal tab
    terminal_input = document.querySelector('.terminal_input');                          //sets terminal input
    log('terminal active');                                                              //sets the terminal to active
    log(generic_object);                                                                 //demonstrate log() working with objects
    if (localStorage.getItem('input_history') != '') {
        input_history = JSON.parse(localStorage.getItem("input_history"));               //sets the input history to the local storage
    }
    input_i = input_history.length;                                                      //sets the currently selected history location
    terminal_input.addEventListener('keyup', input_enter);                               //sets the event listener for the terminal input
}




function input_enter(e) { //runs on keyup within the terminal input
    if (e.key == 'Enter') { //runs on enter
        input_history.push(terminal_input.value);                             //push the text into the history
        input_i = input_history.length;                                       //updates the selected history location
        localStorage.setItem("input_history", JSON.stringify(input_history)); //sets the storage
        eval(terminal_input.value);                                           //runs the text inside the terminal input
        terminal_input.value = '';                                            //empties the terminal input
    }
    if (e.key == 'ArrowUp' && input_i > 0) { //runs on up arrow
        input_i--;                                                            //lowers the selected history location
        terminal_input.value = input_history[input_i];                        //sets the terminal input value
    } 
    if (e.key == 'ArrowDown') { //runs on down arrow
        if (input_i < input_history.length-1) {
            input_i++;                                                        //increases the selected history location
            terminal_input.value = input_history[input_i];                    //sets the terminal input value
        }
    } 
}