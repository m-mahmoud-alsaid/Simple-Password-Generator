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

passwordInput.onblur = () => validateLength(passwordInput.value);
generateButton.onclick = () => {
    let length = validateLength(passwordInput.value);
    console.log(generatePassword(length, includeNumbersCheckBox.checked, includeSpecialCharsCheckBox.checked));
}