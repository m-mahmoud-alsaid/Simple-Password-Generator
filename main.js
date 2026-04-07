let passwordInput = document.getElementById('password-length-input');
let generateButton = document.getElementById('generate-password');
let includeNumbersCheckBox = document.getElementById('numbers-input');
let includeSpecialCharsCheckBox = document.getElementById('special-characters-input');

function validateLength(length) {
    let passwordLength;
    if (!length) {
        passwordInput.value = 10;
        return passwordLength = parseInt(passwordInput.value);
    }
    else {
        passwordInput.value = parseInt(Math.max(1, Math.min(32, length)));
        return passwordLength = parseInt(passwordInput.value);
    }
}

function generatePassword(length, includeNumbers, includeSpecialChars) {
    let passwordLength = length;

    const digits = `0123456789`;
    const smallChars = `abcdefghijklmnopqrstuvwxyz`;
    const capitalChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const specialChars = `!@#$%^&*()_-+={[}]|:;"'<,>.?/~`;

    let ranges = smallChars + capitalChars;

    if (includeNumbers) ranges += digits;
    if (includeSpecialChars) ranges += specialChars;

    let password = '';
    for (let counter = 0; counter < passwordLength; counter++) password += ranges[Math.floor(Math.random() * ranges.length)];

    return password;
}

function displayPassword(password) {
    let displayDiv = document.getElementById('display-password');
    displayDiv.innerHTML = password;
    savePassword(password);
}

function savePassword(password) {
    let passwordsList = JSON.parse(localStorage.getItem('passwordsList')) || [];
    passwordsList.unshift(password);
    if (passwordsList.length > 10) passwordsList.pop();
    localStorage.setItem("passwordsList", JSON.stringify(passwordsList));
}

function showLatestPassowrds() {
    let passwordsDiv = document.getElementById('passwords');
    let passwordsList = JSON.parse(localStorage.getItem('passwordsList')) || [];
    let latest = passwordsList.map((value, index) => `<p><span>${index + 1}</span> ${escapeHTML(value)}</p>`).join('');
    passwordsDiv.innerHTML = latest;
}

function escapeHTML(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

passwordInput.onblur = () => validateLength(passwordInput.value);
generateButton.onclick = () => {
    let length = validateLength(passwordInput.value);
    let password = generatePassword(length, includeNumbersCheckBox.checked, includeSpecialCharsCheckBox.checked);
    displayPassword(password);
    showLatestPassowrds();
}
document.addEventListener('DOMContentLoaded', showLatestPassowrds);