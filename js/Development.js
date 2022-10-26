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



window.onload = () => {
    document.querySelector('.container').innerHTML += '<div class="terminal"><input type="text" class="terminal_input"></div><div class="terminal_tab">Terminal</div>';
    log('terminal active');
    terminal_input.addEventListener('keyup', input_enter);

}



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

