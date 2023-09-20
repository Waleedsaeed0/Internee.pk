let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) =>{
        if(e.target.innerHTML == '='){
            string = eval(string);
            input.value = string;
        }

        else if(e.target.innerHTML == 'AC'){
            string = "";
            input.value = string;
        }
        else if(e.target.innerHTML == 'DEL'){
            string = string.substring(0, string.length-1);
            input.value = string;
        }
        else{
            string += e.target.innerHTML;
            input.value = string;
        }
        
    })
})

// JavaScript code for theme switching
document.addEventListener('DOMContentLoaded', function() {
    const theme1Styles = document.getElementById('theme1Styles');
    const theme2Styles = document.getElementById('theme2Styles');

    document.getElementById('theme1Btn').addEventListener('click', function() {
        theme1Styles.disabled = false; // Enable Theme 1 styles
        theme2Styles.disabled = true;  // Disable Theme 2 styles
    });

    document.getElementById('theme2Btn').addEventListener('click', function() {
        theme1Styles.disabled = true;  // Disable Theme 1 styles
        theme2Styles.disabled = false; // Enable Theme 2 styles
    });
});
