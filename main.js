let generatePasswordButton = document.getElementById('generate-password');
let passwordLengthInput = document.getElementById('password-length-input');
let numbersInput = document.getElementById('numbers-input');
let charactersInput = document.getElementById('special-characters-input');
let errorMessage = document.getElementById('error-message');

function checkPasswordLength() {
    return passwordLengthInput.value !== '' && passwordLengthInput.value >= 1 && passwordLengthInput.value <= 32 ? true : false;
}

function generate(password, passwordWithNumbers, passwordWithChars, passwordLength) {
    let part = '';
    let char;
    let randCode;

    for (let i = 0; i < passwordLength; i++) {
        let ranges = [
            Math.floor(Math.random() * (47 - 33 + 1)) + 33, // Printable symbols
            Math.floor(Math.random() * (57 - 48 + 1)) + 48, // Digits 
            Math.floor(Math.random() * (90 - 65 + 1)) + 65, // Capital Characters
            Math.floor(Math.random() * (122 - 97 + 1)) + 97 // Small Characters
        ]

        if (password) {
            randCode = ranges[Math.floor(Math.random() * ranges.length)];
            char = String.fromCharCode(randCode);
        } else if (passwordWithNumbers) {
            randCode = ranges[Math.floor(Math.random() * (ranges.length - 1) + 1)];
            char = String.fromCharCode(randCode);
        } else if (passwordWithChars) {
            do {
                randCode = ranges[Math.floor(Math.random() * ranges.length)];
                char = String.fromCharCode(randCode);
            } while (isFinite(char));
        }

        if (part === '') {
            if (randCode >= 65 && randCode <= 90) {
                part += char;
            }
            else if (randCode >= 97 && randCode <= 122) {
                part += char;
            } else {
                randCode = ranges[Math.floor(Math.random() * (3 - 2 + 1) + 2)];
                char = String.fromCharCode(randCode);
                part += char;
            }
        } else {
            part += char;
        }
    }
    return part;
}

let exist = false;
function createErrorMessage() {
    let passwordDetails = document.getElementById('password-details');
    let errorMessage = document.createElement('p');
    let error = document.createTextNode('Invalid Password Length Or Numbers Or Characters.');
    errorMessage.appendChild(error);
    errorMessage.style.cssText = 'text-align: center; font-weight: bold; font-size: 20px; color: red;';
    if (!exist) {
        passwordDetails.after(errorMessage);
        exist = true;
    }
}

function storePasswordInLocalStorage(pass) {
    let counter = localStorage.getItem('counter') || null;
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    if (counter === null) counter = 0;
    if (!passwords[+counter]) passwords[+counter] = [+counter + 1, pass];
    localStorage.setItem('counter', ++counter);
    localStorage.setItem('passwords', JSON.stringify(passwords));
}

function displayLatestPasswords() {
    let passwordsBox = document.getElementById('passwords');
    let p = JSON.parse(localStorage.getItem('passwords'));
    passwordsBox.innerHTML = '';

    for (let i = 0; i < p.length; i++) {
        if (i >= p.length - 10) {
            let passwordNumber = document.createElement('span');
            let passwordNumberContent = document.createTextNode(p[i][0]);
            passwordNumber.appendChild(passwordNumberContent);
            let password = document.createElement('p');
            let passwordContent = document.createTextNode(p[i][1]);
            password.appendChild(passwordNumber);
            password.appendChild(passwordContent);
            passwordsBox.appendChild(password);
        }
    }
}

function displayPassword(password) {
    let display = document.getElementById('display-password');
    display.innerHTML = password;
    storePasswordInLocalStorage(password);
}

function generatePassword(passwordLength) {
    let password = false;
    let passwordWithNumbers = false;
    let passwordWithChars = false;

    if (checkPasswordLength() && numbersInput.checked && charactersInput.checked) {
        password = true;
        displayPassword(generate(password, passwordWithNumbers, passwordWithChars, passwordLength));
        displayLatestPasswords();
    } else if (checkPasswordLength() && numbersInput.checked && charactersInput.checked === false) {
        passwordWithNumbers = true;
        displayPassword(generate(password, passwordWithNumbers, passwordWithChars, passwordLength));
        displayLatestPasswords();
    } else if (checkPasswordLength() && numbersInput.checked === false && charactersInput.checked) {
        passwordWithChars = true;
        displayPassword(generate(password, passwordWithNumbers, passwordWithChars, passwordLength));
        displayLatestPasswords();
    } else {
        createErrorMessage();
    }
}

window.onload = displayLatestPasswords();
generatePasswordButton.onclick = () => {
    generatePassword(passwordLengthInput.value);
}
