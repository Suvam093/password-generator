const inputSlider = document.querySelector('#myRange')
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const displayPassword = document.querySelector(".display-pass")
const copyPassword = document.querySelector(".copy-button")
const passwordLengthCounter = document.querySelector(".password-length-counnter")
const uppercase = document.querySelector(".Uppercase")
const lowercase = document.querySelector(".Lowercase")
const includeNumbers = document.querySelector(".Numbers")
const specialCharacters = document.querySelector(".Special-Character")
const passwordStrengthIndicator = document.querySelector("[data-indicator]")
const generatePassword = document.querySelector(".generate-password")
const allCheckBoxes = document.querySelectorAll("input [ type = checkboxes ]")


let password = "";
let passwordLength = 15;
let checkCount = 1 ;
const symbols = '!@#$%^&*()_+-={}[]\|;`:",./<>?';
handleSlider();


// set the slider
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    
}



function setIndicator(color){
    passwordStrengthIndicator.style.backgroundColor = color;
    //shadow
}


function getRandomInteger(min,max){
    return Math.round(Math.random() * (max - min)) + min;
}



function generateRndNumber(){
    return getRandomInteger(0,9);
}


function generateUppercase(){
    return String.fromCharCode(getRandomInteger(65,91))
}

function generateLowercase(){
    return String.fromCharCode(getRandomInteger(97,123))
}



function generateSpecialcase(){
    return symbols.charAt(getRandomInteger(0,symbols.length));

}



console.log(generateSpecialcase());
