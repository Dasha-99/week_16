let jobTypeElement = document.getElementById('job-types')
let inputTextElements = document.querySelectorAll('.form__text');
let elemensBorders = [...inputTextElements, jobTypeElement];
let button = document.querySelector('.form__button');


elemensBorders.forEach((input) => {
    input.addEventListener('focus', function () {
        input.style.outline = 'none';
        input.style.border = '2px solid rgb(103, 25, 25)';
    })
    input.addEventListener('blur', function () {
        input.style.border = '';
    })
})

/* валидация данных всех полей ввода */
const formElements = Array.from(document.querySelector('.form').elements);
formElements.forEach((input) => {
    input.addEventListener('input', function () {
        validationForm(input);
    })
})

/* валидация введенного имени */
function validationName() {
    let nameElement = document.getElementById('name');
    let nameRegex = /^[a-zа-яё ]+$/i;
    let nameValue = nameElement.value.trim();
    if (!nameRegex.test(nameValue) || nameValue.length < 2 || nameValue.length > 20) {
        return false;
    }
    return true;
}

/* валидация введенного адреса почты*/
function validationEmail() {
    let emailElement = document.getElementById('email');
    let emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    let emailValue = emailElement.value.trim();
    if (!emailRegexp.test(emailValue)) {
        return false;
    }
    return true;
}

/* валидация возраста*/
function validationAge() {
    let ageElement = document.getElementById('age');
    let ageValue = Number(ageElement.value);
    if (ageValue <= 0 || ageValue >= 130) {
        return false;
    }
    return true;
}

/* проверка выбора типа работы*/
function validationJobType() {
    let jobTypeValue = jobTypeElement.value;
    if (jobTypeValue === 'default') {
        return false
    }
    return true

}

/*валидация пароля*/
function validationPassword() {
    let passwordElement = document.getElementById('password');
    let passwordRegex = /(?=.*[A-ZА-Я])(?=.*[a-zа-я])(?=.*\d)/;
    let passwordValue = passwordElement.value.trim();
    if (!passwordRegex.test(passwordValue) || passwordValue.length < 8) {
        return false;
    }
    return true;
}

/* проверка согласия*/
function validationCheckbox() {
    let checkboxElement = document.querySelector('.form__checkbox');
    let checkboxValue = checkboxElement.checked;
    if (!checkboxValue) {
        return false
    }
    return true
}

/*валидация всех полей формы*/
function validationForm(input) {
    let resultFieldValidation = true;
    switch (input.name) {
        case 'name':
            resultFieldValidation = validationName()
            break;
        case 'email':
            resultFieldValidation = validationEmail()
            break;
        case 'age':
            resultFieldValidation = validationAge()
            break;
        case 'job-types':
            resultFieldValidation = validationJobType()
            break;
        case 'password':
            resultFieldValidation = validationPassword()
            break;
        case 'checkbox':
            resultFieldValidation = validationCheckbox()
            break;
        default:
            return;
    }

    let fieldError = document.querySelector(`.form__error--${input.name}`);
    if (resultFieldValidation) {
        fieldError.style.display = 'none';
    }
    else {
        fieldError.style.display = 'block';
    }

    checkAllFields();
}

/* проверка заполненности и корректности полей формы*/
function checkAllFields() {
    if (validationName() && validationEmail() && validationAge() && validationJobType() && validationPassword() && validationCheckbox()) {
        button.removeAttribute('disabled');
        return true
    }
    else {
        button.setAttribute('disabled', "true");
        return false
    }
}

let form = document.querySelector('.form');
form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (checkAllFields()) {

        printFormFields(formElements);
        form.reset();

    }
})

/* вывод в консоль данных из формы*/
function printFormFields(formFields) {
    for (let temp of formFields) {
        switch (temp.name) {
            case 'name':
                console.log(`Имя: ${temp.value.trim()}`)
                break;
            case 'email':
                console.log(`E-Mail: ${temp.value.trim()}`)
                break;
            case 'age':
                console.log(`Возраст: ${temp.value}`)
                break;
            case 'sex':
                if (temp.checked) {
                    console.log(`Пол: ${temp.value}`)
                }
                break;
            case 'job-types':
                console.log(`Профессия: ${temp.value}`)
                break;
            case 'password':
                console.log(`Пароль: ${temp.value}`)
                break;
            case 'checkbox':
                console.log(`Согласие с обработкой данных: ${temp.checked}`)
                break;
            default:
                break;
        }

    }
}