var billTotal;
var tipActive;
var peopleTotal;
document.addEventListener('DOMContentLoaded', async function(){

    const billInput = document.querySelector('.bill__total');   
    const peopleInput = document.querySelector('.people__total');   
    const tipOptionsButton = document.querySelectorAll('.tip__options');   
    const tipOptionsCustomButton = document.querySelector('.tip__options--custom');   

    const resetButton =  document.querySelector('.result__reset');   

    //ERRORES
    const peopleInputError = document.querySelector('.people__input');   
    const peopleError = document.querySelector('.people__error');   

    billInput.addEventListener("input", () => {
        billTotal = billInput.value !== "" ? billInput.value : 0;
        validateCalculator();
    });

    
    tipOptionsButton.forEach(option => {
        option.addEventListener('click', function(){

            document.querySelectorAll('.tip__options.active')
                    .forEach(el => el.classList.remove('active'));
            tipActive = 0;

            this.classList.add('active');

            if(this.id != "tip-custom"){
                document.getElementById('tip-custom').value = "";
                tipActive =this.textContent.replace('%', '');
            }

            validateCalculator();

        });
    });

    tipOptionsCustomButton.addEventListener("input", () => {
        tipActive = tipOptionsCustomButton.value !== "" ? tipOptionsCustomButton.value : 0;
        validateCalculator();
    });


    peopleInput.addEventListener("input", () => {
        peopleTotal = peopleInput.value !== "" ? peopleInput.value : 0;

        if(peopleTotal == 0){
            peopleError.classList.remove('hidden')
            peopleInputError.classList.add('input-error')
        }else{
            peopleError.classList.add('hidden')
            peopleInputError.classList.remove('input-error')
        }

        validateCalculator();

    });

    resetButton.addEventListener("click", () => {
        billTotal = 0;
        tipActive = 0;
        peopleTotal = 0;

        billInput.value = "";
        
        peopleInput.value = "";

        document.querySelectorAll('.tip__options.active')
                    .forEach(el => el.classList.remove('active'));

        const resultTotalPropina =  document.querySelector('.result__number--tip');   
        resultTotalPropina.textContent = "$0.00";

        const resultTotalPersona =  document.querySelector('.result__number--total');   
        resultTotalPersona.textContent = "$0.00";

        resetButton.classList.remove('active');
    });


});
 
function validateCalculator(){

    var flag = true;

    if(billTotal == 0 || billTotal == undefined){
        flag = false;
    }

    if (tipActive == 0 || tipActive == undefined) {
        flag = false;
    }

    if(peopleTotal == 0 || peopleTotal == undefined){
        flag = false;
    }

    if(flag){
        tipCalculator();
    }
    
}

function tipCalculator(){

    var factor = 1 + (tipActive / 100);
    var totalConPropina = billTotal * factor;
    var totalPorPersona = totalConPropina / peopleTotal;

    var totalPropina = totalConPropina - billTotal;
    var propinaPorPersona = totalPropina / peopleTotal;

    const resultTotalPropina =  document.querySelector('.result__number--tip');   
    resultTotalPropina.textContent = "$"+propinaPorPersona.toFixed(2);

    const resultTotalPersona =  document.querySelector('.result__number--total');   
    resultTotalPersona.textContent = "$"+totalPorPersona.toFixed(2);

    const resetButton =  document.querySelector('.result__reset');   
    resetButton.classList.add('active');

}