let animSwitch = true;
let cookieStorage = {};
//
const registerForm = document.getElementById("registration");
const userinfoForm = document.getElementById("user_info");
//
//
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const birth_year = document.getElementById("birth_year");
const gender = document.getElementById("gender");
const phone_num = document.getElementById("phone_num");
const skype = document.getElementById("skype");

function onsiteLoad() {
    registerForm.style.display = "block";
    userinfoForm.style.display = "none";

    checkRegister();
}

function checkRegister() {
    readCookie();

    if ("username" in cookieStorage) {
        switchForm(2);
    } else {
        switchForm(1);
    }
}

function formRegister() {
    if (!registerValidation()) return;

    if (setRegCookie()) checkRegister();
}

function registerValidation() {
    let email_err = document.getElementById("email_error");
    let firstpass_err = document.getElementById("firstpass_error");
    let secondpass_err = document.getElementById("secondpass_error");

    email_err.innerText = firstpass_err.innerText = secondpass_err.innerText = "";

    let email = document.getElementById("mail").value;
    let firstpass = document.getElementById("first_pass").value;
    let secondpass = document.getElementById("second_pass").value;

    const fullEmailRexExp = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/;
    if (email === "") {
        email_err.innerText = "Please, enter email";
        return false;
    } else if (!fullEmailRexExp.test(email)) {
        email_err.innerText = "Please, enter valid email";
        return false;
    } else if (email.split("@")[0].length < 3) {
        email_err.innerText = "Short name in email";
        return false;
    }

    const digitRegExp = /\d/;
    const bigcharsRegExp = /[A-Z]/;
    const smallcharsRegExp = /[a-z]/;

    if (firstpass === "") {
        firstpass_err.innerText = "Enter password";
        return false;
    } else if (firstpass.length < 6) {
        firstpass_err.innerText = "More than 6 chars!";
        return false;
    } else if (!digitRegExp.test(firstpass)) {
        firstpass_err.innerText = "Must contain digits!";
        return false;
    } else if (!smallcharsRegExp.test(firstpass)) {
        firstpass_err.innerText = "No small letters!";
        return false;
    } else if (!bigcharsRegExp.test(firstpass)) {
        firstpass_err.innerText = "No big letters!";
        return false;
    } else if (firstpass !== secondpass) {
        secondpass_err.innerText = "Passwords not match!";
        return false;
    }
    return true;
}

function readCookie() {
    let strings = document.cookie.split("; ");
    for (let i = 0; i < strings.length; i++) {
        let data = strings[i].split("=");
        cookieStorage[data[0]] = data[1];
    }
}

function switchForm(formNumber) {
    if (formNumber === 1) {
        registerForm.style.display = "block";
        userinfoForm.style.display = "none";
    } else {
        registerForm.style.display = "none";
        userinfoForm.style.display = "block";
        fillFormUser();
    }
}

function setRegCookie() {
    let expDate = new Date();
    expDate.setHours(expDate.getHours() + 1);
    let email = document.getElementById("mail").value;
    document.cookie = "username=" + email + ";expires=" + expDate.toGMTString() + ";path/";
    return true;
}

function removeReg() {
    let expDate = new Date();
    expDate.setHours(expDate.getHours() - 1);
    let email = document.getElementById("mail").value;
    document.cookie = "username=" + email + ";expires=" + expDate.toGMTString() + ";path/";

    return true;
}

function fillFormUser() {
    readCookie();

    document.getElementById("user_name").innerText = "Hello, " + cookieStorage["username"];

    if ("firstname" in cookieStorage) {
        firstname.value = cookieStorage["firstname"];
        lastname.value = cookieStorage["lastname"];
        birth_year.value = cookieStorage["birth_year"];
        gender.value = cookieStorage["gender"];
        phone_num.value = cookieStorage["phone_num"];
        skype.value = cookieStorage["skype"];
    }
}

function saveUserData() {
    let blink = document.getElementById("save_message");

    if (userValidation()) {
        if (setDataCookie()) {
            blink.innerText = "Saved!";
            blink.style.color = "#f3fc03";
            animSwitch = !animSwitch; //switch animation to repeat always
            if (animSwitch) {
                blink.style.animation = "blink 3s forwards";
            } else {
                blink.style.animation = "blinkback 3s forwards";
            }
        } else {
            blink.innerText = "Save error!";
            blink.style.color = "red";
            animSwitch = !animSwitch; //switch animation to repeat always
            if (animSwitch) {
                blink.style.animation = "blink 3s forwards";
            } else {
                blink.style.animation = "blinkback 3s forwards";
            }
        }
    }
}

function userValidation() {
    const firstname_error = document.getElementById("firstname_error");
    const lastname_error = document.getElementById("lastname_error");
    const year_error = document.getElementById("year_error");
    const phonenum_error = document.getElementById("phonenum_error");
    const skype_error = document.getElementById("skype_error");

    firstname_error.innerText = "";
    lastname_error.innerText = "";
    year_error.innerText = "";
    phonenum_error.innerText = "";
    skype_error.innerText = "";

    const nameRegEx = /^[a-zA-Z0-9_]{3,16}$/;
    const yearRegEx = /(\d{4})/;
    const phoneRegExp = /^\+?3?8?(0[5-9][0-9]\d{7})$/;
    const skypeRegExpr = /^[a-zA-Z]{1}[a-zA-Z0-9\._-]{5,31}/;
    let error = false;

    if (!nameRegEx.test(firstname.value)) {
        firstname_error.innerText = "Enter first name";
        error = true;
    }

    if (!nameRegEx.test(lastname.value)) {
        lastname_error.innerText = "Enter last name";
        error = true;
    }

    if (!yearRegEx.test(birth_year.value)) {
        year_error.innerText = "Enter birth year";
        error = true;
    }

    if (!phoneRegExp.test(phone_num.value)) {
        phonenum_error.innerText = "Enter phone";
        error = true;
    }

    if (!skypeRegExpr.test(skype.value)) {
        skype_error.innerText = "Enter skype";
        error = true;
    }

    return !error;
}

function setDataCookie() {
    let expDate = new Date();
    expDate.setHours(expDate.getHours() + 1);
    let email = document.getElementById("email").value;

    document.cookie = "firstname=" + firstname.value + ";expires=" + expDate.toGMTString() + ";path/";
    document.cookie = "lastname=" + lastname.value + ";expires=" + expDate.toGMTString() + ";path/";
    document.cookie = "birth_year=" + birth_year.value + ";expires=" + expDate.toGMTString() + ";path/";
    document.cookie = "gender=" + gender.value + ";expires=" + expDate.toGMTString() + ";path/";
    document.cookie = "phone_num=" + phone_num.value + ";expires=" + expDate.toGMTString() + ";path/";
    document.cookie = "skype=" + skype.value + ";expires=" + expDate.toGMTString() + ";path/";

    return true;
}