//This web page it's going to help people to quoter their insurance

//Declarations
const formulario = document.querySelector('#insurance-form')
const brand = document.querySelector('#brand');
const year = document.querySelector('#year');
const results = document.querySelector('#results');
const btnQuote = document.querySelector('#btn-insurance');

 


console.log(brand,year)




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
    
    if(type === 'error'){
        div.classList.add('bg-orange-100','border-2','border-orange-500','p-3','mb-5', 'text-center', 'text-orange-500')
    }
    else if(type === 'correct'){
        div.classList.add('bg-green-100','border-2','border-green-500','p-3','mb-5', 'text-center', 'text-green-500')
    }
    div.classList.add('mt-10');
    div.textContent = messege;
    formulario.insertBefore(div, results);
    btnQuote.disabled = true;
    btnQuote.classList.add('opacity-50')

    setTimeout(() => {
        div.remove();
        btnQuote.disabled = false;
        btnQuote.classList.remove('opacity-50')
    }, 3000);
    
}


//functions
function quoterInsurance(e){
    e.preventDefault();

    const brandV = brand.value;
    const yearV = year.value;
    const typeV = document.querySelector('input[name="type"]:checked').value;

    if(brandV === '' || yearV === '' || typeV === ''){
        iu.Alert('All field are mandatory', 'error');
        return;
    }
    iu.Alert('Quoting...', 'correct');
    //spinner
    //instance of the insurance

    console.log(brandV, yearV, typeV);
}