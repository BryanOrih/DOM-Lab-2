let clearButton = document.querySelector(".C")
let input = document.querySelector(".input")
const numBtn = document.querySelectorAll(".main-number")
const backSpace = document.querySelector(".back")
const plusMinusBtn = document.querySelector(".plus-minus")
const periodBtn = document.querySelector(".period")
let mathOperator = document.querySelectorAll(".mathOperator")
let calcLog = document.querySelector(".Calculator-log")
const totalNum = document.querySelector(".totalSum")

let operators = ["+","-","/","*"]
let lastNumInInput = input.textContent[input.textContent.length-1]
let lastNumInLog = calcLog.textContent[calcLog.textContent.length-1]

//NOTE - CLEARS THE INPUT
clearButton.addEventListener('click', ()=>{
    input.removeAttribute('id')
    input.setAttribute("id", "reset");
    input.textContent = "0"
    calcLog.textContent = ""
})

//NOTE - INPUTS THE NUMBERS IN CALCULATOR
for( let btn of numBtn){
    btn.addEventListener('click', (e) => {
        if(input.hasAttribute("id")){
            input.removeAttribute('id')
            input.textContent = btn.textContent
        }else{
            input.textContent += btn.textContent
        }
    })
}

//NOTE - BACKSPACE FUNCTION
backSpace.addEventListener('click', () => {
    input.textContent = input.textContent.substr(0,input.textContent.length-1);
    if(input.textContent == ""){
        input.setAttribute("id", "reset");
        input.textContent = "0"
    }
})

//NOTE - PLUS OR NEGATIVE IN THE INPUT
plusMinusBtn.addEventListener('click', () => {
    console.log(input.textContent[0]);
    switch(input.textContent[0]){
        case "0":
            break;
        case '-':
            input.textContent = input.textContent.substr(1,input.textContent.length - 1);
            break;
        default:
            input.textContent = input.textContent.replace (/^/,'-');
            break;
    }
})

//NOTE - DECIMAL POINT IN INPUT
periodBtn.addEventListener('click', () =>{
    input.textContent.includes(".") ? input.textContent : input.textContent = input.textContent.concat(".")
})

//NOTE - MATH OPERATOR BUTTON FUNCTION
for( let btn of mathOperator){
    btn.addEventListener('click', () =>{
        if(operators.some(operator => calcLog.textContent.includes(operator)) && input != 0){
            // console.log(calcLog.textContent, input.textContent);
            input.textContent = eval(calcLog.textContent.concat(input.textContent))
            calcLog.textContent = input.textContent + btn.textContent
            input.setAttribute("id", "total");
            
        }else{
            calcLog.textContent = input.textContent.concat(btn.textContent)
            input.setAttribute("id", "total");
        }
    })
}

//NOTE - EQUALS BUTTON FUNCTION
totalNum.addEventListener('click', () =>{
    if(calcLog.textContent.includes("=")){
        for(let operator of operators){
            calcLog.textContent = calcLog.textContent.substring(calcLog.textContent.indexOf(operator));
            calcLog.textContent = input.textContent + calcLog.textContent
            input.textContent = eval(calcLog.textContent.substr(0,calcLog.textContent.length-1))
            break;
        }
    }else{
        calcLog.textContent = calcLog.textContent + input.textContent + "=";
        input.textContent = eval(calcLog.textContent.substr(0,calcLog.textContent.length-1))
    }
})