const inputSlider = document.querySelector('#myRange')
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const displayPassword = document.querySelector(".display-pass")
const copyPassword = document.querySelector(".copy-button")
const passwordLengthCounter = document.querySelector(".password-length-counnter")
const uppercase = document.querySelector(".Uppercase")
const copyMsg = document.querySelector("[data-CopyMsg]")
const lowercase = document.querySelector(".Lowercase")
const includeNumbers = document.querySelector(".Numbers")
const specialCharacters = document.querySelector(".Special-Character")
const passwordStrengthIndicator = document.querySelector("[data-indicator]")
const generatePassword = document.querySelector(".generate-password")
const allCheckBoxes = document.querySelectorAll("input [ type = checkboxes ]")


let password = "";
let passwordLength = 10;
let checkCount = 0 ;
const symbols = '!@#$%^&*()_+-={}[]\|;`:",./<>?';

handleSlider();




// set the slider
function handleSlider() {                               //it reflects the password length on the ui
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



function calcStrength(){
    
    let hasupper = false;
    let haslower = false;
    let hassymbol = false;
    let hasnum = false;

    if(uppercase.checked) hasupper = true;
    if(lowercase.checked) haslower = true;
    if(includeNumbers.checked) hasnum = true;
    if(specialCharacters.checked) hassymbol = true;

    if(hasupper && haslower && (hassymbol||hasnum) && passwordLength>=8){
        setIndicator("#0f0")
    }
    
    else if(
        (hasupper && haslower) || (hassymbol||hasnum) && (passwordLength <8 && passwordLength >=5)
    ){
        setIndicator("#ff0")
    }
    else{
        setIndicator("#f00")
    }
}



async function copyContent(){
    try{
        await navigator.clipboard.writeText(displayPassword.value)             //check this line for passwordDisplay keyword
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }


    // to make the span tag visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active")
    }, 2000);

}


inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})



copyMsg.addEventListener('click', () => {
    if(displayPassword.value) {
        copyContent();
    }
})


function changeinCheckboxes(){
    checkCount = 0;
    allCheckBoxes.forEach( (checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    //special condition for no of checkboxes > input slider
    if(checkCount>passwordLength){
        passwordLength = checkCount;
        handleSlider();
    }
}



function shufflepassword(shufflepassword){

}


allCheckBoxes.addEventListener('change', changeinCheckboxes())



generatePassword.addEventListener('click', () => {
    if(passwordLength<=0) 
        return;
    if(passwordlength<checkCount){
        passwordlength = checkCount;
        handleSlider();
    }


    password = "";

    let funcArr = []
    if(uppercase.checked){
         funcArr.push(generateUppercase);
    }

    if(lowercase.checked){
         funcArr.push(generateLowercase);
    }

    if(includeNumbers.checked){
         funcArr.push(generateRndNumber);
    }

    if(specialCharacters.checked){
         funcArr.push(generateSpecialcase);
    }

    for(let i = 0; i<=funcArr; i++){
        password += funcArr[i]();
    }

    for(let i=0; i<=password.length-funcArr.length; i++){
        let rndInd = getRandomInteger(0, funcArr.length);
        password += funcArr[rndInd]();
    }


    password = shufflepassword(Array.from(password));

    displayPassword.value = password;


    calcStrength();



})