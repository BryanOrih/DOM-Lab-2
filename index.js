let clearButton = document.querySelector(".C")
let input = document.querySelector(".input")
const numBtn = document.querySelectorAll(".main-number")
const backSpace = document.querySelector(".back")
const plusMinusBtn = document.querySelector(".plus-minus")
const periodBtn = document.querySelector(".period")
let mathOperator = document.querySelectorAll(".mathOperator")
let calcLog = document.querySelector(".Calculator-log")
const totalNum = document.querySelector(".totalSum")
const ceButton = document.querySelector(".CE")

let operators = ["+","-","/","*"]
let lastNumInInput = input.textContent[input.textContent.length-1]
let lastNumInLog = calcLog.textContent[calcLog.textContent.length-1]

//REVIEW - THIS IS TO BE CHANGED ONCE NEW MODES ARRIVE
document.querySelector(".toggle").addEventListener('click', () =>{
    alert("Currently only available in standard mode. More modes coming soon")
})



//NOTE - CLEARS THE INPUT
clearButton.addEventListener('click', ()=>{
    input.removeAttribute('id')
    input.setAttribute("id", "reset");
    input.textContent = "0"
})

//NOTE - CLEARS EVERYTHING
ceButton.addEventListener('click', ()=>{
    input.removeAttribute('id')
    input.setAttribute("id", "reset");
    input.textContent = "0"
    calcLog.textContent = ""
})

//NOTE - INPUTS THE NUMBERS IN CALCULATOR
for( let btn of numBtn){
    btn.addEventListener('click', (e) => {
        if(calcLog.textContent.includes("=")){
            input.removeAttribute('id')
            input.setAttribute("id", "reset");
            calcLog.textContent = ""
            input.textContent = btn.textContent
        }else if(input.hasAttribute("id")){
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
    if(input.textContent == "" || input.textContent == "-"){
        input.setAttribute("id", "reset");
        input.textContent = "0"
    }
})

//NOTE - PLUS OR NEGATIVE IN THE INPUT
plusMinusBtn.addEventListener('click', () => {
    // console.log(input.textContent[0]);
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
    input.textContent.includes(".") ? input.textContent : input.textContent = input.textContent + "."
    input.removeAttribute('id')
})

//NOTE - MATH OPERATOR BUTTON FUNCTION
for( let btn of mathOperator){
    btn.addEventListener('click', () =>{
        if(calcLog.textContent.includes("=")){
            calcLog.textContent = input.textContent + btn.textContent
            input.setAttribute("id", "total");
        }else if(operators.some(operator => calcLog.textContent.includes(operator)) && input != 0){
            calcLog.textContent = calcLog.textContent + input.textContent
            if(calcLog.textContent.includes("--")){
                calcLog.textContent = calcLog.textContent.replace('--','+')
            }
            input.textContent = eval(calcLog.textContent)
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
    // const getPosition = (string, subString, index) =>{
    //     return string.split(subString, index).join(subString).length;
    // }
    if(calcLog.textContent.includes("=")){
        let lastOperator = [calcLog.textContent.lastIndexOf("-"),calcLog.textContent.lastIndexOf("+"),calcLog.textContent.lastIndexOf("*"),calcLog.textContent.lastIndexOf("/")]
        lastOperator = Math.max(...lastOperator)
        console.log(lastOperator);
        calcLog.textContent = calcLog.textContent.substring(lastOperator,calcLog.textContent.length -1);
        calcLog.textContent = input.textContent + calcLog.textContent + "="
        input.textContent = eval(calcLog.textContent.substring(0,calcLog.textContent.length-1))
    }else{
        calcLog.textContent = calcLog.textContent + input.textContent + "=";
        if(calcLog.textContent.includes("--")){
            calcLog.textContent = calcLog.textContent.replace('--','+')
            input.textContent = eval(calcLog.textContent.substr(0,calcLog.textContent.length-1))
        }else{
            input.textContent = eval(calcLog.textContent.substr(0,calcLog.textContent.length-1))
        }
    }
})

let screenLevel = 1

//NOTE - CLOSE CALCULATOR BUTTON
function closeBtn(){
    document.querySelector("body").innerHTML = ''
}

//NOTE - MINIMIZE SCREEN
function minimizeBtn(){
    document.querySelector(".smallScreen").style.display= ""
    document.querySelector("#Calculator").style.display= "none"
    screenLevel = 0
}

//NOTE - ENLARGE AND DELARGE FROM LARGE SCREEN
function enlarge(){
    if(screenLevel === 0){
        document.querySelector(".smallScreen").style.display= "none"
        document.querySelector("#Calculator").style.display= ""
        document.querySelector("#Calculator").style.width= "25vw";
        document.querySelector("#Calculator").style.height= "70vh";
        screenLevel = 1
    }else if(screenLevel === 1){
        document.querySelector("#Calculator").style.width= "99vw";
        document.querySelector("#Calculator").style.height= "99vh";
        screenLevel = 2
    }else{
        document.querySelector("#Calculator").style.width= "25vw";
        document.querySelector("#Calculator").style.height= "70vh";
        screenLevel = 1
    }
}






