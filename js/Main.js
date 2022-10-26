const terminal = document.querySelector('.terminal');
const terminal_tab = document.querySelector('.terminal_tab');
let terminal_input = document.querySelector('.terminal_input');
// log(`terminal tab: ${terminal_tab.left}`);
let flip_flop_terminal = true;
window.addEventListener('keydown', (e) => {
    if (e.key == 'Tab') {
        if (flip_flop_terminal) {
            terminal.style.left = '-20%';
            terminal_tab.style.left = '2.3%';
            flip_flop_terminal = false;
        }
        else if (!flip_flop_terminal) {
            terminal.style.left = '0px';
            terminal_tab.style.left = '22%';
            flip_flop_terminal = true;
        }
    }
}); 

window.addEventListener('click', (e) => {
    if (e.target==terminal_tab) {
        if (flip_flop_terminal) {
            terminal.style.left = '-20%';
            terminal_tab.style.left = '2.3%';
            flip_flop_terminal = false;
        }
        else if (!flip_flop_terminal) {
            terminal.style.left = '0px';
            terminal_tab.style.left = '22%';
            flip_flop_terminal = true;
        }
    }
});

let console_i = 0;
let console_object_i = 0;
function log(text, name) {
    console_i++;
    if (isObject(text)) { //runs when its an object
        // log('logged an object');
        terminal.appendChild(document.createElement('div')); //makes parent div
        let parent_object = terminal.childNodes[terminal.childNodes.length-1];  //sets a selector for parent div
        parent_object.classList.add('console_object'); //gives it a class
        
        parent_object.appendChild(document.createElement('label'));
        parent_object.childNodes[parent_object.childNodes.length-1].innerHTML = `${console_i}:`;
        // parent_object.innerHTML += `${console_i}:`;

        

        parent_object.appendChild(document.createElement('div'));
        let object_label = parent_object.childNodes[parent_object.childNodes.length-1];

        if (name) { //sets the title when name is explicitly passed
            object_label.innerHTML = name;
        } else if (text.name) { //sets the title to name when the title isn't passed
            object_label.innerHTML = text.name;
        } else { //sets the title when its not defined
            object_label.innerHTML = 'undefined name';
        }


        for (const key in text) {
            parent_object.appendChild(document.createElement('label'));
            key_label = parent_object.childNodes[parent_object.childNodes.length-1];
            // key_label.classList.add('terminal_key');
            key_label.innerHTML = key;

            parent_object.appendChild(document.createElement('div'));
            key_value = parent_object.childNodes[parent_object.childNodes.length-1];
            // key_value.classList.add('terminal_key_value');
            key_value.innerHTML = text[key];
        }
        //parent_object.appendChild(document.createElement('label'));
                        
        



        // terminal.childNodes[terminal.childNodes.length-1].innerHTML = text;
        //needs more work to make this log something so the user can read an object variable easily
        //like in the regular console for chrome and firefox
        return;
    }

    
    terminal.appendChild(document.createElement('p'));
    terminal.childNodes[terminal.childNodes.length-1].innerHTML = `${console_i}: ${text}`;  
    terminal.childNodes[terminal.childNodes.length-1].style.color = random_color('555');
    // terminal.childNodes[terminal.childNodes.length-1].after()
}

let generic_object = {"hello": "world", "world": "hello", "name": "generic object"};
setTimeout(() => {
    log(generic_object);
}, 100);

function clear_console() {
    console_i = 0;
    terminal.innerHTML = '<input type="text" class="terminal_input">';
    terminal_input = document.querySelector('.terminal_input');
    terminal_input.addEventListener('keyup', input_enter);
    log('terminal active');
}

function clear_storage() {
    localStorage.setItem("input_history", []);
}

const table_selector = document.querySelector('.information_table').childNodes[1]; 

function random_color(bg_color) {
    let r = parseInt(Math.random() * 255); //random color
    let g = parseInt(Math.random() * 255); //random color
    let b = parseInt(Math.random() * 255); //random color
    let rgb_average = (r + g + b) / 3; //average of the rgb
    bg_color = hex_to_rgb(bg_color); //sets the bg_color to a rgb array
    bg_color = (bg_color[0] + bg_color[1] + bg_color[2]) / 3; //averages the bg_color
    
    let bg_random_difference = bg_color - rgb_average;  //finds the difference between bg_color and rgb_average
    // log(bg_random_difference*-1);
    if (bg_random_difference*-1 < 60) { //runs if the difference is below 85
        r += 60; //adds to the contrast
        g += 60; //adds to the contrast
        b += 60; //adds to the contrast
    }
    let output = `rgb(${r}, ${g}, ${b})`; //sets the output
    return output; //returns the output
}

const table_1_1 = document.querySelector('.table_row_1_column_1'); //row 1 individual selector
const table_1_2 = document.querySelector('.table_row_1_column_2'); //row 1 individual selector
const table_1_3 = document.querySelector('.table_row_1_column_3'); //row 1 individual selector

const table_2_1 = document.querySelector('.table_row_2_column_1'); //row 2 individual selector
const table_2_2 = document.querySelector('.table_row_2_column_2'); //row 2 individual selector
const table_2_3 = document.querySelector('.table_row_2_column_3'); //row 2 individual selector

const table_3_1 = document.querySelector('.table_row_3_column_1'); //row 3 individual selector
const table_3_2 = document.querySelector('.table_row_3_column_2'); //row 3 individual selector
const table_3_3 = document.querySelector('.table_row_3_column_3'); //row 3 individual selector

const table_row_1_selector = [table_1_1, table_1_2, table_1_3]; //row 1
const table_row_2_selector = [table_2_1, table_2_2, table_2_3]; //row 1
const table_row_3_selector = [table_3_1, table_3_2, table_3_3]; //row 1

const table_items_selector = [table_row_1_selector, table_row_2_selector, table_row_3_selector]; //complete table

let table_row_1_data = [1, 2, 3]; 
let table_row_2_data = [4, 5, 6];
let table_row_3_data = [7, 8, 9];

let table_data = [table_row_1_data, table_row_2_data, table_row_3_data];


function save_to_table() { //sends the data from the inputs into the table data variable
    for (let i = 0; i < table_data.length; i++) {
        // log(table_data[i]);
        let row_i = i;
        for (let i = 0; i < table_data[row_i].length; i++) {
            // log(table_data[row_i][i]);
            table_data[row_i][i] = table_items_selector[row_i][i].childNodes[1].value;
            // log(table_data[row_i][i]);
            // log(table_items_selector[row_i][i].childNodes[1].value);
        }
    }

    save_to_JSON(table_data);
}

let table_data_version_i = 0;
function save_to_JSON(data) {
    table_data_version_i++;
    // log(`index ${table_data_version_i}`)
    let table_data_object = {
        "version": `1.${table_data_version_i}`,
        "row_1": [
            data[0][0], data[0][1], data[0][2]
        ],
        "row_2": [
            data[1][0], data[1][1], data[1][2]
        ],
        "row_3": [
            data[2][0], data[2][1], data[2][2]
        ],
        "row_count": data.length,
        "collumn_count": data[0].length,
        "name": 'table data'
    }
    log(table_data_object, table_data_object.name);
}



window.onload = () => {
    log('terminal active');
    terminal_input.addEventListener('keyup', input_enter);
}

/*terminal_input.addEventListener('keyup', (e) => {
    /*if (e.key == '(') {
        terminal_input.value += ')';
    }
    if (e.key == '[') {
        terminal_input.value += ']';
    }
    if (e.key == '{') {
        terminal_input.value += '}';
    }
    if (e.key == '"') {
        terminal_input.value += '"';
    }
    if (e.key == "'") {
        terminal_input.value += "'";
    }
    if (e.key == '$') {
        terminal_input.value += '{}';
        terminal_input.setSelectionRange(0, 5, forward);
    }*/
   /* if (e.key == 'Enter') {
        eval(terminal_input.value)
    }
});*/

let input_history = [];
input_history = JSON.parse(localStorage.getItem("input_history"));
let input_i = input_history.length;
function input_enter(e) {
    if (e.key == 'Enter') {
        input_history.push(terminal_input.value);
        // log(input_history);
        input_i = input_history.length;
        localStorage.setItem("input_history", JSON.stringify(input_history));
        eval(terminal_input.value);
        terminal_input.value = '';
    }
    if (e.key == 'ArrowUp') {
        if (input_i > 0) {
            input_i--;
            terminal_input.value = input_history[input_i];
        }
    } 
    if (e.key == 'ArrowDown') {
        if (input_i < input_history.length-1) {
            input_i++;
            terminal_input.value = input_history[input_i];
        }
    } 
}



function insert_mid_string(string, location, input_txt) { //inserts a string into the middle of another string
    let a = string.slice(0, -(string.length - location));   //string is the initial string
    let b = string.slice(location, string.length);          //location is the location for the text to be added
    return `${a}${input_txt}${b}`;                          //input_txt is the text thats being added
}



log(concatenate(1,2))