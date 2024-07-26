let brandCar = document.getElementById('brand-car');
brandCar.addEventListener('change', changeCarModel);

let usedCar = document.getElementById('used-car');
let newCar = document.getElementById('new-car');
usedCar.addEventListener('change', selectedCondition);
newCar.addEventListener('change', selectedCondition);

let calculateForm = document.querySelector('.calculator__form');
calculateForm.addEventListener('submit', calculatePrice);

let engineCapacityElement = document.getElementById('engine-capacity');
engineCapacityElement.addEventListener('change', validationEngineCapacity);


/*функция расчета цены*/
function calculatePrice(evt) {
    evt.preventDefault();
    deleteResultValues();
    if (!validationEngineCapacity()) {
        return
    };
    let priceResult = 0;
    let brandCurrentCar = brandCar.value.toLowerCase();
    let modelNameCurrentCar = document.getElementById(`${brandCurrentCar}-model`);
    let modelCurrentCar = modelNameCurrentCar.value.toLowerCase();
    priceResult = priceByBrandAndModel[`${brandCurrentCar}-${modelCurrentCar}`];
    let fuelType = getFuelType();
    priceResult += priceByFuelType[fuelType];

    let engineCapacity = Number(engineCapacityElement.value);
    engineCapacity = engineCapacity === 0 ? 1.1 : engineCapacity;
    priceResult += engineCapacity * 100000;
    let carCondition = newCar.value;
    let amounOwners = '0';
    if (usedCar.checked) {
        carCondition = usedCar.value;
        let amountOwnersElements = document.querySelectorAll('.calculator__amount-owners');
        for (let item of amountOwnersElements) {
            if (item.checked) {
                amounOwners = item.value;
            }
        }
    }
    if (amounOwners === '0') {
        priceResult += 400000;
    }
    else if (amounOwners === 'few-owners') {
        priceResult += 150000;
    }
    else {
        priceResult += 50000;
    }
    console.log(carCondition, amounOwners);
    let paymentTypeElements = document.querySelectorAll('.calculator__payment-type');
    let paymentType = paymentTypeElements[0].value;
    for (let item of paymentTypeElements) {
        if (item.checked) {
            paymentType = item.value;
        }
    }

    let resultValues = [brandCurrentCar, modelCurrentCar, fuelTypeRussian[fuelType], engineCapacity, carConditionRussian[carCondition], amounOwnersRussian[amounOwners], paymentTypeRussian[paymentType], priceResult];
    printResultValues(resultValues);
}

/*Вывод данных для расчета и его результат*/
function printResultValues(resultValues) {
    let resultClassNames = ["result__brand", "result__model", "result__fuel-type",
        "result__engine-capacity", "result__car-condition", "result__amount-owners", "result__payment-type", "result__price"];

    let resultBlock = document.querySelector('.result');
    resultBlock.style.display = 'block';
    for (let temp = 0; temp < resultClassNames.length; temp++) {
        let tempElement = document.querySelector(`.${resultClassNames[temp]} > span`);
        tempElement.textContent = resultValues[temp] + ';';
    }
}

/*Очищение данных в блоке для вывода результата*/
function deleteResultValues() {
    let resultClassNames = ["result__brand", "result__model", "result__fuel-type",
        "result__engine-capacity", "result__car-condition", "result__amount-owners", "result__payment-type", "result__price"];
    let resultBlock = document.querySelector('.result');
    resultBlock.style.display = 'none';
    for (let temp = 0; temp < resultClassNames.length; temp++) {
        let tempElement = document.querySelector(`.${resultClassNames[temp]} > span`);
        tempElement.textContent = '';
    }
}

/* валидация вывода объема двигателя*/
function validationEngineCapacity() {
    let errorMessage = document.querySelector('.calculator__error-message');
    errorMessage.style.display = 'none';
    let engineCapacityValue = Number(engineCapacityElement.value);
    if ((engineCapacityValue >= 1.1) && (engineCapacityValue <= 3.5) || (engineCapacityValue === 0)) {
        return true
    }
    else {
        errorMessage.style.display = ' block';
        deleteResultValues();
        return false
    }

}

/*получение значения типа топлива*/
function getFuelType() {
    let fuelTypeElements = document.querySelectorAll('.calculator__fuel-type');
    for (let item of fuelTypeElements) {
        if (item.checked) {
            return item.value;
        }
    }
}

/*появление и скрытие блока с количеством владельцев*/
function selectedCondition(evt) {
    let amountOwnersBlock = document.querySelector('.calculator__owners');
    if (evt.target.value == 'used-car') {
        amountOwnersBlock.classList.remove('calculator__field--hidden');
    }
    else {
        amountOwnersBlock.classList.add('calculator__field--hidden');
    }
}

/*динамическое появление списка моделей автобомиля в соответствии с выбранной маркой*/
function changeCarModel() {
    let modelBlocks = document.querySelectorAll('.calculator__model');
    modelBlocks.forEach((item) => {
        item.classList.add('calculator__field--hidden')
    })
    let selectedModel = '';
    switch (brandCar.value) {
        case 'reno':
            selectedModel = document.querySelector('.calculator__model--reno');
            break;
        case 'opel':
            selectedModel = document.querySelector('.calculator__model--opel');
            break;
        case 'mazda':
            selectedModel = document.querySelector('.calculator__model--mazda');
            break;
        case 'jaguar':
            selectedModel = document.querySelector('.calculator__model--jaguar');
            break;
        default:
            break;
    }
    if (selectedModel) {
        selectedModel.classList.remove('calculator__field--hidden');
    }

}

/*изменение рамки полей ввода при различных действиях*/
let selectElements = document.querySelectorAll('.calculator__value');
selectElements.forEach((item) => {
    item.addEventListener('focus', function () {
        console.log(item)
        item.outline = 'none';
        item.style.borderColor = '2px solid #e70404';
    })
    item.addEventListener('blur', function () {
        item.style.border = '1px solid #414040';
    })
    item.addEventListener('mouseover', function () {
        console.log(item)
        item.outline = 'none';
        item.style.border = '2px solid #e70404';
    })
    item.addEventListener('mouseout', function () {
        console.log(item)
        item.style.border =  '1px solid #414040';
    })
})

/*переменные для рассчетов и вывода результата*/
const priceByBrandAndModel = {
    'reno-duster': 500000,
    'reno-logan': 600000,
    'reno-sandero': 700000,
    'reno-megan': 800000,
    'opel-astra': 450000,
    'opel-corsa': 550000,
    'opel-mokka': 650000,
    'mazda-6': 800000,
    'mazda-cx-5': 900000,
    'mazda-3': 1000000,
    'mazda-5': 1100000,
    'jaguar-xj': 1200000,
    'jaguar-xf': 1300000,
    'jaguar-xe': 1400000,
    'jaguar-e-pace': 1500000
};

const priceByFuelType = {
    'petrol': 0,
    'diesel': 100000,
    'gas': 200000,
    'electricity': 300000
};

const fuelTypeRussian = {
    'petrol': 'бензин',
    'diesel': 'дизель',
    'gas': 'газ',
    'electricity': 'электричество'
};

const carConditionRussian = {
    'new-car': 'новый',
    'used-car': 'подержанный'
};

const amounOwnersRussian = {
    '0': 0,
    'few-owners': ' 1-2 владельца',
    'many-owners': 'более 3-х владельцев'
};

const paymentTypeRussian = {
    'bank-card': 'банковской картой',
    'cash': 'наличными',
    'legal-person': 'cчет на юридическое лицо'
};