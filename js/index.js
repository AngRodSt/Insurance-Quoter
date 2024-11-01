//Declarations
const formulario = document.querySelector('#insurance-form')
const brand = document.querySelector('#brand');
const year = document.querySelector('#year');
const results = document.querySelector('#results');
const btnQuote = document.querySelector('#btn-insurance');
const spinner = document.querySelector('.spinner')


//EventListeners
document.addEventListener('DOMContentLoaded', () => {
    iu.fillYear();
})

EventListeners();
function EventListeners() {
    formulario.addEventListener('submit', quoterInsurance)

}

//Declaration of object and prototypes: Insurance
function Insurance(brand, year, type) {
    this.brand = brand;
    this.year = year;
    this.type = type
}

Insurance.prototype.Quoter = function () {
    /*1.15
    1.05
    1.35*/
    let amount;
    const base = 2000;

    switch (this.brand) {
        case '1':
            amount = base * 1.15;
            break;
        case '2':
            amount = base * 1.05;
            break;
        case '3':
            amount = base * 1.35;
            break;
        default:
            break;
    }

    const diference = new Date().getFullYear() - this.year;

    //Each year it's going to substract a 3%
    amount -= ((diference * 3) * amount) / 100;

    //If the insurance is basic is going to be multiply by 30%, but if is complete it's goig to be multiply by 50%
    if (this.type === 'basic') {
        amount *= 1.30;
    }
    else {
        amount *= 1.50;
    }

    return amount;

}

//Declaration of object and prototypes: IU
function IU() { };
const iu = new IU();

IU.prototype.fillYear = () => {
    const max = new Date().getFullYear();
    const min = max - 15;
    for (i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.textContent = i;
        option.value = i;
        year.appendChild(option);
    }
}

IU.prototype.Alert = (messege, type) => {
    const div = document.createElement('div');

    if (type === 'error') {
        div.classList.add('bg-orange-100', 'border-2', 'border-orange-500', 'p-3', 'mb-5', 'text-center', 'text-orange-500')
    }
    else if (type === 'correct') {
        div.classList.add('bg-green-100', 'border-2', 'border-green-500', 'p-3', 'mb-5', 'text-center', 'text-green-500')
        spinner.removeAttribute('hidden')
    }
    div.classList.add('mt-10');
    div.textContent = messege;
    formulario.insertBefore(div, results);
    btnQuote.disabled = true;
    btnQuote.classList.add('opacity-50')

    setTimeout(() => {
        div.remove();
        btnQuote.disabled = false;
        spinner.setAttribute('hidden', 'true')
        btnQuote.classList.remove('opacity-50')
    }, 3000);

}

IU.prototype.showResult = (total, insurance) => {
    const { brand, year, type } = insurance;

    let textBrand;
    switch (brand) {
        case '1':
            textBrand = 'American'
            break;
        case '2':
            textBrand = 'Asian'
            break;
        case '3':
            textBrand = 'Europe'
            break;
        default:
            break;
    }

    //Create result
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Your Resume</p>
        <p class= "font-bold"> Brand: <span class='font-normal'>${textBrand}</span></p> 
        <p class="font-bold"> Year: <span class='font-normal'>${year}</span></p> 
        <p class="font-bold"> Type: <span class='font-normal capitalize'>${type}</span></p> 
        <p class="font-bold"> Total: <span class='font-normal'> $${total}</span></p> 
    `;

    setTimeout(() => {
        results.appendChild(div);
    }, 3000);

}


//functions
function quoterInsurance(e) {
    e.preventDefault();

    const brandV = brand.value;
    const yearV = year.value;
    const typeV = document.querySelector('input[name="type"]:checked').value;

    if (brandV === '' || yearV === '' || typeV === '') {
        iu.Alert('All field are mandatory', 'error');
        return;
    }
    iu.Alert('Quoting...', 'correct');

    //Remove quotes that already exist 
    const resultQuote = document.querySelector('#results div')
    if (resultQuote !== null) {
        resultQuote.remove();
    }

    //instance of the insurance
    insurance = new Insurance(brandV, yearV, typeV);
    const total = insurance.Quoter()
    iu.showResult(total, insurance);
}